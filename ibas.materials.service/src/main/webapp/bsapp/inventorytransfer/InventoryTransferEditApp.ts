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
    IMaterialBatchJournal,
    IMaterialSerialJournal,
    IMaterialBatchSerialInOutData,
    IMaterialBatchSerialInOutDataBatchJournals,
    IMaterialBatchSerialInOutDataSerialJournals,
} from "../../api/bo/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";

/** 编辑应用-库存转储 */
export class InventoryTransferEditApp extends ibas.BOEditApplication<IInventoryTransferEditView, bo.InventoryTransfer> {

    /** 应用标识 */
    static APPLICATION_ID: string = "91629c3b-f1de-4b5e-a836-2ac7e443eb1d";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_inventorytransfer_edit";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.InventoryTransfer.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = InventoryTransferEditApp.APPLICATION_ID;
        this.name = InventoryTransferEditApp.APPLICATION_NAME;
        this.boCode = InventoryTransferEditApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.deleteDataEvent = this.deleteData;
        this.view.createDataEvent = this.createData;
        this.view.addInventoryTransferLineEvent = this.addInventoryTransferLine;
        this.view.removeInventoryTransferLineEvent = this.removeInventoryTransferLine;
        this.view.chooseInventoryTransferWarehouseEvent = this.chooseInventoryTransferWarehouse;
        this.view.chooseInventoryTransferLineMaterialEvent = this.chooseInventoryTransferLineMaterial;
        this.view.chooseInventoryTransferLineWarehouseEvent = this.chooseInventoryTransferLineWarehouse;
        this.view.chooseInventoryTransferLineMaterialBatchEvent = this.chooseInventoryTransferLineMaterialBatch;
        this.view.chooseInventoryTransferLineMaterialSerialEvent = this.chooseInventoryTransferLineMaterialSerial;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        if (ibas.objects.isNull(this.editData)) {
            // 创建编辑对象实例
            this.editData = new bo.InventoryTransfer();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
        }
        this.view.showInventoryTransfer(this.editData);
        this.view.showInventoryTransferLines(this.editData.inventoryTransferLines.filterDeleted());
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        if (ibas.objects.instanceOf(arguments[0], bo.InventoryTransfer)) {
            // 尝试重新查询编辑对象
            let criteria: ibas.ICriteria = arguments[0].criteria();
            if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                // 有效的查询对象查询
                let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
                boRepository.fetchInventoryTransfer({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.InventoryTransfer>): void {
                        let data: bo.InventoryTransfer;
                        if (opRslt.resultCode === 0) {
                            data = opRslt.resultObjects.firstOrDefault();
                        }
                        if (ibas.objects.instanceOf(data, bo.InventoryTransfer)) {
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
    protected editData: bo.InventoryTransfer;
    /** 保存数据 */
    protected saveData(): void {
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.saveInventoryTransfer({
            beSaved: this.editData,
            onCompleted(opRslt: ibas.IOperationResult<bo.InventoryTransfer>): void {
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
                that.editData = new bo.InventoryTransfer();
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
    /** 添加库存转储-行事件 */
    addInventoryTransferLine(): void {
        this.editData.inventoryTransferLines.create();
        // 仅显示没有标记删除的
        this.view.showInventoryTransferLines(this.editData.inventoryTransferLines.filterDeleted());
    }
    /** 删除库存转储-行事件 */
    removeInventoryTransferLine(items: bo.InventoryTransferLine[]): void {
        // 非数组，转为数组
        if (!(items instanceof Array)) {
            items = [items];
        }
        if (items.length === 0) {
            return;
        }
        // 移除项目
        for (let item of items) {
            if (this.editData.inventoryTransferLines.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    this.editData.inventoryTransferLines.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showInventoryTransferLines(this.editData.inventoryTransferLines.filterDeleted());
    }
    /** 选择库存转储订单行物料事件 */
    chooseInventoryTransferWarehouse(): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.Warehouse>({
            caller: that.editData,
            boCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
            criteria: [
                new ibas.Condition(bo.Warehouse.PROPERTY_DELETED_NAME, ibas.emConditionOperation.EQUAL, "N")
            ],
            onCompleted(selecteds: ibas.List<bo.Warehouse>): void {
                // 获取触发的对象
                that.editData.fromWarehouse = selecteds.firstOrDefault().code;
            }
        });
    }
    /** 选择库存转储订单行物料事件 */
    chooseInventoryTransferLineMaterial(caller: bo.InventoryTransferLine): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.MaterialEx>({
            caller: caller,
            boCode: bo.MaterialEx.BUSINESS_OBJECT_CODE,
            criteria: [
                new ibas.Condition(bo.MaterialEx.PROPERTY_DELETED_NAME, ibas.emConditionOperation.EQUAL, "N")
            ],
            onCompleted(selecteds: ibas.List<bo.MaterialEx>): void {
                // 获取触发的对象
                let index: number = that.editData.inventoryTransferLines.indexOf(caller);
                let item: bo.InventoryTransferLine = that.editData.inventoryTransferLines[index];
                // 选择返回数量多余触发数量时,自动创建新的项目
                let created: boolean = false;
                for (let selected of selecteds) {
                    if (ibas.objects.isNull(item)) {
                        item = that.editData.inventoryTransferLines.create();
                        created = true;
                    }
                    item.itemCode = selected.code;
                    item.itemDescription = selected.name;
                    item.serialManagement = selected.serialManagement;
                    item.batchManagement = selected.batchManagement;
                    item.price = selected.price;
                    item.quantity = 1;
                    item = null;
                }
                if (created) {
                    // 创建了新的行项目
                    that.view.showInventoryTransferLines(that.editData.inventoryTransferLines.filterDeleted());
                }
            }
        });
    }

    /** 选择库存转储订单行物料事件 */
    chooseInventoryTransferLineWarehouse(caller: bo.InventoryTransferLine): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.Warehouse>({
            caller: caller,
            boCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
            criteria: [
                new ibas.Condition(bo.Warehouse.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, "Y")
            ],
            onCompleted(selecteds: ibas.List<bo.Warehouse>): void {
                // 获取触发的对象
                let index: number = that.editData.inventoryTransferLines.indexOf(caller);
                let item: bo.InventoryTransferLine = that.editData.inventoryTransferLines[index];
                // 选择返回数量多余触发数量时,自动创建新的项目
                let created: boolean = false;
                for (let selected of selecteds) {
                    if (ibas.objects.isNull(item)) {
                        item = that.editData.inventoryTransferLines.create();
                        created = true;
                    }
                    item.warehouse = selected.code;
                    item = null;
                }
                if (created) {
                    // 创建了新的行项目
                    that.view.showInventoryTransferLines(that.editData.inventoryTransferLines.filterDeleted());
                }
            }
        });
    }

    chooseInventoryTransferLineMaterialBatch(): void {
        let that: this = this;
        let caller: IMaterialBatchSerialInOutData[] = that.getBatchData();
        if (ibas.objects.isNull(caller) || caller.length === 0) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_no_batchmanaged"));
            return;
        }
        ibas.servicesManager.runChooseService<IMaterialBatchSerialInOutData>({
            caller: caller,
            boCode: bo.MaterialBatchJournal.BUSINESS_OBJECT_ISSUE_CODE,
            criteria: [
            ],
            onCompleted(callbackData: ibas.List<IMaterialBatchSerialInOutData>): void {
                // 获取触发的对象
                for (let line of callbackData) {
                    let item: bo.InventoryTransferLine = that.editData.inventoryTransferLines[line.index];
                    for (let batchLine of item.inventoryTransferMaterialBatchJournals) {
                        batchLine.delete();
                    }
                    for (let batchJournal of line.materialBatchSerialInOutDataBatchJournals.filterDeleted()) {
                        // 出仓库需要选择批次
                        let batchOutLine: bo.MaterialBatchJournal = item.inventoryTransferMaterialBatchJournals.create();
                        batchOutLine.batchCode = batchJournal.batchCode;
                        batchOutLine.quantity = batchJournal.quantity;
                        batchOutLine.itemCode = batchJournal.itemCode;
                        batchOutLine.warehouse = that.editData.fromWarehouse;
                        batchOutLine.admissionDate = batchJournal.admissionDate;
                        batchOutLine.expirationDate = batchJournal.expirationDate;
                        batchOutLine.manufacturingDate = batchJournal.manufacturingDate;
                        batchOutLine.direction = ibas.emDirection.OUT;
                        // 入库需要新建批次
                        let batchInLine: bo.MaterialBatchJournal = item.inventoryTransferMaterialBatchJournals.create();
                        batchInLine.batchCode = batchJournal.batchCode;
                        batchInLine.quantity = batchJournal.quantity;
                        batchInLine.itemCode = batchJournal.itemCode;
                        batchInLine.warehouse = item.warehouse;
                        batchInLine.admissionDate = batchJournal.admissionDate;
                        batchInLine.expirationDate = batchJournal.expirationDate;
                        batchInLine.manufacturingDate = batchJournal.manufacturingDate;
                        batchInLine.direction = ibas.emDirection.IN;
                    }
                }
            }
        });
    }
    chooseInventoryTransferLineMaterialSerial(): void {
        let that: this = this;
        let caller: IMaterialBatchSerialInOutData[] = that.getSerialData();
        if (ibas.objects.isNull(caller) || caller.length === 0) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_app_no_serialmanaged"));
            return;
        }
        if (ibas.objects.isNull(that.editData.fromWarehouse)) {
            return;
        }
        for (let inventoryTransferLine of that.editData.inventoryTransferLines) {
            if (ibas.objects.isNull(inventoryTransferLine.warehouse) || ibas.objects.isNull(inventoryTransferLine.itemCode)) {
                return;
            }
        }
        ibas.servicesManager.runChooseService<IMaterialBatchSerialInOutData>({
            caller: caller,
            boCode: bo.MaterialSerialJournal.BUSINESS_OBJECT_ISSUE_CODE,
            criteria: [
            ],
            onCompleted(callbackData: ibas.List<bo.MaterialBatchSerialInOutData>): void {
                // 获取触发的对象
                for (let line of callbackData) {
                    let item: bo.InventoryTransferLine = that.editData.inventoryTransferLines[line.index];
                    for (let serialLine of item.inventoryTransferMaterialSerialJournals) {
                        serialLine.delete();
                    }
                    for (let serialJournal of line.materialBatchSerialInOutDataSerialJournals.filterDeleted()) {
                        // 出仓库需要选择序列
                        let serialOutLine: bo.MaterialSerialJournal = item.inventoryTransferMaterialSerialJournals.create();
                        serialOutLine.serialCode = serialJournal.serialCode;
                        serialOutLine.supplierSerial = serialJournal.supplierSerial;
                        serialOutLine.batchSerial = serialJournal.batchSerial;
                        serialOutLine.itemCode = serialJournal.itemCode;
                        serialOutLine.warehouse = that.editData.fromWarehouse;
                        serialOutLine.admissionDate = serialJournal.admissionDate;
                        serialOutLine.expirationDate = serialJournal.expirationDate;
                        serialOutLine.manufacturingDate = serialJournal.manufacturingDate;
                        serialOutLine.direction = ibas.emDirection.OUT;
                        // 入库需要新建序列
                        let serialInLine: bo.MaterialSerialJournal = item.inventoryTransferMaterialSerialJournals.create();
                        serialInLine.serialCode = serialJournal.serialCode;
                        serialInLine.supplierSerial = serialJournal.supplierSerial;
                        serialInLine.batchSerial = serialJournal.batchSerial;
                        serialInLine.itemCode = serialJournal.itemCode;
                        serialInLine.warehouse = item.warehouse;
                        serialInLine.admissionDate = serialJournal.admissionDate;
                        serialInLine.expirationDate = serialJournal.expirationDate;
                        serialInLine.manufacturingDate = serialJournal.manufacturingDate;
                        serialInLine.direction = ibas.emDirection.IN;
                    }
                }
            }
        });
    }

    /** 获取行-批次信息 */
    getBatchData(): IMaterialBatchSerialInOutData[] {
        // 获取行数据
        let goodIssueLines: bo.InventoryTransferLine[] = this.editData.inventoryTransferLines;
        let inputData: IMaterialBatchSerialInOutData[] = new Array<bo.MaterialBatchSerialInOutData>();
        for (let line of goodIssueLines) {
            if (line.batchManagement.toString() === ibas.enums.toString(ibas.emYesNo, ibas.emYesNo.NO)) {
                continue;
            }
            let input: IMaterialBatchSerialInOutData = new bo.MaterialBatchSerialInOutData();
            input.index = goodIssueLines.indexOf(line);
            input.itemCode = line.itemCode;
            input.quantity = line.quantity;
            input.warehouse = this.editData.fromWarehouse;
            input.direction = ibas.emDirection.OUT;
            if (line.inventoryTransferMaterialBatchJournals.filterDeleted().length === 0) {
                input.needBatchQuantity = line.quantity;
                input.selectedBatchQuantity = 0;
            } else {
                for (let item of line.inventoryTransferMaterialBatchJournals
                    .filter(c => c.warehouse === this.editData.fromWarehouse && c.isDeleted === false)) {
                    let batchLine: IMaterialBatchJournal = input.materialBatchSerialInOutDataBatchJournals.create();
                    batchLine.batchCode = item.batchCode;
                    batchLine.itemCode = item.itemCode;
                    batchLine.warehouse = item.warehouse;
                    batchLine.quantity = item.quantity;
                    batchLine.direction = ibas.emDirection.OUT;
                }
            }
            inputData.push(input);
        }
        return inputData;
    }
    /** 获取行-序列信息 */
    getSerialData(): IMaterialBatchSerialInOutData[] {
        // 获取行数据
        let goodIssueLines: bo.InventoryTransferLine[] = this.editData.inventoryTransferLines;
        let inputData: IMaterialBatchSerialInOutData[] = new Array<bo.MaterialBatchSerialInOutData>();
        for (let line of goodIssueLines) {
            if (line.serialManagement.toString() === ibas.enums.toString(ibas.emYesNo, ibas.emYesNo.NO)) {
                continue;
            }
            let input: IMaterialBatchSerialInOutData = new bo.MaterialBatchSerialInOutData();
            input.index = goodIssueLines.indexOf(line);
            input.itemCode = line.itemCode;
            input.quantity = line.quantity;
            input.warehouse = this.editData.fromWarehouse;
            input.direction = ibas.emDirection.OUT;
            if (line.inventoryTransferMaterialSerialJournals.filterDeleted().length === 0) {
                input.needSerialQuantity = line.quantity;
                input.selectedSerialQuantity = 0;
            } else {
                for (let item of line.inventoryTransferMaterialSerialJournals
                    .filter(c => c.warehouse === this.editData.fromWarehouse && c.isDeleted === false)) {
                    let serialLine: IMaterialSerialJournal = input.materialBatchSerialInOutDataSerialJournals.create();
                    serialLine.serialCode = item.serialCode;
                    serialLine.itemCode = item.itemCode;
                    serialLine.warehouse = item.warehouse;
                    serialLine.direction = ibas.emDirection.OUT;
                }
            }
            inputData.push(input);
        }
        return inputData;
    }

}
/** 视图-库存转储 */
export interface IInventoryTransferEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showInventoryTransfer(data: bo.InventoryTransfer): void;
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 选择库存转储单从仓库事件 */
    chooseInventoryTransferWarehouseEvent: Function;
    /** 添加库存转储-行事件 */
    addInventoryTransferLineEvent: Function;
    /** 删除库存转储-行事件 */
    removeInventoryTransferLineEvent: Function;
    /** 显示数据 */
    showInventoryTransferLines(datas: bo.InventoryTransferLine[]): void;
    /** 选择库存转储单行物料事件 */
    chooseInventoryTransferLineMaterialEvent: Function;
    /** 选择库存转储单行仓库事件 */
    chooseInventoryTransferLineWarehouseEvent: Function;
    /** 选择库存转储单行物料批次事件 */
    chooseInventoryTransferLineMaterialBatchEvent: Function;
    /** 选择库存转储单行物料序列事件 */
    chooseInventoryTransferLineMaterialSerialEvent: Function;
}
