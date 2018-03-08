/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 查看应用-物料价格清单 */
        export class MaterialPriceListViewApp extends ibas.BOViewService<IMaterialPriceListViewView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "e6349f36-c032-41f2-9d44-b0a81efba9b1";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialpricelist_view";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialPriceList.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialPriceListViewApp.APPLICATION_ID;
                this.name = MaterialPriceListViewApp.APPLICATION_NAME;
                this.boCode = MaterialPriceListViewApp.BUSINESS_OBJECT_CODE;
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
                // 视图加载完成
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(): void {
                let app: MaterialPriceListEditApp = new MaterialPriceListEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.viewData);
            }
            run(): void;
            run(data: bo.MaterialPriceList): void;
            /** 运行 */
            run(): void {
                if (ibas.objects.instanceOf(arguments[0], bo.MaterialPriceList)) {
                    this.viewData = arguments[0];
                    this.show();
                } else {
                    super.run.apply(this, arguments);
                }
            }
            private viewData: bo.MaterialPriceList;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria | string): void {
                this.busy(true);
                let that: this = this;
                if (typeof criteria === "string") {
                    criteria = new ibas.Criteria();
                    // 添加查询条件

                }
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialPriceList({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPriceList>): void {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.viewData = opRslt.resultObjects.firstOrDefault();
                            that.viewShowed();
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 获取服务的契约 */
            protected getServiceProxies(): ibas.IServiceProxy<ibas.IServiceContract>[] {
                return [];
            }
        }
        /** 视图-物料价格清单 */
        export interface IMaterialPriceListViewView extends ibas.IBOViewView {

        }
        /** 物料价格清单连接服务映射 */
        export class MaterialPriceListLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialPriceListViewApp.APPLICATION_ID;
                this.name = MaterialPriceListViewApp.APPLICATION_NAME;
                this.boCode = MaterialPriceListViewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IBOLinkService {
                return new MaterialPriceListViewApp();
            }
        }
    }
}