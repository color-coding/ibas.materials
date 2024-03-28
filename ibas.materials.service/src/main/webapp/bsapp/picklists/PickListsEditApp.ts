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
        export class PickListsEditApp extends ibas.BOEditService<IPickListsEditView, bo.PickLists> {
            /** 应用标识 */
            static APPLICATION_ID: string = "70edacfc-d278-4921-98c6-86648c8c937d";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_picklists_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.PickLists.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = PickListsEditApp.APPLICATION_ID;
                this.name = PickListsEditApp.APPLICATION_NAME;
                this.boCode = PickListsEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.addPickListsLineEvent = this.addPickListsLine;
                this.view.removePickListsLineEvent = this.removePickListsLine;
                this.view.choosePickListsLineMaterialBatchEvent = this.choosePickListsLineMaterialBatch;
                this.view.choosePickListsLineMaterialSerialEvent = this.choosePickListsLineMaterialSerial;
                this.view.turnToDeliveryEvent = this.turnToDelivery;
                this.view.useInventoryReservationToPickEvent = this.useInventoryReservationToPick;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.PickLists();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showPickLists(this.editData);
                this.view.showPickListsLines(this.editData.pickListsLines.filterDeleted());
                this.view.showPickers(ibas.servicesManager.getServices({
                    proxy: new MaterialPackingTargetServiceProxy({
                        onPicked: async (targets) => {
                            let item: bo.PickListsLine;
                            let materials: ibas.IList<materials.bo.Material> = await this.fetchMaterialsAsync(targets.map(c => c.itemCode));
                            for (let target of targets) {
                                item = this.editData.pickListsLines.firstOrDefault(
                                    c => c.baseDocumentType === target.baseDocumentType
                                        && c.baseDocumentEntry === target.baseDocumentEntry
                                        && c.baseDocumentLineId === target.baseDocumentLineId
                                );
                                if (ibas.objects.isNull(item)) {
                                    item = this.editData.pickListsLines.create();
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
                            this.view.showPickListsLines(this.editData.pickListsLines.filterDeleted());
                        }
                    }),
                }));
            }
            run(): void;
            run(data: bo.PickLists): void;
            run(): void {
                if (arguments[0] instanceof bo.PickLists) {
                    let data: bo.PickLists = arguments[0];
                    if (data.isNew) {
                        this.editData = data;
                        this.show();
                    } else {
                        let criteria: ibas.ICriteria = data.criteria();
                        if (criteria?.conditions.length > 0) {
                            // 有效的查询对象查询
                            let that: this = this;
                            let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                            boRepository.fetchPickLists({
                                criteria: criteria,
                                onCompleted(opRslt: ibas.IOperationResult<bo.PickLists>): void {
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
                boRepository.savePickLists({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.PickLists>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                // 删除成功，释放当前对象
                                if (!showProceeding) {
                                    that.messages(ibas.emMessageType.SUCCESS,
                                        ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                                } else {
                                    that.proceeding(ibas.emMessageType.SUCCESS,
                                        ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                                }
                                that.editData = undefined;
                            } else {
                                // 替换编辑对象
                                that.editData = opRslt.resultObjects.firstOrDefault();
                                if (!showProceeding) {
                                    that.messages(ibas.emMessageType.SUCCESS,
                                        ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                                } else {
                                    that.proceeding(ibas.emMessageType.SUCCESS,
                                        ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
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
                        that.editData = new bo.PickLists();
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
            protected addPickListsLine(agent: ibas.IServiceAgent): void {
                if (!ibas.objects.isNull(agent)) {
                    agent.run();
                } else {
                    this.editData.pickListsLines.create();
                    // 仅显示没有标记删除的
                    this.view.showPickListsLines(this.editData.pickListsLines.filterDeleted());
                }
            }
            /** 删除拣配清单-行事件 */
            protected removePickListsLine(items: bo.PickListsLine[] | bo.PickListsNumber[]): void {
                // 非数组，转为数组
                if (!(items instanceof Array)) {
                    items = [items];
                }
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (item instanceof bo.PickListsLine) {
                        if (this.editData.pickListsLines.indexOf(item) >= 0) {
                            if (item.isNew) {
                                // 新建的移除集合
                                this.editData.pickListsLines.remove(item);
                            } else {
                                // 非新建标记删除
                                item.delete();
                            }
                        }
                    } else if (item instanceof bo.PickListsNumber) {
                        if (item.isNew) {
                            for (let pItem of this.editData.pickListsLines) {
                                if (pItem.pickListsNumbers.contain(item)) {
                                    pItem.pickListsNumbers.remove(item);
                                    break;
                                }
                            }
                        } else {
                            item.delete();
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showPickListsLines(this.editData.pickListsLines.filterDeleted());
            }
            /** 选择拣配清单行批次事件 */
            private choosePickListsLineMaterialBatch(): void {
                let contracts: ibas.ArrayList<IMaterialBatchContract> = new ibas.ArrayList<IMaterialBatchContract>();
                for (let item of this.editData.pickListsLines) {
                    contracts.add({
                        batchManagement: item.batchManagement,
                        itemCode: item.itemCode,
                        itemDescription: item.itemDescription,
                        warehouse: item.warehouse,
                        quantity: item.pickQuantity,
                        uom: item.inventoryUOM,
                        materialBatches: item.pickListsNumbers,
                    });
                }
                ibas.servicesManager.runApplicationService<IMaterialBatchContract[]>({
                    proxy: new MaterialBatchIssueServiceProxy(contracts)
                });
            }
            /** 选择拣配清单序列事件 */
            private choosePickListsLineMaterialSerial(): void {
                let contracts: ibas.ArrayList<IMaterialSerialContract> = new ibas.ArrayList<IMaterialSerialContract>();
                for (let item of this.editData.pickListsLines) {
                    contracts.add({
                        serialManagement: item.serialManagement,
                        itemCode: item.itemCode,
                        itemDescription: item.itemDescription,
                        warehouse: item.warehouse,
                        quantity: item.pickQuantity,
                        uom: item.inventoryUOM,
                        materialSerials: item.pickListsNumbers
                    });
                }
                ibas.servicesManager.runApplicationService<IMaterialSerialContract[]>({
                    proxy: new MaterialSerialIssueServiceProxy(contracts)
                });
            }
            /** 转为交货 */
            protected turnToDelivery(agent: ibas.IServiceAgent): void {
                if (ibas.objects.isNull(this.editData) || this.editData.isDirty === true) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_saved_first"));
                    return;
                }
                for (let srvAgent of ibas.servicesManager.getServices({
                    proxy: new MaterialPackingTargetServiceProxy({
                        toDelivery: this.editData.pickListsLines.where(c => (c.pickStatus === bo.emPickStatus.PICKED
                            || c.pickStatus === bo.emPickStatus.PARTIALLYPICKED) && c.pickQuantity > 0),
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
                    await this.editData.pickListsLines.useInventoryReservationToPick();
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
        export interface IPickListsEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showPickLists(data: bo.PickLists): void;
            /** 显示拣配者 */
            showPickers(datas: ibas.IServiceAgent[]): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加拣配清单-行事件 */
            addPickListsLineEvent: Function;
            /** 删除拣配清单-行事件 */
            removePickListsLineEvent: Function;
            /** 选择拣配清单行物料批次事件 */
            choosePickListsLineMaterialBatchEvent: Function;
            /** 选择拣配清单行物料序列事件 */
            choosePickListsLineMaterialSerialEvent: Function;
            /** 转为交货事件 */
            turnToDeliveryEvent: Function;
            /** 显示数据-拣配清单-行 */
            showPickListsLines(datas: bo.PickListsLine[]): void;
            /** 使用预留拣配事件 */
            useInventoryReservationToPickEvent: Function;
        }
        /** 拣配清单编辑服务映射 */
        export class PickListsEditServiceMapping extends ibas.BOEditServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = PickListsEditApp.APPLICATION_ID;
                this.name = PickListsEditApp.APPLICATION_NAME;
                this.boCode = PickListsEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOEditServiceCaller<bo.PickLists>> {
                return new PickListsEditApp();
            }
        }
    }
}
