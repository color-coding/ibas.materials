package org.colorcoding.ibas.materials.repository;

import java.math.BigDecimal;
import java.util.Comparator;

import org.colorcoding.ibas.accounting.bo.currency.CurrencyRate;
import org.colorcoding.ibas.accounting.bo.currency.ICurrencyRate;
import org.colorcoding.ibas.accounting.repository.BORepositoryAccounting;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.IChildCriteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emDocumentStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.businesspartner.bo.customer.Customer;
import org.colorcoding.ibas.businesspartner.bo.customer.ICustomer;
import org.colorcoding.ibas.businesspartner.bo.supplier.ISupplier;
import org.colorcoding.ibas.businesspartner.bo.supplier.Supplier;
import org.colorcoding.ibas.businesspartner.data.emBusinessPartnerType;
import org.colorcoding.ibas.businesspartner.repository.BORepositoryBusinessPartner;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssueLine;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceiptLine;
import org.colorcoding.ibas.materials.bo.inventorycounting.IInventoryCounting;
import org.colorcoding.ibas.materials.bo.inventorycounting.IInventoryCountingLine;
import org.colorcoding.ibas.materials.bo.inventorycounting.InventoryCounting;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransferrequest.IInventoryTransferRequest;
import org.colorcoding.ibas.materials.bo.inventorytransferrequest.InventoryTransferRequest;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.IMaterialGroup;
import org.colorcoding.ibas.materials.bo.material.IMaterialPrice;
import org.colorcoding.ibas.materials.bo.material.IMaterialQuantity;
import org.colorcoding.ibas.materials.bo.material.IMaterialSubstitute;
import org.colorcoding.ibas.materials.bo.material.IMaterialVersion;
import org.colorcoding.ibas.materials.bo.material.IProduct;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.material.MaterialBase;
import org.colorcoding.ibas.materials.bo.material.MaterialGroup;
import org.colorcoding.ibas.materials.bo.material.MaterialPrice;
import org.colorcoding.ibas.materials.bo.material.MaterialQuantity;
import org.colorcoding.ibas.materials.bo.material.MaterialSubstitute;
import org.colorcoding.ibas.materials.bo.material.MaterialVersion;
import org.colorcoding.ibas.materials.bo.material.Product;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItem;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialEstimateJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialOrderedReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialEstimateJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialOrderedReservation;
import org.colorcoding.ibas.materials.bo.materialnumberassociation.IMaterialNumberAssociation;
import org.colorcoding.ibas.materials.bo.materialnumberassociation.MaterialNumberAssociation;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialSpecialPrice;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialSpecialPrice;
import org.colorcoding.ibas.materials.bo.materialscrap.IMaterialScrap;
import org.colorcoding.ibas.materials.bo.materialscrap.MaterialScrap;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItem;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialspecification.IMaterialSpecification;
import org.colorcoding.ibas.materials.bo.materialspecification.MaterialSpecification;
import org.colorcoding.ibas.materials.bo.picklists.IPickLists;
import org.colorcoding.ibas.materials.bo.picklists.PickLists;
import org.colorcoding.ibas.materials.bo.specification.ISpecification;
import org.colorcoding.ibas.materials.bo.specification.Specification;
import org.colorcoding.ibas.materials.bo.specification.SpecificationTree;
import org.colorcoding.ibas.materials.bo.unit.IUnit;
import org.colorcoding.ibas.materials.bo.unit.IUnitRate;
import org.colorcoding.ibas.materials.bo.unit.Unit;
import org.colorcoding.ibas.materials.bo.unit.UnitRate;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.MaterialInventoryTransfer;
import org.colorcoding.ibas.materials.data.MaterialNumberChange;
import org.colorcoding.ibas.materials.data.emSpecificationAssigned;
import org.colorcoding.ibas.materials.data.emSpecificationTarget;

/**
 * Materials仓库
 */
