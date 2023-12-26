package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.data.emBOStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.IBusinessObjectGroup;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchItem;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryReservations;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialOrderedReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialOrderedReservations;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryReservations;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialOrderedReservation;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialOrderedReservations;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialItem;
import org.colorcoding.ibas.materials.data.DataConvert;
import org.colorcoding.ibas.materials.data.emItemType;
import org.colorcoding.ibas.materials.repository.BORepositoryMaterials;

@LogicContract(IMaterialInventoryReservationCreateContract.class)
public class MaterialInventoryReservationCreateService extends
		MaterialInventoryBusinessLogic<IMaterialInventoryReservationCreateContract, IMaterialInventoryReservationGroup> {

	private static final IMaterialInventoryReservationGroup EMPTY_DATA = new MaterialInventoryReservationGroup();

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof IMaterialInventoryReservationCreateContract) {
			IMaterialInventoryReservationCreateContract contract = (IMaterialInventoryReservationCreateContract) data;
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
			if (contract.getQuantity().compareTo(Decimal.ZERO) <= 0) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(), "Quantity",
						contract.getQuantity());
				return false;
			}
			if (DataConvert.isNullOrEmpty(contract.getSourceDocumentType())) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"SourceDocumentType", "EMPTY");
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected IMaterialInventoryReservationGroup fetchBeAffected(IMaterialInventoryReservationCreateContract contract) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(MaterialInventoryReservation.PROPERTY_CAUSES.getName());
		condition.setOperation(ConditionOperation.EQUAL);
		condition.setValue(String.format("FROM:%s-%s-%s", contract.getSourceDocumentType(),
				contract.getSourceDocumentEntry(), contract.getSourceDocumentLineId()));
		IMaterial material = this.checkMaterial(contract.getItemCode());
		if (material.getBatchManagement() == emYesNo.YES) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryReservation.PROPERTY_BATCHCODE.getName());
			condition.setValue(contract.getBatchCode());
			if (!(this.getHost() instanceof IMaterialBatchItem)) {
				// 批次管理，宿主为序列记录则不执行
				return EMPTY_DATA;
			}
		}
		if (material.getSerialManagement() == emYesNo.YES) {
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialInventoryReservation.PROPERTY_SERIALCODE.getName());
			condition.setValue(contract.getSerialCode());
			if (!(this.getHost() instanceof IMaterialSerialItem)) {
				// 序列管理，宿主为批次记录则不执行
				return EMPTY_DATA;
			}
		}
		IMaterialInventoryReservationGroup reservationGroup = this.fetchBeAffected(criteria,
				IMaterialInventoryReservationGroup.class);
		if (reservationGroup == null) {
			BORepositoryMaterials boRepository = new BORepositoryMaterials();
			boRepository.setRepository(super.getRepository());
			IOperationResult<IMaterialInventoryReservation> opRsltInventory = boRepository
					.fetchMaterialInventoryReservation(criteria);
			if (opRsltInventory.getError() != null) {
				throw new BusinessLogicException(opRsltInventory.getError());
			}
			IMaterialInventoryReservation reservation;
			reservationGroup = new MaterialInventoryReservationGroup();
			reservationGroup.setCauses(String.format("FROM:%s-%s-%s", contract.getSourceDocumentType(),
					contract.getSourceDocumentEntry(), contract.getSourceDocumentLineId()));
			reservationGroup.setBatchCode(contract.getBatchCode());
			reservationGroup.setSerialCode(contract.getSerialCode());
			for (IMaterialInventoryReservation item : opRsltInventory.getResultObjects()) {
				// 判断内存中是否已有
				reservation = this.fetchBeAffected(item.getCriteria(), IMaterialInventoryReservation.class);
				if (reservation == null) {
					// 使用数据库的
					reservationGroup.getItems().add(item);
				} else {
					// 使用内存的
					reservationGroup.getItems().add(reservation);
				}
			}
			// 加载相关的原因数据
			criteria = new Criteria();
			condition = criteria.getConditions().create();
			condition.setAlias(MaterialOrderedReservation.PROPERTY_SOURCEDOCUMENTTYPE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(contract.getSourceDocumentType());
			condition = criteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.AND);
			condition.setAlias(MaterialOrderedReservation.PROPERTY_SOURCEDOCUMENTENTRY.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(contract.getSourceDocumentEntry());
			condition = criteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.AND);
			condition.setAlias(MaterialOrderedReservation.PROPERTY_SOURCEDOCUMENTLINEID.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(contract.getSourceDocumentLineId());
			IOperationResult<IMaterialOrderedReservation> opRsltOrdered = boRepository
					.fetchMaterialOrderedReservation(criteria);
			if (opRsltOrdered.getError() != null) {
				throw new BusinessLogicException(opRsltOrdered.getError());
			}
			IMaterialOrderedReservation orderReservation;
			for (IMaterialOrderedReservation item : opRsltOrdered.getResultObjects()) {
				// 判断内存中是否已有
				orderReservation = this.fetchBeAffected(item.getCriteria(), IMaterialOrderedReservation.class);
				if (orderReservation == null) {
					// 使用数据库的
					reservationGroup.getCausalDatas().add(item);
				} else {
					// 使用内存的
					reservationGroup.getCausalDatas().add(orderReservation);
				}
			}
		}
		return reservationGroup;

	}

	@Override
	protected void impact(IMaterialInventoryReservationCreateContract contract) {
		IMaterialInventoryReservationGroup reservationGroup = this.getBeAffected();
		if (reservationGroup == EMPTY_DATA) {
			// 空数据不做处理
			return;
		}
		BigDecimal remQuantity;
		BigDecimal avaQuantity = contract.getQuantity();
		IMaterialInventoryReservation gItem;
		String causes = String.format("FROM:%s-%s-%s", contract.getSourceDocumentType(),
				contract.getSourceDocumentEntry(), contract.getSourceDocumentLineId());
		for (IMaterialOrderedReservation item : reservationGroup.getCausalDatas()) {
			if (item.getTargetDocumentType() == null) {
				continue;
			}
			remQuantity = item.getQuantity().subtract(item.getClosedQuantity());
			if (remQuantity.compareTo(Decimal.ZERO) <= 0) {
				continue;
			}
			gItem = reservationGroup.getItems()
					.firstOrDefault(c -> causes.equals(c.getCauses())
							&& c.getTargetDocumentType().equals(item.getTargetDocumentType())
							&& c.getTargetDocumentEntry().compareTo(item.getTargetDocumentEntry()) == 0
							&& c.getTargetDocumentLineId().compareTo(item.getTargetDocumentLineId()) == 0
							&& ((!DataConvert.isNullOrEmpty(contract.getBatchCode())
									&& contract.getBatchCode().equals(c.getBatchCode()))
									|| DataConvert.isNullOrEmpty(contract.getBatchCode()))
							&& ((!DataConvert.isNullOrEmpty(contract.getSerialCode())
									&& contract.getSerialCode().equals(c.getSerialCode()))
									|| DataConvert.isNullOrEmpty(contract.getSerialCode()))
							&& ((!DataConvert.isNullOrEmpty(contract.getWarehouse())
									&& contract.getWarehouse().equals(c.getWarehouse()))
									|| DataConvert.isNullOrEmpty(contract.getWarehouse()))

					);
			if (gItem == null) {
				gItem = new MaterialInventoryReservation();
				gItem.setCauses(causes);
				gItem.setTargetDocumentType(item.getTargetDocumentType());
				gItem.setTargetDocumentEntry(item.getTargetDocumentEntry());
				gItem.setTargetDocumentLineId(item.getTargetDocumentLineId());
				gItem.setBatchCode(contract.getBatchCode());
				gItem.setSerialCode(contract.getSerialCode());
				gItem.setWarehouse(contract.getWarehouse());
				gItem.setQuantity(Decimal.ZERO);
				reservationGroup.getItems().add(gItem);
			} else {
				if (gItem.isDeleted()) {
					gItem.undelete();
				}
			}
			gItem.setItemCode(contract.getItemCode());
			gItem.setRemarks(item.getRemarks());
			if (remQuantity.compareTo(avaQuantity) >= 0) {
				gItem.setQuantity(gItem.getQuantity().add(avaQuantity));
				item.setClosedQuantity(item.getClosedQuantity().add(avaQuantity));
				avaQuantity = Decimal.ZERO;
			} else {
				gItem.setQuantity(gItem.getQuantity().add(remQuantity));
				item.setClosedQuantity(item.getClosedQuantity().add(remQuantity));
				avaQuantity = avaQuantity.subtract(remQuantity);
			}
			if (this.checkWarehouse(contract.getWarehouse()).getReservable() == emYesNo.NO) {
				// 非预留仓库
				gItem.setRemarks(String.format("%s;%s", gItem.getRemarks(),
						I18N.prop("msg_mm_non_reserved_warehouse_releases_reservation")));
				gItem.setStatus(emBOStatus.CLOSED);
			}
			if (avaQuantity.compareTo(Decimal.ZERO) <= 0) {
				// 无可用量
				break;
			}
		}
	}

	@Override
	protected void revoke(IMaterialInventoryReservationCreateContract contract) {
		IMaterialInventoryReservationGroup reservationGroup = this.getBeAffected();
		if (reservationGroup == EMPTY_DATA) {
			// 空数据不做处理
			return;
		}
		IMaterialInventoryReservation item;
		BigDecimal remQuantity, avaQuantity = contract.getQuantity();
		for (int i = reservationGroup.getItems().size() - 1; i >= 0; i--) {
			item = reservationGroup.getItems().get(i);
			if (!DataConvert.isNullOrEmpty(contract.getBatchCode())
					&& !contract.getBatchCode().equals(item.getBatchCode())) {
				continue;
			}
			if (!DataConvert.isNullOrEmpty(contract.getSerialCode())
					&& !contract.getSerialCode().equals(item.getSerialCode())) {
				continue;
			}
			if (!DataConvert.isNullOrEmpty(contract.getWarehouse())
					&& !contract.getWarehouse().equals(item.getWarehouse())) {
				continue;
			}
			if (item.getQuantity().compareTo(avaQuantity) >= 0) {
				remQuantity = Decimal.ZERO.add(avaQuantity);
				item.setQuantity(item.getQuantity().subtract(avaQuantity));
				avaQuantity = Decimal.ZERO;
			} else {
				remQuantity = Decimal.ZERO.add(item.getQuantity());
				avaQuantity = avaQuantity.subtract(item.getQuantity());
				item.setQuantity(Decimal.ZERO);
			}
			for (IMaterialOrderedReservation oItem : reservationGroup.getCausalDatas()) {
				if (!String.format("FROM:%s-%s-%s", oItem.getSourceDocumentType(), oItem.getSourceDocumentEntry(),
						oItem.getSourceDocumentLineId()).equals(item.getCauses())) {
					continue;
				}
				if (!oItem.getTargetDocumentType().equals(item.getTargetDocumentType())) {
					continue;
				}
				if (oItem.getTargetDocumentEntry().compareTo(item.getTargetDocumentEntry()) != 0) {
					continue;
				}
				if (oItem.getTargetDocumentLineId().compareTo(item.getTargetDocumentLineId()) != 0) {
					continue;
				}
				if (oItem.getClosedQuantity().compareTo(Decimal.ZERO) <= 0) {
					continue;
				}
				if (oItem.getClosedQuantity().compareTo(remQuantity) >= 0) {
					oItem.setClosedQuantity(oItem.getClosedQuantity().subtract(remQuantity));
					remQuantity = Decimal.ZERO;
				} else {
					remQuantity = remQuantity.subtract(oItem.getClosedQuantity());
					oItem.setClosedQuantity(Decimal.ZERO);
				}
				if (remQuantity.compareTo(Decimal.ZERO) <= 0) {
					break;
				}
			}
			if (item.getQuantity().compareTo(Decimal.ZERO) <= 0
					&& item.getClosedQuantity().compareTo(Decimal.ZERO) <= 0) {
				item.delete();
			}
			if (avaQuantity.compareTo(Decimal.ZERO) <= 0) {
				break;
			}
		}
	}

}

