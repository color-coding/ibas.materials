/*
 * @Author: fancy
 * @Date: 2017-11-27 16:39:57
 * @Last Modified by:   fancy
 * @Last Modified time: 2017-11-27 16:39:57
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
import { DataConverter4mm } from "../../borep/DataConverters";
import { MaterialSerialViewApp } from "./MaterialSerialViewApp";

/** 列表应用-物料 */
export class MaterialSerialListApp extends ibas.BOListApplication<IMaterialSerialListView, bo.MaterialSerial> {


    /** 应用标识 */
    static APPLICATION_ID: string = "731d4301-610c-482e-a64e-51506c71fb55";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialserial_list";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.Material.BUSINESS_OBJECT_CODE;
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
        boRepository.fetchMaterialSerial({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSerial>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 0) {
                        that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                    }
                    that.view.showData(opRslt.resultObjects);
                    that.busy(false);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }
    protected viewData(data: bo.MaterialSerial): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("shell_data_view")
            ));
            return;
        }
        let app: MaterialSerialViewApp = new MaterialSerialViewApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(data);
    }
    protected newData(): void {
        throw new Error("Method not implemented.");
    }
    /** 获取服务的契约 */
    protected getServiceProxies(): ibas.IServiceProxy<ibas.IServiceContract>[] {
        return [
            new ibas.BOListServiceProxy({
                data: this.view.getSelecteds(),
                converter: new DataConverter4mm()
            })
        ];
    }
}
/** 视图-物料 */
export interface IMaterialSerialListView extends ibas.IBOListView {
    /** 显示数据 */
    showData(datas: bo.MaterialSerial[]): void;
    /** 获取选择的数据 */
    getSelecteds(): bo.MaterialSerial[];
}
