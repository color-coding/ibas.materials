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
             * 查询 仓库预估日记账
             * @param fetcher 查询者
             */
            fetchMaterialEstimateJournal(fetcher: ibas.IFetchCaller<bo.IMaterialEstimateJournal>): void;

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
             * 查询 库存盘点
             * @param fetcher 查询者
             */
            fetchInventoryCounting(fetcher: ibas.IFetchCaller<bo.IInventoryCounting>): void;
            /**
             * 保存 库存盘点
             * @param saver 保存者
             */
            saveInventoryCounting(saver: ibas.ISaveCaller<bo.IInventoryCounting>): void;
            /**
             * 结算 库存盘点
             * @param fetcher 查询者
             */
            closeInventoryCounting(closer: ICloseCaller<bo.IInventoryCounting>): void;
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
            /**
             * 查询 物料规格
             * @param fetcher 查询者
             */
            fetchMaterialSpecification(fetcher: ibas.IFetchCaller<bo.IMaterialSpecification>): void;
            /**
             * 保存 物料规格
             * @param saver 保存者
             */
            saveMaterialSpecification(saver: ibas.ISaveCaller<bo.IMaterialSpecification>): void;
            /**
             * 查询 规格模板
             * @param fetcher 查询者
             */
            fetchSpecification(fetcher: ibas.IFetchCaller<bo.ISpecification>): void;
            /**
             * 保存 规格模板
             * @param saver 保存者
             */
            saveSpecification(saver: ibas.ISaveCaller<bo.ISpecification>): void;
            /**
             * 查询 规格树
             * @param fetcher 查询者
             */
            fetchSpecificationTree(fetcher: ibas.IFetchCaller<bo.ISpecificationTree>): void;
            /**
             * 查询 计量单位
             * @param fetcher 查询者
             */
            fetchUnit(fetcher: ibas.IFetchCaller<bo.IUnit>): void;
            /**
             * 保存 计量单位
             * @param saver 保存者
             */
            saveUnit(saver: ibas.ISaveCaller<bo.IUnit>): void;
            /**
             * 查询 计量单位换算率
             * @param fetcher 查询者
             */
            fetchUnitRate(fetcher: ibas.IFetchCaller<bo.IUnitRate>): void;
            /**
             * 保存 计量单位换算率
             * @param saver 保存者
             */
            saveUnitRate(saver: ibas.ISaveCaller<bo.IUnitRate>): void;
            /**
             * 查询 物料废品率
             * @param fetcher 查询者
             */
            fetchMaterialScrap(fetcher: ibas.IFetchCaller<bo.IMaterialScrap>): void;
            /**
             * 保存 物料废品率
             * @param saver 保存者
             */
            saveMaterialScrap(saver: ibas.ISaveCaller<bo.IMaterialScrap>): void;
            /**
             * 查询 物料版本
             * @param fetcher 查询者
             */
            fetchMaterialVersion(fetcher: ibas.IFetchCaller<bo.IMaterialVersion>): void;
            /**
             * 保存 物料版本
             * @param saver 保存者
             */
            saveMaterialVersion(saver: ibas.ISaveCaller<bo.IMaterialVersion>): void;
            /**
             * 查询 物料库存预留
             * @param fetcher 查询者
             */
            fetchMaterialInventoryReservation(fetcher: ibas.IFetchCaller<bo.IMaterialInventoryReservation>): void;
            /**
             * 保存 物料库存预留
             * @param saver 保存者
             */
            saveMaterialInventoryReservation(saver: ibas.ISaveCaller<bo.IMaterialInventoryReservation>): void;
            /**
             * 查询 物料替代
             * @param fetcher 查询者
             */
            fetchMaterialSubstitute(fetcher: ibas.IFetchCaller<bo.IMaterialSubstitute>): void;
            /**
             * 保存 物料替代
             * @param saver 保存者
             */
            saveMaterialSubstitute(saver: ibas.ISaveCaller<bo.IMaterialSubstitute>): void;
            /**
             * 查询 物料订购预留
             * @param fetcher 查询者
             */
            fetchMaterialOrderedReservation(fetcher: ibas.IFetchCaller<bo.IMaterialOrderedReservation>): void;
            /**
             * 保存 物料订购预留
             * @param saver 保存者
             */
            saveMaterialOrderedReservation(saver: ibas.ISaveCaller<bo.IMaterialOrderedReservation>): void;
            /**
             * 查询 拣配清单
             * @param fetcher 查询者
             */
            fetchPickLists(fetcher: ibas.IFetchCaller<bo.IPickLists>): void;
            /**
             * 保存 拣配清单
             * @param saver 保存者
             */
            savePickLists(saver: ibas.ISaveCaller<bo.IPickLists>): void;
            /**
             * 查询 库存转储请求
             * @param fetcher 查询者
             */
            fetchInventoryTransferRequest(fetcher: ibas.IFetchCaller<bo.IInventoryTransferRequest>): void;
            /**
             * 保存 库存转储请求
             * @param saver 保存者
             */
            saveInventoryTransferRequest(saver: ibas.ISaveCaller<bo.IInventoryTransferRequest>): void;
            /**
             * 查询 物料特殊价格
             * @param fetcher 查询者
             */
            fetchMaterialSpecialPrice(fetcher: ibas.IFetchCaller<bo.IMaterialSpecialPrice>): void;
            /**
             * 保存 物料特殊价格
             * @param saver 保存者
             */
            saveMaterialSpecialPrice(saver: ibas.ISaveCaller<bo.IMaterialSpecialPrice>): void;

            /**
             * 查询 物料系号关联
             * @param fetcher 查询者
             */
            fetchMaterialNumberAssociation(fetcher: ibas.IFetchCaller<bo.IMaterialNumberAssociation>): void;
            /**
             * 保存 物料系号关联
             * @param saver 保存者
             */
            saveMaterialNumberAssociation(saver: ibas.ISaveCaller<bo.IMaterialNumberAssociation>): void;
            /**
             * 查询 业务伙伴物料目录
             * @param fetcher 查询者
             */
            fetchBusinessPartnerMaterialCatalog(fetcher: ibas.IFetchCaller<bo.IBusinessPartnerMaterialCatalog>): void;
            /**
             * 保存 业务伙伴物料目录
             * @param saver 保存者
             */
            saveBusinessPartnerMaterialCatalog(saver: ibas.ISaveCaller<bo.IBusinessPartnerMaterialCatalog>): void;
            /**
             * 查询 计划组
             * @param fetcher 查询者
             */
            fetchSchedulingGroup(fetcher: ibas.IFetchCaller<bo.ISchedulingGroup>): void;
            /**
             * 保存 计划组
             * @param saver 保存者
             */
            saveSchedulingGroup(saver: ibas.ISaveCaller<bo.ISchedulingGroup>): void;



        }
        export interface ICloseCaller<T> extends ibas.IMethodCaller<string> {
            /** 查询条件 */
            criteria: ibas.ICriteria | ibas.ICondition[] | T;
        }
    }
}