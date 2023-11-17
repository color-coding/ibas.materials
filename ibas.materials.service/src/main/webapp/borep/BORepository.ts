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
             * 查询 仓库预估日记账
             * @param fetcher 查询者
             */
            fetchMaterialEstimateJournal(fetcher: ibas.IFetchCaller<bo.MaterialEstimateJournal>): void {
                super.fetch(bo.MaterialEstimateJournal.name, fetcher);
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
            /**
             * 结算 库存盘点
             * @param fetcher 查询者
             */
            closeInventoryCounting(closer: ICloseCaller<bo.IInventoryCounting>): void {
                let boRepository: ibas.BORepositoryAjax = new ibas.BORepositoryAjax();
                boRepository.address = this.address;
                boRepository.token = this.token;
                boRepository.converter = this.createConverter();
                if (closer.criteria instanceof Array) {
                    // 替换查询条件数组
                    let criteria: ibas.Criteria = new ibas.Criteria();
                    for (let item of closer.criteria) {
                        if (ibas.objects.instanceOf(item, ibas.Condition)) {
                            criteria.conditions.add(item);
                        } else {
                            throw new Error(ibas.i18n.prop("sys_invalid_parameter", "criteria"));
                        }
                    }
                    closer.criteria = criteria;
                } else if (closer.criteria instanceof bo.InventoryCounting) {
                    let criteria: ibas.Criteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.InventoryCounting.PROPERTY_DOCENTRY_NAME;
                    condition.value = closer.criteria.docEntry.toString();
                    closer.criteria = criteria;
                }
                let data: string = JSON.stringify(boRepository.converter.convert(closer.criteria, "closeInventoryCounting"));
                boRepository.callRemoteMethod("closeInventoryCounting", data, (opRslt) => {
                    closer.onCompleted.call(ibas.objects.isNull(closer.caller) ? closer : closer.caller, opRslt);
                });
            }
            /**
             * 查询 规格模板
             * @param fetcher 查询者
             */
            fetchSpecification(fetcher: ibas.IFetchCaller<bo.Specification>): void {
                super.fetch(bo.Specification.name, fetcher);
            }
            /**
             * 保存 规格模板
             * @param saver 保存者
             */
            saveSpecification(saver: ibas.ISaveCaller<bo.Specification>): void {
                super.save(bo.Specification.name, saver);
            }
            /**
             * 查询 规格树
             * @param fetcher 查询者
             */
            fetchSpecificationTree(fetcher: ibas.IFetchCaller<bo.SpecificationTree>): void {
                super.fetch(bo.SpecificationTree.name, fetcher);
            }
            /**
             * 查询 物料规格
             * @param fetcher 查询者
             */
            fetchMaterialSpecification(fetcher: ibas.IFetchCaller<bo.MaterialSpecification>): void {
                super.fetch(bo.MaterialSpecification.name, fetcher);
            }
            /**
             * 保存 物料规格
             * @param saver 保存者
             */
            saveMaterialSpecification(saver: ibas.ISaveCaller<bo.MaterialSpecification>): void {
                super.save(bo.MaterialSpecification.name, saver);
            }
            /**
             * 查询 计量单位
             * @param fetcher 查询者
             */
            fetchUnit(fetcher: ibas.IFetchCaller<bo.Unit>): void {
                super.fetch(bo.Unit.name, fetcher);
            }
            /**
             * 保存 计量单位
             * @param saver 保存者
             */
            saveUnit(saver: ibas.ISaveCaller<bo.Unit>): void {
                super.save(bo.Unit.name, saver);
            }
            /**
             * 查询 计量单位换算率
             * @param fetcher 查询者
             */
            fetchUnitRate(fetcher: ibas.IFetchCaller<bo.UnitRate>): void {
                super.fetch(bo.UnitRate.name, fetcher);
            }
            /**
             * 保存 计量单位换算率
             * @param saver 保存者
             */
            saveUnitRate(saver: ibas.ISaveCaller<bo.UnitRate>): void {
                super.save(bo.UnitRate.name, saver);
            }
            /**
             * 查询 物料废品率
             * @param fetcher 查询者
             */
            fetchMaterialScrap(fetcher: ibas.IFetchCaller<bo.MaterialScrap>): void {
                super.fetch(bo.MaterialScrap.name, fetcher);
            }
            /**
             * 保存 物料废品率
             * @param saver 保存者
             */
            saveMaterialScrap(saver: ibas.ISaveCaller<bo.MaterialScrap>): void {
                super.save(bo.MaterialScrap.name, saver);
            }
            /**
             * 查询 物料版本
             * @param fetcher 查询者
             */
            fetchMaterialVersion(fetcher: ibas.IFetchCaller<bo.MaterialVersion>): void {
                super.fetch(bo.MaterialVersion.name, fetcher);
            }
            /**
             * 保存 物料版本
             * @param saver 保存者
             */
            saveMaterialVersion(saver: ibas.ISaveCaller<bo.MaterialVersion>): void {
                super.save(bo.MaterialVersion.name, saver);
            }
            /**
             * 查询 物料库存预留
             * @param fetcher 查询者
             */
            fetchMaterialInventoryReservation(fetcher: ibas.IFetchCaller<bo.MaterialInventoryReservation>): void {
                super.fetch(bo.MaterialInventoryReservation.name, fetcher);
            }
            /**
             * 保存 物料库存预留
             * @param saver 保存者
             */
            saveMaterialInventoryReservation(saver: ibas.ISaveCaller<bo.MaterialInventoryReservation>): void {
                super.save(bo.MaterialInventoryReservation.name, saver);
            }

            /**
             * 查询 物料替代
             * @param fetcher 查询者
             */
            fetchMaterialSubstitute(fetcher: ibas.IFetchCaller<bo.MaterialSubstitute>): void {
                super.fetch(bo.MaterialSubstitute.name, fetcher);
            }
            /**
             * 保存 物料替代
             * @param saver 保存者
             */
            saveMaterialSubstitute(saver: ibas.ISaveCaller<bo.MaterialSubstitute>): void {
                super.save(bo.MaterialSubstitute.name, saver);
            }
            /**
             * 查询 物料订购预留
             * @param fetcher 查询者
             */
            fetchMaterialOrderedReservation(fetcher: ibas.IFetchCaller<bo.MaterialOrderedReservation>): void {
                super.fetch(bo.MaterialOrderedReservation.name, fetcher);
            }
            /**
             * 保存 物料订购预留
             * @param saver 保存者
             */
            saveMaterialOrderedReservation(saver: ibas.ISaveCaller<bo.MaterialOrderedReservation>): void {
                super.save(bo.MaterialOrderedReservation.name, saver);
            }
            /**
             * 查询 拣配清单
             * @param fetcher 查询者
             */
            fetchPickLists(fetcher: ibas.IFetchCaller<bo.PickLists>): void {
                super.fetch(bo.PickLists.name, fetcher);
            }
            /**
             * 保存 拣配清单
             * @param saver 保存者
             */
            savePickLists(saver: ibas.ISaveCaller<bo.PickLists>): void {
                super.save(bo.PickLists.name, saver);
            }

        }
    }
}