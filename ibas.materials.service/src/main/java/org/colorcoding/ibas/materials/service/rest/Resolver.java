package org.colorcoding.ibas.materials.service.rest;

import javax.ws.rs.Produces;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;

import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.bobas.common.*;
import org.colorcoding.ibas.materials.bo.goodsissue.*;
import org.colorcoding.ibas.materials.bo.goodsreceipt.*;
import org.colorcoding.ibas.materials.bo.inventorytransfer.*;
import org.colorcoding.ibas.materials.bo.material.*;
import org.colorcoding.ibas.materials.bo.materialgroup.*;
import org.colorcoding.ibas.materials.bo.materialinventory.*;
import org.colorcoding.ibas.materials.bo.materialjournal.*;
import org.colorcoding.ibas.materials.bo.warehouse.*;

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
                jaxbContext = JAXBContext.newInstance(Criteria.class, OperationResult.class
                    , UserFieldProxy.class
                    , GoodsIssue.class
                    , GoodsReceipt.class
                    , InventoryTransfer.class
                    , Material.class
                    , MaterialGroup.class
                    , MaterialInventory.class
                    , MaterialJournal.class
                    , Warehouse.class
                );
            }
        } catch (JAXBException e) {
            e.printStackTrace();
        }
        return jaxbContext;
    }

}
