/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import {
    emYesNo,
    emDocumentStatus,
    emBOStatus,
    emDirection,
    emApprovalStatus,
    IBOSimple,
    IBusinessObject,
    IBODocumentLine,
    IBusinessObjects,
    BusinessObject,
    BusinessObjects,
    BOMasterData,
    BOMasterDataLine,
    BODocument,
    BODocumentLine,
    BOSimple,
    BOSimpleLine,
    config,
    strings,
    IBODocumentLines,
    BO_PROPERTY_NAME_LINESTATUS,
    BO_PROPERTY_NAME_OBJECTCODE,
    BO_PROPERTY_NAME_DOCENTRY,
    BO_PROPERTY_NAME_LINEID
} from "ibas/index";
import {
    BO_CODE_MATERIALBATCHJOURNAL,
} from "../Datas";
import {
    IMaterialBatchJournal,
    IMaterialBatchJournals,
    IMaterialBatchJournalsParent,
} from "./MaterialBatchJournal.d";
/** 物料批次记录 */
export class MaterialBatchJournal extends BOSimple<MaterialBatchJournal> implements IMaterialBatchJournal {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALBATCHJOURNAL;
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialBatchJournal.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialBatchJournal.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-批次编号 */
    static PROPERTY_BATCH_NAME: string = "BatchCode";
    /** 获取-批次编号 */
    get batchCode(): string {
        return this.getProperty<string>(MaterialBatchJournal.PROPERTY_BATCH_NAME);
    }
    /** 设置-批次编号 */
    set batchCode(value: string) {
        this.setProperty(MaterialBatchJournal.PROPERTY_BATCH_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialBatchJournal.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialBatchJournal.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-单据状态 */
    static PROPERTY_LINESTATUS_NAME: string = "LineStatus";
    /** 获取-单据状态 */
    get lineStatus(): emDocumentStatus {
        return this.getProperty<emDocumentStatus>(MaterialBatchJournal.PROPERTY_LINESTATUS_NAME);
    }
    /** 设置-单据状态 */
    set lineStatus(value: emDocumentStatus) {
        this.setProperty(MaterialBatchJournal.PROPERTY_LINESTATUS_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-仓库编号 */
    get direction(): emDirection {
        return this.getProperty<emDirection>(MaterialBatchJournal.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-仓库编号 */
    set direction(value: emDirection) {
        this.setProperty(MaterialBatchJournal.PROPERTY_DIRECTION_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(MaterialBatchJournal.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(MaterialBatchJournal.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-锁定 */
    static PROPERTY_LOCKED_NAME: string = "Locked";
    /** 获取-锁定 */
    get locked(): emYesNo {
        return this.getProperty<emYesNo>(MaterialBatchJournal.PROPERTY_LOCKED_NAME);
    }
    /** 设置-锁定 */
    set locked(value: emYesNo) {
        this.setProperty(MaterialBatchJournal.PROPERTY_LOCKED_NAME, value);
    }

    /** 映射的属性名称-供应商序号 */
    static PROPERTY_SUPPLIERSERIAL_NAME: string = "SupplierSerial";
    /** 获取-供应商序号 */
    get supplierSerial(): string {
        return this.getProperty<string>(MaterialBatchJournal.PROPERTY_SUPPLIERSERIAL_NAME);
    }
    /** 设置-供应商序号 */
    set supplierSerial(value: string) {
        this.setProperty(MaterialBatchJournal.PROPERTY_SUPPLIERSERIAL_NAME, value);
    }

    /** 映射的属性名称-内部序号 */
    static PROPERTY_INTERNALSERIAL_NAME: string = "InternalSerial";
    /** 获取-内部序号 */
    get internalSerial(): string {
        return this.getProperty<string>(MaterialBatchJournal.PROPERTY_INTERNALSERIAL_NAME);
    }
    /** 设置-内部序号 */
    set internalSerial(value: string) {
        this.setProperty(MaterialBatchJournal.PROPERTY_INTERNALSERIAL_NAME, value);
    }

    /** 映射的属性名称-过期日期 */
    static PROPERTY_EXPIRATIONDATE_NAME: string = "ExpirationDate";
    /** 获取-过期日期 */
    get expirationDate(): Date {
        return this.getProperty<Date>(MaterialBatchJournal.PROPERTY_EXPIRATIONDATE_NAME);
    }
    /** 设置-过期日期 */
    set expirationDate(value: Date) {
        this.setProperty(MaterialBatchJournal.PROPERTY_EXPIRATIONDATE_NAME, value);
    }
    /** 映射的属性名称-生产日期 */
    static PROPERTY_MANUFACTURINGDATE_NAME: string = "ManufacturingDate";
    /** 获取-生产日期 */
    get manufacturingDate(): Date {
        return this.getProperty<Date>(MaterialBatchJournal.PROPERTY_MANUFACTURINGDATE_NAME);
    }
    /** 设置-生产日期 */
    set manufacturingDate(value: Date) {
        this.setProperty(MaterialBatchJournal.PROPERTY_MANUFACTURINGDATE_NAME, value);
    }
    /** 映射的属性名称-准入日期 */
    static PROPERTY_ADMISSIONDATE_NAME: string = "AdmissionDate";
    /** 获取-准入日期 */
    get admissionDate(): Date {
        return this.getProperty<Date>(MaterialBatchJournal.PROPERTY_ADMISSIONDATE_NAME);
    }
    /** 设置-准入日期 */
    set admissionDate(value: Date) {
        this.setProperty(MaterialBatchJournal.PROPERTY_ADMISSIONDATE_NAME, value);
    }
    /** 映射的属性名称-备注 */
    static PROPERTY_NOTES_NAME: string = "Notes";
    /** 获取-备注 */
    get notes(): string {
        return this.getProperty<string>(MaterialBatchJournal.PROPERTY_NOTES_NAME);
    }
    /** 设置-备注 */
    set notes(value: string) {
        this.setProperty(MaterialBatchJournal.PROPERTY_NOTES_NAME, value);
    }
    /** 映射的属性名称-基于类型 */
    static PROPERTY_BASEDOCUMENTTYPE_NAME: string = "BaseDocumentType";
    /** 获取-基于类型 */
    get baseDocumentType(): string {
        return this.getProperty<string>(MaterialBatchJournal.PROPERTY_BASEDOCUMENTTYPE_NAME);
    }
    /** 设置-基于类型 */
    set baseDocumentType(value: string) {
        this.setProperty(MaterialBatchJournal.PROPERTY_BASEDOCUMENTTYPE_NAME, value);
    }
    /** 映射的属性名称-基于标识 */
    static PROPERTY_BASEDOCUMENTENTRY_NAME: string = "BaseDocumentEntry";
    /** 获取-基于标识 */
    get baseDocumentEntry(): number {
        return this.getProperty<number>(MaterialBatchJournal.PROPERTY_BASEDOCUMENTENTRY_NAME);
    }
    /** 设置-基于标识 */
    set baseDocumentEntry(value: number) {
        this.setProperty(MaterialBatchJournal.PROPERTY_BASEDOCUMENTENTRY_NAME, value);
    }
    /** 映射的属性名称-基于行号 */
    static PROPERTY_BASEDOCUMENTLINEID_NAME: string = "BaseDocumentLineId";
    /** 获取-基于行号 */
    get baseDocumentLineId(): number {
        return this.getProperty<number>(MaterialBatchJournal.PROPERTY_BASEDOCUMENTLINEID_NAME);
    }
    /** 设置-基于行号 */
    set baseDocumentLineId(value: number) {
        this.setProperty(MaterialBatchJournal.PROPERTY_BASEDOCUMENTLINEID_NAME, value);
    }

    /** 映射的属性名称-对象编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(MaterialBatchJournal.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(MaterialBatchJournal.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(MaterialBatchJournal.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(MaterialBatchJournal.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(MaterialBatchJournal.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(MaterialBatchJournal.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(MaterialBatchJournal.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(MaterialBatchJournal.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(MaterialBatchJournal.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(MaterialBatchJournal.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(MaterialBatchJournal.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(MaterialBatchJournal.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-版本 */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-版本 */
    get logInst(): number {
        return this.getProperty<number>(MaterialBatchJournal.PROPERTY_LOGINST_NAME);
    }
    /** 设置-版本 */
    set logInst(value: number) {
        this.setProperty(MaterialBatchJournal.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-服务系列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(MaterialBatchJournal.PROPERTY_SERIES_NAME);
    }
    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(MaterialBatchJournal.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(MaterialBatchJournal.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(MaterialBatchJournal.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(MaterialBatchJournal.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(MaterialBatchJournal.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(MaterialBatchJournal.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(MaterialBatchJournal.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(MaterialBatchJournal.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(MaterialBatchJournal.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(MaterialBatchJournal.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(MaterialBatchJournal.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 初始化数据 */
    protected init(): void {
        this.objectCode = config.applyVariables(MaterialBatchJournal.BUSINESS_OBJECT_CODE);
    }
}

/** 物料批次记录集合 */
export class MaterialBatchJournals
    extends BusinessObjects<IMaterialBatchJournal, IMaterialBatchJournalsParent>
    implements IMaterialBatchJournals {

    /** 创建并添加子项 */
    create(): MaterialBatchJournal {
        let item: MaterialBatchJournal = new MaterialBatchJournal();
        this.add(item);
        return item;
    }
    afterAdd(item: MaterialBatchJournal): void {
        super.afterAdd(item);
        item.lineStatus = this.parent.lineStatus;
        item.baseDocumentType = this.parent.objectCode;
        item.baseDocumentEntry = this.parent.docEntry;
        item.baseDocumentLineId = this.parent.lineId;
    }
    /**
     * 父项单据行发生改变
     */
    onParentPropertyChanged(name: string): void {
        if (strings.equalsIgnoreCase(name, BO_PROPERTY_NAME_LINESTATUS)) {
            for (let item of this) {
                item.lineStatus = this.parent.lineStatus;
            }
        } else if (strings.equalsIgnoreCase(name, BO_PROPERTY_NAME_OBJECTCODE)) {
            for (let item of this) {
                item.baseDocumentType = this.parent.objectCode;
            }
        } else if (strings.equalsIgnoreCase(name, BO_PROPERTY_NAME_DOCENTRY)) {
            for (let item of this) {
                item.baseDocumentEntry = this.parent.docEntry;
            }
        } else if (strings.equalsIgnoreCase(name, BO_PROPERTY_NAME_LINEID)) {
            for (let item of this) {
                item.baseDocumentLineId = this.parent.lineId;
            }
        }
    }
}

