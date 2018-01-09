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
    IGoodsIssueLines,
    IMaterialSerialJournal,
    IMaterialBatchJournal,
} from "../../api/bo/index";
import {
    MaterialIssueBatchServiceProxy,
    MaterialIssueSerialServiceProxy,
    IMaterialBatchContract,
    IMaterialSerialContract,
} from "../../api/Datas";
import { BORepositoryMaterials } from "../../borep/BORepositories";
import { IMaterialBatch, IMaterialBatchJournals } from "../../api/index";
import { MaterialBatchJournal, GoodsIssueLine } from "../../borep/bo/index";
import { objects } from "ibas/index";

/** 编辑应用-库存发货 */
export class GoodsIssueEditApp extends ibas.BOEditApplication<IGoodsIssueEditView, bo.GoodsIssue> {

    /** 应用标识 */
    static APPLICATION_ID: string = "61acb506-7555-453c-8085-9245d90ed625";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_goodsissue_edit";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.GoodsIssue.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = GoodsIssueEditApp.APPLICATION_ID;
        this.name = GoodsIssueEditApp.APPLICATION_NAME;
        this.boCode = GoodsIssueEditApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.deleteDataEvent = this.deleteData;
        this.view.createDataEvent = this.createData;
        this.view.addGoodsIssueLineEvent = this.addGoodsIssueLine;
        this.view.removeGoodsIssueLineEvent = this.removeGoodsIssueLine;
        this.view.chooseGoodsIssueLineMaterialEvent = this.chooseGoodsIssueLineMaterial;
        this.view.chooseGoodsIssueLineWarehouseEvent = this.chooseGoodsIssueLineWarehouse;
        this.view.chooseGoodsIssueLineMaterialBatchEvent = this.chooseGoodsIssueLineMaterialBatch;
        this.view.chooseGoodsIssueLineMaterialSerialEvent = this.chooseGoodsIssueLineMaterialSerial;
        this.view.chooseeGoodsIssueMaterialPriceListEvent = this.chooseeGoodsIssueMaterialPriceList;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        if (ibas.objects.isNull(this.editData)) {
            // 创建编辑对象实例
            this.editData = new bo.GoodsIssue();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
        }
        this.view.showGoodsIssue(this.editData);
        this.view.showGoodsIssueLines(this.editData.goodsIssueLines.filterDeleted());
    }
    /** 运行,覆盖原方法 */
    run(): void;
    run(data: bo.GoodsIssue): void;
    run(): void {
        let that: this = this;
        if (ibas.objects.instanceOf(arguments[0], bo.GoodsIssue)) {
            let data: bo.GoodsIssue = arguments[0];
            // 新对象直接编辑
            if (data.isNew) {
                that.editData = data;
                that.show();
                return;
            }
            // 尝试重新查询编辑对象
            let criteria: ibas.ICriteria = data.criteria();
            if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                // 有效的查询对象查询
                let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
                boRepository.fetchGoodsIssue({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.GoodsIssue>): void {
                        let data: bo.GoodsIssue;
                        if (opRslt.resultCode === 0) {
                            data = opRslt.resultObjects.firstOrDefault();
                        }
                        if (ibas.objects.instanceOf(data, bo.GoodsIssue)) {
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
        super.run.apply(this, arguments);
    }

    protected priceListData: bo.MaterialPriceList[];

    /** 待编辑的数据 */
    protected editData: bo.GoodsIssue;
    /** 保存数据 */
    protected saveData(): void {
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        // 物料数量与批次数量不相等
        if (!this.editData.goodsIssueLines.checkBatchQuantity()) {
            this.messages(ibas.emMessageType.ERROR, ibas.i18n.prop("materials_app_material_quantity_not_equal_batch_quantity"));
            return;
        }
        if (!this.editData.goodsIssueLines.checkSerialQuantity()) {
            this.messages(ibas.emMessageType.ERROR, ibas.i18n.prop("materials_app_material_quantity_not_equal_serial_quantity"));
            return;
        }
        boRepository.saveGoodsIssue({
            beSaved: this.editData,
            onCompleted(opRslt: ibas.IOperationResult<bo.GoodsIssue>): void {
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
                that.editData = new bo.GoodsIssue();
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
    /** 添加库存发货-行事件 */
    addGoodsIssueLine(): void {
        this.editData.goodsIssueLines.create();
        // 仅显示没有标记删除的
        this.view.showGoodsIssueLines(this.editData.goodsIssueLines.filterDeleted());
    }
    /** 删除库存发货-行事件 */
    removeGoodsIssueLine(items: bo.GoodsIssueLine[]): void {
        // 非数组，转为数组
        if (!(items instanceof Array)) {
            items = [items];
        }
        if (items.length === 0) {
            return;
        }
        // 移除项目
        for (let item of items) {
            if (this.editData.goodsIssueLines.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    this.editData.goodsIssueLines.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showGoodsIssueLines(this.editData.goodsIssueLines.filterDeleted());
    }

    /** 选择库存发货订单行物料事件 */
    chooseGoodsIssueLineMaterial(caller: bo.GoodsIssueLine): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.Material>({
            boCode: bo.Material.BUSINESS_OBJECT_CODE,
            criteria: that.getConditions(),
            onCompleted(selecteds: ibas.List<bo.Material>): void {
                // 获取触发的对象
                let index: number = that.editData.goodsIssueLines.indexOf(caller);
                let item: bo.GoodsIssueLine = that.editData.goodsIssueLines[index];
                // 选择返回数量多于触发数量时,自动创建新的项目
                let created: boolean = false;
                for (let selected of selecteds) {
                    if (ibas.objects.isNull(item)) {
                        item = that.editData.goodsIssueLines.create();
                        created = true;
                    }
                    // 如果物料、仓库发生变更 删除批次、序列集合
                    if (item.itemCode !== selected.code) {
                        item.materialBatchs.deleteAll();
                        item.materialSerials.deleteAll();
                    }
                    item.itemCode = selected.code;
                    item.itemDescription = selected.name;
                    item.serialManagement = selected.serialManagement;
                    item.batchManagement = selected.batchManagement;
                    item.quantity = 1;
                    item = null;
                }
                if (created) {
                    // 创建了新的行项目
                    that.view.showGoodsIssueLines(that.editData.goodsIssueLines.filterDeleted());
                }
            }
        });
    }

    /** 选择库存发货订单行仓库事件 */
    chooseGoodsIssueLineWarehouse(caller: bo.GoodsIssueLine): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.Warehouse>({
            boCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
            criteria: [
                new ibas.Condition(bo.Warehouse.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
            ],
            onCompleted(selecteds: ibas.List<bo.Warehouse>): void {
                // 获取触发的对象
                let index: number = that.editData.goodsIssueLines.indexOf(caller);
                let item: bo.GoodsIssueLine = that.editData.goodsIssueLines[index];
                // 选择返回数量多余触发数量时,自动创建新的项目
                let created: boolean = false;
                for (let selected of selecteds) {
                    if (ibas.objects.isNull(item)) {
                        item = that.editData.goodsIssueLines.create();
                        created = true;
                    }
                    if (item.warehouse !== selected.code) {
                        item.materialBatchs.deleteAll();
                        item.materialSerials.deleteAll();
                    }
                    item.warehouse = selected.code;
                    item = null;
                }
                if (created) {
                    // 创建了新的行项目
                    that.view.showGoodsIssueLines(that.editData.goodsIssueLines.filterDeleted());
                }
            }
        });
    }
    /** 选择库存发货订单物料价格清单事件 */
    chooseeGoodsIssueMaterialPriceList(): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.MaterialPriceList>({
            boCode: bo.MaterialPriceList.BUSINESS_OBJECT_CODE,
            chooseType: ibas.emChooseType.SINGLE,
            criteria: [],
            onCompleted(selecteds: ibas.List<bo.MaterialPriceList>): void {
                that.editData.priceList = selecteds.firstOrDefault().objectKey;
            }
        });
    }
    /** 选择库存发货行批次事件 */
    chooseGoodsIssueLineMaterialBatch(): void {
        let that: this = this;
        let goodIssueLines: bo.GoodsIssueLine[] = this.editData.goodsIssueLines
            .filter(
            c => c.isDeleted === false
                && !ibas.objects.isNull(c.lineStatus)
                && c.batchManagement !== undefined
                && c.batchManagement === ibas.emYesNo.YES
                && !ibas.strings.isEmpty(c.itemCode)
                && !ibas.strings.isEmpty(c.warehouse)
            );
        if (ibas.objects.isNull(goodIssueLines) || goodIssueLines.length === 0) {
            this.messages(ibas.emMessageType.INFORMATION, ibas.i18n.prop("materials_app_no_matched_documentline_to_choose_batch"));
            return;
        }
        // 调用批次选择服务
        ibas.servicesManager.runApplicationService<IMaterialBatchContract[]>({
            proxy: new MaterialIssueBatchServiceProxy(that.getBatchContract(goodIssueLines))
        });
    }
    /** 选择库存发货序列事件 */
    chooseGoodsIssueLineMaterialSerial(): void {
        let that: this = this;
        let goodIssueLines: bo.GoodsIssueLine[] = this.editData.goodsIssueLines
            .filter(c => c.isDeleted === false
                && !ibas.objects.isNull(c.lineStatus)
                && c.serialManagement !== undefined
                && c.serialManagement === ibas.emYesNo.YES
                && !ibas.strings.isEmpty(c.itemCode)
                && !ibas.strings.isEmpty(c.warehouse));
        if (ibas.objects.isNull(goodIssueLines) || goodIssueLines.length === 0) {
            this.messages(ibas.emMessageType.INFORMATION, ibas.i18n.prop("materials_app_no_matched_documentline_to_choose_serial"));
            return;
        }
        // 调用序列选择服务
        ibas.servicesManager.runApplicationService<IMaterialSerialContract[]>({
            proxy: new MaterialIssueSerialServiceProxy(that.getSerialContract(goodIssueLines))
        });
    }

    /** 获取行-批次服务契约信息 */
    getBatchContract(goodIssueLines: bo.GoodsIssueLine[]): IMaterialBatchContract[] {
        let contracts: IMaterialBatchContract[] = new ibas.ArrayList<IMaterialBatchContract>();
        for (let item of goodIssueLines) {
            contracts.push({
                itemCode: item.itemCode,
                warehouse: item.warehouse,
                quantity: item.quantity,
                materialBatchs: item.materialBatchs,
            });
        }
        return contracts;
    }

    /** 获取行-批次服务契约信息 */
    getSerialContract(goodIssueLines: bo.GoodsIssueLine[]): IMaterialSerialContract[] {
        let contracts: IMaterialSerialContract[] = new ibas.ArrayList<IMaterialSerialContract>();
        for (let item of goodIssueLines) {
            contracts.push({
                itemCode: item.itemCode,
                warehouse: item.warehouse,
                quantity: item.quantity,
                materialSerials: item.materialSerials
            });
        }
        return contracts;
    }

    /** 获取物料增量查询条件 */
    getConditions(): ibas.ICondition[] {
        let conditions: ibas.ICondition[] = new Array<ibas.ICondition>();
        if (!ibas.objects.isNull(this.editData.priceList)) {
            conditions.push(new ibas.Condition(
                bo.MaterialPriceList.PROPERTY_OBJECTKEY_NAME
                , ibas.emConditionOperation.EQUAL
                , this.editData.priceList));
        }
        conditions.push(new ibas.Condition(bo.Material.PROPERTY_DELETED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.NO));
        return conditions;
    }
}

/** 视图-库存发货 */
export interface IGoodsIssueEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showGoodsIssue(data: bo.GoodsIssue): void;
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 添加库存发货-行事件 */
    addGoodsIssueLineEvent: Function;
    /** 删除库存发货-行事件 */
    removeGoodsIssueLineEvent: Function;
    /** 选择库存发货物料价格清单 */
    chooseeGoodsIssueMaterialPriceListEvent: Function;
    /** 显示数据 */
    showGoodsIssueLines(datas: bo.GoodsIssueLine[]): void;
    /** 选择库存发货单行物料事件 */
    chooseGoodsIssueLineMaterialEvent: Function;
    /** 选择库存发货单行仓库事件 */
    chooseGoodsIssueLineWarehouseEvent: Function;
    /** 选择库存发货单行物料批次事件 */
    chooseGoodsIssueLineMaterialBatchEvent: Function;
    /** 选择库存发货单行物料序列号事件 */
    chooseGoodsIssueLineMaterialSerialEvent: Function;
}