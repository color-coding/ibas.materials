/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";
import { DataConverter4MM } from "../../borep/DataConverters";
import { MaterialBatchEditApp } from "./MaterialBatchEditApp";

/** 列表应用-物料批次 */
export class MaterialBatchListApp extends ibas.BOListApplication<IMaterialBatchListView, bo.MaterialBatch> {

    /** 应用标识 */
    static APPLICATION_ID: string = "9944f917-1aa2-4972-bc71-5b9ab908a43c";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialbatch_list";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.MaterialBatch.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialBatchListApp.APPLICATION_ID;
        this.name = MaterialBatchListApp.APPLICATION_NAME;
        this.boCode = MaterialBatchListApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.editDataEvent = this.editData;
        this.view.fetchBatchJournalEvent = this.fetchBatchJournal;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria): void {
        this.busy(true);
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialBatch({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatch>): void {
                try {
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
                    that.view.showBatches(opRslt.resultObjects);
                    that.busy(false);
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
    protected viewData(data: bo.MaterialBatch): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("shell_data_view")
            ));
            return;
        }
    }
    /** 编辑数据，参数：目标数据 */
    protected editData(data: bo.MaterialBatch): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("shell_data_edit")
            ));
            return;
        }
        let app: MaterialBatchEditApp = new MaterialBatchEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(data);
    }
    /** 获取服务的契约 */
    protected getServiceProxies(): ibas.IServiceProxy<ibas.IServiceContract>[] {
        return [
        ];
    }
    /** 查询物料批次交易记录 */
    protected fetchBatchJournal(criteria: ibas.ICriteria): void {
        // 检查目标数据
        if (ibas.objects.isNull(criteria) || criteria.conditions.length === 0) {
            throw new Error(ibas.i18n.prop("sys_invalid_parameter", "criteria"));
        }
        this.busy(true);
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialBatchJournal({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatchJournal>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 0) {
                        that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                    }
                    that.view.showBatchJournals(opRslt.resultObjects);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }
}
/** 视图-物料批次 */
export interface IMaterialBatchListView extends ibas.IBOListView {
    /** 编辑数据事件，参数：编辑对象 */
    editDataEvent: Function;
    /** 显示物料批次数据 */
    showBatches(datas: bo.MaterialBatch[]): void;
    /** 查询物料批次交易记录 */
    fetchBatchJournalEvent: Function;
    /** 显示物料批次交易数据 */
    showBatchJournals(datas: bo.MaterialBatchJournal[]): void;
}
