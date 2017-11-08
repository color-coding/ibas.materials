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
    emApprovalStatus,
    BusinessObject,
    BusinessObjects,
    BOMasterData,
    BOMasterDataLine,
    BODocument,
    BODocumentLine,
    BOSimple,
    BOSimpleLine,
    config,
} from "ibas/index";
import {
    IMaterialSerial,
    BO_CODE_MATERIALSERIAL,
    BO_CODE_RECEIPT_MATERIALSERIAL,
    BO_CODE_ISSUE_MATERIALSERIAL
} from "../../api/index";
export class MaterialSerial extends BOSimple<MaterialSerial> implements IMaterialSerial {
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALSERIAL;
    static BUSINESS_OBJECT_RECEIEPT_CODE: string = BO_CODE_RECEIPT_MATERIALSERIAL;
    static BUSINESS_OBJECT_ISSUE_CODE: string = BO_CODE_ISSUE_MATERIALSERIAL;
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialSerial.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(MaterialSerial.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-序列编号 */
    static PROPERTY_BATCH_NAME: string = "SerialCode";
    /** 获取-序列编号 */
    get serialCode(): string {
        return this.getProperty<string>(MaterialSerial.PROPERTY_BATCH_NAME);
    }
    /** 设置-序列编号 */
    set serialCode(value: string) {
        this.setProperty(MaterialSerial.PROPERTY_BATCH_NAME, value);
    }

    /** 映射的属性名称-仓库编号 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编号 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialSerial.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编号 */
    set warehouse(value: string) {
        this.setProperty(MaterialSerial.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-在仓库 */
    static PROPERTY_INSTOCK_NAME: string = "InStock";
    /** 获取-在仓库 */
    get inStock(): string {
        return this.getProperty<string>(MaterialSerial.PROPERTY_INSTOCK_NAME);
    }
    /** 设置-在仓库 */
    set inStock(value: string) {
        this.setProperty(MaterialSerial.PROPERTY_INSTOCK_NAME, value);
    }

    /** 映射的属性名称-锁定 */
    static PROPERTY_LOCKED_NAME: string = "Locked";
    /** 获取-锁定 */
    get locked(): emYesNo {
        return this.getProperty<emYesNo>(MaterialSerial.PROPERTY_LOCKED_NAME);
    }
    /** 设置-锁定 */
    set locked(value: emYesNo) {
        this.setProperty(MaterialSerial.PROPERTY_LOCKED_NAME, value);
    }

    /** 映射的属性名称-供应商序号 */
    static PROPERTY_SUPPLIERSERIAL_NAME: string = "SupplierSerial";
    /** 获取-供应商序号 */
    get supplierSerial(): string {
        return this.getProperty<string>(MaterialSerial.PROPERTY_SUPPLIERSERIAL_NAME);
    }
    /** 设置-供应商序号 */
    set supplierSerial(value: string) {
        this.setProperty(MaterialSerial.PROPERTY_SUPPLIERSERIAL_NAME, value);
    }

    /** 映射的属性名称-批次序号 */
    static PROPERTY_INTERNALSERIAL_NAME: string = "BatchSerial";
    /** 获取-批次序号 */
    get batchSerial(): string {
        return this.getProperty<string>(MaterialSerial.PROPERTY_INTERNALSERIAL_NAME);
    }
    /** 设置-批次序号 */
    set batchSerial(value: string) {
        this.setProperty(MaterialSerial.PROPERTY_INTERNALSERIAL_NAME, value);
    }

    /** 映射的属性名称-过期日期 */
    static PROPERTY_EXPIRATIONDATE_NAME: string = "ExpirationDate";
    /** 获取-过期日期 */
    get expirationDate(): Date {
        return this.getProperty<Date>(MaterialSerial.PROPERTY_EXPIRATIONDATE_NAME);
    }
    /** 设置-过期日期 */
    set expirationDate(value: Date) {
        this.setProperty(MaterialSerial.PROPERTY_EXPIRATIONDATE_NAME, value);
    }
    /** 映射的属性名称-生产日期 */
    static PROPERTY_MANUFACTURINGDATE_NAME: string = "ManufacturingDate";
    /** 获取-生产日期 */
    get manufacturingDate(): Date {
        return this.getProperty<Date>(MaterialSerial.PROPERTY_MANUFACTURINGDATE_NAME);
    }
    /** 设置-生产日期 */
    set manufacturingDate(value: Date) {
        this.setProperty(MaterialSerial.PROPERTY_MANUFACTURINGDATE_NAME, value);
    }
    /** 映射的属性名称-准入日期 */
    static PROPERTY_ADMISSIONDATE_NAME: string = "AdmissionDate";
    /** 获取-准入日期 */
    get admissionDate(): Date {
        return this.getProperty<Date>(MaterialSerial.PROPERTY_ADMISSIONDATE_NAME);
    }
    /** 设置-准入日期 */
    set admissionDate(value: Date) {
        this.setProperty(MaterialSerial.PROPERTY_ADMISSIONDATE_NAME, value);
    }
    /** 映射的属性名称-开始保修日期 */
    static PROPERTY_WARRANTYSTARTDATE_NAME: string = "WarrantyStartDate";
    /** 获取-开始保修日期 */
    get warrantyStartDate(): Date {
        return this.getProperty<Date>(MaterialSerial.PROPERTY_WARRANTYSTARTDATE_NAME);
    }
    /** 设置-开始保修日期 */
    set warrantyStartDate(value: Date) {
        this.setProperty(MaterialSerial.PROPERTY_WARRANTYSTARTDATE_NAME, value);
    }
    /** 映射的属性名称-保修结束日期 */
    static PROPERTY_WARRANTYENDDATE_NAME: string = "WarrantyEndDate";
    /** 获取-保修结束日期 */
    get warrantyEndDate(): Date {
        return this.getProperty<Date>(MaterialSerial.PROPERTY_WARRANTYENDDATE_NAME);
    }
    /** 设置-保修结束日期 */
    set warrantyEndDate(value: Date) {
        this.setProperty(MaterialSerial.PROPERTY_WARRANTYENDDATE_NAME, value);
    }

    /** 映射的属性名称-备注 */
    static PROPERTY_NOTES_NAME: string = "Notes";
    /** 获取-备注 */
    get notes(): string {
        return this.getProperty<string>(MaterialSerial.PROPERTY_NOTES_NAME);
    }
    /** 设置-备注 */
    set notes(value: string) {
        this.setProperty(MaterialSerial.PROPERTY_NOTES_NAME, value);
    }
    /** 映射的属性名称-基于类型 */
    static PROPERTY_BASEDOCUMENTTYPE_NAME: string = "BaseDocumentType";
    /** 获取-基于类型 */
    get baseDocumentType(): string {
        return this.getProperty<string>(MaterialSerial.PROPERTY_BASEDOCUMENTTYPE_NAME);
    }
    /** 设置-基于类型 */
    set baseDocumentType(value: string) {
        this.setProperty(MaterialSerial.PROPERTY_BASEDOCUMENTTYPE_NAME, value);
    }
    /** 映射的属性名称-基于标识 */
    static PROPERTY_BASEDOCUMENTENTRY_NAME: string = "BaseDocumentEntry";
    /** 获取-基于标识 */
    get baseDocumentEntry(): number {
        return this.getProperty<number>(MaterialSerial.PROPERTY_BASEDOCUMENTENTRY_NAME);
    }
    /** 设置-基于标识 */
    set baseDocubaseDocumentEntrymentType(value: number) {
        this.setProperty(MaterialSerial.PROPERTY_BASEDOCUMENTENTRY_NAME, value);
    }
    /** 映射的属性名称-基于行号 */
    static PROPERTY_BASEDOCUMENTLINEID_NAME: string = "BaseDocumentLineId";
    /** 获取-基于行号 */
    get baseDocumentLineId(): number {
        return this.getProperty<number>(MaterialSerial.PROPERTY_BASEDOCUMENTLINEID_NAME);
    }
    /** 设置-基于行号 */
    set baseDocubaseDocumentEntrymentLineId(value: number) {
        this.setProperty(MaterialSerial.PROPERTY_BASEDOCUMENTLINEID_NAME, value);
    }

    /** 映射的属性名称-对象编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(MaterialSerial.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(MaterialSerial.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(MaterialSerial.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(MaterialSerial.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(MaterialSerial.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(MaterialSerial.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(MaterialSerial.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(MaterialSerial.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(MaterialSerial.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(MaterialSerial.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(MaterialSerial.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(MaterialSerial.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-版本 */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-版本 */
    get logInst(): number {
        return this.getProperty<number>(MaterialSerial.PROPERTY_LOGINST_NAME);
    }
    /** 设置-版本 */
    set logInst(value: number) {
        this.setProperty(MaterialSerial.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-服务系列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(MaterialSerial.PROPERTY_SERIES_NAME);
    }
    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(MaterialSerial.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(MaterialSerial.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(MaterialSerial.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(MaterialSerial.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(MaterialSerial.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(MaterialSerial.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(MaterialSerial.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(MaterialSerial.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(MaterialSerial.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(MaterialSerial.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(MaterialSerial.PROPERTY_UPDATEACTIONID_NAME, value);
    }



    /** 初始化数据 */
    protected init(): void {
        this.objectCode = config.applyVariables(MaterialSerial.BUSINESS_OBJECT_CODE);
    }
}