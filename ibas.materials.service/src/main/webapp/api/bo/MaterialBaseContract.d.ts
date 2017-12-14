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
/** 物料批次序列基础契约 */
export interface IMaterialBaseContract {
    /** 行索引 */
    index?: number;

    /**物料编号 */
    itemCode: string;

    /**仓库编码 */
    warehouse: string;

    /**数量 */
    quantity: number;
}

/** 物料批次-基本信息 */
export interface IMaterialBatchBaseLine {

    /** 调用者 */
    caller?: any;

    /** 批次名称 */
    batchCode: string;

    /** 数量 */
    quantity: number;
}

/** 物料序列-基本信息 */
export interface IMaterialSerialBaseLine {
    /** 序列名称 */
    serialCode: string;
    /** 调用者 */
    caller?: any;

}
