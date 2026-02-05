/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 编辑应用-物料 */
        export class MaterialEditApp extends ibas.BOEditApplication<IMaterialEditView, bo.Material> {
            /** 应用标识 */
            static APPLICATION_ID: string = "2e111fbc-ecb0-477f-bdeb-894cefa6f96d";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_material_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Material.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialEditApp.APPLICATION_ID;
                this.name = MaterialEditApp.APPLICATION_NAME;
                this.boCode = MaterialEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.chooseMaterialWarehouseEvent = this.chooseMaterialWarehouse;
                this.view.chooseMaterialGroupEvent = this.chooseMaterialGroup;
                this.view.chooseMaterialUOMEvent = this.chooseMaterialUOM;
                this.view.uploadPictureEvent = this.uploadPicture;
                this.view.editMaterialUnitRateEvent = this.editMaterialUnitRate;
                this.view.chooseMaterialScrapEvent = this.chooseMaterialScrap;
                this.view.chooseSchedulerEvent = this.chooseScheduler;
                this.view.editMaterialSubstituteEvent = this.editMaterialSubstitute;
                this.view.chooseLedgerAccountEvent = this.chooseLedgerAccount;
                this.view.overviewEvent = this.overview;
                this.view.closeExtendedViewEvent = this.closeExtendedView;
            }

            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                this.showMaterialsExtendedViews();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.Material();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                    // 通知扩展视图，编辑对象变化
                    for (let contract of this.extendedContracts) {
                        if (contract.dataChangeEvent instanceof Function) {
                            contract.dataChangeEvent({ reson: "CREATE", data: this.editData });
                        }
                    }
                }
                this.view.showMaterial(this.editData);
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.Material): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.Material)) {
                    let data: bo.Material = arguments[0];
                    // 新对象直接编辑
                    if (data.isNew) {
                        that.editData = data;
                        that.show();
                        // 通知扩展视图，编辑对象变化
                        for (let contract of that.extendedContracts) {
                            if (contract.dataChangeEvent instanceof Function) {
                                contract.dataChangeEvent({ reson: "FETCH", data: data });
                            }
                        }
                        return;
                    }
                    // 尝试重新查询编辑对象
                    let criteria: ibas.ICriteria = data.criteria();
                    if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                        // 有效的查询对象查询
                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        boRepository.fetchMaterial({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.Material>): void {
                                let data: bo.Material;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.Material)) {
                                    // 查询到了有效数据
                                    that.editData = data;
                                    that.show();
                                    // 通知扩展视图，编辑对象变化
                                    if (that.extendedContracts instanceof Array) {
                                        for (let contract of that.extendedContracts) {
                                            if (contract.dataChangeEvent instanceof Function) {
                                                contract.dataChangeEvent({ reson: "FETCH", data: data });
                                            }
                                        }
                                    }
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
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.saveMaterial({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Material>): void {
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
                                if (that.extendedSettings instanceof Array) {
                                    for (let item of that.extendedSettings) {
                                        item.targetCode = that.editData.objectCode;
                                        item.targetKeys = that.editData.code;
                                    }
                                }
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                            }
                            // 通知扩展视图，编辑保存
                            for (let contract of that.extendedContracts) {
                                if (contract.dataSavingEvent instanceof Function) {
                                    contract.dataSavingEvent({ reson: that.editData ? "SAVE" : "DELETE", data: that.editData });
                                }
                            }
                            // 保存扩展设置
                            if (that.extendedSettings instanceof Array) {
                                ibas.queues.execute(that.extendedSettings.filter(c => c.isDirty),
                                    (data, next) => {
                                        boRepository.saveMaterialsExtendedSetting({
                                            beSaved: data,
                                            onCompleted: (opRslt) => {
                                                if (opRslt.resultCode !== 0) {
                                                    next(new Error(opRslt.message));
                                                } else {
                                                    let index: number = that.extendedSettings.indexOf(data);
                                                    if (index >= 0) {
                                                        if (opRslt.resultObjects.length === 0) {
                                                            that.extendedSettings.removeAt(index);
                                                        } else {
                                                            that.extendedSettings[index] = opRslt.resultObjects.firstOrDefault();
                                                        }
                                                    } next();
                                                }
                                            }
                                        });
                                    },
                                    (error) => {
                                        if (error instanceof Error) {
                                            that.messages(error);
                                        }
                                        // 刷新当前视图
                                        that.viewShowed();
                                    }
                                );
                            } else {
                                // 刷新当前视图
                                that.viewShowed();
                            }
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
                            if (that.extendedSettings instanceof Array) {
                                for (let item of that.extendedSettings) {
                                    if (item.isNew) {
                                        that.extendedSettings.remove(item);
                                    } else {
                                        item.delete();
                                    }
                                }
                            }
                            // 通知扩展视图，编辑对象变化
                            for (let contract of that.extendedContracts) {
                                if (contract.dataChangeEvent instanceof Function) {
                                    contract.dataChangeEvent({ reson: "DELETE", data: that.editData });
                                }
                            }
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
                        if (that.extendedSettings instanceof Array) {
                            for (let item of that.extendedSettings) {
                                item.reset();
                            }
                        }
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_cloned_new"));
                        // 通知扩展视图，编辑对象变化
                        for (let contract of that.extendedContracts) {
                            if (contract.dataChangeEvent instanceof Function) {
                                contract.dataChangeEvent({ reson: "CLONE", data: that.editData });
                            }
                        }
                        that.viewShowed();
                    } else {
                        // 新建对象
                        that.editData = new bo.Material();
                        that.extendedSettings = undefined;
                        // 通知扩展视图，编辑对象变化
                        for (let contract of that.extendedContracts) {
                            if (contract.dataChangeEvent instanceof Function) {
                                contract.dataChangeEvent({ reson: "CREATE", data: that.editData });
                            }
                        }
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
            }

            /** 选择物料缺省仓库事件 */
            private chooseMaterialWarehouse(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.Warehouse>({
                    boCode: bo.Warehouse.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.Warehouse.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<bo.Warehouse>): void {
                        let selected: bo.Warehouse = selecteds.firstOrDefault();
                        that.editData.defaultWarehouse = selected.code;
                    }
                });
            }
            /** 选择物料组事件 */
            private chooseMaterialGroup(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.MaterialGroup>({
                    boCode: bo.MaterialGroup.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.MaterialGroup.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES),
                        new ibas.Condition(bo.MaterialGroup.PROPERTY_PHANTOM_NAME, ibas.emConditionOperation.NOT_EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<bo.MaterialGroup>): void {
                        let selected: bo.MaterialGroup = selecteds.firstOrDefault();
                        that.editData.group = selected.code;
                        // 加载物料组扩展设置
                        if (that.extendedSettings instanceof Array && that.extendedSettings.length > 0) {
                            let criteria: ibas.ICriteria = new ibas.Criteria();
                            let condition: ibas.ICondition = criteria.conditions.create();
                            condition.alias = bo.MaterialsExtendedSetting.PROPERTY_TARGETCODE_NAME;
                            condition.value = selected.objectCode;
                            condition = criteria.conditions.create();
                            condition.alias = bo.MaterialsExtendedSetting.PROPERTY_TARGETKEYS_NAME;
                            condition.value = selected.code;
                            let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                            boRepository.fetchMaterialsExtendedSetting({
                                criteria: criteria,
                                onCompleted: (opRslt) => {
                                    for (let setting of that.extendedSettings) {
                                        for (let item of opRslt.resultObjects) {
                                            if (item.element === setting.element) {
                                                setting.enabled = item.enabled;
                                                break;
                                            }
                                        }
                                    }
                                    for (let setting of that.extendedSettings) {
                                        for (let contract of that.extendedContracts) {
                                            if (contract.id === setting.element) {
                                                if (setting.enabled === ibas.emYesNo.YES) {
                                                    if (contract.showViewEvent instanceof Function) {
                                                        contract.showViewEvent();
                                                    }
                                                } else {
                                                    if (contract.closeViewEvent instanceof Function) {
                                                        contract.closeViewEvent();
                                                    }
                                                } break;
                                            }
                                        }
                                    }
                                    that.view.showExtendedSettings(that.extendedSettings);
                                }
                            }); return;
                        }
                    }
                });
            }
            /** 上传图片事件 */
            private uploadPicture(formData: FormData): void {
                let that: this = this;
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_uploading_file"));
                this.busy(true);
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.upload({
                    fileData: formData,
                    onCompleted(opRslt: ibas.IOperationResult<ibas.FileItem>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.proceeding(ibas.emMessageType.INFORMATION,
                                ibas.i18n.prop("shell_upload") + ibas.i18n.prop("shell_sucessful"));
                            let fileData: ibas.FileItem = opRslt.resultObjects.firstOrDefault();
                            that.editData.picture = fileData.name;
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            /** 选择物料组事件 */
            private chooseMaterialUOM(type: string): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.Unit>({
                    boCode: bo.Unit.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.Unit.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<bo.Unit>): void {
                        let selected: bo.Unit = selecteds.firstOrDefault();
                        if (type === bo.Material.PROPERTY_INVENTORYUOM_NAME) {
                            that.editData.inventoryUOM = selected.name;
                        } else if (type === bo.Material.PROPERTY_PURCHASEUOM_NAME) {
                            that.editData.purchaseUOM = selected.name;
                        } else if (type === bo.Material.PROPERTY_SALESUOM_NAME) {
                            that.editData.salesUOM = selected.name;
                        } else if (type === bo.Material.PROPERTY_PRODUCTIONUOM_NAME) {
                            that.editData.productionUOM = selected.name;
                        }
                    }
                });
            }
            /** 编辑单位换算 */
            private editMaterialUnitRate(): void {
                let app: UnitRateEditListApp = new UnitRateEditListApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.editData);
            }
            /** 选择物废品率事件 */
            private chooseMaterialScrap(type: string): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.MaterialScrap>({
                    boCode: bo.MaterialScrap.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.MaterialScrap.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<bo.MaterialScrap>): void {
                        let selected: bo.MaterialScrap = selecteds.firstOrDefault();
                        that.editData.scrap = selected.name;
                        that.editData.scrapRate = 0;
                        that.editData.scrapValue = 0;
                    }
                });
            }
            /** 选择计划员事件 */
            private chooseScheduler(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<initialfantasy.bo.User>({
                    boCode: initialfantasy.bo.User.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.MaterialScrap.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<initialfantasy.bo.User>): void {
                        let selected: initialfantasy.bo.User = selecteds.firstOrDefault();
                        that.editData.scheduler = selected.code;
                    }
                });
            }
            /** 编辑物料替代事件 */
            private editMaterialSubstitute(): void {
                let app: MaterialSubstituteEditApp = new MaterialSubstituteEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.editData);
            }
            /** 选择总账科目事件 */
            private chooseLedgerAccount(): void {
                if (ibas.objects.isNull(this.editData) || this.editData.isDirty) {
                    throw new Error(ibas.i18n.prop("shell_data_saved_first"));
                }
                ibas.servicesManager.runApplicationService<accounting.app.ILedgerAccountSettingContract>({
                    proxy: new accounting.app.LedgerAccountSettingServiceProxy({
                        objectCode: this.editData.objectCode,
                        description: ibas.strings.format("{0} - {1}", this.editData.code, this.editData.name),
                        settings: {
                            category: ibas.objects.nameOf(this.editData),
                            conditions: [
                                new ibas.Condition(accounting.app.emLedgerAccountConditionProperty.Material, ibas.emConditionOperation.EQUAL, this.editData.code)
                            ]
                        }
                    }),
                });
            }
            /** 物料总揽事件 */
            protected overview(): void {
                let app: MaterialOverviewApp = new MaterialOverviewApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.editData.criteria());
            }
            private extendedContracts: ibas.IList<IMaterialEditExtendedContract> = undefined;
            private extendedSettings: ibas.IList<bo.MaterialsExtendedSetting>;
            /** 加载物料扩展设置 */
            protected showMaterialsExtendedViews(): void {
                if (!(this.extendedSettings instanceof Array)) {
                    if (this.editData?.isNew === false) {
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.MaterialsExtendedSetting.PROPERTY_TARGETCODE_NAME;
                        condition.value = this.editData.objectCode;
                        condition = criteria.conditions.create();
                        condition.alias = bo.MaterialsExtendedSetting.PROPERTY_TARGETKEYS_NAME;
                        condition.value = this.editData.code;
                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        boRepository.fetchMaterialsExtendedSetting({
                            criteria: criteria,
                            onCompleted: (opRslt) => {
                                try {
                                    if (opRslt.resultCode !== 0) {
                                        throw new Error(opRslt.message);
                                    }
                                    this.extendedSettings = opRslt.resultObjects;
                                    this.showMaterialsExtendedViews();
                                } catch (error) {
                                    this.messages(error);
                                }
                            }
                        }); return;
                    } else {
                        this.extendedSettings = new ibas.ArrayList<any>();
                    }
                }
                // 初始化扩展
                let serviceAgents: ibas.IServiceAgent[] = ibas.servicesManager.getServices({
                    proxy: new MaterialEditExtendedServiceProxy({
                        /** 标识 */
                        id: undefined,
                        /** 数据改变 */
                        dataChangeEvent(event: { reson: "CREATE" | "CLONE" | "FETCH" | "DELETE", data: bo.IMaterial }): void { },
                        /** 数据保存 */
                        dataSavingEvent(event: { data: bo.IMaterial }): void { },
                    })
                });
                if (serviceAgents?.length > 0) {
                    for (let agent of serviceAgents) {
                        let setting: bo.MaterialsExtendedSetting = this.extendedSettings.find(c => c.element === agent.id);
                        if (ibas.objects.isNull(setting)) {
                            setting = new bo.MaterialsExtendedSetting();
                            setting.element = agent.id;
                            setting.description = agent.description;
                            setting.targetCode = this.editData?.objectCode;
                            setting.targetKeys = this.editData?.code;
                            this.extendedSettings.add(setting);
                        }
                    }
                    this.view.showExtendedSettings(this.extendedSettings);

                    if (!(this.extendedContracts instanceof Array)) {
                        this.extendedContracts = new ibas.ArrayList<any>();
                        for (let agent of serviceAgents) {
                            let serviceMapping: ibas.IServiceMapping = ibas.servicesManager.getServiceMapping(agent.id);
                            if (ibas.objects.isNull(serviceMapping)) {
                                continue;
                            }
                            let service: ibas.IService<ibas.IServiceContract> = serviceMapping.create();
                            if (ibas.objects.isNull(service)) {
                                continue;
                            }
                            // 初始化服务
                            if (service instanceof ibas.Application) {
                                let that: this = this;
                                service.navigation = serviceMapping.navigation;
                                service.viewShower = {
                                    show(view: ibas.IView): void {
                                        that.view.showExtendedView(view);
                                        if (view instanceof ibas.View) {
                                            view.isDisplayed = true;
                                        }
                                    },
                                    destroy(view: ibas.IView): void {
                                        if (view instanceof ibas.View) {
                                            view.isDisplayed = false;
                                        }
                                    },
                                    busy(view: ibas.IView, busy: boolean, msg: string): void {
                                        that.viewShower.busy(view, busy, msg);
                                    },
                                    proceeding(view: ibas.IView, type: ibas.emMessageType, msg: string): void {
                                        that.viewShower.proceeding(view, type, msg);
                                    },
                                    messages(caller: ibas.IMessgesCaller): void {
                                        that.viewShower.messages(caller);
                                    },
                                };
                            }
                            // 运行服务
                            let contract: IMaterialEditExtendedContract = {
                                /** 标记 */
                                id: serviceMapping.id,
                                /** 数据改变 */
                                dataChangeEvent(event: { reson: "CREATE" | "CLONE" | "FETCH" | "DELETE", data: bo.IMaterial }): void { },
                                /** 数据保存 */
                                dataSavingEvent(event: { data: bo.IMaterial }): void { },
                            };
                            this.extendedContracts.add(contract);
                            service.run({ proxy: new MaterialEditExtendedServiceProxy(contract) });
                            if (contract.dataChangeEvent instanceof Function && !ibas.objects.isNull(this.editData)) {
                                contract.dataChangeEvent({ reson: this.editData?.isNew ? "CREATE" : "FETCH", data: this.editData });
                            }
                            for (let setting of this.extendedSettings) {
                                if (setting.element === contract.id) {
                                    if (setting.enabled === ibas.emYesNo.YES) {
                                        if (contract.showViewEvent instanceof Function) {
                                            contract.showViewEvent();
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (!(this.extendedContracts instanceof Array)) {
                        this.extendedContracts = new ibas.ArrayList<any>();
                    }
                }
            }
            /** 关闭扩展视图 */
            private closeExtendedView(id: string, closed: boolean): void {
                if (this.extendedContracts instanceof Array) {
                    for (let contract of this.extendedContracts) {
                        if (contract.id !== id) {
                            continue;
                        }
                        if (closed) {
                            if (contract.closeViewEvent instanceof Function) {
                                contract.closeViewEvent();
                            }
                        } else {
                            if (contract.showViewEvent instanceof Function) {
                                contract.showViewEvent();
                            }
                        }
                    }
                }
            }
        }
        /** 视图-物料 */
        export interface IMaterialEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showMaterial(data: bo.Material): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择物料缺省仓库事件 */
            chooseMaterialWarehouseEvent: Function;
            /** 选择物料组事件 */
            chooseMaterialGroupEvent: Function;
            /** 上传图片事件 */
            uploadPictureEvent: Function;
            /** 选择物料单位事件 */
            chooseMaterialUOMEvent: Function;
            /** 编辑物料单位换算率事件 */
            editMaterialUnitRateEvent: Function;
            /** 选择物废品率事件 */
            chooseMaterialScrapEvent: Function;
            /** 选择计划员事件 */
            chooseSchedulerEvent: Function;
            /** 编辑物料替代事件 */
            editMaterialSubstituteEvent: Function;
            /** 选择总账科目事件 */
            chooseLedgerAccountEvent: Function;
            /** 更多信息 */
            overviewEvent: Function;
            /** 显示扩展视图 */
            showExtendedView(view: ibas.IView): void;
            /** 关闭扩展视图 */
            closeExtendedViewEvent: Function;
            /** 显示扩展设置 */
            showExtendedSettings(datas: bo.MaterialsExtendedSetting[]): void;
        }
    }
}