/*
 * @Author: fancy
 * @Date: 2017-11-27 16:40:53
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-27 15:37:48
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
import {
    emAutoSelectBatchSerialRules,
    MaterialIssueSerialServiceProxy,
} from "../../api/Datas";
import { BORepositoryMaterials } from "../../borep/BORepositories";
import {
    IMaterialSerialContract,
} from "../../api/bo/index";
import {
    MaterialSerialServiceJournal
} from "./index";
import { MaterialSerial } from "../../borep/bo/index";
import { emDirection } from "ibas/index";
export class MaterialIssueSerialService extends ibas.ServiceApplication<IMaterialIssueSerialView, IMaterialSerialContract[]> {

    /** 应用标识 */
    static APPLICATION_ID: string = "bdd08ed9-5d6b-4058-b8e5-f8fc6975a637";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialissueserialservice";

    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialIssueSerialService.APPLICATION_ID;
        this.name = MaterialIssueSerialService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 服务契约 */
    private contract: IMaterialSerialContract[];
    /** 序列服务数据 */
    protected serialJournals: MaterialSerialServiceJournal[];
    /** 可选序列号信息 */
    protected serialData: bo.MaterialSerial[];

    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.selectMaterialSerialJournalLineEvent = this.selectMaterialSerialJournalLine;
        this.view.autoSelectMaterialSerialEvent = this.autoSelectMaterialSerial;
        this.view.addSerialMaterialSerialEvent = this.addSerialMaterialSerial;
        this.view.removeSerialMaterialSerialEvent = this.removeSerialMaterialSerial;
        this.view.confirmDataEvent = this.confirmData;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showJournalLineData(this.serialJournals);
    }
    /**
     * 选择凭证行事件 -更新可用序列号
     * @param selected 选中的凭证行
     */
    protected selectMaterialSerialJournalLine(selected: MaterialSerialServiceJournal): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let that: this = this;
        // 根据物料查询可用序列号
        let criteria: ibas.ICriteria = new ibas.Criteria();
        let condition: ibas.ICondition = criteria.conditions.create();
        condition.alias = bo.MaterialSerial.PROPERTY_ITEMCODE_NAME;
        condition.value = selected.itemCode;
        condition.operation = ibas.emConditionOperation.EQUAL;

        condition = criteria.conditions.create();
        condition.alias = bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME;
        condition.value = selected.warehouse;
        condition.operation = ibas.emConditionOperation.EQUAL;
        condition.relationship = ibas.emConditionRelationship.AND;

        condition = criteria.conditions.create();
        condition.alias = bo.MaterialSerial.PROPERTY_INSTOCK_NAME;
        condition.value = ibas.emYesNo.YES.toString();
        condition.operation = ibas.emConditionOperation.EQUAL;
        condition.relationship = ibas.emConditionRelationship.AND;

        that.fetchSerialData(criteria, selected);
        if (!ibas.objects.isNull(selected.contract.materialSerials)) {
            that.view.showRightData(selected.contract.materialSerials.filter(c => c.isDeleted === false));
        }
    }

    /**
     * 自动选择物料序列
     * @param selected 选中的凭证行
     * @param rules 自动选择序列规则
     */
    protected autoSelectMaterialSerial(selected: MaterialSerialServiceJournal, rule: emAutoSelectBatchSerialRules): void {
        // 未选择凭证行
        if (ibas.objects.isNull(selected)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // let SerialItem: MaterialSerialServiceJournal = this.serialJournals.find(c => c.index === selected.index);
        // 不需要选择序列号了
        if (selected.quantity <= selected.contract.materialSerials.length) {
            this.view.showRightData(selected.contract.materialSerials.filter(c => c.isDeleted === false));
            return;
        }
        // 无序列号可用
        if (ibas.objects.isNull(this.serialData.filter(c => c.isDeleted === false))) {
            // 查询可用序列号信息
            let criteria: ibas.ICriteria = new ibas.Criteria();
            let condition: ibas.ICondition = criteria.conditions.create();
            condition.alias = bo.MaterialSerial.PROPERTY_ITEMCODE_NAME;
            condition.value = selected.itemCode;
            condition.operation = ibas.emConditionOperation.EQUAL;
            condition = criteria.conditions.create();
            condition.alias = bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME;
            condition.value = selected.warehouse;
            condition.operation = ibas.emConditionOperation.EQUAL;
            condition.relationship = ibas.emConditionRelationship.AND;
            condition = criteria.conditions.create();
            condition.alias = bo.MaterialSerial.PROPERTY_INSTOCK_NAME;
            condition.value = ibas.emYesNo.YES.toString();
            condition.operation = ibas.emConditionOperation.EQUAL;
            condition.relationship = ibas.emConditionRelationship.AND;
            this.fetchSerialData(criteria, selected);
            return;
        }
        // 按照一定规则排序
        if (rule === emAutoSelectBatchSerialRules.FIRST_IN_FIRST_OUT) {
            this.serialData.sort((serial1, serial2) => serial1.createDate < serial2.createDate ? -1
                : (serial1.createDate > serial2.createDate ? 1 : (serial1.createTime < serial2.createTime ? -1
                    : (serial1.createTime > serial2.createTime ? 1 : 0))));
        } else if (rule === emAutoSelectBatchSerialRules.FIRST_IN_LAST_OUT) {
            this.serialData.sort((serial1, serial2) => serial1.createDate > serial2.createDate ? -1
                : (serial1.createDate < serial2.createDate ? 1 : (serial1.createTime > serial2.createTime ? -1
                    : (serial1.createTime < serial2.createTime ? 1 : 0))));
        } else if (rule === emAutoSelectBatchSerialRules.ORDER_BY_CODE) {
            this.serialData.sort((serial1, serial2) => serial1.serialCode < serial2.serialCode ? -1
                : serial1.serialCode > serial2.serialCode ? 1 : 0);
        }
        this.allocateSerial(selected, this.serialData);
        this.view.showLeftData(this.serialData.filter(c => c.isDeleted === false));
        this.view.showRightData(selected.contract.materialSerials.filter(c => c.isDeleted === false));
    }
    /**
     * 为凭证行分配序列
     * @param journal 选中的凭证行
     * @param selectItems 可供选择的序列
     */
    protected allocateSerial(journal: MaterialSerialServiceJournal, selectItems: bo.MaterialSerial[]): void {
        let index: number = this.serialJournals.indexOf(journal);
        let journalLine: MaterialSerialServiceJournal = this.serialJournals[index];
        for (let item of selectItems.filter(c => c.isDeleted === false)) {
            // 已分配数量
            if (journalLine.quantity <= journalLine.contract.materialSerials.length) {
                return;
            }
            item.delete();
            let serialJournal: bo.MaterialSerialJournal = new bo.MaterialSerialJournal();
            serialJournal.serialCode = item.serialCode;
            serialJournal.itemCode = item.itemCode;
            serialJournal.warehouse = item.warehouse;
            serialJournal.direction = emDirection.OUT;
            journalLine.contract.materialSerials.create(serialJournal);
        }
    }
    /** 添加选择的序列号事件 */
    protected addSerialMaterialSerial(journal: MaterialSerialServiceJournal, items: bo.MaterialSerial[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(journal)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        this.allocateSerial(journal, items);
        this.view.showLeftData(this.serialData.filter(c => c.isDeleted === false));
        this.view.showRightData(journal.contract.materialSerials);
    }
    /** 移除选择的序列号事件 */
    protected removeSerialMaterialSerial(selected: MaterialSerialServiceJournal, items: bo.MaterialSerialJournal[]): void {
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
        // let line: MaterialSerialServiceJournal = this.serialJournals.find(c => c.index === selected.index);
        // 移除项目
        for (let item of items) {
            if (selected.contract.materialSerials.indexOf(item) >= 0) {
                if (item.isNew) {
                    selected.contract.materialSerials.remove(item);
                } else {
                    item.delete();
                }
            }
            let serial: MaterialSerial = this.serialData.find(c => c.serialCode === item.serialCode);
            if (!ibas.objects.isNull(serial)) {
                serial.markNew(true);
            } else {
                serial.itemCode = item.itemCode;
                serial.warehouse = item.warehouse;
                serial.serialCode = item.serialCode;
                this.serialData.push(serial);
            }
        }
        this.view.showLeftData(this.serialData.filter(c => c.isDeleted === false));
        this.view.showRightData(selected.contract.materialSerials.filter(c => c.isDeleted === false));
    }

    /**
     * 查询可用序列号
     * @param criteria 查询条件
     * @param selected 选择的凭证行
     */
    protected fetchSerialData(criteria: ibas.ICriteria, selected: MaterialSerialServiceJournal): void {
        this.busy(true);
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialSerial({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSerial>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.filterSelected(opRslt.resultObjects, selected);
                    that.view.showLeftData(that.serialData.filter(c => c.isDeleted === false));
                    that.busy(false);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }
    /** 绑定日记账信息 */
    bindSerialJournalData(contract: IMaterialSerialContract[]): void {
        let batchJournals: MaterialSerialServiceJournal[] = new ibas.ArrayList<MaterialSerialServiceJournal>();
        for (let item of contract) {
            batchJournals.push({
                contract: item,
                itemCode: item.itemCode,
                warehouse: item.warehouse,
                quantity: item.quantity,
                direction: ibas.emDirection.IN,
                needSerialQuantity: item.quantity,
                // selectedSerialQuantity: selectNum
            });
        }
        this.serialJournals = batchJournals;
    }

    protected filterSelected(fetchData: bo.MaterialSerial[], selected: MaterialSerialServiceJournal): bo.MaterialSerial[] {
        if (selected.contract.materialSerials.length === 0) {
            this.serialData = fetchData;
            return fetchData;
        }
        for (let item of selected.contract.materialSerials) {
            let serialItem: bo.MaterialSerial = fetchData.find(c => c.serialCode === item.serialCode);
            if (!ibas.objects.isNull(serialItem)) {
                serialItem.delete();
            }
        }
        this.serialData = fetchData;

    }
    /** 运行服务 */
    runService(contract: IMaterialSerialContract[]): void {
        // 行数据
        if (contract.length >= 1) {
            this.bindSerialJournalData(contract);
        }
        super.show();
    }
    protected confirmData(): void {
        for (let item of this.serialJournals) {
            if (this.isNeedToSelected(item)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batch_quantity_create_error"));
                return;
            }
        }
        this.close();
    }

    /**
     * 是否需要选择序列  false 不需要；true 需要
     * @param journal 序列日记账行
     */
    isNeedToSelected(journal: MaterialSerialServiceJournal): boolean {
        if (Number(journal.contract.materialSerials.length) === Number(journal.quantity)) {
            return false;
        }
        return true;
    }
}

/** 视图-序列号新建 */
export interface IMaterialIssueSerialView extends ibas.IBOView {
    /** 显示可供选择序列数据 */
    showLeftData(datas: bo.MaterialSerial[]): void;
    /** 显示已经选择的序列数据 */
    showRightData(datas: bo.MaterialSerialJournal[]): void;
    /** 显示序列日记账 */
    showJournalLineData(datas: MaterialSerialServiceJournal[]): void;
    /** 选择设置序列号中凭证行信息事件 */
    selectMaterialSerialJournalLineEvent: Function;
    /** 自动选择事件 */
    autoSelectMaterialSerialEvent: Function;
    /** 添加选择的序列号事件 */
    addSerialMaterialSerialEvent: Function;
    /** 移除选择的序列号事件 */
    removeSerialMaterialSerialEvent: Function;
    /** 返回数据 */
    confirmDataEvent: Function;
}

/** 序列号选择服务映射 */
export class MaterialIssueSerialServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialIssueSerialService.APPLICATION_ID;
        this.name = MaterialIssueSerialService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = MaterialIssueSerialServiceProxy;
    }
    /** 创建服务实例 */
    create(): ibas.IService<ibas.IServiceCaller<ibas.IServiceContract>> {
        return new MaterialIssueSerialService();
    }
}