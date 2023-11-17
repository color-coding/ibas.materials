/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        const PROPERTY_DATA: symbol = Symbol("data");
        const PROPERTY_ITEMS: symbol = Symbol("items");
        const PROPERTY_PARENT: symbol = Symbol("parent");
        export enum emPickViewStatus {
            /** 处理中 */
            PROCESSING,
            /** 已审批 */
            RELEASED,
            /** 已拣配 */
            PICKED,
        }
        export enum emPickViewDimension {
            /** 明细 */
            DETAILS,
            /** 汇总 */
            TOTAL
        }
        export class PickListsWorking extends ibas.BusinessObject<PickListsWorking> {
            constructor() {
                super();
            }
            /** 映射的属性名称-状态 */
            static PROPERTY_STATUS_NAME: string = "Status";
            /** 获取-状态 */
            get status(): emPickViewStatus {
                return this.getProperty<emPickViewStatus>(PickListsWorking.PROPERTY_STATUS_NAME);
            }
            /** 设置-状态 */
            set status(value: emPickViewStatus) {
                this.setProperty(PickListsWorking.PROPERTY_STATUS_NAME, value);
            }
            /** 映射的属性名称-显示维度 */
            static PROPERTY_VIEWDIMENSION_NAME: string = "ViewDimension";
            /** 获取-显示维度 */
            get viewDimension(): emPickViewDimension {
                return this.getProperty<emPickViewDimension>(PickListsWorking.PROPERTY_VIEWDIMENSION_NAME);
            }
            /** 设置-显示维度 */
            set viewDimension(value: emPickViewDimension) {
                this.setProperty(PickListsWorking.PROPERTY_VIEWDIMENSION_NAME, value);
            }
            /** 映射的属性名称-未选择的仓库 */
            static PROPERTY_UNSELECTEDWAREHOUSES_NAME: string = "UnSelectedWarehouses";
            /** 获取-未选择的仓库 */
            get unSelectedWarehouses(): string {
                return this.getProperty<string>(PickListsWorking.PROPERTY_UNSELECTEDWAREHOUSES_NAME);
            }
            /** 设置-未选择的仓库 */
            set unSelectedWarehouses(value: string) {
                this.setProperty(PickListsWorking.PROPERTY_UNSELECTEDWAREHOUSES_NAME, value);
            }
            get items(): ibas.IList<PickListsWorkingItem> {
                return this[PROPERTY_ITEMS];
            }
            criteria(): ibas.ICriteria {
                return undefined;
            }
            toString(): string {
                return undefined;
            }
            protected init(): void {
                this.status = emPickViewStatus.PROCESSING;
                this.viewDimension = emPickViewDimension.DETAILS;
                this.unSelectedWarehouses = "";
                this[PROPERTY_ITEMS] = new ibas.ArrayList<PickListsWorkingItem>();
                for (let serviceAgent of ibas.servicesManager.getServices({
                    proxy: new MaterialPackingTargetServiceProxy({
                        onPicked: (targets) => {
                        }
                    }),
                })) {
                    this.items.add(new PickListsWorkingItem(serviceAgent, this));
                }
            }
        }
        export class PickListsWorkingItem extends ibas.BusinessObject<PickListsWorkingItem> {
            constructor(serviceAgent: ibas.IServiceAgent, parent: PickListsWorking) {
                super();
                this[PROPERTY_DATA] = serviceAgent;
                this[PROPERTY_PARENT] = parent;
            }
            get id(): string {
                return this.serviceAgent?.id;
            }
            get name(): string {
                let name: string = this.serviceAgent?.description;
                if (!ibas.strings.isEmpty(name)) {
                    if (name.indexOf(",") === -1) {
                        return name;
                    }
                    let descs: string[] = name.split(",");
                    return descs[0];
                }
                return "";
            }
            /** 映射的属性名称-是否启用 */
            static PROPERTY_ENABLE_NAME: string = "Enable";
            /** 获取-是否启用 */
            get enable(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(PickListsWorkingItem.PROPERTY_ENABLE_NAME);
            }
            /** 设置-是否启用 */
            set enable(value: ibas.emYesNo) {
                this.setProperty(PickListsWorkingItem.PROPERTY_ENABLE_NAME, value);
            }
            get serviceAgent(): ibas.IServiceAgent {
                return this[PROPERTY_DATA];
            }
            get parent(): PickListsWorking {
                return this[PROPERTY_PARENT];
            }
            criteria(): ibas.ICriteria {
                return undefined;
            }
            toString(): string {
                return undefined;
            }
            protected init(): void {
                this.enable = ibas.emYesNo.YES;
            }
            async fetch(criteria?: ibas.ICriteria): Promise<IPickListsTarget[]> {
                let that: this = this;
                let promise: Promise<IPickListsTarget[]> = new Promise<IPickListsTarget[]>(resolve => {
                    let hasRunned: boolean = false;
                    for (let srvAgent of ibas.servicesManager.getServices({
                        proxy: new MaterialPackingTargetServiceProxy({
                            isFetchAll: true,
                            criteria: criteria,
                            onPicked: (targets) => {
                                resolve(targets);
                            }
                        })
                    })) {
                        if (srvAgent.id === that.id) {
                            hasRunned = true;
                            srvAgent.run();
                        }
                    }
                    if (!hasRunned) {
                        resolve([]);
                    }
                });
                return promise;
            }
        }
        /** 应用-拣配清单 */
        export class PickListsApp extends ibas.Application<IPickListsView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "cd750bf4-a1b8-4df3-b567-a69d3b636df3";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_picklists";
            /** 构造函数 */
            constructor() {
                super();
                this.id = PickListsApp.APPLICATION_ID;
                this.name = PickListsApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            protected workingData: PickListsWorking;
            protected pickListsDatas: ibas.ArrayList<bo.PickLists>;
            run(data?: PickListsWorking): void {
                if (data instanceof PickListsWorking) {
                    this.workingData = data;
                }
                this.pickListsDatas = new ibas.ArrayList();
                super.run.apply(this, arguments);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.saveDatasEvent = this.saveDatas;
                this.view.fetchProcessingDataEvent = this.fetchProcessingData;
                this.view.releasePickListsEvent = this.releasePickLists;
                this.view.processingTurnToDeliveryEvent = this.processingTurnToDelivery;
                this.view.releasedTurnToDeliveryEvent = this.releasedTurnToDelivery;
                this.view.pickedTurnToDeliveryEvent = this.pickedTurnToDelivery;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (ibas.objects.isNull(this.workingData)) {
                    this.workingData = new PickListsWorking();
                }
                this.view.showWorkingData(this.workingData);
                this.view.showPickers(ibas.servicesManager.getServices({
                    proxy: new MaterialPackingTargetServiceProxy({
                        onPicked: (targets) => {
                        }
                    }),
                }));
                this.fetchPickLists();
            }
            /** 查询数据 */
            protected fetchPickLists(criteria?: ibas.ICriteria): void {
                if (ibas.objects.isNull(criteria)) {
                    criteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.PickLists.PROPERTY_PICKSTATUS_NAME;
                    condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                    condition.value = bo.emPickStatus.CLOSED.toString();
                }
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchPickLists({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.PickLists>): void {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.pickListsDatas = opRslt.resultObjects;
                            that.view.showPickListsData(that.pickListsDatas);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 查询处理中数据事件 */
            protected async fetchProcessingData(): Promise<void> {
                let datas: ibas.IList<IPickListsTarget> = new ibas.ArrayList();
                this.busy(true);
                let unSelectedWarehouses: Map<string, string> = new Map();
                if (!ibas.strings.isEmpty(this.workingData.unSelectedWarehouses)) {
                    for (const warehouse of this.workingData.unSelectedWarehouses.split(",")) {
                        unSelectedWarehouses.set(warehouse, warehouse);
                    }
                }
                for (const item of this.workingData.items) {
                    if (item.enable !== ibas.emYesNo.YES) {
                        continue;
                    }
                    if (ibas.strings.isEmpty(item.name)) {
                        continue;
                    }
                    this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
                    for (const target of await item.fetch()) {
                        if (unSelectedWarehouses.has(target.warehouse)) {
                            continue;
                        }
                        datas.add(target);
                    }
                }
                let materials: ibas.IList<materials.bo.Material> = await this.fetchMaterialsAsync(datas.map(c => c.itemCode));
                for (const data of datas) {
                    let material: materials.bo.Material = materials.firstOrDefault(c => ibas.strings.equalsIgnoreCase(c.code, data.itemCode));
                    if (!ibas.objects.isNull(material)) {
                        /** 物料/服务描述 */
                        data.itemDescription = material.name;
                        /** 物料标识 */
                        data.itemSign = material.sign;
                        /** 序号管理 */
                        data.serialManagement = material.serialManagement;
                        /** 批号管理 */
                        data.batchManagement = material.batchManagement;
                        /** 库存单位 */
                        data.inventoryUOM = material.inventoryUOM;
                    }
                }
                this.busy(false);
                this.view.showProcessingData(datas);
            }
            /** 下达拣配清单事件 */
            protected async releasePickLists(pickLists: bo.PickLists, targets: IPickListsTarget[], callback: (error?: any) => void): Promise<void> {
                try {
                    for (const target of targets) {
                        let line: bo.PickListsLine = pickLists.pickListsLines.create();
                        line.baseBusinessObject(target);
                        line.quantity = target.releasedQuantity;
                    }
                    pickLists = await this.saveData(pickLists);
                    if (!ibas.objects.isNull(pickLists)) {
                        this.pickListsDatas.add(pickLists);
                        this.view.showPickListsData(this.pickListsDatas);
                    }
                    callback();
                    this.proceeding(ibas.emMessageType.SUCCESS, ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                } catch (error) {
                    callback(error);
                    this.messages(error);
                }
            }
            /** 转为交货事件 */
            protected async processingTurnToDelivery(serviceAgent: ibas.IServiceAgent, datas: ibas.IList<app.IPickListsTarget>, callback: (closedTargets: Array<IPickListsTarget>) => void): Promise<void> {
                if (!!datas.firstOrDefault(c => !(ibas.numbers.valueOf(c.releasedQuantity) > 0))) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_msg_release_picklists_need_quantity"));
                    return;
                }
                let items: ibas.IList<bo.PickListsLine> = new ibas.ArrayList();
                for (const data of datas) {
                    let item: bo.PickListsLine = new bo.PickListsLine();
                    item.baseBusinessObject(data);
                    item.quantity = data.releasedQuantity;
                    item.pickQuantity = data.releasedQuantity;
                    items.add(item);
                }
                let closedLines: Array<bo.IPickListsLine> = await this.turnToDelivery(serviceAgent, items, false);
                let closedTargets: ibas.ArrayList<IPickListsTarget> = new ibas.ArrayList();
                if (closedLines instanceof Array) {
                    for (const closedLine of closedLines) {
                        let target: IPickListsTarget[] = datas.filter(
                            c => ibas.strings.equals(closedLine.baseDocumentType, c.baseDocumentType)
                                && closedLine.baseDocumentEntry === c.baseDocumentEntry
                                && ibas.numbers.valueOf(closedLine.baseDocumentLineId) === ibas.numbers.valueOf(c.baseDocumentLineId)
                        );
                        if (target.length > 0) {
                            closedTargets.add(target);
                        }
                    }
                }
                callback(closedTargets);
            }
            /** 转为交货事件 */
            protected async releasedTurnToDelivery(serviceAgent: ibas.IServiceAgent, selecteds: ibas.IList<bo.PickListsLine | bo.PickLists>): Promise<void> {
                let datas: ibas.IList<bo.PickListsLine> = new ibas.ArrayList();
                for (const selected of selecteds) {
                    if (selected instanceof bo.PickLists) {
                        datas.add(selected.pickListsLines.filter(c => c.pickStatus === bo.emPickStatus.RELEASED));
                    } else {
                        datas.add(selected);
                    }
                }
                if (!!datas.firstOrDefault(c => !(ibas.numbers.valueOf(c.inventoryQuantity) > 0))) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_msg_release_picklists_need_quantity"));
                    return;
                }
                for (const data of datas) {
                    data.pickQuantity = data.inventoryQuantity;
                }
                await this.turnToDelivery(serviceAgent, datas);
            }
            /** 转为交货事件 */
            protected async pickedTurnToDelivery(serviceAgent: ibas.IServiceAgent, selecteds: ibas.IList<bo.PickListsLine | bo.PickLists>): Promise<void> {
                let datas: ibas.IList<bo.PickListsLine> = new ibas.ArrayList();
                for (const selected of selecteds) {
                    if (selected instanceof bo.PickLists) {
                        datas.add(selected.pickListsLines.filter(c => c.pickStatus === bo.emPickStatus.RELEASED));
                    } else {
                        datas.add(selected);
                    }
                }
                if (!!datas.firstOrDefault(c => !(ibas.numbers.valueOf(c.pickQuantity) > 0))) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_msg_release_picklists_need_quantity"));
                    return;
                }
                await this.turnToDelivery(serviceAgent, datas);
            }
            protected async turnToDelivery(serviceAgent: ibas.IServiceAgent, datas: ibas.IList<bo.PickListsLine>, autoSave: boolean = true): Promise<Array<bo.IPickListsLine>> {
                let deliveryDescription: string = serviceAgent.description;
                if (deliveryDescription?.indexOf(",") > -1) {
                    let descs: string[] = deliveryDescription.split(",");
                    deliveryDescription = descs[1];
                }
                if (datas.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        deliveryDescription
                    ));
                    return [];
                }
                let promise: Promise<Array<bo.IPickListsLine>> = new Promise<Array<bo.IPickListsLine>>(resolve => {
                    let hasRunned: boolean = false;
                    for (let srvAgent of ibas.servicesManager.getServices({
                        proxy: new MaterialPackingTargetServiceProxy({
                            onDelivered: async (closedLines) => {
                                if (closedLines instanceof Error) {
                                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_action_is_blocked", closedLines.message));
                                } else {
                                    if (autoSave) {
                                        let beSaveds: ibas.ArrayList<bo.PickLists> = new ibas.ArrayList();
                                        for (const closedLine of closedLines) {
                                            let beSaved: bo.PickLists = beSaveds.firstOrDefault(c => c.objectKey === closedLine.objectKey);
                                            if (!beSaved) {
                                                continue;
                                            }
                                            beSaved = this.pickListsDatas.firstOrDefault(c => c.objectKey === closedLine.objectKey);
                                            if (!beSaved) {
                                                continue;
                                            }
                                            beSaveds.add(beSaved);
                                        }
                                        for (const beSaved of beSaveds) {
                                            try {
                                                let savedData: bo.PickLists = await this.saveData(beSaved);
                                                if (!!savedData && this.pickListsDatas.indexOf(beSaved) > -1) {
                                                    this.pickListsDatas[this.pickListsDatas.indexOf(beSaved)] = savedData;
                                                }
                                            } catch (error) {
                                                this.proceeding(ibas.emMessageType.WARNING, error.message);
                                            }
                                        }
                                        this.view.showPickListsData(this.pickListsDatas);
                                        resolve([]);
                                    } else {
                                        resolve(closedLines);
                                    }
                                }
                            },
                            toDelivery: datas
                        })
                    })) {
                        if (srvAgent.id === serviceAgent.id) {
                            hasRunned = true;
                            srvAgent.run();
                        }
                    }
                    if (!hasRunned) {
                        resolve([]);
                    }
                });
                return promise;
            }
            protected async saveDatas(): Promise<void> {
                try {
                    this.busy(true);
                    for (const pickListsData of this.pickListsDatas) {
                        if (!pickListsData.isDirty) {
                            continue;
                        }
                        await this.saveData(pickListsData);
                    }
                    this.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                } catch (error) {
                    this.messages(error);
                }
                this.busy(false);
            }
            /** 保存数据 */
            protected async saveData(pickLists: bo.PickLists): Promise<bo.PickLists> {
                let that: this = this;
                let promise: Promise<bo.PickLists> = new Promise<bo.PickLists>((resolve, reject) => {
                    let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                    boRepository.savePickLists({
                        beSaved: pickLists,
                        onCompleted(opRslt: ibas.IOperationResult<bo.PickLists>): void {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                resolve(opRslt.resultObjects.firstOrDefault());
                            } catch (error) {
                                reject(error);
                            }
                        }
                    });
                    this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
                });
                return promise;
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
                for (const code of itemCodes) {
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
        /** 应用-拣配清单 */
        export interface IPickListsView extends ibas.IView {
            /** 保存数据事件 */
            saveDatasEvent: Function;
            /** 显示数据 */
            showWorkingData(data: PickListsWorking): void;
            /** 显示拣配者 */
            showPickers(datas: ibas.IServiceAgent[]): void;
            /** 查询处理中数据事件 */
            fetchProcessingDataEvent: Function;
            /** 显示处理中数据 */
            showProcessingData(datas: IPickListsTarget[]): void;
            /** 显示拣配清单 */
            showPickListsData(data: bo.PickLists[]): void;
            /** 下达拣配清单事件 */
            releasePickListsEvent: Function;
            /** 转为交货事件 */
            processingTurnToDeliveryEvent: Function;
            /** 转为交货事件 */
            releasedTurnToDeliveryEvent: Function;
            /** 转为交货事件 */
            pickedTurnToDeliveryEvent: Function;
        }
        /** 应用-拣配清单 设置 */
        export class PickListsSettingApp extends ibas.Application<IPickListsSettingView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "e868bf1a-7e4d-4656-9446-1f46c453a0f2";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_picklists_setting";
            /** 构造函数 */
            constructor() {
                super();
                this.id = PickListsSettingApp.APPLICATION_ID;
                this.name = PickListsSettingApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.confirmEvent = this.confirm;
            }
            protected workingData: PickListsWorking;
            protected warehouses: ibas.IList<materials.bo.Warehouse>;
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (ibas.objects.isNull(this.workingData)) {
                    this.workingData = new PickListsWorking();
                }
                this.view.showWorkingData(this.workingData);
                this.fetchWarehouse();
            }
            /** 确认 */
            protected confirm(datas: ibas.IList<materials.bo.Warehouse>): void {
                let unSelectedWarehouses: string = this.warehouses?.filter(c =>
                    ibas.objects.isNull(datas.find(w => ibas.strings.equals(c.code, w.code)))
                ).join(",");
                this.workingData.unSelectedWarehouses = ibas.strings.valueOf(unSelectedWarehouses);
                let app: PickListsApp = new PickListsApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.workingData);
                this.close();
            }
            /** 查询仓库 */
            protected fetchWarehouse(isNew: boolean = true): void {
                this.busy(true);
                let that: this = this;
                let boRepository: materials.bo.BORepositoryMaterials = new materials.bo.BORepositoryMaterials();
                boRepository.fetchWarehouse({
                    criteria: materials.app.conditions.warehouse.create(),
                    onCompleted(opRslt: ibas.IOperationResult<materials.bo.Warehouse>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.warehouses = opRslt.resultObjects;
                            that.view.showWarehouse(that.warehouses);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
        }
        /** 应用-拣配清单 设置 */
        export interface IPickListsSettingView extends ibas.IView {
            /** 确认事件 */
            confirmEvent: Function;
            /** 显示数据 */
            showWorkingData(data: PickListsWorking): void;
            /** 显示仓库 */
            showWarehouse(datas: materials.bo.Warehouse[]): void;
        }
    }
}