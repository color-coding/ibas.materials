package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.Decimals;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.db.DbField;
import org.colorcoding.ibas.bobas.db.DbFieldType;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessObjectGroup;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryReservations;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservations;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialInventoryReservationReleaseContract.class)
public class MaterialInventoryReservationReleaseService extends
		MaterialInventoryBusinessLogic<IMaterialInventoryReservationReleaseContract, IMaterialInventoryReservationGroup4Release> {

	private static final IMaterialInventoryReservationGroup4Release EMPTY_DATA = new MaterialInventoryReservationGroup4Release();

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialInventoryReservationReleaseContract) {
			IMaterialInventoryReservationReleaseContract contract = (IMaterialInventoryReservationReleaseContract) data;
			IMaterial material = this.checkMaterial(contract.getItemCode());
			if (material.getItemType() == emItemType.SERVICES) {
				// 服务物料，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "ItemType",
						material.getItemType());
				return false;
			}
			if (material.getPhantomItem() == emYesNo.YES) {
				// 虚拟物料，不执行此逻辑
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"PhantomItem", material.getPhantomItem());
				return false;
			}
			if (material.getInventoryItem() == emYesNo.NO) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"InventoryItem", material.getInventoryItem());
				// 非库存物料，不执行此逻辑
				return false;
			}
			if (contract.getQuantity().compareTo(Decimals.VALUE_ZERO) <= 0) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "Quantity",
						contract.getQuantity());
				return false;
			}
			if (Strings.isNullOrEmpty(contract.getTargetDocumentType())) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"TargetDocumentType", "EMPTY");
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialInventoryReservationGroup4Release fetchBeAffected(
			IMaterialInventoryReservationReleaseContract contract) {
		// 检查预留记录
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTTYPE.getName());
		condition.setValue(contract.getTargetDocumentType());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTENTRY.getName());
		condition.setValue(contract.getTargetDocumentEntry());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTLINEID.getName());
		condition.setValue(contract.getTargetDocumentLineId());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_ITEMCODE.getName());
		condition.setValue(contract.getItemCode());
		condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_WAREHOUSE.getName());
		condition.setValue(contract.getWarehouse());
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (material.getBatchManagement() == emYesNo.YES) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryReservation.PROPERTY_BATCHCODE.getName());
			condition.setValue(contract.getBatchCode());
			if (!(this.getHost() instanceof IMaterialBatchJournal)) {
				// 批次管理，宿主为序列记录则不执行
				return EMPTY_DATA;
			}
		}
		if (material.getSerialManagement() == emYesNo.YES) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryReservation.PROPERTY_SERIALCODE.getName());
			condition.setValue(contract.getSerialCode());
			if (!(this.getHost() instanceof IMaterialSerialJournal)) {
				// 序列管理，宿主为批次记录则不执行
				return EMPTY_DATA;
			}
		}
		IMaterialInventoryReservationGroup4Release reservationGroup = this
				.fetchBeAffected(IMaterialInventoryReservationGroup4Release.class, criteria);
		if (reservationGroup == null) {
			try (BORepositoryMaterials boRepository = new BORepositoryMaterials()) {
				boRepository.setTransaction(this.getTransaction());
				IOperationResult<IMaterialInventoryReservation> opRsltInventory = boRepository
						.fetchMaterialInventoryReservation(criteria);
				if (opRsltInventory.getError() != null) {
					throw new BusinessLogicException(opRsltInventory.getError());
				}
				reservationGroup = new MaterialInventoryReservationGroup4Release();
				reservationGroup.setTargetDocumentType(contract.getTargetDocumentType());
				reservationGroup.setTargetDocumentEntry(contract.getTargetDocumentEntry());
				reservationGroup.setTargetDocumentLineId(contract.getTargetDocumentLineId());
				reservationGroup.setItemCode(contract.getItemCode());
				reservationGroup.setWarehouse(contract.getWarehouse());
				reservationGroup.setBatchCode(contract.getBatchCode());
				reservationGroup.setSerialCode(contract.getSerialCode());
				IMaterialInventoryReservation reservation;
				for (IMaterialInventoryReservation item : opRsltInventory.getResultObjects()) {
					// 判断内存中是否已有
					reservation = this.fetchBeAffected(IMaterialInventoryReservation.class, item.getCriteria());
					if (reservation == null) {
						// 使用数据库的
						reservationGroup.getItems().add(item);
					} else {
						// 使用内存的
						reservationGroup.getItems().add(reservation);
					}
				}
			}
		}
		return reservationGroup;
	}

	@Override
	protected void impact(IMaterialInventoryReservationReleaseContract contract) {
		IMaterialInventoryReservationGroup4Release reservationGroup = this.getBeAffected();
		if (reservationGroup != EMPTY_DATA) {
			BigDecimal remQuantity;
			BigDecimal avaQuantity = contract.getQuantity();
			for (IMaterialInventoryReservation item : reservationGroup.getItems()) {
				// 已经取消的不做处理
				if (item.getStatus() == emBOStatus.CLOSED) {
					continue;
				}
				remQuantity = item.getQuantity().subtract(item.getClosedQuantity());
				if (remQuantity.compareTo(Decimals.VALUE_ZERO) <= 0) {
					continue;
				}
				if (remQuantity.compareTo(avaQuantity) >= 0) {
					item.setClosedQuantity(item.getClosedQuantity().add(avaQuantity));
					avaQuantity = Decimals.VALUE_ZERO;
				} else {
					item.setClosedQuantity(item.getClosedQuantity().add(remQuantity));
					avaQuantity = avaQuantity.subtract(remQuantity);
				}
				if (avaQuantity.compareTo(Decimals.VALUE_ZERO) <= 0) {
					// 无可用量
					break;
				}
			}
		}
	}

	@Override
	protected void revoke(IMaterialInventoryReservationReleaseContract contract) {
		IMaterialInventoryReservationGroup4Release reservationGroup = this.getBeAffected();
		if (reservationGroup != EMPTY_DATA) {
			BigDecimal remQuantity;
			BigDecimal avaQuantity = contract.getQuantity();
			for (IMaterialInventoryReservation item : reservationGroup.getItems()) {
				remQuantity = item.getClosedQuantity();
				if (remQuantity.compareTo(Decimals.VALUE_ZERO) <= 0) {
					continue;
				}
				if (remQuantity.compareTo(avaQuantity) >= 0) {
					item.setClosedQuantity(item.getClosedQuantity().subtract(avaQuantity));
					avaQuantity = Decimals.VALUE_ZERO;
				} else {
					item.setClosedQuantity(item.getClosedQuantity().subtract(remQuantity));
					avaQuantity = avaQuantity.subtract(remQuantity);
				}
				if (avaQuantity.compareTo(Decimals.VALUE_ZERO) <= 0) {
					// 无可用量
					break;
				}
			}
		}
	}

}

