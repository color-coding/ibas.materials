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

export class MaterialSerialReceiptApp extends ibas.BOApplication<IMaterialSerialReceiptView> {
    /** 应用标识 */
    static APPLICATION_ID: string = "f4448871-b03a-48f5-bf6d-9418259fab9d";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialserialreceipt";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.MaterialSerialJournal.BUSINESS_OBJECT_RECEIPT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialReceiptApp.APPLICATION_ID;
        this.name = MaterialSerialReceiptApp.APPLICATION_NAME;
        this.boCode = MaterialSerialReceiptApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 完成 */
    private onCompleted: Function;
    /** 服务输入数据 */
    protected inputData: bo.MaterialBatchInput[];

    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.addSerialEvent = this.addSerial;
        this.view.removeSerialEvent = this.removeSerial;
        this.view.autoCreateSerialEvent = this.autoCreateSerial;
        this.view.saveDataEvent = this.saveData;
    }
    protected addSerial(select: bo.MaterialBatchInput): void {
        // 确认选择了凭证信息
        if (ibas.objects.isNull(select)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journal")
            ));
            return;
        }
        // 找到输入数据的序列集合
        let item: bo.MaterialBatchInput = this.inputData.find(c => c.index === select.index);
        if (item.needSerialQuantity === 0) {
            return;
        }
        item.materialBatchInputSerialJournals.create();
        // 仅显示没有标记删除的
        this.view.showData(item.materialBatchInputSerialJournals.filterDeleted());
    }

    protected removeSerial(serial: bo.MaterialBatchInput, items: bo.MaterialSerialJournal[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(serial)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journal")
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
        // 找到输入数据的序列集合
        let serialData: bo.MaterialBatchInput = this.inputData.find(c => c.index === serial.index);
        // 移除项目
        for (let item of items) {
            if (serialData.materialBatchInputSerialJournals.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    serialData.materialBatchInputSerialJournals.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showData(serialData.materialBatchInputSerialJournals.filterDeleted());
    }

    protected autoCreateSerial(item: bo.MaterialBatchInput): void {
        // 未选择凭证行
        if (ibas.objects.isNull(item)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journal")
            ));
            return;
        }
        let serialItem: bo.MaterialBatchInput = this.inputData.find(c => c.index === item.index);
        // 不需要创建序列了
        if (serialItem.needSerialQuantity === 0) {
            this.view.showData(serialItem.materialBatchInputSerialJournals.filterDeleted());
            return;
        }
        let serialLine: bo.MaterialSerialJournal;
        let allcationQuantity: number = Number(0);
        // 如果该凭证已经开始创建序列
        if (serialItem.materialBatchInputSerialJournals.length !== 0) {
            // for (let serial of serialItem.materialBatchInputSerialJournals.filterDeleted()) {
            //     allcationQuantity = Number(allcationQuantity) + Number(serial.quantity);
            //     // 过滤掉为0的
            //     if (serial.quantity === 0) {
            //         serial.delete();
            //     }
            // }
            serialLine = serialItem.materialBatchInputSerialJournals.create();
        } else {
            serialLine = serialItem.materialBatchInputSerialJournals.create();
        }
        this.view.showData(serialItem.materialBatchInputSerialJournals.filterDeleted());
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        // if (ibas.objects.instanceOf(arguments[0].caller.firstOrDefault, bo.MaterialBatchInput)) {
        if (arguments[0].caller.length >= 1) {
            that.inputData = arguments[0].caller;
        }
        this.onCompleted = arguments[0].onCompleted;
        super.run();
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showJournalLineData(this.inputData);
    }

    protected saveData(): void {
        // 序列数量错误
        for (let serialJournalLine of this.inputData) {
            if (serialJournalLine.needSerialQuantity !== 0) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batch_quantity_create_error"));
                return;
            }
        }
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


/** 视图-新建序列 */
export interface IMaterialSerialReceiptView extends ibas.IBOView {
    /** 显示数据 */
    showData(datas: bo.MaterialSerialJournal[]): void;
    showJournalLineData(datas: bo.MaterialBatchInput[]): void;
    /** 添加序列事件 */
    addSerialEvent: Function;
    /** 移除序列事件 */
    removeSerialEvent: Function;
    /** 自动创建序列事件 */
    autoCreateSerialEvent: Function;
    /** 返回数据 */
    saveDataEvent: Function;
}

/** 新建序列服务映射 */
export class MaterialSerialReceipServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialReceiptApp.APPLICATION_ID;
        this.name = MaterialSerialReceiptApp.APPLICATION_NAME;
        this.category = MaterialSerialReceiptApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = ibas.BOChooseServiceProxy;
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IBOChooseServiceContract> {
        return new MaterialSerialReceiptApp();
    }
}