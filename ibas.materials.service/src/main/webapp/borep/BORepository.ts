/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {

        /** 业务对象仓库 */
        export class BORepositoryMaterials extends ibas.BORepositoryApplication implements IBORepositoryMaterials {

            /** 创建此模块的后端与前端数据的转换者 */
            protected createConverter(): ibas.IDataConverter {
                return new DataConverter;
            }
            /**
             * 获取地址
             */
            toUrl(filename: string): string {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let url: string = this.address.replace("/services/rest/data/", "/services/rest/file/");
                url += ibas.strings.format("{0}?token={1}", filename, this.token);
                return encodeURI(url);
            }
            /**
             * 上传文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let fileRepository: ibas.FileRepositoryUploadAjax = new ibas.FileRepositoryUploadAjax();
                fileRepository.address = this.address.replace("/services/rest/data/", "/services/rest/file/");
                fileRepository.token = this.token;
                fileRepository.converter = this.createConverter();
                fileRepository.upload("upload", caller);
            }
            /**
             * 下载文件
             * @param caller 调用者
             */
            download(caller: ibas.IDownloadFileCaller<Blob>): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let fileRepository: ibas.FileRepositoryDownloadAjax = new ibas.FileRepositoryDownloadAjax();
                fileRepository.address = this.address.replace("/services/rest/data/", "/services/rest/file/");
                fileRepository.token = this.token;
                fileRepository.converter = this.createConverter();
                fileRepository.download("download", caller);
            }
            /**
             * 查询 库存发货
             * @param fetcher 查询者
             */
            fetchGoodsIssue(fetcher: ibas.IFetchCaller<bo.GoodsIssue>): void {
                super.fetch(bo.GoodsIssue.name, fetcher);
            }
            /**
             * 保存 库存发货
             * @param saver 保存者
             */
            saveGoodsIssue(saver: ibas.ISaveCaller<bo.GoodsIssue>): void {
                super.save(bo.GoodsIssue.name, saver);
            }

            /**
             * 查询 库存收货
             * @param fetcher 查询者
             */
            fetchGoodsReceipt(fetcher: ibas.IFetchCaller<bo.GoodsReceipt>): void {
                super.fetch(bo.GoodsReceipt.name, fetcher);
            }
            /**
             * 保存 库存收货
             * @param saver 保存者
             */
            saveGoodsReceipt(saver: ibas.ISaveCaller<bo.GoodsReceipt>): void {
                super.save(bo.GoodsReceipt.name, saver);
            }

            /**
             * 查询 库存转储
             * @param fetcher 查询者
             */
            fetchInventoryTransfer(fetcher: ibas.IFetchCaller<bo.InventoryTransfer>): void {
                super.fetch(bo.InventoryTransfer.name, fetcher);
            }
            /**
             * 保存 库存转储
             * @param saver 保存者
             */
            saveInventoryTransfer(saver: ibas.ISaveCaller<bo.InventoryTransfer>): void {
                super.save(bo.InventoryTransfer.name, saver);
            }

            /**
             * 查询 物料
             * @param fetcher 查询者
             */
            fetchMaterial(fetcher: ibas.IFetchCaller<bo.Material>): void {
                super.fetch(bo.Material.name, fetcher);
            }
            /**
             * 保存 物料
             * @param saver 保存者
             */
            saveMaterial(saver: ibas.ISaveCaller<bo.Material>): void {
                super.save(bo.Material.name, saver);
            }

            /**
             * 查询 物料组
             * @param fetcher 查询者
             */
            fetchMaterialGroup(fetcher: ibas.IFetchCaller<bo.MaterialGroup>): void {
                super.fetch(bo.MaterialGroup.name, fetcher);
            }
            /**
             * 保存 物料组
             * @param saver 保存者
             */
            saveMaterialGroup(saver: ibas.ISaveCaller<bo.MaterialGroup>): void {
                super.save(bo.MaterialGroup.name, saver);
            }

            /**
             * 查询 物料库存
             * @param fetcher 查询者
             */
            fetchMaterialInventory(fetcher: ibas.IFetchCaller<bo.MaterialInventory>): void {
                super.fetch(bo.MaterialInventory.name, fetcher);
            }

            /**
             * 查询 仓库日记账
             * @param fetcher 查询者
             */
            fetchMaterialInventoryJournal(fetcher: ibas.IFetchCaller<bo.MaterialInventoryJournal>): void {
                super.fetch(bo.MaterialInventoryJournal.name, fetcher);
            }
            /**
             * 保存 仓库日记账
             * @param saver 保存者
             */
            saveMaterialInventoryJournal(saver: ibas.ISaveCaller<bo.MaterialInventoryJournal>): void {
                super.save(bo.MaterialInventoryJournal.name, saver);
            }

            /**
             * 查询 仓库
             * @param fetcher 查询者
             */
            fetchWarehouse(fetcher: ibas.IFetchCaller<bo.Warehouse>): void {
                super.fetch(bo.Warehouse.name, fetcher);
            }
            /**
             * 保存 仓库
             * @param saver 保存者
             */
            saveWarehouse(saver: ibas.ISaveCaller<bo.Warehouse>): void {
                super.save(bo.Warehouse.name, saver);
            }

            /**
             * 查询 物料扩展（仓库库存、价格清单）
             * @param fetcher 查询者
             */
            fetchProduct(fetcher: ibas.IFetchCaller<bo.Product>): void {
                super.fetch(bo.Product.name, fetcher);
            }

            /**
             *  查询 物料批次
             * @param fetcher 查询者
             */
            fetchMaterialBatch(fetcher: ibas.IFetchCaller<bo.MaterialBatch>): void {
                super.fetch(bo.MaterialBatch.name, fetcher);
            }
            /**
             * 保存 物料批次
             * @param saver 保存者
             */
            saveMaterialBatch(saver: ibas.ISaveCaller<bo.MaterialBatch>): void {
                super.save(bo.MaterialBatch.name, saver);
            }
            /**
             *  查询 物料批次日记账
             * @param fetcher 查询者
             */
            fetchMaterialBatchJournal(fetcher: ibas.IFetchCaller<bo.MaterialBatchJournal>): void {
                super.fetch(bo.MaterialBatchJournal.name, fetcher);
            }
            /**
             *  查询 物料序列
             * @param fetcher 查询者
             */
            fetchMaterialSerial(fetcher: ibas.IFetchCaller<bo.MaterialSerial>): void {
                super.fetch(bo.MaterialSerial.name, fetcher);
            }
            /**
             * 保存 物料序列
             * @param saver 保存者
             */
            saveMaterialSerial(saver: ibas.ISaveCaller<bo.MaterialSerial>): void {
                super.save(bo.MaterialSerial.name, saver);
            }
            /**
             *  查询 物料序列日记账
             * @param fetcher 查询者
             */
            fetchMaterialSerialJournal(fetcher: ibas.IFetchCaller<bo.MaterialSerialJournal>): void {
                super.fetch(bo.MaterialSerialJournal.name, fetcher);
            }
            /**
             *  查询 物料价格清单
             * @param fetcher 查询者
             */
            fetchMaterialPriceList(fetcher: ibas.IFetchCaller<bo.MaterialPriceList>): void {
                super.fetch(bo.MaterialPriceList.name, fetcher);
            }
            /**
             * 保存 物料价格清单
             * @param saver 保存者
             */
            saveMaterialPriceList(saver: ibas.ISaveCaller<bo.MaterialPriceList>): void {
                super.save(bo.MaterialPriceList.name, saver);
            }
            /**
             * 查询 物料数量
             * @param fetcher 查询者
             */
            fetchMaterialQuantity(fetcher: ibas.IFetchCaller<bo.MaterialQuantity>): void {
                super.fetch(bo.MaterialQuantity.name, fetcher);
            }
            /**
             * 查询 物料价格
             * @param fetcher 查询者
             */
            fetchMaterialPrice(fetcher: ibas.IFetchCaller<bo.MaterialPrice>): void {
                super.fetch(bo.MaterialPrice.name, fetcher);
            }
            /**
             * 查询 库存盘点
             * @param fetcher 查询者
             */
            fetchInventoryCounting(fetcher: ibas.IFetchCaller<bo.InventoryCounting>): void {
                super.fetch(bo.InventoryCounting.name, fetcher);
            }
            /**
             * 保存 库存盘点
             * @param saver 保存者
             */
            saveInventoryCounting(saver: ibas.ISaveCaller<bo.InventoryCounting>): void {
                super.save(bo.InventoryCounting.name, saver);
            }
        }
    }
}