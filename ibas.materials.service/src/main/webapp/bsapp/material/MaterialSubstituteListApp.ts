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
        export class MaterialSubstituteListApp extends ibas.Application<IMaterialSubstituteListView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "cdfe7e53-e07b-454f-9bb8-28c4bcfe36df";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialsubstitute_list";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSubstituteListApp.APPLICATION_ID;
                this.name = MaterialSubstituteListApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.addSubstituteEvent = this.addMaterialSubstitute;
                this.view.removeSubstituteEvent = this.removeMaterialSubstitute;
                this.view.saveSubstituteEvent = this.saveMaterialSubstitute;
                this.view.chooseSubstituteVersionEvent = this.chooseSubstituteVersion;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (this.material instanceof bo.Material) {
                    let criteria: ibas.Criteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.MaterialSubstitute.PROPERTY_ITEMCODE_NAME;
                    condition.value = this.material.code;
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchMaterialSubstitute({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                this.substitutes.clear();
                                this.substitutes.add(opRslt.resultObjects);
                                this.view.showMaterials(this.material);
                                this.view.showSubstitutes(this.substitutes.filter(c => c.isDeleted === false));
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                } else {
                    this.view.showMaterials(this.material);
                    this.view.showSubstitutes(this.substitutes.filter(c => c.isDeleted === false));
                }
            }
            run(material?: bo.Material): void {
                if (ibas.objects.isNull(material)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "material"));
                } else {
                    this.material = material;
                    super.run();
                }
            }
            private material: bo.Material;
            private substitutes: bo.MaterialSubstitutes = new bo.MaterialSubstitutes();

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
            protected addMaterialSubstitute(caller?: bo.MaterialSubstitute): void {
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
                condition = new ibas.Condition();
                condition.alias = bo.Material.PROPERTY_CODE_NAME;
                condition.value = this.material.code;
                condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                condition.relationship = ibas.emConditionRelationship.AND;
                conditions.add(condition);

                ibas.servicesManager.runChooseService<bo.Material>({
                    boCode: bo.Material.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.MULTIPLE,
                    criteria: conditions,
                    onCompleted: (selecteds) => {
                        let created: boolean = false;
                        for (let selected of selecteds) {
                            if (ibas.objects.isNull(caller)) {
                                created = true;
                                caller = new bo.MaterialSubstitute();
                                caller.itemCode = this.material.code;
                                caller.quantity = 1;
                                this.substitutes.add(caller);
                            }
                            caller.substitute = selected.code;
                            caller.uom = selected.inventoryUOM;
                            caller = null;
                        }
                        if (created) {
                            this.view.showSubstitutes(this.substitutes.filter(c => c.isDeleted === false));
                        }
                    }
                });
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
            /** 选择物料版本 */
            private chooseSubstituteVersion(caller: bo.MaterialSubstitute): void {
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
        }
        /** 视图-物料替代 */
        export interface IMaterialSubstituteListView extends ibas.IView {
            /** 保存数据事件 */
            saveSubstituteEvent: Function;
            /** 添加数据事件 */
            addSubstituteEvent: Function;
            /** 移除数据事件 */
            removeSubstituteEvent: Function;
            /** 显示数据 */
            showSubstitutes(datas: bo.MaterialSubstitute[]): void;
            /** 显示数据 */
            showMaterials(data: bo.Material): void;
            /** 选择数据版本事件 */
            chooseSubstituteVersionEvent: Function;
        }
    }
}
