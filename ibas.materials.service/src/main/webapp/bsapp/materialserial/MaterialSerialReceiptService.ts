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
    IMaterialSerialContract,
    IMaterialSerialJournal,
} from "../../api/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";

export class MaterialSerialReceiptService extends ibas.ServiceApplication<IMaterialSerialReceiptView, IMaterialSerialContract[]> {

    /** 应用标识 */
    static APPLICATION_ID: string = "3533e07e-0c13-44cf-9543-adacb49dade2";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_MaterialSerialReceiptservice";

    constructor() {
        super();
        this.id = MaterialSerialReceiptService.APPLICATION_ID;
        this.name = MaterialSerialReceiptService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 服务序列日记账信息 */
    protected serialJournals: IMaterialSerialContract[];

    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.addSerialEvent = this.addSerial;
        this.view.removeSerialEvent = this.removeSerial;
        this.view.autoCreateSerialEvent = this.autoCreateSerial;
        this.view.confirmDataEvent = this.confirmData;
        this.view.selectMaterialSerialJournalLineEvent = this.selectMaterialSerialJournalLine;
    }
    /**
     * 创建序列
     * @param journal 选择的凭证行
     */
    protected addSerial(journal: IMaterialSerialContract): void {
        // 确认选择了凭证信息
        if (ibas.objects.isNull(journal)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        // 找到输入数据的序列集合
        let index: number = this.serialJournals.indexOf(journal);
        let item: IMaterialSerialContract = this.serialJournals[index];
        if (!this.isNeedToCreated(item)) {
            return;
        }
        let serialLine: bo.MaterialSerialJournal = new bo.MaterialSerialJournal();
        serialLine.itemCode = journal.itemCode;
        serialLine.warehouse = journal.warehouse;
        serialLine.direction = ibas.emDirection.IN;
        item.materialSerials.add(serialLine);
        // 仅显示没有标记删除的
        this.view.showData(item.materialSerials.filter(c => c.isDeleted === false));
    }

    /**
     * 移除创建的序列
     * @param journal 选中的凭证行
     * @param items 需要移除的序列集合
     */
    protected removeSerial(journal: IMaterialSerialContract, items: bo.MaterialSerialJournal[]): void {
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
        let index: number = this.serialJournals.indexOf(journal);
        let serialData: IMaterialSerialContract = this.serialJournals[index];
        // 移除项目
        for (let item of items) {
            if (serialData.materialSerials.indexOf(item) >= 0) {
                if (item.isNew) {
                    serialData.materialSerials.remove(item);
                } else {
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showData(serialData.materialSerials.filter(c => c.isDeleted === false));
    }

    /**
     * 自动创建序列
     * @param journal 选中的凭证行
     */
    protected autoCreateSerial(journal: IMaterialSerialContract): void {
        // 未选择凭证行
        if (ibas.objects.isNull(journal)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("materials_app_batch_serial_choose_journalline")
            ));
            return;
        }
        let index: number = this.serialJournals.indexOf(journal);
        let serialItem: IMaterialSerialContract = this.serialJournals[index];
        // 不需要创建序列了
        if (!this.isNeedToCreated(journal)) {
            this.view.showData(serialItem.materialSerials.filter(c => c.isDeleted === false));
            return;
        }
        do {
            let serialLine: bo.MaterialSerialJournal = new bo.MaterialSerialJournal();
            serialLine.itemCode = journal.itemCode;
            serialLine.warehouse = journal.warehouse;
            serialLine.direction = ibas.emDirection.IN;
            serialItem.materialSerials.add(serialLine);
        } while (serialItem.quantity > serialItem.materialSerials.length);
        this.view.showData(serialItem.materialSerials.filter(c => c.isDeleted === false));
    }
    /** 选择凭证行事件  */
    protected selectMaterialSerialJournalLine(selected: IMaterialSerialContract): void {
        if (ibas.objects.isNull(selected)) {
            return;
        }
        let index: number = this.serialJournals.indexOf(selected);
        let serialJournal: IMaterialSerialContract = this.serialJournals[index];
        if (!ibas.objects.isNull(serialJournal)) {
            this.view.showData(serialJournal.materialSerials.filter(c => c.isDeleted === false));
        }
    }

    /** 绑定日记账信息 */
    bindSerialJournalData(contract: IMaterialSerialContract[]): void {
        let batchJournals: IMaterialSerialContract[] = new ibas.ArrayList<IMaterialSerialContract>();
        for (let item of contract) {
            batchJournals.push({
                itemCode: item.itemCode,
                warehouse: item.warehouse,
                quantity: item.quantity,
                materialSerials: item.materialSerials
            });
        }
        this.serialJournals = batchJournals;
    }

    getSelectQuantity(contract: IMaterialSerialContract): number {
        return contract.materialSerials.length;
    }
    /** 运行服务 */
    runService(contract: IMaterialSerialContract[]): void {
        // 行数据
        if (contract.length >= 1) {
            this.bindSerialJournalData(contract);
        }
        super.show();
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showJournalLineData(this.serialJournals);
    }

    protected confirmData(): void {
        // 序列数量错误
        for (let item of this.serialJournals) {
            if (this.isNeedToCreated(item)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_batch_quantity_create_error"));
                return;
            }
            if (item.materialSerials.filter(c => ibas.strings.isEmpty(c.serialCode)).length !== 0) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_serialcode_is_empty"));
                return;
            }
        }
        this.close();
    }

    /**
     * 是否需要选择序列  false 不需要；true 需要
     * @param journal 序列日记账行
     */
    isNeedToCreated(journal: IMaterialSerialContract): boolean {
        if (Number(journal.materialSerials.filter(c => c.isDeleted === false).length) === Number(journal.quantity)) {
            return false;
        }
        return true;
    }
}


/** 视图-新建序列 */
export interface IMaterialSerialReceiptView extends ibas.IBOView {
    /** 显示已经创建的序列数据 */
    showData(datas: IMaterialSerialJournal[]): void;
    /** 显示序列日记账 */
    showJournalLineData(datas: IMaterialSerialContract[]): void;
    /** 添加序列事件 */
    addSerialEvent: Function;
    /** 移除序列事件 */
    removeSerialEvent: Function;
    /** 自动创建序列事件 */
    autoCreateSerialEvent: Function;
    /** 返回数据 */
    confirmDataEvent: Function;
    /** 选中凭证行事件 */
    selectMaterialSerialJournalLineEvent: Function;
}

/** 新建序列服务映射 */
export class MaterialSerialReceiptServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialReceiptService.APPLICATION_ID;
        this.name = MaterialSerialReceiptService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = MaterialSerialReceiptServiceProxy;
    }
    /** 创建服务实例 */
    create(): ibas.IService<ibas.IServiceCaller<ibas.IServiceContract>> {
        return new MaterialSerialReceiptService();
    }
}