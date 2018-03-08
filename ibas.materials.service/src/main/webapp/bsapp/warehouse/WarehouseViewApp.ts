/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 查看应用-仓库 */
        export class WarehouseViewApp extends ibas.BOViewService<IWarehouseViewView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "f44c9126-35fc-4f35-b864-0a968ab0afb6";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_warehouse_view";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Warehouse.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = WarehouseViewApp.APPLICATION_ID;
                this.name = WarehouseViewApp.APPLICATION_NAME;
                this.boCode = WarehouseViewApp.BUSINESS_OBJECT_CODE;
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
                if (ibas.objects.isNull(this.viewData)) {
                    // 创建编辑对象实例
                    this.viewData = new bo.Warehouse();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showWarehouse(this.viewData);
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(): void {
                let app: WarehouseEditApp = new WarehouseEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.viewData);
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.Warehouse): void;
            run(): void {
                if (ibas.objects.instanceOf(arguments[0], bo.Warehouse)) {
                    this.viewData = arguments[0];
                    this.show();
                } else {
                    super.run.apply(this, arguments);
                }
            }
            private viewData: bo.Warehouse;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria | string): void {
                this.busy(true);
                let that: this = this;
                if (typeof criteria === "string") {
                    criteria = new ibas.Criteria();
                    // 添加查询条件

                }
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchWarehouse({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Warehouse>): void {
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
                return [
                    new ibas.BOServiceProxy({
                        data: this.viewData,
                        converter: new bo.DataConverter()
                    })
                ];
            }
        }
        /** 视图-仓库 */
        export interface IWarehouseViewView extends ibas.IBOViewView {
            showWarehouse(data: bo.Warehouse): void;
        }
        /** 仓库连接服务映射 */
        export class WarehouseLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = WarehouseViewApp.APPLICATION_ID;
                this.name = WarehouseViewApp.APPLICATION_NAME;
                this.boCode = WarehouseViewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOLinkServiceCaller> {
                return new WarehouseViewApp();
            }
        }
    }
}