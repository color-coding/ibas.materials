/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {

        /** 业务仓库 */
        export interface IBORepositoryMaterials extends ibas.IBORepositoryApplication {

            /**
             * 上传文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void;
            /**
             * 下载文件
             * @param caller 调用者
             */
            download(caller: ibas.IDownloadFileCaller<Blob>): void;
            /**
             * 查询 库存发货
             * @param fetcher 查询者
             */
            fetchGoodsIssue(fetcher: ibas.IFetchCaller<bo.IGoodsIssue>): void;
            /**
             * 保存 库存发货
             * @param saver 保存者
             */
            saveGoodsIssue(saver: ibas.ISaveCaller<bo.IGoodsIssue>): void;

            /**
             * 查询 库存收货
             * @param fetcher 查询者
             */
            fetchGoodsReceipt(fetcher: ibas.IFetchCaller<bo.IGoodsReceipt>): void;
            /**
             * 保存 库存收货
             * @param saver 保存者
             */
            saveGoodsReceipt(saver: ibas.ISaveCaller<bo.IGoodsReceipt>): void;

            /**
             * 查询 库存转储
             * @param fetcher 查询者
             */
            fetchInventoryTransfer(fetcher: ibas.IFetchCaller<bo.IInventoryTransfer>): void;
            /**
             * 保存 库存转储
             * @param saver 保存者
             */
            saveInventoryTransfer(saver: ibas.ISaveCaller<bo.IInventoryTransfer>): void;

            /**
             * 查询 物料
             * @param fetcher 查询者
             */
            fetchMaterial(fetcher: ibas.IFetchCaller<bo.IMaterial>): void;
            /**
             * 保存 物料
             * @param saver 保存者
             */
            saveMaterial(saver: ibas.ISaveCaller<bo.IMaterial>): void;

            /**
             * 查询 物料组
             * @param fetcher 查询者
             */
            fetchMaterialGroup(fetcher: ibas.IFetchCaller<bo.IMaterialGroup>): void;
            /**
             * 保存 物料组
             * @param saver 保存者
             */
            saveMaterialGroup(saver: ibas.ISaveCaller<bo.IMaterialGroup>): void;

            /**
             * 查询 物料库存
             * @param fetcher 查询者
             */
            fetchMaterialInventory(fetcher: ibas.IFetchCaller<bo.IMaterialInventory>): void;

            /**
             * 查询 仓库日记账
             * @param fetcher 查询者
             */
            fetchMaterialInventoryJournal(fetcher: ibas.IFetchCaller<bo.IMaterialInventoryJournal>): void;
            /**
             * 保存 仓库日记账
             * @param saver 保存者
             */
            saveMaterialInventoryJournal(saver: ibas.ISaveCaller<bo.IMaterialInventoryJournal>): void;

            /**
             * 查询 仓库
             * @param fetcher 查询者
             */
            fetchWarehouse(fetcher: ibas.IFetchCaller<bo.IWarehouse>): void;
            /**
             * 保存 仓库
             * @param saver 保存者
             */
            saveWarehouse(saver: ibas.ISaveCaller<bo.IWarehouse>): void;
            /**
             * 查询 物料扩展
             * @param fetcher 查询者
             */
            fetchProduct(fetcher: ibas.IFetchCaller<bo.IProduct>): void;
            /**
             * 查询 物料批次
             * @param fetcher 查询者
             */
            fetchMaterialBatch(fetcher: ibas.IFetchCaller<bo.IMaterialBatch>): void;
            /**
             * 保存 物料批次
             * @param saver 保存者
             */
            saveMaterialBatch(saver: ibas.ISaveCaller<bo.IMaterialBatch>): void;
            /**
             * 查询 物料批次日记账
             * @param fetcher 查询者
             */
            fetchMaterialBatchJournal(fetcher: ibas.IFetchCaller<bo.IMaterialBatchJournal>): void;

            /**
             * 查询 物料序列
             * @param fetcher 查询者
             */
            fetchMaterialSerial(fetcher: ibas.IFetchCaller<bo.IMaterialSerial>): void;
            /**
             * 保存 物料序列
             * @param saver 保存者
             */
            saveMaterialSerial(saver: ibas.ISaveCaller<bo.IMaterialSerial>): void;
            /**
             * 查询 物料序列日记账
             * @param fetcher 查询者
             */
            fetchMaterialSerialJournal(fetcher: ibas.IFetchCaller<bo.IMaterialSerialJournal>): void;

            /**
             * 查询 物料价格清单
             * @param fetcher 查询者
             */
            fetchMaterialPriceList(fetcher: ibas.IFetchCaller<bo.IMaterialPriceList>): void;
            /**
             * 保存 物料价格清单
             * @param saver 保存者
             */
            saveMaterialPriceList(saver: ibas.ISaveCaller<bo.IMaterialPriceList>): void;
            /**
             * 查询 物料数量
             * @param fetcher 查询者
             */
            fetchMaterialQuantity(fetcher: ibas.IFetchCaller<bo.IMaterialQuantity>): void;
            /**
             * 查询 物料价格
             * @param fetcher 查询者
             */
            fetchMaterialPrice(fetcher: ibas.IFetchCaller<bo.IMaterialPrice>): void;
        }
    }
}