interface IMaterialInventoryReservationGroup4Release extends IBusinessObject {

	/**
	 * 获取-目标单据类型
	 * 
	 * @return 值
	 */
	String getTargetDocumentType();

	/**
	 * 设置-目标单据类型
	 * 
	 * @param value 值
	 */
	void setTargetDocumentType(String value);

	/**
	 * 获取-目标单据编号
	 * 
	 * @return 值
	 */
	Integer getTargetDocumentEntry();

	/**
	 * 设置-目标单据编号
	 * 
	 * @param value 值
	 */
	void setTargetDocumentEntry(Integer value);

	/**
	 * 获取-目标单据行号
	 * 
	 * @return 值
	 */
	Integer getTargetDocumentLineId();

	/**
	 * 设置-目标单据行号
	 * 
	 * @param value 值
	 */
	void setTargetDocumentLineId(Integer value);

	/**
	 * 获取-物料编码
	 * 
	 * @return 值
	 */
	String getItemCode();

	/**
	 * 设置-物料编码
	 * 
	 * @param value 值
	 */
	void setItemCode(String value);

	/**
	 * 获取-仓库
	 * 
	 * @return 值
	 */
	String getWarehouse();

	/**
	 * 设置-仓库
	 * 
	 * @param value 值
	 */
	void setWarehouse(String value);

	/**
	 * 获取-批次编码
	 * 
	 * @return 值
	 */
	String getBatchCode();

