/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 编辑应用-规格模板 */
        export class SpecificationEditApp extends ibas.BOEditApplication<ISpecificationEditView, bo.Specification> {

            /** 应用标识 */
            static APPLICATION_ID: string = "7a593bf1-2c0b-47b4-aff6-5500429740c4";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_specification_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Specification.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = SpecificationEditApp.APPLICATION_ID;
                this.name = SpecificationEditApp.APPLICATION_NAME;
                this.boCode = SpecificationEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.addSpecificationItemEvent = this.addSpecificationItem;
                this.view.removeSpecificationItemEvent = this.removeSpecificationItem;
                this.view.addSpecificationItemValueEvent = this.addSpecificationItemValue;
                this.view.removeSpecificationItemValueEvent = this.removeSpecificationItemValue;
                this.view.editSpecificationItemEvent = this.editSpecificationItem;
                this.view.chooseSpecificationTargetEvent = this.chooseSpecificationTarget;
                this.view.chooseSpecificationAssignedEvent = this.chooseSpecificationAssigned;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.Specification();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showSpecification(this.editData);
                this.view.showSpecificationItems(this.editData.specificationItems.filterDeleted());
            }
            run(): void;
            run(data: bo.Specification): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.Specification)) {
                    let data: bo.Specification = arguments[0];
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
                        boRepository.fetchSpecification({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.Specification>): void {
                                let data: bo.Specification;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.Specification)) {
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
                boRepository.saveSpecification({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Specification>): void {
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
                        that.editData = new bo.Specification();
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
            /** 添加规格模板-项目事件 */
            protected addSpecificationItem(parent: bo.SpecificationItem): void {
                let item: bo.SpecificationItem = this.editData.specificationItems.create();
                if (!ibas.objects.isNull(parent)) {
                    item.parentSign = parent.sign;
                }
                // 仅显示没有标记删除的
                this.view.showSpecificationItems(this.editData.specificationItems.filterDeleted());
            }
            /** 删除规格模板-项目事件 */
            protected removeSpecificationItem(items: bo.SpecificationItem[]): void {
                // 非数组，转为数组
                if (!(items instanceof Array)) {
                    items = [items];
                }
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (this.editData.specificationItems.indexOf(item) >= 0) {
                        if (item.isNew) {
                            // 新建的移除集合
                            this.editData.specificationItems.remove(item);
                        } else {
                            // 非新建标记删除
                            item.delete();
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showSpecificationItems(this.editData.specificationItems.filterDeleted());
            }
            private chooseSpecificationTarget(): void {
                let that: this = this;
                if (this.editData.targetType === bo.emSpecificationTarget.MATERIAL) {
                    ibas.servicesManager.runChooseService<materials.bo.IMaterial>({
                        boCode: materials.bo.BO_CODE_MATERIAL,
                        chooseType: ibas.emChooseType.SINGLE,
                        criteria: materials.app.conditions.material.create(),
                        onCompleted(selecteds: ibas.IList<materials.bo.IMaterial>): void {
                            let selected: materials.bo.IMaterial = selecteds.firstOrDefault();
                            that.editData.target = selected.code;
                            that.editData.name = ibas.strings.format("{0}-{1}", selected.name, ibas.i18n.prop("bo_specification"));
                        }
                    });
                } else if (this.editData.targetType === bo.emSpecificationTarget.MATERIAL_GROUP) {
                    ibas.servicesManager.runChooseService<materials.bo.IMaterialGroup>({
                        boCode: materials.bo.BO_CODE_MATERIALGROUP,
                        chooseType: ibas.emChooseType.SINGLE,
                        criteria: [
                            new ibas.Condition("activated", ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES.toString()),
                        ],
                        onCompleted(selecteds: ibas.IList<materials.bo.IMaterialGroup>): void {
                            let selected: materials.bo.IMaterialGroup = selecteds.firstOrDefault();
                            that.editData.target = selected.code;
                            that.editData.name = ibas.strings.format("{0}-{1}", selected.name, ibas.i18n.prop("bo_specification"));
                        }
                    });
                }
            }
            private chooseSpecificationAssigned(): void {
                if (ibas.strings.isEmpty(this.editData.target)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data", ibas.i18n.prop("bo_specification_target")));
                    return;
                }
                let that: this = this;
                let naming: (original: string, value: string) => string = function (original: string, value: string): string {
                    if (ibas.strings.isEmpty(original) || ibas.strings.isEmpty(value)) {
                        return original;
                    }
                    let ends: string = ibas.i18n.prop("bo_specification");
                    if (ibas.strings.isWith(original, undefined, "-" + ends)) {
                        let tmps: string[] = original.split("-");
                        if (tmps.length > 1) {
                            let builder: ibas.StringBuilder = new ibas.StringBuilder();
                            for (let i: number = 0; i < (tmps.length - (tmps.length > 2 ? 2 : 1)); i++) {
                                if (i > 0) {
                                    builder.append("-");
                                }
                                builder.append(tmps[i]);
                            }
                            builder.append("-");
                            builder.append(value);
                            builder.append("-");
                            builder.append(ends);
                            return builder.toString();
                        }
                    }
                    return original;
                };
                if (this.editData.assignedType === bo.emSpecificationAssigned.BUSINESS_PARTNER_GROUP) {
                    ibas.servicesManager.runChooseService<businesspartner.bo.IBusinessPartnerGroup>({
                        boCode: businesspartner.bo.BO_CODE_BUSINESSPARTNERGROUP,
                        chooseType: ibas.emChooseType.SINGLE,
                        criteria: [
                            new ibas.Condition(businesspartner.bo.BusinessPartnerGroup.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                        ],
                        onCompleted(selecteds: ibas.IList<businesspartner.bo.IBusinessPartnerGroup>): void {
                            let selected: businesspartner.bo.IBusinessPartnerGroup = selecteds.firstOrDefault();
                            that.editData.assigned = selected.code;
                            that.editData.name = naming(that.editData.name, selected.name);
                        }
                    });
                } else if (this.editData.assignedType === bo.emSpecificationAssigned.CUSTOMER) {
                    ibas.servicesManager.runChooseService<businesspartner.bo.ICustomer>({
                        boCode: businesspartner.bo.BO_CODE_CUSTOMER,
                        chooseType: ibas.emChooseType.SINGLE,
                        criteria: businesspartner.app.conditions.customer.create(),
                        onCompleted(selecteds: ibas.IList<businesspartner.bo.ICustomer>): void {
                            let selected: businesspartner.bo.ICustomer = selecteds.firstOrDefault();
                            that.editData.assigned = selected.code;
                            that.editData.name = naming(that.editData.name, selected.name);
                        }
                    });
                } else if (this.editData.assignedType === bo.emSpecificationAssigned.SUPPLIER) {
                    ibas.servicesManager.runChooseService<businesspartner.bo.ISupplier>({
                        boCode: businesspartner.bo.BO_CODE_SUPPLIER,
                        chooseType: ibas.emChooseType.SINGLE,
                        criteria: businesspartner.app.conditions.supplier.create(),
                        onCompleted(selecteds: ibas.IList<businesspartner.bo.ISupplier>): void {
                            let selected: businesspartner.bo.ISupplier = selecteds.firstOrDefault();
                            that.editData.assigned = selected.code;
                            that.editData.name = naming(that.editData.name, selected.name);
                        }
                    });
                }
            }

            private editSpecificationItemData: bo.SpecificationItem;
            /** 编辑属性值事件 */
            private editSpecificationItem(item: bo.SpecificationItem): void {
                this.editSpecificationItemData = item;
                if (ibas.objects.isNull(this.editSpecificationItemData)) {
                    // 无编辑对象
                    this.view.showSpecificationItems(this.editData.specificationItems.filterDeleted());
                } else {
                    // 存在编辑对象
                    this.view.showSpecificationItemValues(this.editSpecificationItemData.specificationItemValues.filterDeleted());
                }
            }
            /** 添加属性值事件 */
            private addSpecificationItemValue(): void {
                if (!this.editSpecificationItemData) {
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")));
                    return;
                }
                this.editSpecificationItemData.specificationItemValues.create();
                // 仅显示没有标记删除的
                this.view.showSpecificationItemValues(this.editSpecificationItemData.specificationItemValues.filterDeleted());
            }
            /** 删除属性值事件 */
            private removeSpecificationItemValue(items: bo.SpecificationItemValue[]): void {
                if (!this.editSpecificationItemData) {
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")));
                    return;
                }
                // 非数组，转为数组
                if (!(items instanceof Array)) {
                    items = [items];
                }
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (this.editSpecificationItemData.specificationItemValues.indexOf(item) >= 0) {
                        if (item.isNew) {
                            // 新建的移除集合
                            this.editSpecificationItemData.specificationItemValues.remove(item);
                        } else {
                            // 非新建标记删除
                            item.delete();
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showSpecificationItemValues(this.editSpecificationItemData.specificationItemValues.filterDeleted());
            }
        }
        /** 视图-规格模板 */
        export interface ISpecificationEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showSpecification(data: bo.Specification): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加规格模板-项目事件 */
            addSpecificationItemEvent: Function;
            /** 删除规格模板-项目事件 */
            removeSpecificationItemEvent: Function;
            /** 选择规格模板目标事件 */
            chooseSpecificationTargetEvent: Function;
            /** 选择规格模板分配事件 */
            chooseSpecificationAssignedEvent: Function;
            /** 显示数据 */
            showSpecificationItems(datas: bo.SpecificationItem[]): void;
            /** 编辑规格模事件 */
            editSpecificationItemEvent: Function;
            /** 添加规格模板-项目值事件 */
            addSpecificationItemValueEvent: Function;
            /** 删除规格模板-项目值事件 */
            removeSpecificationItemValueEvent: Function;
            /** 显示数据 */
            showSpecificationItemValues(datas: bo.SpecificationItemValue[]): void;
        }
    }
}
