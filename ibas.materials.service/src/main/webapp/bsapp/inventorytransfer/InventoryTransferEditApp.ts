/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 编辑应用-库存转储 */
        export class InventoryTransferEditApp extends ibas.BOEditService<IInventoryTransferEditView, bo.InventoryTransfer> {
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
                this.view.chooseInventoryTransferLineMaterialEvent = this.chooseInventoryTransferLineMaterial;
                this.view.chooseInventoryTransferLineWarehouseEvent = this.chooseInventoryTransferLineWarehouse;
                this.view.chooseInventoryTransferLineMaterialBatchEvent = this.chooseInventoryTransferLineMaterialBatch;
                this.view.chooseInventoryTransferLineMaterialSerialEvent = this.chooseInventoryTransferLineMaterialSerial;
                this.view.chooseeInventoryTransferMaterialPriceListEvent = this.chooseeInventoryTransferMaterialPriceList;
                this.view.chooseInventoryTransferLineDistributionRuleEvent = this.chooseInventoryTransferLineDistributionRule;
                this.view.chooseInventoryTransferLineTransferRequestEvent = this.chooseInventoryTransferLineTransferRequest;
                this.view.chooseInventoryTransferLineMaterialVersionEvent = this.chooseInventoryTransferLineMaterialVersion;
                this.view.callInventoryTransferAddServiceEvent = this.callInventoryTransferAddService;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.InventoryTransfer();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showInventoryTransfer(this.editData);
                this.view.showInventoryTransferLines(this.editData.inventoryTransferLines.filterDeleted());
                this.view.showServiceAgent(ibas.servicesManager.getServices({
                    proxy: new MaterialInventoryTransAddServiceProxy({
                        onAdded: (targets) => {
                        }
                    }),
                }));
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
                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
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
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
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
                        boRepository.parse<bo.InventoryTransfer>({
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
                        that.editData = new bo.InventoryTransfer();
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
            /** 添加库存转储-行事件 */
            private addInventoryTransferLine(items: bo.InventoryTransferLine[]): void {
                if (items instanceof Array && items.length > 0) {
                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                    builder.append(ibas.i18n.prop("shell_data_new_line"));
                    builder.append(" [");
                    for (let item of items) {
                        let newItem: bo.InventoryTransferLine = item.clone();
                        newItem.lineId = undefined;
                        newItem.visOrder = undefined;
                        // 序列号清除
                        newItem.materialSerials.clear();
                        this.editData.inventoryTransferLines.add(newItem);
                        if (builder.length > 2) {
                            builder.append(", ");
                        }
                        builder.append(newItem.lineId);
                    }
                    builder.append("] ");
                    if (builder.length > 3) {
                        this.proceeding(ibas.emMessageType.WARNING, builder.toString());
                        this.view.showInventoryTransferLines(this.editData.inventoryTransferLines.filterDeleted());
                    }
                } else {
                    this.chooseInventoryTransferLineMaterial(undefined);
                }
            }
            /** 删除库存转储-行事件 */
            private removeInventoryTransferLine(items: bo.InventoryTransferLine[]): void {
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
            /** 调用库存转储添加服务 */
            private callInventoryTransferAddService(agent: ibas.IServiceAgent): void {
                for (let srvAgent of ibas.servicesManager.getServices({
                    proxy: new MaterialInventoryTransAddServiceProxy({
                        fromWarehouse: this.view.fromWarehouse,
                        toWarehouse: this.view.toWarehouse,
                        onAdded: (targets) => {
                            let created: boolean = false;
                            for (let target of targets) {
                                if (target instanceof bo.InventoryTransferLine) {
                                    this.editData.inventoryTransferLines.add(target);
                                    created = true;
                                }
                            }
                            if (created) {
                                // 创建了新的行项目
                                this.view.showInventoryTransferLines(this.editData.inventoryTransferLines.filterDeleted());
                            }
                        },
                    })
                })) {
                    if (srvAgent.id === agent.id) {
                        srvAgent.run();
                    }
                }
            }
            /** 选择库存转储订单行物料事件 */
            private chooseInventoryTransferLineMaterial(caller: bo.InventoryTransferLine): void {
                let that: this = this;
                let condition: ibas.ICondition;
                let conditions: ibas.IList<ibas.ICondition> = app.conditions.material.create();
                // 库存物料
                condition = new ibas.Condition();
                condition.alias = app.conditions.material.CONDITION_ALIAS_INVENTORY_ITEM;
                condition.value = ibas.emYesNo.YES.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.relationship = ibas.emConditionRelationship.AND;
                conditions.add(condition);
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
                // 调用选择服务
                ibas.servicesManager.runChooseService<bo.Material>({
                    boCode: bo.BO_CODE_MATERIAL,
                    criteria: conditions,
                    onCompleted(selecteds: ibas.IList<bo.Material>): void {
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
                            that.view.showInventoryTransferLines(that.editData.inventoryTransferLines.filterDeleted());
                        }
                    }
                });
            }
            /** 选择库存转储订单物料价格清单事件 */
            private chooseeInventoryTransferMaterialPriceList(): void {
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
            /** 选择库存转储订单行仓库事件 */
            private chooseInventoryTransferLineWarehouse(caller: bo.InventoryTransferLine, direction: ibas.emDirection): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.Warehouse>({
                    boCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: conditions.warehouse.create(this.editData.branch),
                    onCompleted(selecteds: ibas.IList<bo.Warehouse>): void {
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
                            that.view.showInventoryTransferLines(that.editData.inventoryTransferLines.filterDeleted());
                        }
                    }
                });
            }

            private chooseInventoryTransferLineMaterialBatch(): void {
                let contracts: ibas.ArrayList<IMaterialBatchContract> = new ibas.ArrayList<IMaterialBatchContract>();
                for (let item of this.editData.inventoryTransferLines) {
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
            private chooseInventoryTransferLineMaterialSerial(): void {
                let contracts: ibas.ArrayList<IMaterialSerialContract> = new ibas.ArrayList<IMaterialSerialContract>();
                for (let item of this.editData.inventoryTransferLines) {
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
            private chooseInventoryTransferLineDistributionRule(type: accounting.app.emDimensionType, caller: bo.InventoryTransferLine): void {
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
            private chooseInventoryTransferLineTransferRequest(): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                // 未取消的
                condition.alias = bo.InventoryTransferRequest.PROPERTY_CANCELED_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = ibas.emYesNo.NO.toString();
                // 仅下达的
                condition = criteria.conditions.create();
                condition.alias = bo.InventoryTransferRequest.PROPERTY_DOCUMENTSTATUS_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = ibas.emDocumentStatus.RELEASED.toString();
                // 审批通过的或未进审批
                condition = criteria.conditions.create();
                condition.alias = bo.InventoryTransferRequest.PROPERTY_APPROVALSTATUS_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = ibas.emApprovalStatus.APPROVED.toString();
                condition.bracketOpen = 1;
                condition = criteria.conditions.create();
                condition.alias = bo.InventoryTransferRequest.PROPERTY_APPROVALSTATUS_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = ibas.emApprovalStatus.UNAFFECTED.toString();
                condition.relationship = ibas.emConditionRelationship.OR;
                condition.bracketClose = 1;
                // 是否指定分支
                if (!ibas.strings.isEmpty(this.editData.branch)) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.InventoryTransferRequest.PROPERTY_BRANCH_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = this.editData.branch;
                } else {
                    condition = criteria.conditions.create();
                    condition.alias = bo.InventoryTransferRequest.PROPERTY_BRANCH_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = "";
                    condition.bracketOpen = 1;
                    condition = criteria.conditions.create();
                    condition.alias = bo.InventoryTransferRequest.PROPERTY_BRANCH_NAME;
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketClose = 1;
                }
                // 未清数量大于数量
                let cCriteria: ibas.IChildCriteria = criteria.childCriterias.create();
                cCriteria.propertyPath = bo.InventoryTransferRequest.PROPERTY_INVENTORYTRANSFERLINES_NAME;
                cCriteria.onlyHasChilds = true;
                condition = cCriteria.conditions.create();
                condition.alias = bo.InventoryTransferRequestLine.PROPERTY_QUANTITY_NAME;
                condition.operation = ibas.emConditionOperation.GRATER_THAN;
                condition.comparedAlias = bo.InventoryTransferRequestLine.PROPERTY_CLOSEDQUANTITY_NAME;
                // 是否指定从仓库
                if (!ibas.strings.isEmpty(this.view.fromWarehouse)) {
                    condition = cCriteria.conditions.create();
                    condition.alias = bo.InventoryTransferRequestLine.PROPERTY_FROMWAREHOUSE_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = this.view.fromWarehouse;
                }
                // 调用选择服务
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.InventoryTransferRequest>({
                    boCode: bo.InventoryTransferRequest.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.MULTIPLE,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<bo.InventoryTransferRequest>): void {
                        for (let selected of selecteds) {
                            for (let sItem of selected.inventoryTransferRequestLines) {
                                if (!ibas.strings.isEmpty(that.view.fromWarehouse)
                                    && !ibas.strings.equals(that.view.fromWarehouse, sItem.fromWarehouse)) {
                                    continue;
                                }
                                let eItem: bo.InventoryTransferLine = that.editData.inventoryTransferLines.create();
                                eItem.baseDocument(sItem);
                            }
                        }
                        that.view.showInventoryTransferLines(that.editData.inventoryTransferLines.filterDeleted());
                    }
                });
            }
            private chooseInventoryTransferLineMaterialVersion(caller: bo.InventoryTransferLine): void {
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
        }
        /** 视图-库存转储 */
        export interface IInventoryTransferEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showInventoryTransfer(data: bo.InventoryTransfer): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择库存转储单物料价格清单 */
            chooseeInventoryTransferMaterialPriceListEvent: Function;
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
            /** 选择库存转储单行成本中心事件 */
            chooseInventoryTransferLineDistributionRuleEvent: Function;
            /** 选择库存转储单行-转储请求事件 */
            chooseInventoryTransferLineTransferRequestEvent: Function;
            /** 调用库存转储添加服务 */
            callInventoryTransferAddServiceEvent: Function;
            /** 显示库存转储添加服务 */
            showServiceAgent(datas: ibas.IServiceAgent[]): void;
            /** 选择库存转储-行 物料版本 */
            chooseInventoryTransferLineMaterialVersionEvent: Function;
            /** 从仓库 */
            fromWarehouse: string;
            /** 目标仓库 */
            toWarehouse: string;
        }
        /** 库存转储编辑服务映射 */
        export class InventoryTransferEditServiceMapping extends ibas.BOEditServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = InventoryTransferEditApp.APPLICATION_ID;
                this.name = InventoryTransferEditApp.APPLICATION_NAME;
                this.boCode = InventoryTransferEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOEditServiceCaller<bo.InventoryTransfer>> {
                return new InventoryTransferEditApp();
            }
        }
    }
}