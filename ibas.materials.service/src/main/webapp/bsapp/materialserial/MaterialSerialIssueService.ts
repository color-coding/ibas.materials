/*
 * @Author: fancy
 * @Date: 2017-11-27 16:40:53
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-11 16:23:01
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
    MaterialSerialIssueServiceProxy,
} from "../../api/Datas";
import { BORepositoryMaterials } from "../../borep/BORepositories";
import {
    IMaterialIssueSerials,
    IMaterialIssueSerialLine,
    IMaterialIssueSerialContract,
    IMaterialIssueSerialContractLine,
} from "../../api/bo/index";
import {
    MaterialIssueSerialJournal,
    MaterialIssueSerialInfo
} from "./index";
import { MaterialSerial } from "../../borep/bo/index";
export class MaterialSerialIssueService extends ibas.BOApplication<IMaterialSerialIssueView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "bdd08ed9-5d6b-4058-b8e5-f8fc6975a637";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialserialissue";
    /** 业务对象编码 */
    // static BUSINESS_OBJECT_CODE: string = bo.MaterialSerialJournal.BUSINESS_OBJECT_ISSUE_CODE;

    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialIssueService.APPLICATION_ID;
        this.name = MaterialSerialIssueService.APPLICATION_NAME;
        // this.boCode = MaterialSerialIssueService.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 服务契约 */
    private contract: IMaterialIssueSerialContract;
    /** 序列服务数据 */
    protected serialServiceDatas: MaterialIssueSerialJournal[];
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
        this.view.saveDataEvent = this.saveData;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showJournalLineData(this.serialServiceDatas);
    }
    protected newData(): void {
        throw new Error("Method not implemented.");
    }
    /** 选择凭证行事件 -更新可用序列号 */
    protected selectMaterialSerialJournalLine(selected: MaterialIssueSerialJournal): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let that: this = this;
        // 根据物料查询可用序列号
        let criteria: ibas.ICriteria = new ibas.Criteria();
        let condition: ibas.ICondition;
        condition = new ibas.Condition(bo.MaterialSerial.PROPERTY_ITEMCODE_NAME, ibas.emConditionOperation.EQUAL, selected.itemCode);
        criteria.conditions.add(condition);
        condition = new ibas.Condition(bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME, ibas.emConditionOperation.EQUAL, selected.warehouse);
        criteria.conditions.add(condition);
        condition = new ibas.Condition(bo.MaterialSerial.PROPERTY_INSTOCK_NAME, ibas.emConditionOperation.EQUAL, "Y");
        criteria.conditions.add(condition);
        that.fetchSerialData(criteria, selected);
        that.view.showRightData(selected.materialSerialInfos);
    }
    /*
    *  自动选择物料序列
    *  selected  选中的凭证行
    *  rules  自动选择序列规则
    */
    protected autoSelectMaterialSerial(selected: MaterialIssueSerialJournal, rules: emAutoSelectBatchSerialRules): void {
        // 未选择凭证行
        if (ibas.objects.isNull(selected)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // let SerialItem: MaterialIssueSerialJournal = this.serialServiceDatas.find(c => c.index === selected.index);
        // 不需要选择序列号了
        if (selected.needSerialQuantity === 0) {
            this.view.showRightData(selected.materialSerialInfos.filterDeleted());
            return;
        }
        // 无序列号可用
        if (ibas.objects.isNull(this.serialData.filter(c => c.isDeleted === true))) {
            // 查询可用序列号信息
            let criteria: ibas.ICriteria = new ibas.Criteria();
            let condition: ibas.ICondition;
            condition = new ibas.Condition(bo.MaterialSerial.PROPERTY_ITEMCODE_NAME, ibas.emConditionOperation.EQUAL, selected.itemCode);
            criteria.conditions.add(condition);
            condition = new ibas.Condition(bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME, ibas.emConditionOperation.EQUAL, selected.warehouse);
            condition.relationship = ibas.emConditionRelationship.AND;
            criteria.conditions.add(condition);
            condition = new ibas.Condition(bo.MaterialSerial.PROPERTY_INSTOCK_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES);
            condition.relationship = ibas.emConditionRelationship.AND;
            criteria.conditions.add(condition);
            this.fetchSerialData(criteria, selected);
            return;
        }
        this.allocateSerial(selected, rules);
        // let line: MaterialIssueSerialJournal = this.serialServiceDatas.find(c => c.index === selected.index);
        this.view.showLeftData(this.serialData.filter(c => c.isDeleted === false));
        this.view.showRightData(selected.materialSerialInfos.filterDeleted());

    }
    protected allocateSerial(journal: MaterialIssueSerialJournal, rule: emAutoSelectBatchSerialRules): void {
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

        let newSerialData: bo.MaterialSerial[] = new Array<bo.MaterialSerial>();
        let index: number = this.serialServiceDatas.indexOf(journal);
        let line: MaterialIssueSerialJournal = this.serialServiceDatas[index];
        for (let item of this.serialData.filter(c => c.isDeleted === false)) {
            // 已分配数量
            if (journal.needSerialQuantity === 0) {
                return;
            }
            item.delete();
            let serialJournal: MaterialIssueSerialInfo = new MaterialIssueSerialInfo();
            serialJournal.serialCode = item.serialCode;
            line.materialSerialInfos.createSerialJournal(serialJournal);
        }
    }
    /** 添加选择的序列号事件 */
    protected addSerialMaterialSerial(selected: MaterialIssueSerialJournal, items: bo.MaterialSerial[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(selected)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        let index: number = this.serialServiceDatas.indexOf(selected);
        let journalItem: MaterialIssueSerialJournal = this.serialServiceDatas[index];
        for (let item of items) {
            // 不需要选择序列号
            if (selected.needSerialQuantity === 0) {
                this.view.showRightData(journalItem.materialSerialInfos.filterDeleted());
                return;
            }
            let serialJournal: MaterialIssueSerialInfo = new MaterialIssueSerialInfo();
            serialJournal.serialCode = item.serialCode;
            journalItem.materialSerialInfos.createSerialJournal(serialJournal);
            item.delete();
        }
        this.view.showLeftData(this.serialData.filter(c => c.isDeleted === false));
        this.view.showRightData(selected.materialSerialInfos);
    }
    /** 移除选择的序列号事件 */
    protected removeSerialMaterialSerial(selected: MaterialIssueSerialJournal, items: MaterialIssueSerialInfo[]): void {
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
        // let line: MaterialIssueSerialJournal = this.serialServiceDatas.find(c => c.index === selected.index);
        // 移除项目
        for (let item of items) {
            if (selected.materialSerialInfos.indexOf(item) >= 0) {
                selected.materialSerialInfos.deleteSerialJournal(item);
            }
            let serial: MaterialSerial = this.serialData.find(c => c.serialCode === item.serialCode);
            if (!ibas.objects.isNull(serial)) {
                serial.markNew(true);
            }
        }
        this.view.showLeftData(this.serialData.filter(c => c.isDeleted === false));
        this.view.showRightData(selected.materialSerialInfos.filterDeleted());
    }
    /** 查询数据 */
    protected fetchSerialData(criteria: ibas.ICriteria, selected: MaterialIssueSerialJournal): void {
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
    /** 绑定服务数据 */
    bindSerialServiceData(contract: IMaterialIssueSerialContract): void {
        let serialServiceDatas: MaterialIssueSerialJournal[] = Array<MaterialIssueSerialJournal>();
        for (let item of contract.materialIssueSerialContractLines) {
            let serialServiceData: MaterialIssueSerialJournal = new MaterialIssueSerialJournal(item);
            serialServiceData.direction = ibas.emDirection.OUT;
            serialServiceDatas.push(serialServiceData);
        }
        this.serialServiceDatas = serialServiceDatas;
    }

    protected filterSelected(fetchData: bo.MaterialSerial[], selected: MaterialIssueSerialJournal): bo.MaterialSerial[] {
        if (selected.materialSerialInfos.length === 0) {
            this.serialData = fetchData;
            return fetchData;
        }
        for (let item of selected.materialSerialInfos) {
            let serialItem: bo.MaterialSerial = fetchData.find(c => c.serialCode === item.serialCode);
            if (!ibas.objects.isNull(serialItem)) {
                serialItem.delete();
            }
        }
        this.serialData = fetchData;

    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        if (arguments[0].caller.materialIssueSerialContractLines.length >= 1) {
            that.bindSerialServiceData(arguments[0].caller);
        }
        super.run.apply(this, args);
    }
    protected saveData(): void {
        this.close();
    }
}

/** 视图-序列号新建 */
export interface IMaterialSerialIssueView extends ibas.IBOView {
    /** 显示数据 */
    showLeftData(datas: bo.MaterialSerial[]): void;
    showRightData(datas: MaterialIssueSerialInfo[]): void;
    showJournalLineData(datas: MaterialIssueSerialJournal[]): void;
    /** 选择设置序列号中凭证行信息事件 */
    selectMaterialSerialJournalLineEvent: Function;
    /** 自动选择事件 */
    autoSelectMaterialSerialEvent: Function;
    /** 添加选择的序列号事件 */
    addSerialMaterialSerialEvent: Function;
    /** 移除选择的序列号事件 */
    removeSerialMaterialSerialEvent: Function;
    /** 返回数据 */
    saveDataEvent: Function;
}

/** 序列号选择服务映射 */
export class MaterialSerialIssueServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialIssueService.APPLICATION_ID;
        this.name = MaterialSerialIssueService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = MaterialSerialIssueServiceProxy;
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IApplicationServiceContract> {
        return new MaterialSerialIssueService();
    }
}