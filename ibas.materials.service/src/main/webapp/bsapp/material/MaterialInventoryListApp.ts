/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 列表应用-物料库存 */
        export class MaterialInventoryListApp extends ibas.BOListApplication<IMaterialInventoryListView, bo.MaterialInventory> {
            /** 应用标识 */
            static APPLICATION_ID: string = "32c45fcd-47cd-4074-a853-4290967bcbbc";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialinventory_list";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialInventory.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialInventoryListApp.APPLICATION_ID;
                this.name = MaterialInventoryListApp.APPLICATION_NAME;
                this.boCode = MaterialInventoryListApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.fetchInventoryJournalEvent = this.fetchInventoryJournal;
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
                boRepository.fetchMaterialInventory({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialInventory>): void {
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
                            that.view.showInventories(opRslt.resultObjects);
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
            protected viewData(data: bo.MaterialInventory): void {
                throw new Error(ibas.i18n.prop("sys_unsupported_operation"));
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.MaterialInventory): void {
                throw new Error(ibas.i18n.prop("sys_unsupported_operation"));
            }
            /** 查询物料批次交易记录 */
            protected fetchInventoryJournal(criteria: ibas.ICriteria): void {
                // 检查目标数据
                if (ibas.objects.isNull(criteria) || criteria.conditions.length === 0) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "criteria"));
                }
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialInventoryJournal({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialInventoryJournal>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showInventoryJournals(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
        }
        /** 视图-物料库存 */
        export interface IMaterialInventoryListView extends ibas.IBOListView {
            /** 显示物料库存数据 */
            showInventories(datas: bo.MaterialInventory[]): void;
            /** 查询物料库存交易记录 */
            fetchInventoryJournalEvent: Function;
            /** 显示物料库存交易数据 */
            showInventoryJournals(datas: bo.MaterialInventoryJournal[]): void;
        }
    }
}