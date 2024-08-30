package org.colorcoding.ibas.materials.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.repository.IBORepositorySmartService;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorycounting.InventoryCounting;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransferrequest.InventoryTransferRequest;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.material.MaterialGroup;
import org.colorcoding.ibas.materials.bo.material.MaterialPrice;
import org.colorcoding.ibas.materials.bo.material.MaterialQuantity;
import org.colorcoding.ibas.materials.bo.material.MaterialSubstitute;
import org.colorcoding.ibas.materials.bo.material.MaterialVersion;
import org.colorcoding.ibas.materials.bo.material.Product;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialEstimateJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialOrderedReservation;
import org.colorcoding.ibas.materials.bo.materialnumberassociation.MaterialNumberAssociation;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialSpecialPrice;
import org.colorcoding.ibas.materials.bo.materialscrap.MaterialScrap;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialspecification.MaterialSpecification;
import org.colorcoding.ibas.materials.bo.picklists.PickLists;
import org.colorcoding.ibas.materials.bo.specification.Specification;
import org.colorcoding.ibas.materials.bo.specification.SpecificationTree;
import org.colorcoding.ibas.materials.bo.unit.Unit;
import org.colorcoding.ibas.materials.bo.unit.UnitRate;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.data.MaterialInventoryTransfer;
import org.colorcoding.ibas.materials.data.MaterialNumberChange;

/**
 * Materials仓库服务
 */
public interface IBORepositoryMaterialsSvc extends IBORepositorySmartService {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存发货
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<GoodsIssue> fetchGoodsIssue(ICriteria criteria, String token);

	/**
	 * 保存-库存发货
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<GoodsIssue> saveGoodsIssue(GoodsIssue bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存收货
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<GoodsReceipt> fetchGoodsReceipt(ICriteria criteria, String token);

	/**
	 * 保存-库存收货
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<GoodsReceipt> saveGoodsReceipt(GoodsReceipt bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存转储
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<InventoryTransfer> fetchInventoryTransfer(ICriteria criteria, String token);

	/**
	 * 保存-库存转储
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<InventoryTransfer> saveInventoryTransfer(InventoryTransfer bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<Material> fetchMaterial(ICriteria criteria, String token);

	/**
	 * 保存-物料
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<Material> saveMaterial(Material bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料批次
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialBatch> fetchMaterialBatch(ICriteria criteria, String token);

	/**
	 * 保存-物料批次
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialBatch> saveMaterialBatch(MaterialBatch bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料批次日记账
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料组
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialGroup> fetchMaterialGroup(ICriteria criteria, String token);

	/**
	 * 保存-物料组
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialGroup> saveMaterialGroup(MaterialGroup bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料库存
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialInventory> fetchMaterialInventory(ICriteria criteria, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库日记账
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialInventoryJournal> fetchMaterialInventoryJournal(ICriteria criteria, String token);

	/**
	 * 保存-仓库日记账
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialInventoryJournal> saveMaterialInventoryJournal(MaterialInventoryJournal bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料价格清单
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialPriceList> fetchMaterialPriceList(ICriteria criteria, String token);

	/**
	 * 保存-物料价格清单
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialPriceList> saveMaterialPriceList(MaterialPriceList bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料序列
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSerial> fetchMaterialSerial(ICriteria criteria, String token);

	/**
	 * 保存-物料序列
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSerial> saveMaterialSerial(MaterialSerial bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料序列日记账
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<Warehouse> fetchWarehouse(ICriteria criteria, String token);

	/**
	 * 保存-仓库
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<Warehouse> saveWarehouse(Warehouse bo, String token);

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料扩展（仓库库存-价格清单）
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return
	 */
	OperationResult<Product> fetchProduct(ICriteria criteria, String token);

	/**
	 * 查询-物料库存扩展
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return
	 */
	OperationResult<Product> fetchProductInventory(ICriteria criteria, String token);

