/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    emYesNo,
    emDocumentStatus,
    emBOStatus,
    emApprovalStatus,
    BusinessObject,
    BusinessObjects,
    BOMasterData,
    BOMasterDataLine,
    BODocument,
    BODocumentLine,
    BOSimple,
    BOSimpleLine,
    config,
} from "ibas/index";
import {
    IMaterialEx,
    BO_CODE_MATERIALEX,
    emItemType,
} from "../../api/index";
import { MaterialBase } from "./MaterialBase";
export class MaterialEx extends MaterialBase<MaterialEx> implements IMaterialEx {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALEX;
    /** 构造函数 */
    constructor() {
        super();
    }

    /** 映射的属性名称-仓库 */
    static PROPERTY_WAREHOUSECODE_NAME: string = "Warehouse";
    /** 获取-仓库 */
    get warehouseCode(): string {
        return this.getProperty<string>(MaterialEx.PROPERTY_WAREHOUSECODE_NAME);
    }
    /** 设置-仓库 */
    set warehouseCode(value: string) {
        this.setProperty(MaterialEx.PROPERTY_WAREHOUSECODE_NAME, value);
    }

    /** 映射的属性名称-仓库库存 */
    static PROPERTY_ONHAND_NAME: string = "OnHand";
    /** 获取-仓库库存 */
    get warehouseOnHand(): number {
        return this.getProperty<number>(MaterialEx.PROPERTY_ONHAND_NAME);
    }
    /** 设置-仓库库存 */
    set warehouseOnHand(value: number) {
        this.setProperty(MaterialEx.PROPERTY_ONHAND_NAME, value);
    }

    /** 映射的属性名称-价格清单名称 */
    static PROPERTY_PRICELISTNAME_NAME: string = "PriceListName";
    /** 获取-价格清单名称 */
    get priceListName(): string {
        return this.getProperty<string>(MaterialEx.PROPERTY_PRICELISTNAME_NAME);
    }
    /** 设置-价格清单名称 */
    set priceListName(value: string) {
        this.setProperty(MaterialEx.PROPERTY_PRICELISTNAME_NAME, value);
    }
    /** 映射的属性名称-价格清单 */
    static PROPERTY_PRICE_NAME: string = "Price";
    /** 获取-价格清单 */
    get price(): number {
        return this.getProperty<number>(MaterialEx.PROPERTY_PRICE_NAME);
    }
    /** 设置-价格清单 */
    set price(value: number) {
        this.setProperty(MaterialEx.PROPERTY_PRICE_NAME, value);
    }

    protected init(): void {
       // this.objectCode = config.applyVariables(MaterialEx.BUSINESS_OBJECT_CODE);
    }

}