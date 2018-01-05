/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 *
 * @Author: fancy
 * @Date: 2017-12-10 17:58:50
 * @Last Modified by: fancy
 * @Last Modified time: 2017-12-27 12:06:58
 */
import * as ibas from "ibas/index";
import {
    IMaterialSerialContract,
    IMaterialSerialJournal,
} from "../../../api/bo/index";
export class MaterialSerialServiceJournal {

    contract: IMaterialSerialContract;

    itemCode: string;

    warehouse: string;

    quantity: number;

    direction: ibas.emDirection;

    needSerialQuantity: number;

    // selectedSerialQuantity: number;
}