/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 列表应用-物料序列 */
        export class MaterialSerialListApp extends ibas.BOListApplication<IMaterialSerialListView, bo.MaterialSerial> {
            /** 应用标识 */
            static APPLICATION_ID: string = "38fba82b-29d1-4990-80ca-a4b5d0de6141";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialserial_list";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialSerial.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSerialListApp.APPLICATION_ID;
                this.name = MaterialSerialListApp.APPLICATION_NAME;
                this.boCode = MaterialSerialListApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.editDataEvent = this.editData;
                this.view.fetchSerialJournalEvent = this.fetchSerialJournal;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialSerial({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSerial>): void {
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
                            that.view.showSerials(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 新建数据 */
            protected newData(): void {
                throw new Error(ibas.i18n.prop("sys_unsupported_operation"));
            }
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.MaterialSerial): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    ));
                    return;
                }
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.MaterialSerial): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                let app: MaterialSerialEditApp = new MaterialSerialEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(data);
            }
            /** 查询物料批次交易记录 */
            protected fetchSerialJournal(criteria: ibas.ICriteria): void {
                // 检查目标数据
                if (ibas.objects.isNull(criteria) || criteria.conditions.length === 0) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "criteria"));
                }
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialSerialJournal({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSerialJournal>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showSerialJournals(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
        }
        /** 视图-物料序列 */
        export interface IMaterialSerialListView extends ibas.IBOListView {
            /** 编辑数据事件 */
            editDataEvent: Function;
            /** 显示物料批次数据 */
            showSerials(datas: bo.MaterialSerial[]): void;
            /** 查询物料批次交易记录 */
            fetchSerialJournalEvent: Function;
            /** 显示物料批次交易数据 */
            showSerialJournals(datas: bo.MaterialSerialJournal[]): void;
        }
    }
}