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
    IMaterialIssueBatchs,
    IMaterialIssueBatchLine,
    IMaterialIssueBatchContract,
    IMaterialIssueBatchContractLine,
    IMaterialIssueSerialContractLine,
    IMaterialIssueSerialContract,
    IMaterialIssueSerialLine,
    IMaterialIssueSerials,
} from "../../api/bo/index";
import {
    MaterialIssueBatchServiceProxy,
    MaterialIssueSerialServiceProxy,
} from "../../api/Datas";
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
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
        }
        this.view.showInventoryTransfer(this.editData);
        this.view.showInventoryTransferLines(this.editData.inventoryTransferLines.filterDeleted());
    }
    /** 运行,覆盖原方法 */
    run(): void;
    run(data: bo.InventoryTransfer): void;
    run(): void {
        let that: this = this;
        if (ibas.objects.instanceOf(arguments[0], bo.InventoryTransfer)) {
            let data: bo.InventoryTransfer = arguments[0];
            // 新对象直接编辑
            if (data.isNew) {
                that.editData = data;
                that.show();
                return;
            }
            // 尝试重新查询编辑对象
            let criteria: ibas.ICriteria = data.criteria();
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
                                message: ibas.i18n.prop("shell_data_deleted_and_created"),
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
        super.run.apply(this, arguments);
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
                            ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                        that.editData = undefined;
                    } else {
                        // 替换编辑对象
                        that.editData = opRslt.resultObjects.firstOrDefault();
                        that.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                    }
                    // 刷新当前视图
                    that.viewShowed();
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
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
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_cloned_new"));
                that.viewShowed();
            } else {
                // 新建对象
                that.editData = new bo.InventoryTransfer();
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
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
        ibas.servicesManager.runChooseService<bo.Product>({
            boCode: bo.Product.BUSINESS_OBJECT_CODE,
            criteria: that.getConditions(),
            onCompleted(selecteds: ibas.List<bo.Product>): void {
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
        let inventoryTransferLines: bo.InventoryTransferLine[] = this.editData.inventoryTransferLines.filterBatchLine();
        if (ibas.objects.isNull(inventoryTransferLines) || inventoryTransferLines.length === 0) {
            this.messages(ibas.emMessageType.INFORMATION, ibas.i18n.prop("materials_app_no_matched_documentline_to_choose_batch"));
            return;
        }
        // 调用批次选择服务
        ibas.servicesManager.runApplicationService<IMaterialIssueBatchContract>({
            proxy: new MaterialIssueBatchServiceProxy(that.getBatchContract(inventoryTransferLines))
        });
    }
    chooseInventoryTransferLineMaterialSerial(): void {
        let that: this = this;
        let inventoryTransferLine: bo.InventoryTransferLine[] = this.editData.inventoryTransferLines.filterSerialLine();
        if (ibas.objects.isNull(inventoryTransferLine) || inventoryTransferLine.length === 0) {
            this.messages(ibas.emMessageType.INFORMATION, ibas.i18n.prop("materials_app_no_matched_documentline_to_choose_serial"));
            return;
        }
        // 调用序列选择服务
        ibas.servicesManager.runApplicationService<IMaterialIssueSerialContract>({
            proxy: new MaterialIssueSerialServiceProxy(that.getSerialContract(inventoryTransferLine))
        });
    }


    /** 获取行-批次服务契约信息 */
    getBatchContract(inventoryTransferLines: bo.InventoryTransferLine[]): IMaterialIssueBatchContract {
        let contracts: IMaterialIssueBatchContractLine[] = [];
        for (let item of inventoryTransferLines) {
            let batchInfos: IMaterialIssueBatchs = {
                materialIssueLineBatchs: [],
                createBatchJournal(batchData: IMaterialBatchJournal): void {
                    let batchJournal: bo.MaterialBatchJournal = item.materialBatchJournals.create();
                    batchJournal.batchCode = batchData.batchCode;
                    batchJournal.itemCode = batchData.itemCode;
                    batchJournal.warehouse = batchData.warehouse;
                    batchJournal.direction = batchData.direction;
                    batchJournal.quantity = batchData.quantity;
                },
                updateBatchJournal(batchData: IMaterialBatchJournal): void {
                    let batchJournal: bo.MaterialBatchJournal = item.materialBatchJournals
                        .find(c => c.batchCode === batchData.batchCode);
                    if (!ibas.objects.isNull(batchJournal)) {
                        batchJournal.quantity = batchData.quantity;
                    }
                },
                deleteBatchJournal(batchData: IMaterialBatchJournal): void {
                    let batchJournal: bo.MaterialBatchJournal = item.materialBatchJournals
                        .find(c => c.batchCode === batchData.batchCode);
                    if (!ibas.objects.isNull(batchJournal)) {
                        item.materialBatchJournals.remove(batchJournal);
                    }
                }
            };
            // 遍历行中的批次信息
            for (let line of item.materialBatchJournals.filterDeleted()) {
                let batchInfo: IMaterialIssueBatchLine = {
                    batchCode: line.batchCode,
                    quantity: line.quantity,
                    itemCode: line.itemCode,
                    warehouse: line.warehouse,
                    direction: ibas.emDirection.OUT
                };
                batchInfos.materialIssueLineBatchs.push(batchInfo);
            }
            let batchContractLine: IMaterialIssueBatchContractLine = {
                index: inventoryTransferLines.indexOf(item),
                itemCode: item.itemCode,
                warehouse: item.warehouse,
                quantity: item.quantity,
                docType: item.objectCode,
                docEntry: item.docEntry,
                lineNum: item.lineId,
                materialIssueBatchs: batchInfos
            };
            contracts.push(batchContractLine);
        }
        return { materialIssueBatchContractLines: contracts };
    }
    /** 获取行-序列信息 */
    getSerialContract(inventoryTransferLines: bo.InventoryTransferLine[]): IMaterialIssueSerialContract {
        let contracts: IMaterialIssueSerialContractLine[] = [];
        for (let item of inventoryTransferLines) {
            // 赋值索引
            let serialInfos: IMaterialIssueSerials = {
                materialIssueLineSerials: [],
                createSerialJournal(serialData: IMaterialSerialJournal): void {
                    let serialJournal: bo.MaterialSerialJournal = item.materialSerialJournals.create();
                    serialJournal.serialCode = serialData.serialCode;
                    serialJournal.itemCode = serialData.itemCode;
                    serialJournal.warehouse = serialData.warehouse;
                    serialJournal.direction = serialData.direction;
                    serialJournal.supplierSerial = serialData.supplierSerial;
                },
                updateSerialJournal(serialData: IMaterialSerialJournal): void {
                    let serialJournal: bo.MaterialSerialJournal = item.materialSerialJournals
                        .find(c => c.serialCode === serialData.serialCode);
                    if (!ibas.objects.isNull(serialJournal)) {
                        // batchJournal.quantity = batchData.quantity;
                    }
                },
                deleteSerialJournal(serialData: IMaterialSerialJournal): void {
                    let serialJournal: bo.MaterialSerialJournal = item.materialSerialJournals
                        .find(c => c.serialCode === serialData.serialCode);
                    if (!ibas.objects.isNull(serialJournal)) {
                        item.materialSerialJournals.remove(serialJournal);
                    }
                }
            };
            // 遍历行中的序列信息
            for (let line of item.materialSerialJournals.filterDeleted()) {
                let serialInfo: IMaterialIssueSerialLine = {
                    serialCode: line.serialCode,
                    direction: ibas.emDirection.OUT,
                    supplierSerial: line.supplierSerial,
                    caller: line
                };
                serialInfos.materialIssueLineSerials.push(serialInfo);
            }
            let serialContractLine: IMaterialIssueSerialContractLine = {
                index: inventoryTransferLines.indexOf(item),
                itemCode: item.itemCode,
                warehouse: item.warehouse,
                quantity: item.quantity,
                materialLineSerials: serialInfos
            };
            contracts.push(serialContractLine);
        }
        return { materialIssueSerialContractLines: contracts };
    }
    /** 获取物料的查询条件 */
    getConditions(): ibas.ICondition[] {
        let conditions: ibas.ICondition[] = new Array<ibas.Condition>();
        conditions.push(new ibas.Condition(bo.Material.PROPERTY_DELETED_NAME, ibas.emConditionOperation.EQUAL, "N"));
        if (!ibas.objects.isNull(this.editData.priceList)) {
            conditions.push(new ibas.Condition(
                bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME
                , ibas.emConditionOperation.EQUAL
                , this.editData.priceList));
        }
        return conditions;
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
