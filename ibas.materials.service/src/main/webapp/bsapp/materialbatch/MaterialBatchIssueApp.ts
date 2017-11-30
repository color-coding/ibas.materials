/*
 * @Author: fancy
 * @Date: 2017-11-27 16:29:14
 * @Last Modified by: fancy
 * @Last Modified time: 2017-11-27 18:03:07
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
import { emAutoSelectBatchSerialRules } from "../../api/Datas";
import { BORepositoryMaterials } from "../../borep/BORepositories";
import {
    IMaterialIssueBatchs,
    IMaterialIssueLineBatch,
    IMaterialIssueBatchLine,
    IMaterialIssueBatchContract,
    IMaterialIssueBatchContractLine,
} from "../../api/bo/index";

export class MaterialBatchIssueApp extends ibas.BOApplication<IMaterialBatchIssueView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "141e2a0f-3120-40a3-9bb4-f8b61672ed9c";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialbatchissue";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.MaterialBatchJournal.BUSINESS_OBJECT_ISSUE_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialBatchIssueApp.APPLICATION_ID;
        this.name = MaterialBatchIssueApp.APPLICATION_NAME;
        this.boCode = MaterialBatchIssueApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 完成 */
    private onCompleted: Function;
    /** 服务契约 */
    private contract: IMaterialIssueBatchContract;
    /** 批次服务数据 */
    protected batchServiceDatas: bo.MaterialBatchService[];
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
    protected selectMaterialBatchJournalLine(selected: bo.MaterialBatchService): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let that: this = this;
        // 根据物料查询可用批次
        that.fetchBatchData(selected);
        that.view.showRightData(selected.materialBatchServiceJournals);
    }
    /** 自动选择物料批次事件 */
    protected autoSelectMaterialBatch(selected: bo.MaterialBatchService, rules: emAutoSelectBatchSerialRules): void {
        // 未选择凭证行
        if (ibas.objects.isNull(selected)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        let batchItem: bo.MaterialBatchService = this.batchServiceDatas.find(c => c.index === selected.index);
        // 不需要选择批次了
        if (batchItem.needBatchQuantity === 0) {
            this.view.showRightData(batchItem.materialBatchServiceJournals.filterDeleted());
            return;
        }
        if (ibas.objects.isNull(this.batchData.filter(c => c.isDeleted === false))) {
            // 查询可用批次信息
            this.fetchBatchData(selected);
            return;
        }
        this.allocateBatch(selected, rules);
        let line: bo.MaterialBatchService = this.batchServiceDatas.find(c => c.index === selected.index);
        this.view.showLeftData(this.batchData.filter(c => c.quantity > 0));
        this.view.showRightData(line.materialBatchServiceJournals.filterDeleted());
    }
    /** 分配物料批次 */
    protected allocateBatch(journal: bo.MaterialBatchService, rules: emAutoSelectBatchSerialRules): void {
        // 按照一定规则排序
        if (rules === emAutoSelectBatchSerialRules.FIRSTINFIRSTOUT) {
            this.batchData.sort((batch1, batch2) => batch1.createDate < batch2.createDate ? -1
                : (batch1.createDate > batch2.createDate ? 1 : (batch1.createTime < batch2.createTime ? -1
                    : (batch1.createTime > batch2.createTime ? 1 : 0))));
        } else if (rules === emAutoSelectBatchSerialRules.FIRSTINLASTOUT) {
            this.batchData.sort((batch1, batch2) => batch1.createDate > batch2.createDate ? -1
                : (batch1.createDate < batch2.createDate ? 1 : (batch1.createTime > batch2.createTime ? -1
                    : (batch1.createTime < batch2.createTime ? 1 : 0))));
        } else if (rules === emAutoSelectBatchSerialRules.ORDERBYCODE) {
            this.batchData.sort((batch1, batch2) => batch1.batchCode < batch2.batchCode ? -1
                : batch1.batchCode > batch2.batchCode ? 1 : 0);
        }

        // let newBatchData: bo.MaterialBatch[] = new Array<bo.MaterialBatch>();
        let line: bo.MaterialBatchService = this.batchServiceDatas.find(c => c.index === journal.index);
        for (let item of this.batchData.filter(c => c.quantity > 0 && c.isDeleted === false)) {
            // 已分配数量
            if (line.needBatchQuantity === 0) {
                return;
            }
            let batchLine: bo.MaterialBatchJournal = line.materialBatchServiceJournals
                .find(c => c.batchCode === item.batchCode);
            if (ibas.objects.isNull(batchLine)) {
                batchLine = line.materialBatchServiceJournals.createJournal(item);
                if (item.quantity <= line.needBatchQuantity) {
                    batchLine.quantity = item.quantity;
                    item.quantity = 0;
                } else {
                    batchLine.quantity = line.needBatchQuantity;
                    item.quantity = Number(item.quantity) - Number(batchLine.quantity);
                }
            } else {
                if (item.quantity <= line.needBatchQuantity) {
                    batchLine.quantity = Number(batchLine.quantity) + Number(item.quantity);
                    item.quantity = 0;
                } else {
                    let changeQuantity: number = line.needBatchQuantity;
                    batchLine.quantity = Number(batchLine.quantity) + Number(line.needBatchQuantity);
                    item.quantity = Number(item.quantity) - Number(changeQuantity);
                }
            }
        }
    }
    /** 添加选择的批次事件 */
    protected addBatchMaterialBatch(selected: bo.MaterialBatchService, items: bo.MaterialBatch[]): void {
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

        let journalItem: bo.MaterialBatchService = this.batchServiceDatas.find(c => c.index === selected.index);
        let allocateQuantity: number = 0;
        for (let item of items) {
            // 不需要选择批次了
            if (journalItem.needBatchQuantity === 0) {
                this.view.showRightData(journalItem.materialBatchServiceJournals.filterDeleted());
                return;
            }

            let batchline: bo.MaterialBatchJournal = journalItem.materialBatchServiceJournals
                .find(c => c.batchCode === item.batchCode);
            // 该凭证行未选择该批次
            if (ibas.objects.isNull(batchline)) {
                batchline = journalItem.materialBatchServiceJournals.create();
                // 可选批次行数量小于或等于需求数量
                if (item.quantity <= journalItem.needBatchQuantity) {
                    batchline.quantity = item.quantity;
                    item.quantity = 0;
                } else {
                    // 可选批次行数量大于需求数量
                    batchline.quantity = journalItem.needBatchQuantity;
                    item.quantity = Number(item.quantity) - Number(batchline.quantity);
                }
            } else {
                // 该凭证行已经选择过该批次
                if (item.quantity <= journalItem.needBatchQuantity) {
                    batchline.quantity = Number(batchline.quantity) + Number(item.quantity);
                    item.quantity = 0;
                } else {
                    batchline.quantity += journalItem.needBatchQuantity;
                    item.quantity -= batchline.quantity;
                }
            }
            batchline.batchCode = item.batchCode;
            batchline.itemCode = item.itemCode;
            batchline.warehouse = item.warehouse;
            batchline.createDate = item.createDate;
            batchline.createTime = item.createTime;
        }
        this.view.showLeftData(this.batchData.filter(c => c.quantity > 0));
        this.view.showRightData(journalItem.materialBatchServiceJournals);
    }
    /** 移除选择的批次事件 */
    protected removeBatchMaterialBatch(selected: bo.MaterialBatchService, items: bo.MaterialBatchJournal[]): void {
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
        let line: bo.MaterialBatchService = this.batchServiceDatas.find(c => c.index === selected.index);
        // 移除项目
        for (let item of items) {
            if (line.materialBatchServiceJournals.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    line.materialBatchServiceJournals.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
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
        this.view.showRightData(line.materialBatchServiceJournals.filterDeleted());
    }
    /** 查询数据 */
    protected fetchBatchData(selected: bo.MaterialBatchService): void {
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
    protected fetchBatchJournal(selected: bo.MaterialBatchService): void {
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
    private filterSelected(selected: bo.MaterialBatchService): void {
        if (selected.materialBatchServiceJournals.length === 0) {
            return;
        }
        for (let item of selected.materialBatchServiceJournals) {
            let batchItem: bo.MaterialBatch = this.batchData.find(c => c.batchCode === item.batchCode);
            if (ibas.objects.isNull(batchItem)) {
                // 移除已选择的批次  因为不存在
                item.delete();
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
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        // 行数据
        if (arguments[0].caller.materialIssueBatchContractLines.length >= 1) {
            that.bindBatchServiceData(arguments[0].caller);
        }
        // 选择的批次
        if (!ibas.objects.isNull(arguments[0].handleData)
            && arguments[0].handleData.materialIssueLineBatchs.length >= 1) {
            that.bindBatchServiceDataLine(arguments[0].handleData);
        }
        this.onCompleted = arguments[0].onCompleted;
        super.run();
    }
    /** 绑定服务数据 */
    bindBatchServiceData(contract: IMaterialIssueBatchContract): void {
        let batchServiceDatas: bo.MaterialBatchService[] = Array<bo.MaterialBatchService>();
        for (let item of contract.materialIssueBatchContractLines) {
            let batchServiceData: bo.MaterialBatchService = bo.MaterialBatchService.create(item);
            batchServiceData.direction = ibas.emDirection.OUT;
            batchServiceDatas.push(batchServiceData);
        }
        this.batchServiceDatas = batchServiceDatas;
    }
    /** 绑定服务行数据 */
    bindBatchServiceDataLine(editData: IMaterialIssueBatchs): void {
        if (!ibas.objects.isNull(this.batchServiceDatas)) {
            for (let item of editData.materialIssueLineBatchs) {
                let batchLine: bo.MaterialBatchService = this.batchServiceDatas[item.index];
                if (!ibas.objects.isNull(batchLine)
                    && item.materialIssueBatchLines.length > 0) {
                    batchLine.materialBatchServiceJournals.createJournals(item.materialIssueBatchLines);
                }
            }
        }
    }
    /** 获取回传信息 */
    getCallBackData(): IMaterialIssueLineBatch[] {
        let callBack: IMaterialIssueLineBatch[] = [];
        for (let item of this.batchServiceDatas) {
            let batchContract: IMaterialIssueLineBatch = {
                index: item.index,
                materialIssueBatchLines: []
            };
            if (item.materialBatchServiceJournals.length > 0) {
                for (let line of item.materialBatchServiceJournals) {
                    let batchLine: IMaterialIssueBatchLine = {
                        batchCode: line.batchCode,
                        quantity: line.quantity,
                        itemCode: line.itemCode,
                        warehouse: line.warehouse,
                        direction: line.direction,
                    };
                    batchContract.materialIssueBatchLines.push(batchLine);
                }
            }
            callBack.push(batchContract);
        }
        return callBack;
    }
    protected saveData(): void {
        // 批次数量错误
        for (let batchJournalLine of this.batchServiceDatas) {
            if (batchJournalLine.needBatchQuantity !== 0) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batch_quantity_create_error"));
                return;
            }
        }
        this.fireCompleted({ materialIssueLineBatchs: this.getCallBackData() });
    }
    /** 触发完成事件 */
    private fireCompleted(selecteds: IMaterialIssueBatchs): void {
        // 关闭视图
        this.close();
        if (ibas.objects.isNull(this.onCompleted)) {
            return;
        }
        if (ibas.objects.isNull(selecteds)) {
            return;
        }
        if (selecteds.materialIssueLineBatchs.length === 0) {
            // 没有数据不触发事件
            return;
        }
        try {
            // 调用完成事件
            this.onCompleted.call(this.onCompleted, selecteds);
        } catch (error) {
            // 完成事件出错
            this.messages(error);
        }
    }
}

/** 视图-批次新建 */
export interface IMaterialBatchIssueView extends ibas.IBOView {
    /** 显示数据 */
    showLeftData(datas: bo.MaterialBatch[]): void;
    showRightData(datas: bo.MaterialBatchJournal[]): void;
    showJournalLineData(datas: bo.MaterialBatchService[]): void;
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
export class MaterialBatchIssueServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialBatchIssueApp.APPLICATION_ID;
        this.name = MaterialBatchIssueApp.APPLICATION_NAME;
        this.category = MaterialBatchIssueApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = ibas.BOLineHandleServiceProxy;
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IBOLineHandleServiceContract> {
        return new MaterialBatchIssueApp();
    }
}