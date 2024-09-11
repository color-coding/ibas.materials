/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 查看应用-物料批次 */
        export class MaterialBatchViewApp extends ibas.BOViewService<IMaterialBatchViewView, bo.MaterialBatch> {
            /** 应用标识 */
            static APPLICATION_ID: string = "5cac6cb2-8365-4bb7-9ede-aa8420736ebc";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialbatch_view";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialBatch.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialBatchViewApp.APPLICATION_ID;
                this.name = MaterialBatchViewApp.APPLICATION_NAME;
                this.boCode = MaterialBatchViewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.editDataEvent = this.editData;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成，基类方法更新地址
                super.viewShowed();
                if (ibas.objects.isNull(this.viewData)) {
                    // 创建编辑对象实例
                    this.viewData = new bo.MaterialBatch();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showMaterialBatch(this.viewData);
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(): void {
                let app: MaterialBatchEditApp = new MaterialBatchEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.viewData);
            }
            run(): void;
            run(data: bo.MaterialBatch): void;
            run(): void {
                if (arguments[0] instanceof bo.MaterialBatch) {
                    let data: bo.MaterialBatch = arguments[0];
                    if (data.isNew) {
                        this.viewData = data;
                        this.show();
                    } else {
                        let criteria: ibas.ICriteria = data.criteria();
                        if (criteria?.conditions.length > 0) {
                            // 有效的查询对象查询
                            let that: this = this;
                            let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                            boRepository.fetchMaterialBatch({
                                criteria: criteria,
                                onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatch>): void {
                                    try {
                                        if (opRslt.resultCode !== 0) {
                                            throw new Error(opRslt.message);
                                        }
                                        if (opRslt.resultObjects.length > 0) {
                                            that.viewData = opRslt.resultObjects.firstOrDefault();
                                            that.show();
                                        } else {
                                            that.messages({
                                                type: ibas.emMessageType.WARNING,
                                                message: ibas.i18n.prop("shell_data_deleted_and_created"),
                                                onCompleted(): void {
                                                    that.show();
                                                }
                                            });
                                        }
                                    } catch (error) {
                                        that.messages(error);
                                    }
                                }
                            });
                        } else {
                            super.run.apply(this, arguments);
                        }
                    }
                } else {
                    super.run.apply(this, arguments);
                }
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria | string): void {
                this.busy(true);
                let that: this = this;
                if (typeof criteria === "number") {
                    criteria = String(criteria);
                }
                if (typeof criteria === "string") {
                    let value: string = criteria;
                    let condition: ibas.ICondition;
                    criteria = new ibas.Criteria();
                    criteria.result = 1;
                    if (value.indexOf(";")) {
                        let values: string[] = value.split(";");
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_ITEMCODE_NAME;
                        condition.value = values[0];
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME;
                        condition.value = values[1];
                        if (condition.value === "*" || condition.value === "%") {
                            condition.operation = ibas.emConditionOperation.CONTAIN;
                            condition.value = "%";
                        }
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_BATCHCODE_NAME;
                        condition.value = values[2];
                    } else {
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialBatch.PROPERTY_OBJECTKEY_NAME;
                        condition.value = value;
                    }
                }
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialBatch({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatch>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.viewData = opRslt.resultObjects.firstOrDefault();
                            if (!that.isViewShowed()) {
                                // 没显示视图，先显示
                                that.show();
                            } else {
                                that.viewShowed();
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
        }
        /** 视图-物料批次 */
        export interface IMaterialBatchViewView extends ibas.IBOViewView {
            /** 显示数据 */
            showMaterialBatch(data: bo.MaterialBatch): void;

        }
        /** 物料批次连接服务映射 */
        export class MaterialBatchLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialBatchViewApp.APPLICATION_ID;
                this.name = MaterialBatchViewApp.APPLICATION_NAME;
                this.boCode = MaterialBatchViewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IBOLinkService {
                return new MaterialBatchViewApp();
            }
        }
    }
}
