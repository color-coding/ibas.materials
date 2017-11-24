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
import {
    IMaterialReceiptSerials,
    IMaterialReceiptLineSerial,
    IMaterialReceiptSerialLine,
    IMaterialReceiptSerialContract,
    IMaterialReceiptSerialContractLine,
} from "../../api/bo/index";

export class MaterialSerialReceiptApp extends ibas.BOApplication<IMaterialSerialReceiptView> {
    /** 应用标识 */
    static APPLICATION_ID: string = "3533e07e-0c13-44cf-9543-adacb49dade2";
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
    /** 服务契约 */
    private contract: IMaterialReceiptSerialContract;
    /** 服务输入数据 */
    protected serialServiceDatas: bo.MaterialSerialService[];

    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.addSerialEvent = this.addSerial;
        this.view.removeSerialEvent = this.removeSerial;
        this.view.autoCreateSerialEvent = this.autoCreateSerial;
        this.view.saveDataEvent = this.saveData;
        this.view.selectMaterialSerialJournalLineEvent = this.selectMaterialSerialJournalLine;
    }
    protected addSerial(select: bo.MaterialSerialService): void {
        // 确认选择了凭证信息
        if (ibas.objects.isNull(select)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // 找到输入数据的序列集合
        let item: bo.MaterialSerialService = this.serialServiceDatas.find(c => c.index === select.index);
        if (item.needSerialQuantity === 0) {
            return;
        }
        item.materialSerialServiceJournals.create();
        // 仅显示没有标记删除的
        this.view.showData(item.materialSerialServiceJournals.filterDeleted());
    }

    protected removeSerial(serial: bo.MaterialSerialService, items: bo.MaterialSerialJournal[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(serial)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
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
        // 找到输入数据的序列集合
        let serialData: bo.MaterialSerialService = this.serialServiceDatas.find(c => c.index === serial.index);
        // 移除项目
        for (let item of items) {
            if (serialData.materialSerialServiceJournals.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    serialData.materialSerialServiceJournals.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showData(serialData.materialSerialServiceJournals.filterDeleted());
    }

    protected autoCreateSerial(item: bo.MaterialSerialService): void {
        // 未选择凭证行
        if (ibas.objects.isNull(item)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        let serialItem: bo.MaterialSerialService = this.serialServiceDatas.find(c => c.index === item.index);
        // 不需要创建序列了
        if (serialItem.needSerialQuantity === 0) {
            this.view.showData(serialItem.materialSerialServiceJournals.filterDeleted());
            return;
        }
        do {
            let serialLine: bo.MaterialSerialJournal = serialItem.materialSerialServiceJournals.create();
        } while (serialItem.needSerialQuantity !== 0);
        this.view.showData(serialItem.materialSerialServiceJournals.filterDeleted());
    }
    /** 选择凭证行事件 -更新可用批次 */
    protected selectMaterialSerialJournalLine(selected: bo.MaterialSerialService): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let serialJournal: bo.MaterialSerialService = this.serialServiceDatas
            .find(c => c.itemCode === selected.itemCode && c.warehouse === selected.warehouse);
        if (!ibas.objects.isNull(serialJournal)) {
            this.view.showData(serialJournal.materialSerialServiceJournals);
        }
    }
    /** 绑定服务数据 */
    bindSerialServiceData(contract: IMaterialReceiptSerialContract): void {
        let serialServiceDatas: bo.MaterialSerialService[] = Array<bo.MaterialSerialService>();
        for (let item of contract.materialReceiptSerialContractLines) {
            let serialServiceData: bo.MaterialSerialService = bo.MaterialSerialService.create(item);
            serialServiceData.direction = ibas.emDirection.OUT;
            serialServiceDatas.push(serialServiceData);
        }
        this.serialServiceDatas = serialServiceDatas;
    }
    /** 绑定服务行数据 */
    bindSerialServiceDataLine(editData: IMaterialReceiptSerials): void {
        if (!ibas.objects.isNull(this.serialServiceDatas)) {
            for (let item of editData.materialReceiptLineSerials) {
                let serialLine: bo.MaterialSerialService = this.serialServiceDatas[item.index];
                if (!ibas.objects.isNull(serialLine)
                    && item.materialReceiptSerialLines.length > 0) {
                    serialLine.materialSerialServiceJournals.createJournals(item.materialReceiptSerialLines);
                }
            }
        }
    }
    /** 获取回传信息 */
    getCallBackData(): IMaterialReceiptLineSerial[] {
        let callBack: IMaterialReceiptLineSerial[] = [];
        for (let item of this.serialServiceDatas) {
            let batchContract: IMaterialReceiptLineSerial = {
                index: item.index,
                materialReceiptSerialLines: []
            };
            if (item.materialSerialServiceJournals.length > 0) {
                for (let line of item.materialSerialServiceJournals) {
                    let batchLine: IMaterialReceiptSerialLine = {
                        serialCode: line.serialCode,
                        itemCode: line.itemCode,
                        warehouse: line.warehouse,
                        direction: line.direction,
                    };
                    batchContract.materialReceiptSerialLines.push(batchLine);
                }
            }
            callBack.push(batchContract);
        }
        return callBack;
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        if (arguments[0].caller.materialReceiptSerialContractLines.length >= 1) {
            that.bindSerialServiceData(arguments[0].caller);
        }
        // 选择的序列
        if (!ibas.objects.isNull(arguments[0].handleData)
            && arguments[0].handleData.materialReceiptLineSerials.length >= 1) {
            that.bindSerialServiceDataLine(arguments[0].handleData);
        }
        this.onCompleted = arguments[0].onCompleted;
        super.run();
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showJournalLineData(this.serialServiceDatas);
    }

    protected saveData(): void {
        // 序列数量错误
        for (let serialJournalLine of this.serialServiceDatas) {
            if (serialJournalLine.needSerialQuantity !== 0) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batch_quantity_create_error"));
                return;
            }
        }
        this.fireCompleted({ materialReceiptLineSerials: this.getCallBackData() });
    }
    /** 触发完成事件 */
    private fireCompleted(createds: IMaterialReceiptSerials): void {
        // 关闭视图
        this.close();
        if (ibas.objects.isNull(this.onCompleted)) {
            return;
        }
        if (ibas.objects.isNull(createds)) {
            return;
        }
        if (createds.materialReceiptLineSerials.length === 0) {
            // 没有数据不触发事件
            return;
        }
        try {
            // 调用完成事件
            this.onCompleted.call(this.onCompleted, createds);
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
    showJournalLineData(datas: bo.MaterialSerialService[]): void;
    /** 添加序列事件 */
    addSerialEvent: Function;
    /** 移除序列事件 */
    removeSerialEvent: Function;
    /** 自动创建序列事件 */
    autoCreateSerialEvent: Function;
    /** 返回数据 */
    saveDataEvent: Function;
    /** 选中凭证行事件 */
    selectMaterialSerialJournalLineEvent: Function;
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
        this.proxy = ibas.BOLineHandleServiceProxy;
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IBOLineHandleServiceContract> {
        return new MaterialSerialReceiptApp();
    }
}