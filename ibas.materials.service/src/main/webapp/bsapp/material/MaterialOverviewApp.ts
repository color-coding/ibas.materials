/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
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
                this.view.chooseMaterialOverViewPriceListEvent = this.chooseMaterialOverViewPriceList;
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
                boRepository.fetchMaterial({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Material>): void {
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
                            that.view.showMaterials(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }

            /** 查询物料所有相关信息 */
            /** 查询物料所有相关信息 */
            protected fetchMaterialAllInformation(data: bo.Material): void {
                this.busy(true);
                let that: this = this;
                if (ibas.objects.isNull(data)) {
                    that.messages({
                        type: ibas.emMessageType.WARNING,
                        message: "请点击选择所需查看商品"
                    });
                    that.busy(false);
                    return;
                }
                if (ibas.objects.isNull(this.beShowedPriceList)) {
                    that.messages({
                        type: ibas.emMessageType.WARNING,
                        message: "请选择查看所基于的商品价格清单"
                    });
                    that.busy(false);
                    return;
                } else {
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    // 查询物料即时信息
                    boRepository.fetchMaterial({
                        criteria: [
                            new ibas.Condition("Code",
                                ibas.emConditionOperation.EQUAL, ibas.strings.valueOf(data.code)),
                        ],
                        onCompleted(opRslt: ibas.IOperationResult<bo.Material>): void {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                if (opRslt.resultObjects.length !== 0) {
                                    that.view.showMaterial(opRslt.resultObjects.firstOrDefault());
                                }
                            } catch (error) {
                                that.messages(error);
                            }
                        }
                    });
                    // 查询物料库存、已承诺、已定购总量
                    boRepository.fetchMaterialQuantity({
                        criteria: [
                            new ibas.Condition("ItemCode",
                                ibas.emConditionOperation.EQUAL, ibas.strings.valueOf(data.code)),
                        ],
                        onCompleted(opRslt: ibas.IOperationResult<bo.MaterialQuantity>): void {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                if (opRslt.resultObjects.length !== 0) {
                                    that.view.showMaterialQuantity(opRslt.resultObjects.firstOrDefault());
                                }
                            } catch (error) {
                                that.messages(error);
                            }
                        }
                    });
                    // 查询物料库存
                    boRepository.fetchMaterialInventory({
                        criteria: [
                            new ibas.Condition("ItemCode",
                                ibas.emConditionOperation.EQUAL, ibas.strings.valueOf(data.code)),
                        ],
                        onCompleted(opRslt: ibas.IOperationResult<bo.MaterialInventory>): void {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                if (opRslt.resultObjects.length !== 0) {
                                    that.view.showMaterialInventory(opRslt.resultObjects, true);
                                }
                            } catch (error) {
                                that.messages(error);
                            }
                        }
                    });
                    // 查询物料价格条件
                    let criteria: ibas.Criteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.relationship = ibas.emConditionRelationship.AND;
                    condition.alias = app.conditions.materialprice.CONDITION_ALIAS_PRICELIST;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = that.beShowedPriceList.objectKey.toString();
                    let condition1: ibas.ICondition = criteria.conditions.create();
                    condition1.relationship = ibas.emConditionRelationship.AND;
                    condition1.alias = "ItemCode";
                    condition1.operation = ibas.emConditionOperation.EQUAL;
                    condition1.value = data.code;
                    boRepository.fetchMaterialPrice({
                        criteria: criteria,
                        onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPrice>): void {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                if (opRslt.resultObjects.length !== 0) {
                                    that.view.showMaterialPrice(opRslt.resultObjects, true);
                                }
                            } catch (error) {
                                that.messages(error);
                            }
                        }
                    });
                    if (data.batchManagement === 1) {
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
                                    if (opRslt.resultObjects.length !== 0) {
                                        that.view.showMaterialBatch(opRslt.resultObjects);
                                    }
                                } catch (error) {
                                    that.messages(error);
                                }
                            }
                        });
                    }
                    if (data.serialManagement === 1) {
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
                                    if (opRslt.resultObjects.length !== 0) {
                                        that.view.showMaterialSerial(opRslt.resultObjects);
                                    }
                                } catch (error) {
                                    that.messages(error);
                                }
                            }
                        });
                    }
                }
                that.busy(false);
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
            protected beShowedPriceList: bo.MaterialPriceList;
            /** 物料总览选择价格清单 */
            private chooseMaterialOverViewPriceList(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.MaterialPriceList>({
                    boCode: bo.BO_CODE_MATERIALPRICELIST,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [],
                    onCompleted(selecteds: ibas.IList<bo.MaterialPriceList>): void {
                        that.view.showBeShowedPriceList(selecteds);
                        that.beShowedPriceList = selecteds.firstOrDefault();
                    }
                });
            }
        }
        /** 视图-物料 */
        export interface IMaterialOverviewView extends ibas.IBOListView {
            /** 编辑物料事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 显示数据 */
            showMaterials(datas: bo.Material[]): void;
            /** 显示物料基础信息 */
            showMaterial(datas: bo.Material): void;
            /** 显示物料库存、已定购、已承诺总量 */
            showMaterialQuantity(data: bo.MaterialQuantity): void;
            /** 显示物料库存信息 */
            showMaterialInventory(datas: bo.MaterialInventory[], dataIsChange: any): void;
            /** 显示物料价格信息 */
            showMaterialPrice(datas: bo.MaterialPrice[], dataIsChange: boolean): void;
            /** 显示物料批次信息 */
            showMaterialBatch(datas: bo.MaterialBatch[]): void;
            /** 显示物料序列信息 */
            showMaterialSerial(datas: bo.MaterialSerial[]): void;
            /** 查询物料相关信息 */
            fetchMaterialAllInformationEvent: Function;
            /** 物料总览选择价格清单 */
            chooseMaterialOverViewPriceListEvent: Function;
            /** 显示用户选择的价格清单 */
            showBeShowedPriceList(datas: bo.MaterialPriceList[]): void;
        }
    }
}