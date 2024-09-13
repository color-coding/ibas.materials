/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 编辑应用-库存收货 */
        export class GoodsReceiptEditApp extends ibas.BOEditService<IGoodsReceiptEditView, bo.GoodsReceipt> {
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
                this.view.chooseGoodsReceiptLineWarehouseEvent = this.chooseGoodsReceiptLineWarehouse;
                this.view.chooseGoodsReceiptLineMaterialBatchEvent = this.chooseGoodsReceiptLineMaterialBatch;
                this.view.chooseGoodsReceiptLineMaterialSerialEvent = this.createGoodsReceiptLineMaterialSerial;
                this.view.chooseGoodsReceiptMaterialPriceListEvent = this.chooseeGoodsReceiptMaterialPriceList;
                this.view.chooseGoodsReceiptLineDistributionRuleEvent = this.chooseGoodsReceiptLineDistributionRule;
                this.view.chooseGoodsReceiptLineMaterialVersionEvent = this.chooseGoodsReceiptLineMaterialVersion;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.GoodsReceipt();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showGoodsReceipt(this.editData);
                this.view.showGoodsReceiptLines(this.editData.goodsReceiptLines.filterDeleted());
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.GoodsReceipt): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.GoodsReceipt)) {
                    let data: bo.GoodsReceipt = arguments[0];
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
                                    ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                                that.editData = undefined;
                            } else {
                                // 替换编辑对象
                                that.editData = opRslt.resultObjects.firstOrDefault();
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                                if (that.editData.isDeleted !== true
                                    && that.editData.canceled !== ibas.emYesNo.YES) {
                                    // 保存序列号信息
                                    if (!ibas.objects.isNull(that.serials) && that.serials.save instanceof Function) {
                                        that.serials.save(
                                            (error) => {
                                                if (error instanceof Error) {
                                                    that.messages(error);
                                                }
                                            }
                                        );
                                    }
                                    // 保存批次号信息
                                    if (!ibas.objects.isNull(that.batches) && that.batches.save instanceof Function) {
                                        that.batches.save(
                                            (error) => {
                                                if (error instanceof Error) {
                                                    that.messages(error);
                                                }
                                            }
                                        );
                                    }
                                }
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
                        boRepository.parse<bo.GoodsReceipt>({
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
                        that.editData = new bo.GoodsReceipt();
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
            /** 添加库存收货-行事件 */
            private addGoodsReceiptLine(items: bo.GoodsReceiptLine[] | number): void {
                if (items instanceof Array && items.length > 0) {
                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                    builder.append(ibas.i18n.prop("shell_data_new_line"));
                    builder.append(" [");
                    for (let item of items) {
                        let newItem: bo.GoodsReceiptLine = item.clone();
                        newItem.lineId = undefined;
                        newItem.visOrder = undefined;
                        // 序列号清除
                        newItem.materialSerials.clear();
                        this.editData.goodsReceiptLines.add(newItem);
                        if (builder.length > 2) {
                            builder.append(", ");
                        }
                        builder.append(newItem.lineId);
                    }
                    builder.append("] ");
                    if (builder.length > 3) {
                        this.proceeding(ibas.emMessageType.WARNING, builder.toString());
                        this.view.showGoodsReceiptLines(this.editData.goodsReceiptLines.filterDeleted());
                    }
                } else if (typeof items === "number" && items > 0) {
                    for (let i: number = 0; i < items; i++) {
                        this.editData.goodsReceiptLines.create();
                    }
                    this.view.showGoodsReceiptLines(this.editData.goodsReceiptLines.filterDeleted());
                } else {
                    this.chooseGoodsReceiptLineMaterial(undefined);
                }
            }
            /** 删除库存收货-行事件 */
            private removeGoodsReceiptLine(items: bo.GoodsReceiptLine[]): void {
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
                            if (item.referenced === ibas.emYesNo.YES) {
                                this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_referenced", item.toString()));
                            } else {
                                item.delete();
                            }
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showGoodsReceiptLines(this.editData.goodsReceiptLines.filterDeleted());
            }

            /** 选择库存收货订单行物料事件 */
            private chooseGoodsReceiptLineMaterial(caller: bo.GoodsReceiptLine, filterConditions?: ibas.ICondition[]): void {
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
                // 添加价格清单条件
                if (ibas.numbers.valueOf(this.editData.priceList) !== 0) {
                    condition = new ibas.Condition();
                    condition.alias = materials.app.conditions.product.CONDITION_ALIAS_PRICELIST;
                    condition.value = this.editData.priceList.toString();
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.relationship = ibas.emConditionRelationship.AND;
                    conditions.add(condition);
                    if (!ibas.strings.isEmpty(this.editData.documentCurrency)) {
                        condition = new ibas.Condition();
                        condition.alias = materials.app.conditions.product.CONDITION_ALIAS_CURRENCY;
                        condition.value = this.editData.documentCurrency;
                        condition.operation = ibas.emConditionOperation.EQUAL;
                        conditions.add(condition);
                    }
                }
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
                ibas.servicesManager.runChooseService<materials.bo.IProduct>({
                    boCode: materials.bo.BO_CODE_PRODUCT,
                    criteria: conditions,
                    onCompleted(selecteds: ibas.IList<materials.bo.IProduct>): void {
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
                            item.baseMaterial(selected);
                            if (!ibas.strings.isEmpty(that.view.defaultWarehouse)) {
                                item.warehouse = that.view.defaultWarehouse;
                            }
                            item = null;
                        }
                        if (created) {
                            // 创建了新的行项目
                            that.view.showGoodsReceiptLines(that.editData.goodsReceiptLines.filterDeleted());
                        }
                    }
                });
            }
            /** 选择库存收货订单物料价格清单事件 */
            private chooseeGoodsReceiptMaterialPriceList(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.MaterialPriceList>({
                    boCode: bo.MaterialPriceList.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: conditions.materialpricelist.create(),
                    onCompleted(selecteds: ibas.IList<bo.MaterialPriceList>): void {
                        let selected: bo.MaterialPriceList = selecteds.firstOrDefault();
                        that.editData.priceList = selected.objectKey;
                        that.editData.documentCurrency = selected.currency;
                        that.changePurchaseOrderItemPrice(that.editData.priceList);
                    }
                });
            }
            /** 更改行价格 */
            private changePurchaseOrderItemPrice(priceList: number | ibas.ICriteria, items?: bo.GoodsReceiptLine[]): void {
                if (ibas.objects.isNull(items)) {
                    items = this.editData.goodsReceiptLines.filterDeleted();
                }
                if (typeof priceList === "number" && ibas.numbers.valueOf(priceList) !== 0) {
                    let criteria: ibas.ICriteria = materials.app.conditions.materialprice.create(this.editData.documentDate);
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = materials.app.conditions.materialprice.CONDITION_ALIAS_PRICELIST;
                    condition.value = priceList.toString();
                    if (!ibas.strings.isEmpty(this.editData.documentCurrency)) {
                        condition = criteria.conditions.create();
                        condition.alias = materials.app.conditions.materialprice.CONDITION_ALIAS_CURRENCY;
                        condition.value = this.editData.documentCurrency;
                    }
                    let count: number = criteria.conditions.length;
                    for (let item of items) {
                        condition = criteria.conditions.create();
                        condition.alias = materials.app.conditions.materialprice.CONDITION_ALIAS_ITEMCODE;
                        condition.value = item.itemCode;
                        condition.bracketOpen = 1;
                        if (criteria.conditions.length > count + 1) {
                            condition.relationship = ibas.emConditionRelationship.OR;
                        }
                        condition = criteria.conditions.create();
                        condition.alias = materials.app.conditions.materialprice.CONDITION_ALIAS_UOM;
                        condition.value = item.uom;
                        condition.bracketClose = 1;
                    }
                    if (criteria.conditions.length < count + 1) {
                        return;
                    }
                    if (criteria.conditions.length > count + 1) {
                        criteria.conditions[count].bracketOpen += 1;
                        criteria.conditions[criteria.conditions.length - 1].bracketClose += 1;
                    }
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        message: ibas.i18n.prop("materials_change_item_price_continue"),
                        actions: [
                            ibas.emMessageAction.YES,
                            ibas.emMessageAction.NO,
                        ],
                        onCompleted: (result) => {
                            if (result === ibas.emMessageAction.YES) {
                                this.changePurchaseOrderItemPrice(criteria, items);
                            }
                        }
                    });
                } else if (priceList instanceof ibas.Criteria) {
                    this.busy(true);
                    let boRepository: materials.bo.BORepositoryMaterials = new materials.bo.BORepositoryMaterials();
                    boRepository.fetchMaterialPrice({
                        criteria: priceList,
                        onCompleted: (opRslt) => {
                            for (let item of opRslt.resultObjects) {
                                items.forEach((value) => {
                                    if (item.itemCode === value.itemCode
                                        && (ibas.strings.isEmpty(value.uom) || item.uom === value.uom)) {
                                        value.price = item.price;
                                        value.currency = item.currency;
                                    }
                                });
                            }
                            this.busy(false);
                        }
                    });
                }
            }

            /** 选择库存收货订单行物料事件 */
            private chooseGoodsReceiptLineWarehouse(caller: bo.GoodsReceiptLine, filterConditions?: ibas.ICondition[]): void {
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
                            that.view.defaultWarehouse = item.warehouse;
                            item = null;
                        }
                        if (created) {
                            // 创建了新的行项目
                            that.view.showGoodsReceiptLines(that.editData.goodsReceiptLines.filterDeleted());
                        }
                    }
                });
            }
            private batches: IServiceExtraBatches;
            /** 选择物料批次信息 */
            private chooseGoodsReceiptLineMaterialBatch(): void {
                let contracts: ibas.ArrayList<IMaterialBatchContract> = new ibas.ArrayList<IMaterialBatchContract>();
                for (let item of this.editData.goodsReceiptLines) {
                    contracts.add({
                        batchManagement: item.batchManagement,
                        itemCode: item.itemCode,
                        itemDescription: item.itemDescription,
                        itemVersion: item.itemVersion,
                        warehouse: item.warehouse,
                        quantity: item.quantity,
                        uom: item.uom,
                        materialBatches: item.materialBatches,
                        batches: this.batches,
                    });
                }
                ibas.servicesManager.runApplicationService<IMaterialBatchContract[], IServiceExtraBatches>({
                    proxy: new MaterialBatchReceiptServiceProxy(contracts),
                    onCompleted: (results) => {
                        this.batches = results;
                    }
                });
            }
            private serials: IServiceExtraSerials;
            /** 选择物料序列信息 */
            private createGoodsReceiptLineMaterialSerial(): void {
                let contracts: ibas.ArrayList<IMaterialSerialContract> = new ibas.ArrayList<IMaterialSerialContract>();
                for (let item of this.editData.goodsReceiptLines) {
                    contracts.add({
                        serialManagement: item.serialManagement,
                        itemCode: item.itemCode,
                        itemDescription: item.itemDescription,
                        itemVersion: item.itemVersion,
                        warehouse: item.warehouse,
                        quantity: item.quantity,
                        uom: item.uom,
                        materialSerials: item.materialSerials,
                        serials: this.serials,
                    });
                }
                ibas.servicesManager.runApplicationService<IMaterialSerialContract[], IServiceExtraSerials>({
                    proxy: new MaterialSerialReceiptServiceProxy(contracts),
                    onCompleted: (results) => {
                        this.serials = results;
                    }
                });
            }
            private chooseGoodsReceiptLineDistributionRule(type: accounting.app.emDimensionType, caller: bo.GoodsReceiptLine): void {
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
            private chooseGoodsReceiptLineMaterialVersion(caller: bo.GoodsReceiptLine): void {
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
            /** 选择库存收货单价格清单 */
            chooseGoodsReceiptMaterialPriceListEvent: Function;
            /** 选择库存收货单行物料事件 */
            chooseGoodsReceiptLineMaterialEvent: Function;
            /** 选择库存收货单行仓库事件 */
            chooseGoodsReceiptLineWarehouseEvent: Function;
            /** 批次管理物料新建批次 */
            chooseGoodsReceiptLineMaterialBatchEvent: Function;
            /** 批次管理物料新建序列 */
            chooseGoodsReceiptLineMaterialSerialEvent: Function;
            /** 选择库存收货单行成本中心事件 */
            chooseGoodsReceiptLineDistributionRuleEvent: Function;
            /** 选择库存收货-行 物料版本 */
            chooseGoodsReceiptLineMaterialVersionEvent: Function;
            /** 默认仓库 */
            defaultWarehouse: string;
        }
        /** 库存收货编辑服务映射 */
        export class GoodsReceiptEditServiceMapping extends ibas.BOEditServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = GoodsReceiptEditApp.APPLICATION_ID;
                this.name = GoodsReceiptEditApp.APPLICATION_NAME;
                this.boCode = GoodsReceiptEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOEditServiceCaller<bo.GoodsReceipt>> {
                return new GoodsReceiptEditApp();
            }
        }
    }
}