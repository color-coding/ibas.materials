/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 选择应用-计划组 */
        export class SchedulingGroupChooseApp extends ibas.BOChooseService<ISchedulingGroupChooseView, bo.SchedulingGroup> {
            /** 应用标识 */
            static APPLICATION_ID: string = "524fcff9-0641-4b4d-be01-95c90654d268";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_schedulinggroup_choose";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.SchedulingGroup.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = SchedulingGroupChooseApp.APPLICATION_ID;
                this.name = SchedulingGroupChooseApp.APPLICATION_NAME;
                this.boCode = SchedulingGroupChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
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
                boRepository.fetchSchedulingGroup({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.SchedulingGroup>): void {
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
                // 调用编辑应用
                let app: SchedulingGroupEditApp = new SchedulingGroupEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
        }
        /** 视图-计划组 */
        export interface ISchedulingGroupChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.SchedulingGroup[]): void;
        }
        /** 计划组选择服务映射 */
        export class SchedulingGroupChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = SchedulingGroupChooseApp.APPLICATION_ID;
                this.name = SchedulingGroupChooseApp.APPLICATION_NAME;
                this.boCode = SchedulingGroupChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.SchedulingGroup> {
                return new SchedulingGroupChooseApp();
            }
        }
    }
}
