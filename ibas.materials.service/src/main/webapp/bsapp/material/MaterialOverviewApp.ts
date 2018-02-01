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
import { MaterialEditApp } from "./MaterialEditApp";

/** 列表应用-物料 */
export class MaterialOverviewApp extends ibas.BOListApplication<IMaterialOverviewView, bo.Material> {

    /** 应用标识 */
    static APPLICATION_ID: string = "70050fec-f2c8-4cf4-a0ef-770ea7cb6ce4";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialoverview";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.Material.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialOverviewApp.APPLICATION_ID;
        this.name = MaterialOverviewApp.APPLICATION_NAME;
        this.boCode = MaterialOverviewApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.editDataEvent = this.editData;
        this.view.fetchMaterialAllInformationEvent = this.fetchMaterialAllInformation;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** 查询物料清单 */
    protected fetchData(criteria: ibas.ICriteria): void {
        this.busy(true);
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterial({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.Material>): void {
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
                    that.view.showMaterials(opRslt.resultObjects);
                    that.busy(false);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }

    /** 查询物料所有相关信息 */
    protected fetchMaterialAllInformation(data: bo.Material): void {
        this.busy(true);
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        // 查询物料价格
        /* boRepository.fetchMaterialPrice({
            criteria: [
                new ibas.Condition("ItemCode",
                    ibas.emConditionOperation.EQUAL, ibas.strings.valueOf(data.code)),
            ],
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPrice>): void {
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
                    that.view.showMaterialPrices(opRslt.resultObjects);
                    that.busy(false);
                } catch (error) {
                    that.messages(error);
                }
            }
        }); */
        // 查询物料库存
        /* boRepository.fetchMaterialInventory({
            criteria: [
                new ibas.Condition("ItemCode",
                    ibas.emConditionOperation.EQUAL, ibas.strings.valueOf(data.code)),
            ],
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialInventory>): void {
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
                    that.view.showMaterialInventory(opRslt.resultObjects);
                    that.busy(false);
                } catch (error) {
                    that.messages(error);
                }
            }
        }); */
        let inventoryCount: bo.MaterialInventory[];
        // 查询物料库存行
        boRepository.fetchMaterialInventory({
            criteria: [
                new ibas.Condition("ItemCode",
                    ibas.emConditionOperation.EQUAL, ibas.strings.valueOf(data.code)),
            ],
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialInventory>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 0) {
                        that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                    }
                    inventoryCount = opRslt.resultObjects;
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        // 查询物料库存行
        boRepository.fetchMaterialInventoryJournal({
            criteria: [
                new ibas.Condition("ItemCode",
                    ibas.emConditionOperation.EQUAL, ibas.strings.valueOf(data.code)),
            ],
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialInventoryJournal>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 0) {
                        that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                    }
                    that.view.showMaterialInventoryJournal(opRslt.resultObjects, inventoryCount);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        // 查询物料批次
        boRepository.fetchMaterialBatch({
            criteria: [
                new ibas.Condition("ItemCode",
                    ibas.emConditionOperation.EQUAL, ibas.strings.valueOf(data.code)),
            ],
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
                    that.view.showMaterialBatch(opRslt.resultObjects);
                    that.busy(false);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        // 查询物料序列
        boRepository.fetchMaterialSerial({
            criteria: [
                new ibas.Condition("ItemCode",
                    ibas.emConditionOperation.EQUAL, ibas.strings.valueOf(data.code)),
            ],
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSerial>): void {
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
                    that.view.showMaterialSerial(opRslt.resultObjects);
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
        let app: MaterialEditApp = new MaterialEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
    /** 查看数据，参数：目标数据 */
    protected viewData(data: bo.Material): void {
        throw new Error(ibas.i18n.prop("sys_unsupported_operation"));
    }
    /** 编辑物料，参数：目标数据 */
    protected editData(data: bo.Material): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("shell_data_edit")
            ));
            return;
        }
        let app: MaterialEditApp = new MaterialEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(data);
    }
    /** 获取服务的契约 */
    protected getServiceProxies(): ibas.IServiceProxy<ibas.IServiceContract>[] {
        return [];
    }
}
/** 视图-物料 */
export interface IMaterialOverviewView extends ibas.IBOListView {
    /** 编辑物料事件，参数：编辑对象 */
    editDataEvent: Function;
    /** 显示物料清单 */
    showMaterials(datas: bo.Material[]): void;
    /** 显示物料价格 */
    showMaterialPrices(datas: bo.MaterialPrice[]): void;
    /** 显示物料库存 */
    showMaterialInventoryJournal(itemdatas: bo.MaterialInventoryJournal[], datas: bo.MaterialInventory[]): void;
    /** 显示物料批次 */
    showMaterialBatch(datas: bo.MaterialBatch[]): void;
    /** 显示物料序列 */
    showMaterialSerial(datas: bo.MaterialSerial[]): void;
    /** 查询物料所有相关信息 */
    fetchMaterialAllInformationEvent: Function;
}
