/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import {
    IMaterialReceiptSerialLine,
    IMaterialBatchJournal,
    IMaterialSerialJournal,
    IMaterialReceiptBatchs,
    IMaterialReceiptSerials,
    IMaterialReceiptSerialContractLine,
    IMaterialReceiptBatchLine,
    IMaterialReceiptBatchContract,
    IMaterialReceiptBatchContractLine,
    IMaterialIssueBatchJournals,
    IMaterialReceiptSerialContract,
} from "../../api/bo/index";
import {
    MaterialBatchReceiptServiceProxy,
    MaterialSerialReceiptServiceProxy,
} from "../../api/Datas";
import { BORepositoryMaterials } from "../../borep/BORepositories";

/** 编辑应用-库存收货 */
export class GoodsReceiptEditApp extends ibas.BOEditApplication<IGoodsReceiptEditView, bo.GoodsReceipt> {

    /** 应用标识 */
    static APPLICATION_ID: string = "86721b86-fcbc-4adf-9e1e-c308373fb7cc";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_goodsreceipt_edit";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.GoodsReceipt.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = GoodsReceiptEditApp.APPLICATION_ID;
        this.name = GoodsReceiptEditApp.APPLICATION_NAME;
        this.boCode = GoodsReceiptEditApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.deleteDataEvent = this.deleteData;
        this.view.createDataEvent = this.createData;
        this.view.addGoodsReceiptLineEvent = this.addGoodsReceiptLine;
        this.view.removeGoodsReceiptLineEvent = this.removeGoodsReceiptLine;
        this.view.chooseGoodsReceiptLineMaterialEvent = this.chooseGoodsReceiptLineMaterial;
        this.view.chooseGoodsreceiptlineWarehouseEvent = this.chooseGoodsreceiptlineWarehouse;
        this.view.createGoodsReceiptLineMaterialBatchEvent = this.createGoodsReceiptLineMaterialBatch;
        this.view.createGoodsReceiptLineMaterialSerialEvent = this.createGoodsReceiptLineMaterialSerial;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        if (ibas.objects.isNull(this.editData)) {
            // 创建编辑对象实例
            this.editData = new bo.GoodsReceipt();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
        }
        this.view.showGoodsReceipt(this.editData);
        this.view.showGoodsReceiptLines(this.editData.goodsReceiptLines.filterDeleted());
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        that.searchPriceList();
        if (ibas.objects.instanceOf(arguments[0], bo.GoodsReceipt)) {
            // 尝试重新查询编辑对象
            let criteria: ibas.ICriteria = arguments[0].criteria();
            if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                // 有效的查询对象查询
                let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
                boRepository.fetchGoodsReceipt({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.GoodsReceipt>): void {
                        let data: bo.GoodsReceipt;
                        if (opRslt.resultCode === 0) {
                            data = opRslt.resultObjects.firstOrDefault();
                        }
                        if (ibas.objects.instanceOf(data, bo.GoodsReceipt)) {
                            // 查询到了有效数据
                            that.editData = data;
                            that.show();
                        } else {
                            // 数据重新检索无效
                            that.messages({
                                type: ibas.emMessageType.WARNING,
                                message: ibas.i18n.prop("shell_data_deleted_and_created"),
                                onCompleted(): void {
                                    that.show();
                                }
                            });
                        }
                    }
                });
                // 开始查询数据
                return;
            }
        }
        super.run.apply(this, args);
    }
    /** 待编辑的数据 */
    protected editData: bo.GoodsReceipt;
    /** 保存数据 */
    protected saveData(): void {
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.saveGoodsReceipt({
            beSaved: this.editData,
            onCompleted(opRslt: ibas.IOperationResult<bo.GoodsReceipt>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 0) {
                        // 删除成功，释放当前对象
                        that.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                        that.editData = undefined;
                    } else {
                        // 替换编辑对象
                        that.editData = opRslt.resultObjects.firstOrDefault();
                        that.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                    }
                    // 刷新当前视图
                    that.viewShowed();
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
    }
    /** 删除数据 */
    protected deleteData(): void {
        let that: this = this;
        this.messages({
            type: ibas.emMessageType.QUESTION,
            title: ibas.i18n.prop(this.name),
            message: ibas.i18n.prop("sys_whether_to_delete"),
            actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
            onCompleted(action: ibas.emMessageAction): void {
                if (action === ibas.emMessageAction.YES) {
                    that.editData.delete();
                    that.saveData();
                }
            }
        });
    }
    /** 新建数据，参数1：是否克隆 */
    protected createData(clone: boolean): void {
        let that: this = this;
        let createData: Function = function (): void {
            if (clone) {
                // 克隆对象
                that.editData = that.editData.clone();
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_cloned_new"));
                that.viewShowed();
            } else {
                // 新建对象
                that.editData = new bo.GoodsReceipt();
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                that.viewShowed();
            }
        };
        if (that.editData.isDirty) {
            this.messages({
                type: ibas.emMessageType.QUESTION,
                title: ibas.i18n.prop(this.name),
                message: ibas.i18n.prop("sys_data_not_saved_whether_to_continue"),
                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                onCompleted(action: ibas.emMessageAction): void {
                    if (action === ibas.emMessageAction.YES) {
                        createData();
                    }
                }
            });
        } else {
            createData();
        }
    }
    /** 添加库存收货-行事件 */
    addGoodsReceiptLine(): void {
        this.editData.goodsReceiptLines.create();
        // 仅显示没有标记删除的
        this.view.showGoodsReceiptLines(this.editData.goodsReceiptLines.filterDeleted());
    }
    /** 删除库存收货-行事件 */
    removeGoodsReceiptLine(items: bo.GoodsReceiptLine[]): void {
        // 非数组，转为数组
        if (!(items instanceof Array)) {
            items = [items];
        }
        if (items.length === 0) {
            return;
        }
        // 移除项目
        for (let item of items) {
            if (this.editData.goodsReceiptLines.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    this.editData.goodsReceiptLines.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showGoodsReceiptLines(this.editData.goodsReceiptLines.filterDeleted());
    }

    /** 选择库存收货订单行物料事件 */
    chooseGoodsReceiptLineMaterial(caller: bo.GoodsReceiptLine): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.Product>({
            caller: caller,
            boCode: bo.Product.BUSINESS_OBJECT_CODE,
            criteria: that.getConditions(),
            onCompleted(selecteds: ibas.List<bo.Product>): void {
                // 获取触发的对象
                let index: number = that.editData.goodsReceiptLines.indexOf(caller);
                let item: bo.GoodsReceiptLine = that.editData.goodsReceiptLines[index];
                // 选择返回数量多余触发数量时,自动创建新的项目
                let created: boolean = false;
                for (let selected of selecteds) {
                    if (ibas.objects.isNull(item)) {
                        item = that.editData.goodsReceiptLines.create();
                        created = true;
                    }
                    // 如果物料或仓库发生更改，删除批次、序列集合
                    if (item.itemCode !== selected.code) {
                        item.goodsReceiptMaterialBatchJournals.clear();
                        item.goodsReceiptMaterialSerialJournals.clear();
                    }
                    item.itemCode = selected.code;
                    item.itemDescription = selected.name;
                    item.serialManagement = selected.serialManagement;
                    item.batchManagement = selected.batchManagement;
                    item.price = selected.price;
                    item.quantity = 1;
                    item = null;
                }
                if (created) {
                    // 创建了新的行项目
                    that.view.showGoodsReceiptLines(that.editData.goodsReceiptLines.filterDeleted());
                }
            }
        });
    }

    /** 选择库存收货订单行物料事件 */
    chooseGoodsreceiptlineWarehouse(caller: bo.GoodsReceiptLine): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.Warehouse>({
            caller: caller,
            boCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
            criteria: [
                new ibas.Condition(bo.Warehouse.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, "Y")
            ],
            onCompleted(selecteds: ibas.List<bo.Warehouse>): void {
                // 获取触发的对象
                let index: number = that.editData.goodsReceiptLines.indexOf(caller);
                let item: bo.GoodsReceiptLine = that.editData.goodsReceiptLines[index];
                // 选择返回数量多余触发数量时,自动创建新的项目
                let created: boolean = false;
                for (let selected of selecteds) {
                    if (ibas.objects.isNull(item)) {
                        item = that.editData.goodsReceiptLines.create();
                        created = true;
                    }
                    if (item.warehouse !== selected.code) {
                        item.goodsReceiptMaterialBatchJournals.removeAll();
                        item.goodsReceiptMaterialSerialJournals.removeAll();
                    }
                    item.warehouse = selected.code;
                    item = null;
                }
                if (created) {
                    // 创建了新的行项目
                    that.view.showGoodsReceiptLines(that.editData.goodsReceiptLines.filterDeleted());
                }
            }
        });
    }
    /** 新建物料批次信息 */
    createGoodsReceiptLineMaterialBatch(): void {
        let that: this = this;
        let goodReceiptLines: bo.GoodsReceiptLine[] = that.editData.goodsReceiptLines.filterBatchLine();
        if (ibas.objects.isNull(goodReceiptLines) || goodReceiptLines.length === 0) {
            this.messages(ibas.emMessageType.INFORMATION, ibas.i18n.prop("materials_app_no_matched_documentline_to_create_batch"));
            return;
        }
        ibas.servicesManager.runApplicationService<IMaterialReceiptBatchContract, IMaterialReceiptBatchs>({
            caller: that.getBatchContract(goodReceiptLines),
            proxy: MaterialBatchReceiptServiceProxy,
        });
    }
    /** 新建物料序列信息 */
    createGoodsReceiptLineMaterialSerial(): void {
        let that: this = this;
        let goodReceiptLines: bo.GoodsReceiptLine[] = that.editData.goodsReceiptLines.filterSerialLine();
        if (ibas.objects.isNull(goodReceiptLines) || goodReceiptLines.length === 0) {
            this.messages(ibas.emMessageType.INFORMATION, ibas.i18n.prop("materials_app_no_matched_documentline_to_create_serial"));
            return;
        }
        ibas.servicesManager.runApplicationService<IMaterialReceiptSerialContract, IMaterialReceiptSerials>({
            caller: that.getSerialContract(goodReceiptLines),
            // handleData: that.getSerialInfo(goodReceiptLines),
            proxy: MaterialSerialReceiptServiceProxy,
        });
    }

    /** 获取行-批次服务契约信息 */
    getBatchContract(goodReceiptLines: bo.GoodsReceiptLine[]): IMaterialReceiptBatchContract {
        let contracts: IMaterialReceiptBatchContractLine[] = [];
        for (let item of goodReceiptLines) {
            // 赋值索引
            let batchInfos: IMaterialReceiptBatchs = {
                materialReceiptLineBatchs: [],
                createBatchJournal(batchData: IMaterialBatchJournal): void {
                    item.goodsReceiptMaterialBatchJournals.createBatchJournal(batchData);
                },
                updateBatchJournal(batchData: IMaterialBatchJournal): void {
                    let batchJournal: bo.MaterialBatchJournal = item.goodsReceiptMaterialBatchJournals
                        .find(c => c.batchCode === batchData.batchCode);
                    if (!ibas.objects.isNull(batchJournal)) {
                        batchJournal.quantity = batchData.quantity;
                    }
                },
                deleteBatchJournal(batchData: IMaterialBatchJournal): void {
                    let batchJournal: bo.MaterialBatchJournal = item.goodsReceiptMaterialBatchJournals
                        .find(c => c.batchCode === batchData.batchCode);
                    if (!ibas.objects.isNull(batchJournal)) {
                       item.goodsReceiptMaterialBatchJournals.remove(batchJournal);
                    }
                }
            };
            // 遍历行中的批次信息
            for (let line of item.goodsReceiptMaterialBatchJournals.filterDeleted()) {
                let batchInfo: IMaterialReceiptBatchLine = {
                    batchCode: line.batchCode,
                    quantity: line.quantity,
                    direction: ibas.emDirection.IN
                };
                batchInfos.materialReceiptLineBatchs.push(batchInfo);
            }
            let batchContractLine: IMaterialReceiptBatchContractLine = {
                index: goodReceiptLines.indexOf(item),
                itemCode: item.itemCode,
                warehouse: item.warehouse,
                quantity: item.quantity,
                materialReceiptBatchs: batchInfos
            };
            contracts.push(batchContractLine);
        }
        return { materialReceiptBatchContractLines: contracts };
    }

    /** 获取行-序列服务契约信息 */
    getSerialContract(goodReceiptLines: bo.GoodsReceiptLine[]): IMaterialReceiptSerialContract {
        let contracts: IMaterialReceiptSerialContractLine[] = [];
        for (let item of goodReceiptLines) {
            // 赋值索引
            // let serialInfos: IMaterialReceiptLineSerial = {
            //     index: goodReceiptLines.indexOf(item),
            //     materialReceiptSerialLines: []
            // };
            // // 遍历行中的序列信息
            // for (let line of item.goodsReceiptMaterialSerialJournals.filterDeleted()) {
            //     let serialInfo: IMaterialReceiptSerialLine = {
            //         serialCode: line.serialCode,
            //         direction: ibas.emDirection.IN
            //     };
            //     serialInfos.materialReceiptSerialLines.push(serialInfo);
            // }
            // let serialContractLine: IMaterialReceiptSerialContractLine = {
            //     index: goodReceiptLines.indexOf(item),
            //     itemCode: item.itemCode,
            //     warehouse: item.warehouse,
            //     quantity: item.quantity,
            //     materialLineSerials: serialInfos
            // };
            // contracts.push(serialContractLine);
        }
        return { materialReceiptSerialContractLines: contracts };
    }

    /** 查询价格清单 */
    searchPriceList(): void {
        // 查询价格清单
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialPriceList({
            criteria: [],
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialPriceList>): void {
                let data: bo.MaterialPriceList;
                if (opRslt.resultCode === 0) {
                    data = opRslt.resultObjects.firstOrDefault();
                }
                if (ibas.objects.instanceOf(data, bo.MaterialPriceList)) {
                    that.view.showPriceListSelect(opRslt.resultObjects);
                }
            }
        });
    }
    /** 获取物料增量查询条件 */
    getConditions(): ibas.ICondition[] {
        let conditions: ibas.ICondition[] = new Array<ibas.ICondition>();
        conditions.push(new ibas.Condition(bo.Material.PROPERTY_DELETED_NAME, ibas.emConditionOperation.EQUAL, "N"));
        if (!ibas.objects.isNull(this.editData.priceList)) {
            conditions.push(new ibas.Condition(
                bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME
                , ibas.emConditionOperation.EQUAL
                , this.editData.priceList));
        }
        return conditions;
    }
}
/** 视图-库存收货 */
export interface IGoodsReceiptEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showGoodsReceipt(data: bo.GoodsReceipt): void;
    /** 显示价格清单 */
    showPriceListSelect(datas: bo.MaterialPriceList[]): void;
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 添加库存收货-行事件 */
    addGoodsReceiptLineEvent: Function;
    /** 删除库存收货-行事件 */
    removeGoodsReceiptLineEvent: Function;
    /** 显示数据 */
    showGoodsReceiptLines(datas: bo.GoodsReceiptLine[]): void;
    /** 选择库存收货单行物料事件 */
    chooseGoodsReceiptLineMaterialEvent: Function;
    /** 选择库存收货单行仓库事件 */
    chooseGoodsreceiptlineWarehouseEvent: Function;
    /** 批次管理物料新建批次 */
    createGoodsReceiptLineMaterialBatchEvent: Function;
    /** 批次管理物料新建序列 */
    createGoodsReceiptLineMaterialSerialEvent: Function;
}
