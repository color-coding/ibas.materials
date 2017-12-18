package org.colorcoding.ibas.materials.repository;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.IChildCriteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.materials.bo.goodsissue.GoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsissue.IGoodsIssue;
import org.colorcoding.ibas.materials.bo.goodsreceipt.GoodsReceipt;
import org.colorcoding.ibas.materials.bo.goodsreceipt.IGoodsReceipt;
import org.colorcoding.ibas.materials.bo.inventorytransfer.IInventoryTransfer;
import org.colorcoding.ibas.materials.bo.inventorytransfer.InventoryTransfer;
import org.colorcoding.ibas.materials.bo.material.IMaterial;
import org.colorcoding.ibas.materials.bo.material.IMaterialQuantity;
import org.colorcoding.ibas.materials.bo.material.IProduct;
import org.colorcoding.ibas.materials.bo.material.Material;
import org.colorcoding.ibas.materials.bo.material.MaterialPrice;
import org.colorcoding.ibas.materials.bo.material.MaterialQuantity;
import org.colorcoding.ibas.materials.bo.material.Product;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.IMaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatch;
import org.colorcoding.ibas.materials.bo.materialbatch.MaterialBatchJournal;
import org.colorcoding.ibas.materials.bo.materialgroup.IMaterialGroup;
import org.colorcoding.ibas.materials.bo.materialgroup.MaterialGroup;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.IMaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventory;
import org.colorcoding.ibas.materials.bo.materialinventory.MaterialInventoryJournal;
import org.colorcoding.ibas.materials.bo.materialpricelist.IMaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceItem;
import org.colorcoding.ibas.materials.bo.materialpricelist.MaterialPriceList;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.IMaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerial;
import org.colorcoding.ibas.materials.bo.materialserial.MaterialSerialJournal;
import org.colorcoding.ibas.materials.bo.warehouse.IWarehouse;
import org.colorcoding.ibas.materials.bo.warehouse.Warehouse;

/**
 * Materials�ֿ�
 */
