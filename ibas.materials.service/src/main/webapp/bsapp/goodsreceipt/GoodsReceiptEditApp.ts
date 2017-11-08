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
    IMaterialBatchSerialInOutData,
    IMaterialBatchSerialInOutDataBatchJournals,
    IMaterialBatchSerialInOutDataSerialJournals,
} from "../../api/bo/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";

/** 编辑应用-库存收货 */
export class GoodsReceiptEditApp extends ibas.BOEditApplication<IGoodsReceiptEditView, bo.GoodsReceipt> {

    /** 应用标识 */
    static APPLICATION_ID: string = "86721b86-fcbc-4adf-9e1e-c308373fb7cc";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_goodsreceipt_edit";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.GoodsReceipt.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = GoodsReceiptEditApp.APPLICATION_ID;
        this.name = GoodsReceiptEditApp.APPLICATION_NAME;
        this.boCode = GoodsReceiptEditApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.deleteDataEvent = this.deleteData;
        this.view.createDataEvent = this.createData;
        this.view.addGoodsReceiptLineEvent = this.addGoodsReceiptLine;
        this.view.removeGoodsReceiptLineEvent = this.removeGoodsReceiptLine;
        this.view.chooseGoodsReceiptLineMaterialEvent = this.chooseGoodsReceiptLineMaterial;
        this.view.chooseGoodsreceiptlineWarehouseEvent = this.chooseGoodsreceiptlineWarehouse;
        this.view.createGoodsReceiptLineMaterialBatchEvent = this.createGoodsReceiptLineMaterialBatch;
        this.view.createGoodsReceiptLineMaterialSerialEvent = this.createGoodsReceiptLineMaterialSerial;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        if (ibas.objects.isNull(this.editData)) {
            // 创建编辑对象实例
            this.editData = new bo.GoodsReceipt();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
        }
        this.view.showGoodsReceipt(this.editData);
        this.view.showGoodsReceiptLines(this.editData.goodsReceiptLines.filterDeleted());
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        if (ibas.objects.instanceOf(arguments[0], bo.GoodsReceipt)) {
            // 尝试重新查询编辑对象
            let criteria: ibas.ICriteria = arguments[0].criteria();
            if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                // 有效的查询对象查询
                let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
                boRepository.fetchGoodsReceipt({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.GoodsReceipt>): void {
                        let data: bo.GoodsReceipt;
                        if (opRslt.resultCode === 0) {
                            data = opRslt.resultObjects.firstOrDefault();
                        }
                        if (ibas.objects.instanceOf(data, bo.GoodsReceipt)) {
                            // 查询到了有效数据
                            that.editData = data;
                            that.show();
                        } else {
                            // 数据重新检索无效
                            that.messages({
                                type: ibas.emMessageType.WARNING,
                                message: ibas.i18n.prop("sys_shell_data_deleted_and_created"),
                                onCompleted(): void {
                                    that.show();
                                }
                            });
                        }
                    }
                });
                // 开始查询数据
                return;
            }
        }
        super.run();
    }
    /** 待编辑的数据 */
    protected editData: bo.GoodsReceipt;
    /** 保存数据 */
    protected saveData(): void {
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.saveGoodsReceipt({
            beSaved: this.editData,
            onCompleted(opRslt: ibas.IOperationResult<bo.GoodsReceipt>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 0) {
                        // 删除成功，释放当前对象
                        that.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("sys_shell_data_delete") + ibas.i18n.prop("sys_shell_sucessful"));
                        that.editData = undefined;
                    } else {
                        // 替换编辑对象
                        that.editData = opRslt.resultObjects.firstOrDefault();
                        that.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("sys_shell_data_save") + ibas.i18n.prop("sys_shell_sucessful"));
                    }
                    // 刷新当前视图
                    that.viewShowed();
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_saving_data"));
    }
    /** 删除数据 */
    protected deleteData(): void {
        let that: this = this;
        this.messages({
            type: ibas.emMessageType.QUESTION,
            title: ibas.i18n.prop(this.name),
            message: ibas.i18n.prop("sys_whether_to_delete"),
            actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
            onCompleted(action: ibas.emMessageAction): void {
                if (action === ibas.emMessageAction.YES) {
                    that.editData.delete();
                    that.saveData();
                }
            }
        });
    }
    /** 新建数据，参数1：是否克隆 */
    protected createData(clone: boolean): void {
        let that: this = this;
        let createData: Function = function (): void {
            if (clone) {
                // 克隆对象
                that.editData = that.editData.clone();
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_cloned_new"));
                that.viewShowed();
            } else {
                // 新建对象
                that.editData = new bo.GoodsReceipt();
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
                that.viewShowed();
            }
        };
        if (that.editData.isDirty) {
            this.messages({
                type: ibas.emMessageType.QUESTION,
                title: ibas.i18n.prop(this.name),
                message: ibas.i18n.prop("sys_data_not_saved_whether_to_continue"),
                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                onCompleted(action: ibas.emMessageAction): void {
                    if (action === ibas.emMessageAction.YES) {
                        createData();
                    }
                }
            });
        } else {
            createData();
        }
    }
    /** 添加库存收货-行事件 */
    addGoodsReceiptLine(): void {
        this.editData.goodsReceiptLines.create();
        // 仅显示没有标记删除的
        this.view.showGoodsReceiptLines(this.editData.goodsReceiptLines.filterDeleted());
    }
    /** 删除库存收货-行事件 */
    removeGoodsReceiptLine(items: bo.GoodsReceiptLine[]): void {
        // 非数组，转为数组
        if (!(items instanceof Array)) {
            items = [items];
        }
        if (items.length === 0) {
            return;
        }
        // 移除项目
        for (let item of items) {
            if (this.editData.goodsReceiptLines.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    this.editData.goodsReceiptLines.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showGoodsReceiptLines(this.editData.goodsReceiptLines.filterDeleted());
    }

    /** 选择库存收货订单行物料事件 */
    chooseGoodsReceiptLineMaterial(caller: bo.GoodsReceiptLine): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.MaterialEx>({
            caller: caller,
            boCode: bo.MaterialEx.BUSINESS_OBJECT_CODE,
            criteria: [
                new ibas.Condition(bo.Material.PROPERTY_DELETED_NAME, ibas.emConditionOperation.EQUAL, "N")
            ],
            onCompleted(selecteds: ibas.List<bo.MaterialEx>): void {
                // 获取触发的对象
                let index: number = that.editData.goodsReceiptLines.indexOf(caller);
                let item: bo.GoodsReceiptLine = that.editData.goodsReceiptLines[index];
                // 选择返回数量多余触发数量时,自动创建新的项目
                let created: boolean = false;
                for (let selected of selecteds) {
                    if (ibas.objects.isNull(item)) {
                        item = that.editData.goodsReceiptLines.create();
                        created = true;
                    }
                    item.itemCode = selected.code;
                    item.itemDescription = selected.name;
                    item.warehouse = selected.warehouseCode;
                    item.serialManagement = selected.serialManagement;
                    item.batchManagement = selected.batchManagement;
                    item.price = selected.price;
                    item.quantity = 1;
                    item = null;
                }
                if (created) {
                    // 创建了新的行项目
                    that.view.showGoodsReceiptLines(that.editData.goodsReceiptLines.filterDeleted());
                }
            }
        });
    }

    /** 选择库存收货订单行物料事件 */
    chooseGoodsreceiptlineWarehouse(caller: bo.GoodsReceiptLine): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.Warehouse>({
            caller: caller,
            boCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
            criteria: [
                new ibas.Condition(bo.Warehouse.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, "Y")
            ],
            onCompleted(selecteds: ibas.List<bo.Warehouse>): void {
                // 获取触发的对象
                let index: number = that.editData.goodsReceiptLines.indexOf(caller);
                let item: bo.GoodsReceiptLine = that.editData.goodsReceiptLines[index];
                // 选择返回数量多余触发数量时,自动创建新的项目
                let created: boolean = false;
                for (let selected of selecteds) {
                    if (ibas.objects.isNull(item)) {
                        item = that.editData.goodsReceiptLines.create();
                        created = true;
                    }
                    item.warehouse = selected.code;
                    item = null;
                }
                if (created) {
                    // 创建了新的行项目
                    that.view.showGoodsReceiptLines(that.editData.goodsReceiptLines.filterDeleted());
                }
            }
        });
    }
    /** 新建物料批次信息 */
    createGoodsReceiptLineMaterialBatch(): void {
        let that: this = this;
        let caller: IMaterialBatchSerialInOutData[] = that.getBatchData();
        if (ibas.objects.isNull(caller) || caller.length === 0) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_no_batchmanaged"));
            return;
        }
        ibas.servicesManager.runChooseService<IMaterialBatchSerialInOutData>({
            caller: caller,
            boCode: bo.MaterialBatchJournal.BUSINESS_OBJECT_RECEIEPT_CODE,
            criteria: [
            ],
            onCompleted(callbackData: ibas.List<IMaterialBatchSerialInOutData>): void {
                // 获取触发的对象
                for (let line of callbackData) {
                    let item: bo.GoodsReceiptLine = that.editData.goodsReceiptLines[line.index];
                    for (let batchLine of item.goodsReceiptMaterialBatchJournals) {
                        batchLine.delete();
                    }
                    for (let batchJournal of line.materialBatchSerialInOutDataBatchJournals.filterDeleted()) {
                        // 如果批次号为空 不处理
                        if (ibas.objects.isNull(batchJournal.batchCode)) {
                            continue;
                        }
                        let batchLine: bo.MaterialBatchJournal = item.goodsReceiptMaterialBatchJournals.create();
                        batchLine.batchCode = batchJournal.batchCode;
                        batchLine.itemCode = batchJournal.itemCode;
                        batchLine.warehouse = batchJournal.warehouse;
                        batchLine.quantity = batchJournal.quantity;
                        batchLine.direction = batchJournal.direction;
                        batchLine.admissionDate = batchJournal.admissionDate;
                        batchLine.expirationDate = batchJournal.expirationDate;
                        batchLine.manufacturingDate = batchJournal.manufacturingDate;
                    }
                }
            }
        });
    }
    /** 新建物料序列信息 */
    createGoodsReceiptLineMaterialSerial(): void {
        let that: this = this;
        let caller: IMaterialBatchSerialInOutData[] = that.getSerialData();
        if (ibas.objects.isNull(caller) || caller.length === 0) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_no_serialmanaged"));
            return;
        }
        ibas.servicesManager.runChooseService<IMaterialBatchSerialInOutData>({
            caller: caller,
            boCode: bo.MaterialSerialJournal.BUSINESS_OBJECT_RECEIPT_CODE,
            criteria: [
            ],
            onCompleted(callbackData: ibas.List<IMaterialBatchSerialInOutData>): void {
                // 获取触发的对象
                for (let line of callbackData) {
                    let item: bo.GoodsReceiptLine = that.editData.goodsReceiptLines[line.index];
                    for (let serialLine of item.goodsReceiptMaterialSerialJournals) {
                        serialLine.delete();
                    }
                    for (let serialJournal of line.materialBatchSerialInOutDataSerialJournals.filterDeleted()) {
                        // 如果序列号为空 不处理
                        if (ibas.objects.isNull(serialJournal.serialCode)) {
                            continue;
                        }
                        let serialLine: bo.MaterialSerialJournal = item.goodsReceiptMaterialSerialJournals.create();
                        serialLine.supplierSerial = serialJournal.supplierSerial;
                        serialLine.serialCode = serialJournal.serialCode;
                        serialLine.itemCode = serialJournal.itemCode;
                        serialLine.warehouse = serialJournal.warehouse;
                        serialLine.admissionDate = serialJournal.admissionDate;
                        serialLine.expirationDate = serialJournal.expirationDate;
                        serialLine.manufacturingDate = serialJournal.manufacturingDate;
                    }
                }
            }
        });
    }

    /** 获取行-批次信息 */
    getBatchData(): IMaterialBatchSerialInOutData[] {
        // 获取行数据
        let goodReceiptLines: bo.GoodsReceiptLine[] = this.editData.goodsReceiptLines;
        let inputData: IMaterialBatchSerialInOutData[] = new Array<bo.MaterialBatchSerialInOutData>();
        for (let line of goodReceiptLines) {
            if (!ibas.objects.isNull(line.batchManagement) &&
                line.batchManagement.toString() === ibas.enums.toString(ibas.emYesNo, ibas.emYesNo.NO)) {
                continue;
            }
            let input: bo.MaterialBatchSerialInOutData = new bo.MaterialBatchSerialInOutData();
            input.index = goodReceiptLines.indexOf(line);
            input.itemCode = line.itemCode;
            input.quantity = line.quantity;
            input.warehouse = line.warehouse;
            input.direction = ibas.emDirection.IN;
            if (line.goodsReceiptMaterialBatchJournals.filterDeleted().length === 0) {
                input.needBatchQuantity = line.quantity;
                input.selectedBatchQuantity = 0;
            } else {
                for (let item of line.goodsReceiptMaterialBatchJournals.filterDeleted()) {
                    let batchLine: bo.MaterialBatchJournal = input.materialBatchSerialInOutDataBatchJournals.create();
                    batchLine.batchCode = item.batchCode;
                    batchLine.itemCode = item.itemCode;
                    batchLine.warehouse = item.warehouse;
                    batchLine.quantity = item.quantity;
                    batchLine.expirationDate = item.expirationDate;
                    batchLine.admissionDate = item.admissionDate;
                    batchLine.manufacturingDate = item.manufacturingDate;
                    batchLine.direction = ibas.emDirection.IN;
                }
            }
            inputData.push(input);
        }
        return inputData;
    }
    /** 获取行-序列信息 */
    getSerialData(): IMaterialBatchSerialInOutData[] {
        // 获取行数据
        let goodReceiptLines: bo.GoodsReceiptLine[] = this.editData.goodsReceiptLines;
        let inputData: IMaterialBatchSerialInOutData[] = new Array<bo.MaterialBatchSerialInOutData>();
        for (let line of goodReceiptLines) {
            if (!ibas.objects.isNull(line.serialManagement) &&
                line.serialManagement.toString() === ibas.enums.toString(ibas.emYesNo, ibas.emYesNo.NO)) {
                continue;
            }
            let input: bo.MaterialBatchSerialInOutData = new bo.MaterialBatchSerialInOutData();
            input.index = goodReceiptLines.indexOf(line);
            input.itemCode = line.itemCode;
            input.quantity = line.quantity;
            input.warehouse = line.warehouse;
            input.direction = ibas.emDirection.IN;
            if (line.goodsReceiptMaterialSerialJournals.filterDeleted().length === 0) {
                input.needSerialQuantity = line.quantity;
                input.selectedSerialQuantity = 0;
            } else {
                for (let item of line.goodsReceiptMaterialSerialJournals.filterDeleted()) {
                    let serialLine: bo.MaterialSerialJournal = input.materialBatchSerialInOutDataSerialJournals.create();
                    serialLine.supplierSerial = item.supplierSerial;
                    serialLine.batchSerial = item.batchSerial;
                    serialLine.expirationDate = item.expirationDate;
                    serialLine.warrantyStartDate = item.warrantyStartDate;
                    serialLine.warrantyEndDate = item.warrantyEndDate;
                    serialLine.expirationDate = item.expirationDate;
                    serialLine.admissionDate = item.admissionDate;
                    serialLine.manufacturingDate = item.manufacturingDate;
                    serialLine.serialCode = item.serialCode;
                    serialLine.itemCode = item.itemCode;
                    serialLine.warehouse = item.warehouse;
                    serialLine.direction = ibas.emDirection.IN;
                }
            }
            inputData.push(input);
        }
        return inputData;
    }

}
/** 视图-库存收货 */
export interface IGoodsReceiptEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showGoodsReceipt(data: bo.GoodsReceipt): void;
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 添加库存收货-行事件 */
    addGoodsReceiptLineEvent: Function;
    /** 删除库存收货-行事件 */
    removeGoodsReceiptLineEvent: Function;
    /** 显示数据 */
    showGoodsReceiptLines(datas: bo.GoodsReceiptLine[]): void;
    /** 选择库存收货单行物料事件 */
    chooseGoodsReceiptLineMaterialEvent: Function;
    /** 选择库存收货单行仓库事件 */
    chooseGoodsreceiptlineWarehouseEvent: Function;
    /** 批次管理物料新建批次 */
    createGoodsReceiptLineMaterialBatchEvent: Function;
    /** 批次管理物料新建序列 */
    createGoodsReceiptLineMaterialSerialEvent: Function;
}
