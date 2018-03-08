/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 查看应用-库存发货 */
        export class GoodsIssueViewApp extends ibas.BOViewService<IGoodsIssueViewView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "0f7bd14e-f07f-4baa-bce8-07e0a2b4a17b";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_goodsissue_view";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.GoodsIssue.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = GoodsIssueViewApp.APPLICATION_ID;
                this.name = GoodsIssueViewApp.APPLICATION_NAME;
                this.boCode = GoodsIssueViewApp.BUSINESS_OBJECT_CODE;
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
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.viewData = new bo.GoodsIssue();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showGoodsIssue(this.viewData);
                this.view.showGoodsIssueLines(this.viewData.goodsIssueLines.filterDeleted());
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(): void {
                let app: GoodsIssueEditApp = new GoodsIssueEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.viewData);
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.GoodsIssue): void;
            run(): void {
                if (ibas.objects.instanceOf(arguments[0], bo.GoodsIssue)) {
                    this.viewData = arguments[0];
                    this.show();
                } else {
                    super.run.apply(this, arguments);
                }
            }
            private viewData: bo.GoodsIssue;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria | string): void {
                this.busy(true);
                let that: this = this;
                if (typeof criteria === "string") {
                    criteria = new ibas.Criteria();
                    // 添加查询条件

                }
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchGoodsIssue({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.GoodsIssue>): void {
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
        /** 视图-库存发货 */
        export interface IGoodsIssueViewView extends ibas.IBOViewView {
            /** 显示数据 */
            showGoodsIssue(data: bo.GoodsIssue): void;
            /** 显示数据 */
            showGoodsIssueLines(datas: bo.GoodsIssueLine[]): void;
        }
        /** 库存发货连接服务映射 */
        export class GoodsIssueLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = GoodsIssueViewApp.APPLICATION_ID;
                this.name = GoodsIssueViewApp.APPLICATION_NAME;
                this.boCode = GoodsIssueViewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOLinkServiceCaller> {
                return new GoodsIssueViewApp();
            }
        }
    }
}