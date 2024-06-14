/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 编辑应用-库存盘点 */
        export class InventoryCountingEditApp extends ibas.BOEditApplication<IInventoryCountingEditView, bo.InventoryCounting> {
            /** 应用标识 */
            static APPLICATION_ID: string = "8dbd058e-735d-4edf-a718-9a27f8bab9a6";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_inventorycounting_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.InventoryCounting.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = InventoryCountingEditApp.APPLICATION_ID;
                this.name = InventoryCountingEditApp.APPLICATION_NAME;
                this.boCode = InventoryCountingEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.closeDataEvent = this.closeData;
                this.view.refreshMaterialInventoryEvent = this.refreshMaterialInventory;
                this.view.addInventoryCountingLineEvent = this.addInventoryCountingLine;
                this.view.removeInventoryCountingLineEvent = this.removeInventoryCountingLine;
                this.view.chooseInventoryCountingLineMaterialEvent = this.chooseInventoryCountingLineMaterial;
                this.view.chooseInventoryCountingLineWarehouseEvent = this.chooseInventoryCountingLineWarehouse;
                this.view.chooseInventoryCountingLineMaterialBatchEvent = this.chooseInventoryCountingLineMaterialBatch;
                this.view.chooseInventoryCountingLineMaterialSerialEvent = this.chooseInventoryCountingLineMaterialSerial;
                this.view.chooseInventoryCountingMaterialInventoryEvent = this.chooseInventoryCountingMaterialInventory;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.InventoryCounting();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showInventoryCounting(this.editData);
                this.view.showInventoryCountingLines(this.editData.inventoryCountingLines.filterDeleted());
            }
            run(): void;
            run(data: bo.InventoryCounting): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.InventoryCounting)) {
                    let data: bo.InventoryCounting = arguments[0];
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
                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        boRepository.fetchInventoryCounting({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.InventoryCounting>): void {
                                let data: bo.InventoryCounting;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.InventoryCounting)) {
                                    // 查询到了有效数据
                                    that.editData = data;
                                    if (that.isViewShowed()) {
                                        that.viewShowed();
                                    } else {
                                        that.show();
                                    }
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
                        return; // 退出
                    }
                }
                super.run.apply(this, arguments);
            }
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.saveInventoryCounting({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.InventoryCounting>): void {
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
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 关闭数据 */
            protected closeData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.closeInventoryCounting({
                    criteria: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<string>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("shell_sucessful"));
                            // 重新加载数据，刷新当前视图
                            that.run(that.editData);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("materials_closing_inventorycounting"));
            }
            /** 删除数据 */
            protected deleteData(): void {
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_delete_continue"),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action === ibas.emMessageAction.YES) {
                            that.editData.delete();
                            that.saveData();
                        }
                    }
                });
            }
            /** 新建数据，参数1：是否克隆 or 导入文件 */
            protected createData(clone: boolean | Blob): void {
                let that: this = this;
                let createData: Function = function (): void {
                    if (clone instanceof Blob) {
                        let formData: FormData = new FormData();
                        formData.append("file", clone);
                        let boRepository: importexport.bo.BORepositoryImportExport = new importexport.bo.BORepositoryImportExport();
                        boRepository.parse<bo.InventoryCounting>({
                            converter: new bo.DataConverter(),
                            fileData: formData,
                            onCompleted: (opRslt) => {
                                try {
                                    if (opRslt.resultCode !== 0) {
                                        throw new Error(opRslt.message);
                                    }
                                    if (opRslt.resultObjects.length === 0) {
                                        throw new Error(ibas.i18n.prop("sys_unrecognized_data"));
                                    }
                                    that.editData = opRslt.resultObjects.firstOrDefault();
                                    that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_read_new"));
                                    that.viewShowed();
                                } catch (error) {
                                    that.messages(error);
                                }
                            }
                        });
                    } else if (typeof clone === "boolean" && clone === true) {
                        // 克隆对象
                        that.editData = that.editData.clone();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_cloned_new"));
                        that.viewShowed();
                    } else {
                        // 新建对象
                        that.editData = new bo.InventoryCounting();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                        that.viewShowed();
                    }
                };
                if (that.editData.isDirty) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        title: ibas.i18n.prop(this.name),
                        message: ibas.i18n.prop("shell_data_not_saved_continue"),
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
            protected refreshMaterialInventory(): void {
                this.busy(true);
                let criteria: ibas.ICriteria = new ibas.Criteria();
                for (let item of this.editData.inventoryCountingLines) {
                    if (ibas.strings.isEmpty(item.itemCode)) {
                        continue;
                    }
                    if (ibas.strings.isEmpty(item.warehouse)) {
                        continue;
                    }
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.MaterialInventory.PROPERTY_ITEMCODE_NAME;
                    condition.value = item.itemCode;
                    condition.bracketOpen = 1;
                    if (criteria.conditions.length > 1) {
                        condition.relationship = ibas.emConditionRelationship.OR;
                    }
                    condition = criteria.conditions.create();
                    condition.alias = bo.MaterialInventory.PROPERTY_WAREHOUSE_NAME;
                    condition.value = item.warehouse;
                    condition.bracketClose = 1;
                }
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialInventory({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialInventory>): void {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            for (let item of opRslt.resultObjects) {
                                for (let line of that.editData.inventoryCountingLines) {
                                    if (item.itemCode !== line.itemCode) {
                                        continue;
                                    }
                                    if (item.warehouse !== line.warehouse) {
                                        continue;
                                    }
                                    line.stockQuantity = item.onHand;
                                    line.price = item.avgPrice;
                                    break;
                                }
                            }
                            that.view.showInventoryCountingLines(that.editData.inventoryCountingLines.filterDeleted());
                        } catch (error) {
                            that.messages(error);
                        }
                        that.busy(false);
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 添加库存盘点-行事件 */
            protected addInventoryCountingLine(): void {
                this.chooseInventoryCountingLineMaterial(undefined);
            }
            /** 删除库存盘点-行事件 */
            protected removeInventoryCountingLine(items: bo.InventoryCountingLine[]): void {
                // 非数组，转为数组
                if (!(items instanceof Array)) {
                    items = [items];
                }
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (this.editData.inventoryCountingLines.indexOf(item) >= 0) {
                        if (item.isNew) {
                            // 新建的移除集合
                            this.editData.inventoryCountingLines.remove(item);
                        } else {
                            // 非新建标记删除
                            item.delete();
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showInventoryCountingLines(this.editData.inventoryCountingLines.filterDeleted());
            }
            /** 选择库存盘点行物料事件 */
            private chooseInventoryCountingLineMaterial(caller: bo.InventoryCountingLine): void {
                if (ibas.strings.isEmpty(this.view.defaultWarehouse)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_please_choose_warehouse"));
                    return;
                }
                let that: this = this;
                let condition: ibas.ICondition;
                let conditions: ibas.IList<ibas.ICondition> = materials.app.conditions.product.create();
                // 添加仓库条件
                if (!ibas.objects.isNull(caller) && !ibas.strings.isEmpty(caller.warehouse)) {
                    condition = new ibas.Condition();
                    condition.alias = materials.app.conditions.product.CONDITION_ALIAS_WAREHOUSE;
                    condition.value = caller.warehouse;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.relationship = ibas.emConditionRelationship.AND;
                    conditions.add(condition);
                } else if (!ibas.strings.isEmpty(this.view.defaultWarehouse)) {
                    condition = new ibas.Condition();
                    condition.alias = materials.app.conditions.product.CONDITION_ALIAS_WAREHOUSE;
                    condition.value = this.view.defaultWarehouse;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.relationship = ibas.emConditionRelationship.AND;
                    conditions.add(condition);
                }
                // 库存物料
                condition = new ibas.Condition();
                condition.alias = materials.app.conditions.product.CONDITION_ALIAS_INVENTORY_ITEM;
                condition.value = ibas.emYesNo.YES.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.relationship = ibas.emConditionRelationship.AND;
                conditions.add(condition);
                // 物料类型
                condition = new ibas.Condition();
                condition.alias = materials.app.conditions.product.CONDITION_ALIAS_ITEM_TYPE;
                condition.value = bo.emItemType.ITEM.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.relationship = ibas.emConditionRelationship.AND;
                conditions.add(condition);
                // 非虚拟物料
                condition = new ibas.Condition();
                condition.alias = materials.app.conditions.product.CONDITION_ALIAS_PHANTOM_ITEM;
                condition.value = ibas.emYesNo.YES.toString();
                condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                condition.relationship = ibas.emConditionRelationship.AND;
                conditions.add(condition);
                // 调用选择服务
                ibas.servicesManager.runChooseService<bo.IProduct>({
                    boCode: materials.bo.BO_CODE_PRODUCT,
                    criteria: conditions,
                    onCompleted(selecteds: ibas.IList<bo.IProduct>): void {
                        // 获取触发的对象
                        let index: number = that.editData.inventoryCountingLines.indexOf(caller);
                        let item: bo.InventoryCountingLine = that.editData.inventoryCountingLines[index];
                        // 选择返回数量多余触发数量时,自动创建新的项目
                        for (let selected of selecteds) {
                            if (ibas.objects.isNull(item)) {
                                item = that.editData.inventoryCountingLines.create();
                            }
                            item.isLoading = true;
                            item.itemCode = selected.code;
                            item.itemDescription = selected.name;
                            item.itemSign = selected.sign;
                            item.serialManagement = selected.serialManagement;
                            item.batchManagement = selected.batchManagement;
                            item.warehouse = selected.warehouse;
                            item.uom = selected.inventoryUOM;
                            item.stockQuantity = selected.onHand;
                            item.price = selected.price;
                            if (!ibas.strings.isEmpty(that.view.defaultWarehouse)) {
                                item.warehouse = that.view.defaultWarehouse;
                            }
                            item.isLoading = false;
                            item = null;
                        }
                        // 始终刷新
                        that.view.showInventoryCountingLines(that.editData.inventoryCountingLines.filterDeleted());
                    }
                });
            }
            /** 选择库存盘点行物料事件 */
            private chooseInventoryCountingLineWarehouse(caller: bo.InventoryCountingLine): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.Warehouse>({
                    boCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: conditions.warehouse.create(this.editData.branch),
                    onCompleted(selecteds: ibas.IList<bo.Warehouse>): void {
                        // 获取触发的对象
                        let index: number = that.editData.inventoryCountingLines.indexOf(caller);
                        let item: bo.InventoryCountingLine = that.editData.inventoryCountingLines[index];
                        // 选择返回数量多余触发数量时,自动创建新的项目
                        let created: boolean = false;
                        for (let selected of selecteds) {
                            if (ibas.objects.isNull(item)) {
                                item = that.editData.inventoryCountingLines.create();
                                created = true;
                            }
                            item.warehouse = selected.code;
                            that.view.defaultWarehouse = item.warehouse;
                            item = null;
                        }
                        if (created) {
                            // 创建了新的行项目
                            that.view.showInventoryCountingLines(that.editData.inventoryCountingLines.filterDeleted());
                        }
                    }
                });
            }
            private chooseInventoryCountingLineMaterialBatch(): void {
                let contracts: ibas.ArrayList<IMaterialBatchContract> = new ibas.ArrayList<IMaterialBatchContract>();
                for (let item of this.editData.inventoryCountingLines) {
                    if (item.difference === 0) {
                        continue;
                    }
                    contracts.add({
                        batchManagement: item.batchManagement,
                        itemCode: item.itemCode,
                        itemDescription: item.itemDescription,
                        warehouse: item.warehouse,
                        quantity: Math.abs(item.difference),
                        uom: item.uom,
                        materialBatches: item.materialBatches
                    });
                }
                ibas.servicesManager.runApplicationService<IMaterialBatchContract[]>({
                    proxy: new MaterialBatchListServiceProxy(contracts)
                });
            }
            private chooseInventoryCountingLineMaterialSerial(): void {
                let contracts: ibas.ArrayList<IMaterialSerialContract> = new ibas.ArrayList<IMaterialSerialContract>();
                for (let item of this.editData.inventoryCountingLines) {
                    if (item.difference === 0) {
                        continue;
                    }
                    contracts.add({
                        serialManagement: item.serialManagement,
                        itemCode: item.itemCode,
                        itemDescription: item.itemDescription,
                        warehouse: item.warehouse,
                        quantity: Math.abs(item.difference),
                        uom: item.uom,
                        materialSerials: item.materialSerials
                    });
                }
                ibas.servicesManager.runApplicationService<IMaterialSerialContract[]>({
                    proxy: new MaterialSerialListServiceProxy(contracts)
                });
            }
            /** 选择库存盘点物料库存事件 */
            private chooseInventoryCountingMaterialInventory(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.MaterialInventory>({
                    boCode: bo.MaterialInventory.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.MULTIPLE,
                    criteria: [],
                    onCompleted(selecteds: ibas.IList<bo.MaterialInventory>): void {
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        for (let selected of selecteds) {
                            let item: bo.InventoryCountingLine = that.editData.inventoryCountingLines.create();
                            item.itemCode = selected.itemCode;
                            item.warehouse = selected.warehouse;
                            item.stockQuantity = selected.onHand;
                            that.view.defaultWarehouse = item.warehouse;
                            if (criteria.conditions.firstOrDefault(c => c.value === item.itemCode) === null) {
                                // 查询物料
                                let condition: ibas.ICondition = criteria.conditions.create();
                                condition.alias = bo.Material.PROPERTY_CODE_NAME;
                                condition.value = item.itemCode;
                            }
                        }
                        if (criteria.conditions.length > 0) {
                            that.busy(true);
                            let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                            boRepository.fetchMaterial({
                                criteria: criteria,
                                onCompleted: (opRslt) => {
                                    that.busy(false);
                                    for (let item of that.editData.inventoryCountingLines) {
                                        let material: bo.Material = opRslt.resultObjects.firstOrDefault(c => c.code === item.itemCode);
                                        if (ibas.objects.isNull(material)) {
                                            continue;
                                        }
                                        item.itemDescription = material.name;
                                        item.itemSign = material.sign;
                                        item.batchManagement = material.batchManagement;
                                        item.serialManagement = material.serialManagement;
                                        item.uom = material.inventoryUOM;
                                    }
                                    that.view.showInventoryCountingLines(that.editData.inventoryCountingLines.filterDeleted());
                                }
                            });
                        } else {
                            that.view.showInventoryCountingLines(that.editData.inventoryCountingLines.filterDeleted());
                        }
                    }
                });
            }
        }
        /** 视图-库存盘点 */
        export interface IInventoryCountingEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showInventoryCounting(data: bo.InventoryCounting): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 关闭数据事件 */
            closeDataEvent: Function;
            /** 添加库存盘点-行事件 */
            addInventoryCountingLineEvent: Function;
            /** 删除库存盘点-行事件 */
            removeInventoryCountingLineEvent: Function;
            /** 选择库存盘点行物料事件 */
            chooseInventoryCountingLineMaterialEvent: Function;
            /** 选择库存盘点行仓库事件 */
            chooseInventoryCountingLineWarehouseEvent: Function;
            /** 选择库存盘点行物料批次事件 */
            chooseInventoryCountingLineMaterialBatchEvent: Function;
            /** 选择库存盘点行物料序列事件 */
            chooseInventoryCountingLineMaterialSerialEvent: Function;
            /** 选择库存盘点库存记录事件 */
            chooseInventoryCountingMaterialInventoryEvent: Function;
            /** 显示数据 */
            showInventoryCountingLines(datas: bo.InventoryCountingLine[]): void;
            /** 默认仓库 */
            defaultWarehouse: string;
            /** 刷新库存 */
            refreshMaterialInventoryEvent: Function;
        }
    }
}
