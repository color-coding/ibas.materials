/*
 * @Author: fancy
 * @Date: 2017-11-27 16:41:05
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-12 15:11:21
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
import {
    MaterialReceiptSerialJournal,
    MaterialReceiptSerialInfo
} from "./index";
export class MaterialSerialReceiptService extends ibas.BOApplication<IMaterialSerialReceiptView> {
    /** 应用标识 */
    static APPLICATION_ID: string = "3533e07e-0c13-44cf-9543-adacb49dade2";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialserialreceipt";
    /** 业务对象编码 */
    // static BUSINESS_OBJECT_CODE: string = bo.MaterialSerialJournal.BUSINESS_OBJECT_RECEIPT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialReceiptService.APPLICATION_ID;
        this.name = MaterialSerialReceiptService.APPLICATION_NAME;
        // this.boCode = MaterialSerialReceiptService.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 服务契约 */
    private contract: IMaterialReceiptSerialContract;
    /** 服务输入数据 */
    protected serialServiceDatas: MaterialReceiptSerialJournal[];

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
    protected addSerial(select: MaterialReceiptSerialJournal): void {
        // 确认选择了凭证信息
        if (ibas.objects.isNull(select)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // 找到输入数据的序列集合
        let index: number = this.serialServiceDatas.indexOf(select);
        let item: MaterialReceiptSerialJournal = this.serialServiceDatas[index];
        if (item.needSerialQuantity === 0) {
            return;
        }
        let serialLine: MaterialReceiptSerialInfo = new MaterialReceiptSerialInfo();
        item.materialSerialInfos.createSerialJournal(serialLine);
        // 仅显示没有标记删除的
        this.view.showData(item.materialSerialInfos.filterDeleted());
    }

    protected removeSerial(serial: MaterialReceiptSerialJournal, items: MaterialReceiptSerialInfo[]): void {
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
        let index: number = this.serialServiceDatas.indexOf(serial);
        let serialData: MaterialReceiptSerialJournal = this.serialServiceDatas[index];
        // 移除项目
        for (let item of items) {
            if (serialData.materialSerialInfos.indexOf(item) >= 0) {
                serialData.materialSerialInfos.deleteSerialJournal(item);
            }
        }
        // 仅显示没有标记删除的
        this.view.showData(serialData.materialSerialInfos.filterDeleted());
    }

    protected autoCreateSerial(selected: MaterialReceiptSerialJournal): void {
        // 未选择凭证行
        if (ibas.objects.isNull(selected)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        let index: number = this.serialServiceDatas.indexOf(selected);
        let serialItem: MaterialReceiptSerialJournal = this.serialServiceDatas[index];
        // 不需要创建序列了
        if (selected.needSerialQuantity === 0) {
            this.view.showData(serialItem.materialSerialInfos.filterDeleted());
            return;
        }
        do {
            let serialLine: MaterialReceiptSerialInfo = new MaterialReceiptSerialInfo();
            serialItem.materialSerialInfos.createSerialJournal(serialLine);
        } while (serialItem.needSerialQuantity !== 0);
        this.view.showData(serialItem.materialSerialInfos.filterDeleted());
    }
    /** 选择凭证行事件  */
    protected selectMaterialSerialJournalLine(selected: MaterialReceiptSerialJournal): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let index: number = this.serialServiceDatas.indexOf(selected);
        let serialJournal: MaterialReceiptSerialJournal = this.serialServiceDatas[index];
        if (!ibas.objects.isNull(serialJournal)) {
            this.view.showData(serialJournal.materialSerialInfos.filterDeleted());
        }
    }
    /** 绑定服务数据 */
    bindSerialServiceData(contract: IMaterialReceiptSerialContract): void {
        let serialServiceDatas: MaterialReceiptSerialJournal[] = Array<MaterialReceiptSerialJournal>();
        for (let item of contract.materialReceiptSerialContractLines) {
            let serialServiceData: MaterialReceiptSerialJournal = new MaterialReceiptSerialJournal(item);
            serialServiceData.direction = ibas.emDirection.IN;
            serialServiceDatas.push(serialServiceData);
        }
        this.serialServiceDatas = serialServiceDatas;
    }

    /** 运行,覆盖原方法 */
    run(): void {
        let that: this = this;
        if (arguments[0].caller.materialReceiptSerialContractLines.length >= 1) {
            that.bindSerialServiceData(arguments[0].caller);
        }
        super.run.apply(this, arguments);
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
    showData(datas: MaterialReceiptSerialInfo[]): void;
    showJournalLineData(datas: MaterialReceiptSerialJournal[]): void;
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
        this.description = ibas.i18n.prop(this.name);
        this.proxy = MaterialSerialReceiptServiceProxy;
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IApplicationServiceContract> {
        return new MaterialSerialReceiptService();
    }
}