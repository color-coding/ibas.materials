/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 * @Author: fancy
 * @Date: 2017-11-30 17:59:05
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-08 15:09:54
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";
import {
    IMaterialReceiptBatchs,
    IMaterialReceiptBatchLine,
    IMaterialReceiptBatchContract,
    IMaterialReceiptBatchContractLine,
} from "../../api/bo/index";
import {
    MaterialBatchReceiptServiceProxy,
} from "../../api/Datas";
import { numbers } from "ibas/index";
export class MaterialBatchReceiptService extends ibas.BOApplication<IMaterialBatchReceiptView> {
    /** 应用标识 */
    static APPLICATION_ID: string = "f4448871-b03a-48f5-bf6d-9418259fab9d";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialbatchreceipt";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.MaterialBatchJournal.BUSINESS_OBJECT_RECEIPT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialBatchReceiptService.APPLICATION_ID;
        this.name = MaterialBatchReceiptService.APPLICATION_NAME;
        this.boCode = MaterialBatchReceiptService.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 服务契约 */
    private contract: IMaterialReceiptBatchContract;
    /** 批次服务数据 */
    protected batchServiceDatas: bo.MaterialReceiptBatchService[];
    /** 批次信息 */
    protected batchData: bo.MaterialBatchJournal[];
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.addBatchEvent = this.addBatch;
        this.view.removeBatchEvent = this.removeBatch;
        this.view.autoCreateBatchEvent = this.autoCreateBatch;
        this.view.saveDataEvent = this.saveData;
        this.view.selectMaterialBatchJournalLineEvent = this.selectMaterialBatchJournalLine;
    }
    protected addBatch(select: bo.MaterialReceiptBatchService): void {
        // 确认选择了凭证信息
        if (ibas.objects.isNull(select)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // 存在了数量0批次行不能继续添加
        if (select.materialBatchJournals.filter(c => numbers.toFloat(c.quantity) === 0).length !== 0) {
            return;
        }
        // 找到输入数据的批次集合
        let item: bo.MaterialReceiptBatchService = this.batchServiceDatas.find(c => c.index === select.index);
        if (item.needBatchQuantity === 0) {
            return;
        }
       // item.materialBatchJournals.createBatchJournal();
        // 仅显示没有标记删除的
        this.view.showData(item.materialBatchJournals.filterDeleted());
    }

    protected removeBatch(batch: bo.MaterialReceiptBatchService, items: bo.MaterialBatchJournal[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(batch)) {
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
        // 找到输入数据的批次集合
        let batchData: bo.MaterialReceiptBatchService = this.batchServiceDatas.find(c => c.index === batch.index);
        // 移除项目
        for (let item of items) {
            if (batchData.materialBatchJournals.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    batchData.materialBatchJournals.deleteBatchJournal(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showData(batchData.materialBatchJournals.filterDeleted());
    }

    protected autoCreateBatch(item: bo.MaterialReceiptBatchService): void {
        // 未选择凭证行
        if (ibas.objects.isNull(item)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        let batchItem: bo.MaterialReceiptBatchService = this.batchServiceDatas.find(c => c.index === item.index);
        // 不需要创建批次了
        if (batchItem.needBatchQuantity === 0) {
            this.view.showData(batchItem.materialBatchJournals.filterDeleted());
            return;
        }
        let batchLine: bo.MaterialBatchJournal;
        let allcationQuantity: number = Number(0);
        // 如果该凭证已经开始创建批次
        if (batchItem.materialBatchJournals.length !== 0) {
            // 存在数量为0的行，就不新建行
            batchLine = batchItem.materialBatchJournals.find(c => numbers.toFloat(c.quantity) === 0.0);
            for (let batch of batchItem.materialBatchJournals.filterDeleted()) {
                allcationQuantity = allcationQuantity + numbers.toFloat(batch.quantity);
                // 过滤掉为0的
                if (batch.quantity === 0) {
                    batch.delete();
                }
            }
            if (ibas.objects.isNull(batchLine)) {
                batchLine = batchItem.materialBatchJournals.create();
            }
            batchLine.quantity = batchItem.quantity - Number(allcationQuantity);
        } else {
            batchLine = batchItem.materialBatchJournals.create();
            batchLine.quantity = batchItem.needBatchQuantity;
        }
        this.view.showData(batchItem.materialBatchJournals.filterDeleted());
    }
    /** 选择凭证行事件 */
    protected selectMaterialBatchJournalLine(selected: bo.MaterialReceiptBatchService): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let batchJournal: bo.MaterialReceiptBatchService = this.batchServiceDatas
            .find(c => c.itemCode === selected.itemCode && c.warehouse === selected.warehouse);
        if (!ibas.objects.isNull(batchJournal)) {
            this.view.showData(batchJournal.materialBatchJournals);
        }
    }
    /** 绑定服务数据 */
    bindBatchServiceData(contract: IMaterialReceiptBatchContract): void {
        let batchServiceDatas: bo.MaterialReceiptBatchService[] = Array<bo.MaterialReceiptBatchService>();
        for (let item of contract.materialReceiptBatchContractLines) {
            let batchServiceData: bo.MaterialReceiptBatchService = new bo.MaterialReceiptBatchService(item);
            batchServiceData.direction = ibas.emDirection.IN;
            batchServiceDatas.push(batchServiceData);
        }
        this.batchServiceDatas = batchServiceDatas;
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        if (arguments[0].caller.materialReceiptBatchContractLines.length >= 1) {
            that.bindBatchServiceData(arguments[0].caller);
        }
        super.run.apply(this, args);
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showJournalLineData(this.batchServiceDatas);
    }

    protected saveData(): void {
        // 批次数量错误
        for (let batchJournalLine of this.batchServiceDatas) {
            if (batchJournalLine.needBatchQuantity !== 0) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batch_quantity_create_error"));
                return;
            }
            if (batchJournalLine.materialBatchJournals.filter(c => ibas.strings.isEmpty(c.batchCode)).length !== 0) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batchcode_is_empty"));
                return;
            }
        }
        this.close();
    }
}


/** 视图-新建批次 */
export interface IMaterialBatchReceiptView extends ibas.IBOView {
    /** 显示数据 */
    showData(datas: bo.MaterialBatchJournal[]): void;
    showJournalLineData(datas: bo.MaterialReceiptBatchService[]): void;
    /** 添加批次事件 */
    addBatchEvent: Function;
    /** 移除批次事件 */
    removeBatchEvent: Function;
    /** 自动创建批次事件 */
    autoCreateBatchEvent: Function;
    /** 返回数据 */
    saveDataEvent: Function;
    /** 选中凭证行事件 */
    selectMaterialBatchJournalLineEvent: Function;
}

/** 新建批次服务映射 */
export class MaterialBatchReceipServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialBatchReceiptService.APPLICATION_ID;
        this.name = MaterialBatchReceiptService.APPLICATION_NAME;
        this.category = MaterialBatchReceiptService.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = MaterialBatchReceiptServiceProxy;
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IApplicationServiceContract> {
        return new MaterialBatchReceiptService();
    }
}