/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: fancy
 * @Date: 2017-11-30 17:59:34
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-25 17:25:44
 */


import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";

/** 查看应用-物料 */
export class MaterialBatchViewApp extends ibas.BOViewService<IMaterialBatchViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "bc7b94d5-5449-4257-b77b-39da8c5c4343";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialbatch_view";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.Material.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialBatchViewApp.APPLICATION_ID;
        this.name = MaterialBatchViewApp.APPLICATION_NAME;
        this.boCode = MaterialBatchViewApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        this.view.showMaterialBatch(this.viewData);
        this.view.showMaterialBatchJournal(this.journalData);
    }
    /** 运行,覆盖原方法 */
    run(): void;
    run(data: bo.MaterialBatch): void;
    run(): void {
        if (ibas.objects.instanceOf(arguments[0], bo.MaterialBatch)) {
            this.viewData = arguments[0];
            let criteria: ibas.ICriteria = new ibas.Criteria();
            let condition: ibas.ICondition = criteria.conditions.create();
            condition.alias = bo.MaterialBatchJournal.PROPERTY_BATCHCODE_NAME;
            condition.value = this.viewData.batchCode;
            condition.operation = ibas.emConditionOperation.EQUAL;
            // 查询日记账
            this.fetchJournalData(criteria);
            this.show();
        } else {
            super.run();
        }
    }
    private viewData: bo.MaterialBatch;
    private journalData: bo.MaterialBatchJournal[];
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria | string): void {
        this.busy(true);
        let that: this = this;
        if (typeof criteria === "string") {
            criteria = new ibas.Criteria();
        }
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialBatch({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatch>): void {
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

    protected fetchJournalData(criteria: ibas.ICriteria): void {
        this.busy(true);
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialBatchJournal({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatchJournal>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.journalData = opRslt.resultObjects;
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
/** 视图-物料 */
export interface IMaterialBatchViewView extends ibas.IBOViewView {
    /** 显示数据 */
    showMaterialBatch(data: bo.MaterialBatch): void;
    /** 显示凭证数据 */
    showMaterialBatchJournal(data: bo.MaterialBatchJournal[]): void;
}

