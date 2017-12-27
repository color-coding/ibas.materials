/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: fancy
 * @Date: 2017-12-22 15:27:42
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-27 13:03:22
 */
import * as ibas from "ibas/index";
import {
    IMaterialBatchContract,
    IMaterialBatchJournal,
} from "../../../api/bo/index";
export class MaterialBatchServiceJournal {

    contract: IMaterialBatchContract;

    itemCode: string;

    warehouse: string;

    quantity: number;

    direction: ibas.emDirection;

    needBatchQuantity: number;

    // selectedBatchQuantity: number;
}