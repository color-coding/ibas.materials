/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 * @Author: fancy
 * @Date: 2017-11-30 17:59:05
 * @Last Modified by:   fancy
 * @Last Modified time: 2017-11-30 17:59:05
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";
import {
    IMaterialReceiptBatchs,
    IMaterialReceiptLineBatch,
    IMaterialReceiptBatchLine,
    IMaterialReceiptBatchContract,
    IMaterialReceiptBatchContractLine,
} from "../../api/bo/index";
export class MaterialBatchReceiptApp extends ibas.BOApplication<IMaterialBatchReceiptView> {
    /** 应用标识 */
    static APPLICATION_ID: string = "f4448871-b03a-48f5-bf6d-9418259fab9d";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialbatchreceipt";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.MaterialBatchJournal.BUSINESS_OBJECT_RECEIPT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialBatchReceiptApp.APPLICATION_ID;
        this.name = MaterialBatchReceiptApp.APPLICATION_NAME;
        this.boCode = MaterialBatchReceiptApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 完成 */
    private onCompleted: Function;
    /** 服务契约 */
    private contract: IMaterialReceiptBatchContract;
    /** 批次服务数据 */
    protected batchServiceDatas: bo.MaterialBatchService[];
    /** 批次信息 */
    protected batchData:bo.MaterialBatchJournal[];
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
    protected addBatch(select: bo.MaterialBatchService): void {
        // 确认选择了凭证信息
        if (ibas.objects.isNull(select)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // 找到输入数据的批次集合
        let item: bo.MaterialBatchService = this.batchServiceDatas.find(c => c.index === select.index);
        if (item.needBatchQuantity === 0) {
            return;
        }
        item.materialBatchServiceJournals.create();
        // 仅显示没有标记删除的
        this.view.showData(item.materialBatchServiceJournals.filterDeleted());
    }

    protected removeBatch(batch: bo.MaterialBatchService, items: bo.MaterialBatchJournal[]): void {
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
        let batchData: bo.MaterialBatchService = this.batchServiceDatas.find(c => c.index === batch.index);
        // 移除项目
        for (let item of items) {
            if (batchData.materialBatchServiceJournals.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    batchData.materialBatchServiceJournals.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showData(batchData.materialBatchServiceJournals.filterDeleted());
    }

    protected autoCreateBatch(item: bo.MaterialBatchService): void {
        // 未选择凭证行
        if (ibas.objects.isNull(item)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        let batchItem: bo.MaterialBatchService = this.batchServiceDatas.find(c => c.index === item.index);
        // 不需要创建批次了
        if (batchItem.needBatchQuantity === 0) {
            this.view.showData(batchItem.materialBatchServiceJournals.filterDeleted());
            return;
        }
        let batchLine: bo.MaterialBatchJournal;
        let allcationQuantity: number = Number(0);
        // 如果该凭证已经开始创建批次
        if (batchItem.materialBatchServiceJournals.length !== 0) {
            for (let batch of batchItem.materialBatchServiceJournals.filterDeleted()) {
                allcationQuantity = Number(allcationQuantity) + Number(batch.quantity);
                // 过滤掉为0的
                if (batch.quantity === 0) {
                    batch.delete();
                }
            }
            batchLine = batchItem.materialBatchServiceJournals.create();
            batchLine.quantity = batchItem.quantity - Number(allcationQuantity);
        } else {
            batchLine = batchItem.materialBatchServiceJournals.create();
            batchLine.quantity = batchItem.needBatchQuantity;
        }
        this.view.showData(batchItem.materialBatchServiceJournals.filterDeleted());
    }
    /** 选择凭证行事件 */
    protected selectMaterialBatchJournalLine(selected: bo.MaterialBatchService): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let batchJournal: bo.MaterialBatchService = this.batchServiceDatas
            .find(c => c.itemCode === selected.itemCode && c.warehouse === selected.warehouse);
        if (!ibas.objects.isNull(batchJournal)) {
            this.view.showData(batchJournal.materialBatchServiceJournals);
        }
    }
    /** 绑定服务数据 */
    bindBatchServiceData(contract: IMaterialReceiptBatchContract): void {
        let batchServiceDatas: bo.MaterialBatchService[] = Array<bo.MaterialBatchService>();
        for (let item of contract.materialReceiptBatchContractLines) {
            let batchServiceData: bo.MaterialBatchService = bo.MaterialBatchService.create(item);
            batchServiceData.direction = ibas.emDirection.IN;
            batchServiceDatas.push(batchServiceData);
        }
        this.batchServiceDatas = batchServiceDatas;
    }
    /** 绑定服务行数据 */
    bindBatchServiceDataLine(editData: IMaterialReceiptBatchs): void {
        if (!ibas.objects.isNull(this.batchServiceDatas)) {
            for (let item of editData.materialReceiptLineBatchs) {
                let batchLine: bo.MaterialBatchService = this.batchServiceDatas[item.index];
                if (!ibas.objects.isNull(batchLine)
                    && item.materialReceiptBatchLines.length > 0) {
                    batchLine.materialBatchServiceJournals.createJournals(item.materialReceiptBatchLines);
                }
            }
        }
    }
    /** 获取回传信息 */
    getCallBackData(): IMaterialReceiptLineBatch[] {
        let callBack: IMaterialReceiptLineBatch[] = [];
        for (let item of this.batchServiceDatas) {
            let batchContract: IMaterialReceiptLineBatch = {
                index: item.index,
                materialReceiptBatchLines: []
            };
            if (item.materialBatchServiceJournals.length > 0) {
                for (let line of item.materialBatchServiceJournals) {
                    let batchLine: IMaterialReceiptBatchLine = {
                        batchCode: line.batchCode,
                        quantity: line.quantity,
                        itemCode: line.itemCode,
                        warehouse: line.warehouse,
                        direction: line.direction,
                    };
                    batchContract.materialReceiptBatchLines.push(batchLine);
                }
            }
            callBack.push(batchContract);
        }
        return callBack;
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        if (arguments[0].caller.materialReceiptBatchContractLines.length >= 1) {
            that.bindBatchServiceData(arguments[0].caller);
        }
        // 创建的批次
        if (!ibas.objects.isNull(arguments[0].handleData)
            && arguments[0].handleData.materialReceiptLineBatchs.length >= 1) {
            that.bindBatchServiceDataLine(arguments[0].handleData);
        }
        this.onCompleted = arguments[0].onCompleted;
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
        }
        this.fireCompleted({ materialReceiptLineBatchs: this.getCallBackData() });
    }
    /** 触发完成事件 */
    private fireCompleted(createds: IMaterialReceiptBatchs): void {
        // 关闭视图
        this.close();
        if (ibas.objects.isNull(this.onCompleted)) {
            return;
        }
        if (createds.materialReceiptLineBatchs.length === 0) {
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


/** 视图-新建批次 */
export interface IMaterialBatchReceiptView extends ibas.IBOView {
    /** 显示数据 */
    showData(datas: bo.MaterialBatchJournal[]): void;
    showJournalLineData(datas: bo.MaterialBatchService[]): void;
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
        this.id = MaterialBatchReceiptApp.APPLICATION_ID;
        this.name = MaterialBatchReceiptApp.APPLICATION_NAME;
        this.category = MaterialBatchReceiptApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = ibas.BOLineHandleServiceProxy;
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IBOLineHandleServiceContract> {
        return new MaterialBatchReceiptApp();
    }
}