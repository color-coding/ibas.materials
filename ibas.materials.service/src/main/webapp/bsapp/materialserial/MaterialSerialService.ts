/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { IMaterialSerialItem, IMaterialSerial } from "../../api/bo/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";
/** 物料序列号服务 */
abstract class MaterialSerialService<T extends IMaterialSerialServiceView>
    extends ibas.ServiceApplication<T, bo.IMaterialSerialContract[]> {
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.changeWorkingDataEvent = this.changeWorkingData;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showWorkDatas(this.workDatas);
    }
    protected workDatas: ibas.List<bo.IMaterialSerialContract>;
    protected workingData: bo.IMaterialSerialContract;
    /** 运行服务 */
    runService(contracts: bo.IMaterialSerialContract[]): void {
        this.workDatas = new ibas.ArrayList<bo.IMaterialSerialContract>();
        for (let item of contracts) {
            if (ibas.objects.isNull(item)) {
                continue;
            }
            if (item.serialManagement !== ibas.emYesNo.YES) {
                continue;
            }
            this.workDatas.add(item);
        }
        if (this.workDatas.length > 0) {
            super.show();
        } else {
            // 没有需要处理的数据
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_work_datas_for_material_serial"));
        }
    }
    protected changeWorkingData(data: bo.IMaterialSerialContract): void {
        if (!this.workDatas.concat(data)) {
            throw new Error(ibas.i18n.prop("sys_invalid_parameter", "data"));
        }
        this.workingData = data;
        if (ibas.objects.isNull(this.workingData)) {
            throw new Error(ibas.i18n.prop("sys_invalid_parameter", "workingData"));
        }
        this.view.showMaterialSerialItems(this.workingData.materialSerials.filterDeleted());
    }
}
/** 物料序列号发货服务 */
export class MaterialSerialIssueService extends MaterialSerialService<IMaterialSerialIssueView> {
    /** 应用标识 */
    static APPLICATION_ID: string = "a8542551-c39a-4e11-abbc-cfa9eff6de8b";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialserial_issue";
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialIssueService.APPLICATION_ID;
        this.name = MaterialSerialIssueService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.useMaterialSerialInventoryEvent = this.useMaterialSerialInventory;
        this.view.removeMaterialSerialItemEvent = this.removeMaterialSerialItem;
    }
    protected changeWorkingData(data: bo.IMaterialSerialContract): void {
        super.changeWorkingData(data);
        let that: this = this;
        let criteria: ibas.ICriteria = new ibas.Criteria();
        let condition: ibas.ICondition = criteria.conditions.create();
        condition.alias = bo.MaterialSerial.PROPERTY_ITEMCODE_NAME;
        condition.operation = ibas.emConditionOperation.EQUAL;
        condition.value = this.workingData.itemCode;
        condition = criteria.conditions.create();
        condition.alias = bo.MaterialSerial.PROPERTY_WAREHOUSE_NAME;
        condition.operation = ibas.emConditionOperation.EQUAL;
        condition.value = this.workingData.warehouse;
        condition = criteria.conditions.create();
        condition.alias = bo.MaterialSerial.PROPERTY_LOCKED_NAME;
        condition.operation = ibas.emConditionOperation.EQUAL;
        condition.value = ibas.emYesNo.NO.toString();
        condition = criteria.conditions.create();
        condition.alias = bo.MaterialSerial.PROPERTY_INSTOCK_NAME;
        condition.operation = ibas.emConditionOperation.EQUAL;
        condition.value = ibas.emYesNo.YES.toString();
        this.busy(true);
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialSerial({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSerial>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    let results: ibas.ArrayList<bo.MaterialSerial> = new ibas.ArrayList<bo.MaterialSerial>();
                    // 修正可用的数量
                    for (let item of opRslt.resultObjects) {
                        for (let wItem of that.workDatas) {
                            for (let jItem of wItem.materialSerials) {
                                if (item.warehouse !== jItem.warehouse) {
                                    continue;
                                }
                                if (item.itemCode !== jItem.itemCode) {
                                    continue;
                                }
                                if (item.serialCode !== jItem.serialCode) {
                                    continue;
                                }
                                if (item.isDeleted) {
                                    // 已释放的加回
                                    item.inStock = ibas.emYesNo.YES;
                                } else {
                                    // 已被使用的减去
                                    item.inStock = ibas.emYesNo.NO;
                                }
                            }
                        }
                        if (item.inStock === ibas.emYesNo.YES) {
                            results.add(item);
                        }
                    }
                    // 显示可用结果
                    that.view.showMaterialSerialInventories(results);
                    if (opRslt.resultObjects.length === 0) {
                        that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                    }
                    that.busy(false);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }
    protected useMaterialSerialInventory(data: IMaterialSerial): void {
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data"));
            return;
        }
        if (ibas.objects.isNull(this.workingData)) {
            throw new Error(ibas.i18n.prop("sys_invalid_parameter", "workingData"));
        }
        let total: number = this.workingData.materialSerials.total();
        if (total >= this.workingData.quantity) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("materials_no_data_to_be_processed"));
            return;
        }
        let journal: IMaterialSerialItem = this.workingData.materialSerials.create();
        this.view.showMaterialSerialItems(this.workingData.materialSerials.filterDeleted());
    }
    protected removeMaterialSerialItem(data: IMaterialSerialItem): void {
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data"));
            return;
        }
        if (ibas.objects.isNull(this.workingData)) {
            throw new Error(ibas.i18n.prop("sys_invalid_parameter", "workingData"));
        }
        if (data.isNew) {
            this.workingData.materialSerials.remove(data);
        } else {
            data.delete();
        }
        this.view.showMaterialSerialItems(this.workingData.materialSerials.filterDeleted());
    }
}
/** 物料序列号收货服务 */
export class MaterialSerialReceiptService extends MaterialSerialService<IMaterialSerialReceiptView> {
    /** 应用标识 */
    static APPLICATION_ID: string = "ff8f4173-77f6-4f92-bfc5-697e6d8ff545";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialserial_receipt";
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialReceiptService.APPLICATION_ID;
        this.name = MaterialSerialReceiptService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.createMaterialSerialItemEvent = this.createMaterialSerialItem;
        this.view.deleteMaterialSerialItemEvent = this.deleteMaterialSerialItem;
    }
    protected deleteMaterialSerialItem(data: IMaterialSerialItem): void {
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data"));
            return;
        }
        if (ibas.objects.isNull(this.workingData)) {
            throw new Error(ibas.i18n.prop("sys_invalid_parameter", "workingData"));
        }
        if (data.isNew) {
            this.workingData.materialSerials.remove(data);
        } else {
            data.delete();
        }
        this.view.showMaterialSerialItems(this.workingData.materialSerials.filterDeleted());
    }
    protected createMaterialSerialItem(): void {
        let datas: ibas.List<bo.IMaterialSerialContract> = new ibas.ArrayList<bo.IMaterialSerialContract>();
        if (ibas.objects.isNull(this.workingData)) {
            // 没有工作的，全部创建
            for (let item of this.workDatas) {
                if (item.quantity === item.materialSerials.total()) {
                    continue;
                }
                datas.add(item);
            }
        } else {
            // 仅创建工作的
            datas.add(this.workingData);
        }
        let journals: ibas.List<IMaterialSerialItem> = new ibas.ArrayList<IMaterialSerialItem>();
        for (let item of datas) {
            let total: number = item.materialSerials.total();
            if (total >= item.quantity) {
                continue;
            }
            let journal: IMaterialSerialItem = item.materialSerials.create();
            journal.serialCode = ibas.dates.toString(ibas.dates.now(), "yyyyMMdd");
            journals.add(journal);
        }
        this.view.showMaterialSerialItems(journals);
    }
}
/** 视图-物料序列号服务 */
export interface IMaterialSerialServiceView extends ibas.IBOView {
    /** 显示待处理数据 */
    showWorkDatas(datas: bo.IMaterialSerialContract[]): void;
    /** 切换工作数据 */
    changeWorkingDataEvent: Function;
    /** 显示物料序列号记录 */
    showMaterialSerialItems(datas: IMaterialSerialItem[]): void;
}
/** 视图-物料序列号发货 */
export interface IMaterialSerialIssueView extends IMaterialSerialServiceView {
    /** 显示物料序列号库存 */
    showMaterialSerialInventories(datas: bo.MaterialSerial[]): void;
    /** 使用物料序列号库存 */
    useMaterialSerialInventoryEvent: Function;
    /** 移出物料序列号库存 */
    removeMaterialSerialItemEvent: Function;
}
/** 视图-物料序列号收货 */
export interface IMaterialSerialReceiptView extends IMaterialSerialServiceView {
    /** 创建序列号记录 */
    createMaterialSerialItemEvent: Function;
    /** 删除物料序列号库存 */
    deleteMaterialSerialItemEvent: Function;
}
/** 物料序列号发货服务映射 */
export class MaterialSerialIssueServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialIssueService.APPLICATION_ID;
        this.name = MaterialSerialIssueService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = bo.MaterialSerialIssueServiceProxy;
    }
    /** 创建服务实例 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new MaterialSerialIssueService();
    }
}
/** 物料序列号收货服务映射 */
export class MaterialSerialReceiptServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialSerialReceiptService.APPLICATION_ID;
        this.name = MaterialSerialReceiptService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = bo.MaterialSerialReceiptServiceProxy;
    }
    /** 创建服务实例 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new MaterialSerialReceiptService();
    }
}

