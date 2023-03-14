/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 选择应用-物料废品率 */
        export class MaterialScrapChooseApp extends ibas.BOChooseService<IMaterialScrapChooseView, bo.MaterialScrap> {
            /** 应用标识 */
            static APPLICATION_ID: string = "950abdce-9632-4bfd-8ac8-8e39964ed669";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialscrap_choose";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialScrap.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialScrapChooseApp.APPLICATION_ID;
                this.name = MaterialScrapChooseApp.APPLICATION_NAME;
                this.boCode = MaterialScrapChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchMaterialScrap({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialScrap>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (!that.isViewShowed()) {
                                // 没显示视图，先显示
                                that.show();
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showData(opRslt.resultObjects);
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
                // 调用编辑应用
                let app: MaterialScrapEditApp = new MaterialScrapEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.MaterialScrap): void {
                // 关闭自身
                this.destroy();
                if (ibas.objects.isNull(data)) {
                    let app: MaterialScrapListApp = new MaterialScrapListApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.run();
                } else {
                    let app: MaterialScrapEditApp = new MaterialScrapEditApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.run(data);
                }
            }
        }
        /** 视图-物料废品率 */
        export interface IMaterialScrapChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.MaterialScrap[]): void;
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
        }
        /** 物料废品率选择服务映射 */
        export class MaterialScrapChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialScrapChooseApp.APPLICATION_ID;
                this.name = MaterialScrapChooseApp.APPLICATION_NAME;
                this.boCode = MaterialScrapChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.MaterialScrap> {
                return new MaterialScrapChooseApp();
            }
        }
    }
}
