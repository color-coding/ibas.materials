/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    FetchCaller,
    SaveCaller,
    UploadFileCaller,
    DownloadFileCaller,
    FileData,
    IBORepositoryApplication
} from "ibas/index";
import * as bo from "./bo/index"

/** 业务仓库 */
export interface IBORepositoryMaterials extends IBORepositoryApplication {

    /**
     * 上传文件
     * @param caller 调用者
     */
    upload(caller: UploadFileCaller<FileData>);
    /**
     * 下载文件
     * @param caller 调用者
     */
    download(caller: DownloadFileCaller<Blob>);
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
     * 查询 仓库日记账
     * @param fetcher 查询者
     */
    fetchMaterialInventoryJournal(fetcher: FetchCaller<bo.IMaterialInventoryJournal>);
    /**
     * 保存 仓库日记账
     * @param saver 保存者
     */
    saveMaterialInventoryJournal(saver: SaveCaller<bo.IMaterialInventoryJournal>);

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
    /**
         * 查询 物料扩展
         * @param fetcher 查询者
         */
    fetchProduct(fetcher: FetchCaller<bo.IProduct>);
    /**
     * 查询 物料批次
     * @param fetcher 查询者
     */
    fetchMaterialBatch(fetcher: FetchCaller<bo.IMaterialBatch>);
    /**
     * 保存 物料批次
     * @param saver 保存者
     */
    saveMaterialBatch(saver: SaveCaller<bo.IMaterialBatch>);
    /**
     * 查询 物料批次日记账
     * @param fetcher 查询者
     */
    fetchMaterialBatchJournal(fetcher: FetchCaller<bo.IMaterialBatchJournal>);

    /**
    * 查询 物料序列
    * @param fetcher 查询者
    */
    fetchMaterialSerial(fetcher: FetchCaller<bo.IMaterialSerial>);
    /**
     * 保存 物料序列
     * @param saver 保存者
     */
    saveMaterialSerial(saver: SaveCaller<bo.IMaterialSerial>);
    /**
     * 查询 物料序列日记账
     * @param fetcher 查询者
     */
    fetchMaterialSerialJournal(fetcher: FetchCaller<bo.IMaterialSerialJournal>);

    /**
    * 查询 物料价格清单
    * @param fetcher 查询者
    */
    fetchMaterialPriceList(fetcher: FetchCaller<bo.IMaterialPriceList>);
    /**
     * 保存 物料价格清单
     * @param saver 保存者
     */
    saveMaterialPriceList(saver: SaveCaller<bo.IMaterialPriceList>);
    /**
     * 查询 物料数量
     * @param fetcher 查询者
     */
    fetchMaterialQuantity(fetcher: FetchCaller<bo.IMaterialQuantity>);
    /**
     * 查询 物料价格
     * @param fetcher 查询者
     */
    fetchMaterialPrice(fetcher: FetchCaller<bo.IMaterialPrice>);
}
