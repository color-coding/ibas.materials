/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {

        /** 数据转换者 */
        export class DataConverter extends ibas.DataConverter4j {

            /** 创建业务对象转换者 */
            protected createConverter(): ibas.BOConverter {
                return new BOConverter;
            }
            /**
             * 转换数据
             * @param data 当前类型数据
             * @param sign 操作标记
             * @returns 转换的数据
             */
            convert(data: any, sign: string): any {
                if (sign === "changeMaterialNumbers") {
                    let newData: {
                        issue: GoodsIssue,
                        receipt: GoodsReceipt,
                        reservations: MaterialInventoryReservation[],
                    } = data;
                    let remote: bo4j.IMaterialNumberChange = {
                        type: "MaterialNumberChange",
                        Receipt: super.convert(newData.receipt, ""),
                        Issue: super.convert(newData.issue, ""),
                        Reservations: []
                    };
                    if (newData.reservations instanceof Array) {
                        for (let item of newData.reservations) {
                            remote.Reservations.push(super.convert(item, ""));
                        }
                    }
                    return remote;
                } else {
                    return super.convert(data, sign);
                }
            }
            /**
             * 解析业务对象数据
             * @param data 目标类型
             * @param sign 特殊标记
             * @returns 本地类型
             */
            parsing(data: any, sign: string): any {
                if (data.type === bo.SpecificationTree.name) {
                    let remote: bo4j.ISpecificationTree = data;
                    let newData: bo.SpecificationTree = new bo.SpecificationTree();
                    newData.name = remote.Name;
                    newData.remarks = remote.Remarks;
                    newData.template = remote.Template;
                    if (remote.Items instanceof Array) {
                        for (let item of remote.Items) {
                            item.type = bo.SpecificationTreeItem.name;
                            newData.items.add(this.parsing(item, sign));
                        }
                    }
                    return newData;
                } else if (data.type === bo.SpecificationTreeItem.name) {
                    let remote: bo4j.ISpecificationTreeItem = data;
                    let newData: bo.SpecificationTreeItem = new bo.SpecificationTreeItem();
                    newData.sign = remote.Sign;
                    newData.description = remote.Description;
                    newData.content = remote.Content;
                    newData.note = remote.Note;
                    newData.editable = remote.Editable;
                    newData.required = remote.Required;
                    if (remote.VaildValues instanceof Array) {
                        for (let item of remote.VaildValues) {
                            item.type = bo.SpecificationTreeItemValue.name;
                            newData.vaildValues.add(this.parsing(item, sign));
                        }
                    }
                    if (remote.Items instanceof Array) {
                        for (let item of remote.Items) {
                            item.type = bo.SpecificationTreeItem.name;
                            newData.items.add(this.parsing(item, sign));
                        }
                    }
                    return newData;
                } else if (data.type === bo.SpecificationTreeItemValue.name) {
                    let remote: bo4j.ISpecificationTreeItemValue = data;
                    let newData: bo.SpecificationTreeItemValue = new bo.SpecificationTreeItemValue();
                    newData.value = remote.Value;
                    newData.description = remote.Description;
                    newData.associated = remote.Associated;
                    return newData;
                } else {
                    return super.parsing(data, sign);
                }
            }
        }

        /** 模块业务对象工厂 */
        export const boFactory: ibas.BOFactory = new ibas.BOFactory();
        /** 业务对象转换者 */
        class BOConverter extends ibas.BOConverter {
            /** 模块对象工厂 */
            protected factory(): ibas.BOFactory {
                return boFactory;
            }

            /**
             * 自定义解析
             * @param data 远程数据
             * @returns 本地数据
             */
            protected customParsing(data: any): ibas.IBusinessObject {
                return data;
            }

            /**
             * 转换数据
             * @param boName 对象名称
             * @param property 属性名称
             * @param value 值
             * @returns 转换的值
             */
            protected convertData(boName: string, property: string, value: any): any {
                if (boName === bo.MaterialBatchJournal.name) {
                    if (property === bo.MaterialBatchJournal.PROPERTY_DIRECTION_NAME) {
                        return ibas.enums.toString(ibas.emDirection, value);
                    }
                } else if (boName === bo.MaterialBatch.name) {
                    if (property === bo.MaterialBatch.PROPERTY_LOCKED_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.MaterialSerialJournal.name) {
                    if (property === bo.MaterialSerialJournal.PROPERTY_DIRECTION_NAME) {
                        return ibas.enums.toString(ibas.emDirection, value);
                    }
                } else if (boName === bo.MaterialSerial.name) {
                    if (property === bo.MaterialSerial.PROPERTY_INSTOCK_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    } else if (property === bo.MaterialSerial.PROPERTY_RESERVED_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    } else if (property === bo.MaterialSerial.PROPERTY_LOCKED_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.Warehouse.name) {
                    if (property === bo.Warehouse.PROPERTY_SCHEDULABLE_NAME
                        || property === bo.Warehouse.PROPERTY_RESERVABLE_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.Material.name) {
                    if (property === bo.Material.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.Material.PROPERTY_FIXEDASSET_NAME
                        || property === bo.Material.PROPERTY_BATCHMANAGEMENT_NAME
                        || property === bo.Material.PROPERTY_SALESITEM_NAME
                        || property === bo.Material.PROPERTY_PURCHASEITEM_NAME
                        || property === bo.Material.PROPERTY_INVENTORYITEM_NAME
                        || property === bo.Material.PROPERTY_PHANTOMITEM_NAME
                        || property === bo.Material.PROPERTY_PRODUCTUNIT_NAME
                        || property === bo.Material.PROPERTY_CHECKCOMPLETENESS_NAME
                        || property === bo.Material.PROPERTY_MIXINGBATCHES_NAME
                        || property === bo.Material.PROPERTY_MADETOORDER_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    } else if (property === bo.Material.PROPERTY_ITEMTYPE_NAME) {
                        return ibas.enums.toString(bo.emItemType, value);
                    } else if (property === bo.Material.PROPERTY_PROCUREMENTMETHOD_NAME) {
                        return ibas.enums.toString(bo.emProcurementMethod, value);
                    } else if (property === bo.Material.PROPERTY_ISSUEMETHOD_NAME) {
                        return ibas.enums.toString(bo.emIssueMethod, value);
                    } else if (property === bo.Material.PROPERTY_PLANNINGMETHOD_NAME) {
                        return ibas.enums.toString(bo.emPlanningMethod, value);
                    } else if (property === bo.Material.PROPERTY_VALUATIONMETHOD_NAME) {
                        return ibas.enums.toString(bo.emValuationMethod, value);
                    } else if (property === bo.Material.PROPERTY_MANAGEBYWAREHOUSE_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.Product.name) {
                    if (property === bo.Product.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.Product.PROPERTY_BATCHMANAGEMENT_NAME
                        || property === bo.Product.PROPERTY_INVENTORYITEM_NAME
                        || property === bo.Product.PROPERTY_PHANTOMITEM_NAME
                        || property === bo.Product.PROPERTY_TAXED_NAME
                        || property === bo.Product.PROPERTY_CHECKCOMPLETENESS_NAME
                        || property === bo.Product.PROPERTY_MIXINGBATCHES_NAME
                        || property === bo.Product.PROPERTY_MADETOORDER_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    } else if (property === bo.Product.PROPERTY_ITEMTYPE_NAME) {
                        return ibas.enums.toString(bo.emItemType, value);
                    } else if (property === bo.Product.PROPERTY_PROCUREMENTMETHOD_NAME) {
                        return ibas.enums.toString(bo.emProcurementMethod, value);
                    } else if (property === bo.Product.PROPERTY_ISSUEMETHOD_NAME) {
                        return ibas.enums.toString(bo.emIssueMethod, value);
                    } else if (property === bo.Material.PROPERTY_PLANNINGMETHOD_NAME) {
                        return ibas.enums.toString(bo.emPlanningMethod, value);
                    } else if (property === bo.Material.PROPERTY_VALUATIONMETHOD_NAME) {
                        return ibas.enums.toString(bo.emValuationMethod, value);
                    } else if (property === bo.Material.PROPERTY_MANAGEBYWAREHOUSE_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.GoodsIssueLine.name) {
                    if (property === bo.GoodsIssueLine.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.GoodsIssueLine.PROPERTY_BATCHMANAGEMENT_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.GoodsReceiptLine.name) {
                    if (property === bo.GoodsReceiptLine.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.GoodsReceiptLine.PROPERTY_BATCHMANAGEMENT_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.InventoryTransferLine.name) {
                    if (property === bo.InventoryTransferLine.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.InventoryTransferLine.PROPERTY_BATCHMANAGEMENT_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.InventoryTransferRequestLine.name) {
                    if (property === bo.InventoryTransferRequestLine.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.InventoryTransferRequestLine.PROPERTY_BATCHMANAGEMENT_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.InventoryCountingLine.name) {
                    if (property === bo.InventoryCountingLine.PROPERTY_COUNTED_NAME
                        || property === bo.InventoryCountingLine.PROPERTY_FREEZE_NAME
                        || property === bo.InventoryCountingLine.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.InventoryCountingLine.PROPERTY_BATCHMANAGEMENT_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.Specification.name) {
                    if (property === bo.Specification.PROPERTY_TARGETTYPE_NAME) {
                        return ibas.enums.toString(emSpecificationTarget, value);
                    } else if (property === bo.Specification.PROPERTY_ASSIGNEDTYPE_NAME) {
                        return ibas.enums.toString(emSpecificationAssigned, value);
                    }
                } else if (boName === bo.SpecificationItem.name) {
                    if (property === bo.SpecificationItem.PROPERTY_EDITABLE_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    } else if (property === bo.SpecificationItem.PROPERTY_REQUIRED_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.MaterialSpecification.name) {
                    if (property === bo.MaterialSpecification.PROPERTY_BUSINESSPARTNERTYPE_NAME) {
                        return ibas.enums.toString(businesspartner.bo.emBusinessPartnerType, value);
                    }
                } else if (boName === bo.MaterialPriceList.name) {
                    if (property === bo.MaterialPriceList.PROPERTY_TAXED_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.MaterialPrice.name) {
                    if (property === bo.MaterialPrice.PROPERTY_TAXED_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.MaterialGroup.name) {
                    if (property === bo.MaterialGroup.PROPERTY_PHANTOM_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.MaterialScrap.name) {
                    if (property === bo.MaterialScrap.PROPERTY_TIERED_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                } else if (boName === bo.MaterialOrderedReservation.name) {
                    if (property === bo.MaterialOrderedReservation.PROPERTY_STATUS_NAME) {
                        return ibas.enums.toString(ibas.emBOStatus, value);
                    }
                } else if (boName === bo.MaterialInventoryReservation.name) {
                    if (property === bo.MaterialInventoryReservation.PROPERTY_STATUS_NAME) {
                        return ibas.enums.toString(ibas.emBOStatus, value);
                    }
                } else if (boName === bo.MaterialEstimateJournal.name) {
                    if (property === bo.MaterialEstimateJournal.PROPERTY_ESTIMATE_NAME) {
                        return ibas.enums.toString(bo.emEstimateType, value);
                    }
                } else if (boName === bo.PickLists.name) {
                    if (property === bo.PickLists.PROPERTY_PICKSTATUS_NAME) {
                        return ibas.enums.toString(bo.emPickStatus, value);
                    }
                } else if (boName === bo.PickListsLine.name) {
                    if (property === bo.PickListsLine.PROPERTY_PICKSTATUS_NAME) {
                        return ibas.enums.toString(bo.emPickStatus, value);
                    } else if (property === bo.PickListsLine.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.PickListsLine.PROPERTY_BATCHMANAGEMENT_NAME) {
                        return ibas.enums.toString(ibas.emYesNo, value);
                    }
                }
                return super.convertData(boName, property, value);
            }

            /**
             * 解析数据
             * @param boName 对象名称
             * @param property 属性名称
             * @param value 值
             * @returns 解析的值
             */
            protected parsingData(boName: string, property: string, value: any): any {
                if (boName === bo.MaterialBatchJournal.name) {
                    if (property === bo.MaterialBatchJournal.PROPERTY_DIRECTION_NAME) {
                        return ibas.enums.valueOf(ibas.emDirection, value);
                    }
                } else if (boName === bo.MaterialBatch.name) {
                    if (property === bo.MaterialBatch.PROPERTY_LOCKED_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.MaterialSerialJournal.name) {
                    if (property === bo.MaterialSerialJournal.PROPERTY_DIRECTION_NAME) {
                        return ibas.enums.valueOf(ibas.emDirection, value);
                    }
                } else if (boName === bo.MaterialSerial.name) {
                    if (property === bo.MaterialSerial.PROPERTY_INSTOCK_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    } else if (property === bo.MaterialSerial.PROPERTY_RESERVED_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    } else if (property === bo.MaterialSerial.PROPERTY_LOCKED_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.Material.name) {
                    if (property === bo.Material.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.Material.PROPERTY_FIXEDASSET_NAME
                        || property === bo.Material.PROPERTY_BATCHMANAGEMENT_NAME
                        || property === bo.Material.PROPERTY_SALESITEM_NAME
                        || property === bo.Material.PROPERTY_PURCHASEITEM_NAME
                        || property === bo.Material.PROPERTY_INVENTORYITEM_NAME
                        || property === bo.Material.PROPERTY_PHANTOMITEM_NAME
                        || property === bo.Material.PROPERTY_PRODUCTUNIT_NAME
                        || property === bo.Material.PROPERTY_CHECKCOMPLETENESS_NAME
                        || property === bo.Material.PROPERTY_MIXINGBATCHES_NAME
                        || property === bo.Material.PROPERTY_MADETOORDER_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    } else if (property === bo.Material.PROPERTY_ITEMTYPE_NAME) {
                        return ibas.enums.valueOf(bo.emItemType, value);
                    } else if (property === bo.Material.PROPERTY_PROCUREMENTMETHOD_NAME) {
                        return ibas.enums.valueOf(bo.emProcurementMethod, value);
                    } else if (property === bo.Material.PROPERTY_ISSUEMETHOD_NAME) {
                        return ibas.enums.valueOf(bo.emIssueMethod, value);
                    } else if (property === bo.Material.PROPERTY_PLANNINGMETHOD_NAME) {
                        return ibas.enums.valueOf(bo.emPlanningMethod, value);
                    } else if (property === bo.Material.PROPERTY_VALUATIONMETHOD_NAME) {
                        return ibas.enums.valueOf(bo.emValuationMethod, value);
                    } else if (property === bo.Material.PROPERTY_MANAGEBYWAREHOUSE_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.Product.name) {
                    if (property === bo.Product.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.Product.PROPERTY_BATCHMANAGEMENT_NAME
                        || property === bo.Product.PROPERTY_INVENTORYITEM_NAME
                        || property === bo.Product.PROPERTY_PHANTOMITEM_NAME
                        || property === bo.Product.PROPERTY_SALESITEM_NAME
                        || property === bo.Product.PROPERTY_PURCHASEITEM_NAME
                        || property === bo.Product.PROPERTY_TAXED_NAME
                        || property === bo.Material.PROPERTY_CHECKCOMPLETENESS_NAME
                        || property === bo.Material.PROPERTY_MIXINGBATCHES_NAME
                        || property === bo.Material.PROPERTY_MADETOORDER_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    } else if (property === bo.Product.PROPERTY_ITEMTYPE_NAME) {
                        return ibas.enums.valueOf(bo.emItemType, value);
                    } else if (property === bo.Product.PROPERTY_PROCUREMENTMETHOD_NAME) {
                        return ibas.enums.valueOf(bo.emProcurementMethod, value);
                    } else if (property === bo.Product.PROPERTY_ISSUEMETHOD_NAME) {
                        return ibas.enums.valueOf(bo.emIssueMethod, value);
                    } else if (property === bo.Material.PROPERTY_PLANNINGMETHOD_NAME) {
                        return ibas.enums.valueOf(bo.emPlanningMethod, value);
                    } else if (property === bo.Material.PROPERTY_VALUATIONMETHOD_NAME) {
                        return ibas.enums.valueOf(bo.emValuationMethod, value);
                    } else if (property === bo.Material.PROPERTY_MANAGEBYWAREHOUSE_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.Warehouse.name) {
                    if (property === bo.Warehouse.PROPERTY_SCHEDULABLE_NAME
                        || property === bo.Warehouse.PROPERTY_RESERVABLE_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.GoodsIssueLine.name) {
                    if (property === bo.GoodsIssueLine.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.GoodsIssueLine.PROPERTY_BATCHMANAGEMENT_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.GoodsReceiptLine.name) {
                    if (property === bo.GoodsReceiptLine.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.GoodsReceiptLine.PROPERTY_BATCHMANAGEMENT_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.InventoryTransferLine.name) {
                    if (property === bo.InventoryTransferLine.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.InventoryTransferLine.PROPERTY_BATCHMANAGEMENT_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.InventoryTransferRequestLine.name) {
                    if (property === bo.InventoryTransferRequestLine.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.InventoryTransferRequestLine.PROPERTY_BATCHMANAGEMENT_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.InventoryCountingLine.name) {
                    if (property === bo.InventoryCountingLine.PROPERTY_COUNTED_NAME
                        || property === bo.InventoryCountingLine.PROPERTY_FREEZE_NAME
                        || property === bo.InventoryCountingLine.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.InventoryCountingLine.PROPERTY_BATCHMANAGEMENT_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.Specification.name) {
                    if (property === bo.Specification.PROPERTY_TARGETTYPE_NAME) {
                        return ibas.enums.valueOf(emSpecificationTarget, value);
                    } else if (property === bo.Specification.PROPERTY_ASSIGNEDTYPE_NAME) {
                        return ibas.enums.valueOf(emSpecificationAssigned, value);
                    }
                } else if (boName === bo.SpecificationItem.name) {
                    if (property === bo.SpecificationItem.PROPERTY_EDITABLE_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    } else if (property === bo.SpecificationItem.PROPERTY_REQUIRED_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.MaterialSpecification.name) {
                    if (property === bo.MaterialSpecification.PROPERTY_BUSINESSPARTNERTYPE_NAME) {
                        return ibas.enums.valueOf(businesspartner.bo.emBusinessPartnerType, value);
                    }
                } else if (boName === bo.MaterialPriceList.name) {
                    if (property === bo.MaterialPriceList.PROPERTY_TAXED_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.MaterialPrice.name) {
                    if (property === bo.MaterialPrice.PROPERTY_TAXED_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.MaterialGroup.name) {
                    if (property === bo.MaterialGroup.PROPERTY_PHANTOM_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.MaterialScrap.name) {
                    if (property === bo.MaterialScrap.PROPERTY_TIERED_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                } else if (boName === bo.MaterialOrderedReservation.name) {
                    if (property === bo.MaterialOrderedReservation.PROPERTY_STATUS_NAME) {
                        return ibas.enums.valueOf(ibas.emBOStatus, value);
                    }
                } else if (boName === bo.MaterialInventoryReservation.name) {
                    if (property === bo.MaterialInventoryReservation.PROPERTY_STATUS_NAME) {
                        return ibas.enums.valueOf(ibas.emBOStatus, value);
                    }
                } else if (boName === bo.MaterialEstimateJournal.name) {
                    if (property === bo.MaterialEstimateJournal.PROPERTY_ESTIMATE_NAME) {
                        return ibas.enums.valueOf(bo.emEstimateType, value);
                    }
                } else if (boName === bo.PickLists.name) {
                    if (property === bo.PickLists.PROPERTY_PICKSTATUS_NAME) {
                        return ibas.enums.valueOf(bo.emPickStatus, value);
                    }
                } else if (boName === bo.PickListsLine.name) {
                    if (property === bo.PickListsLine.PROPERTY_PICKSTATUS_NAME) {
                        return ibas.enums.valueOf(bo.emPickStatus, value);
                    } else if (property === bo.PickListsLine.PROPERTY_SERIALMANAGEMENT_NAME
                        || property === bo.PickListsLine.PROPERTY_BATCHMANAGEMENT_NAME) {
                        return ibas.enums.valueOf(ibas.emYesNo, value);
                    }
                }
                return super.parsingData(boName, property, value);
            }
        }

        export function baseMaterial(
            target: IGoodsIssueLine | IGoodsReceiptLine | IInventoryTransferLine,
            source: materials.bo.IMaterial
        ): void {
            target.itemCode = source.code;
            target.itemDescription = source.name;
            target.itemSign = source.sign;
            target.serialManagement = source.serialManagement;
            target.batchManagement = source.batchManagement;
            target.warehouse = source.defaultWarehouse;
            target.quantity = 1;
            target.uom = source.inventoryUOM;
            target.price = source.avgPrice;
        }
        const DECIMAL_PLACES_SUM: number = ibas.config.get(ibas.CONFIG_ITEM_DECIMAL_PLACES_SUM);
        /** 业务规则-计算库存数量 */
        export class BusinessRuleCalculateInventoryQuantity extends ibas.BusinessRuleCommon {
            /**
             * 构造方法
             * @param inventoryQuantity 属性-库存数量
             * @param quantity          属性-数量
             * @param uomRate           属性-换算率
             */
            constructor(inventoryQuantity: string, quantity: string, uomRate: string) {
                super();
                this.name = ibas.i18n.prop("materials_business_rule_calculate_inventory_quantity");
                this.inventoryQuantity = inventoryQuantity;
                this.quantity = quantity;
                this.uomRate = uomRate;
                this.inputProperties.add(this.inventoryQuantity);
                this.inputProperties.add(this.quantity);
                this.inputProperties.add(this.uomRate);
                this.affectedProperties.add(this.uomRate);
                this.affectedProperties.add(this.inventoryQuantity);
            }
            /** 库存数量 */
            inventoryQuantity: string;
            /** 数量 */
            quantity: string;
            /** 换算率 */
            uomRate: string;
            /** 计算规则 */
            protected compute(context: ibas.BusinessRuleContextCommon): void {
                let uomRate: number = ibas.numbers.valueOf(context.inputValues.get(this.uomRate));
                if (uomRate <= 0) {
                    uomRate = 1;
                    context.outputValues.set(this.uomRate, uomRate);
                }
                let quantity: number = ibas.numbers.valueOf(context.inputValues.get(this.quantity));
                context.outputValues.set(this.inventoryQuantity, ibas.numbers.round(quantity * uomRate, DECIMAL_PLACES_SUM));
            }
        }


        export namespace bo4j {
            /** 操作消息 */
            export interface IDataDeclaration {
                /** 数据类型 */
                type: string;
            }
            /** 规格树 */
            export interface ISpecificationTree extends IDataDeclaration {
                /** 模板 */
                Template: number;
                /** 名称 */
                Name: string;
                /** 备注 */
                Remarks: string;
                /** 规格模板-项目集合 */
                Items: ISpecificationTreeItem[];
            }
            /** 规格模板-项目 */
            export interface ISpecificationTreeItem extends IDataDeclaration {
                /** 标记 */
                Sign: string;
                /** 描述 */
                Description: string;
                /** 内容 */
                Content: string;
                /** 备注 */
                Note: string;
                /** 可编辑 */
                Editable: boolean;
                /** 必填的 */
                Required: boolean;
                /** 可选值 */
                VaildValues: ISpecificationTreeItemValue[];
                /** 规格模板-项目集合 */
                Items: ISpecificationTreeItem[];
            }
            /** 规格模板-项目值 */
            export interface ISpecificationTreeItemValue extends IDataDeclaration {
                /** 标记 */
                Value: string;
                /** 描述 */
                Description: string;
                /** 关联 */
                Associated: string;
            }
            /** 物料编码改变 */
            export interface IMaterialNumberChange extends IDataDeclaration {
                Issue: GoodsIssue;
                Receipt: GoodsReceipt;
                Reservations: MaterialInventoryReservation[];
            }
        }
    }
}