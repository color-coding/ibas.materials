/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 编辑应用-库存转储申请 */
        export class InventoryTransferRequestEditApp extends ibas.BOEditService<IInventoryTransferRequestEditView, bo.InventoryTransferRequest> {
            /** 应用标识 */
            static APPLICATION_ID: string = "7835ff12-1392-47f5-a11a-14d385038742";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_inventorytransferrequest_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.InventoryTransferRequest.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = InventoryTransferRequestEditApp.APPLICATION_ID;
                this.name = InventoryTransferRequestEditApp.APPLICATION_NAME;
                this.boCode = InventoryTransferRequestEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.addInventoryTransferRequestLineEvent = this.addInventoryTransferRequestLine;
                this.view.removeInventoryTransferRequestLineEvent = this.removeInventoryTransferRequestLine;
                this.view.chooseInventoryTransferRequestLineMaterialEvent = this.chooseInventoryTransferRequestLineMaterial;
                this.view.chooseInventoryTransferRequestLineWarehouseEvent = this.chooseInventoryTransferRequestLineWarehouse;
                this.view.chooseInventoryTransferRequestLineMaterialBatchEvent = this.chooseInventoryTransferRequestLineMaterialBatch;
                this.view.chooseInventoryTransferRequestLineMaterialSerialEvent = this.chooseInventoryTransferRequestLineMaterialSerial;
                this.view.chooseeInventoryTransferRequestMaterialPriceListEvent = this.chooseeInventoryTransferRequestMaterialPriceList;
                this.view.chooseInventoryTransferRequestLineDistributionRuleEvent = this.chooseInventoryTransferRequestLineDistributionRule;
                this.view.chooseInventoryTransferRequestLineMaterialVersionEvent = this.chooseInventoryTransferRequestLineMaterialVersion;
                this.view.turnToInventoryTransferEvent = this.turnToInventoryTransfer;
                this.view.reserveMaterialsInventoryEvent = this.reserveMaterialsInventory;
                this.view.measuringMaterialsEvent = this.measuringMaterials;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.InventoryTransferRequest();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showInventoryTransferRequest(this.editData);
                this.view.showInventoryTransferRequestLines(this.editData.inventoryTransferRequestLines.filterDeleted());
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.InventoryTransferRequest): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.InventoryTransferRequest)) {
                    let data: bo.InventoryTransferRequest = arguments[0];
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
                        boRepository.fetchInventoryTransferRequest({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.InventoryTransferRequest>): void {
                                let data: bo.InventoryTransferRequest;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.InventoryTransferRequest)) {
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
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.saveInventoryTransferRequest({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.InventoryTransferRequest>): void {
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
                            if (that.editData.referenced === ibas.emYesNo.YES) {
                                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_referenced", that.editData.toString()));
                            } else {
                                that.editData.delete();
                                that.saveData();
                            }
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
                        boRepository.parse<bo.InventoryTransferRequest>({
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
                        that.editData = new bo.InventoryTransferRequest();
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
            /** 添加库存转储申请-行事件 */
            private addInventoryTransferRequestLine(items: bo.InventoryTransferRequestLine[] | number): void {
                if (items instanceof Array && items.length > 0) {
                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                    builder.append(ibas.i18n.prop("shell_data_new_line"));
                    builder.append(" [");
                    for (let item of items) {
                        let newItem: bo.InventoryTransferRequestLine = item.clone();
                        newItem.lineId = undefined;
                        newItem.visOrder = undefined;
                        // 序列号清除
                        newItem.materialSerials.clear();
                        this.editData.inventoryTransferRequestLines.add(newItem);
                        if (builder.length > 2) {
                            builder.append(", ");
                        }
                        builder.append(newItem.lineId);
                    }
                    builder.append("] ");
                    if (builder.length > 3) {
                        this.proceeding(ibas.emMessageType.WARNING, builder.toString());
                        this.view.showInventoryTransferRequestLines(this.editData.inventoryTransferRequestLines.filterDeleted());
                    }
                } else if (typeof items === "number" && items > 0) {
                    for (let i: number = 0; i < items; i++) {
                        this.editData.inventoryTransferRequestLines.create();
                    }
                    this.view.showInventoryTransferRequestLines(this.editData.inventoryTransferRequestLines.filterDeleted());
                } else {
                    this.chooseInventoryTransferRequestLineMaterial(undefined);
                }
            }
            /** 删除库存转储申请-行事件 */
            private removeInventoryTransferRequestLine(items: bo.InventoryTransferRequestLine[]): void {
                // 非数组，转为数组
                if (!(items instanceof Array)) {
                    items = [items];
                }
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (this.editData.inventoryTransferRequestLines.indexOf(item) >= 0) {
                        if (item.isNew) {
                            // 新建的移除集合
                            this.editData.inventoryTransferRequestLines.remove(item);
                        } else {
                            // 非新建标记删除
                            if (item.referenced === ibas.emYesNo.YES) {
                                this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_referenced", item.toString()));
                            } else {
                                item.delete();
                            }
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showInventoryTransferRequestLines(this.editData.inventoryTransferRequestLines.filterDeleted());
            }
            /** 选择库存转储申请订单行物料事件 */
            private chooseInventoryTransferRequestLineMaterial(caller: bo.InventoryTransferRequestLine, type?: string, filterConditions?: ibas.ICondition[]): void {
                let that: this = this;
                let condition: ibas.ICondition;
                let conditions: ibas.IList<ibas.ICondition> = app.conditions.material.create(this.editData.documentDate);
                // 添加输入条件
                if (filterConditions instanceof Array && filterConditions.length > 0) {
                    if (conditions.length > 1) {
                        conditions.firstOrDefault().bracketOpen++;
                        conditions.lastOrDefault().bracketClose++;
                    }
                    conditions.add(filterConditions);
                }
                if (config.get<boolean>(config.CONFIG_ITEM_ENABLE_NON_INVENTORY_ITEM_TRANSACTIONS, false) !== true) {
                    // 库存物料
                    condition = new ibas.Condition();
                    condition.alias = app.conditions.material.CONDITION_ALIAS_INVENTORY_ITEM;
                    condition.value = ibas.emYesNo.YES.toString();
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.relationship = ibas.emConditionRelationship.AND;
                    conditions.add(condition);
                }
                // 物料类型
                condition = new ibas.Condition();
                condition.alias = app.conditions.material.CONDITION_ALIAS_ITEM_TYPE;
                condition.value = bo.emItemType.ITEM.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.relationship = ibas.emConditionRelationship.AND;
                conditions.add(condition);
                // 非虚拟的
                condition = new ibas.Condition();
                condition.alias = app.conditions.material.CONDITION_ALIAS_PHANTOM_ITEM;
                condition.value = ibas.emYesNo.NO.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.relationship = ibas.emConditionRelationship.AND;
                conditions.add(condition);
                // 产品库存时
                if (bo.BO_CODE_PRODUCT_INVENTORY === type) {
                    // 有库存的
                    condition = new ibas.Condition();
                    condition.alias = bo.Product.PROPERTY_ONHAND_NAME;
                    condition.value = "0";
                    condition.operation = ibas.emConditionOperation.GRATER_THAN;
                    conditions.add(condition);
                }
                // 调用选择服务
                ibas.servicesManager.runChooseService<bo.Material | bo.Product>({
                    boCode: type ? bo.BO_CODE_PRODUCT_INVENTORY : bo.BO_CODE_MATERIAL,
                    criteria: conditions,
                    onCompleted(selecteds: ibas.IList<bo.Material | bo.Product>): void {
                        // 获取触发的对象
                        let index: number = that.editData.inventoryTransferRequestLines.indexOf(caller);
                        let item: bo.InventoryTransferRequestLine = that.editData.inventoryTransferRequestLines[index];
                        // 选择返回数量多余触发数量时,自动创建新的项目
                        let created: boolean = false;
                        for (let selected of selecteds) {
                            if (ibas.objects.isNull(item)) {
                                item = that.editData.inventoryTransferRequestLines.create();
                                created = true;
                            }
                            item.baseMaterial(selected);
                            if (!ibas.strings.isEmpty(that.view.fromWarehouse)) {
                                item.fromWarehouse = that.view.fromWarehouse;
                            }
                            if (!ibas.strings.isEmpty(that.view.toWarehouse)) {
                                item.warehouse = that.view.toWarehouse;
                            }
                            item = null;
                        }
                        if (created) {
                            // 创建了新的行项目
                            that.view.showInventoryTransferRequestLines(that.editData.inventoryTransferRequestLines.filterDeleted());
                        }
                    }
                });
            }
            /** 选择库存转储申请订单物料价格清单事件 */
            private chooseeInventoryTransferRequestMaterialPriceList(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.MaterialPriceList>({
                    boCode: bo.MaterialPriceList.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: conditions.materialpricelist.create(),
                    onCompleted(selecteds: ibas.IList<bo.MaterialPriceList>): void {
                        let selected: bo.MaterialPriceList = selecteds.firstOrDefault();
                        that.editData.priceList = selected.objectKey;
                        that.editData.documentCurrency = selected.currency;
                    }
                });
            }
            /** 选择库存转储申请订单行物料事件 */
            private chooseInventoryTransferRequestLineWarehouse(caller: bo.InventoryTransferRequestLine, direction: ibas.emDirection, filterConditions?: ibas.ICondition[]): void {
                let conditions: ibas.IList<ibas.ICondition> = materials.app.conditions.warehouse.create(this.editData.branch);
                // 添加输入条件
                if (filterConditions instanceof Array && filterConditions.length > 0) {
                    if (conditions.length > 1) {
                        conditions.firstOrDefault().bracketOpen++;
                        conditions.lastOrDefault().bracketClose++;
                    }
                    conditions.add(filterConditions);
                }
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.Warehouse>({
                    boCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: conditions,
                    onCompleted(selecteds: ibas.IList<bo.Warehouse>): void {
                        // 获取触发的对象
                        let index: number = that.editData.inventoryTransferRequestLines.indexOf(caller);
                        let item: bo.InventoryTransferRequestLine = that.editData.inventoryTransferRequestLines[index];
                        // 选择返回数量多余触发数量时,自动创建新的项目
                        let created: boolean = false;
                        for (let selected of selecteds) {
                            if (ibas.objects.isNull(item)) {
                                item = that.editData.inventoryTransferRequestLines.create();
                                created = true;
                            }
                            if (direction === ibas.emDirection.IN) {
                                item.warehouse = selected.code;
                                that.view.toWarehouse = item.warehouse;
                            } else {
                                item.fromWarehouse = selected.code;
                                that.view.fromWarehouse = item.fromWarehouse;
                            }
                            item = null;
                        }
                        if (created) {
                            // 创建了新的行项目
                            that.view.showInventoryTransferRequestLines(that.editData.inventoryTransferRequestLines.filterDeleted());
                        }
                    }
                });
            }

            private chooseInventoryTransferRequestLineMaterialBatch(): void {
                let contracts: ibas.ArrayList<IMaterialBatchContract> = new ibas.ArrayList<IMaterialBatchContract>();
                for (let item of this.editData.inventoryTransferRequestLines) {
                    contracts.add({
                        batchManagement: item.batchManagement,
                        itemCode: item.itemCode,
                        itemDescription: item.itemDescription,
                        itemVersion: item.itemVersion,
                        warehouse: item.fromWarehouse,
                        quantity: item.quantity,
                        uom: item.uom,
                        materialBatches: item.materialBatches
                    });
                }
                ibas.servicesManager.runApplicationService<IMaterialBatchContract[]>({
                    proxy: new MaterialBatchIssueServiceProxy(contracts)
                });
            }
            private chooseInventoryTransferRequestLineMaterialSerial(): void {
                let contracts: ibas.ArrayList<IMaterialSerialContract> = new ibas.ArrayList<IMaterialSerialContract>();
                for (let item of this.editData.inventoryTransferRequestLines) {
                    contracts.add({
                        serialManagement: item.serialManagement,
                        itemCode: item.itemCode,
                        itemDescription: item.itemDescription,
                        itemVersion: item.itemVersion,
                        warehouse: item.fromWarehouse,
                        quantity: item.quantity,
                        uom: item.uom,
                        materialSerials: item.materialSerials
                    });
                }
                ibas.servicesManager.runApplicationService<IMaterialSerialContract[]>({
                    proxy: new MaterialSerialIssueServiceProxy(contracts)
                });
            }
            private chooseInventoryTransferRequestLineDistributionRule(type: accounting.app.emDimensionType, caller: bo.InventoryTransferRequestLine): void {
                if (ibas.objects.isNull(type)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("accounting_dimension_invaild", ""));
                    return;
                }
                ibas.servicesManager.runApplicationService<accounting.app.IDimensionDataServiceContract, String>({
                    proxy: new accounting.app.DimensionDataServiceProxy({
                        type: type,
                    }),
                    onCompleted(result: string): void {
                        if (type === accounting.app.emDimensionType.DIMENSION_1) {
                            caller.distributionRule1 = result;
                        } else if (type === accounting.app.emDimensionType.DIMENSION_2) {
                            caller.distributionRule2 = result;
                        } else if (type === accounting.app.emDimensionType.DIMENSION_3) {
                            caller.distributionRule3 = result;
                        } else if (type === accounting.app.emDimensionType.DIMENSION_4) {
                            caller.distributionRule4 = result;
                        } else if (type === accounting.app.emDimensionType.DIMENSION_5) {
                            caller.distributionRule5 = result;
                        }
                    }
                });
            }
            private turnToInventoryTransfer(): void {
                if (ibas.objects.isNull(this.editData) || this.editData.isDirty === true) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_saved_first"));
                    return;
                }
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchInventoryTransferRequest({
                    criteria: this.editData.criteria(),
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                throw new Error(ibas.i18n.prop("shell_data_deleted"));
                            }
                            this.editData = opRslt.resultObjects.firstOrDefault();
                            this.view.showInventoryTransferRequest(this.editData);
                            this.view.showInventoryTransferRequestLines(this.editData.inventoryTransferRequestLines.filterDeleted());
                            if ((this.editData.approvalStatus !== ibas.emApprovalStatus.APPROVED && this.editData.approvalStatus !== ibas.emApprovalStatus.UNAFFECTED)
                                || this.editData.canceled === ibas.emYesNo.YES
                                || this.editData.documentStatus === ibas.emDocumentStatus.PLANNED
                                || this.editData.documentStatus === ibas.emDocumentStatus.FINISHED
                                || this.editData.documentStatus === ibas.emDocumentStatus.CLOSED
                            ) {
                                throw new Error(ibas.i18n.prop("materials_invaild_status_not_support_turn_to_operation"));
                            }
                            let target: bo.InventoryTransfer = new bo.InventoryTransfer();
                            target.baseDocument(this.editData);
                            // 使用预留库存
                            materials.app.useReservedMaterialsInventory({
                                targetType: this.editData.objectCode,
                                targetEntries: this.editData.docEntry,
                                onCompleted: (results) => {
                                    if (results instanceof Error) {
                                        // 错误
                                        this.messages(results);
                                    } else if (results.length > 0) {
                                        // 出库数预置为0，包括基于来的批次数量
                                        let qtyMap: Map<any, number> = new Map<any, number>();
                                        for (let item of target.inventoryTransferLines) {
                                            if (this.editData.objectCode === item.baseDocumentType
                                                && this.editData.docEntry === item.baseDocumentEntry) {
                                                // 不激活逻辑计算
                                                qtyMap.set(item, item.quantity);
                                                item.isLoading = true;
                                                item.quantity = 0;
                                                item.materialBatches.forEach(d => d.quantity = 0);
                                            }
                                        }
                                        // 使用预留库存
                                        for (let result of results) {
                                            if (result.status === ibas.emBOStatus.CLOSED) {
                                                continue;
                                            }
                                            if (result.closedQuantity >= result.quantity) {
                                                continue;
                                            }
                                            let wItems: bo.InventoryTransferLine[] = target.inventoryTransferLines.where(c =>
                                                result.targetDocumentType === c.baseDocumentType
                                                && result.targetDocumentEntry === c.baseDocumentEntry
                                                && result.targetDocumentLineId === c.baseDocumentLineId
                                                && result.itemCode === c.itemCode
                                            );
                                            if (wItems.length === 0) {
                                                continue;
                                            }
                                            let wItem: bo.InventoryTransferLine = wItems.find(c => c.fromWarehouse === result.warehouse);
                                            if (ibas.objects.isNull(wItem)) {
                                                // 没有同仓库的，则新建行
                                                if (wItems[0].quantity === 0) {
                                                    wItem = wItems[0];
                                                } else {
                                                    wItem = wItems[0].clone();
                                                    target.inventoryTransferLines.add(wItem);
                                                }
                                                wItem.fromWarehouse = result.warehouse;
                                            }
                                            // 应用库存
                                            wItem.quantity = ibas.numbers.round(wItem.quantity + result.quantity - result.closedQuantity);
                                            // 处理明细项
                                            if (!ibas.strings.isEmpty(result.batchCode)) {
                                                // 批次管理
                                                let bItem: materials.bo.IMaterialBatchItem = wItem.materialBatches.find(c => c.batchCode === result.batchCode);
                                                if (ibas.objects.isNull(bItem)) {
                                                    // 没有同批次的，则新建行
                                                    bItem = wItem.materialBatches.create();
                                                    bItem.batchCode = result.batchCode;
                                                    bItem.quantity = 0;
                                                }
                                                bItem.quantity = ibas.numbers.round(bItem.quantity + result.quantity - result.closedQuantity);
                                            } else if (!ibas.strings.isEmpty(result.serialCode)) {
                                                // 序列管理
                                                let sItem: materials.bo.IMaterialSerialItem = wItem.materialSerials.find(c => c.serialCode === result.serialCode);
                                                if (ibas.objects.isNull(sItem)) {
                                                    sItem = wItem.materialSerials.create();
                                                    sItem.serialCode = result.serialCode;
                                                }
                                            }
                                        }
                                        // 数量被修改的行激活逻辑计算
                                        for (let item of target.inventoryTransferLines) {
                                            if (item.isLoading !== true) {
                                                continue;
                                            }
                                            item.isLoading = false;
                                            if (qtyMap.get(item) !== item.quantity) {
                                                (<any>item).firePropertyChanged(bo.InventoryTransferLine.PROPERTY_QUANTITY_NAME);
                                            }
                                        }
                                        this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sales_used_reserved_materials_inventory"));
                                    }
                                    let app: InventoryTransferEditApp = new InventoryTransferEditApp();
                                    app.navigation = this.navigation;
                                    app.viewShower = this.viewShower;
                                    app.run(target);
                                }
                            });
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
            }
            private chooseInventoryTransferRequestLineMaterialVersion(caller: bo.InventoryTransferRequestLine): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = materials.bo.MaterialVersion.PROPERTY_ITEMCODE_NAME;
                condition.value = caller.itemCode;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition = criteria.conditions.create();
                condition.alias = materials.bo.MaterialVersion.PROPERTY_ACTIVATED_NAME;
                condition.value = ibas.emYesNo.YES.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                // 调用选择服务
                ibas.servicesManager.runChooseService<materials.bo.MaterialVersion>({
                    criteria: criteria,
                    chooseType: ibas.emChooseType.SINGLE,
                    boCode: materials.bo.MaterialVersion.BUSINESS_OBJECT_CODE,
                    onCompleted: (selecteds) => {
                        for (let selected of selecteds) {
                            caller.itemVersion = selected.name;
                        }
                    }
                });
            }
            /** 预留物料库存 */
            private reserveMaterialsInventory(): void {
                if (ibas.objects.isNull(this.editData) || this.editData.isDirty) {
                    throw new Error(ibas.i18n.prop("shell_data_saved_first"));
                }
                let contract: materials.app.IMaterialInventoryReservationTarget = {
                    targetType: this.editData.objectCode,
                    targetEntry: this.editData.docEntry,
                    items: []
                };
                for (let item of this.editData.inventoryTransferRequestLines) {
                    contract.items.push({
                        targetLineId: item.lineId,
                        itemCode: item.itemCode,
                        itemDescription: item.itemDescription,
                        itemVersion: item.itemVersion,
                        warehouse: item.fromWarehouse,
                        quantity: ibas.numbers.valueOf(item.quantity) - ibas.numbers.valueOf(item.closedQuantity),
                        uom: item.uom,
                    });
                }
                ibas.servicesManager.runApplicationService<materials.app.IMaterialInventoryReservationTarget | materials.app.IMaterialInventoryReservationTarget[]>({
                    proxy: new materials.app.MaterialInventoryReservationServiceProxy(contract)
                });
            }
            protected measuringMaterials(): void {
                let lines: ibas.ArrayList<IMaterialMeasurementContractLine> = new ibas.ArrayList<IMaterialMeasurementContractLine>();
                for (let item of this.editData.inventoryTransferRequestLines) {
                    lines.add({
                        lineId: item.lineId,
                        itemCode: item.itemCode,
                        itemDescription: item.itemDescription,
                        quantity: item.quantity,
                        uom: item.uom,
                    });
                }
                ibas.servicesManager.runApplicationService<IMaterialMeasurementContract>({
                    proxy: new MaterialMeasurementServiceProxy({
                        mode: "INVENTORY",
                        documentType: this.editData.objectCode,
                        documentEntry: this.editData.docEntry,
                        lines: lines,
                    })
                });
            }
        }
        /** 视图-库存转储申请 */
        export interface IInventoryTransferRequestEditView extends ibas.IBOEditView {
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择库存转储申请单物料价格清单 */
            chooseeInventoryTransferRequestMaterialPriceListEvent: Function;
            /** 添加库存转储申请-行事件 */
            addInventoryTransferRequestLineEvent: Function;
            /** 删除库存转储申请-行事件 */
            removeInventoryTransferRequestLineEvent: Function;
            /** 显示数据 */
            showInventoryTransferRequest(data: bo.InventoryTransferRequest): void;
            /** 显示数据 */
            showInventoryTransferRequestLines(datas: bo.InventoryTransferRequestLine[]): void;
            /** 选择库存转储申请单行物料事件 */
            chooseInventoryTransferRequestLineMaterialEvent: Function;
            /** 选择库存转储申请单行仓库事件 */
            chooseInventoryTransferRequestLineWarehouseEvent: Function;
            /** 选择库存转储申请单行物料批次事件 */
            chooseInventoryTransferRequestLineMaterialBatchEvent: Function;
            /** 选择库存转储申请单行物料序列事件 */
            chooseInventoryTransferRequestLineMaterialSerialEvent: Function;
            /** 选择库存转储申请单行成本中心事件 */
            chooseInventoryTransferRequestLineDistributionRuleEvent: Function;
            /** 选择库存转储申请-行 物料版本 */
            chooseInventoryTransferRequestLineMaterialVersionEvent: Function;
            /** 转为库存转储申请事件 */
            turnToInventoryTransferEvent: Function;
            /** 预留物料库存 */
            reserveMaterialsInventoryEvent: Function;
            /** 测量物料 */
            measuringMaterialsEvent: Function;
            /** 从仓库 */
            fromWarehouse: string;
            /** 目标仓库 */
            toWarehouse: string;
        }
        /** 库存转储申请编辑服务映射 */
        export class InventoryTransferRequestEditServiceMapping extends ibas.BOEditServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = InventoryTransferRequestEditApp.APPLICATION_ID;
                this.name = InventoryTransferRequestEditApp.APPLICATION_NAME;
                this.boCode = InventoryTransferRequestEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOEditServiceCaller<bo.InventoryTransferRequest>> {
                return new InventoryTransferRequestEditApp();
            }
        }
    }
}