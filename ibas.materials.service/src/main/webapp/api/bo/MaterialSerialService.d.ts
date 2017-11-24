/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    emDirection,
    IBusinessObject,
    IBusinessObjects,
    IBOMasterData,
    IBOMasterDataLine,
    IBOSimple,
    IBOSimpleLine,
} from "ibas/index";
import {
    IMaterialSerial,
    IMaterialSerialJournal,
    IMaterialSerialServiceJournals
} from "./index";
export interface IMaterialSerialService extends IBusinessObject {
    /** table 行index索引 */
    index: number;

    /**物料编号 */
    itemCode: string;

    /**仓库编码 */
    warehouse: string;

    /**总序列号需求 */
    needSerialQuantity: number;

    /**已选择序列号 */
    selectedSerialQuantity: number;

    /** 数量 */
    quantity: number;
    
    /**方向 */
    direction: emDirection;

    /** 物料序列分录集合 */
    materialSerialServiceJournals: IMaterialSerialServiceJournals;
}
/**  物料序列服务-序列号日记账集合  */
export interface IMaterialSerialServiceJournals extends IBusinessObjects<IMaterialSerialJournal, IMaterialSerialService> {
    /** 创建并添加子项 */
    create(): IMaterialSerialJournal;
}