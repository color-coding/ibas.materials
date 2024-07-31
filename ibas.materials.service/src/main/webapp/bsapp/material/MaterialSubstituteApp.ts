/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 列表应用-物料替代 */
        export class MaterialSubstituteApp extends ibas.Application<IMaterialSubstituteView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "4baee69c-ce82-4594-99db-b1d8626d3c96";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialsubstitute_list";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSubstituteApp.APPLICATION_ID;
                this.name = MaterialSubstituteApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.fetchDataEvent = this.fetchData;
                this.view.addSubstituteEvent = this.addMaterialSubstitute;
                this.view.removeSubstituteEvent = this.removeMaterialSubstitute;
                this.view.saveSubstituteEvent = this.saveMaterialSubstitute;
                this.view.chooseSubstituteVersionEvent = this.chooseSubstituteVersion;
                this.view.chooseSubstituteMaterialEvent = this.chooseSubstituteMaterial;
                this.view.fetchSubstituteEvent = this.fetchSubstitute;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 关闭视图 */
            close(): void {
                if (this.substitutes?.where(c => c.isSavable === true && c.isDirty === true).length > 0) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        message: ibas.i18n.prop("sys_data_modified_continue_close_view"),
                        actions: [
                            ibas.emMessageAction.YES,
                            ibas.emMessageAction.NO
                        ],
                        onCompleted: (action) => {
                            if (action === ibas.emMessageAction.YES) {
                                super.close();
                            }
                        }
                    });
                } else {
                    super.close();
                }
            }

            protected substitutes: bo.MaterialSubstitutes = new bo.MaterialSubstitutes();

            protected removeMaterialSubstitute(data: materials.bo.MaterialSubstitute | materials.bo.MaterialSubstitute[]): void {
                let beDeleteds: ibas.IList<materials.bo.MaterialSubstitute> = ibas.arrays.create(data);
                // 没有选择删除的对象
                if (beDeleteds.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_delete")
                    ));
                    return;
                }
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_multiple_data_delete_continue", beDeleteds.length),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted: (action) => {
                        if (action !== ibas.emMessageAction.YES) {
                            return;
                        }
                        beDeleteds.forEach((value) => {
                            if (value.isNew === true) {
                                this.substitutes.remove(value);
                            } else {
                                value.delete();
                            }
                        });
                        this.view.showSubstitutes(this.substitutes.filter(c => c.isDeleted === false));
                    }
                });
            }
            protected addMaterialSubstitute(data: bo.Material): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_material")
                    ));
                    return;
                }
                let substitute: bo.MaterialSubstitute = new bo.MaterialSubstitute();
                substitute.itemCode = data.code;
                substitute.quantity = 1;
                this.substitutes.add(substitute);
                this.chooseSubstituteMaterial(substitute);
            }
            protected saveMaterialSubstitute(beSaveds: materials.bo.MaterialSubstitute[]): void {
                if (ibas.objects.isNull(beSaveds)) {
                    beSaveds = new ibas.ArrayList<materials.bo.MaterialSubstitute>();
                    for (let item of this.substitutes) {
                        if (item.isSavable === false) {
                            continue;
                        }
                        if (item.isDirty === false) {
                            continue;
                        }
                        beSaveds.push(item);
                    }
                }
                this.busy(true);
                let boRepository: materials.bo.BORepositoryMaterials = new materials.bo.BORepositoryMaterials();
                ibas.queues.execute(beSaveds, (data, next) => {
                    if (data.isNew === true && data.isDeleted === true) {
                        this.substitutes.remove(data);
                        next();
                    } else {
                        boRepository.saveMaterialSubstitute({
                            beSaved: data,
                            onCompleted: (opRslt) => {
                                if (opRslt.resultCode !== 0) {
                                    next(new Error(opRslt.message));
                                } else {
                                    let index: number = this.substitutes.indexOf(data);
                                    if (index >= 0) {
                                        if (opRslt.resultObjects.length > 0) {
                                            // 更新or新建
                                            this.substitutes[index] = opRslt.resultObjects.firstOrDefault();
                                        } else {
                                            // 删除操作
                                            this.substitutes.removeAt(index);
                                        }
                                    }
                                    next();
                                }
                            }
                        });
                    }
                }, (error) => {
                    this.busy(false);
                    if (error instanceof Error) {
                        this.messages(ibas.emMessageType.ERROR, error.message);
                    } else {
                        this.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("shell_sucessful"));
                    }
                    this.view.showSubstitutes(this.substitutes.filter(c => c.isDeleted === false));
                });
            }
            protected fetchData(criteria: ibas.ICriteria): void {
                if (ibas.objects.isNull(criteria)) {
                    criteria = new ibas.Criteria();
                    criteria.conditions.add(conditions.material.create());
                }
                if (criteria.sorts.length === 0) {
                    let sort: ibas.ISort = criteria.sorts.create();
                    sort.alias = bo.Material.PROPERTY_DOCENTRY_NAME;
                    sort.sortType = ibas.emSortType.DESCENDING;
                }
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterial({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Material>): void {
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
                            that.view.showMaterials(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            protected fetchSubstitute(criteria?: ibas.ICriteria): void {
                if (this.substitutes?.where(c => c.isSavable === true && c.isDirty === true).length > 0) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        message: ibas.i18n.prop("materials_data_modified_continue_to"),
                        actions: [
                            ibas.emMessageAction.YES,
                            ibas.emMessageAction.NO
                        ],
                        onCompleted: (action) => {
                            if (action === ibas.emMessageAction.YES) {
                                this.substitutes.clear();
                                this.fetchSubstitute(criteria);
                            }
                        }
                    }); return;
                }
                if (ibas.objects.isNull(criteria)) {
                    criteria = new ibas.Criteria();
                }
                if (criteria.sorts.length === 0) {
                    let sort: ibas.ISort = criteria.sorts.create();
                    sort.alias = bo.MaterialSubstitute.PROPERTY_ITEMCODE_NAME;
                    sort.sortType = ibas.emSortType.DESCENDING;
                    sort = criteria.sorts.create();
                    sort.alias = bo.MaterialSubstitute.PROPERTY_POSITION_NAME;
                    sort.sortType = ibas.emSortType.ASCENDING;
                }
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialSubstitute({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSubstitute>): void {
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
                            that.substitutes.clear();
                            that.substitutes.add(opRslt.resultObjects);
                            that.view.showSubstitutes(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 选择物料版本 */
            protected chooseSubstituteVersion(caller: bo.MaterialSubstitute): void {
                // 检查目标数据
                if (ibas.objects.isNull(caller)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "caller"));
                }
                ibas.servicesManager.runChooseService<bo.MaterialVersion>({
                    boCode: bo.MaterialVersion.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.MaterialVersion.PROPERTY_ITEMCODE_NAME, ibas.emConditionOperation.EQUAL, caller.substitute),
                        new ibas.Condition(bo.MaterialVersion.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<bo.MaterialVersion>): void {
                        let selected: bo.MaterialVersion = selecteds.firstOrDefault();
                        caller.version = selected.name;
                    }
                });
            }
            /** 选择物料 */
            protected chooseSubstituteMaterial(caller: bo.MaterialSubstitute): void {
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
                // 非本物料
                if (!ibas.objects.isNull(caller)) {
                    condition = new ibas.Condition();
                    condition.alias = bo.Material.PROPERTY_CODE_NAME;
                    condition.value = caller.itemCode;
                    condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                    condition.relationship = ibas.emConditionRelationship.AND;
                    conditions.add(condition);
                }

                ibas.servicesManager.runChooseService<bo.Material>({
                    boCode: bo.Material.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.MULTIPLE,
                    criteria: conditions,
                    onCompleted: (selecteds) => {
                        let created: boolean = false;
                        for (let selected of selecteds) {
                            if (created) {
                                this.substitutes.add(caller);
                            }
                            caller.substitute = selected.code;
                            caller.uom = selected.inventoryUOM;
                            caller = caller.clone();
                            created = true;
                        }
                        if (created) {
                            this.view.showSubstitutes(this.substitutes.filter(c => c.isDeleted === false));
                        }
                    }
                });
            }
        }
        /** 视图-物料替代 */
        export interface IMaterialSubstituteView extends ibas.IView {
            /** 查询物料事件 */
            fetchDataEvent: Function;
            /** 查询数据事件 */
            fetchSubstituteEvent: Function;
            /** 保存数据事件 */
            saveSubstituteEvent: Function;
            /** 添加数据事件 */
            addSubstituteEvent: Function;
            /** 移除数据事件 */
            removeSubstituteEvent: Function;
            /** 显示数据 */
            showSubstitutes(datas: bo.MaterialSubstitute[]): void;
            /** 显示物料 */
            showMaterials(data: bo.Material[]): void;
            /** 选择物料版本事件 */
            chooseSubstituteVersionEvent: Function;
            /** 选择物料事件 */
            chooseSubstituteMaterialEvent: Function;
        }
    }
}
