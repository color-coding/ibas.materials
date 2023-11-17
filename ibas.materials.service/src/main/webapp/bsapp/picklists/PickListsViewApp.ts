/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 查看应用-拣配清单 */
        export class PickListsViewApp extends ibas.BOViewService<IPickListsViewView, bo.PickLists> {
            /** 应用标识 */
            static APPLICATION_ID: string = "9b54c2d5-bfee-414a-a0ec-ad41977ea76d";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_picklists_view";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.PickLists.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = PickListsViewApp.APPLICATION_ID;
                this.name = PickListsViewApp.APPLICATION_NAME;
                this.boCode = PickListsViewApp.BUSINESS_OBJECT_CODE;
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
                    this.viewData = new bo.PickLists();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showPickLists(this.viewData);
                this.view.showPickListsLines(this.viewData.pickListsLines.filterDeleted());
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(): void {
                let app: PickListsEditApp = new PickListsEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.viewData);
            }
            run(): void;
            run(data: bo.PickLists): void;
            run(): void {
                if (arguments[0] instanceof bo.PickLists) {
                    let data: bo.PickLists = arguments[0];
                    if (data.isNew) {
                        this.viewData = data;
                        this.show();
                    } else {
                        let criteria: ibas.ICriteria = data.criteria();
                        if (criteria?.conditions.length > 0) {
                            // 有效的查询对象查询
                            let that: this = this;
                            let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                            boRepository.fetchPickLists({
                                criteria: criteria,
                                onCompleted(opRslt: ibas.IOperationResult<bo.PickLists>): void {
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
                if (typeof criteria === "string") {
                    let condition: ibas.ICondition;
                    let value: string = criteria;
                    criteria = new ibas.Criteria();
                    criteria.result = 1;
                    condition = criteria.conditions.create();
                    condition.alias = bo.PickLists.PROPERTY_OBJECTKEY_NAME;
                    condition.value = value;
                }
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchPickLists({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.PickLists>): void {
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
        /** 视图-拣配清单 */
        export interface IPickListsViewView extends ibas.IBOViewView {
            /** 显示数据 */
            showPickLists(data: bo.PickLists): void;
            /** 显示数据-拣配清单-行 */
            showPickListsLines(datas: bo.PickListsLine[]): void;

        }
        /** 拣配清单连接服务映射 */
        export class PickListsLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = PickListsViewApp.APPLICATION_ID;
                this.name = PickListsViewApp.APPLICATION_NAME;
                this.boCode = PickListsViewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IBOLinkService {
                return new PickListsViewApp();
            }
        }
    }
}
