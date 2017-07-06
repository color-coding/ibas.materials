/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    FetchCaller,
    SaveCaller
} from "ibas/index";
import * as bo from "./bo/index"

/** 业务仓库 */
export interface IBORepositoryMaterials {

    /**
     * 查询 库存发货
     * @param fetcher 查询者
     */
    fetchGoodsIssue(fetcher: FetchCaller<bo.IGoodsIssue>);
    /**
     * 保存 库存发货
     * @param saver 保存者
     */
    saveGoodsIssue(saver: SaveCaller<bo.IGoodsIssue>);

    /**
     * 查询 库存收货
     * @param fetcher 查询者
     */
    fetchGoodsReceipt(fetcher: FetchCaller<bo.IGoodsReceipt>);
    /**
     * 保存 库存收货
     * @param saver 保存者
     */
    saveGoodsReceipt(saver: SaveCaller<bo.IGoodsReceipt>);

    /**
     * 查询 库存转储
     * @param fetcher 查询者
     */
    fetchInventoryTransfer(fetcher: FetchCaller<bo.IInventoryTransfer>);
    /**
     * 保存 库存转储
     * @param saver 保存者
     */
    saveInventoryTransfer(saver: SaveCaller<bo.IInventoryTransfer>);

    /**
     * 查询 物料
     * @param fetcher 查询者
     */
    fetchMaterial(fetcher: FetchCaller<bo.IMaterial>);
    /**
     * 保存 物料
     * @param saver 保存者
     */
    saveMaterial(saver: SaveCaller<bo.IMaterial>);

    /**
     * 查询 物料组
     * @param fetcher 查询者
     */
    fetchMaterialGroup(fetcher: FetchCaller<bo.IMaterialGroup>);
    /**
     * 保存 物料组
     * @param saver 保存者
     */
    saveMaterialGroup(saver: SaveCaller<bo.IMaterialGroup>);

    /**
     * 查询 物料库存
     * @param fetcher 查询者
     */
    fetchMaterialInventory(fetcher: FetchCaller<bo.IMaterialInventory>);
    /**
     * 保存 物料库存
     * @param saver 保存者
     */
    saveMaterialInventory(saver: SaveCaller<bo.IMaterialInventory>);

    /**
     * 查询 仓库日记账
     * @param fetcher 查询者
     */
    fetchMaterialJournal(fetcher: FetchCaller<bo.IMaterialJournal>);
    /**
     * 保存 仓库日记账
     * @param saver 保存者
     */
    saveMaterialJournal(saver: SaveCaller<bo.IMaterialJournal>);

    /**
     * 查询 仓库
     * @param fetcher 查询者
     */
    fetchWarehouse(fetcher: FetchCaller<bo.IWarehouse>);
    /**
     * 保存 仓库
     * @param saver 保存者
     */
    saveWarehouse(saver: SaveCaller<bo.IWarehouse>);


}
