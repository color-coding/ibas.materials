package org.colorcoding.ibas.materials.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.repository.IBORepositoryApplication;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorycounting.IInventoryCounting;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransferrequest.IInventoryTransferRequest;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.IMaterialGroup;
import org.colorcoding.ibas.materials.bo.material.IMaterialPrice;
import org.colorcoding.ibas.materials.bo.material.IMaterialQuantity;
import org.colorcoding.ibas.materials.bo.material.IMaterialSubstitute;
import org.colorcoding.ibas.materials.bo.material.IMaterialVersion;
import org.colorcoding.ibas.materials.bo.material.IProduct;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialcatalog.IBusinessPartnerMaterialCatalog;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialEstimateJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialOrderedReservation;
import org.colorcoding.ibas.materials.bo.materialnumberassociation.IMaterialNumberAssociation;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialSpecialPrice;
import org.colorcoding.ibas.materials.bo.materialscrap.IMaterialScrap;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialspecification.IMaterialSpecification;
import org.colorcoding.ibas.materials.bo.picklists.IPickLists;
import org.colorcoding.ibas.materials.bo.specification.ISpecification;
import org.colorcoding.ibas.materials.bo.specification.SpecificationTree;
import org.colorcoding.ibas.materials.bo.unit.IUnit;
import org.colorcoding.ibas.materials.bo.unit.IUnitRate;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.data.MaterialInventoryTransfer;
import org.colorcoding.ibas.materials.data.MaterialNumberChange;

/**
 * Materials仓库应用
 */
public interface IBORepositoryMaterialsApp extends IBORepositoryApplication {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存发货
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IGoodsIssue> fetchGoodsIssue(ICriteria criteria);

	/**
	 * 保存-库存发货
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IGoodsIssue> saveGoodsIssue(IGoodsIssue bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存收货
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IGoodsReceipt> fetchGoodsReceipt(ICriteria criteria);

	/**
	 * 保存-库存收货
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IGoodsReceipt> saveGoodsReceipt(IGoodsReceipt bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存转储
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IInventoryTransfer> fetchInventoryTransfer(ICriteria criteria);

	/**
	 * 保存-库存转储
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IInventoryTransfer> saveInventoryTransfer(IInventoryTransfer bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterial> fetchMaterial(ICriteria criteria);

	/**
	 * 保存-物料
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterial> saveMaterial(IMaterial bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料组
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialGroup> fetchMaterialGroup(ICriteria criteria);

	/**
	 * 保存-物料组
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialGroup> saveMaterialGroup(IMaterialGroup bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料库存
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialInventory> fetchMaterialInventory(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库日记账
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialInventoryJournal> fetchMaterialInventoryJournal(ICriteria criteria);

	/**
	 * 保存-仓库日记账
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialInventoryJournal> saveMaterialInventoryJournal(IMaterialInventoryJournal bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料价格清单
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialPriceList> fetchMaterialPriceList(ICriteria criteria);

	/**
	 * 保存-物料价格清单
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialPriceList> saveMaterialPriceList(IMaterialPriceList bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料批次
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialBatch> fetchMaterialBatch(ICriteria criteria);

	/**
	 * 保存-物料批次
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialBatch> saveMaterialBatch(IMaterialBatch bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料批次日记账
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料序列
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialSerial> fetchMaterialSerial(ICriteria criteria);

	/**
	 * 保存-物料序列
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialSerial> saveMaterialSerial(IMaterialSerial bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料序列日记账
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IWarehouse> fetchWarehouse(ICriteria criteria);

	/**
	 * 保存-仓库
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IWarehouse> saveWarehouse(IWarehouse bo);

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料扩展（仓库库存，价格清单）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IProduct> fetchProduct(ICriteria criteria);

	/**
	 * 查询-物料库存扩展
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return
	 */
	IOperationResult<IProduct> fetchProductInventory(ICriteria criteria);