	/**
	 * 查询-物料价格
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialPrice> fetchMaterialPrice(ICriteria criteria, String token);

	/**
	 * 查询-物料数量
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialQuantity> fetchMaterialQuantity(ICriteria criteria, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库预估日记账
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialEstimateJournal> fetchMaterialEstimateJournal(ICriteria criteria, String token);

	/**
	 * 保存-仓库预估日记账
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialEstimateJournal> saveMaterialEstimateJournal(MaterialEstimateJournal bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存盘点
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<InventoryCounting> fetchInventoryCounting(ICriteria criteria, String token);

	/**
	 * 保存-库存盘点
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<InventoryCounting> saveInventoryCounting(InventoryCounting bo, String token);

	/**
	 * 结算-库存盘点
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<String> closeInventoryCounting(ICriteria criteria, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料规格
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSpecification> fetchMaterialSpecification(ICriteria criteria, String token);

	/**
	 * 保存-物料规格
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSpecification> saveMaterialSpecification(MaterialSpecification bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-规格模板
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<Specification> fetchSpecification(ICriteria criteria, String token);

	/**
	 * 保存-规格模板
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<Specification> saveSpecification(Specification bo, String token);

	/**
	 * 查询-规格树
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<SpecificationTree> fetchSpecificationTree(ICriteria criteria, String token);
	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-计量单位
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<Unit> fetchUnit(ICriteria criteria, String token);

	/**
	 * 保存-计量单位
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<Unit> saveUnit(Unit bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-计量单位换算率
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<UnitRate> fetchUnitRate(ICriteria criteria, String token);

	/**
	 * 保存-计量单位换算率
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<UnitRate> saveUnitRate(UnitRate bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料废品率
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialScrap> fetchMaterialScrap(ICriteria criteria, String token);

	/**
	 * 保存-物料废品率
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialScrap> saveMaterialScrap(MaterialScrap bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料版本
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialVersion> fetchMaterialVersion(ICriteria criteria, String token);

	/**
	 * 保存-物料版本
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialVersion> saveMaterialVersion(MaterialVersion bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料库存预留
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialInventoryReservation> fetchMaterialInventoryReservation(ICriteria criteria, String token);

	/**
	 * 保存-物料库存预留
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialInventoryReservation> saveMaterialInventoryReservation(MaterialInventoryReservation bo,
			String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料替代
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSubstitute> fetchMaterialSubstitute(ICriteria criteria, String token);

	/**
	 * 保存-物料替代
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSubstitute> saveMaterialSubstitute(MaterialSubstitute bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料订购预留
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialOrderedReservation> fetchMaterialOrderedReservation(ICriteria criteria, String token);

	/**
	 * 保存-物料订购预留
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialOrderedReservation> saveMaterialOrderedReservation(MaterialOrderedReservation bo,
			String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-拣配清单
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<PickLists> fetchPickLists(ICriteria criteria, String token);

	/**
	 * 保存-拣配清单
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<PickLists> savePickLists(PickLists bo, String token);

	// --------------------------------------------------------------------------------------------//

	/**
	 * 改变批次/序列号
	 * 
	 * @param changes
	 * @return
	 */
	OperationResult<Object> changeMaterialNumbers(MaterialNumberChange changes, String token);

	/**
	 * 物料库存调拨
	 * 
	 * @param changes
	 * @return
	 */
	OperationResult<Object> transferMaterialInventories(MaterialInventoryTransfer transfers, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存转储请求
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<InventoryTransferRequest> fetchInventoryTransferRequest(ICriteria criteria, String token);

	/**
	 * 保存-库存转储请求
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<InventoryTransferRequest> saveInventoryTransferRequest(InventoryTransferRequest bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料特殊价格
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSpecialPrice> fetchMaterialSpecialPrice(ICriteria criteria, String token);

	/**
	 * 保存-物料特殊价格
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialSpecialPrice> saveMaterialSpecialPrice(MaterialSpecialPrice bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料系号关联
	 * @param criteria 查询
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialNumberAssociation> fetchMaterialNumberAssociation(ICriteria criteria, String token);

	/**
	 * 保存-物料系号关联
	 * @param bo 对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<MaterialNumberAssociation> saveMaterialNumberAssociation(MaterialNumberAssociation bo,
			String token);

	// --------------------------------------------------------------------------------------------//
}