public class BORepositoryMaterials extends BORepositoryServiceApplication
		implements IBORepositoryMaterialsSvc, IBORepositoryMaterialsApp {

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-库存发货
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<GoodsIssue> fetchGoodsIssue(ICriteria criteria, String token) {
		return super.fetch(criteria, token, GoodsIssue.class);
	}

	/**
	 * 查询-库存发货（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IGoodsIssue> fetchGoodsIssue(ICriteria criteria) {
		return new OperationResult<IGoodsIssue>(this.fetchGoodsIssue(criteria, this.getUserToken()));
	}

	/**
	 * 保存-库存发货
	 *
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<GoodsIssue> saveGoodsIssue(GoodsIssue bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-库存发货（提前设置用户口令）
	 *
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IGoodsIssue> saveGoodsIssue(IGoodsIssue bo) {
		return new OperationResult<IGoodsIssue>(this.saveGoodsIssue((GoodsIssue) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-库存收货
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<GoodsReceipt> fetchGoodsReceipt(ICriteria criteria, String token) {
		return super.fetch(criteria, token, GoodsReceipt.class);
	}

	/**
	 * 查询-库存收货（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IGoodsReceipt> fetchGoodsReceipt(ICriteria criteria) {
		return new OperationResult<IGoodsReceipt>(this.fetchGoodsReceipt(criteria, this.getUserToken()));
	}

	/**
	 * 保存-库存收货
	 *
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<GoodsReceipt> saveGoodsReceipt(GoodsReceipt bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-库存收货（提前设置用户口令）
	 *
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IGoodsReceipt> saveGoodsReceipt(IGoodsReceipt bo) {
		return new OperationResult<IGoodsReceipt>(this.saveGoodsReceipt((GoodsReceipt) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-库存转储
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<InventoryTransfer> fetchInventoryTransfer(ICriteria criteria, String token) {
		return super.fetch(criteria, token, InventoryTransfer.class);
	}

	/**
	 * 查询-库存转储（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IInventoryTransfer> fetchInventoryTransfer(ICriteria criteria) {
		return new OperationResult<IInventoryTransfer>(this.fetchInventoryTransfer(criteria, this.getUserToken()));
	}

	/**
	 * 保存-库存转储
	 *
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<InventoryTransfer> saveInventoryTransfer(InventoryTransfer bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-库存转储（提前设置用户口令）
	 *
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IInventoryTransfer> saveInventoryTransfer(IInventoryTransfer bo) {
		return new OperationResult<IInventoryTransfer>(
				this.saveInventoryTransfer((InventoryTransfer) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<Material> fetchMaterial(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Material.class);
	}

	/**
	 * 查询-物料（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterial> fetchMaterial(ICriteria criteria) {
		return new OperationResult<IMaterial>(this.fetchMaterial(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料
	 *
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<Material> saveMaterial(Material bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料（提前设置用户口令）
	 *
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterial> saveMaterial(IMaterial bo) {
		return new OperationResult<IMaterial>(this.saveMaterial((Material) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料组
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialGroup> fetchMaterialGroup(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialGroup.class);
	}

	/**
	 * 查询-物料组（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialGroup> fetchMaterialGroup(ICriteria criteria) {
		return new OperationResult<IMaterialGroup>(this.fetchMaterialGroup(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料组
	 *
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialGroup> saveMaterialGroup(MaterialGroup bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料组（提前设置用户口令）
	 *
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialGroup> saveMaterialGroup(IMaterialGroup bo) {
		return new OperationResult<IMaterialGroup>(this.saveMaterialGroup((MaterialGroup) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料库存
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialInventory> fetchMaterialInventory(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialInventory.class);
	}

	/**
	 * 查询-物料库存（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialInventory> fetchMaterialInventory(ICriteria criteria) {
		return new OperationResult<IMaterialInventory>(this.fetchMaterialInventory(criteria, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-仓库日记账
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialInventoryJournal> fetchMaterialInventoryJournal(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialInventoryJournal.class);
	}

	/**
	 * 查询-仓库日记账（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialInventoryJournal> fetchMaterialInventoryJournal(ICriteria criteria) {
		return new OperationResult<IMaterialInventoryJournal>(
				this.fetchMaterialInventoryJournal(criteria, this.getUserToken()));
	}

	/**
	 * 保存-仓库日记账
	 *
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialInventoryJournal> saveMaterialInventoryJournal(MaterialInventoryJournal bo,
			String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-仓库日记账（提前设置用户口令）
	 *
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialInventoryJournal> saveMaterialInventoryJournal(IMaterialInventoryJournal bo) {
		return new OperationResult<IMaterialInventoryJournal>(
				this.saveMaterialInventoryJournal((MaterialInventoryJournal) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料价格清单
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialPriceList> fetchMaterialPriceList(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialPriceList.class);
	}

	/**
	 * 查询-物料价格清单（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialPriceList> fetchMaterialPriceList(ICriteria criteria) {
		return new OperationResult<IMaterialPriceList>(this.fetchMaterialPriceList(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料价格清单
	 *
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialPriceList> saveMaterialPriceList(MaterialPriceList bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料价格清单（提前设置用户口令）
	 *
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialPriceList> saveMaterialPriceList(IMaterialPriceList bo) {
		return new OperationResult<IMaterialPriceList>(
				this.saveMaterialPriceList((MaterialPriceList) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料批次
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialBatch> fetchMaterialBatch(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialBatch.class);
	}

	/**
	 * 查询-物料批次（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialBatch> fetchMaterialBatch(ICriteria criteria) {
		return new OperationResult<IMaterialBatch>(this.fetchMaterialBatch(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料批次
	 *
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialBatch> saveMaterialBatch(MaterialBatch bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料批次（提前设置用户口令）
	 *
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialBatch> saveMaterialBatch(IMaterialBatch bo) {
		return new OperationResult<IMaterialBatch>(this.saveMaterialBatch((MaterialBatch) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料批次日记账
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@Override
	public OperationResult<MaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialBatchJournal.class);
	}

	/**
	 * 查询-物料批次日记账（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	@Override
	public IOperationResult<IMaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria) {
		return new OperationResult<IMaterialBatchJournal>(
				this.fetchMaterialBatchJournal(criteria, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料序列
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@Override
	public OperationResult<MaterialSerial> fetchMaterialSerial(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialSerial.class);
	}

	/**
	 * 查询-物料序列（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	@Override
	public IOperationResult<IMaterialSerial> fetchMaterialSerial(ICriteria criteria) {
		return new OperationResult<IMaterialSerial>(this.fetchMaterialSerial(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料序列
	 *
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@Override
	public OperationResult<MaterialSerial> saveMaterialSerial(MaterialSerial bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料序列（提前设置用户口令）
	 *
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	@Override
	public IOperationResult<IMaterialSerial> saveMaterialSerial(IMaterialSerial bo) {
		return new OperationResult<IMaterialSerial>(this.saveMaterialSerial((MaterialSerial) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料序列日记账
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@Override
	public OperationResult<MaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialSerialJournal.class);
	}

	/**
	 * 查询-物料序列日记账（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	@Override
	public IOperationResult<IMaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria) {
		return new OperationResult<IMaterialSerialJournal>(
				this.fetchMaterialSerialJournal(criteria, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-仓库
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@Override
	public OperationResult<Warehouse> fetchWarehouse(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Warehouse.class);
	}

	/**
	 * 查询-仓库（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	@Override
	public IOperationResult<IWarehouse> fetchWarehouse(ICriteria criteria) {
		return new OperationResult<IWarehouse>(this.fetchWarehouse(criteria, this.getUserToken()));
	}

	/**
	 * 保存-仓库
	 *
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@Override
	public OperationResult<Warehouse> saveWarehouse(Warehouse bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-仓库（提前设置用户口令）
	 *
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	@Override
	public IOperationResult<IWarehouse> saveWarehouse(IWarehouse bo) {
		return new OperationResult<IWarehouse>(this.saveWarehouse((Warehouse) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-仓库预估日记账
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialEstimateJournal> fetchMaterialEstimateJournal(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialEstimateJournal.class);
	}

	/**
	 * 查询-仓库预估日记账（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialEstimateJournal> fetchMaterialEstimateJournal(ICriteria criteria) {
		return new OperationResult<IMaterialEstimateJournal>(
				this.fetchMaterialEstimateJournal(criteria, this.getUserToken()));
	}

	/**
	 * 保存-仓库预估日记账
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialEstimateJournal> saveMaterialEstimateJournal(MaterialEstimateJournal bo,
			String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-仓库预估日记账（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialEstimateJournal> saveMaterialEstimateJournal(IMaterialEstimateJournal bo) {
		return new OperationResult<IMaterialEstimateJournal>(
				this.saveMaterialEstimateJournal((MaterialEstimateJournal) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存盘点
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<InventoryCounting> fetchInventoryCounting(ICriteria criteria, String token) {
		return super.fetch(criteria, token, InventoryCounting.class);
	}

	/**
	 * 查询-库存盘点（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IInventoryCounting> fetchInventoryCounting(ICriteria criteria) {
		return new OperationResult<IInventoryCounting>(this.fetchInventoryCounting(criteria, this.getUserToken()));
	}

	/**
	 * 保存-库存盘点
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<InventoryCounting> saveInventoryCounting(InventoryCounting bo, String token) {
		if (bo != null && bo.getDocumentStatus() == emDocumentStatus.CLOSED) {
			return new OperationResult<>(new Exception(I18N.prop("msg_mm_not_allowed_closed_data")));
		}
		return super.save(bo, token);
	}

	/**
	 * 保存-库存盘点（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IInventoryCounting> saveInventoryCounting(IInventoryCounting bo) {
		return new OperationResult<IInventoryCounting>(
				this.saveInventoryCounting((InventoryCounting) bo, this.getUserToken()));
	}

	/**
	 * 结算-库存盘点
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<String> closeInventoryCounting(ICriteria criteria, String token) {
		try {
			this.setCurrentUser(token);
			if (criteria == null || criteria.getConditions().size() <= 0) {
				throw new Exception(I18N.prop("msg_bobas_invaild_criteria"));
			}
			IOperationResult<IInventoryCounting> opRsltData = this.fetchInventoryCounting(criteria);
			if (opRsltData.getError() != null) {
				throw opRsltData.getError();
			}
			boolean trans = this.beginTransaction();
			try {
				IOperationResult<?> opRsltSave;
				IOperationResult<IMaterialInventory> opRsltInventory;
				OperationResult<String> opRsltClosing = new OperationResult<>();
				criteria = new Criteria();
				ICondition itemCondition = criteria.getConditions().create();
				itemCondition.setAlias(MaterialInventory.PROPERTY_ITEMCODE.getName());
				ICondition whsCondition = criteria.getConditions().create();
				whsCondition.setAlias(MaterialInventory.PROPERTY_WAREHOUSE.getName());
				for (IInventoryCounting counting : opRsltData.getResultObjects()) {
					if (counting.getDocumentStatus() == emDocumentStatus.CLOSED
							|| counting.getDocumentStatus() == emDocumentStatus.PLANNED
							|| (counting.getApprovalStatus() != emApprovalStatus.APPROVED
									&& counting.getApprovalStatus() != emApprovalStatus.UNAFFECTED)
							|| counting.getCanceled() == emYesNo.YES) {
						continue;
					}
					for (IInventoryCountingLine countingLine : counting.getInventoryCountingLines()) {
						if (countingLine.getLineStatus() == emDocumentStatus.CLOSED
								|| countingLine.getLineStatus() == emDocumentStatus.PLANNED) {
							continue;
						}
						if (countingLine.getCounted() != emYesNo.YES) {
							throw new Exception(I18N.prop("msg_mm_document_not_counted", countingLine));
						}
						// 检查库存，保存时自动计算差异数量
						itemCondition.setValue(countingLine.getItemCode());
						whsCondition.setValue(countingLine.getWarehouse());
						opRsltInventory = this.fetchMaterialInventory(criteria);
						if (opRsltInventory.getError() != null) {
							throw opRsltInventory.getError();
						}
						countingLine.setStockQuantity(Decimal.ZERO);
						for (IMaterialInventory invItem : opRsltInventory.getResultObjects()) {
							countingLine.setStockQuantity(countingLine.getStockQuantity().add(invItem.getOnHand()));
						}
						// 检查库存记录
						countingLine.setDifference(
								countingLine.getCountQuantity().subtract(countingLine.getStockQuantity()));
						// 修改状态
						countingLine.setLineStatus(emDocumentStatus.CLOSED);
					}
					counting.setDocumentStatus(emDocumentStatus.CLOSED);
					counting.setPostingDate(DateTime.getToday());
					// 保存盘点单据
					opRsltSave = super.save(counting, token);
					if (opRsltSave.getError() != null) {
						throw opRsltSave.getError();
					}
					opRsltClosing.addResultObjects(counting.toString());
				}
				if (trans) {
					this.commitTransaction();
				}
				return opRsltClosing;
			} catch (Exception e) {
				if (trans) {
					this.rollbackTransaction();
				}
				throw e;
			}
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	/**
	 * 结算-库存盘点（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<String> closeInventoryCounting(ICriteria criteria) {
		return this.closeInventoryCounting(criteria, this.getUserToken());
	}
	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料价格（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	@Override
	public IOperationResult<IMaterialPrice> fetchMaterialPrice(ICriteria criteria) {
		return new OperationResult<IMaterialPrice>(this.fetchMaterialPrice(criteria, this.getUserToken()));
	}

	/**
	 * 查询-物料价格
	 *
	 * @param criteria 查询（支持的查询条件，仅为ItemCode，ItemName，PriceList,UOM）
	 * @param token    口令
	 * @return 物料价格
	 */
	@Override
	public OperationResult<MaterialPrice> fetchMaterialPrice(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			if (criteria == null || criteria.getConditions().isEmpty()) {
				throw new Exception(I18N.prop("msg_bobas_invaild_criteria"));
			}
			// 查询物料
			ICriteria maCriteria = DataConvert.filterConditions(criteria, true, MaterialPrice.CONDITION_ALIAS_ITEMCODE,
					MaterialPrice.CONDITION_ALIAS_ITEMNAME, MaterialPrice.CONDITION_ALIAS_ITEMSIGN,
					MaterialPrice.CONDITION_ALIAS_GROUP);
			maCriteria.setResultCount(criteria.getResultCount());
			for (ICondition condition : maCriteria.getConditions()) {
				if (MaterialPrice.CONDITION_ALIAS_ITEMCODE.equalsIgnoreCase(condition.getAlias())) {
					condition.setAlias(Material.PROPERTY_CODE.getName());
				} else if (MaterialPrice.CONDITION_ALIAS_ITEMNAME.equalsIgnoreCase(condition.getAlias())) {
					condition.setAlias(Material.PROPERTY_NAME.getName());
				} else if (MaterialPrice.CONDITION_ALIAS_ITEMSIGN.equalsIgnoreCase(condition.getAlias())) {
					condition.setAlias(Material.PROPERTY_SIGN.getName());
				}
			}
			IOperationResult<IMaterial> opRsltMaterial = this.fetchMaterial(maCriteria);
			if (opRsltMaterial.getError() != null) {
				throw opRsltMaterial.getError();
			}
			// 查询物料价格
			emBusinessPartnerType partnerType = null;
			IMaterialPriceList priceList = null;
			String partnerCode = null;
			String today = null;
			String currency = null;
			for (ICondition item : criteria.getConditions()) {
				if (MaterialPrice.CONDITION_ALIAS_CUSTOMER.equalsIgnoreCase(item.getAlias())) {
					partnerType = emBusinessPartnerType.CUSTOMER;
					partnerCode = item.getValue();
				} else if (MaterialPrice.CONDITION_ALIAS_SUPPLIER.equalsIgnoreCase(item.getAlias())) {
					partnerType = emBusinessPartnerType.SUPPLIER;
					partnerCode = item.getValue();
				} else if (MaterialPrice.CONDITION_ALIAS_PRICELIST.equalsIgnoreCase(item.getAlias())) {
					if (Integer.valueOf(item.getValue()) != 0) {
						// 获取价格清单实例
						ICriteria plCriteria = new Criteria();
						plCriteria.setResultCount(1);
						plCriteria.setNoChilds(true);
						ICondition condition = plCriteria.getConditions().create();
						condition.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
						condition.setValue(item.getValue());
						priceList = this.fetchMaterialPriceList(plCriteria).getResultObjects().firstOrDefault();
					}
				} else if (MaterialSpecialPrice.PROPERTY_VALIDDATE.getName().equalsIgnoreCase(item.getAlias())
						|| MaterialSpecialPrice.PROPERTY_INVALIDDATE.getName().equalsIgnoreCase(item.getAlias())) {
					if (!DataConvert.isNullOrEmpty(item.getValue())) {
						today = item.getValue();
					}
				} else if (MaterialPrice.CONDITION_ALIAS_CURRENCY.equalsIgnoreCase(item.getAlias())) {
					if (!DataConvert.isNullOrEmpty(item.getValue())) {
						currency = item.getValue();
					}
				}
			}
			// 根据条件改变货币类型
			if (!DataConvert.isNullOrEmpty(currency)) {
				if (priceList != null) {
					priceList.setCurrency(currency);
				}
			}
			List<IMaterialPrice> materialPrices = this.getMaterialPrices(
					opRsltMaterial.getResultObjects().toArray(new MaterialBase<?>[] {}), priceList, partnerType,
					partnerCode, today);
			// 按物料顺序重新排序
			OperationResult<MaterialPrice> operationResult = new OperationResult<>();
			for (IMaterial material : opRsltMaterial.getResultObjects()) {
				operationResult.addResultObjects(
						materialPrices.where(c -> material.getCode().equalsIgnoreCase(c.getItemCode())));
			}
			return operationResult;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	/**
	 * 查询物料价格（首先特殊价格，然后价格清单）
	 * 
	 * @param materials   待查物料
	 * @param priceList   价格清单
	 * @param partnerType 业务伙伴类型
	 * @param partnerCode 业务伙伴
	 * @return
	 * @throws Exception
	 */
	protected List<IMaterialPrice> getMaterialPrices(MaterialBase<?>[] materials, IMaterialPriceList priceList,
			emBusinessPartnerType partnerType, String partnerCode, String today) throws Exception {
		// 查询物料特殊价格
		List<IMaterialPrice> materialPrices = new ArrayList<>(materials.length * 2);
		if (partnerType != null && !DataConvert.isNullOrEmpty(partnerCode) && materials.length > 0) {
			Criteria maCriteria = new Criteria();
			ICondition condition = maCriteria.getConditions().create();
			condition.setAlias(MaterialSpecialPrice.PROPERTY_BUSINESSPARTNERTYPE.getName());
			condition.setValue(partnerType);
			condition = maCriteria.getConditions().create();
			condition.setAlias(MaterialSpecialPrice.PROPERTY_BUSINESSPARTNERCODE.getName());
			condition.setValue(partnerCode);
			for (MaterialBase<?> item : materials) {
				condition = maCriteria.getConditions().create();
				condition.setAlias(MaterialSpecialPrice.PROPERTY_ITEMCODE.getName());
				condition.setValue(item.getCode());
				if (maCriteria.getConditions().size() > 3) {
					condition.setRelationship(ConditionRelationship.OR);
				}
			}
			if (maCriteria.getConditions().size() > 3) {
				condition = maCriteria.getConditions().get(2);
				condition.setBracketOpen(condition.getBracketOpen() + 1);
				condition = maCriteria.getConditions().get(maCriteria.getConditions().size() - 1);
				condition.setBracketClose(condition.getBracketClose() + 1);
			}
			if (!DataConvert.isNullOrEmpty(today)) {
				// 有效日期
				condition = maCriteria.getConditions().create();
				condition.setBracketOpen(1);
				condition.setAlias(Specification.PROPERTY_VALIDDATE.getName());
				condition.setOperation(ConditionOperation.IS_NULL);
				condition = maCriteria.getConditions().create();
				condition.setRelationship(ConditionRelationship.OR);
				condition.setBracketOpen(1);
				condition.setAlias(Specification.PROPERTY_VALIDDATE.getName());
				condition.setOperation(ConditionOperation.NOT_NULL);
				condition = maCriteria.getConditions().create();
				condition.setBracketClose(2);
				condition.setAlias(Specification.PROPERTY_VALIDDATE.getName());
				condition.setOperation(ConditionOperation.LESS_EQUAL);
				condition.setValue(today);
				// 失效日期
				condition = maCriteria.getConditions().create();
				condition.setBracketOpen(1);
				condition.setAlias(Specification.PROPERTY_INVALIDDATE.getName());
				condition.setOperation(ConditionOperation.IS_NULL);
				condition = maCriteria.getConditions().create();
				condition.setRelationship(ConditionRelationship.OR);
				condition.setBracketOpen(1);
				condition.setAlias(Specification.PROPERTY_INVALIDDATE.getName());
				condition.setOperation(ConditionOperation.NOT_NULL);
				condition = maCriteria.getConditions().create();
				condition.setBracketClose(2);
				condition.setAlias(Specification.PROPERTY_INVALIDDATE.getName());
				condition.setOperation(ConditionOperation.GRATER_EQUAL);
				condition.setValue(today);
			}
			MaterialPrice materialPrice;
			for (IMaterialSpecialPrice item : this.fetchMaterialSpecialPrice(maCriteria).getResultObjects()) {
				materialPrice = MaterialPrice.create(item);
				for (MaterialBase<?> material : materials) {
					if (material.getCode().equals(materialPrice.getItemCode())) {
						// 标记已获得特殊价格物料
						material.markDeleted();
						materialPrice.setItemName(material.getName());
						break;
					}
				}
				materialPrices.add(materialPrice);
			}
		}
		// 未提供价格清单，则退出
		if (priceList == null) {
			return materialPrices;
		}
		// 查询价格清单价格
		List<IMaterialPrice> newPrices = this.getMaterialPrices(materials, priceList);
		// 获取默认值
		String currency = priceList.getCurrency();
		emYesNo taxed = priceList.getTaxed();
		if (!newPrices.isEmpty()) {
			if (DataConvert.isNullOrEmpty(currency)) {
				currency = newPrices.firstOrDefault().getCurrency();
			}
			if (taxed == null) {
				taxed = newPrices.firstOrDefault().getTaxed();
			}
		}
		BigDecimal initialPrice = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_PRICE_LIST_INITIAL_PRICE,
				Decimal.MINUS_ONE);
		Integer size;
		MaterialPrice materialPrice;
		for (MaterialBase<?> material : materials) {
			// 跳过已有价格物料
			if (materialPrices.firstOrDefault(c -> material.getCode().equalsIgnoreCase(c.getItemCode())) != null) {
				continue;
			}
			size = materialPrices.size();
			for (IMaterialPrice newPrice : newPrices.where(c -> c.getItemCode().equals(material.getCode()))) {
				materialPrice = MaterialPrice.create(material);
				materialPrice.setUOM(newPrice.getUOM());
				materialPrice.setSource(newPrice.getSource());
				materialPrice.setPrice(newPrice.getPrice());
				materialPrice.setCurrency(newPrice.getCurrency());
				materialPrice.setTaxed(newPrice.getTaxed());
				materialPrices.add(materialPrice);
			}
			if (size >= materialPrices.size()) {
				// 没有新增
				materialPrice = MaterialPrice.create(material);
				materialPrice.setSource(priceList.getObjectKey(), 0);
				materialPrice.setPrice(initialPrice);// 设置到未初始价格
				materialPrice.setCurrency(currency);
				materialPrice.setTaxed(taxed);
				materialPrices.add(materialPrice);
			}
		}
		// 转换物料价格货币到价格清单主货币
		if (!DataConvert.isNullOrEmpty(priceList.getCurrency()) && !DataConvert.isNullOrEmpty(today)) {
			Criteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(CurrencyRate.PROPERTY_CURRENCY.getName());
			condition.setValue(priceList.getCurrency());
			for (IMaterialPrice item : materialPrices) {
				if (DataConvert.isNullOrEmpty(item.getCurrency())) {
					continue;
				}
				if (Decimal.ZERO.compareTo(item.getPrice()) >= 0) {
					continue;
				}
				if (criteria.getConditions()
						.firstOrDefault(c -> c.getValue().equalsIgnoreCase(item.getCurrency())) != null) {
					continue;
				}
				condition = criteria.getConditions().create();
				condition.setAlias(CurrencyRate.PROPERTY_CURRENCY.getName());
				condition.setValue(item.getCurrency());
				if (criteria.getConditions().size() > 1) {
					condition.setRelationship(ConditionRelationship.OR);
				}
			}
			if (!criteria.getConditions().isEmpty()) {
				if (criteria.getConditions().size() > 1) {
					condition = criteria.getConditions().firstOrDefault();
					condition.setBracketOpen(1);
					condition = criteria.getConditions().lastOrDefault();
					condition.setBracketClose(1);
				}
				condition = criteria.getConditions().create();
				condition.setAlias(CurrencyRate.PROPERTY_DATE.getName());
				condition.setValue(today);
				BORepositoryAccounting acRepository = new BORepositoryAccounting();
				acRepository.setRepository(this.getRepository());
				List<ICurrencyRate> currencyRates = acRepository.fetchCurrencyRate(criteria).getResultObjects();
				BigDecimal newPrice;
				ICurrencyRate currencyRate;
				ICurrencyRate listCurrencyRate = null;
				String listCurrency = priceList.getCurrency();
				String localCurrency = org.colorcoding.ibas.accounting.MyConfiguration
						.getConfigValue(org.colorcoding.ibas.accounting.MyConfiguration.CONFIG_ITEM_LOCAL_CURRENCY);
				if (!listCurrency.equalsIgnoreCase(localCurrency)) {
					// 清单与本币不一致，获取清单币到本币汇率
					listCurrencyRate = currencyRates
							.firstOrDefault(c -> listCurrency.equalsIgnoreCase(c.getCurrency()));
					if (listCurrencyRate == null) {
						throw new Exception(I18N.prop("msg_mm_not_found_currency_rate", today, listCurrency));
					}
				}
				for (IMaterialPrice priceItem : materialPrices) {
					if (DataConvert.isNullOrEmpty(priceItem.getCurrency())
							|| Decimal.ZERO.compareTo(priceItem.getPrice()) >= 0) {
						// 未设置币种，则为清单币
						priceItem.setCurrency(listCurrency);
						continue;
					} else if (priceItem.getCurrency().equalsIgnoreCase(listCurrency)) {
						// 清单币，跳过
						continue;
					}
					if (priceItem.getCurrency().equalsIgnoreCase(localCurrency)) {
						// 本币
						newPrice = Decimal.multiply(priceItem.getPrice(), Decimal.ONE);
					} else {
						// 先到本币
						currencyRate = currencyRates
								.firstOrDefault(c -> priceItem.getCurrency().equalsIgnoreCase(c.getCurrency()));
						if (currencyRate == null) {
							throw new Exception(
									I18N.prop("msg_mm_not_found_currency_rate", today, priceItem.getCurrency()));
						}
						newPrice = Decimal.multiply(priceItem.getPrice(), currencyRate.getRate());
					}
					if (listCurrencyRate != null) {
						// 本币再到清单币
						newPrice = Decimal.multiply(newPrice, listCurrencyRate.getRate());
					}
					// 设置保留小数位
					newPrice = newPrice.setScale(priceItem.getPrice().scale(), Decimal.ROUNDING_MODE_DEFAULT);
					priceItem.setPrice(newPrice);
					priceItem.setCurrency(listCurrency);
				}
			}
		}
		return materialPrices;

	}

	/**
	 * 查询物料对应价格清单的价格
	 *
	 * @param itemCodes 物料编码
	 * @param priceList 价格清单
	 * @param factory   价格清单系数
	 * @return
	 * @throws Exception
	 */
	protected List<IMaterialPrice> getMaterialPrices(MaterialBase<?>[] materials, IMaterialPriceList priceList)
			throws Exception {
		return this.getMaterialPrices(materials, priceList, 0);
	}

	/**
	 * 查询物料对应价格清单的价格
	 *
	 * @param itemCode  物料
	 * @param priceList 价格清单
	 * @param level     层级
	 * @return
	 * @throws Exception
	 */
	private List<IMaterialPrice> getMaterialPrices(MaterialBase<?>[] materials, IMaterialPriceList priceList, int level)
			throws Exception {
		level++;
		if (level > MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_PRICE_LIST_MAX_LEVEL, 3)) {
			StringBuilder stringBuilder = new StringBuilder();
			for (MaterialBase<?> material : materials) {
				if (material == null || material.isDeleted()) {
					continue;
				}
				if (stringBuilder.length() > 0) {
					stringBuilder.append(", ");
				}
				stringBuilder.append(material.getCode());
			}
			if (stringBuilder.length() > 0) {
				throw new Exception(
						I18N.prop("msg_mm_material_price_list_more_than_max_level", stringBuilder.toString()));
			}
		}
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
		condition.setValue(priceList.getObjectKey());
		IChildCriteria childCriteria = criteria.getChildCriterias().create();
		childCriteria.setPropertyPath(MaterialPriceList.PROPERTY_MATERIALPRICEITEMS.getName());
		childCriteria.setOnlyHasChilds(false);
		for (MaterialBase<?> material : materials) {
			if (material == null || material.isDeleted()) {
				continue;
			}
			condition = childCriteria.getConditions().create();
			condition.setAlias(MaterialPriceItem.PROPERTY_ITEMCODE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(material.getCode());
			if (childCriteria.getConditions().size() > 1) {
				condition.setRelationship(ConditionRelationship.OR);
			}
		}
		if (childCriteria.getConditions().size() > 1) {
			condition = childCriteria.getConditions().firstOrDefault();
			condition.setBracketOpen(condition.getBracketOpen() + 1);
			condition = childCriteria.getConditions().lastOrDefault();
			condition.setBracketClose(condition.getBracketClose() + 1);
		}
		ISort sort = childCriteria.getSorts().create();
		sort.setAlias(MaterialPriceItem.PROPERTY_ITEMCODE.getName());
		sort.setSortType(SortType.ASCENDING);
		sort = childCriteria.getSorts().create();
		sort.setAlias(MaterialPriceItem.PROPERTY_UOM.getName());
		sort.setSortType(SortType.ASCENDING);
		// 没有条件则跳出
		if (childCriteria.getConditions().isEmpty()) {
			return new ArrayList<>();
		}
		IOperationResult<IMaterialPriceList> opRsltPriceList = this.fetchMaterialPriceList(criteria);
		if (opRsltPriceList.getError() != null) {
			throw opRsltPriceList.getError();
		}
		// 价格清单未找到
		if (opRsltPriceList.getResultObjects().isEmpty()) {
			return new ArrayList<>();
		}
		List<IMaterialPriceItem> priceItems = null;
		List<IMaterialPrice> materialPrices = new ArrayList<>();
		IMaterialPriceList materialPriceList = opRsltPriceList.getResultObjects().firstOrDefault();
		for (MaterialBase<?> material : materials) {
			if (material == null || material.isDeleted()) {
				continue;
			}
			priceItems = materialPriceList.getMaterialPriceItems()
					.where(c -> material.getCode().equals(c.getItemCode()));
			if (!priceItems.isEmpty()) {
				// 按单位排序
				priceItems.sort(new Comparator<IMaterialPriceItem>() {

					@Override
					public int compare(IMaterialPriceItem o1, IMaterialPriceItem o2) {
						if (o1.getUOM() == o2.getUOM()) {
							return 0;
						}
						if (o1.getUOM() == null && o2.getUOM() != null) {
							return -1;
						}
						if (o1.getUOM() != null && o2.getUOM() == null) {
							return 1;
						}
						return o1.getUOM().compareTo(o2.getUOM());
					}
				});
				// 价格清单定义了价格
				for (IMaterialPriceItem priceItem : priceItems) {
					IMaterialPrice newPrice = MaterialPrice.create(priceItem);
					if (DataConvert.isNullOrEmpty(newPrice.getCurrency())) {
						newPrice.setCurrency(materialPriceList.getCurrency());
					}
					newPrice.setTaxed(materialPriceList.getTaxed());
					materialPrices.add(newPrice);
				}
				// 有内容则不再查
				material.markDeleted();
			}
		}
		// 有基于清单，继续查询未找到的
		if (materialPriceList.getBasedOnList() != null
				&& materialPriceList.getBasedOnList().compareTo(priceList.getObjectKey()) != 0
				&& materialPriceList.getBasedOnList() > 0) {
			criteria = new Criteria();
			criteria.setResultCount(1);
			criteria.setNoChilds(true);
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
			condition.setValue(materialPriceList.getBasedOnList());
			priceList = this.fetchMaterialPriceList(criteria).getResultObjects().firstOrDefault();
			if (priceList != null) {
				for (IMaterialPrice newPrice : this.getMaterialPrices(materials, priceList, level)) {
					if (!Decimal.isZero(materialPriceList.getFactor())) {
						newPrice.setPrice(Decimal.multiply(newPrice.getPrice(), materialPriceList.getFactor()));
					}
					if (DataConvert.isNullOrEmpty(newPrice.getCurrency())) {
						newPrice.setCurrency(materialPriceList.getCurrency());
					}
					newPrice.setTaxed(materialPriceList.getTaxed());
					materialPrices.add(newPrice);
				}
			}
		}
		return materialPrices;
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料数量（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 操作结果
	 */
	@Override
	public IOperationResult<IMaterialQuantity> fetchMaterialQuantity(ICriteria criteria) {
		return new OperationResult<IMaterialQuantity>(this.fetchMaterialQuantity(criteria, this.getUserToken()));
	}

	/**
	 * 查询-物料数量
	 *
	 * @param criteria 查询（支持的查询条件，仅为ItemCode，ItemName，WhsCode）
	 * @param token    口令
	 * @return 物料库存数量
	 */
	@Override
	public OperationResult<MaterialQuantity> fetchMaterialQuantity(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			if (criteria == null || criteria.getConditions().isEmpty()) {
				throw new Exception(I18N.prop("msg_bobas_invaild_criteria"));
			}
			// 查询物料
			ICriteria maCriteria = DataConvert.filterConditions(criteria, true,
					MaterialQuantity.CONDITION_ALIAS_ITEMCODE, MaterialQuantity.CONDITION_ALIAS_ITEMNAME);
			maCriteria.setResultCount(criteria.getResultCount());
			for (ICondition condition : maCriteria.getConditions()) {
				if (MaterialQuantity.CONDITION_ALIAS_ITEMCODE.equalsIgnoreCase(condition.getAlias())) {
					condition.setAlias(Material.PROPERTY_CODE.getName());
				} else if (MaterialQuantity.CONDITION_ALIAS_ITEMNAME.equalsIgnoreCase(condition.getAlias())) {
					condition.setAlias(Material.PROPERTY_NAME.getName());
				}
			}
			IOperationResult<IMaterial> opRsltMaterial = this.fetchMaterial(maCriteria);
			if (opRsltMaterial.getError() != null) {
				throw opRsltMaterial.getError();
			}
			OperationResult<MaterialQuantity> operationResult = new OperationResult<>();
			for (IMaterialQuantity materialQuantity : this.getMaterialQuantities(
					opRsltMaterial.getResultObjects().toArray(new MaterialBase<?>[] {}),
					DataConvert.filterConditions(criteria, true, MaterialQuantity.CONDITION_ALIAS_WAREHOUSE))) {
				operationResult.addResultObjects(materialQuantity);
			}
			return operationResult;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	/**
	 * 获取物料库存数量
	 * 
	 * @param materials  物料
	 * @param whCriteria 仓库条件
	 * @return
	 * @throws Exception
	 */
	protected List<IMaterialQuantity> getMaterialQuantities(MaterialBase<?>[] materials, ICriteria whCriteria)
			throws Exception {
		// 初始物料数量
		List<IMaterialQuantity> materialQuantities = new ArrayList<>();
		for (MaterialBase<?> material : materials) {
			materialQuantities.add(MaterialQuantity.create(material));
		}
		if (whCriteria != null && !whCriteria.getConditions().isEmpty()) {
			// 添加物料的条件
			ICondition condition;
			if (whCriteria.getConditions().size() > 1) {
				condition = whCriteria.getConditions().firstOrDefault();
				condition.setBracketOpen(condition.getBracketOpen() + 1);
				condition = whCriteria.getConditions().lastOrDefault();
				condition.setBracketClose(condition.getBracketClose() + 1);
			}
			int size = whCriteria.getConditions().size();
			for (MaterialBase<?> product : materials) {
				condition = whCriteria.getConditions().create();
				condition.setAlias(MaterialQuantity.CONDITION_ALIAS_ITEMCODE);
				condition.setOperation(ConditionOperation.EQUAL);
				condition.setValue(product.getCode());
				if (whCriteria.getConditions().size() > size + 1) {
					condition.setRelationship(ConditionRelationship.OR);
				}
			}
			if (whCriteria.getConditions().size() > size + 1) {
				condition = whCriteria.getConditions().get(size);
				condition.setBracketOpen(condition.getBracketOpen() + 1);
				condition = whCriteria.getConditions().get(whCriteria.getConditions().size() - 1);
				condition.setBracketClose(condition.getBracketClose() + 1);
			}
			IOperationResult<IMaterialInventory> opRsltInventory = this.fetchMaterialInventory(whCriteria);
			if (opRsltInventory.getError() != null) {
				throw opRsltInventory.getError();
			}
			for (IMaterialQuantity item : materialQuantities) {
				// 数量清零
				item.setOnHand(Decimal.ZERO);
				item.setOnCommited(Decimal.ZERO);
				item.setOnOrdered(Decimal.ZERO);
				item.setOnReserved(Decimal.ZERO);
				// 重新计算数量
				for (IMaterialInventory inventory : opRsltInventory.getResultObjects()) {
					if (item.getItemCode().equals(inventory.getItemCode())) {
						item.setOnHand(item.getOnHand().add(inventory.getOnHand()));
						item.setOnCommited(item.getOnCommited().add(inventory.getOnCommited()));
						item.setOnOrdered(item.getOnOrdered().add(inventory.getOnOrdered()));
						item.setOnReserved(item.getOnReserved().add(inventory.getOnReserved()));
						item.setSource(item.getSource() + (!DataConvert.isNullOrEmpty(item.getSource()) ? "," : "")
								+ inventory.getWarehouse());
					}
				}
			}
		}
		return materialQuantities;
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-产品信息（提前设置用户口令）
	 *
	 * @param criteria 查询
	 * @return 产品信息
	 */
	@Override
	public IOperationResult<IProduct> fetchProduct(ICriteria criteria) {
		return new OperationResult<IProduct>(this.fetchProduct(criteria, this.getUserToken()));
	}

	/**
	 * 查询-产品信息
	 *
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@Override
	public OperationResult<Product> fetchProduct(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			if (criteria == null || criteria.getConditions().isEmpty()) {
				throw new Exception(I18N.prop("msg_bobas_invaild_criteria"));
			}
			// 查询物料
			ICriteria pdCriteria = DataConvert.filterConditions(criteria, false, Product.CONDITION_ALIAS_WAREHOUSE,
					Product.CONDITION_ALIAS_PRICELIST, MaterialPrice.CONDITION_ALIAS_CUSTOMER,
					MaterialPrice.CONDITION_ALIAS_CURRENCY, MaterialPrice.CONDITION_ALIAS_SUPPLIER);
			pdCriteria.setResultCount(criteria.getResultCount());
			OperationResult<Product> opRsltProduct = this.fetch(pdCriteria, token, Product.class);
			if (opRsltProduct.getError() != null) {
				throw opRsltProduct.getError();
			}
			// 查询物料的库存
			pdCriteria = DataConvert.filterConditions(criteria, true, Product.CONDITION_ALIAS_WAREHOUSE);
			List<IMaterialQuantity> materialQuantities = this.getMaterialQuantities(
					opRsltProduct.getResultObjects().toArray(new MaterialBase<?>[] {}), pdCriteria);
			// 有仓库条件，则数量清零
			for (IProduct product : opRsltProduct.getResultObjects()) {
				product.setOnHand(Decimal.ZERO);
				product.setOnCommited(Decimal.ZERO);
				product.setOnOrdered(Decimal.ZERO);
				product.setOnReserved(Decimal.ZERO);
				product.setWarehouse(DataConvert.STRING_VALUE_EMPTY);
			}
			for (IMaterialQuantity materialQuantity : materialQuantities) {
				// 重新计算数量
				for (IProduct product : opRsltProduct.getResultObjects()) {
					if (product.getCode().equalsIgnoreCase(materialQuantity.getItemCode())) {
						product.setOnHand(product.getOnHand().add(materialQuantity.getOnHand()));
						product.setOnCommited(product.getOnCommited().add(materialQuantity.getOnCommited()));
						product.setOnOrdered(product.getOnOrdered().add(materialQuantity.getOnOrdered()));
						product.setOnReserved(product.getOnReserved().add(materialQuantity.getOnReserved()));
						if (product.getWarehouse() == null) {
							product.setWarehouse(DataConvert.STRING_VALUE_EMPTY);
						}
						product.setWarehouse(
								product.getWarehouse() + (!DataConvert.isNullOrEmpty(product.getWarehouse()) ? "," : "")
										+ materialQuantity.getSource());
					}
				}
			}
			// 查询物料的价格
			emBusinessPartnerType partnerType = null;
			IMaterialPriceList priceList = null;
			String partnerCode = null;
			String today = null;
			String currency = null;
			for (ICondition item : criteria.getConditions()) {
				if (MaterialPrice.CONDITION_ALIAS_CUSTOMER.equalsIgnoreCase(item.getAlias())) {
					partnerType = emBusinessPartnerType.CUSTOMER;
					partnerCode = item.getValue();
				} else if (MaterialPrice.CONDITION_ALIAS_SUPPLIER.equalsIgnoreCase(item.getAlias())) {
					partnerType = emBusinessPartnerType.SUPPLIER;
					partnerCode = item.getValue();
				} else if (MaterialPrice.CONDITION_ALIAS_PRICELIST.equalsIgnoreCase(item.getAlias())) {
					if (Integer.valueOf(item.getValue()) != 0) {
						// 获取价格清单实例
						ICriteria plCriteria = new Criteria();
						plCriteria.setResultCount(1);
						plCriteria.setNoChilds(true);
						ICondition condition = plCriteria.getConditions().create();
						condition.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
						condition.setValue(item.getValue());
						priceList = this.fetchMaterialPriceList(plCriteria).getResultObjects().firstOrDefault();
					}
				} else if (MaterialSpecialPrice.PROPERTY_VALIDDATE.getName().equalsIgnoreCase(item.getAlias())
						|| MaterialSpecialPrice.PROPERTY_INVALIDDATE.getName().equalsIgnoreCase(item.getAlias())) {
					if (!DataConvert.isNullOrEmpty(item.getValue())) {
						today = item.getValue();
					}
				} else if (MaterialPrice.CONDITION_ALIAS_CURRENCY.equalsIgnoreCase(item.getAlias())) {
					if (!DataConvert.isNullOrEmpty(item.getValue())) {
						currency = item.getValue();
					}
				}
			}
			// 根据条件改变货币类型
			if (!DataConvert.isNullOrEmpty(currency)) {
				if (priceList != null) {
					priceList.setCurrency(currency);
				}
			}
			List<IMaterialPrice> materialPrices = this.getMaterialPrices(
					opRsltProduct.getResultObjects().toArray(new MaterialBase<?>[] {}), priceList, partnerType,
					partnerCode, today);
			// 根据条件，判断使用哪个单位价格
			IMaterialPrice priceItem;
			List<IMaterialPrice> priceItems;
			for (Product product : opRsltProduct.getResultObjects()) {
				priceItems = materialPrices.where(c -> product.getCode().equalsIgnoreCase(c.getItemCode()));
				if (partnerType == emBusinessPartnerType.CUSTOMER
						&& !DataConvert.isNullOrEmpty(product.getSalesUOM())) {
					priceItem = priceItems.firstOrDefault(c -> product.getSalesUOM().equals(c.getUOM()));
					if (priceItem != null) {
						product.setPrice(priceItem.getPrice());
						product.setCurrency(priceItem.getCurrency());
						product.setTaxed(priceItem.getTaxed());
						product.markOld();
						continue;
					}
				}
				if (partnerType == emBusinessPartnerType.SUPPLIER
						&& !DataConvert.isNullOrEmpty(product.getPurchaseUOM())) {
					priceItem = priceItems.firstOrDefault(c -> product.getPurchaseUOM().equals(c.getUOM()));
					if (priceItem != null) {
						product.setPrice(priceItem.getPrice());
						product.setCurrency(priceItem.getCurrency());
						product.setTaxed(priceItem.getTaxed());
						product.markOld();
						continue;
					}
				}
				if (!DataConvert.isNullOrEmpty(product.getInventoryUOM())) {
					priceItem = priceItems.firstOrDefault(c -> product.getInventoryUOM().equals(c.getUOM()));
					if (priceItem != null) {
						product.setPrice(priceItem.getPrice());
						product.setCurrency(priceItem.getCurrency());
						product.setTaxed(priceItem.getTaxed());
						product.markOld();
						continue;
					}
				}
				priceItem = priceItems.firstOrDefault();
				if (priceItem != null) {
					product.setPrice(priceItem.getPrice());
					product.setCurrency(priceItem.getCurrency());
					product.setTaxed(priceItem.getTaxed());
					product.markOld();
					continue;
				}
				product.markOld();
			}
			return opRsltProduct;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	// --------------------------------------------------------------------------------------------//
	@Override
	public IOperationResult<IProduct> fetchProductInventory(ICriteria criteria) {
		return new OperationResult<IProduct>(this.fetchProduct(criteria, this.getUserToken()));
	}

	@Override
	public OperationResult<Product> fetchProductInventory(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			if (criteria == null || criteria.getConditions().isEmpty()) {
				throw new Exception(I18N.prop("msg_bobas_invaild_criteria"));
			}
			// 查询物料
			ICriteria pdCriteria = DataConvert.filterConditions(criteria, false, Product.CONDITION_ALIAS_WAREHOUSE);
			pdCriteria.setResultCount(criteria.getResultCount());
			OperationResult<Product> opRsltProduct = this.fetchProduct(pdCriteria, this.getUserToken());
			if (opRsltProduct.getError() != null) {
				throw opRsltProduct.getError();
			}
			// 查询物料的库存
			ICriteria whCriteria = DataConvert.filterConditions(criteria, true, Product.CONDITION_ALIAS_WAREHOUSE,
					Product.PROPERTY_ONHAND.getName(), Product.PROPERTY_ONCOMMITED.getName(),
					Product.PROPERTY_ONORDERED.getName(), Product.PROPERTY_ONRESERVED.getName());
			if (whCriteria == null) {
				whCriteria = new Criteria();
			}
			ICondition condition;
			if (whCriteria.getConditions().size() > 1) {
				condition = whCriteria.getConditions().firstOrDefault();
				condition.setBracketOpen(condition.getBracketOpen() + 1);
				condition = whCriteria.getConditions().lastOrDefault();
				condition.setBracketClose(condition.getBracketClose() + 1);
			}
			int size = whCriteria.getConditions().size();
			for (Product product : opRsltProduct.getResultObjects()) {
				condition = whCriteria.getConditions().create();
				condition.setAlias(MaterialQuantity.CONDITION_ALIAS_ITEMCODE);
				condition.setOperation(ConditionOperation.EQUAL);
				condition.setValue(product.getCode());
				if (whCriteria.getConditions().size() > size + 1) {
					condition.setRelationship(ConditionRelationship.OR);
				}
			}
			if (whCriteria.getConditions().size() > size + 1) {
				condition = whCriteria.getConditions().get(size);
				condition.setBracketOpen(condition.getBracketOpen() + 1);
				condition = whCriteria.getConditions().get(whCriteria.getConditions().size() - 1);
				condition.setBracketClose(condition.getBracketClose() + 1);
			}
			if (whCriteria.getConditions().isEmpty()) {
				return new OperationResult<>();
			}
			OperationResult<Product> operationResult = new OperationResult<>();
			IOperationResult<IMaterialInventory> opRsltInventory = this.fetchMaterialInventory(whCriteria);
			if (opRsltInventory.getError() != null) {
				throw opRsltInventory.getError();
			}
			// 重新设置数量
			for (Product product : opRsltProduct.getResultObjects()) {
				for (IMaterialInventory inventory : opRsltInventory.getResultObjects()) {
					if (!product.getCode().equalsIgnoreCase(inventory.getItemCode())) {
						continue;
					}
					product = product.clone();
					product.setWarehouse(inventory.getWarehouse());
					product.setOnHand(inventory.getOnHand());
					product.setOnCommited(inventory.getOnCommited());
					product.setOnOrdered(inventory.getOnOrdered());
					product.setOnReserved(inventory.getOnReserved());
					product.markOld();
					operationResult.addResultObjects(product);
				}
			}
			return operationResult;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料规格
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialSpecification> fetchMaterialSpecification(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialSpecification.class);
	}

	/**
	 * 查询-物料规格（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialSpecification> fetchMaterialSpecification(ICriteria criteria) {
		return new OperationResult<IMaterialSpecification>(
				this.fetchMaterialSpecification(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料规格
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialSpecification> saveMaterialSpecification(MaterialSpecification bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料规格（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialSpecification> saveMaterialSpecification(IMaterialSpecification bo) {
		return new OperationResult<IMaterialSpecification>(
				this.saveMaterialSpecification((MaterialSpecification) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-规格模板
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<Specification> fetchSpecification(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Specification.class);
	}

	/**
	 * 查询-规格模板（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<ISpecification> fetchSpecification(ICriteria criteria) {
		return new OperationResult<ISpecification>(this.fetchSpecification(criteria, this.getUserToken()));
	}

	/**
	 * 保存-规格模板
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<Specification> saveSpecification(Specification bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-规格模板（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<ISpecification> saveSpecification(ISpecification bo) {
		return new OperationResult<ISpecification>(this.saveSpecification((Specification) bo, this.getUserToken()));
	}

	@Override
	public IOperationResult<SpecificationTree> fetchSpecificationTree(ICriteria criteria) {
		return this.fetchSpecificationTree(criteria, this.getUserToken());
	}

	@Override
	public OperationResult<SpecificationTree> fetchSpecificationTree(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			if (criteria == null) {
				throw new Exception(I18N.prop("msg_bobas_invaild_criteria"));
			}
			OperationResult<SpecificationTree> operationResult;
			IOperationResult<ISpecification> opRsltSpec;
			// 模板查询
			ICriteria tCriteria = new Criteria();
			for (ICondition item : criteria.getConditions()) {
				if (!item.getAlias().equalsIgnoreCase("Template")) {
					continue;
				}
				ICondition condition = tCriteria.getConditions().create();
				condition.setAlias(Specification.PROPERTY_OBJECTKEY.getName());
				condition.setValue(item.getValue());
			}
			if (!tCriteria.getConditions().isEmpty()) {
				// 通过模板查询
				opRsltSpec = this.fetchSpecification(tCriteria);
				if (opRsltSpec.getError() != null) {
					throw opRsltSpec.getError();
				}
				operationResult = new OperationResult<>();
				for (ISpecification item : opRsltSpec.getResultObjects()) {
					operationResult.addResultObjects(SpecificationTree.create(item));
				}
				return operationResult;
			}
			// 没有明确模板编号
			ICondition condition = null;
			// 物料查询
			ICriteria mCriteria = new Criteria();
			// 客户查询
			ICriteria cCriteria = new Criteria();
			// 供应商查询
			ICriteria sCriteria = new Criteria();
			// 当前日期
			String date = DateTime.getToday().toString();
			for (ICondition item : criteria.getConditions()) {
				if (item.getAlias().equalsIgnoreCase("Material")) {
					// 物料条件
					condition = mCriteria.getConditions().create();
					condition.setBracketOpen(1);
					condition.setAlias(Specification.PROPERTY_TARGETTYPE.getName());
					condition.setValue(emSpecificationTarget.MATERIAL);
					condition = mCriteria.getConditions().create();
					condition.setBracketClose(1);
					condition.setAlias(Specification.PROPERTY_TARGET.getName());
					condition.setValue(item.getValue());
					// 物料的组
					ICriteria iCriteria = new Criteria();
					condition = iCriteria.getConditions().create();
					condition.setAlias(Material.PROPERTY_CODE.getName());
					condition.setValue(item.getValue());
					BORepositoryMaterials boRepository = new BORepositoryMaterials();
					boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
					IMaterial material = boRepository.fetchMaterial(iCriteria).getResultObjects().firstOrDefault();
					if (material != null && material.getGroup() != null && !material.getGroup().isEmpty()) {
						condition = mCriteria.getConditions().create();
						condition.setBracketOpen(1);
						condition.setAlias(Specification.PROPERTY_TARGETTYPE.getName());
						condition.setValue(emSpecificationTarget.MATERIAL_GROUP);
						condition.setRelationship(ConditionRelationship.OR);
						condition = mCriteria.getConditions().create();
						condition.setBracketClose(1);
						condition.setAlias(Specification.PROPERTY_TARGET.getName());
						condition.setValue(material.getGroup());
					}
				} else if (item.getAlias().equalsIgnoreCase("Customer")) {
					// 客户
					condition = cCriteria.getConditions().create();
					condition.setBracketOpen(1);
					condition.setAlias(Specification.PROPERTY_ASSIGNEDTYPE.getName());
					condition.setValue(emSpecificationAssigned.CUSTOMER);
					condition = cCriteria.getConditions().create();
					condition.setBracketClose(1);
					condition.setAlias(Specification.PROPERTY_ASSIGNED.getName());
					condition.setValue(item.getValue());
					// 业务伙伴组
					ICriteria iCriteria = new Criteria();
					condition = iCriteria.getConditions().create();
					condition.setAlias(Customer.PROPERTY_CODE.getName());
					condition.setValue(item.getValue());
					BORepositoryBusinessPartner boRepository = new BORepositoryBusinessPartner();
					boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
					ICustomer customer = boRepository.fetchCustomer(iCriteria).getResultObjects().firstOrDefault();
					if (customer != null && customer.getGroup() != null && !customer.getGroup().isEmpty()) {
						condition = cCriteria.getConditions().create();
						condition.setBracketOpen(1);
						condition.setAlias(Specification.PROPERTY_ASSIGNEDTYPE.getName());
						condition.setValue(emSpecificationAssigned.CUSTOMER);
						condition.setRelationship(ConditionRelationship.OR);
						condition = cCriteria.getConditions().create();
						condition.setBracketClose(1);
						condition.setAlias(Specification.PROPERTY_ASSIGNED.getName());
						condition.setValue(customer.getGroup());
					}
				} else if (item.getAlias().equalsIgnoreCase("Supplier")) {
					// 供应商
					condition = sCriteria.getConditions().create();
					condition.setBracketOpen(1);
					condition.setAlias(Specification.PROPERTY_ASSIGNEDTYPE.getName());
					condition.setValue(emSpecificationAssigned.SUPPLIER);
					condition = sCriteria.getConditions().create();
					condition.setBracketClose(1);
					condition.setAlias(Specification.PROPERTY_ASSIGNED.getName());
					condition.setValue(item.getValue());
					// 业务伙伴组
					ICriteria iCriteria = new Criteria();
					condition = iCriteria.getConditions().create();
					condition.setAlias(Supplier.PROPERTY_CODE.getName());
					condition.setValue(item.getValue());
					BORepositoryBusinessPartner boRepository = new BORepositoryBusinessPartner();
					boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
					ISupplier supplier = boRepository.fetchSupplier(iCriteria).getResultObjects().firstOrDefault();
					if (supplier != null && supplier.getGroup() != null && !supplier.getGroup().isEmpty()) {
						condition = sCriteria.getConditions().create();
						condition.setBracketOpen(1);
						condition.setAlias(Specification.PROPERTY_ASSIGNEDTYPE.getName());
						condition.setValue(emSpecificationAssigned.SUPPLIER);
						condition.setRelationship(ConditionRelationship.OR);
						condition = sCriteria.getConditions().create();
						condition.setBracketClose(1);
						condition.setAlias(Specification.PROPERTY_ASSIGNED.getName());
						condition.setValue(supplier.getGroup());
					}
				} else if (item.getAlias().equalsIgnoreCase("Date")) {
					date = item.getValue();
				}
			}
			// 激活的
			condition = tCriteria.getConditions().create();
			condition.setAlias(Specification.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			// 有效日期
			condition = tCriteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(Specification.PROPERTY_VALIDDATE.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition = tCriteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.OR);
			condition.setBracketOpen(1);
			condition.setAlias(Specification.PROPERTY_VALIDDATE.getName());
			condition.setOperation(ConditionOperation.NOT_NULL);
			condition = tCriteria.getConditions().create();
			condition.setBracketClose(2);
			condition.setAlias(Specification.PROPERTY_VALIDDATE.getName());
			condition.setOperation(ConditionOperation.LESS_EQUAL);
			condition.setValue(date);
			// 失效日期
			condition = tCriteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(Specification.PROPERTY_INVALIDDATE.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition = tCriteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.OR);
			condition.setBracketOpen(1);
			condition.setAlias(Specification.PROPERTY_INVALIDDATE.getName());
			condition.setOperation(ConditionOperation.NOT_NULL);
			condition = tCriteria.getConditions().create();
			condition.setBracketClose(2);
			condition.setAlias(Specification.PROPERTY_INVALIDDATE.getName());
			condition.setOperation(ConditionOperation.GRATER_EQUAL);
			condition.setValue(date);
			ISort sort = tCriteria.getSorts().create();
			sort.setAlias(Specification.PROPERTY_OBJECTKEY.getName());
			sort.setSortType(SortType.DESCENDING);
			if (mCriteria.getConditions().isEmpty()) {
				throw new Exception(I18N.prop("msg_mm_not_specified_material"));
			}
			// 构建查询
			tCriteria.setResultCount(criteria.getResultCount());
			tCriteria.getConditions().addAll(mCriteria.getConditions());
			criteria = tCriteria.clone();
			// 客户查询
			if (!cCriteria.getConditions().isEmpty()) {
				criteria.getConditions().addAll(cCriteria.getConditions());
			}
			// 供应商查询
			if (!sCriteria.getConditions().isEmpty()) {
				criteria.getConditions().addAll(sCriteria.getConditions());
			}
			opRsltSpec = this.fetchSpecification(criteria);
			if (opRsltSpec.getError() != null) {
				throw opRsltSpec.getError();
			}
			// 有结果
			if (!opRsltSpec.getResultObjects().isEmpty()) {
				operationResult = new OperationResult<>();
				for (ISpecification item : opRsltSpec.getResultObjects()) {
					operationResult.addResultObjects(SpecificationTree.create(item));
				}
				return operationResult;
			}
			// 不带合作伙伴的查询
			criteria = tCriteria.clone();
			condition = criteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.AND);
			condition.setBracketOpen(1);
			condition.setAlias(Specification.PROPERTY_ASSIGNED.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition = criteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.OR);
			condition.setBracketClose(1);
			condition.setAlias(Specification.PROPERTY_ASSIGNED.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue("");
			opRsltSpec = this.fetchSpecification(criteria);
			if (opRsltSpec.getError() != null) {
				throw opRsltSpec.getError();
			}
			operationResult = new OperationResult<>();
			for (ISpecification item : opRsltSpec.getResultObjects()) {
				operationResult.addResultObjects(SpecificationTree.create(item));
			}
			return operationResult;
		} catch (Exception e) {
			Logger.log(e);
			return new OperationResult<>(e);
		}
	}
	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-计量单位
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<Unit> fetchUnit(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Unit.class);
	}

	/**
	 * 查询-计量单位（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IUnit> fetchUnit(ICriteria criteria) {
		return new OperationResult<IUnit>(this.fetchUnit(criteria, this.getUserToken()));
	}

	/**
	 * 保存-计量单位
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<Unit> saveUnit(Unit bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-计量单位（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IUnit> saveUnit(IUnit bo) {
		return new OperationResult<IUnit>(this.saveUnit((Unit) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-计量单位换算率
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<UnitRate> fetchUnitRate(ICriteria criteria, String token) {
		return super.fetch(criteria, token, UnitRate.class);
	}

	/**
	 * 查询-计量单位换算率（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IUnitRate> fetchUnitRate(ICriteria criteria) {
		return new OperationResult<IUnitRate>(this.fetchUnitRate(criteria, this.getUserToken()));
	}

	/**
	 * 保存-计量单位换算率
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<UnitRate> saveUnitRate(UnitRate bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-计量单位换算率（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IUnitRate> saveUnitRate(IUnitRate bo) {
		return new OperationResult<IUnitRate>(this.saveUnitRate((UnitRate) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料废品率
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialScrap> fetchMaterialScrap(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialScrap.class);
	}

	/**
	 * 查询-物料废品率（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialScrap> fetchMaterialScrap(ICriteria criteria) {
		return new OperationResult<IMaterialScrap>(this.fetchMaterialScrap(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料废品率
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialScrap> saveMaterialScrap(MaterialScrap bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料废品率（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialScrap> saveMaterialScrap(IMaterialScrap bo) {
		return new OperationResult<IMaterialScrap>(this.saveMaterialScrap((MaterialScrap) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料版本
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialVersion> fetchMaterialVersion(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialVersion.class);
	}

	/**
	 * 查询-物料版本（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialVersion> fetchMaterialVersion(ICriteria criteria) {
		return new OperationResult<IMaterialVersion>(this.fetchMaterialVersion(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料版本
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialVersion> saveMaterialVersion(MaterialVersion bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料版本（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialVersion> saveMaterialVersion(IMaterialVersion bo) {
		return new OperationResult<IMaterialVersion>(
				this.saveMaterialVersion((MaterialVersion) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料库存预留
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialInventoryReservation> fetchMaterialInventoryReservation(ICriteria criteria,
			String token) {
		return super.fetch(criteria, token, MaterialInventoryReservation.class);
	}

	/**
	 * 查询-物料库存预留（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialInventoryReservation> fetchMaterialInventoryReservation(ICriteria criteria) {
		return new OperationResult<IMaterialInventoryReservation>(
				this.fetchMaterialInventoryReservation(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料库存预留
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialInventoryReservation> saveMaterialInventoryReservation(
			MaterialInventoryReservation bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料库存预留（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialInventoryReservation> saveMaterialInventoryReservation(
			IMaterialInventoryReservation bo) {
		return new OperationResult<IMaterialInventoryReservation>(
				this.saveMaterialInventoryReservation((MaterialInventoryReservation) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料替代
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialSubstitute> fetchMaterialSubstitute(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialSubstitute.class);
	}

	/**
	 * 查询-物料替代（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialSubstitute> fetchMaterialSubstitute(ICriteria criteria) {
		return new OperationResult<IMaterialSubstitute>(this.fetchMaterialSubstitute(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料替代
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialSubstitute> saveMaterialSubstitute(MaterialSubstitute bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料替代（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialSubstitute> saveMaterialSubstitute(IMaterialSubstitute bo) {
		return new OperationResult<IMaterialSubstitute>(
				this.saveMaterialSubstitute((MaterialSubstitute) bo, this.getUserToken()));
	}
	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料订购预留
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialOrderedReservation> fetchMaterialOrderedReservation(ICriteria criteria,
			String token) {
		return super.fetch(criteria, token, MaterialOrderedReservation.class);
	}

	/**
	 * 查询-物料订购预留（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialOrderedReservation> fetchMaterialOrderedReservation(ICriteria criteria) {
		return new OperationResult<IMaterialOrderedReservation>(
				this.fetchMaterialOrderedReservation(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料订购预留
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialOrderedReservation> saveMaterialOrderedReservation(MaterialOrderedReservation bo,
			String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料订购预留（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialOrderedReservation> saveMaterialOrderedReservation(
			IMaterialOrderedReservation bo) {
		return new OperationResult<IMaterialOrderedReservation>(
				this.saveMaterialOrderedReservation((MaterialOrderedReservation) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-拣配清单
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<PickLists> fetchPickLists(ICriteria criteria, String token) {
		return super.fetch(criteria, token, PickLists.class);
	}

	/**
	 * 查询-拣配清单（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IPickLists> fetchPickLists(ICriteria criteria) {
		return new OperationResult<IPickLists>(this.fetchPickLists(criteria, this.getUserToken()));
	}

	/**
	 * 保存-拣配清单
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<PickLists> savePickLists(PickLists bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-拣配清单（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IPickLists> savePickLists(IPickLists bo) {
		return new OperationResult<IPickLists>(this.savePickLists((PickLists) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	@Override
	public IOperationResult<Object> changeMaterialNumbers(MaterialNumberChange changes) {
		return this.changeMaterialNumbers(changes, this.getUserToken());
	}

	@Override
	public OperationResult<Object> changeMaterialNumbers(MaterialNumberChange changes, String token) {
		try {
			this.setUserToken(token);
			if (changes == null) {
				throw new Exception(I18N.prop("msg_mm_not_specified_material"));
			}
			if (changes.getReceipt() == null) {
				throw new Exception(I18N.prop("msg_mm_not_specified_material"));
			}
			if (changes.getIssue() == null) {
				throw new Exception(I18N.prop("msg_mm_not_specified_material"));
			}
			OperationResult<Object> operationResult = new OperationResult<Object>();
			boolean myTrans = this.beginTransaction();
			try {
				// 保存非新建预留（才能出库）
				if (changes.getReservations() != null) {
					IOperationResult<IMaterialInventoryReservation> opRslt;
					for (MaterialInventoryReservation reservation : changes.getReservations()) {
						if (reservation.isNew()) {
							continue;
						}
						opRslt = this.saveMaterialInventoryReservation(reservation);
						if (opRslt.getError() != null) {
							throw opRslt.getError();
						}
					}
				}
				// 保存出库
				if (changes.getIssue() != null) {
					IOperationResult<IGoodsIssue> opRslt = this.saveGoodsIssue(changes.getIssue());
					if (opRslt.getError() != null) {
						throw opRslt.getError();
					}
					operationResult.addInformations(GoodsIssue.BUSINESS_OBJECT_NAME,
							opRslt.getResultObjects().firstOrDefault().getDocEntry().toString());
					// 入库记录出库关系
					for (IGoodsIssue issue : opRslt.getResultObjects()) {
						IGoodsIssueLine issueLine;
						IGoodsReceiptLine receiptLine;
						for (int i = 0; i < issue.getGoodsIssueLines().size(); i++) {
							issueLine = issue.getGoodsIssueLines().get(i);
							receiptLine = changes.getReceipt().getGoodsReceiptLines().get(i);
							receiptLine.setBaseDocumentType(issueLine.getObjectCode());
							receiptLine.setBaseDocumentEntry(issueLine.getDocEntry());
							receiptLine.setBaseDocumentLineId(issueLine.getLineId());
						}
					}
				}
				// 保存入库
				if (changes.getReceipt() != null) {
					IOperationResult<IGoodsReceipt> opRslt = this.saveGoodsReceipt(changes.getReceipt());
					if (opRslt.getError() != null) {
						throw opRslt.getError();
					}
					operationResult.addInformations(GoodsReceipt.BUSINESS_OBJECT_NAME,
							opRslt.getResultObjects().firstOrDefault().getDocEntry().toString());
				}
				// 保存新建预留
				if (changes.getReservations() != null) {
					IOperationResult<IMaterialInventoryReservation> opRslt;
					for (MaterialInventoryReservation reservation : changes.getReservations()) {
						if (!reservation.isNew()) {
							continue;
						}
						opRslt = this.saveMaterialInventoryReservation(reservation);
						if (opRslt.getError() != null) {
							throw opRslt.getError();
						}
					}
				}
				// 保存批次/序列号变化关系
				if (changes.getReceipt() != null && changes.getIssue() != null) {
					// 入库记录出库关系
					IGoodsIssueLine issueLine;
					IGoodsReceiptLine receiptLine;
					IMaterialBatchItem batchItem;
					IMaterialSerialItem serialItem;
					IMaterialNumberAssociation association = null;
					ArrayList<IMaterialNumberAssociation> associations = new ArrayList<>();
					for (int i = 0; i < changes.getIssue().getGoodsIssueLines().size(); i++) {
						issueLine = changes.getIssue().getGoodsIssueLines().get(i);
						receiptLine = changes.getReceipt().getGoodsReceiptLines().get(i);
						receiptLine.setBaseDocumentType(issueLine.getObjectCode());
						receiptLine.setBaseDocumentEntry(issueLine.getDocEntry());
						receiptLine.setBaseDocumentLineId(issueLine.getLineId());
						for (int j = 0; j < issueLine.getMaterialBatches().size(); j++) {
							batchItem = issueLine.getMaterialBatches().get(j);
							association = new MaterialNumberAssociation();
							association.setBaseDocumentType(receiptLine.getObjectCode());
							association.setBaseDocumentEntry(receiptLine.getDocEntry());
							association.setBaseDocumentLineId(receiptLine.getLineId());
							association.setRelation("CHANGE");
							association.setItemCode(issueLine.getItemCode());
							association.setWarehouse(issueLine.getWarehouse());
							association.setBatchCode(batchItem.getBatchCode());
							association.setSerialCode(DataConvert.STRING_VALUE_EMPTY);
							association.setQuantity(batchItem.getQuantity());
							association.setAssociatedItem(receiptLine.getItemCode());
							association.setAssociatedWarehouse(receiptLine.getWarehouse());
							association.setAssociatedBatch(receiptLine.getMaterialBatches().get(j).getBatchCode());
							association.setAssociatedSerial(DataConvert.STRING_VALUE_EMPTY);
							associations.add(association);
						}
						for (int j = 0; j < issueLine.getMaterialSerials().size(); j++) {
							serialItem = issueLine.getMaterialSerials().get(j);
							association = new MaterialNumberAssociation();
							association.setBaseDocumentType(receiptLine.getObjectCode());
							association.setBaseDocumentEntry(receiptLine.getDocEntry());
							association.setBaseDocumentLineId(receiptLine.getLineId());
							association.setRelation("CHANGE");
							association.setItemCode(issueLine.getItemCode());
							association.setWarehouse(issueLine.getWarehouse());
							association.setBatchCode(DataConvert.STRING_VALUE_EMPTY);
							association.setSerialCode(serialItem.getSerialCode());
							association.setQuantity(Decimal.ONE);
							association.setAssociatedItem(receiptLine.getItemCode());
							association.setAssociatedWarehouse(receiptLine.getWarehouse());
							association.setAssociatedBatch(DataConvert.STRING_VALUE_EMPTY);
							association.setAssociatedSerial(receiptLine.getMaterialSerials().get(j).getSerialCode());
							associations.add(association);
						}
					}
					for (IMaterialNumberAssociation item : associations) {
						IOperationResult<IMaterialNumberAssociation> opRslt = this.saveMaterialNumberAssociation(item);
						if (opRslt.getError() != null) {
							throw opRslt.getError();
						}
					}
				}
				if (myTrans) {
					this.commitTransaction();
				}
			} catch (Exception e) {
				if (myTrans) {
					this.rollbackTransaction();
				}
				throw e;
			}
			return operationResult;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	@Override
	public IOperationResult<Object> transferMaterialInventories(MaterialInventoryTransfer transfers) {
		return this.transferMaterialInventories(transfers, this.getUserToken());
	}

	@Override
	public OperationResult<Object> transferMaterialInventories(MaterialInventoryTransfer transfers, String token) {
		try {
			this.setUserToken(token);
			if (transfers == null) {
				throw new Exception(I18N.prop("msg_mm_not_specified_material"));
			}
			if (transfers.getTransfer() == null) {
				throw new Exception(I18N.prop("msg_mm_not_specified_material"));
			}
			if (transfers.getTransfer().getInventoryTransferLines().isEmpty()) {
				throw new Exception(I18N.prop("msg_mm_not_specified_material"));
			}
			OperationResult<Object> operationResult = new OperationResult<Object>();
			boolean myTrans = this.beginTransaction();
			try {
				// 保存非新建预留（才能出库）
				if (transfers.getReservations() != null) {
					IOperationResult<IMaterialInventoryReservation> opRslt;
					for (MaterialInventoryReservation reservation : transfers.getReservations()) {
						if (reservation.isNew()) {
							continue;
						}
						opRslt = this.saveMaterialInventoryReservation(reservation);
						if (opRslt.getError() != null) {
							throw opRslt.getError();
						}
					}
				}
				// 保存转储
				if (transfers.getTransfer() != null) {
					IOperationResult<IInventoryTransfer> opRslt = this.saveInventoryTransfer(transfers.getTransfer());
					if (opRslt.getError() != null) {
						throw opRslt.getError();
					}
					operationResult.addInformations(InventoryTransfer.BUSINESS_OBJECT_NAME,
							opRslt.getResultObjects().firstOrDefault().getDocEntry().toString());
				}
				// 保存新建预留
				if (transfers.getReservations() != null) {
					IOperationResult<IMaterialInventoryReservation> opRslt;
					for (MaterialInventoryReservation reservation : transfers.getReservations()) {
						if (!reservation.isNew()) {
							continue;
						}
						opRslt = this.saveMaterialInventoryReservation(reservation);
						if (opRslt.getError() != null) {
							throw opRslt.getError();
						}
					}
				}
				if (myTrans) {
					this.commitTransaction();
				}
			} catch (Exception e) {
				if (myTrans) {
					this.rollbackTransaction();
				}
				throw e;
			}
			return operationResult;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-库存转储请求
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<InventoryTransferRequest> fetchInventoryTransferRequest(ICriteria criteria, String token) {
		return super.fetch(criteria, token, InventoryTransferRequest.class);
	}

	/**
	 * 查询-库存转储请求（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IInventoryTransferRequest> fetchInventoryTransferRequest(ICriteria criteria) {
		return new OperationResult<IInventoryTransferRequest>(
				this.fetchInventoryTransferRequest(criteria, this.getUserToken()));
	}

	/**
	 * 保存-库存转储请求
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<InventoryTransferRequest> saveInventoryTransferRequest(InventoryTransferRequest bo,
			String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-库存转储请求（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IInventoryTransferRequest> saveInventoryTransferRequest(IInventoryTransferRequest bo) {
		return new OperationResult<IInventoryTransferRequest>(
				this.saveInventoryTransferRequest((InventoryTransferRequest) bo, this.getUserToken()));
	}
	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-物料特殊价格
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialSpecialPrice> fetchMaterialSpecialPrice(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialSpecialPrice.class);
	}

	/**
	 * 查询-物料特殊价格（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialSpecialPrice> fetchMaterialSpecialPrice(ICriteria criteria) {
		return new OperationResult<IMaterialSpecialPrice>(
				this.fetchMaterialSpecialPrice(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料特殊价格
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialSpecialPrice> saveMaterialSpecialPrice(MaterialSpecialPrice bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料特殊价格（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialSpecialPrice> saveMaterialSpecialPrice(IMaterialSpecialPrice bo) {
		return new OperationResult<IMaterialSpecialPrice>(
				this.saveMaterialSpecialPrice((MaterialSpecialPrice) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-物料系号关联
	 * @param criteria 查询
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialNumberAssociation> fetchMaterialNumberAssociation(ICriteria criteria, String token) {
		return super.fetch(criteria, token, MaterialNumberAssociation.class);
	}

	/**
	 * 查询-物料系号关联（提前设置用户口令）
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialNumberAssociation> fetchMaterialNumberAssociation(ICriteria criteria) {
		return new OperationResult<IMaterialNumberAssociation>(
				this.fetchMaterialNumberAssociation(criteria, this.getUserToken()));
	}

	/**
	 * 保存-物料系号关联
	 * @param bo 对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<MaterialNumberAssociation> saveMaterialNumberAssociation(MaterialNumberAssociation bo,
			String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-物料系号关联（提前设置用户口令）
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IMaterialNumberAssociation> saveMaterialNumberAssociation(IMaterialNumberAssociation bo) {
		return new OperationResult<IMaterialNumberAssociation>(
				this.saveMaterialNumberAssociation((MaterialNumberAssociation) bo, this.getUserToken()));
	}
	// --------------------------------------------------------------------------------------------//

}
