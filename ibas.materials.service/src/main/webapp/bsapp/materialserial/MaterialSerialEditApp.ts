/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 编辑应用-物料序列 */
        export class MaterialSerialEditApp extends ibas.BOEditApplication<IMaterialSerialEditView, bo.MaterialSerial> {
            /** 应用标识 */
            static APPLICATION_ID: string = "ba881cc5-85b6-4ab7-afe6-810db4402355";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialserial_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialSerial.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSerialEditApp.APPLICATION_ID;
                this.name = MaterialSerialEditApp.APPLICATION_NAME;
                this.boCode = MaterialSerialEditApp.BUSINESS_OBJECT_CODE;
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
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.MaterialSerial();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showMaterialSerial(this.editData);
            }
            run(): void;
            run(data: bo.MaterialSerial): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.MaterialSerial)) {
                    let data: bo.MaterialSerial = arguments[0];
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
                        boRepository.fetchMaterialSerial({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSerial>): void {
                                let data: bo.MaterialSerial;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.MaterialSerial)) {
                                    // 查询到了有效数据
                                    that.editData = data;
                                    that.show();
                                } else {
                                    // 数据重新检索无效
                                    that.messages({
                                        type: ibas.emMessageType.ERROR,
                                        message: ibas.i18n.prop("shell_data_fetched_none")
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
                boRepository.saveMaterialSerial({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSerial>): void {
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
        /** 视图-物料序列 */
        export interface IMaterialSerialEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showMaterialSerial(data: bo.MaterialSerial): void;
            /** 选择物料规格 */
            chooseSpecificationEvent: Function;
            /** 选择物料版本 */
            chooseVersionEvent: Function;
        }
    }
}