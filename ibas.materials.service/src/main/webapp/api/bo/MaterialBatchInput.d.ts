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
} from "ibas/index";
import {

} from "../Datas";
export interface IMaterialBatchInput extends IBOSimple {
    /**物料编号 */
    itemCode: string;

    /**仓库编码 */
    warehouse: string;
    
    /**数量 */
    quantity: number;

    /**总需求 */
    needQuantity: number;

    /**已批次 */
    selectedQuantity: number;
    
    /**方向 */
    direction: emDirection;

    objectKey: number;

}