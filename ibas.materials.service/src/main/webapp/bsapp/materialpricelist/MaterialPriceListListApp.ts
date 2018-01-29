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
import { MaterialPriceListViewApp } from "./MaterialPriceListViewApp";
import { MaterialPriceListEditApp } from "./MaterialPriceListEditApp";

/** 列表应用-物料价格清单 */
export class MaterialPriceListListApp extends ibas.BOListApplication<IMaterialPriceListListView, bo.MaterialPriceList> {

    /** 应用标识 */
    static APPLICATION_ID: string = "33c3d1e1-2710-4cb4-b437-7b70f51efe78";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialpricelist_list";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.MaterialPriceList.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialPriceListListApp.APPLICATION_ID;
        this.name = MaterialPriceListListApp.APPLICATION_NAME;
        this.boCode = MaterialPriceListListApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.editDataEvent = this.editData;
        this.view.deleteDataEvent = this.deleteData;
        this.view.fetchPriceEvent = this.fetchPrice;
        this.view.savePriceListItemEvent = this.savePriceListItem;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria): void {
        this.busy(true);
        criteria.noChilds = true;// 不加载子项
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialPriceList({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPriceList>): void {
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
                    that.view.showPriceList(opRslt.resultObjects);
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
        let app: MaterialPriceListEditApp = new MaterialPriceListEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
    /** 查看数据，参数：目标数据 */
    protected viewData(data: bo.MaterialPriceList): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("shell_data_view")
            ));
            return;
        }
        let app: MaterialPriceListViewApp = new MaterialPriceListViewApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(data);

    }
    /** 编辑数据，参数：目标数据 */
    protected editData(data: bo.MaterialPriceList): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("shell_data_edit")
            ));
            return;
        }
        let app: MaterialPriceListEditApp = new MaterialPriceListEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(data);
    }
    /** 删除数据，参数：目标数据集合 */
    protected deleteData(data: bo.MaterialPriceList | bo.MaterialPriceList[]): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("shell_data_delete")
            ));
            return;
        }
        let beDeleteds: ibas.ArrayList<bo.MaterialPriceList> = new ibas.ArrayList<bo.MaterialPriceList>();
        if (data instanceof Array) {
            for (let item of data) {
                item.delete();
                beDeleteds.add(item);
            }
        } else {
            data.delete();
            beDeleteds.add(data);
        }
        // 没有选择删除的对象
        if (beDeleteds.length === 0) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("shell_data_delete")
            ));
            return;
        }
        let that: this = this;
        this.messages({
            type: ibas.emMessageType.QUESTION,
            title: ibas.i18n.prop(this.name),
            message: ibas.i18n.prop("shell_whether_to_delete", beDeleteds.length),
            actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
            onCompleted(action: ibas.emMessageAction): void {
                if (action === ibas.emMessageAction.YES) {
                    try {
                        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
                        let saveMethod: Function = function (beSaved: bo.MaterialPriceList): void {
                            boRepository.saveMaterialPriceList({
                                beSaved: beSaved,
                                onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPriceList>): void {
                                    try {
                                        if (opRslt.resultCode !== 0) {
                                            throw new Error(opRslt.message);
                                        }
                                        // 保存下一个数据
                                        let index: number = beDeleteds.indexOf(beSaved) + 1;
                                        if (index > 0 && index < beDeleteds.length) {
                                            saveMethod(beDeleteds[index]);
                                        } else {
                                            // 处理完成
                                            that.busy(false);
                                            that.messages(ibas.emMessageType.SUCCESS,
                                                ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                                        }
                                    } catch (error) {
                                        that.messages(ibas.emMessageType.ERROR,
                                            ibas.i18n.prop("shell_data_delete_error", beSaved, error.message));
                                    }
                                }
                            });
                            that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_deleting", beSaved));
                        };
                        that.busy(true);
                        // 开始保存
                        saveMethod(beDeleteds.firstOrDefault());
                    } catch (error) {
                        that.busy(false);
                        that.messages(error);
                    }
                }
            }
        });
    }
    /** 获取服务的契约 */
    protected getServiceProxies(): ibas.IServiceProxy<ibas.IServiceContract>[] {
        return [];
    }
    /** 查询价格 */
    protected fetchPrice(criteria: ibas.ICriteria): void {
        // 检查目标数据
        if (ibas.objects.isNull(criteria) || criteria.conditions.length === 0) {
            throw new Error(ibas.i18n.prop("sys_invalid_parameter", "criteria"));
        }
        this.busy(true);
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialPrice({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPrice>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 0) {
                        that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                    }
                    that.view.showPrices(opRslt.resultObjects);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }
    /** 保存价格清单项目 */
    protected savePriceListItem(data: bo.MaterialPriceItem | bo.MaterialPriceItem[]): void {
        let beSaved: bo.MaterialPriceList = new bo.MaterialPriceList();
        beSaved.isSavable = false;// 主对象不保存
        beSaved.markOld(true);
        if (data instanceof Array) {
            for (let item of data) {
                if (!ibas.objects.instanceOf(item, bo.MaterialPriceItem)) {
                    continue;
                }
                beSaved.materialPriceItems.add(item);
                beSaved.objectKey = item.objectKey;
            }
        } else if (ibas.objects.instanceOf(data, bo.MaterialPriceItem)) {
            beSaved.objectKey = data.objectKey;
            beSaved.materialPriceItems.add(data);
        }
        // 没有选择删除的对象
        if (beSaved.materialPriceItems.length === 0) {
            return;
        }
        let that: this = this;
        that.busy(true);
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.saveMaterialPriceList({
            beSaved: beSaved,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPriceList>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.messages(ibas.emMessageType.SUCCESS,
                        ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                } catch (error) {
                    that.messages(ibas.emMessageType.ERROR,
                        ibas.i18n.prop("shell_data_delete_error", beSaved, error.message));
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
    }
}
/** 视图-物料价格清单 */
export interface IMaterialPriceListListView extends ibas.IBOListView {
    /** 编辑数据事件，参数：编辑对象 */
    editDataEvent: Function;
    /** 删除数据事件，参数：删除对象集合 */
    deleteDataEvent: Function;
    /** 显示数据 */
    showPriceList(datas: bo.MaterialPriceList[]): void;
    /** 查询价格事件 */
    fetchPriceEvent: Function;
    /** 显示数据 */
    showPrices(datas: bo.MaterialPrice[]): void;
    /** 保存价格项目事件 */
    savePriceListItemEvent: Function;
}
