/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "./bo/index";
import {
} from "../api/index";

/** 数据转换者 */
export class DataConverter4mm extends ibas.DataConverter4j {

    /** 创建业务对象转换者 */
    protected createConverter(): ibas.BOConverter {
        return new BOConverter4mm;
    }
}

/** 业务对象转换者 */
class BOConverter4mm extends ibas.BOConverter {

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
        } else if (boName === bo.MaterialSerialJournal.name) {
            if (property === bo.MaterialSerialJournal.PROPERTY_DIRECTION_NAME) {
                return ibas.enums.toString(ibas.emDirection, value);
            }
        } else if (boName === bo.Material.name) {
            if (property === bo.Material.PROPERTY_SERIALMANAGEMENT_NAME
                || property === bo.Material.PROPERTY_FIXEDASSETS_NAME
                || property === bo.Material.PROPERTY_BATCHMANAGEMENT_NAME
                || property === bo.Material.PROPERTY_SALESITEM_NAME
                || property === bo.Material.PROPERTY_PURCHASEITEM_NAME
                || property === bo.Material.PROPERTY_INVENTORYITEM_NAME
                || property === bo.Material.PROPERTY_PHANTOMITEM_NAME) {
                return ibas.enums.toString(ibas.emYesNo, value);
            }
        } else if (boName === bo.Product.name) {
            if (property === bo.Product.PROPERTY_SERIALMANAGEMENT_NAME
                || property === bo.Product.PROPERTY_BATCHMANAGEMENT_NAME
                || property === bo.Product.PROPERTY_INVENTORYITEM_NAME
                || property === bo.Product.PROPERTY_PHANTOMITEM_NAME) {
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
        } else if (boName === bo.MaterialSerialJournal.name) {
            if (property === bo.MaterialSerialJournal.PROPERTY_DIRECTION_NAME) {
                return ibas.enums.valueOf(ibas.emDirection, value);
            }
        } else if (boName === bo.Material.name) {
            if (property === bo.Material.PROPERTY_SERIALMANAGEMENT_NAME
                || property === bo.Material.PROPERTY_FIXEDASSETS_NAME
                || property === bo.Material.PROPERTY_BATCHMANAGEMENT_NAME
                || property === bo.Material.PROPERTY_SALESITEM_NAME
                || property === bo.Material.PROPERTY_PURCHASEITEM_NAME
                || property === bo.Material.PROPERTY_INVENTORYITEM_NAME
                || property === bo.Material.PROPERTY_PHANTOMITEM_NAME) {
                return ibas.enums.valueOf(ibas.emYesNo, value);
            }
        } else if (boName === bo.Product.name) {
            if (property === bo.Product.PROPERTY_SERIALMANAGEMENT_NAME
                || property === bo.Product.PROPERTY_BATCHMANAGEMENT_NAME
                || property === bo.Product.PROPERTY_INVENTORYITEM_NAME
                || property === bo.Product.PROPERTY_PHANTOMITEM_NAME) {
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
        }
        return super.parsingData(boName, property, value);
    }
}
