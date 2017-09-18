/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "./bo/index";
import { IBORepositoryMaterials, BO_REPOSITORY_MATERIALS } from "../api/index";
import { DataConverter4mm } from "./DataConverters";

/** 业务对象仓库 */
export class BORepositoryMaterials extends ibas.BORepositoryApplication implements IBORepositoryMaterials {

    /** 创建此模块的后端与前端数据的转换者 */
    protected createConverter(): ibas.IDataConverter {
        return new DataConverter4mm;
    }

    /**
     * 查询 库存发货
     * @param fetcher 查询者
     */
    fetchGoodsIssue(fetcher: ibas.FetchCaller<bo.GoodsIssue>): void {
        super.fetch(bo.GoodsIssue.name, fetcher);
    }
    /**
     * 保存 库存发货
     * @param saver 保存者
     */
    saveGoodsIssue(saver: ibas.SaveCaller<bo.GoodsIssue>): void {
        super.save(bo.GoodsIssue.name, saver);
    }

    /**
     * 查询 库存收货
     * @param fetcher 查询者
     */
    fetchGoodsReceipt(fetcher: ibas.FetchCaller<bo.GoodsReceipt>): void {
        super.fetch(bo.GoodsReceipt.name, fetcher);
    }
    /**
     * 保存 库存收货
     * @param saver 保存者
     */
    saveGoodsReceipt(saver: ibas.SaveCaller<bo.GoodsReceipt>): void {
        super.save(bo.GoodsReceipt.name, saver);
    }

    /**
     * 查询 库存转储
     * @param fetcher 查询者
     */
    fetchInventoryTransfer(fetcher: ibas.FetchCaller<bo.InventoryTransfer>): void {
        super.fetch(bo.InventoryTransfer.name, fetcher);
    }
    /**
     * 保存 库存转储
     * @param saver 保存者
     */
    saveInventoryTransfer(saver: ibas.SaveCaller<bo.InventoryTransfer>): void {
        super.save(bo.InventoryTransfer.name, saver);
    }

    /**
     * 查询 物料
     * @param fetcher 查询者
     */
    fetchMaterial(fetcher: ibas.FetchCaller<bo.Material>): void {
        super.fetch(bo.Material.name, fetcher);
    }
    /**
     * 保存 物料
     * @param saver 保存者
     */
    saveMaterial(saver: ibas.SaveCaller<bo.Material>): void {
        super.save(bo.Material.name, saver);
    }

    /**
     * 查询 物料组
     * @param fetcher 查询者
     */
    fetchMaterialGroup(fetcher: ibas.FetchCaller<bo.MaterialGroup>): void {
        super.fetch(bo.MaterialGroup.name, fetcher);
    }
    /**
     * 保存 物料组
     * @param saver 保存者
     */
    saveMaterialGroup(saver: ibas.SaveCaller<bo.MaterialGroup>): void {
        super.save(bo.MaterialGroup.name, saver);
    }

    /**
     * 查询 物料库存
     * @param fetcher 查询者
     */
    fetchMaterialInventory(fetcher: ibas.FetchCaller<bo.MaterialInventory>): void {
        super.fetch(bo.MaterialInventory.name, fetcher);
    }
    /**
     * 保存 物料库存
     * @param saver 保存者
     */
    saveMaterialInventory(saver: ibas.SaveCaller<bo.MaterialInventory>): void {
        super.save(bo.MaterialInventory.name, saver);
    }

    /**
     * 查询 仓库日记账
     * @param fetcher 查询者
     */
    fetchMaterialInventoryJournal(fetcher: ibas.FetchCaller<bo.MaterialInventoryJournal>): void {
        super.fetch(bo.MaterialInventoryJournal.name, fetcher);
    }
    /**
     * 保存 仓库日记账
     * @param saver 保存者
     */
    saveMaterialInventoryJournal(saver: ibas.SaveCaller<bo.MaterialInventoryJournal>): void {
        super.save(bo.MaterialInventoryJournal.name, saver);
    }

    /**
     * 查询 仓库
     * @param fetcher 查询者
     */
    fetchWarehouse(fetcher: ibas.FetchCaller<bo.Warehouse>): void {
        super.fetch(bo.Warehouse.name, fetcher);
    }
    /**
     * 保存 仓库
     * @param saver 保存者
     */
    saveWarehouse(saver: ibas.SaveCaller<bo.Warehouse>): void {
        super.save(bo.Warehouse.name, saver);
    }

}
// 注册业务对象仓库到工厂
ibas.boFactory.register(BO_REPOSITORY_MATERIALS, BORepositoryMaterials);
