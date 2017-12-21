/*
 * @Author: fancy
 * @Date: 2017-11-27 16:29:14
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-19 10:54:10
 */
/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { emAutoSelectBatchSerialRules, MaterialIssueBatchServiceProxy } from "../../api/Datas";
import { BORepositoryMaterials } from "../../borep/BORepositories";
import {
    IMaterialIssueBatchs,
    IMaterialIssueBatchLine,
    IMaterialIssueBatchContract,
} from "../../api/bo/index";
import { MaterialIssueBatchJournal, MaterialIssueBatchInfo } from "./index";
import { MaterialBatchJournal } from "../../borep/bo/index";
import { emDirection } from "ibas/index";

export class MaterialIssueBatchService extends ibas.ServiceApplication<IMaterialIssueBatchView, IMaterialIssueBatchContract[]> {

    /** 应用标识 */
    static APPLICATION_ID: string = "141e2a0f-3120-40a3-9bb4-f8b61672ed9c";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialbatchissue";
    /** 业务对象编码 */
    // static BUSINESS_OBJECT_CODE: string = bo.MaterialBatchJournal.BUSINESS_OBJECT_ISSUE_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialIssueBatchService.APPLICATION_ID;
        this.name = MaterialIssueBatchService.APPLICATION_NAME;
        // this.boCode = MaterialIssueBatchService.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 服务契约 */
    private contract: IMaterialIssueBatchContract;
    /** 批次服务数据 */
    protected batchServiceDatas: MaterialIssueBatchJournal[];
    /** 可选批次信息 */
    protected batchData: bo.MaterialBatch[];
    /** 批次日记账已选择的批次 */
    protected batchJournalData: bo.MaterialBatchJournal[];

    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.selectMaterialBatchJournalLineEvent = this.selectMaterialBatchJournalLine;
        this.view.autoSelectMaterialBatchEvent = this.autoSelectMaterialBatch;
        this.view.addBatchMaterialBatchEvent = this.addBatchMaterialBatch;
        this.view.removeBatchMaterialBatchEvent = this.removeBatchMaterialBatch;
        this.view.saveDataEvent = this.saveData;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showJournalLineData(this.batchServiceDatas);
    }
    protected newData(): void {
        throw new Error("Method not implemented.");
    }
    /** 选择凭证行事件 -更新可用批次 */
    protected selectMaterialBatchJournalLine(selected: MaterialIssueBatchJournal): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let that: this = this;
        // 根据物料查询可用批次
        that.fetchBatchData(selected);
        that.view.showRightData(selected.materialBatchInfos);
    }
    /** 自动选择物料批次事件 */
    protected autoSelectMaterialBatch(selected: MaterialIssueBatchJournal, rules: emAutoSelectBatchSerialRules): void {
        // 未选择凭证行
        if (ibas.objects.isNull(selected)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // let batchItem: MaterialIssueBatchJournal = this.batchServiceDatas.find(c => c.index === selected.index);
        // 不需要选择批次了
        if (selected.needBatchQuantity === 0) {
            this.view.showRightData(selected.materialBatchInfos.filterDeleted());
            return;
        }
        if (ibas.objects.isNull(this.batchData.filter(c => c.isDeleted === false))) {
            // 查询可用批次信息
            this.fetchBatchData(selected);
            return;
        }
        this.allocateBatch(selected, rules);
        // let line: MaterialIssueBatchJournal = this.batchServiceDatas.find(c => c.index === selected.index);
        this.view.showLeftData(this.batchData.filter(c => c.quantity > 0));
        this.view.showRightData(selected.materialBatchInfos.filterDeleted());
    }
    /** 分配物料批次 */
    protected allocateBatch(journal: MaterialIssueBatchJournal, rules: emAutoSelectBatchSerialRules): void {
        // 按照一定规则排序
        if (rules === emAutoSelectBatchSerialRules.FIRST_IN_FIRST_OUT) {
            this.batchData.sort((batch1, batch2) => batch1.createDate < batch2.createDate ? -1
                : (batch1.createDate > batch2.createDate ? 1 : (batch1.createTime < batch2.createTime ? -1
                    : (batch1.createTime > batch2.createTime ? 1 : 0))));
        } else if (rules === emAutoSelectBatchSerialRules.FIRST_IN_LAST_OUT) {
            this.batchData.sort((batch1, batch2) => batch1.createDate > batch2.createDate ? -1
                : (batch1.createDate < batch2.createDate ? 1 : (batch1.createTime > batch2.createTime ? -1
                    : (batch1.createTime < batch2.createTime ? 1 : 0))));
        } else if (rules === emAutoSelectBatchSerialRules.ORDER_BY_CODE) {
            this.batchData.sort((batch1, batch2) => batch1.batchCode < batch2.batchCode ? -1
                : batch1.batchCode > batch2.batchCode ? 1 : 0);
        }

        // let newBatchData: bo.MaterialBatch[] = new Array<bo.MaterialBatch>();
        // let line: MaterialIssueBatchJournal = this.batchServiceDatas.find(c => c.index === journal.index);
        for (let item of this.batchData.filter(c => c.quantity > 0 && c.isDeleted === false)) {
            // 已分配数量
            if (journal.needBatchQuantity === 0) {
                return;
            }
            // 在已选择的行中找该批次记录
            let batchLine: MaterialIssueBatchInfo = journal.materialBatchInfos
                .find(c => c.batchCode === item.batchCode);
            // 未选择该批次 新建批次日记账
            if (ibas.objects.isNull(batchLine)) {
                let batchJournal: MaterialIssueBatchInfo = new MaterialIssueBatchInfo();
                batchJournal.itemCode = item.itemCode;
                batchJournal.warehouse = item.warehouse;
                batchJournal.batchCode = item.batchCode;
                batchJournal.direction = emDirection.OUT;
                if (item.quantity <= journal.needBatchQuantity) {
                    batchJournal.quantity = item.quantity;
                    item.quantity = 0;
                } else {
                    batchJournal.quantity = journal.needBatchQuantity;
                    item.quantity = Number(item.quantity) - Number(batchJournal.quantity);
                }
                batchLine = journal.materialBatchInfos.createBatchJournal(batchJournal);
            } else {
                // 已选择该批次 修改批次日记账
                if (item.quantity <= journal.needBatchQuantity) {
                    batchLine.quantity = Number(batchLine.quantity) + Number(item.quantity);
                    item.quantity = 0;
                } else {
                    let changeQuantity: number = journal.needBatchQuantity;
                    batchLine.quantity = Number(batchLine.quantity) + Number(journal.needBatchQuantity);
                    item.quantity = Number(item.quantity) - Number(changeQuantity);
                }
                journal.materialBatchInfos.updateBatchJournal(batchLine);
            }

        }
    }
    /** 添加选择的批次事件 */
    protected addBatchMaterialBatch(selected: MaterialIssueBatchJournal, items: bo.MaterialBatch[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(selected)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        if (items.length === 0) {
            return;
        }

        // let journalItem: MaterialIssueBatchJournal = this.batchServiceDatas.find(c => c.index === selected.index);
        let allocateQuantity: number = 0;
        for (let item of items) {
            // 不需要选择批次了
            if (selected.needBatchQuantity === 0) {
                this.view.showRightData(selected.materialBatchInfos.filterDeleted());
                return;
            }

            let batchline: MaterialIssueBatchInfo = selected.materialBatchInfos
                .find(c => c.batchCode === item.batchCode);
            // 该凭证行未选择该批次 新建操作
            if (ibas.objects.isNull(batchline)) {
                let batchJournal: MaterialIssueBatchInfo = new MaterialIssueBatchInfo();
                batchJournal.itemCode = item.itemCode;
                batchJournal.warehouse = item.warehouse;
                batchJournal.batchCode = item.batchCode;
                batchJournal.direction = emDirection.OUT;
                // 可选批次行数量小于或等于需求数量
                if (item.quantity <= selected.needBatchQuantity) {
                    batchJournal.quantity = item.quantity;
                    item.quantity = 0;
                } else {
                    // 可选批次行数量大于需求数量
                    batchJournal.quantity = selected.needBatchQuantity;
                    item.quantity = Number(item.quantity) - Number(batchJournal.quantity);
                }
                selected.materialBatchInfos.createBatchJournal(batchJournal);
            } else {
                // 该凭证行已经选择过该批次 修改操作
                if (item.quantity <= selected.needBatchQuantity) {
                    batchline.quantity = Number(batchline.quantity) + Number(item.quantity);
                    item.quantity = 0;
                } else {
                    batchline.quantity += selected.needBatchQuantity;
                    item.quantity -= batchline.quantity;
                }
                selected.materialBatchInfos.updateBatchJournal(batchline);
            }

        }
        this.view.showLeftData(this.batchData.filter(c => c.quantity > 0));
        this.view.showRightData(selected.materialBatchInfos);
    }
    /** 移除选择的批次事件 */
    protected removeBatchMaterialBatch(selected: MaterialIssueBatchJournal, items: MaterialIssueBatchInfo[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(selected)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // 非数组，转为数组
        if (!(items instanceof Array)) {
            items = [items];
        }
        if (items.length === 0) {
            return;
        }
        // let line: MaterialIssueBatchJournal = this.batchServiceDatas.find(c => c.index === selected.index);
        // 移除项目
        for (let item of items) {
            if (selected.materialBatchInfos.indexOf(item) >= 0) {
                selected.materialBatchInfos.deleteBatchJournal(item);
                let batchItem: bo.MaterialBatch = this.batchData.find(c => c.batchCode === item.batchCode);
                if (!ibas.objects.isNull(batchItem)) {
                    batchItem.quantity = Number(batchItem.quantity) + Number(item.quantity);
                } else {
                    batchItem = new bo.MaterialBatch();
                    batchItem.batchCode = item.batchCode;
                    batchItem.itemCode = item.itemCode;
                    batchItem.quantity = item.quantity;
                    this.batchData.push(batchItem);
                }
            }
        }
        this.view.showLeftData(this.batchData.filter(c => c.quantity > 0));
        this.view.showRightData(selected.materialBatchInfos.filterDeleted());
    }
    /** 查询数据 */
    protected fetchBatchData(selected: MaterialIssueBatchJournal): void {
        this.busy(true);
        let that: this = this;
        let criteria: ibas.ICriteria = new ibas.Criteria();
        let condition: ibas.ICondition;
        condition = new ibas.Condition(bo.MaterialBatch.PROPERTY_ITEMCODE_NAME, ibas.emConditionOperation.EQUAL, selected.itemCode);
        criteria.conditions.add(condition);
        condition = new ibas.Condition(bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME, ibas.emConditionOperation.EQUAL, selected.warehouse);
        condition.relationship = ibas.emConditionRelationship.AND;
        criteria.conditions.add(condition);
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialBatch({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatch>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    // baseDocmentType、baseDocmentDocEntry、baseDocmentLineNum有值需查询先查询影响批次库存的值
                    that.batchData = opRslt.resultObjects;
                    if (!ibas.objects.isNull(selected.docType)
                        && !ibas.objects.isNull(selected.docEntry)
                        && !ibas.objects.isNull(selected.lineNum)) {
                        that.fetchBatchJournal(selected);
                    } else {
                        that.filterSelected(selected);
                        that.view.showLeftData(that.batchData.filter(c => c.quantity > 0));
                    }
                    that.busy(false);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }

    /** 查询批次日记账 */
    protected fetchBatchJournal(selected: MaterialIssueBatchJournal): void {
        this.busy(true);
        let that: this = this;
        let criteria: ibas.ICriteria = new ibas.Criteria();
        let condition: ibas.ICondition;
        condition = new ibas.Condition(
            bo.MaterialBatchJournal.PROPERTY_BASEDOCUMENTTYPE_NAME, ibas.emConditionOperation.EQUAL, selected.docType
        );
        criteria.conditions.add(condition);
        condition = new ibas.Condition(
            bo.MaterialBatchJournal.PROPERTY_BASEDOCUMENTENTRY_NAME, ibas.emConditionOperation.EQUAL, selected.docEntry
        );
        condition.relationship = ibas.emConditionRelationship.AND;
        criteria.conditions.add(condition);
        condition = new ibas.Condition(
            bo.MaterialBatchJournal.PROPERTY_BASEDOCUMENTLINEID_NAME, ibas.emConditionOperation.EQUAL, selected.lineNum
        );
        condition.relationship = ibas.emConditionRelationship.AND;
        criteria.conditions.add(condition);
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialBatchJournal({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatchJournal>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.addBatchJournal(opRslt.resultObjects);
                    that.filterSelected(selected);
                    that.view.showLeftData(that.batchData.filter(c => c.quantity > 0));
                    that.busy(false);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }
    /** 过滤已经选择的批次 */
    private filterSelected(selected: MaterialIssueBatchJournal): void {
        if (selected.materialBatchInfos.length === 0) {
            return;
        }
        for (let item of selected.materialBatchInfos) {
            let batchItem: bo.MaterialBatch = this.batchData.find(c => c.batchCode === item.batchCode);
            if (ibas.objects.isNull(batchItem)) {
                // 移除已选择的批次  因为不存在
                // item.delete();
                item.markDeleted(true);
            } else {
                batchItem.quantity = batchItem.quantity - item.quantity;
            }
        }
    }

    /**  添加已经扣减的批次库存 */
    private addBatchJournal(data: bo.MaterialBatchJournal[]): void {
        for (let item of data) {
            let batch: bo.MaterialBatch = this.batchData.find(c => c.batchCode === item.batchCode);
            if (!ibas.objects.isNull(batch)) {
                batch.quantity = Number(batch.quantity) + Number(item.quantity);
            } else {
                batch = new bo.MaterialBatch();
                batch.batchCode = item.batchCode;
                batch.quantity = item.quantity;
                this.batchData.push(batch);
            }
        }
    }
    /** 运行服务 */
    runService(contract: IMaterialIssueBatchContract[]): void {
        // 行数据
        if (contract.length >= 1) {
            this.bindBatchServiceData(contract);
        }
        super.show();
    }
    /** 绑定服务数据 */
    bindBatchServiceData(contract: IMaterialIssueBatchContract[]): void {
        let batchServiceDatas: MaterialIssueBatchJournal[] = Array<MaterialIssueBatchJournal>();
        for (let item of contract) {
            let batchServiceData: MaterialIssueBatchJournal = new MaterialIssueBatchJournal(item);
            batchServiceData.direction = ibas.emDirection.OUT;
            batchServiceDatas.push(batchServiceData);
        }
        this.batchServiceDatas = batchServiceDatas;
    }
    protected saveData(): void {
        // 批次数量错误
        for (let batchJournalLine of this.batchServiceDatas) {
            if (batchJournalLine.needBatchQuantity !== 0) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batch_quantity_create_error"));
                return;
            }
        }
        this.close();
    }
}

/** 视图-批次新建 */
export interface IMaterialIssueBatchView extends ibas.IBOView {
    /** 显示数据 */
    showLeftData(datas: bo.MaterialBatch[]): void;
    showRightData(datas: MaterialIssueBatchInfo[]): void;
    showJournalLineData(datas: MaterialIssueBatchJournal[]): void;
    /** 选择设置批次中凭证行信息事件 */
    selectMaterialBatchJournalLineEvent: Function;
    /** 自动选择事件 */
    autoSelectMaterialBatchEvent: Function;
    /** 添加选择的批次事件 */
    addBatchMaterialBatchEvent: Function;
    /** 移除选择的批次事件 */
    removeBatchMaterialBatchEvent: Function;
    /** 返回数据 */
    saveDataEvent: Function;
}

/** 批次选择服务映射 */
export class MaterialIssueBatchServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialIssueBatchService.APPLICATION_ID;
        this.name = MaterialIssueBatchService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = MaterialIssueBatchServiceProxy;
    }
    /** 创建服务实例 */
    create(): ibas.IService<ibas.IServiceCaller<ibas.IServiceContract>> {
        return new MaterialIssueBatchService();
    }
}