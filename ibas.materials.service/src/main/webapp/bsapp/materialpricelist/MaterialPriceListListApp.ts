/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 列表应用-物料价格清单 */
        export class MaterialPriceListListApp extends ibas.BOListApplication<IMaterialPriceListListView, bo.MaterialPriceList> {
            /** 应用标识 */
            static APPLICATION_ID: string = "33c3d1e1-2710-4cb4-b437-7b70f51efe78";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialpricelist_list";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialPriceList.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialPriceListListApp.APPLICATION_ID;
                this.name = MaterialPriceListListApp.APPLICATION_NAME;
                this.boCode = MaterialPriceListListApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.editDataEvent = this.editData;
                this.view.deleteDataEvent = this.deleteData;
                this.view.selectedPriceListEvent = this.selectedPriceList;
                this.view.fetchPriceItemEvent = this.fetchPriceItem;
                this.view.exportPriceItemEvent = this.exportPriceItem;
                this.view.savePriceItemEvent = this.savePriceItem;
                this.view.addPriceItemEvent = this.addPriceItem;
                this.view.choosePriceItemUnitEvent = this.choosePriceItemUnit;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                if (!ibas.objects.isNull(criteria)) {
                    criteria.noChilds = true;// 不加载子项
                    if (criteria.conditions.firstOrDefault(
                        c => c.alias === bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME
                            && c.operation === ibas.emConditionOperation.GRATER_THAN
                            && c.value === "0"
                    ) === null) {
                        if (criteria.conditions.length > 2) {
                            criteria.conditions.firstOrDefault().bracketOpen++;
                            criteria.conditions.lastOrDefault().bracketClose++;
                        }
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME;
                        condition.operation = ibas.emConditionOperation.GRATER_THAN;
                        condition.value = "0";
                    }
                }
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialPriceList({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPriceList>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (!that.isViewShowed()) {
                                // 没显示视图，先显示
                                that.show();
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showPriceList(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 新建数据 */
            protected newData(): void {
                let app: MaterialPriceListEditApp = new MaterialPriceListEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.MaterialPriceList): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    ));
                    return;
                }
                let app: MaterialPriceListViewApp = new MaterialPriceListViewApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(data);

            }
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.MaterialPriceList): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                let app: MaterialPriceListEditApp = new MaterialPriceListEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(data);
            }
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.MaterialPriceList | bo.MaterialPriceList[]): void {
                let beDeleteds: ibas.IList<bo.MaterialPriceList> = ibas.arrays.create(data);
                // 没有选择删除的对象
                if (beDeleteds.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_delete")
                    ));
                    return;
                }
                // 标记删除对象
                beDeleteds.forEach((value) => {
                    value.delete();
                });
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_multiple_data_delete_continue", beDeleteds.length),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action !== ibas.emMessageAction.YES) {
                            return;
                        }
                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        ibas.queues.execute(beDeleteds, (data, next) => {
                            // 处理数据
                            boRepository.saveMaterialPriceList({
                                beSaved: data,
                                onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPriceList>): void {
                                    if (opRslt.resultCode !== 0) {
                                        next(new Error(ibas.i18n.prop("shell_data_delete_error", data, opRslt.message)));
                                    } else {
                                        next();
                                    }
                                }
                            });
                            that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_deleting", data));
                        }, (error) => {
                            // 处理完成
                            if (error instanceof Error) {
                                that.messages(ibas.emMessageType.ERROR, error.message);
                            } else {
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                            }
                            that.busy(false);
                        });
                        that.busy(true);
                    }
                });
            }
            protected currentPriceList: bo.MaterialPriceList = null;
            protected selectedPriceList(priceList: bo.MaterialPriceList): void {
                if (ibas.objects.isNull(priceList)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_materialpricelist")
                    )); return;
                }
                this.currentPriceList = priceList;
                this.view.showPriceItems(undefined);
            }
            /** 查询价格 */
            protected fetchPriceItem(criteria: ibas.ICriteria): void {
                if (ibas.objects.isNull(this.currentPriceList)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_materialpricelist")
                    )); return;
                }
                if (ibas.objects.isNull(criteria)) {
                    criteria = new ibas.Criteria();
                    criteria.result = ibas.config.get(ibas.CONFIG_ITEM_CRITERIA_RESULT_COUNT, 30);
                }
                let condition: ibas.ICondition;
                if (criteria.conditions.length > 1) {
                    criteria.conditions.firstOrDefault().bracketOpen += 1;
                    criteria.conditions.lastOrDefault().bracketClose += 1;
                }
                condition = criteria.conditions.create();
                condition.alias = app.conditions.materialprice.CONDITION_ALIAS_PRICELIST;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = String(this.currentPriceList.objectKey);
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialPrice({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPrice>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            opRslt.resultObjects.forEach(c => c.markOld());
                            that.view.showPriceItems(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 保存价格清单项目 */
            protected savePriceItem(data: bo.MaterialPrice | bo.MaterialPrice[]): void {
                if (ibas.objects.isNull(this.currentPriceList)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_materialpricelist")
                    )); return;
                }
                let beSavedItem: bo.MaterialPriceItem = null;
                let beSaved: bo.MaterialPriceList = new bo.MaterialPriceList();
                beSaved.objectKey = this.currentPriceList.objectKey;
                beSaved.isSavable = false;// 主对象不保存
                beSaved.markOld(true);
                for (let item of ibas.arrays.create(data)) {
                    if (!(item instanceof bo.MaterialPrice)) {
                        continue;
                    }
                    let priceListKey: number = 0, priceListLine: number = 0;
                    if (item.source?.indexOf("-") > 0) {
                        priceListKey = Number(item.source.split("-")[0]);
                        priceListLine = Number(item.source.split("-")[1]);
                    } else {
                        priceListKey = Number(item.source);
                    }
                    if (!(priceListKey > 0)) {
                        continue;
                    }
                    if (item.price < 0) {
                        continue;
                    }
                    // 先删除
                    if (priceListKey === this.currentPriceList.objectKey) {
                        // 非此价格清单内容，不能删除
                        beSavedItem = new bo.MaterialPriceItem();
                        beSavedItem.objectKey = priceListKey;
                        beSavedItem.lineId = priceListLine;
                        if (item.isNew === false) {
                            // 非新建的，设置行号
                            beSavedItem.isNew = false;
                        }
                        beSavedItem.itemCode = item.itemCode;
                        beSavedItem.uom = item.uom;
                        beSavedItem.price = item.price;
                        beSavedItem.currency = item.currency;
                        beSavedItem.delete();
                        beSaved.materialPriceItems.add(beSavedItem);
                        if (item.isDeleted) {
                            continue;
                        }
                    }
                    // 再添加
                    beSavedItem = new bo.MaterialPriceItem();
                    beSavedItem.objectKey = this.currentPriceList.objectKey;
                    beSavedItem.lineId = priceListLine;
                    beSavedItem.itemCode = item.itemCode;
                    beSavedItem.uom = item.uom;
                    beSavedItem.price = item.price;
                    beSavedItem.currency = item.currency;
                    beSaved.materialPriceItems.add(beSavedItem);
                }
                // 没有选择删除的对象
                if (beSaved.materialPriceItems.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_save")
                    )); return;
                }
                let that: this = this;
                that.busy(true);
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.saveMaterialPriceList({
                    beSaved: beSaved,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPriceList>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            for (let item of ibas.arrays.create(data)) {
                                if (!(item instanceof bo.MaterialPrice)) {
                                    continue;
                                }
                                if (item.price < 0) {
                                    continue;
                                }
                                if (item.isDeleted) {
                                    continue;
                                }
                                item.markOld();
                            }
                            that.messages(ibas.emMessageType.SUCCESS,
                                ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                        } catch (error) {
                            that.messages(ibas.emMessageType.ERROR,
                                ibas.i18n.prop("shell_data_delete_error", beSaved, error.message));
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 导出价格 */
            protected exportPriceItem(): void {
                if (ibas.objects.isNull(this.currentPriceList)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_materialpricelist")
                    )); return;
                }
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialPrice({
                    criteria: new ibas.Criteria(),
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPrice>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.savePrices(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 添加价格 */
            protected addPriceItem(items: bo.MaterialPrice[]): void {
                if (ibas.objects.isNull(this.currentPriceList)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_materialpricelist")
                    )); return;
                }
                if (items instanceof Array && items.length > 0) {
                    let newItems: ibas.IList<bo.MaterialPrice> = new ibas.ArrayList<bo.MaterialPrice>();
                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                    builder.append(ibas.i18n.prop("shell_data_new_line"));
                    builder.append(" [");
                    for (let item of items) {
                        let newItem: bo.MaterialPrice = item.clone();
                        newItem.source = ibas.strings.format("{0}-0", this.currentPriceList.objectKey);
                        if (builder.length > 2) {
                            builder.append(", ");
                        }
                        builder.append(newItem.itemCode);
                        newItems.add(newItem);
                    }
                    builder.append("] ");
                    if (builder.length > 3) {
                        this.proceeding(ibas.emMessageType.WARNING, builder.toString());
                    }
                    if (newItems.length > 0) {
                        this.view.showPriceItems(newItems);
                    }
                } else {
                    let that: this = this;
                    let conditions: ibas.IList<ibas.ICondition> = app.conditions.material.create();
                    // 调用选择服务
                    ibas.servicesManager.runChooseService<bo.Material | bo.Product>({
                        boCode: bo.BO_CODE_MATERIAL,
                        criteria: conditions,
                        onCompleted(selecteds: ibas.IList<bo.Material | bo.Product>): void {
                            let newItems: ibas.IList<bo.MaterialPrice> = new ibas.ArrayList<bo.MaterialPrice>();
                            for (let selected of selecteds) {
                                let newItem: bo.MaterialPrice = new bo.MaterialPrice();
                                newItem.source = ibas.strings.format("{0}-0", that.currentPriceList.objectKey);
                                newItem.itemCode = selected.code;
                                newItem.itemName = selected.name;
                                newItem.itemSign = selected.sign;
                                newItem.uom = selected.inventoryUOM;
                                newItem.price = -1;
                                newItem.currency = that.currentPriceList.currency;
                                newItems.add(newItem);
                            }
                            if (newItems.length > 0) {
                                that.view.showPriceItems(newItems);
                            }
                        }
                    });
                }
            }
            /** 选择价格项目单位 */
            private choosePriceItemUnit(data: bo.MaterialPrice): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = materials.bo.Unit.PROPERTY_ACTIVATED_NAME;
                condition.value = String(ibas.emYesNo.YES);
                ibas.servicesManager.runChooseService<materials.bo.IUnit>({
                    boCode: materials.bo.BO_CODE_UNIT,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<materials.bo.IUnit>): void {
                        for (let selected of selecteds) {
                            if (data.price > 0 && selected.name !== data.uom) {
                                // 根据汇率计算价格
                                materials.app.changeMaterialsUnitRate({
                                    data: {
                                        sourceUnit: selected.name,
                                        targetUnit: data.uom,
                                        material: data.itemCode,
                                        setUnitRate(rate: number): void {
                                            data.price = data.price * rate;
                                        }
                                    }
                                });
                            }
                            data.uom = selected.name;
                        }
                    }
                });
            }
        }
        /** 视图-物料价格清单 */
        export interface IMaterialPriceListListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showPriceList(datas: bo.MaterialPriceList[]): void;
            /** 选中价格清单事件 */
            selectedPriceListEvent: Function;
            /** 保存价格项目事件 */
            savePriceItemEvent: Function;
            /** 添加价格项目事件 */
            addPriceItemEvent: Function;
            /** 查询价格事件 */
            fetchPriceItemEvent: Function;
            /** 显示数据 */
            showPriceItems(datas: bo.MaterialPrice[]): void;
            /** 导出价格事件 */
            exportPriceItemEvent: Function;
            /** 保存数据 */
            savePrices(datas: bo.MaterialPrice[]): void;
            /** 选择价格项目单位事件 */
            choosePriceItemUnitEvent: Function;
        }
        /** 权限元素-物料价格清单编辑 */
        export const ELEMENT_MATERIAL_PRICE_LIST_EDIT: ibas.IElement = {
            id: MaterialPriceListEditApp.APPLICATION_ID,
            name: MaterialPriceListEditApp.APPLICATION_NAME,
        };
    }
}