	/**
	 * 查询-物料价格
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialPrice> fetchMaterialPrice(ICriteria criteria);

	/**
	 * 查询-物料数量
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialQuantity> fetchMaterialQuantity(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库预估日记账
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialEstimateJournal> fetchMaterialEstimateJournal(ICriteria criteria);

	/**
	 * 保存-仓库预估日记账
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialEstimateJournal> saveMaterialEstimateJournal(IMaterialEstimateJournal bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存盘点
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IInventoryCounting> fetchInventoryCounting(ICriteria criteria);

	/**
	 * 保存-库存盘点
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IInventoryCounting> saveInventoryCounting(IInventoryCounting bo);

	/**
	 * 结算-库存盘点
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<String> closeInventoryCounting(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料规格
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialSpecification> fetchMaterialSpecification(ICriteria criteria);

	/**
	 * 保存-物料规格
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialSpecification> saveMaterialSpecification(IMaterialSpecification bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-规格模板
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<ISpecification> fetchSpecification(ICriteria criteria);

	/**
	 * 保存-规格模板
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<ISpecification> saveSpecification(ISpecification bo);

	/**
	 * 查询-规格树
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<SpecificationTree> fetchSpecificationTree(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-计量单位
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IUnit> fetchUnit(ICriteria criteria);

	/**
	 * 保存-计量单位
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IUnit> saveUnit(IUnit bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-计量单位换算率
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IUnitRate> fetchUnitRate(ICriteria criteria);

	/**
	 * 保存-计量单位换算率
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IUnitRate> saveUnitRate(IUnitRate bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料版本
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialVersion> fetchMaterialVersion(ICriteria criteria);

	/**
	 * 保存-物料版本
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialVersion> saveMaterialVersion(IMaterialVersion bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料废品率
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialScrap> fetchMaterialScrap(ICriteria criteria);

	/**
	 * 保存-物料废品率
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialScrap> saveMaterialScrap(IMaterialScrap bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料库存预留
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialInventoryReservation> fetchMaterialInventoryReservation(ICriteria criteria);

	/**
	 * 保存-物料库存预留
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialInventoryReservation> saveMaterialInventoryReservation(IMaterialInventoryReservation bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料替代
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialSubstitute> fetchMaterialSubstitute(ICriteria criteria);

	/**
	 * 保存-物料替代
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialSubstitute> saveMaterialSubstitute(IMaterialSubstitute bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料订购预留
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialOrderedReservation> fetchMaterialOrderedReservation(ICriteria criteria);

	/**
	 * 保存-物料订购预留
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialOrderedReservation> saveMaterialOrderedReservation(IMaterialOrderedReservation bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-拣配清单
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IPickLists> fetchPickLists(ICriteria criteria);

	/**
	 * 保存-拣配清单
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IPickLists> savePickLists(IPickLists bo);

	// --------------------------------------------------------------------------------------------//

	/**
	 * 改变批次/序列号
	 * 
	 * @param changes
	 * @return
	 */
	IOperationResult<Object> changeMaterialNumbers(MaterialNumberChange changes);

	/**
	 * 物料库存调拨
	 * 
	 * @param changes
	 * @return
	 */
	IOperationResult<Object> transferMaterialInventories(MaterialInventoryTransfer transfers);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存转储请求
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IInventoryTransferRequest> fetchInventoryTransferRequest(ICriteria criteria);

	/**
	 * 保存-库存转储请求
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IInventoryTransferRequest> saveInventoryTransferRequest(IInventoryTransferRequest bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料特殊价格
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialSpecialPrice> fetchMaterialSpecialPrice(ICriteria criteria);

	/**
	 * 保存-物料特殊价格
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialSpecialPrice> saveMaterialSpecialPrice(IMaterialSpecialPrice bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料系号关联
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IMaterialNumberAssociation> fetchMaterialNumberAssociation(ICriteria criteria);

	/**
	 * 保存-物料系号关联
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IMaterialNumberAssociation> saveMaterialNumberAssociation(IMaterialNumberAssociation bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务伙伴物料目录
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IBusinessPartnerMaterialCatalog> fetchBusinessPartnerMaterialCatalog(ICriteria criteria);

	/**
	 * 保存-业务伙伴物料目录
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IBusinessPartnerMaterialCatalog> saveBusinessPartnerMaterialCatalog(
			IBusinessPartnerMaterialCatalog bo);

	// --------------------------------------------------------------------------------------------//

}