interface IMaterialInventoryReservationGroup extends IBusinessObject {

	/**
	 * 获取-原因
	 * 
	 * @return 值
	 */
	String getCauses();

	/**
	 * 设置-原因
	 * 
	 * @param value 值
	 */
	void setCauses(String value);

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

	/**
	 * 获取-原因数据集合
	 * 
	 * @return 值
	 */
	IMaterialOrderedReservations getCausalDatas();

	/**
	 * 设置-原因数据集合
	 * 
	 * @param value 值
	 */
	void setCausalDatas(IMaterialOrderedReservations value);
}

class MaterialInventoryReservationGroup extends BusinessObject<IMaterialInventoryReservationGroup>
		implements IMaterialInventoryReservationGroup, IBusinessObjectGroup {

	private static final long serialVersionUID = -1505933970685831778L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = MaterialInventoryReservationGroup.class;

	public MaterialInventoryReservationGroup() {
		this.setSavable(false);
	}

	/**
	 * 属性名称-原因
	 */
	private static final String PROPERTY_CAUSES_NAME = "Causes";

	/**
	 * 原因 属性
	 */
	@DbField(name = "Causes", type = DbFieldType.ALPHANUMERIC)
	public static final IPropertyInfo<String> PROPERTY_CAUSES = registerProperty(PROPERTY_CAUSES_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-原因
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CAUSES_NAME)
	public final String getCauses() {
		return this.getProperty(PROPERTY_CAUSES);
	}

	/**
	 * 设置-原因
	 * 
	 * @param value 值
	 */
	public final void setCauses(String value) {
		this.setProperty(PROPERTY_CAUSES, value);
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
	 * 属性名称-项目集合
	 */
	private static final String PROPERTY_CAUSALDATAS_NAME = "CausalDatas";

	/**
	 * 库存收货-行的集合属性
	 * 
	 */
	public static final IPropertyInfo<IMaterialOrderedReservations> PROPERTY_CAUSALDATAS = registerProperty(
			PROPERTY_CAUSALDATAS_NAME, IMaterialOrderedReservations.class, MY_CLASS);

	/**
	 * 获取-项目集合
	 * 
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_CAUSALDATAS_NAME)
	@XmlElement(name = MaterialOrderedReservation.BUSINESS_OBJECT_NAME, type = MaterialOrderedReservation.class)
	public final IMaterialOrderedReservations getCausalDatas() {
		return this.getProperty(PROPERTY_CAUSALDATAS);
	}

	/**
	 * 设置-项目集合
	 * 
	 * @param value 值
	 */
	public final void setCausalDatas(IMaterialOrderedReservations value) {
		this.setProperty(PROPERTY_CAUSALDATAS, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setItems(new MaterialInventoryReservations(this));
		this.setCausalDatas(new MaterialOrderedReservations(this));
	}

	@Override
	public Iterator<IBusinessObject> iterator() {
		ArrayList<IBusinessObject> list = new ArrayList<>();
		list.addAll(this.getItems());
		list.addAll(this.getCausalDatas());
		return list.iterator();
	}
}