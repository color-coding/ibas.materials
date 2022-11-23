package org.colorcoding.ibas.materials.service.rest;

import javax.ws.rs.Produces;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;

import org.colorcoding.ibas.bobas.bo.UserFieldProxy;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.material.MaterialGroup;
import org.colorcoding.ibas.materials.bo.material.MaterialPrice;
import org.colorcoding.ibas.materials.bo.material.MaterialQuantity;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialspecification.MaterialSpecification;
import org.colorcoding.ibas.materials.bo.specification.Specification;
import org.colorcoding.ibas.materials.bo.unit.Unit;
import org.colorcoding.ibas.materials.bo.unit.UnitRate;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;

/**
 * 序列化解释器
 */
@Provider
@Produces({ "application/json" })
public class Resolver implements ContextResolver<JAXBContext> {

	private static JAXBContext jaxbContext = null;

	public JAXBContext getContext(Class<?> type) {
		try {
			if (jaxbContext == null) {
				jaxbContext = JAXBContext.newInstance(Criteria.class, OperationResult.class, UserFieldProxy.class,
						GoodsIssue.class, GoodsReceipt.class, InventoryTransfer.class, Material.class,
						MaterialBatch.class, MaterialBatchJournal.class, MaterialGroup.class, MaterialInventory.class,
						MaterialInventoryJournal.class, MaterialPriceList.class, MaterialSerial.class,
						MaterialSerialJournal.class, Warehouse.class, MaterialQuantity.class, MaterialPrice.class,
						MaterialSpecification.class, Specification.class, Unit.class, UnitRate.class);
			}
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		return jaxbContext;
	}

}
