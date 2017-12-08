/*
 * @Author: fancy
 * @Date: 2017-11-27 16:41:05
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-08 17:53:45
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
    MaterialSerialReceiptServiceProxy,
} from "../../api/Datas";
import { BORepositoryMaterials } from "../../borep/BORepositories";
import {
    IMaterialReceiptSerials,
    IMaterialReceiptSerialLine,
    IMaterialReceiptSerialContract,
    IMaterialReceiptSerialContractLine,
} from "../../api/bo/index";

export class MaterialSerialReceiptService extends ibas.BOApplication<IMaterialSerialReceiptView> {
    /** 应用标识 */
    static APPLICATION_ID: string = "3533e07e-0c13-44cf-9543-adacb49dade2";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialserialreceipt";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.MaterialSerialJournal.BUSINESS_OBJECT_RECEIPT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialReceiptService.APPLICATION_ID;
        this.name = MaterialSerialReceiptService.APPLICATION_NAME;
        this.boCode = MaterialSerialReceiptService.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 完成 */
    private onCompleted: Function;
    /** 服务契约 */
    private contract: IMaterialReceiptSerialContract;
    /** 服务输入数据 */
    protected serialServiceDatas: bo.MaterialReceiptSerialService[];

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
    protected addSerial(select: bo.MaterialReceiptSerialService): void {
        // 确认选择了凭证信息
        if (ibas.objects.isNull(select)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // 找到输入数据的序列集合
        let item: bo.MaterialReceiptSerialService = this.serialServiceDatas.find(c => c.index === select.index);
        if (item.needSerialQuantity === 0) {
            return;
        }
        item.materialSerialJournals.create();
        // 仅显示没有标记删除的
        this.view.showData(item.materialSerialJournals.filterDeleted());
    }

    protected removeSerial(serial: bo.MaterialReceiptSerialService, items: bo.MaterialSerialJournal[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(serial)) {
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
        // 找到输入数据的序列集合
        let serialData: bo.MaterialReceiptSerialService = this.serialServiceDatas.find(c => c.index === serial.index);
        // 移除项目
        for (let item of items) {
            if (serialData.materialSerialJournals.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    serialData.materialSerialJournals.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showData(serialData.materialSerialJournals.filterDeleted());
    }

    protected autoCreateSerial(item: bo.MaterialReceiptSerialService): void {
        // 未选择凭证行
        if (ibas.objects.isNull(item)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        let serialItem: bo.MaterialReceiptSerialService = this.serialServiceDatas.find(c => c.index === item.index);
        // 不需要创建序列了
        if (serialItem.needSerialQuantity === 0) {
            this.view.showData(serialItem.materialSerialJournals.filterDeleted());
            return;
        }
        do {
            let serialLine: bo.MaterialSerialJournal = serialItem.materialSerialJournals.create();
        } while (serialItem.needSerialQuantity !== 0);
        this.view.showData(serialItem.materialSerialJournals.filterDeleted());
    }
    /** 选择凭证行事件 -更新可用批次 */
    protected selectMaterialSerialJournalLine(selected: bo.MaterialReceiptSerialService): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let serialJournal: bo.MaterialReceiptSerialService = this.serialServiceDatas
            .find(c => c.itemCode === selected.itemCode && c.warehouse === selected.warehouse);
        if (!ibas.objects.isNull(serialJournal)) {
            this.view.showData(serialJournal.materialSerialJournals);
        }
    }
    /** 绑定服务数据 */
    bindSerialServiceData(contract: IMaterialReceiptSerialContract): void {
        let serialServiceDatas: bo.MaterialReceiptSerialService[] = Array<bo.MaterialReceiptSerialService>();
        for (let item of contract.materialReceiptSerialContractLines) {
            let serialServiceData: bo.MaterialReceiptSerialService = new bo.MaterialReceiptSerialService(item);
            serialServiceData.direction = ibas.emDirection.OUT;
            serialServiceDatas.push(serialServiceData);
        }
        this.serialServiceDatas = serialServiceDatas;
    }

    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        if (arguments[0].caller.materialReceiptSerialContractLines.length >= 1) {
            that.bindSerialServiceData(arguments[0].caller);
        }
        this.onCompleted = arguments[0].onCompleted;
        super.run.apply(this, args);
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
        this.close();
    }
}


/** 视图-新建序列 */
export interface IMaterialSerialReceiptView extends ibas.IBOView {
    /** 显示数据 */
    showData(datas: bo.MaterialSerialJournal[]): void;
    showJournalLineData(datas: bo.MaterialReceiptSerialService[]): void;
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
        this.id = MaterialSerialReceiptService.APPLICATION_ID;
        this.name = MaterialSerialReceiptService.APPLICATION_NAME;
        this.category = MaterialSerialReceiptService.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = MaterialSerialReceiptServiceProxy;
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IApplicationServiceContract> {
        return new MaterialSerialReceiptService();
    }
}