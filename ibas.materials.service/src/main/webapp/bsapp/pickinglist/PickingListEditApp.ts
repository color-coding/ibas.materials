/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 编辑应用-拣配清单 */
        export class PickingListEditApp extends ibas.BOEditService<IPickingListEditView, bo.PickingList> {
            /** 应用标识 */
            static APPLICATION_ID: string = "70edacfc-d278-4921-98c6-86648c8c937d";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_pickinglist_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.PickingList.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = PickingListEditApp.APPLICATION_ID;
                this.name = PickingListEditApp.APPLICATION_NAME;
                this.boCode = PickingListEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.addPickingListLineEvent = this.addPickingListLine;
                this.view.removePickingListLineEvent = this.removePickingListLine;
                this.view.choosePickingListLineMaterialBatchEvent = this.choosePickingListLineMaterialBatch;
                this.view.choosePickingListLineMaterialSerialEvent = this.choosePickingListLineMaterialSerial;
                this.view.turnToDeliveryEvent = this.turnToDelivery;
                this.view.useInventoryReservationToPickEvent = this.useInventoryReservationToPick;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.PickingList();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showPickingList(this.editData);
                this.view.showPickingListLines(this.editData.pickingListLines.filterDeleted());
                this.view.showPickers(ibas.servicesManager.getServices({
                    proxy: new MaterialPackingTargetServiceProxy({
                        onPicked: async (targets) => {
                            let item: bo.PickingListLine;
                            let materials: ibas.IList<materials.bo.Material> = await this.fetchMaterialsAsync(targets.map(c => c.itemCode));
                            for (let target of targets) {
                                item = this.editData.pickingListLines.firstOrDefault(
                                    c => c.baseDocumentType === target.baseDocumentType
                                        && c.baseDocumentEntry === target.baseDocumentEntry
                                        && c.baseDocumentLineId === target.baseDocumentLineId
                                );
                                if (ibas.objects.isNull(item)) {
                                    item = this.editData.pickingListLines.create();
                                    item.baseDocumentType = target.baseDocumentType;
                                    item.baseDocumentEntry = target.baseDocumentEntry;
                                    item.baseDocumentLineId = target.baseDocumentLineId;
                                    item.baseBusinessObject(target);
                                    let material: materials.bo.Material = materials.firstOrDefault(c => ibas.strings.equalsIgnoreCase(c.code, target.itemCode));
                                    if (!ibas.objects.isNull(material)) {
                                        item.baseBusinessObject(material);
                                    }
                                    item.quantity = 0;
                                }
                                item.quantity = item.quantity + target.unclosedQuantity;
                                if (item.quantity >= target.unclosedQuantity) {
                                    item.quantity = target.unclosedQuantity;
                                }
                            }
                            this.view.showPickingListLines(this.editData.pickingListLines.filterDeleted());
                        }
                    }),
                }));
            }
            run(): void;
            run(data: bo.PickingList): void;
            run(): void {
                if (arguments[0] instanceof bo.PickingList) {
                    let data: bo.PickingList = arguments[0];
                    if (data.isNew) {
                        this.editData = data;
                        this.show();
                    } else {
                        let criteria: ibas.ICriteria = data.criteria();
                        if (criteria?.conditions.length > 0) {
                            // 有效的查询对象查询
                            let that: this = this;
                            let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                            boRepository.fetchPickingList({
                                criteria: criteria,
                                onCompleted(opRslt: ibas.IOperationResult<bo.PickingList>): void {
                                    try {
                                        if (opRslt.resultCode !== 0) {
                                            throw new Error(opRslt.message);
                                        }
                                        if (opRslt.resultObjects.length > 0) {
                                            that.editData = opRslt.resultObjects.firstOrDefault();
                                            that.show();
                                        } else {
                                            that.messages({
                                                type: ibas.emMessageType.WARNING,
                                                message: ibas.i18n.prop("shell_data_deleted_and_created"),
                                                onCompleted(): void {
                                                    that.show();
                                                }
                                            });
                                        }
                                    } catch (error) {
                                        that.messages(error);
                                    }
                                }
                            });
                        } else {
                            super.run.apply(this, arguments);
                        }
                    }
                } else {
                    super.run.apply(this, arguments);
                }
            }
            /** 保存数据 */
            protected saveData(showProceeding: boolean = false): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.savePickingList({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.PickingList>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                // 删除成功，释放当前对象
                                if (!showProceeding) {
                                    that.messages(ibas.emMessageType.SUCCESS,
                                        ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_successful"));
                                } else {
                                    that.proceeding(ibas.emMessageType.SUCCESS,
                                        ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_successful"));
                                }
                                that.editData = undefined;
                            } else {
                                // 替换编辑对象
                                that.editData = opRslt.resultObjects.firstOrDefault();
                                if (!showProceeding) {
                                    that.messages(ibas.emMessageType.SUCCESS,
                                        ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_successful"));
                                } else {
                                    that.proceeding(ibas.emMessageType.SUCCESS,
                                        ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_successful"));
                                }
                            }
                            // 刷新当前视图
                            that.viewShowed();
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 删除数据 */
            protected deleteData(): void {
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_delete_continue"),
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
                        that.editData = new bo.PickingList();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                        that.viewShowed();
                    }
                };
                if (that.editData.isDirty) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        title: ibas.i18n.prop(this.name),
                        message: ibas.i18n.prop("shell_data_not_saved_continue"),
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
            }  /** 添加拣配清单-行事件 */
            protected addPickingListLine(agent: ibas.IServiceAgent): void {
                if (!ibas.objects.isNull(agent)) {
                    agent.run();
                } else {
                    this.editData.pickingListLines.create();
                    // 仅显示没有标记删除的
                    this.view.showPickingListLines(this.editData.pickingListLines.filterDeleted());
                }
            }
            /** 删除拣配清单-行事件 */
            protected removePickingListLine(items: bo.PickingListLine[] | bo.PickingListNumber[]): void {
                // 非数组，转为数组
                if (!(items instanceof Array)) {
                    items = [items];
                }
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (item instanceof bo.PickingListLine) {
                        if (this.editData.pickingListLines.indexOf(item) >= 0) {
                            if (item.isNew) {
                                // 新建的移除集合
                                this.editData.pickingListLines.remove(item);
                            } else {
                                // 非新建标记删除
                                item.delete();
                            }
                        }
                    } else if (item instanceof bo.PickingListNumber) {
                        if (item.isNew) {
                            for (let pItem of this.editData.pickingListLines) {
                                if (pItem.pickingListNumbers.contain(item)) {
                                    pItem.pickingListNumbers.remove(item);
                                    break;
                                }
                            }
                        } else {
                            item.delete();
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showPickingListLines(this.editData.pickingListLines.filterDeleted());
            }
            /** 选择拣配清单行批次事件 */
            private choosePickingListLineMaterialBatch(): void {
                let contracts: ibas.ArrayList<IMaterialBatchContract> = new ibas.ArrayList<IMaterialBatchContract>();
                for (let item of this.editData.pickingListLines) {
                    contracts.add({
                        batchManagement: item.batchManagement,
                        itemCode: item.itemCode,
                        itemDescription: item.itemDescription,
                        warehouse: item.warehouse,
                        quantity: item.pickingQuantity,
                        uom: item.inventoryUOM,
                        materialBatches: item.pickingListNumbers,
                    });
                }
                ibas.servicesManager.runApplicationService<IMaterialBatchContract[]>({
                    proxy: new MaterialBatchIssueServiceProxy(contracts)
                });
            }
            /** 选择拣配清单序列事件 */
            private choosePickingListLineMaterialSerial(): void {
                let contracts: ibas.ArrayList<IMaterialSerialContract> = new ibas.ArrayList<IMaterialSerialContract>();
                for (let item of this.editData.pickingListLines) {
                    contracts.add({
                        serialManagement: item.serialManagement,
                        itemCode: item.itemCode,
                        itemDescription: item.itemDescription,
                        warehouse: item.warehouse,
                        quantity: item.pickingQuantity,
                        uom: item.inventoryUOM,
                        materialSerials: item.pickingListNumbers
                    });
                }
                ibas.servicesManager.runApplicationService<IMaterialSerialContract[]>({
                    proxy: new MaterialSerialIssueServiceProxy(contracts)
                });
            }
            /** 转为交货 */
            protected turnToDelivery(agent: ibas.IServiceAgent, selectItems?: bo.PickingListLine[]): void {
                if (ibas.objects.isNull(this.editData) || this.editData.isDirty === true) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_saved_first"));
                    return;
                }
                let pickingListLines: ibas.ArrayList<bo.PickingListLine> = new ibas.ArrayList<bo.PickingListLine>();
                if (!(selectItems.length > 0)) {
                    selectItems = this.editData.pickingListLines;
                }
                for (let item of selectItems) {
                    if ((item.pickingStatus === bo.emPickingStatus.PICKED
                        || item.pickingStatus === bo.emPickingStatus.PARTIALLY_PICKED) && item.pickingQuantity > 0) {
                        pickingListLines.add(item);
                    }
                }
                for (let srvAgent of ibas.servicesManager.getServices({
                    proxy: new MaterialPackingTargetServiceProxy({
                        toDelivery: pickingListLines,
                        onDelivered: (targets) => {
                            if (targets instanceof Error) {
                                this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_action_is_blocked", targets.message));
                            } else {
                                this.saveData(true);
                            }
                        },
                    })
                })) {
                    if (srvAgent.id === agent.id) {
                        srvAgent.run();
                    }
                }
            }
            /** 使用预留拣配 */
            protected async useInventoryReservationToPick(): Promise<void> {
                try {
                    this.busy(true);
                    await this.editData.pickingListLines.useInventoryReservationToPick();
                    this.busy(false);
                } catch (error) {
                    this.busy(false);
                    this.messages(error);
                }
            }
            /**
             * 获取物料主数据
             * @param itemCode 物料编码
             * @returns 物料主数据
             */
            private async fetchMaterialsAsync(itemCode: string | string[]): Promise<ibas.IList<materials.bo.Material>> {
                let itemCodes: ibas.ArrayList<string> = ibas.arrays.create(itemCode);
                let criteria: ibas.Criteria = new ibas.Criteria();
                let condition: ibas.ICondition;
                for (let code of itemCodes) {
                    if (ibas.strings.isEmpty(code)) {
                        continue;
                    }
                    condition = criteria.conditions.create();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.alias = materials.bo.Material.PROPERTY_CODE_NAME;
                    condition.value = code;
                }
                if (criteria.conditions.length === 0) {
                    return new ibas.ArrayList();
                }
                let promise: Promise<ibas.IList<materials.bo.Material>> = new Promise<ibas.IList<materials.bo.Material>>(async (resolve) => {
                    let boRepository: materials.bo.BORepositoryMaterials = new materials.bo.BORepositoryMaterials();
                    boRepository.fetchMaterial({
                        criteria: criteria,
                        onCompleted(opRslt: ibas.IOperationResult<materials.bo.Material>): void {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                resolve(opRslt.resultObjects);
                            } catch (error) {
                                resolve(new ibas.ArrayList());
                            }
                        }
                    });
                });
                return promise;
            }
        }
        /** 视图-拣配清单 */
        export interface IPickingListEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showPickingList(data: bo.PickingList): void;
            /** 显示拣配者 */
            showPickers(datas: ibas.IServiceAgent[]): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加拣配清单-行事件 */
            addPickingListLineEvent: Function;
            /** 删除拣配清单-行事件 */
            removePickingListLineEvent: Function;
            /** 选择拣配清单行物料批次事件 */
            choosePickingListLineMaterialBatchEvent: Function;
            /** 选择拣配清单行物料序列事件 */
            choosePickingListLineMaterialSerialEvent: Function;
            /** 转为交货事件 */
            turnToDeliveryEvent: Function;
            /** 显示数据-拣配清单-行 */
            showPickingListLines(datas: bo.PickingListLine[]): void;
            /** 使用预留拣配事件 */
            useInventoryReservationToPickEvent: Function;
        }
        /** 拣配清单编辑服务映射 */
        export class PickingListEditServiceMapping extends ibas.BOEditServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = PickingListEditApp.APPLICATION_ID;
                this.name = PickingListEditApp.APPLICATION_NAME;
                this.boCode = PickingListEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOEditServiceCaller<bo.PickingList>> {
                return new PickingListEditApp();
            }
        }
    }
}
