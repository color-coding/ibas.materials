/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace component {
            /**
             * 仓库选择-选择框
             */
            sap.extension.m.RepositorySelect.extend("materials.ui.component.WarehouseSelect", {
                metadata: {
                    properties: {
                    },
                    events: {
                    },
                },
                renderer: {
                },
                /** 重构设置 */
                applySettings(this: WarehouseSelect): WarehouseSelect {
                    let boRepository: ibas.BORepositoryApplication = this.getRepository();
                    if (ibas.objects.isNull(boRepository)) {
                        boRepository = sap.extension.variables.get(WarehouseSelect, "repository");
                        if (ibas.objects.isNull(boRepository)) {
                            boRepository = new bo.BORepositoryMaterials;
                            sap.extension.variables.set(boRepository, WarehouseSelect, "repository");
                        }
                        this.setRepository(boRepository);
                    }
                    let dataInfo: sap.extension.repository.IDataInfo = this.getDataInfo();
                    if (ibas.objects.isNull(dataInfo)) {
                        dataInfo = sap.extension.variables.get(WarehouseSelect, "dataInfo");
                        if (ibas.objects.isNull(dataInfo)) {
                            dataInfo = {
                                type: bo.Warehouse,
                                key: "Code",
                                text: "Name",
                            };
                            sap.extension.variables.set(dataInfo, WarehouseSelect, "dataInfo");
                        }
                        this.setDataInfo(dataInfo);
                    } else {
                        if (!dataInfo.type) {
                            dataInfo.type = bo.Warehouse;
                        } else if (!dataInfo.key) {
                            dataInfo.key = "Code";
                        } else if (!dataInfo.text) {
                            dataInfo.text = "Name";
                        }
                    }
                    let criteria: ibas.ICriteria | ibas.ICondition[] = this.getCriteria();
                    if (ibas.objects.isNull(criteria)) {
                        criteria = sap.extension.variables.get(WarehouseSelect, "criteria");
                        if (ibas.objects.isNull(criteria)) {
                            criteria = [
                                new ibas.Condition("Activated", ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES.toString())
                            ];
                            sap.extension.variables.set(criteria, WarehouseSelect, "criteria");
                        }
                        this.setCriteria(criteria);
                    }
                    if (SELECT_ITEM_CACHE.size > 0) {
                        SELECT_ITEM_CACHE.forEach((value, key) => {
                            sap.extension.m.RepositorySelect.prototype.addItem.call(this,
                                new sap.ui.core.ListItem("", {
                                    key: key,
                                    text: value
                                })
                            );
                        });
                    }
                    sap.extension.m.RepositorySelect.prototype.applySettings.apply(this, arguments);
                    return this;
                },
                addItem(this: WarehouseSelect, oItem: sap.ui.core.Item): WarehouseSelect {
                    if (!SELECT_ITEM_CACHE.has(oItem.getKey())) {
                        SELECT_ITEM_CACHE.set(oItem.getKey(), oItem.getText());
                    }
                    sap.extension.m.RepositorySelect.prototype.addItem.apply(this, arguments);
                    return this;
                }
            });
            const SELECT_ITEM_CACHE: Map<string, string> = new Map<string, string>();
        }
    }
}