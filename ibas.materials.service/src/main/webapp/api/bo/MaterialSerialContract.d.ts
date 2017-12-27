/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    ArrayList,
    emDirection,
    IBusinessObject,
    IBusinessObjects,
    IBOMasterData,
    IBOMasterDataLine,
    IBODocumentLine,
    IBOSimple,
    IBOSimpleLine,
} from "ibas/index";
import {
    IMaterialSerialJournal
} from "../../api/index";
import {
    MaterialSerialJournal,
} from "../../borep/bo/index";
/** 物料出库序列契约 */
export interface IMaterialSerialContract {

    /**物料编号 */
    itemCode: string;

    /**仓库编码 */
    warehouse: string;

    /**数量 */
    quantity: number;

    /** 创建的序列 */
    materialSerials?: IMaterialSerials;
}

export interface IMaterialSerials extends ArrayList<MaterialSerialJournal> {
    create(data: IMaterialSerialJournal): void;
}


