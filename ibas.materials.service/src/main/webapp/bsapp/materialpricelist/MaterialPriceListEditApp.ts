/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 编辑应用-物料价格清单 */
        export class MaterialPriceListEditApp extends ibas.BOEditApplication<IMaterialPriceListEditView, bo.MaterialPriceList> {
            /** 应用标识 */
            static APPLICATION_ID: string = "7320a35f-de7d-4afa-8ccb-a1e1210d4e99";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialpricelist_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialPriceList.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialPriceListEditApp.APPLICATION_ID;
                this.name = MaterialPriceListEditApp.APPLICATION_NAME;
                this.boCode = MaterialPriceListEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.chooseBasedOnMaterialPriceListEvent = this.chooseBasedOnMaterialPriceList;
                this.view.chooseFloorMaterialPriceListEvent = this.chooseFloorOnMaterialPriceList;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.MaterialPriceList();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showMaterialPriceList(this.editData);
            }
            run(): void;
            run(data: bo.MaterialPriceList): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.MaterialPriceList)) {
                    let data: bo.MaterialPriceList = arguments[0];
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
                        criteria.noChilds = true;// 不加载子项
                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        boRepository.fetchMaterialPriceList({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPriceList>): void {
                                let data: bo.MaterialPriceList;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.MaterialPriceList)) {
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
                boRepository.saveMaterialPriceList({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPriceList>): void {
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
            /** 选择基于的价格清单 */
            private chooseBasedOnMaterialPriceList(): void {
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                criteria.noChilds = true;
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME;
                condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                condition.value = this.editData.objectKey ? ibas.strings.valueOf(this.editData.objectKey) : "0";
                ibas.servicesManager.runChooseService<bo.MaterialPriceList>({
                    boCode: bo.MaterialPriceList.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<bo.MaterialPriceList>): void {
                        that.editData.basedOnList = selecteds.firstOrDefault().objectKey;
                        that.editData.factor = 1;
                    }
                });
            }
            /** 选择底价价格清单 */
            private chooseFloorOnMaterialPriceList(): void {
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                criteria.noChilds = true;
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME;
                condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                condition.value = "0";
                ibas.servicesManager.runChooseService<bo.MaterialPriceList>({
                    boCode: bo.MaterialPriceList.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<bo.MaterialPriceList>): void {
                        that.editData.floorList = selecteds.firstOrDefault().objectKey;
                    }
                });
            }

        }
        /** 视图-物料价格清单 */
        export interface IMaterialPriceListEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showMaterialPriceList(data: bo.MaterialPriceList): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 选择基于的价格清单 */
            chooseBasedOnMaterialPriceListEvent: Function;
            /** 选择底价价格清单 */
            chooseFloorMaterialPriceListEvent: Function;
        }
    }
}