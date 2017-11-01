/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";

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
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        if (ibas.objects.isNull(this.editData)) {
            // 创建编辑对象实例
            this.editData = new bo.GoodsIssue();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
        }
        this.view.showGoodsIssue(this.editData);
        this.view.showGoodsIssueLines(this.editData.goodsIssueLines.filterDeleted());
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        if (ibas.objects.instanceOf(arguments[0], bo.GoodsIssue)) {
            // 尝试重新查询编辑对象
            let criteria: ibas.ICriteria = arguments[0].criteria();
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
                                message: ibas.i18n.prop("sys_shell_data_deleted_and_created"),
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
        super.run();
    }
    /** 待编辑的数据 */
    protected editData: bo.GoodsIssue;
    /** 保存数据 */
    protected saveData(): void {
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
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
                            ibas.i18n.prop("sys_shell_data_delete") + ibas.i18n.prop("sys_shell_sucessful"));
                        that.editData = undefined;
                    } else {
                        // 替换编辑对象
                        that.editData = opRslt.resultObjects.firstOrDefault();
                        that.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("sys_shell_data_save") + ibas.i18n.prop("sys_shell_sucessful"));
                    }
                    // 刷新当前视图
                    that.viewShowed();
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_saving_data"));
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
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_cloned_new"));
                that.viewShowed();
            } else {
                // 新建对象
                that.editData = new bo.GoodsIssue();
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
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
        ibas.servicesManager.runChooseService<bo.MaterialEx>({
            caller: caller,
            boCode: bo.MaterialEx.BUSINESS_OBJECT_CODE,
            criteria: [
                new ibas.Condition(bo.MaterialEx.PROPERTY_DELETED_NAME, ibas.emConditionOperation.EQUAL, "N")
            ],
            onCompleted(selecteds: ibas.List<bo.MaterialEx>): void {
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
                    item.itemCode = selected.code;
                    item.itemDescription = selected.name;
                    item.warehouse = selected.warehouseCode;
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
            caller: caller,
            boCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
            criteria: [
                new ibas.Condition(bo.Warehouse.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, "Y")
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

    chooseGoodsIssueLineMaterialBatch(): void {
        let that: this = this;
        let caller: bo.MaterialBatchSerialInOutData[] = that.getBatchSerialData();
        if (ibas.objects.isNull(caller) || caller.length === 0) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
                ibas.i18n.prop("sys_shell_data_edit")
            ));
            return;
        }
        ibas.servicesManager.runChooseService<bo.MaterialBatchSerialInOutData>({
            caller: caller,
            boCode: bo.MaterialBatchJournal.BUSINESS_OBJECT_ISSUE_CODE,
            criteria: [
            ],
            onCompleted(callbackData: ibas.List<bo.MaterialBatchSerialInOutData>): void {
                // 获取触发的对象
                for (let line of callbackData) {
                    let item: bo.GoodsIssueLine = that.editData.goodsIssueLines[line.index];
                    for (let batchLine of item.goodsIssueMaterialBatchJournals) {
                        batchLine.delete();
                    }
                    for (let batchJournal of line.materialBatchSerialInOutDataBatchJournals.filterDeleted()) {
                        // 如果批次号为空 不处理
                        if (ibas.objects.isNull(batchJournal.batchCode)) {
                            continue;
                        }
                        let batchLine: bo.MaterialBatchJournal = item.goodsIssueMaterialBatchJournals
                            .find(c => c.batchCode === batchJournal.batchCode);
                        if (ibas.objects.isNull(batchLine)) {
                            batchLine = item.goodsIssueMaterialBatchJournals.create();
                        }
                        batchLine.batchCode = batchJournal.batchCode;
                        batchLine.itemCode = batchJournal.itemCode;
                        batchLine.warehouse = batchJournal.warehouse;
                        batchLine.quantity = batchJournal.quantity;
                        batchLine.admissionDate = batchJournal.admissionDate;
                        batchLine.expirationDate = batchJournal.expirationDate;
                        batchLine.manufacturingDate = batchJournal.manufacturingDate;
                    }
                }
            }
        });
    }
    /** 获取行-批次序列信息 */
    getBatchSerialData(): bo.MaterialBatchSerialInOutData[] {
        // 获取行数据
        let goodIssueLines: bo.GoodsIssueLine[] = this.editData.goodsIssueLines;
        let inputData: bo.MaterialBatchSerialInOutData[] = new Array<bo.MaterialBatchSerialInOutData>();
        for (let line of goodIssueLines) {
            let input: bo.MaterialBatchSerialInOutData = new bo.MaterialBatchSerialInOutData();
            input.index = goodIssueLines.indexOf(line);
            input.itemCode = line.itemCode;
            input.quantity = line.quantity;
            input.warehouse = line.warehouse;
            input.direction = ibas.emDirection.OUT;
            if (line.goodsIssueMaterialBatchJournals.length === 0) {
                input.needBatchQuantity = line.quantity;
                input.selectedBatchQuantity = 0;
            } else {
                for (let item of line.goodsIssueMaterialBatchJournals.filterDeleted()) {
                    let batchLine: bo.MaterialBatchJournal = input.materialBatchSerialInOutDataBatchJournals.create();
                    batchLine.batchCode = item.batchCode;
                    batchLine.itemCode = item.itemCode;
                    batchLine.warehouse = item.warehouse;
                    batchLine.quantity = item.quantity;
                    batchLine.direction = ibas.emDirection.OUT;
                }
            }
            if (line.goodsIssueMaterialSerialJournals.length === 0) {
                input.needSerialQuantity = line.quantity;
                input.selectedSerialQuantity = 0;
            } else {
                for (let item of line.goodsIssueMaterialSerialJournals.filterDeleted()) {
                    let serialLine: bo.MaterialSerialJournal = input.materialBatchSerialInOutDataSerialJournals.create();
                    serialLine.serialCode = item.serialCode;
                    serialLine.itemCode = item.itemCode;
                    serialLine.warehouse = item.warehouse;
                    serialLine.direction = ibas.emDirection.OUT;
                }
            }
            inputData.push(input);
        }
        return inputData;
    }

    chooseGoodsIssueLineMaterialSerial(): void {
        let that: this = this;
        let caller: bo.MaterialBatchSerialInOutData[] = that.getBatchSerialData();
        if (ibas.objects.isNull(caller) || caller.length === 0) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
                ibas.i18n.prop("sys_shell_data_edit")
            ));
            return;
        }
        ibas.servicesManager.runChooseService<bo.MaterialBatchSerialInOutData>({
            caller: caller,
            boCode: bo.MaterialSerialJournal.BUSINESS_OBJECT_ISSUE_CODE,
            criteria: [
            ],
            onCompleted(callbackData: ibas.List<bo.MaterialBatchSerialInOutData>): void {
                // 获取触发的对象
                for (let line of callbackData) {
                    let item: bo.GoodsIssueLine = that.editData.goodsIssueLines[line.index];
                    for (let serialLine of item.goodsIssueMaterialSerialJournals) {
                        serialLine.delete();
                    }
                    for (let serial of line.materialBatchSerialInOutDataSerialJournals.filterDeleted()) {
                        let serialLine: bo.MaterialSerialJournal = item.goodsIssueMaterialSerialJournals.create();
                        serialLine.serialCode = serial.serialCode;
                        serialLine.itemCode = serial.itemCode;
                        serialLine.warehouse = serial.warehouse;
                        serialLine.admissionDate = serial.admissionDate;
                        serialLine.expirationDate = serial.expirationDate;
                        serialLine.manufacturingDate = serial.manufacturingDate;
                    }
                }
            }
        });
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
