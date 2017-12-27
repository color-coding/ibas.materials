/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 * @Author: fancy
 * @Date: 2017-11-30 17:59:05
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-27 13:11:32
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";
import {
    IMaterialBatchContract,
} from "../../api/bo/index";
import {
    MaterialReceiptBatchServiceProxy,
} from "../../api/Datas";
import { MaterialBatchServiceJournal } from "./index";
export class MaterialReceiptBatchService extends ibas.ServiceApplication<IMaterialReceiptBatchView, IMaterialBatchContract[]> {

    /** 应用标识 */
    static APPLICATION_ID: string = "f4448871-b03a-48f5-bf6d-9418259fab9d";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialreceiptbatchservice";

    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialReceiptBatchService.APPLICATION_ID;
        this.name = MaterialReceiptBatchService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 批次日记账数据 */
    protected batchJournals: MaterialBatchServiceJournal[];
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.addBatchEvent = this.addBatch;
        this.view.removeBatchEvent = this.removeBatch;
        this.view.autoCreateBatchEvent = this.autoCreateBatch;
        this.view.confirmDataEvent = this.confirmData;
        this.view.selectMaterialBatchJournalLineEvent = this.selectMaterialBatchJournalLine;
    }

    /**
     * 添加批次
     * @param journal 选中的凭证行
     */
    protected addBatch(journal: MaterialBatchServiceJournal): void {
        // 确认选择了凭证信息
        if (ibas.objects.isNull(journal)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // 存在了数量0批次行不能继续添加
        if (journal.contract.materialBatchs.filter(c => ibas.numbers.toFloat(c.quantity) === 0).length !== 0) {
            return;
        }
        // 找到输入数据的批次集合
        let index: number = this.batchJournals.indexOf(journal);
        let journalItem: MaterialBatchServiceJournal = this.batchJournals[index];
        // 判断是否需要继续创建批次
        if (!this.isNeedToCreate(journalItem)) {
            return;
        }
        let batchInfo: bo.MaterialBatchJournal = new bo.MaterialBatchJournal();
        batchInfo.itemCode = journal.itemCode;
        batchInfo.warehouse = journal.warehouse;
        batchInfo.direction = ibas.emDirection.IN;
        journalItem.contract.materialBatchs.create(batchInfo);
        // 仅显示没有标记删除的
        this.view.showData(journalItem.contract.materialBatchs.filter(c=>c.isDeleted === false));
    }

    /**
     * 是否需要创建批次  false 不需要；true 需要
     * @param journal 批次日记账行
     */
    protected isNeedToCreate(journal: MaterialBatchServiceJournal): boolean {
        let createdQuantity: number = Number(0);
        journal.contract.materialBatchs.forEach(c => createdQuantity = createdQuantity + c.quantity);
        if (ibas.numbers.toFloat(journal.quantity) === ibas.numbers.toFloat(createdQuantity)) {
            return false;
        }
        return true;
    }
    /**
     * 移除批次
     * @param journal 选中的凭证行
     * @param items 已创建的批次
     */
    protected removeBatch(journal: MaterialBatchServiceJournal, items: bo.MaterialBatchJournal[]): void {
        // 未选择凭证行
        if (ibas.objects.isNull(journal)) {
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
        let index: number = this.batchJournals.indexOf(journal);
        let batchData: MaterialBatchServiceJournal = this.batchJournals[index];
        // 移除项目
        for (let item of items) {
            if (item.isNew) {
                batchData.contract.materialBatchs.remove(item);
            } else {
                item.delete();
            }
        }
        // 仅显示没有标记删除的
        this.view.showData(batchData.contract.materialBatchs.filter(c => c.isDeleted === false));
    }

    /**
     * 自动创建批次
     * @param journal 选中的凭证行
     */
    protected autoCreateBatch(journal: MaterialBatchServiceJournal): void {
        // 未选择凭证行
        if (ibas.objects.isNull(journal)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        let index: number = this.batchJournals.indexOf(journal);
        let batchJournal: MaterialBatchServiceJournal = this.batchJournals[index];
        if (!this.isNeedToCreate(journal)) {
            return;
        }
        let batchLine: bo.MaterialBatchJournal;
        let allcationQuantity: number = Number(0);
        // 如果该凭证已经开始创建批次
        let batchInfo: bo.MaterialBatchJournal = new bo.MaterialBatchJournal();
        batchInfo.itemCode = journal.itemCode;
        batchInfo.warehouse = journal.warehouse;
        batchInfo.direction = ibas.emDirection.IN;
        if (batchJournal.contract.materialBatchs.length !== 0) {
            // 存在数量为0的行，不用新建行
            batchLine = batchJournal.contract.materialBatchs.find(c => ibas.numbers.toFloat(c.quantity) === 0.0);
            for (let batch of batchJournal.contract.materialBatchs) {
                allcationQuantity = allcationQuantity + ibas.numbers.toFloat(batch.quantity);
                // 过滤掉为0的
                if (batch.quantity === 0) {
                    if (batch.isNew) {
                        batchJournal.contract.materialBatchs.remove(batch);
                    } else {
                        batch.delete();
                    }
                }
            }
            if (ibas.objects.isNull(batchLine)) {
                batchInfo.quantity = batchJournal.quantity - ibas.numbers.toFloat(allcationQuantity);
                batchJournal.contract.materialBatchs.create(batchInfo);
            } else {
                batchLine.quantity = batchJournal.quantity - Number(allcationQuantity);
            }
        } else {
            batchInfo.quantity = journal.needBatchQuantity;
            batchJournal.contract.materialBatchs.create(batchInfo);
        }
        this.view.showData(batchJournal.contract.materialBatchs);
    }

    /**
     * 选择凭证行事件
     * @param selected 选中的凭证行
     */
    protected selectMaterialBatchJournalLine(selected: MaterialBatchServiceJournal): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let index: number = this.batchJournals.indexOf(selected);
        let batchJournal: MaterialBatchServiceJournal = this.batchJournals[index];
        if (!ibas.objects.isNull(batchJournal)) {
            this.view.showData(batchJournal.contract.materialBatchs
                .filter(c => c.isDeleted === false));
        }
    }
    /** 绑定日记账信息 */
    bindBatchJournalData(contracts: IMaterialBatchContract[]): void {
        let batchJournals: MaterialBatchServiceJournal[] = new ibas.ArrayList<MaterialBatchServiceJournal>();
        for (let item of contracts) {
            batchJournals.push({
                contract: item,
                itemCode: item.itemCode,
                warehouse: item.warehouse,
                quantity: item.quantity,
                direction: ibas.emDirection.IN,
                needBatchQuantity: item.quantity,
                // selectedBatchQuantity: selectNum
            });
        }
        this.batchJournals = batchJournals;
    }

    /** 运行服务 */
    runService(contract: IMaterialBatchContract[]): void {
        // 行数据
        if (contract.length >= 1) {
            this.bindBatchJournalData(contract);
            // this.contract = contract;
        }
        super.show();
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showJournalLineData(this.batchJournals);
    }

    protected confirmData(): void {
        for (let item of this.batchJournals) {
            let createdQuantity: number = Number(0);
            item.contract.materialBatchs.forEach(c => createdQuantity = createdQuantity + Number(c.quantity));
            if (Number(item.needBatchQuantity) !== Number(createdQuantity)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batch_quantity_create_error"));
                return;
            }
            if (item.contract.materialBatchs.filter(c => ibas.strings.isEmpty(c.batchCode)).length !== 0) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batchcode_is_empty"));
                return;
            }
        }
        this.close();
    }
}


/** 视图-新建批次 */
export interface IMaterialReceiptBatchView extends ibas.IBOView {
    /** 显示数据 */
    showData(datas: bo.MaterialBatchJournal[]): void;
    // showData(datas: IMaterialBatchContract[]): void;
    showJournalLineData(datas: MaterialBatchServiceJournal[]): void;
    /** 添加批次事件 */
    addBatchEvent: Function;
    /** 移除批次事件 */
    removeBatchEvent: Function;
    /** 自动创建批次事件 */
    autoCreateBatchEvent: Function;
    /** 返回数据 */
    confirmDataEvent: Function;
    /** 选中凭证行事件 */
    selectMaterialBatchJournalLineEvent: Function;
}

/** 新建批次服务映射 */
export class MaterialReceiptBatchServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialReceiptBatchService.APPLICATION_ID;
        this.name = MaterialReceiptBatchService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = MaterialReceiptBatchServiceProxy;
    }
    /** 创建服务实例 */
    create(): ibas.IService<ibas.IServiceCaller<ibas.IServiceContract>> {
        return new MaterialReceiptBatchService();
    }
}