	/**
	 * 设置-批次编码
	 * 
	 * @param value 值
	 */
	void setBatchCode(String value);

	/**
	 * 获取-序列编码
	 * 
	 * @return 值
	 */
	String getSerialCode();

	/**
	 * 设置-序列编码
	 * 
	 * @param value 值
	 */
	void setSerialCode(String value);

	/**
	 * 获取-行集合
	 * 
	 * @return 值
	 */
	IMaterialInventoryReservations getItems();

	/**
	 * 设置-行集合
	 * 
	 * @param value 值
	 */
	void setItems(IMaterialInventoryReservations value);
}

/**
 * 物料订购预留 接口
 * 
 */
class MaterialInventoryReservationGroup4Release extends BusinessObject<IMaterialInventoryReservationGroup4Release>
		implements IMaterialInventoryReservationGroup4Release, IBusinessObjectGroup {

	private static final long serialVersionUID = 1L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = MaterialInventoryReservationGroup4Release.class;

	public MaterialInventoryReservationGroup4Release() {
		this.setSavable(false);
	}

	/**
	 * 属性名称-目标单据类型
	 */
	private static final String PROPERTY_TARGETDOCUMENTTYPE_NAME = "TargetDocumentType";

	/**
	 * 目标单据类型 属性
	 */
	@DbField(name = "TargetType", type = DbFieldType.ALPHANUMERIC)
	public static final IPropertyInfo<String> PROPERTY_TARGETDOCUMENTTYPE = registerProperty(
			PROPERTY_TARGETDOCUMENTTYPE_NAME, String.class, MY_CLASS);

	/**
	 * 获取-目标单据类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_TARGETDOCUMENTTYPE_NAME)
	public final String getTargetDocumentType() {
		return this.getProperty(PROPERTY_TARGETDOCUMENTTYPE);
	}

	/**
	 * 设置-目标单据类型
	 * 
	 * @param value 值
	 */
	public final void setTargetDocumentType(String value) {
		this.setProperty(PROPERTY_TARGETDOCUMENTTYPE, value);
	}

	/**
	 * 属性名称-目标单据编号
	 */
	private static final String PROPERTY_TARGETDOCUMENTENTRY_NAME = "TargetDocumentEntry";

	/**
	 * 目标单据编号 属性
	 */
	@DbField(name = "TargetEntry", type = DbFieldType.NUMERIC)
	public static final IPropertyInfo<Integer> PROPERTY_TARGETDOCUMENTENTRY = registerProperty(
			PROPERTY_TARGETDOCUMENTENTRY_NAME, Integer.class, MY_CLASS);

	/**
	 * 获取-目标单据编号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_TARGETDOCUMENTENTRY_NAME)
	public final Integer getTargetDocumentEntry() {
		return this.getProperty(PROPERTY_TARGETDOCUMENTENTRY);
	}

	/**
	 * 设置-目标单据编号
	 * 
	 * @param value 值
	 */
	public final void setTargetDocumentEntry(Integer value) {
		this.setProperty(PROPERTY_TARGETDOCUMENTENTRY, value);
	}

	/**
	 * 属性名称-目标单据行号
	 */
	private static final String PROPERTY_TARGETDOCUMENTLINEID_NAME = "TargetDocumentLineId";

	/**
	 * 目标单据行号 属性
	 */
	@DbField(name = "TargetLine", type = DbFieldType.NUMERIC)
	public static final IPropertyInfo<Integer> PROPERTY_TARGETDOCUMENTLINEID = registerProperty(
			PROPERTY_TARGETDOCUMENTLINEID_NAME, Integer.class, MY_CLASS);

	/**
	 * 获取-目标单据行号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_TARGETDOCUMENTLINEID_NAME)
	public final Integer getTargetDocumentLineId() {
		return this.getProperty(PROPERTY_TARGETDOCUMENTLINEID);
	}

	/**
	 * 设置-目标单据行号
	 * 
	 * @param value 值
	 */
	public final void setTargetDocumentLineId(Integer value) {
		this.setProperty(PROPERTY_TARGETDOCUMENTLINEID, value);
	}

	/**
	 * 属性名称-物料编码
	 */
	private static final String PROPERTY_ITEMCODE_NAME = "ItemCode";

	/**
	 * 物料编码 属性
	 */
	@DbField(name = "ItemCode", type = DbFieldType.ALPHANUMERIC)
	public static final IPropertyInfo<String> PROPERTY_ITEMCODE = registerProperty(PROPERTY_ITEMCODE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-物料编码
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ITEMCODE_NAME)
	public final String getItemCode() {
		return this.getProperty(PROPERTY_ITEMCODE);
	}

	/**
	 * 设置-物料编码
	 *
	 * @param value 值
	 */
	public final void setItemCode(String value) {
		this.setProperty(PROPERTY_ITEMCODE, value);
	}

	/**
	 * 属性名称-仓库
	 */
	private static final String PROPERTY_WAREHOUSE_NAME = "Warehouse";

	/**
	 * 仓库 属性
	 */
	@DbField(name = "WhsCode", type = DbFieldType.ALPHANUMERIC)
	public static final IPropertyInfo<String> PROPERTY_WAREHOUSE = registerProperty(PROPERTY_WAREHOUSE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-仓库
	 *
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_WAREHOUSE_NAME)
	public final String getWarehouse() {
		return this.getProperty(PROPERTY_WAREHOUSE);
	}

	/**
	 * 设置-仓库
	 *
	 * @param value 值
	 */
	public final void setWarehouse(String value) {
		this.setProperty(PROPERTY_WAREHOUSE, value);
	}

	/**
	 * 属性名称-批次编码
	 */
	private static final String PROPERTY_BATCHCODE_NAME = "BatchCode";

	/**
	 * 批次编码 属性
	 */
	@DbField(name = "BatchCode", type = DbFieldType.ALPHANUMERIC)
	public static final IPropertyInfo<String> PROPERTY_BATCHCODE = registerProperty(PROPERTY_BATCHCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-批次编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_BATCHCODE_NAME)
	public final String getBatchCode() {
		return this.getProperty(PROPERTY_BATCHCODE);
	}

	/**
	 * 设置-批次编码
	 * 
	 * @param value 值
	 */
	public final void setBatchCode(String value) {
		this.setProperty(PROPERTY_BATCHCODE, value);
	}

	/**
	 * 属性名称-序列编码
	 */
	private static final String PROPERTY_SERIALCODE_NAME = "SerialCode";

	/**
	 * 序列编码 属性
	 */
	@DbField(name = "SerialCode", type = DbFieldType.ALPHANUMERIC)
	public static final IPropertyInfo<String> PROPERTY_SERIALCODE = registerProperty(PROPERTY_SERIALCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-序列编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SERIALCODE_NAME)
	public final String getSerialCode() {
		return this.getProperty(PROPERTY_SERIALCODE);
	}

	/**
	 * 设置-序列编码
	 * 
	 * @param value 值
	 */
	public final void setSerialCode(String value) {
		this.setProperty(PROPERTY_SERIALCODE, value);
	}

	/**
	 * 属性名称-项目集合
	 */
	private static final String PROPERTY_ITEMS_NAME = "Items";

	/**
	 * 库存收货-行的集合属性
	 * 
	 */
	public static final IPropertyInfo<IMaterialInventoryReservations> PROPERTY_ITEMS = registerProperty(
			PROPERTY_ITEMS_NAME, IMaterialInventoryReservations.class, MY_CLASS);

	/**
	 * 获取-项目集合
	 * 
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_ITEMS_NAME)
	@XmlElement(name = MaterialInventoryReservation.BUSINESS_OBJECT_NAME, type = MaterialInventoryReservation.class)
	public final IMaterialInventoryReservations getItems() {
		return this.getProperty(PROPERTY_ITEMS);
	}

	/**
	 * 设置-项目集合
	 * 
	 * @param value 值
	 */
	public final void setItems(IMaterialInventoryReservations value) {
		this.setProperty(PROPERTY_ITEMS, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setItems(new MaterialInventoryReservations(this));
	}

	@Override
	public Iterator<IBusinessObject> iterator() {
		ArrayList<IBusinessObject> list = new ArrayList<>();
		list.addAll(this.getItems());
		return list.iterator();
	}
}
