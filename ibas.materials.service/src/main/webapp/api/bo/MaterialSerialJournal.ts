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
    objects,
    emApprovalStatus,
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
    BO_PROPERTY_NAME_LINESTATUS,
    BO_PROPERTY_NAME_DOCUMENTSTATUS,
    BO_PROPERTY_NAME_OBJECTCODE,
    BO_PROPERTY_NAME_DOCENTRY,
    BO_PROPERTY_NAME_LINEID,
    BO_PROPERTY_NAME_APPROVALSTATUS,
    BO_PROPERTY_NAME_CANCELED,
    BO_PROPERTY_NAME_DELETED,
} from "ibas/index";
import {
    BO_CODE_MATERIALSERIALJOURNAL,
} from "../Datas";
import {
    IMaterialSerialJournal,
    IMaterialSerialJournals,
    IMaterialSerialJournalsParent,
} from "./MaterialSerialJournal.d";
/** 物料序列记录 */
export class MaterialSerialJournal extends BOSimple<MaterialSerialJournal> implements IMaterialSerialJournal {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALSERIALJOURNAL;
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-物料编码 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编码 */
    get itemCode(): string {
        return this.getProperty<string>(MaterialSerialJournal.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编码 */
    set itemCode(value: string) {
        this.setProperty(MaterialSerialJournal.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-序列编码 */
    static PROPERTY_SERIALCODE_NAME: string = "SerialCode";
    /** 获取-序列编码 */
    get serialCode(): string {
        return this.getProperty<string>(MaterialSerialJournal.PROPERTY_SERIALCODE_NAME);
    }
    /** 设置-序列编码 */
    set serialCode(value: string) {
        this.setProperty(MaterialSerialJournal.PROPERTY_SERIALCODE_NAME, value);
    }

    /** 映射的属性名称-仓库编码 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库编码 */
    get warehouse(): string {
        return this.getProperty<string>(MaterialSerialJournal.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库编码 */
    set warehouse(value: string) {
        this.setProperty(MaterialSerialJournal.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-激活 */
    static PROPERTY_ACTIVATED_NAME: string = "Activated";
    /** 获取-激活 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(MaterialSerialJournal.PROPERTY_ACTIVATED_NAME);
    }
    /** 设置-激活 */
    set activated(value: emYesNo) {
        this.setProperty(MaterialSerialJournal.PROPERTY_ACTIVATED_NAME, value);
    }

    /** 映射的属性名称-方向 */
    static PROPERTY_DIRECTION_NAME: string = "Direction";
    /** 获取-方向 */
    get direction(): emDirection {
        return this.getProperty<emDirection>(MaterialSerialJournal.PROPERTY_DIRECTION_NAME);
    }
    /** 设置-方向 */
    set direction(value: emDirection) {
        this.setProperty(MaterialSerialJournal.PROPERTY_DIRECTION_NAME, value);
    }

    /** 映射的属性名称-基于类型 */
    static PROPERTY_BASEDOCUMENTTYPE_NAME: string = "BaseDocumentType";
    /** 获取-基于类型 */
    get baseDocumentType(): string {
        return this.getProperty<string>(MaterialSerialJournal.PROPERTY_BASEDOCUMENTTYPE_NAME);
    }
    /** 设置-基于类型 */
    set baseDocumentType(value: string) {
        this.setProperty(MaterialSerialJournal.PROPERTY_BASEDOCUMENTTYPE_NAME, value);
    }

    /** 映射的属性名称-基于标识 */
    static PROPERTY_BASEDOCUMENTENTRY_NAME: string = "BaseDocumentEntry";
    /** 获取-基于标识 */
    get baseDocumentEntry(): number {
        return this.getProperty<number>(MaterialSerialJournal.PROPERTY_BASEDOCUMENTENTRY_NAME);
    }
    /** 设置-基于标识 */
    set baseDocumentEntry(value: number) {
        this.setProperty(MaterialSerialJournal.PROPERTY_BASEDOCUMENTENTRY_NAME, value);
    }

    /** 映射的属性名称-基于行号 */
    static PROPERTY_BASEDOCUMENTLINEID_NAME: string = "BaseDocumentLineId";
    /** 获取-基于行号 */
    get baseDocumentLineId(): number {
        return this.getProperty<number>(MaterialSerialJournal.PROPERTY_BASEDOCUMENTLINEID_NAME);
    }
    /** 设置-基于行号 */
    set baseDocumentLineId(value: number) {
        this.setProperty(MaterialSerialJournal.PROPERTY_BASEDOCUMENTLINEID_NAME, value);
    }

    /** 映射的属性名称-对象编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(MaterialSerialJournal.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(MaterialSerialJournal.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-对象行号 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-对象行号 */
    get lineId(): number {
        return this.getProperty<number>(MaterialSerialJournal.PROPERTY_LINEID_NAME);
    }
    /** 设置-对象行号 */
    set lineId(value: number) {
        this.setProperty(MaterialSerialJournal.PROPERTY_LINEID_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(MaterialSerialJournal.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(MaterialSerialJournal.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-实例号 */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号 */
    get logInst(): number {
        return this.getProperty<number>(MaterialSerialJournal.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号 */
    set logInst(value: number) {
        this.setProperty(MaterialSerialJournal.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(MaterialSerialJournal.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(MaterialSerialJournal.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(MaterialSerialJournal.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(MaterialSerialJournal.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(MaterialSerialJournal.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(MaterialSerialJournal.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-更新日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-更新日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(MaterialSerialJournal.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-更新日期 */
    set updateDate(value: Date) {
        this.setProperty(MaterialSerialJournal.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-更新时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-更新时间 */
    get updateTime(): number {
        return this.getProperty<number>(MaterialSerialJournal.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-更新时间 */
    set updateTime(value: number) {
        this.setProperty(MaterialSerialJournal.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(MaterialSerialJournal.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(MaterialSerialJournal.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-更新用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-更新用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(MaterialSerialJournal.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-更新用户 */
    set updateUserSign(value: number) {
        this.setProperty(MaterialSerialJournal.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(MaterialSerialJournal.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(MaterialSerialJournal.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(MaterialSerialJournal.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(MaterialSerialJournal.PROPERTY_UPDATEACTIONID_NAME, value);
    }



    /** 初始化数据 */
    protected init(): void {
        this.objectCode = config.applyVariables(MaterialSerialJournal.BUSINESS_OBJECT_CODE);
    }
}

/** 物料序列记录集合 */
export class MaterialSerialJournals
    extends BusinessObjects<IMaterialSerialJournal, IMaterialSerialJournalsParent>
    implements IMaterialSerialJournals {
    /** 创建并添加子项 */
    create(): MaterialSerialJournal {
        let item: MaterialSerialJournal = new MaterialSerialJournal();
        this.add(item);
        return item;
    }
    afterAdd(item: MaterialSerialJournal): void {
        super.afterAdd(item);
        item.baseDocumentType = this.parent.objectCode;
        item.baseDocumentEntry = this.parent.docEntry;
        item.baseDocumentLineId = this.parent.lineId;
        item.itemCode = this.parent.itemCode;
        item.warehouse = this.parent.warehouse;
        item.activated = this.getActivated();
    }
    /**
     * 父项单据行发生改变
     */
    onParentPropertyChanged(name: string): void {
        if (strings.equalsIgnoreCase(name, BO_PROPERTY_NAME_LINESTATUS)
            || strings.equalsIgnoreCase(name, BO_PROPERTY_NAME_DOCUMENTSTATUS)
            || strings.equalsIgnoreCase(name, BO_PROPERTY_NAME_CANCELED)
            || strings.equalsIgnoreCase(name, BO_PROPERTY_NAME_DELETED)
            || strings.equalsIgnoreCase(name, BO_PROPERTY_NAME_APPROVALSTATUS)) {
            for (let item of this) {
                item.activated = this.getActivated();
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
    protected getActivated(): emYesNo {
        if (this.parent.getProperty(BO_PROPERTY_NAME_LINESTATUS) === emDocumentStatus.PLANNED) {
            return emYesNo.NO;
        }
        if (this.parent.getProperty(BO_PROPERTY_NAME_DOCUMENTSTATUS) === emDocumentStatus.PLANNED) {
            return emYesNo.NO;
        }
        if (this.parent.getProperty(BO_PROPERTY_NAME_CANCELED) === emYesNo.YES) {
            return emYesNo.NO;
        }
        if (this.parent.getProperty(BO_PROPERTY_NAME_DELETED) === emYesNo.YES) {
            return emYesNo.NO;
        }
        if (this.parent.getProperty(BO_PROPERTY_NAME_APPROVALSTATUS) !== emApprovalStatus.APPROVED
            && this.parent.getProperty(BO_PROPERTY_NAME_APPROVALSTATUS) !== emApprovalStatus.UNAFFECTED) {
            return emYesNo.NO;
        }
        return emYesNo.YES;
    }
    /** 总计 */
    total(): number {
        let total: number = 0;
        for (let item of this) {
            if (item.isDeleted) {
                continue;
            }
            total += 1;
        }
        return total;
    }
}