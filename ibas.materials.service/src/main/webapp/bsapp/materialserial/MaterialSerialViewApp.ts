/*
 * @Author: fancy
 * @Date: 2017-11-27 16:40:05
 * @Last Modified by:   fancy
 * @Last Modified time: 2017-11-27 16:40:05
 */
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

/** 查看应用-物料 */
export class MaterialSerialViewApp extends ibas.BOViewService<IMaterialSerialViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "d844d623-8716-4810-82fa-e077e8724e7c";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialserial_view";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.Material.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialViewApp.APPLICATION_ID;
        this.name = MaterialSerialViewApp.APPLICATION_NAME;
        this.boCode = MaterialSerialViewApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        this.view.showMaterialSerial(this.viewData);
        this.view.showMaterialSerialJournal(this.journalData);
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        if (arguments[0] instanceof bo.MaterialSerial) {
            this.viewData = arguments[0];
            let criteria: ibas.ICriteria = new ibas.Criteria();
            let condition: ibas.ICondition;
            condition = new ibas.Condition(bo.MaterialSerialJournal.PROPERTY_ITEMCODE_NAME
                , ibas.emConditionOperation.EQUAL
                , this.viewData.itemCode);
            criteria.conditions.add(condition);
            condition = new ibas.Condition(bo.MaterialSerialJournal.PROPERTY_WAREHOUSE_NAME
                , ibas.emConditionOperation.EQUAL
                , this.viewData.warehouse);
            condition.relationship = ibas.emConditionRelationship.AND;
            criteria.conditions.add(condition);
            this.fetchJournalData(criteria);
            this.show();
        } else {
            super.run();
        }
    }

    private journalData:bo.MaterialSerialJournal[];

    private viewData: bo.MaterialSerial;
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria | string): void {
        this.busy(true);
        let that: this = this;
        if (typeof criteria === "string") {
            criteria = new ibas.Criteria();
        }
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialSerial({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSerial>): void {
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
        boRepository.fetchMaterialSerialJournal({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSerialJournal>): void {
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
export interface IMaterialSerialViewView extends ibas.IBOViewView {
    /** 显示数据 */
    showMaterialSerial(data: bo.MaterialSerial): void;
    /** 显示凭证数据 */
    showMaterialSerialJournal(data: bo.MaterialSerialJournal[]): void;
}

