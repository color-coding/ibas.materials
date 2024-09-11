/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 编辑应用-物料批次 */
        export class MaterialBatchEditApp extends ibas.BOEditApplication<IMaterialBatchEditView, bo.MaterialBatch> {
            /** 应用标识 */
            static APPLICATION_ID: string = "dd79446f-bbd8-4712-a36b-719ca37f44aa";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialbatch_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialBatch.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialBatchEditApp.APPLICATION_ID;
                this.name = MaterialBatchEditApp.APPLICATION_NAME;
                this.boCode = MaterialBatchEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.chooseSpecificationEvent = this.chooseSpecification;
                this.view.chooseVersionEvent = this.chooseVersion;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                this.view.showMaterialBatch(this.editData);
            }
            run(data?: bo.MaterialBatch | ibas.Criteria): void {
                if (arguments[0] instanceof bo.MaterialBatch) {
                    let data: bo.MaterialBatch = arguments[0];
                    if (data.isNew) {
                        this.editData = data;
                        this.show();
                    } else {
                        this.run(<ibas.Criteria>data.criteria());
                    }
                } else if (arguments[0] instanceof ibas.Criteria) {
                    let criteria: ibas.Criteria = arguments[0];
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.fetchMaterialBatch({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            let data: bo.MaterialBatch;
                            if (opRslt.resultCode === 0) {
                                data = opRslt.resultObjects.firstOrDefault();
                            }
                            if (ibas.objects.instanceOf(data, bo.MaterialBatch)) {
                                // 查询到了有效数据
                                this.editData = data;
                                this.show();
                            } else {
                                // 数据重新检索无效
                                this.messages({
                                    type: ibas.emMessageType.ERROR,
                                    message: ibas.i18n.prop("shell_data_fetched_none")
                                });
                            }
                        }
                    });
                } else {
                    super.run.apply(this, arguments);
                }
            }
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.saveMaterialBatch({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatch>): void {
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
            /** 选择物料规格 */
            private chooseSpecification(): void {
                let that: this = this;
                this.messages({
                    message: ibas.i18n.prop("materials_create_continue", ibas.i18n.prop("bo_materialspecification")),
                    type: ibas.emMessageType.QUESTION,
                    actions: [
                        ibas.emMessageAction.YES,
                        ibas.emMessageAction.NO
                    ],
                    /** 调用完成 */
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action === ibas.emMessageAction.YES) {
                            ibas.servicesManager.runApplicationService<materials.app.ISpecificationTreeContract, materials.bo.MaterialSpecification>({
                                proxy: new materials.app.SpecificationTreeServiceProxy({
                                    target: that.editData.itemCode,
                                }),
                                onCompleted(result: materials.bo.MaterialSpecification): void {
                                    that.editData.specification = result.objectKey;
                                }
                            });
                        } else {
                            ibas.servicesManager.runChooseService<materials.bo.IMaterialSpecification>({
                                boCode: materials.bo.BO_CODE_MATERIALSPECIFICATION,
                                chooseType: ibas.emChooseType.SINGLE,
                                criteria: [
                                    new ibas.Condition(materials.bo.MaterialSpecification.PROPERTY_OBJECTKEY_NAME,
                                        ibas.emConditionOperation.GRATER_THAN, "0"),
                                    new ibas.Condition(materials.bo.MaterialSpecification.PROPERTY_ITEMCODE_NAME,
                                        ibas.emConditionOperation.EQUAL, that.editData.itemCode),
                                ],
                                onCompleted(selecteds: ibas.IList<materials.bo.IMaterialSpecification>): void {
                                    let selected: materials.bo.IMaterialSpecification = selecteds.firstOrDefault();
                                    that.editData.specification = selected.objectKey;
                                }
                            });
                        }
                    }
                });
            }
            /** 选择物料版本 */
            private chooseVersion(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.MaterialVersion>({
                    boCode: bo.MaterialVersion.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.MaterialVersion.PROPERTY_ITEMCODE_NAME, ibas.emConditionOperation.EQUAL, this.editData.itemCode),
                        new ibas.Condition(bo.MaterialVersion.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<bo.MaterialVersion>): void {
                        let selected: bo.MaterialVersion = selecteds.firstOrDefault();
                        that.editData.version = selected.name;
                    }
                });
            }
        }
        /** 视图-物料批次 */
        export interface IMaterialBatchEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showMaterialBatch(data: bo.MaterialBatch): void;
            /** 选择物料规格 */
            chooseSpecificationEvent: Function;
            /** 选择物料版本 */
            chooseVersionEvent: Function;
        }
    }
}