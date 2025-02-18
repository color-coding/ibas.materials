﻿/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
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
/// <reference path="./bo/InventoryCounting.ts" />
/// <reference path="./bo/MaterialSpecification.ts" />
/// <reference path="./bo/Specification.ts" />
/// <reference path="./bo/SpecificationTree.ts" />
/// <reference path="./bo/Unit.ts" />
/// <reference path="./bo/UnitRate.ts" />
/// <reference path="./bo/MaterialScrap.ts" />
/// <reference path="./bo/MaterialVersion.ts" />
/// <reference path="./bo/MaterialInventoryReservation.ts" />
/// <reference path="./bo/MaterialSubstitute.ts" />
/// <reference path="./bo/MaterialOrderedReservation.ts" />
/// <reference path="./bo/MaterialEstimateJournal.ts" />
/// <reference path="./bo/PickLists.ts" />
/// <reference path="./bo/InventoryTransferRequest.ts" />
/// <reference path="./bo/MaterialSpecialPrice.ts" />
/// <reference path="./bo/MaterialNumberAssociation.ts" />
/// <reference path="./bo/MaterialCatalog.ts" />
/// <reference path="./bo/SchedulingGroup.ts" />
/// <reference path="./DataConverter.ts" />
/// <reference path="./BORepository.ts" />

namespace materials {
    export namespace bo {
        // 注册业务对象仓库到工厂
        boFactory.register(BO_REPOSITORY_MATERIALS, BORepositoryMaterials);
        // 注册业务对象到工厂
        boFactory.register(MaterialPrice);
        boFactory.register(MaterialQuantity);
        boFactory.register(GoodsIssue.BUSINESS_OBJECT_CODE, GoodsIssue);
        boFactory.register(GoodsReceipt.BUSINESS_OBJECT_CODE, GoodsReceipt);
        boFactory.register(InventoryTransfer.BUSINESS_OBJECT_CODE, InventoryTransfer);
        boFactory.register(Material.BUSINESS_OBJECT_CODE, Material);
        boFactory.register(Product.BUSINESS_OBJECT_CODE, Product);
        boFactory.register(MaterialGroup.BUSINESS_OBJECT_CODE, MaterialGroup);
        boFactory.register(MaterialInventory.BUSINESS_OBJECT_CODE, MaterialInventory);
        boFactory.register(MaterialInventoryJournal.BUSINESS_OBJECT_CODE, MaterialInventoryJournal);
        boFactory.register(Warehouse.BUSINESS_OBJECT_CODE, Warehouse);
        boFactory.register(MaterialBatch.BUSINESS_OBJECT_CODE, MaterialBatch);
        boFactory.register(MaterialSerial.BUSINESS_OBJECT_CODE, MaterialSerial);
        boFactory.register(MaterialPriceList.BUSINESS_OBJECT_CODE, MaterialPriceList);
        boFactory.register(MaterialBatchJournal.BUSINESS_OBJECT_CODE, MaterialBatchJournal);
        boFactory.register(MaterialSerialJournal.BUSINESS_OBJECT_CODE, MaterialSerialJournal);
        boFactory.register(InventoryCounting.BUSINESS_OBJECT_CODE, InventoryCounting);
        boFactory.register(MaterialSpecification.BUSINESS_OBJECT_CODE, MaterialSpecification);
        boFactory.register(Specification.BUSINESS_OBJECT_CODE, Specification);
        boFactory.register(Unit.BUSINESS_OBJECT_CODE, Unit);
        boFactory.register(UnitRate.BUSINESS_OBJECT_CODE, UnitRate);
        boFactory.register(MaterialScrap.BUSINESS_OBJECT_CODE, MaterialScrap);
        boFactory.register(MaterialVersion.BUSINESS_OBJECT_CODE, MaterialVersion);
        boFactory.register(MaterialInventoryReservation.BUSINESS_OBJECT_CODE, MaterialInventoryReservation);
        boFactory.register(MaterialSubstitute.BUSINESS_OBJECT_CODE, MaterialSubstitute);
        boFactory.register(MaterialOrderedReservation.BUSINESS_OBJECT_CODE, MaterialOrderedReservation);
        boFactory.register(MaterialEstimateJournal.BUSINESS_OBJECT_CODE, MaterialEstimateJournal);
        boFactory.register(PickLists.BUSINESS_OBJECT_CODE, PickLists);
        boFactory.register(InventoryTransferRequest.BUSINESS_OBJECT_CODE, InventoryTransferRequest);
        boFactory.register(MaterialSpecialPrice.BUSINESS_OBJECT_CODE, MaterialSpecialPrice);
        boFactory.register(MaterialNumberAssociation.BUSINESS_OBJECT_CODE, MaterialNumberAssociation);
        boFactory.register(BusinessPartnerMaterialCatalog.BUSINESS_OBJECT_CODE, BusinessPartnerMaterialCatalog);
        boFactory.register(SchedulingGroup.BUSINESS_OBJECT_CODE, SchedulingGroup);
        boFactory.register(BO_CODE_PRODUCT_INVENTORY, Object);// 没有实际意义
    }
}