/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 查看应用-物料版本 */
        export class MaterialVersionViewApp extends ibas.BOViewService<IMaterialVersionViewView, bo.MaterialVersion> {
            /** 应用标识 */
            static APPLICATION_ID: string = "264a9273-d40d-42aa-b274-9a6f2ef31dd7";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialversion_view";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialVersion.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialVersionViewApp.APPLICATION_ID;
                this.name = MaterialVersionViewApp.APPLICATION_NAME;
                this.boCode = MaterialVersionViewApp.BUSINESS_OBJECT_CODE;
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
                    this.viewData = new bo.MaterialVersion();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showMaterialVersion(this.viewData);
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(): void {
                let app: MaterialVersionEditApp = new MaterialVersionEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.viewData);
            }
            run(): void;
            run(data: bo.MaterialVersion): void;
            /** 运行 */
            run(): void {
                if (ibas.objects.instanceOf(arguments[0], bo.MaterialVersion)) {
                    this.viewData = arguments[0];
                    this.show();
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
                    condition.alias = bo.MaterialVersion.PROPERTY_OBJECTKEY_NAME;
                    condition.value = value;
                }
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialVersion({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialVersion>): void {
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
        /** 视图-物料版本 */
        export interface IMaterialVersionViewView extends ibas.IBOViewView {
            /** 显示数据 */
            showMaterialVersion(data: bo.MaterialVersion): void;

        }
        /** 物料版本连接服务映射 */
        export class MaterialVersionLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialVersionViewApp.APPLICATION_ID;
                this.name = MaterialVersionViewApp.APPLICATION_NAME;
                this.boCode = MaterialVersionViewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IBOLinkService {
                return new MaterialVersionViewApp();
            }
        }
    }
}
