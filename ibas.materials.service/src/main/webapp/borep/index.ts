/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../3rdparty/ibas/index.d.ts" />
/// <reference path="../api/index.ts" />
/// <reference path="./bo/GoodsIssue.ts" />
/// <reference path="./bo/GoodsReceipt.ts" />
/// <reference path="./bo/InventoryTransfer.ts" />
/// <reference path="./bo/Material.ts" />
/// <reference path="./bo/MaterialBatch.ts" />
/// <reference path="./bo/MaterialBatchJournal.ts" />
/// <reference path="./bo/MaterialGroup.ts" />
/// <reference path="./bo/MaterialInventory.ts" />
/// <reference path="./bo/MaterialInventoryJournal.ts" />
/// <reference path="./bo/MaterialPriceList.ts" />
/// <reference path="./bo/MaterialSerial.ts" />
/// <reference path="./bo/MaterialSerialJournal.ts" />
/// <reference path="./bo/Product.ts" />
/// <reference path="./bo/Warehouse.ts" />
/// <reference path="./DataConverter.ts" />
/// <reference path="./BORepository.ts" />

namespace materials {
    export namespace bo {
        // 注册业务对象仓库到工厂
        ibas.boFactory.register(BO_REPOSITORY_MATERIALS, BORepositoryMaterials);
        // 注册业务对象到工厂
        ibas.boFactory.register(MaterialPrice);
        ibas.boFactory.register(MaterialQuantity);
        ibas.boFactory.register(GoodsIssue.BUSINESS_OBJECT_CODE, GoodsIssue);
        ibas.boFactory.register(GoodsReceipt.BUSINESS_OBJECT_CODE, GoodsReceipt);
        ibas.boFactory.register(InventoryTransfer.BUSINESS_OBJECT_CODE, InventoryTransfer);
        ibas.boFactory.register(Material.BUSINESS_OBJECT_CODE, Material);
        ibas.boFactory.register(Product.BUSINESS_OBJECT_CODE, Product);
        ibas.boFactory.register(MaterialGroup.BUSINESS_OBJECT_CODE, MaterialGroup);
        ibas.boFactory.register(MaterialInventory.BUSINESS_OBJECT_CODE, MaterialInventory);
        ibas.boFactory.register(MaterialInventoryJournal.BUSINESS_OBJECT_CODE, MaterialInventoryJournal);
        ibas.boFactory.register(Warehouse.BUSINESS_OBJECT_CODE, Warehouse);
        ibas.boFactory.register(MaterialBatch.BUSINESS_OBJECT_CODE, MaterialBatch);
        ibas.boFactory.register(MaterialSerial.BUSINESS_OBJECT_CODE, MaterialSerial);
        ibas.boFactory.register(MaterialPriceList.BUSINESS_OBJECT_CODE, MaterialPriceList);
        ibas.boFactory.register(MaterialBatchJournal.BUSINESS_OBJECT_CODE, MaterialBatchJournal);
        ibas.boFactory.register(MaterialSerialJournal.BUSINESS_OBJECT_CODE, MaterialSerialJournal);
    }
}