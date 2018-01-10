/*
 * @Author: fancy
 * @Date: 2017-11-27 16:29:14
 * @Last Modified by: Fancy
 * @Last Modified time: 2018-01-08 16:04:26
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
import { emAutoSelectBatchSerialRules, MaterialIssueBatchServiceProxy,IMaterialBatchContract } from "../../api/Datas";
import { BORepositoryMaterials } from "../../borep/BORepositories";
import {
    IMaterialBatchJournal,
} from "../../api/bo/index";
import { MaterialBatchJournal } from "../../borep/bo/index";
import { emDocumentStatus, emDirection } from "ibas/index";

export class MaterialIssueBatchService extends ibas.ServiceApplication<IMaterialIssueBatchView, IMaterialBatchContract[]> {

    /** 应用标识 */
    static APPLICATION_ID: string = "141e2a0f-3120-40a3-9bb4-f8b61672ed9c";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialissuebatchservice";
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialIssueBatchService.APPLICATION_ID;
        this.name = MaterialIssueBatchService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 服务契约 */
    // private contract: IMaterialBatchContract[];
    /** 批次服务数据 */
    protected batchJournals: IMaterialBatchContract[];
    /** 可选批次信息 */
    protected batchData: bo.MaterialBatch[];


    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.selectMaterialBatchJournalLineEvent = this.selectMaterialBatchJournalLine;
        this.view.autoSelectMaterialBatchEvent = this.autoSelectMaterialBatch;
        this.view.addBatchMaterialBatchEvent = this.addBatchMaterialBatch;
        this.view.removeBatchMaterialBatchEvent = this.removeBatchMaterialBatch;
        this.view.confirmDataEvent = this.confirmData;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showJournalLineData(this.batchJournals);
    }

    /** 选择凭证行事件 -更新可用批次 */
    protected selectMaterialBatchJournalLine(selected: IMaterialBatchContract): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let that: this = this;
        // 根据物料查询可用批次
        that.fetchBatchData(selected);
        if (!ibas.objects.isNull(selected.materialBatchs)) {
            that.view.showRightData(selected.materialBatchs.filter(c => c.isDeleted === false && c.direction === emDirection.OUT));
        }
    }
    /**
     * 自动选择物料批次事件
     * @param selected 选择的凭证行
     * @param rules 自动选择批次规则
     */
    protected autoSelectMaterialBatch(journal: IMaterialBatchContract, rules: emAutoSelectBatchSerialRules): void {
        // 未选择凭证行
        if (ibas.objects.isNull(journal)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // 不需要选择批次了
        if (!this.isNeedToSelected(journal)) {
            this.view.showRightData(journal.materialBatchs.filter(c => c.isDeleted === false && c.direction === emDirection.OUT));
            return;
        }
        if (ibas.objects.isNull(this.batchData.filter(c => c.isDeleted === false))) {
            // 查询可用批次信息
            this.fetchBatchData(journal);
            return;
        }
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
        this.allocateBatch(journal, this.batchData);
        this.view.showLeftData(this.batchData.filter(c => c.quantity > 0));
        this.view.showRightData(journal.materialBatchs.filter(c => c.isDeleted === false && c.direction === emDirection.OUT));
    }
    /**
     * 分配批次
     * @param journal 凭证行
     * @param selectItem 可供选择的批次
     */
    protected allocateBatch(journal: IMaterialBatchContract, selectItem: bo.MaterialBatch[]): void {
        let needQuantity: number = Number(journal.quantity);
        journal.materialBatchs.filter(c => c.isDeleted === false && c.direction === emDirection.OUT)
            .forEach(c => needQuantity = needQuantity - Number(c.quantity));
        for (let item of selectItem.filter(c => c.quantity > 0 && c.isDeleted === false)) {
            // 已分配数量
            if (!this.isNeedToSelected(journal)) {
                return;
            }
            // 在已选择的行中找该批次记录
            let batchLine: IMaterialBatchJournal = journal.materialBatchs
                .find(c => c.batchCode === item.batchCode);
            // 未选择该批次 新建批次日记账
            if (ibas.objects.isNull(batchLine)) {
                let batchJournal: bo.MaterialBatchJournal = new bo.MaterialBatchJournal();
                batchJournal.itemCode = item.itemCode;
                batchJournal.warehouse = item.warehouse;
                batchJournal.batchCode = item.batchCode;
                batchJournal.direction = ibas.emDirection.OUT;
                if (item.quantity <= needQuantity) {
                    batchJournal.quantity = item.quantity;
                    needQuantity = needQuantity - item.quantity;
                    item.quantity = 0;
                } else {
                    batchJournal.quantity = needQuantity;
                    needQuantity = 0;
                    item.quantity = ibas.numbers.toFloat(item.quantity) - ibas.numbers.toFloat(batchJournal.quantity);
                }
                journal.materialBatchs.create(batchJournal);
            } else {
                // 已选择该批次 修改批次日记账
                if (item.quantity <= needQuantity) {
                    batchLine.quantity = ibas.numbers.toFloat(batchLine.quantity) + ibas.numbers.toFloat(item.quantity);
                    needQuantity = needQuantity - item.quantity;
                    item.quantity = 0;
                } else {
                    let changeQuantity: number = needQuantity;
                    batchLine.quantity = ibas.numbers.toFloat(batchLine.quantity) + ibas.numbers.toFloat(needQuantity);
                    item.quantity = ibas.numbers.toFloat(item.quantity) - ibas.numbers.toFloat(changeQuantity);
                    needQuantity = 0;
                }
            }

        }
    }
    /**
     * 添加选择的批次事件
     * @param journal 凭证行
     * @param items 可供选择的批次
     */
    protected addBatchMaterialBatch(journal: IMaterialBatchContract, items: bo.MaterialBatch[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(journal)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        if (items.length === 0) {
            return;
        }
        this.allocateBatch(journal, items);
        this.view.showLeftData(this.batchData.filter(c => c.quantity > 0));
        this.view.showRightData(journal.materialBatchs.filter(c => c.isDeleted === false && c.direction === emDirection.OUT));
    }

    /**
     * 移除选择的批次事件
     * @param selected 凭证行
     * @param items 已选择的批次
     */
    protected removeBatchMaterialBatch(selected: IMaterialBatchContract, items: bo.MaterialBatchJournal[]): void {
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
        // 移除项目
        for (let item of items) {
            // 找到对应的入库批次
            let batchIn:IMaterialBatchJournal = selected.materialBatchs
            .find(c=>c.batchCode === item.batchCode && c.direction === emDirection.IN);
            if (selected.materialBatchs.indexOf(item) >= 0) {
                if (item.isNew) {
                    selected.materialBatchs.remove(item);
                    selected.materialBatchs.remove(batchIn);
                } else {
                    item.delete();
                    batchIn.markDeleted(true);
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
        this.view.showRightData(selected.materialBatchs.filter(c => c.isDeleted === false && c.direction === emDirection.OUT));
    }

    /**
     * 查询可用批次
     * @param selected 选择的凭证行
     */
    protected fetchBatchData(selected: IMaterialBatchContract): void {
        this.busy(true);
        let that: this = this;
        let criteria: ibas.ICriteria = new ibas.Criteria();
        let condition: ibas.ICondition = criteria.conditions.create();
        condition.alias = bo.MaterialBatch.PROPERTY_ITEMCODE_NAME;
        condition.operation = ibas.emConditionOperation.EQUAL;
        condition.value = selected.itemCode;
        condition = criteria.conditions.create();
        condition.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
        condition.operation = ibas.emConditionOperation.EQUAL;
        condition.value = selected.warehouse;
        condition.relationship = ibas.emConditionRelationship.AND;
        condition = criteria.conditions.create();
        condition.alias = bo.MaterialBatch.PROPERTY_QUANTITY_NAME;
        condition.operation = ibas.emConditionOperation.GRATER_THAN;
        condition.value = "0";
        condition.relationship = ibas.emConditionRelationship.AND;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialBatch({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatch>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.batchData = opRslt.resultObjects;
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

    /**
     * 过滤已经选择的批次
     * @param selected 选择的凭证行
     */
    private filterSelected(selected: IMaterialBatchContract): void {
        if (selected.materialBatchs.length === 0) {
            return;
        }
        for (let item of selected.materialBatchs) {
            let batchItem: bo.MaterialBatch = this.batchData.find(c => c.batchCode === item.batchCode);
            if (ibas.objects.isNull(batchItem)) {
                item.markDeleted(true);
            } else if (item.isNew || item.lineStatus === emDocumentStatus.PLANNED) {
                batchItem.quantity = batchItem.quantity - item.quantity;
            }
        }
    }

    /** 运行服务 */
    runService(contract: IMaterialBatchContract[]): void {
        // 行数据
        if (contract.length >= 1) {
            this.bindBatchJournalData(contract);
        }
        super.show();
    }
    /** 绑定日记账信息 */
    bindBatchJournalData(contract: IMaterialBatchContract[]): void {
        let batchJournals: IMaterialBatchContract[] = new ibas.ArrayList<IMaterialBatchContract>();
        for (let item of contract) {
            batchJournals.push({
                itemCode: item.itemCode,
                warehouse: item.warehouse,
                quantity: item.quantity,
                direction: ibas.emDirection.OUT,
                materialBatchs: item.materialBatchs
            });
        }
        this.batchJournals = batchJournals;
    }
    protected confirmData(): void {
        // 批次数量错误
        for (let item of this.batchJournals) {
            if (this.isNeedToSelected(item)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batch_quantity_create_error"));
                return;
            }
        }
        this.close();
    }

    /**
     * 是否需要选择批次  false 不需要；true 需要
     * @param journal 批次日记账行
     */
    isNeedToSelected(journal: IMaterialBatchContract): boolean {
        let selectedQuantity: number = Number(0);
        journal.materialBatchs.filter(c => c.isDeleted === false && c.direction === emDirection.OUT)
            .forEach(c => selectedQuantity = selectedQuantity + Number(c.quantity));
        if (Number(selectedQuantity) === Number(journal.quantity)) {
            return false;
        }
        return true;
    }
}

/** 视图-批次新建 */
export interface IMaterialIssueBatchView extends ibas.IBOView {
    /** 显示数据 */
    showLeftData(datas: bo.MaterialBatch[]): void;
    showRightData(datas: IMaterialBatchJournal[]): void;
    showJournalLineData(datas: IMaterialBatchContract[]): void;
    /** 选择设置批次中凭证行信息事件 */
    selectMaterialBatchJournalLineEvent: Function;
    /** 自动选择事件 */
    autoSelectMaterialBatchEvent: Function;
    /** 添加选择的批次事件 */
    addBatchMaterialBatchEvent: Function;
    /** 移除选择的批次事件 */
    removeBatchMaterialBatchEvent: Function;
    /** 返回数据 */
    confirmDataEvent: Function;
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

