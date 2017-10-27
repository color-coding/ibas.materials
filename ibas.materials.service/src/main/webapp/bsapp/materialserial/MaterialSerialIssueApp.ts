/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";
export class MaterialSerialIssueApp extends ibas.BOApplication<IMaterialSerialIssueView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "bdd08ed9-5d6b-4058-b8e5-f8fc6975a637";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialSerialissue";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.MaterialSerialJournal.BUSINESS_OBJECT_ISSUE_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialIssueApp.APPLICATION_ID;
        this.name = MaterialSerialIssueApp.APPLICATION_NAME;
        this.boCode = MaterialSerialIssueApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 完成 */
    private onCompleted: Function;
    /** 服务输入输出数据 */
    protected inputData: bo.MaterialBatchInput[];
    /** 可选序列号信息 */
    protected SerialData: bo.MaterialSerial[];

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
        this.view.showJournalLineData(this.inputData);
    }
    protected newData(): void {
        throw new Error("Method not implemented.");
    }
    /** 选择凭证行事件 -更新可用序列号 */
    protected selectMaterialSerialJournalLine(selected: bo.MaterialBatchInput): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let that: this = this;
        // 根据物料查询可用序列号
        let criteria: ibas.ICriteria = new ibas.Criteria();
        let condition: ibas.ICondition = criteria.conditions.create();
        condition = new ibas.Condition(bo.MaterialSerial.PROPERTY_ITEMCODE_NAME, ibas.emConditionOperation.EQUAL, selected.itemCode);
        condition = criteria.conditions.create();
        condition = new ibas.Condition(bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME, ibas.emConditionOperation.EQUAL, selected.warehouse);
        condition.relationship = ibas.emConditionRelationship.AND;
        that.fetchSerialData(criteria, selected);
        that.view.showRightData(selected.materialBatchInputSerialJournals);
    }
    protected autoSelectMaterialSerial(selected: bo.MaterialBatchInput): void {
        // 未选择凭证行
        if (ibas.objects.isNull(selected)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
                ibas.i18n.prop("materials_app_Serial_serial_choose_journal")
            ));
            return;
        }
        let SerialItem: bo.MaterialBatchInput = this.inputData.find(c => c.index === selected.index);
        // 不需要选择序列号了
        if (SerialItem.needSerialQuantity === 0) {
            this.view.showRightData(SerialItem.materialBatchInputSerialJournals.filterDeleted());
            return;
        }
        // 无序列号可用
        if (ibas.objects.isNull(this.SerialData)) {
            // 查询可用序列号信息
            let criteria: ibas.ICriteria = new ibas.Criteria();
            let condition: ibas.ICondition = criteria.conditions.create();
            condition = new ibas.Condition(bo.MaterialSerial.PROPERTY_ITEMCODE_NAME, ibas.emConditionOperation.EQUAL, selected.itemCode);
            condition = criteria.conditions.create();
            condition = new ibas.Condition(bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME, ibas.emConditionOperation.EQUAL, selected.warehouse);
            condition.relationship = ibas.emConditionRelationship.AND;
            this.fetchSerialData(criteria, selected);
            return;
        }
        this.allocateSerial(selected, "");
        let line: bo.MaterialBatchInput = this.inputData.find(c => c.index === selected.index);
        this.view.showLeftData(this.SerialData.filter(c => c.isDeleted === false));
        this.view.showRightData(line.materialBatchInputSerialJournals.filterDeleted());
        /** 按照一定规则自动选择序列号信息 */
        // 获取规则
        // 假设按照创建时间顺序自动选择

    }
    protected allocateSerial(journal: bo.MaterialBatchInput, rule: string): void {
        // 按照一定规则排序
        this.SerialData.sort();
        let newSerialData: bo.MaterialSerial[] = new Array<bo.MaterialSerial>();
        let line: bo.MaterialBatchInput = this.inputData.find(c => c.index === journal.index);
        for (let item of this.SerialData) {
            // 已分配数量
            if (line.needSerialQuantity === 0) {
                return;
            }
            let SerialLine: bo.MaterialSerialJournal = line.materialBatchInputSerialJournals.create();
            SerialLine.itemCode = item.itemCode;
            SerialLine.warehouse = item.warehouse;
            SerialLine.serialCode = item.serialCode;
            // if (item.quantity <= line.needSerialQuantity) {
            //     serialLine.quantity = item.quantity;
            //     item.delete();
            // } else {
            //     serialLine.quantity = line.needSerialQuantity;
            //     item.quantity -= SerialLine.quantity;
            //     newSerialData.push(item);
            // }

        }
    }
    /** 添加选择的序列号事件 */
    protected addSerialMaterialSerial(selected: bo.MaterialBatchInput, items: bo.MaterialSerial[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(selected)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
                ibas.i18n.prop("materials_app_Serial_serial_choose_journal")
            ));
            return;
        }
        let journalItem: bo.MaterialBatchInput = this.inputData.find(c => c.index === selected.index);
        let allocateQuantity: number = 0;
        for (let item of items) {
            // 不需要选择序列号了
            if (journalItem.needSerialQuantity === 0) {
                this.view.showRightData(journalItem.materialBatchInputSerialJournals.filterDeleted());
                return;
            }
            // let SerialItem:bo.MaterialSerial = this.SerialData.find(c=>c.SerialCode === item.SerialCode);
            let line: bo.MaterialSerialJournal = journalItem.materialBatchInputSerialJournals.create();
            line.serialCode = item.serialCode;
            line.itemCode = item.itemCode;
            line.warehouse = item.warehouse;
            // if (item.quantity <= journalItem.needSerialQuantity) {
            //     line.quantity = item.quantity;
            //     item.delete();
            // } else {
            //     line.quantity = journalItem.needSerialQuantity;
            //     item.quantity -= line.quantity;
            // }
        }
        this.view.showLeftData(this.SerialData.filter(c => c.isDeleted === false));
        this.view.showRightData(journalItem.materialBatchInputSerialJournals);
    }
    /** 移除选择的序列号事件 */
    protected removeSerialMaterialSerial(selected: bo.MaterialBatchInput, items: bo.MaterialSerialJournal[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(selected)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
                ibas.i18n.prop("materials_app_Serial_serial_choose_journal")
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
        let line: bo.MaterialBatchInput = this.inputData.find(c => c.index === selected.index);
        // 移除项目
        for (let item of items) {
            if (line.materialBatchInputSerialJournals.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    line.materialBatchInputSerialJournals.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
                let SerialItem: bo.MaterialSerial = this.SerialData.find(c => c.serialCode === item.serialCode && c.isDeleted === false);
                // if (!ibas.objects.isNull(SerialItem)) {
                //     serialItem.quantity += item.quantity;
                // } else {
                //     serialItem = new bo.MaterialSerial();
                //     serialItem.serialCode = item.serialCode;
                //     serialItem.itemCode = item.itemCode;
                //     serialItem.warehouse = item.warehouse;
                //     serialItem.quantity = item.quantity;
                //     this.SerialData.push(SerialItem);
                // }
            }
        }
        this.view.showLeftData(this.SerialData.filter(c => c.isDeleted === false));
        this.view.showRightData(line.materialBatchInputSerialJournals.filterDeleted());
    }
    /** 查询数据 */
    protected fetchSerialData(criteria: ibas.ICriteria, selected: bo.MaterialBatchInput): void {
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
                    that.view.showLeftData(that.SerialData);
                    that.busy(false);
                    // that.SerialData = ;
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
    }

    protected filterSelected(fetchData: bo.MaterialSerial[], selected: bo.MaterialBatchInput): bo.MaterialSerial[] {
        if (ibas.objects.isNull(selected) || selected.materialBatchInputSerialJournals.length === 0) {
            this.SerialData = fetchData;
            return fetchData;
        }
        for (let item of selected.materialBatchInputSerialJournals) {
            let SerialItem: bo.MaterialSerial = fetchData.find(c => c.serialCode === item.serialCode);
            if (ibas.objects.isNull(SerialItem)) {
                // 移除已选择的序列号  因为不存在
                item.delete();
            } else {
                // if (SerialItem.quantity === item.quantity) {
                //     serialItem.delete();
                // } else {
                //     serialItem.quantity = Number(SerialItem.quantity) - Number(item.quantity);
                // }
            }
        }
        this.SerialData = fetchData.filter(c => c.isDeleted === false);

    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        // if (ibas.objects.instanceOf(arguments[0].caller.firstOrDefault, bo.MaterialBatchInput)) {
        if (arguments[0].caller.length >= 1) {
            // 需要加判断条件，过滤掉非序列号管理的物料
            that.inputData = arguments[0].caller;
        }
        this.onCompleted = arguments[0].onCompleted;
        super.run();
    }
    protected saveData(): void {
        this.fireCompleted(this.inputData);
    }
    /** 触发完成事件 */
    private fireCompleted(selecteds: bo.MaterialBatchInput[] | bo.MaterialBatchInput): void {
        // 关闭视图
        this.close();
        if (ibas.objects.isNull(this.onCompleted)) {
            return;
        }
        // 转换返回类型
        let list: ibas.ArrayList<bo.MaterialBatchInput> = new ibas.ArrayList<bo.MaterialBatchInput>();
        if (selecteds instanceof Array) {
            // 当是数组时
            for (let item of selecteds) {
                list.add(item);
            }
        } else {
            // 非数组,认为是单对象
            list.add(selecteds);
        }
        if (list.length === 0) {
            // 没有数据不触发事件
            return;
        }
        try {
            // 调用完成事件
            this.onCompleted.call(this.onCompleted, list);
        } catch (error) {
            // 完成事件出错
            this.messages(error);
        }
    }

}

/** 视图-序列号新建 */
export interface IMaterialSerialIssueView extends ibas.IBOView {
    /** 显示数据 */
    showLeftData(datas: bo.MaterialSerial[]): void;
    showRightData(datas: bo.MaterialSerialJournal[]): void;
    showJournalLineData(datas: bo.MaterialBatchInput[]): void;
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
        this.id = MaterialSerialIssueApp.APPLICATION_ID;
        this.name = MaterialSerialIssueApp.APPLICATION_NAME;
        this.category = MaterialSerialIssueApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = ibas.BOChooseServiceProxy;
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IBOChooseServiceContract> {
        return new MaterialSerialIssueApp();
    }
}