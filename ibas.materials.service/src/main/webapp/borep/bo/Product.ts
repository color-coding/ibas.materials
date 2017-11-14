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
    IProduct,
    BO_CODE_MATERIALEX,
    emItemType,
} from "../../api/index";
import { MaterialBase } from "./MaterialBase";
export class Product extends MaterialBase<Product> implements IProduct {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALEX;
    /** 构造函数 */
    constructor() {
        super();
    }

    /** 映射的属性名称-仓库库存 */
    static PROPERTY_ONHAND_NAME: string = "OnHand";
    /** 获取-仓库库存 */
    get onHand(): number {
        return this.getProperty<number>(Product.PROPERTY_ONHAND_NAME);
    }
    /** 设置-仓库库存 */
    set onHand(value: number) {
        this.setProperty(Product.PROPERTY_ONHAND_NAME, value);
    }

    /** 映射的属性名称-价格清单 */
    static PROPERTY_PRICE_NAME: string = "Price";
    /** 获取-价格清单 */
    get price(): number {
        return this.getProperty<number>(Product.PROPERTY_PRICE_NAME);
    }
    /** 设置-价格清单 */
    set price(value: number) {
        this.setProperty(Product.PROPERTY_PRICE_NAME, value);
    }

    protected init(): void {
       // this.objectCode = config.applyVariables(Product.BUSINESS_OBJECT_CODE);
    }

}