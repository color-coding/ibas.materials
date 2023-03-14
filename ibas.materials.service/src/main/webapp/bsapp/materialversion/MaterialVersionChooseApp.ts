/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 选择应用-物料版本 */
        export class MaterialVersionChooseApp extends ibas.BOChooseService<IMaterialVersionChooseView, bo.MaterialVersion> {
            /** 应用标识 */
            static APPLICATION_ID: string = "961db3f9-fdf9-4a90-8abc-507ade00161e";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialversion_choose";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialVersion.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialVersionChooseApp.APPLICATION_ID;
                this.name = MaterialVersionChooseApp.APPLICATION_NAME;
                this.boCode = MaterialVersionChooseApp.BUSINESS_OBJECT_CODE;
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
                super.viewShowed();
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialVersion({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialVersion>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 1
                                && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true) && !that.isViewShowed()) {
                                // 仅一条数据，直接选择
                                that.chooseData(opRslt.resultObjects);
                            } else {
                                if (!that.isViewShowed()) {
                                    // 没显示视图，先显示
                                    that.show();
                                }
                                if (opRslt.resultObjects.length === 0) {
                                    that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                                }
                                that.view.showData(opRslt.resultObjects);
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 新建数据 */
            protected newData(): void {
                // 关闭自身
                this.destroy();
                let app: MaterialVersionEditApp = new MaterialVersionEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.MaterialVersion): void {
                // 关闭自身
                this.destroy();
                if (ibas.objects.isNull(data)) {
                    let app: MaterialVersionListApp = new MaterialVersionListApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.run();
                } else {
                    let app: MaterialVersionEditApp = new MaterialVersionEditApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.run(data);
                }
            }
        }
        /** 视图-物料版本 */
        export interface IMaterialVersionChooseView extends ibas.IBOChooseView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.MaterialVersion[]): void;
        }
        /** 物料版本选择服务映射 */
        export class MaterialVersionChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialVersionChooseApp.APPLICATION_ID;
                this.name = MaterialVersionChooseApp.APPLICATION_NAME;
                this.boCode = MaterialVersionChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.MaterialVersion> {
                return new MaterialVersionChooseApp();
            }
        }
    }
}
