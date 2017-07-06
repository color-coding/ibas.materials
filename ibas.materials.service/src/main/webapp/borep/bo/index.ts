/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

// 模块索引文件，此文件集中导出类
export * from "./GoodsIssue";
export * from "./GoodsReceipt";
export * from "./InventoryTransfer";
export * from "./Material";
export * from "./MaterialGroup";
export * from "./MaterialInventory";
export * from "./MaterialJournal";
export * from "./Warehouse";

// 注册业务对象到工厂
import * as ibas from "ibas/index";
import { GoodsIssue } from "./GoodsIssue";
ibas.boFactory.register(GoodsIssue.BUSINESS_OBJECT_CODE, GoodsIssue);
import { GoodsReceipt } from "./GoodsReceipt";
ibas.boFactory.register(GoodsReceipt.BUSINESS_OBJECT_CODE, GoodsReceipt);
import { InventoryTransfer } from "./InventoryTransfer";
ibas.boFactory.register(InventoryTransfer.BUSINESS_OBJECT_CODE, InventoryTransfer);
import { Material } from "./Material";
ibas.boFactory.register(Material.BUSINESS_OBJECT_CODE, Material);
import { MaterialGroup } from "./MaterialGroup";
ibas.boFactory.register(MaterialGroup.BUSINESS_OBJECT_CODE, MaterialGroup);
import { MaterialInventory } from "./MaterialInventory";
ibas.boFactory.register(MaterialInventory.BUSINESS_OBJECT_CODE, MaterialInventory);
import { MaterialJournal } from "./MaterialJournal";
ibas.boFactory.register(MaterialJournal.BUSINESS_OBJECT_CODE, MaterialJournal);
import { Warehouse } from "./Warehouse";
ibas.boFactory.register(Warehouse.BUSINESS_OBJECT_CODE, Warehouse);