public class BORepositoryMaterials extends BORepositoryServiceApplication
        implements IBORepositoryMaterialsSvc, IBORepositoryMaterialsApp {

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-��淢��
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    public OperationResult<GoodsIssue> fetchGoodsIssue(ICriteria criteria, String token) {
        return super.fetch(criteria, token, GoodsIssue.class);
    }

    /**
     * ��ѯ-��淢������ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    public IOperationResult<IGoodsIssue> fetchGoodsIssue(ICriteria criteria) {
        return new OperationResult<IGoodsIssue>(this.fetchGoodsIssue(criteria, this.getUserToken()));
    }

    /**
     * ����-��淢��
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    public OperationResult<GoodsIssue> saveGoodsIssue(GoodsIssue bo, String token) {
        return super.save(bo, token);
    }

    /**
     * ����-��淢������ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    public IOperationResult<IGoodsIssue> saveGoodsIssue(IGoodsIssue bo) {
        return new OperationResult<IGoodsIssue>(this.saveGoodsIssue((GoodsIssue) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-����ջ�
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    public OperationResult<GoodsReceipt> fetchGoodsReceipt(ICriteria criteria, String token) {
        return super.fetch(criteria, token, GoodsReceipt.class);
    }

    /**
     * ��ѯ-����ջ�����ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    public IOperationResult<IGoodsReceipt> fetchGoodsReceipt(ICriteria criteria) {
        return new OperationResult<IGoodsReceipt>(this.fetchGoodsReceipt(criteria, this.getUserToken()));
    }

    /**
     * ����-����ջ�
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    public OperationResult<GoodsReceipt> saveGoodsReceipt(GoodsReceipt bo, String token) {
        return super.save(bo, token);
    }

    /**
     * ����-����ջ�����ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    public IOperationResult<IGoodsReceipt> saveGoodsReceipt(IGoodsReceipt bo) {
        return new OperationResult<IGoodsReceipt>(this.saveGoodsReceipt((GoodsReceipt) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-���ת��
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    public OperationResult<InventoryTransfer> fetchInventoryTransfer(ICriteria criteria, String token) {
        return super.fetch(criteria, token, InventoryTransfer.class);
    }

    /**
     * ��ѯ-���ת������ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    public IOperationResult<IInventoryTransfer> fetchInventoryTransfer(ICriteria criteria) {
        return new OperationResult<IInventoryTransfer>(this.fetchInventoryTransfer(criteria, this.getUserToken()));
    }

    /**
     * ����-���ת��
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    public OperationResult<InventoryTransfer> saveInventoryTransfer(InventoryTransfer bo, String token) {
        return super.save(bo, token);
    }

    /**
     * ����-���ת������ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    public IOperationResult<IInventoryTransfer> saveInventoryTransfer(IInventoryTransfer bo) {
        return new OperationResult<IInventoryTransfer>(
                this.saveInventoryTransfer((InventoryTransfer) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-����
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    public OperationResult<Material> fetchMaterial(ICriteria criteria, String token) {
        return super.fetch(criteria, token, Material.class);
    }

    /**
     * ��ѯ-���ϣ���ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    public IOperationResult<IMaterial> fetchMaterial(ICriteria criteria) {
        return new OperationResult<IMaterial>(this.fetchMaterial(criteria, this.getUserToken()));
    }

    /**
     * ����-����
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    public OperationResult<Material> saveMaterial(Material bo, String token) {
        return super.save(bo, token);
    }

    /**
     * ����-���ϣ���ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    public IOperationResult<IMaterial> saveMaterial(IMaterial bo) {
        return new OperationResult<IMaterial>(this.saveMaterial((Material) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-������
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    public OperationResult<MaterialGroup> fetchMaterialGroup(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialGroup.class);
    }

    /**
     * ��ѯ-�����飨��ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    public IOperationResult<IMaterialGroup> fetchMaterialGroup(ICriteria criteria) {
        return new OperationResult<IMaterialGroup>(this.fetchMaterialGroup(criteria, this.getUserToken()));
    }

    /**
     * ����-������
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    public OperationResult<MaterialGroup> saveMaterialGroup(MaterialGroup bo, String token) {
        return super.save(bo, token);
    }

    /**
     * ����-�����飨��ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    public IOperationResult<IMaterialGroup> saveMaterialGroup(IMaterialGroup bo) {
        return new OperationResult<IMaterialGroup>(this.saveMaterialGroup((MaterialGroup) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-���Ͽ��
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    public OperationResult<MaterialInventory> fetchMaterialInventory(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialInventory.class);
    }

    /**
     * ��ѯ-���Ͽ�棨��ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    public IOperationResult<IMaterialInventory> fetchMaterialInventory(ICriteria criteria) {
        return new OperationResult<IMaterialInventory>(this.fetchMaterialInventory(criteria, this.getUserToken()));
    }

    /**
     * ����-���Ͽ��
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    public OperationResult<MaterialInventory> saveMaterialInventory(MaterialInventory bo, String token) {
        return super.save(bo, token);
    }

    /**
     * ����-���Ͽ�棨��ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    public IOperationResult<IMaterialInventory> saveMaterialInventory(IMaterialInventory bo) {
        return new OperationResult<IMaterialInventory>(
                this.saveMaterialInventory((MaterialInventory) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-�ֿ��ռ���
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    public OperationResult<MaterialInventoryJournal> fetchMaterialInventoryJournal(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialInventoryJournal.class);
    }

    /**
     * ��ѯ-�ֿ��ռ��ˣ���ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    public IOperationResult<IMaterialInventoryJournal> fetchMaterialInventoryJournal(ICriteria criteria) {
        return new OperationResult<IMaterialInventoryJournal>(
                this.fetchMaterialInventoryJournal(criteria, this.getUserToken()));
    }

    /**
     * ����-�ֿ��ռ���
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    public OperationResult<MaterialInventoryJournal> saveMaterialInventoryJournal(MaterialInventoryJournal bo,
                                                                                  String token) {
        return super.save(bo, token);
    }

    /**
     * ����-�ֿ��ռ��ˣ���ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    public IOperationResult<IMaterialInventoryJournal> saveMaterialInventoryJournal(IMaterialInventoryJournal bo) {
        return new OperationResult<IMaterialInventoryJournal>(
                this.saveMaterialInventoryJournal((MaterialInventoryJournal) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-���ϼ۸��嵥
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    public OperationResult<MaterialPriceList> fetchMaterialPriceList(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialPriceList.class);
    }

    /**
     * ��ѯ-���ϼ۸��嵥����ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    public IOperationResult<IMaterialPriceList> fetchMaterialPriceList(ICriteria criteria) {
        return new OperationResult<IMaterialPriceList>(this.fetchMaterialPriceList(criteria, this.getUserToken()));
    }

    /**
     * ����-���ϼ۸��嵥
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    public OperationResult<MaterialPriceList> saveMaterialPriceList(MaterialPriceList bo, String token) {
        return super.save(bo, token);
    }

    /**
     * ����-���ϼ۸��嵥����ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    public IOperationResult<IMaterialPriceList> saveMaterialPriceList(IMaterialPriceList bo) {
        return new OperationResult<IMaterialPriceList>(
                this.saveMaterialPriceList((MaterialPriceList) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-��������
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    public OperationResult<MaterialBatch> fetchMaterialBatch(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialBatch.class);
    }

    /**
     * ��ѯ-�������Σ���ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    public IOperationResult<IMaterialBatch> fetchMaterialBatch(ICriteria criteria) {
        return new OperationResult<IMaterialBatch>(this.fetchMaterialBatch(criteria, this.getUserToken()));
    }

    /**
     * ����-��������
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    public OperationResult<MaterialBatch> saveMaterialBatch(MaterialBatch bo, String token) {
        return super.save(bo, token);
    }

    /**
     * ����-�������Σ���ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    public IOperationResult<IMaterialBatch> saveMaterialBatch(IMaterialBatch bo) {
        return new OperationResult<IMaterialBatch>(this.saveMaterialBatch((MaterialBatch) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-���������ռ���
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    @Override
    public OperationResult<MaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialBatchJournal.class);
    }

    /**
     * ��ѯ-���������ռ��ˣ���ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    @Override
    public IOperationResult<IMaterialBatchJournal> fetchMaterialBatchJournal(ICriteria criteria) {
        return new OperationResult<IMaterialBatchJournal>(
                this.fetchMaterialBatchJournal(criteria, this.getUserToken()));
    }

    /**
     * ����-���������ռ���
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    @Override
    public OperationResult<MaterialBatchJournal> saveMaterialBatchJournal(MaterialBatchJournal bo, String token) {
        return super.save(bo, token);
    }

    /**
     * ����-���������ռ��ˣ���ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    @Override
    public IOperationResult<IMaterialBatchJournal> saveMaterialBatchJournal(IMaterialBatchJournal bo) {
        return new OperationResult<IMaterialBatchJournal>(
                this.saveMaterialBatchJournal((MaterialBatchJournal) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-�������к�
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    @Override
    public OperationResult<MaterialSerial> fetchMaterialSerial(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialSerial.class);
    }

    /**
     * ��ѯ-�������кţ���ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    @Override
    public IOperationResult<IMaterialSerial> fetchMaterialSerial(ICriteria criteria) {
        return new OperationResult<IMaterialSerial>(this.fetchMaterialSerial(criteria, this.getUserToken()));
    }

    /**
     * ����-�������к�
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    @Override
    public OperationResult<MaterialSerial> saveMaterialSerial(MaterialSerial bo, String token) {
        return super.save(bo, token);
    }

    /**
     * ����-�������кţ���ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    @Override
    public IOperationResult<IMaterialSerial> saveMaterialSerial(IMaterialSerial bo) {
        return new OperationResult<IMaterialSerial>(this.saveMaterialSerial((MaterialSerial) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-�������к��ռ���
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    @Override
    public OperationResult<MaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria, String token) {
        return super.fetch(criteria, token, MaterialSerialJournal.class);
    }

    /**
     * ��ѯ-�������к��ռ��ˣ���ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    @Override
    public IOperationResult<IMaterialSerialJournal> fetchMaterialSerialJournal(ICriteria criteria) {
        return new OperationResult<IMaterialSerialJournal>(
                this.fetchMaterialSerialJournal(criteria, this.getUserToken()));
    }

    /**
     * ����-�������к��ռ���
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    @Override
    public OperationResult<MaterialSerialJournal> saveMaterialSerialJournal(MaterialSerialJournal bo, String token) {
        return super.save(bo, token);
    }

    /**
     * ����-�������к��ռ��ˣ���ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    @Override
    public IOperationResult<IMaterialSerialJournal> saveMaterialSerialJournal(IMaterialSerialJournal bo) {
        return new OperationResult<IMaterialSerialJournal>(
                this.saveMaterialSerialJournal((MaterialSerialJournal) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-�ֿ�
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return �������
     */
    @Override
    public OperationResult<Warehouse> fetchWarehouse(ICriteria criteria, String token) {
        return super.fetch(criteria, token, Warehouse.class);
    }

    /**
     * ��ѯ-�ֿ⣨��ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    @Override
    public IOperationResult<IWarehouse> fetchWarehouse(ICriteria criteria) {
        return new OperationResult<IWarehouse>(this.fetchWarehouse(criteria, this.getUserToken()));
    }

    /**
     * ����-�ֿ�
     *
     * @param bo    ����ʵ��
     * @param token ����
     * @return �������
     */
    @Override
    public OperationResult<Warehouse> saveWarehouse(Warehouse bo, String token) {
        return super.save(bo, token);
    }

    /**
     * ����-�ֿ⣨��ǰ�����û����
     *
     * @param bo ����ʵ��
     * @return �������
     */
    @Override
    public IOperationResult<IWarehouse> saveWarehouse(IWarehouse bo) {
        return new OperationResult<IWarehouse>(this.saveWarehouse((Warehouse) bo, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-��Ʒ��Ϣ
     *
     * @param criteria ����ʵ��
     * @param token    ����
     * @return �������
     */
    @Override
    public OperationResult<Product> fetchProduct(ICriteria criteria, String token) {
        try {
            //region  1����ѯ����
            // �Ӳ�ѯ���ҵ��۸��嵥
            ICondition conditionPriceList = criteria.getConditions()
                    .firstOrDefault(c -> c.getAlias().equalsIgnoreCase(Product.PRICELIST_NAME));
            // �Ӳ�ѯ���ҵ��ֿ�
            ArrayList<ICondition> conditionWarehouse = new ArrayList<>();
            criteria.getConditions().forEach(c -> {
                if (c.getAlias().equalsIgnoreCase(Product.WAREHOUSE_NAME)) {
                    conditionWarehouse.add(c);
                }
            });
            ArrayList<String> filterConditons = new ArrayList<>();
            filterConditons.add(Product.PRICELIST_NAME);
            filterConditons.add(Product.WAREHOUSE_NAME);
            // ���Ʒ��Ϣ
            OperationResult<Product> opRstProduct = super.fetch(this.splitCondition(criteria, filterConditons), token, Product.class);
            if (opRstProduct.getError() != null) {
                throw opRstProduct.getError();
            }
            // �Ƴ��۸��嵥��ѯ�Ͳֿ��ѯ
            criteria.getConditions().remove(conditionPriceList);
            //endregion
            //region 2�����вֿ����� ���ÿ���ѯ
            if (!conditionWarehouse.isEmpty()) {
                IOperationResult<MaterialQuantity> opRstMaterialQuantity = this.fetchMaterialQuantity(criteria);
                if (opRstMaterialQuantity.getError() != null) {
                    throw opRstMaterialQuantity.getError();
                }
                if (!opRstMaterialQuantity.getResultObjects().isEmpty()) {
                    for (Product item : opRstProduct.getResultObjects()) {
                        MaterialQuantity materialQuantity = opRstMaterialQuantity.getResultObjects().firstOrDefault(c -> c.getItemCode().equals(item.getCode()));
                        if (materialQuantity != null && materialQuantity.getOnHand() != null) {
                            item.setOnHand(materialQuantity.getOnHand());
                        }
                    }
                }
            }
            //endregion
            // region 3������Product ��ѯ�۸��嵥
            if (conditionPriceList != null) {
                int priceList = Integer.parseInt(conditionPriceList.getValue());
                for (Product item : opRstProduct.getResultObjects()) {
                    MaterialPrice materialPrice = this.fetchMaterialPrice(item.getCode(), priceList, null);
                    if (materialPrice != null && materialPrice.getPrice() != null) {
                        item.setPrice(materialPrice.getPrice());
                    }
                }
            }
            //endregion
            return opRstProduct;
        } catch (Exception e) {
            return new OperationResult<>(e);
        }
    }

    /**
     * �����ѯ���� ��������
     *
     * @param criteria   ��ѯ����
     * @param conditions ���˵�����
     * @return
     */
    private ICriteria splitCondition(ICriteria criteria, ArrayList<String> conditions) {
        ICriteria criteria1Material = new Criteria();
        criteria1Material = criteria.clone();
        for (int index = 0; index < criteria1Material.getConditions().size(); index++) {
            String aliensValue = criteria1Material.getConditions().get(index).getAlias();
            if (conditions.firstOrDefault(c -> c.equalsIgnoreCase(aliensValue)) != null) {
                int bracketOpenCount = criteria1Material.getConditions().get(index).getBracketOpen();
                int bracketCloseCount = criteria1Material.getConditions().get(index).getBracketClose();
                // ��������������Ų���ȲŴ�������������
                if (bracketCloseCount != bracketOpenCount) {
                    //region ȥ������˫����
                    if (bracketOpenCount != 0 && bracketCloseCount != 0) {
                        int bracketCount = Math.abs(bracketOpenCount - bracketCloseCount);
                        bracketOpenCount = bracketOpenCount - bracketCount;
                        bracketCloseCount = bracketCloseCount - bracketCount;
                        criteria1Material.getConditions().get(index).setBracketOpen(bracketOpenCount);
                        criteria1Material.getConditions().get(index).setBracketOpen(bracketCloseCount);
                    }
                    //endregion
                    //region ��������
                    if (bracketOpenCount != 0) {
                        if (index + 1 < criteria1Material.getConditions().size()) {
                            int nextBracketOpenCount = criteria1Material.getConditions().get(index + 1).getBracketOpen();
                            nextBracketOpenCount = nextBracketOpenCount + bracketOpenCount;
                            criteria1Material.getConditions().get(index + 1).setBracketOpen(nextBracketOpenCount);
                        }
                    }
                    //endregion
                    //region ���������
                    if (bracketCloseCount != 0) {
                        if (index - 1 >= 0) {
                            int preBracketCloseCount = criteria1Material.getConditions().get(index - 1).getBracketClose();
                            preBracketCloseCount = preBracketCloseCount + bracketCloseCount;
                            criteria1Material.getConditions().get(index - 1).setBracketClose(preBracketCloseCount);
                        }
                    }
                    //endregion
                }
                criteria1Material.getConditions().remove(index);
                index--;
            }
        }
        return criteria1Material;
    }

    /**
     * ��ѯ-��Ʒ��Ϣ����ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return ��Ʒ��Ϣ
     */
    @Override
    public IOperationResult<IProduct> fetchProduct(ICriteria criteria) {
        return new OperationResult<IProduct>(this.fetchProduct(criteria, this.getUserToken()));
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-���ϼ۸���ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    @Override
    public IOperationResult<MaterialPrice> fetchMaterialPrice(ICriteria criteria) {
        return this.fetchMaterialPrice(criteria, this.getUserToken());
    }

    /**
     * ��ѯ-���ϼ۸�
     *
     * @param criteria ��ѯ
     * @param token    ����
     * @return ���ϼ۸�
     */
    @Override
    public OperationResult<MaterialPrice> fetchMaterialPrice(ICriteria criteria, String token) {
        try {
            OperationResult<MaterialPrice> operationResult = new OperationResult<>();
            // �Ӳ�ѯ���ҵ��۸��嵥
            ICondition conditionPriceList = criteria.getConditions()
                    .firstOrDefault(c -> c.getAlias().equalsIgnoreCase(MaterialPriceList.PROPERTY_OBJECTKEY.getName()));
            if (conditionPriceList == null) {
                throw new Exception(I18N.prop("msg_mm_not_found_price_list"));
            }
            ArrayList<String> filterConditons = new ArrayList<>();
            filterConditons.add(MaterialPrice.PRICELIST_NAME);
            // ������
            IOperationResult<IMaterial> opRstMaterial = this.fetchMaterial(this.splitCondition(criteria, filterConditons));
            if (opRstMaterial.getError() != null) {
                throw opRstMaterial.getError();
            }
            // ѭ�����ϲ�۸�
            int priceList = Integer.parseInt(conditionPriceList.getValue());
            for (IMaterial item : opRstMaterial.getResultObjects()) {
                MaterialPrice materialPrice = this.fetchMaterialPrice(item.getCode(), priceList, null);
                if (materialPrice != null) {
                    if (materialPrice.getPrice() == null) {
                        materialPrice.setPrice(item.getAvgPrice());
                    }
                    operationResult.addResultObjects(materialPrice);
                }
            }
            return operationResult;
        } catch (Exception e) {
            return new OperationResult<>(e);
        }
    }

    /**
     * ��ѯ���϶�Ӧ�۸��嵥�ļ۸�
     *
     * @param itemCode  ����
     * @param priceList �۸��嵥
     * @param factory   �۸��嵥ϵ��
     * @return ���ϼ۸��嵥
     */

    private MaterialPrice fetchMaterialPrice(String itemCode, int priceList, Decimal factory) {
        try {
            ICriteria criteria = new Criteria();
            MaterialPrice materialPrice = new MaterialPrice();
            materialPrice.setItemCode(itemCode);
            // region �۸��嵥��ѯ����
            IChildCriteria childCriteria;
            ICondition condition;
            condition = criteria.getConditions().create();
            condition.setAlias(MaterialPriceList.PROPERTY_OBJECTKEY.getName());
            condition.setValue(priceList);
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setRelationship(ConditionRelationship.AND);
            childCriteria = criteria.getChildCriterias().create();
            childCriteria.setPropertyPath(MaterialPriceList.PROPERTY_MATERIALPRICEITEMS.getName());
            childCriteria.setOnlyHasChilds(false);
            condition = childCriteria.getConditions().create();
            condition.setAlias(MaterialPriceItem.PROPERTY_ITEMCODE.getName());
            condition.setOperation(ConditionOperation.EQUAL);
            condition.setValue(itemCode);
            // endregion
            // ��ѯ�۸��嵥
            IOperationResult<IMaterialPriceList> opRstPriceList = this.fetchMaterialPriceList(criteria);
            if (opRstPriceList.getError() != null) {
                throw opRstPriceList.getError();
            }
            // �۸��嵥��������
            if (opRstPriceList.getResultObjects().isEmpty()) {
                return materialPrice;
            }
            IMaterialPriceList materialPriceList = opRstPriceList.getResultObjects().firstOrDefault();
            // ���ӱ��м�¼
            if (materialPriceList != null && !materialPriceList.getMaterialPriceItems().isEmpty()) {
                // �۸��嵥���ҵ������ϣ�����۸�
                materialPrice.setCurrency(materialPriceList.getCurrency());
                if (factory == null) {
                    materialPrice.setPrice(materialPriceList.getMaterialPriceItems().firstOrDefault().getPrice());
                } else {
                    materialPrice.setPrice(materialPriceList.getMaterialPriceItems().firstOrDefault().getPrice().multiply(factory));
                }
                return materialPrice;
            } else if (materialPriceList != null) {
                // ֻ�������м�¼
                if (factory == null) {
                    factory = materialPriceList.getFactor();
                } else {
                    factory = materialPriceList.getFactor().multiply(factory);
                }
                return this.fetchMaterialPrice(itemCode, materialPriceList.getBasedOnList(), factory);
            } else {
                return materialPrice;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // --------------------------------------------------------------------------------------------//

    /**
     * ��ѯ-���Ͽ����������ǰ�����û����
     *
     * @param criteria ��ѯ
     * @return �������
     */
    @Override
    public IOperationResult<MaterialQuantity> fetchMaterialQuantity(ICriteria criteria) {
        return this.fetchMaterialQuantity(criteria, this.getUserToken());
    }


    /**
     * ��ѯ-���Ͽ������
     *
     * @param criteria ��ѯ Material����+MaterialQuantity����
     * @param token    ����
     * @return ���Ͽ������
     */
    @Override
    public OperationResult<MaterialQuantity> fetchMaterialQuantity(ICriteria criteria, String token) {
        try {
            OperationResult<MaterialQuantity> operationResult = new OperationResult<>();
            // �Ӳ�ѯ���ҵ����еĲֿ�
            ArrayList<ICondition> conditions = new ArrayList<>();
            for (ICondition item : criteria.getConditions()) {
                if (item.getAlias().equals(MaterialQuantity.WAREHOUSE_NAME)) {
                    conditions.add(item);
                }
            }
            ArrayList<String> filterConditons = new ArrayList<>();
            filterConditons.add(MaterialQuantity.WAREHOUSE_NAME);
            IOperationResult<IMaterial> opRstMaterial = this.fetchMaterial(this.splitCondition(criteria, filterConditons));
            if (opRstMaterial.getError() != null) {
                throw opRstMaterial.getError();
            }
            // ����ֿ�����Ϊ�գ��������Ͽ�棻�ֿ�������Ϊ�գ��Բֿ���Ϊ������ѯ���
            if (conditions.isEmpty()) {
                operationResult.addResultObjects(MaterialQuantity.create(opRstMaterial.getResultObjects(), true));
            } else {
                // ȥ���ֿ�֮���������� ��ѯ���
                criteria.getConditions().clear();
                conditions.forEach(c -> criteria.getConditions().add(c));
                IOperationResult<IMaterialInventory> opRstInventry = this.fetchMaterialInventory(criteria);
                if (opRstInventry.getError() != null) {
                    throw opRstInventry.getError();
                }
                // �������Ͽ�漯�ϣ�����ʼֵΪ0
                ArrayList<IMaterialQuantity> materialQuantities = MaterialQuantity.create(opRstMaterial.getResultObjects(), false);
                for (IMaterialInventory item : opRstInventry.getResultObjects()) {
                    IMaterialQuantity materialQuantity = materialQuantities.firstOrDefault(c -> c.getItemCode().equals(item.getItemCode()));
                    if (materialQuantity != null) {
                        // �������Ͽ�漯�������ϵĿ��
                        Decimal onHand = materialQuantity.getOnHand();
                        onHand = onHand.add(item.getOnHand());
                        materialQuantity.setOnHand(onHand);
                    }
                }
                operationResult.addResultObjects(materialQuantities);
            }
            return operationResult;
        } catch (Exception e) {
            return new OperationResult<>(e);
        }
    }
}