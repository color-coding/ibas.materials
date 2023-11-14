/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 编辑应用-物料组 */
        export class MaterialGroupEditApp extends ibas.BOEditApplication<IMaterialGroupEditView, bo.MaterialGroup> {
            /** 应用标识 */
            static APPLICATION_ID: string = "bec8ff08-29eb-45de-a79d-fe0b4bbd079a";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialgroup_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialGroup.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialGroupEditApp.APPLICATION_ID;
                this.name = MaterialGroupEditApp.APPLICATION_NAME;
                this.boCode = MaterialGroupEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.chooseParentsEvent = this.chooseParents;
                this.view.chooseLedgerAccountEvent = this.chooseLedgerAccount;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.MaterialGroup();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showMaterialGroup(this.editData);
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.MaterialGroup): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.MaterialGroup)) {
                    let data: bo.MaterialGroup = arguments[0];
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
                        boRepository.fetchMaterialGroup({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialGroup>): void {
                                let data: bo.MaterialGroup;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.MaterialGroup)) {
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
                boRepository.saveMaterialGroup({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialGroup>): void {
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
                        that.editData = new bo.MaterialGroup();
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
            /** 选择父项 */
            protected chooseParents(): void {
                ibas.servicesManager.runChooseService<bo.IMaterialGroup>({
                    boCode: bo.BO_CODE_MATERIALGROUP,
                    chooseType: ibas.emChooseType.MULTIPLE,
                    criteria: [
                        new ibas.Condition(bo.MaterialGroup.PROPERTY_PHANTOM_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted: (selecteds) => {
                        let builder: ibas.StringBuilder = new ibas.StringBuilder();
                        for (let item of selecteds) {
                            if (ibas.strings.isEmpty(item.code)) {
                                continue;
                            }
                            if (ibas.strings.equalsIgnoreCase(this.editData.code, item.code)) {
                                continue;
                            }
                            if (builder.length > 0) {
                                builder.append(ibas.DATA_SEPARATOR);
                            }
                            builder.append(item.code);
                        }
                        this.editData.parents = builder.toString();
                    }
                });
            }
            /** 选择总账科目事件 */
            private chooseLedgerAccount(): void {
                if (ibas.objects.isNull(this.editData) || this.editData.isDirty) {
                    throw new Error(ibas.i18n.prop("shell_data_saved_first"));
                }
                ibas.servicesManager.runApplicationService<accounting.app.ILedgerAccountSettingContract>({
                    proxy: new accounting.app.LedgerAccountSettingServiceProxy({
                        objectCode: this.editData.objectCode,
                        description: ibas.strings.format("{0} - {1}", this.editData.code, this.editData.name),
                        settings: {
                            category: ibas.objects.nameOf(this.editData),
                            conditions: [
                                new ibas.Condition(accounting.app.emLedgerAccountConditionProperty.ItemGroup, ibas.emConditionOperation.EQUAL, this.editData.code)
                            ]
                        }
                    }),
                });
            }
        }
        /** 视图-物料组 */
        export interface IMaterialGroupEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showMaterialGroup(data: bo.MaterialGroup): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择父项 */
            chooseParentsEvent: Function;
            /** 选择总账科目事件 */
            chooseLedgerAccountEvent: Function;
        }
    }
}