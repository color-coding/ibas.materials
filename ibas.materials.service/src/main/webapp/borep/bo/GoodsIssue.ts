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
    strings,
    config,
    objects,
    enums,
    emDirection,
} from "ibas/index";
import {
    IGoodsIssue,
    IGoodsIssueLines,
    IGoodsIssueLine,
    IGoodsIssueMaterialBatchJournals,
    IMaterialBatchJournal,
    IGoodsIssueMaterialSerialJournals,
    IMaterialSerialJournal,
    IMaterialIssueSerialLine,
    IMaterialIssueBatchLine,
    BO_CODE_GOODSISSUE,
    emItemType,
} from "../../api/index";
import {
    MaterialBatch,
    MaterialBatchJournal,
    MaterialSerialJournal
} from "./index";

/** 库存发货 */
export class GoodsIssue extends BODocument<GoodsIssue> implements IGoodsIssue {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_GOODSISSUE;
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-凭证编号 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 获取-凭证编号 */
    get docEntry(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-凭证编号 */
    set docEntry(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_DOCENTRY_NAME, value);
    }

    /** 映射的属性名称-期间编号 */
    static PROPERTY_DOCNUM_NAME: string = "DocNum";
    /** 获取-期间编号 */
    get docNum(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_DOCNUM_NAME);
    }
    /** 设置-期间编号 */
    set docNum(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_DOCNUM_NAME, value);
    }

    /** 映射的属性名称-期间 */
    static PROPERTY_PERIOD_NAME: string = "Period";
    /** 获取-期间 */
    get period(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_PERIOD_NAME);
    }
    /** 设置-期间 */
    set period(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_PERIOD_NAME, value);
    }

    /** 映射的属性名称-取消 */
    static PROPERTY_CANCELED_NAME: string = "Canceled";
    /** 获取-取消 */
    get canceled(): emYesNo {
        return this.getProperty<emYesNo>(GoodsIssue.PROPERTY_CANCELED_NAME);
    }
    /** 设置-取消 */
    set canceled(value: emYesNo) {
        this.setProperty(GoodsIssue.PROPERTY_CANCELED_NAME, value);
    }

    /** 映射的属性名称-状态 */
    static PROPERTY_STATUS_NAME: string = "Status";
    /** 获取-状态 */
    get status(): emBOStatus {
        return this.getProperty<emBOStatus>(GoodsIssue.PROPERTY_STATUS_NAME);
    }
    /** 设置-状态 */
    set status(value: emBOStatus) {
        this.setProperty(GoodsIssue.PROPERTY_STATUS_NAME, value);
    }

    /** 映射的属性名称-审批状态 */
    static PROPERTY_APPROVALSTATUS_NAME: string = "ApprovalStatus";
    /** 获取-审批状态 */
    get approvalStatus(): emApprovalStatus {
        return this.getProperty<emApprovalStatus>(GoodsIssue.PROPERTY_APPROVALSTATUS_NAME);
    }
    /** 设置-审批状态 */
    set approvalStatus(value: emApprovalStatus) {
        this.setProperty(GoodsIssue.PROPERTY_APPROVALSTATUS_NAME, value);
    }

    /** 映射的属性名称-单据状态 */
    static PROPERTY_DOCUMENTSTATUS_NAME: string = "DocumentStatus";
    /** 获取-单据状态 */
    get documentStatus(): emDocumentStatus {
        return this.getProperty<emDocumentStatus>(GoodsIssue.PROPERTY_DOCUMENTSTATUS_NAME);
    }
    /** 设置-单据状态 */
    set documentStatus(value: emDocumentStatus) {
        this.setProperty(GoodsIssue.PROPERTY_DOCUMENTSTATUS_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(GoodsIssue.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(GoodsIssue.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(GoodsIssue.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(GoodsIssue.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(GoodsIssue.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(GoodsIssue.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-版本 */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-版本 */
    get logInst(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_LOGINST_NAME);
    }
    /** 设置-版本 */
    set logInst(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-服务系列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_SERIES_NAME);
    }
    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(GoodsIssue.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(GoodsIssue.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(GoodsIssue.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(GoodsIssue.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(GoodsIssue.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(GoodsIssue.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-数据所有者 */
    static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
    /** 获取-数据所有者 */
    get dataOwner(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_DATAOWNER_NAME);
    }
    /** 设置-数据所有者 */
    set dataOwner(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_DATAOWNER_NAME, value);
    }

    /** 映射的属性名称-团队成员 */
    static PROPERTY_TEAMMEMBERS_NAME: string = "TeamMembers";
    /** 获取-团队成员 */
    get teamMembers(): string {
        return this.getProperty<string>(GoodsIssue.PROPERTY_TEAMMEMBERS_NAME);
    }
    /** 设置-团队成员 */
    set teamMembers(value: string) {
        this.setProperty(GoodsIssue.PROPERTY_TEAMMEMBERS_NAME, value);
    }

    /** 映射的属性名称-数据所属组织 */
    static PROPERTY_ORGANIZATION_NAME: string = "Organization";
    /** 获取-数据所属组织 */
    get organization(): string {
        return this.getProperty<string>(GoodsIssue.PROPERTY_ORGANIZATION_NAME);
    }
    /** 设置-数据所属组织 */
    set organization(value: string) {
        this.setProperty(GoodsIssue.PROPERTY_ORGANIZATION_NAME, value);
    }

    /** 映射的属性名称-过账日期 */
    static PROPERTY_POSTINGDATE_NAME: string = "PostingDate";
    /** 获取-过账日期 */
    get postingDate(): Date {
        return this.getProperty<Date>(GoodsIssue.PROPERTY_POSTINGDATE_NAME);
    }
    /** 设置-过账日期 */
    set postingDate(value: Date) {
        this.setProperty(GoodsIssue.PROPERTY_POSTINGDATE_NAME, value);
    }

    /** 映射的属性名称-到期日 */
    static PROPERTY_DELIVERYDATE_NAME: string = "DeliveryDate";
    /** 获取-到期日 */
    get deliveryDate(): Date {
        return this.getProperty<Date>(GoodsIssue.PROPERTY_DELIVERYDATE_NAME);
    }
    /** 设置-到期日 */
    set deliveryDate(value: Date) {
        this.setProperty(GoodsIssue.PROPERTY_DELIVERYDATE_NAME, value);
    }

    /** 映射的属性名称-凭证日期 */
    static PROPERTY_DOCUMENTDATE_NAME: string = "DocumentDate";
    /** 获取-凭证日期 */
    get documentDate(): Date {
        return this.getProperty<Date>(GoodsIssue.PROPERTY_DOCUMENTDATE_NAME);
    }
    /** 设置-凭证日期 */
    set documentDate(value: Date) {
        this.setProperty(GoodsIssue.PROPERTY_DOCUMENTDATE_NAME, value);
    }

    /** 映射的属性名称-参考1 */
    static PROPERTY_REFERENCE1_NAME: string = "Reference1";
    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(GoodsIssue.PROPERTY_REFERENCE1_NAME);
    }
    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(GoodsIssue.PROPERTY_REFERENCE1_NAME, value);
    }

    /** 映射的属性名称-参考2 */
    static PROPERTY_REFERENCE2_NAME: string = "Reference2";
    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(GoodsIssue.PROPERTY_REFERENCE2_NAME);
    }
    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(GoodsIssue.PROPERTY_REFERENCE2_NAME, value);
    }

    /** 映射的属性名称-已引用 */
    static PROPERTY_REFERENCED_NAME: string = "Referenced";
    /** 获取-已引用 */
    get referenced(): emYesNo {
        return this.getProperty<emYesNo>(GoodsIssue.PROPERTY_REFERENCED_NAME);
    }
    /** 设置-已引用 */
    set referenced(value: emYesNo) {
        this.setProperty(GoodsIssue.PROPERTY_REFERENCED_NAME, value);
    }

    /** 映射的属性名称-备注 */
    static PROPERTY_REMARKS_NAME: string = "Remarks";
    /** 获取-备注 */
    get remarks(): string {
        return this.getProperty<string>(GoodsIssue.PROPERTY_REMARKS_NAME);
    }
    /** 设置-备注 */
    set remarks(value: string) {
        this.setProperty(GoodsIssue.PROPERTY_REMARKS_NAME, value);
    }

    /** 映射的属性名称-单据货币 */
    static PROPERTY_DOCUMENTCURRENCY_NAME: string = "DocumentCurrency";
    /** 获取-单据货币 */
    get documentCurrency(): string {
        return this.getProperty<string>(GoodsIssue.PROPERTY_DOCUMENTCURRENCY_NAME);
    }
    /** 设置-单据货币 */
    set documentCurrency(value: string) {
        this.setProperty(GoodsIssue.PROPERTY_DOCUMENTCURRENCY_NAME, value);
    }

    /** 映射的属性名称-单据交换率 */
    static PROPERTY_DOCUMENTRATE_NAME: string = "DocumentRate";
    /** 获取-单据交换率 */
    get documentRate(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_DOCUMENTRATE_NAME);
    }
    /** 设置-单据交换率 */
    set documentRate(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_DOCUMENTRATE_NAME, value);
    }

    /** 映射的属性名称-单据总计 */
    static PROPERTY_DOCUMENTTOTAL_NAME: string = "DocumentTotal";
    /** 获取-单据总计 */
    get documentTotal(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_DOCUMENTTOTAL_NAME);
    }
    /** 设置-单据总计 */
    set documentTotal(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_DOCUMENTTOTAL_NAME, value);
    }

    /** 映射的属性名称-价格清单 */
    static PROPERTY_PRICELIST_NAME: string = "PriceList";
    /** 获取-价格清单 */
    get priceList(): number {
        return this.getProperty<number>(GoodsIssue.PROPERTY_PRICELIST_NAME);
    }
    /** 设置-价格清单 */
    set priceList(value: number) {
        this.setProperty(GoodsIssue.PROPERTY_PRICELIST_NAME, value);
    }

    /** 映射的属性名称-项目代码 */
    static PROPERTY_PROJECT_NAME: string = "Project";
    /** 获取-项目代码 */
    get project(): string {
        return this.getProperty<string>(GoodsIssue.PROPERTY_PROJECT_NAME);
    }
    /** 设置-项目代码 */
    set project(value: string) {
        this.setProperty(GoodsIssue.PROPERTY_PROJECT_NAME, value);
    }


    /** 映射的属性名称-库存发货-行集合 */
    static PROPERTY_GOODSISSUELINES_NAME: string = "GoodsIssueLines";
    /** 获取-库存发货-行集合 */
    get goodsIssueLines(): GoodsIssueLines {
        return this.getProperty<GoodsIssueLines>(GoodsIssue.PROPERTY_GOODSISSUELINES_NAME);
    }
    /** 设置-库存发货-行集合 */
    set goodsIssueLines(value: GoodsIssueLines) {
        this.setProperty(GoodsIssue.PROPERTY_GOODSISSUELINES_NAME, value);
    }


    /** 初始化数据 */
    protected init(): void {
        this.goodsIssueLines = new GoodsIssueLines(this);
        this.objectCode = config.applyVariables(GoodsIssue.BUSINESS_OBJECT_CODE);
    }
}

/** 库存发货-行 集合 */
export class GoodsIssueLines extends BusinessObjects<GoodsIssueLine, GoodsIssue> implements IGoodsIssueLines {

    /** 创建并添加子项 */
    create(): GoodsIssueLine {
        let item: GoodsIssueLine = new GoodsIssueLine();
        this.add(item);
        return item;
    }
    /** 取出需要添加批次的行 */
    filterBatchLine(): GoodsIssueLine[] {
        let goodIssueLines: GoodsIssueLine[] = this.filter(
            c => c.isDeleted === false
                && !objects.isNull(c.lineStatus)
                && c.lineStatus !== emDocumentStatus.PLANNED
                && c.batchManagement !== undefined
                && c.batchManagement.toString() === enums.toString(emYesNo, emYesNo.YES)
                && !strings.isEmpty(c.itemCode)
                && !strings.isEmpty(c.warehouse));
        return goodIssueLines;
    }

    /** 取出需要添加序列的行 */
    filterSerialLine(): GoodsIssueLine[] {
        let goodIssueLines: GoodsIssueLine[] = this.filter(
            c => c.isDeleted === false
                && !objects.isNull(c.lineStatus)
                && c.lineStatus !== emDocumentStatus.PLANNED
                && c.serialManagement !== undefined
                && c.serialManagement.toString() === enums.toString(emYesNo, emYesNo.YES)
                && !strings.isEmpty(c.itemCode)
                && !strings.isEmpty(c.warehouse));
        return goodIssueLines;
    }
    /** 监听父项属性改变 */
    protected onParentPropertyChanged(name: string): void {
        super.onParentPropertyChanged(name);
        if (strings.equalsIgnoreCase(name, GoodsIssue.PROPERTY_DOCUMENTSTATUS_NAME)) {
            for (let item of this.filterDeleted()) {
                item.lineStatus = this.parent.documentStatus;
            }
        }
    }
}
/** 库存发货-批次日记账 集合 */
export class GoodsIssueMaterialBatchJournals extends BusinessObjects<MaterialBatchJournal, GoodsIssueLine>
    implements IGoodsIssueMaterialBatchJournals {
    /** 创建并添加子项 */
    create(): MaterialBatchJournal {
        let item: MaterialBatchJournal = new MaterialBatchJournal();
        this.add(item);
        item.lineStatus = this.parent.lineStatus;
        return item;
    }

    /** 移除批次日记账集合 */
    removeAll(): void {
        for (let item of this) {
            this.remove(item);
        }
    }
    /** 监听父项属性改变 */
    protected onParentPropertyChanged(name: string): void {
        super.onParentPropertyChanged(name);
        if (strings.equalsIgnoreCase(name, GoodsIssueLine.PROPERTY_LINESTATUS_NAME)) {
            for (let item of this.filterDeleted()) {
                item.lineStatus = this.parent.lineStatus;
            }
        }
    }
}
/** 库存发货-序列日记账 集合 */
export class GoodsIssueMaterialSerialJournals extends BusinessObjects<MaterialSerialJournal, GoodsIssueLine>
    implements IGoodsIssueMaterialSerialJournals {
    /** 创建并添加子项 */
    create(): MaterialSerialJournal {
        let item: MaterialSerialJournal = new MaterialSerialJournal();
        this.add(item);
        return item;
    }
    createSerialJournal(data: IMaterialIssueSerialLine): MaterialSerialJournal {
        let item: MaterialSerialJournal = new MaterialSerialJournal();
        item.serialCode = data.serialCode;
        item.itemCode = data.itemCode;
        item.direction = emDirection.OUT;
        item.warehouse = data.warehouse;
        item.lineStatus = this.parent.lineStatus;
        this.add(item);
        return item;
    }
    /** 移除序列日记账集合 */
    removeAll(): void {
        for (let item of this) {
            this.remove(item);
        }
    }
    /** 监听父项属性改变 */
    protected onParentPropertyChanged(name: string): void {
        super.onParentPropertyChanged(name);
        if (strings.equalsIgnoreCase(name, GoodsIssueLine.PROPERTY_LINESTATUS_NAME)) {
            for (let item of this.filterDeleted()) {
                item.lineStatus = this.parent.lineStatus;
            }
        }
    }
}

/** 库存发货-行 */
export class GoodsIssueLine extends BODocumentLine<GoodsIssueLine> implements IGoodsIssueLine {

    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-编码 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 获取-编码 */
    get docEntry(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-编码 */
    set docEntry(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_DOCENTRY_NAME, value);
    }

    /** 映射的属性名称-行号 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_LINEID_NAME);
    }
    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_LINEID_NAME, value);
    }

    /** 映射的属性名称-显示顺序 */
    static PROPERTY_VISORDER_NAME: string = "VisOrder";
    /** 获取-显示顺序 */
    get visOrder(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_VISORDER_NAME);
    }
    /** 设置-显示顺序 */
    set visOrder(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_VISORDER_NAME, value);
    }

    /** 映射的属性名称-取消 */
    static PROPERTY_CANCELED_NAME: string = "Canceled";
    /** 获取-取消 */
    get canceled(): emYesNo {
        return this.getProperty<emYesNo>(GoodsIssueLine.PROPERTY_CANCELED_NAME);
    }
    /** 设置-取消 */
    set canceled(value: emYesNo) {
        this.setProperty(GoodsIssueLine.PROPERTY_CANCELED_NAME, value);
    }

    /** 映射的属性名称-状态 */
    static PROPERTY_STATUS_NAME: string = "Status";
    /** 获取-状态 */
    get status(): emBOStatus {
        return this.getProperty<emBOStatus>(GoodsIssueLine.PROPERTY_STATUS_NAME);
    }
    /** 设置-状态 */
    set status(value: emBOStatus) {
        this.setProperty(GoodsIssueLine.PROPERTY_STATUS_NAME, value);
    }

    /** 映射的属性名称-单据状态 */
    static PROPERTY_LINESTATUS_NAME: string = "LineStatus";
    /** 获取-单据状态 */
    get lineStatus(): emDocumentStatus {
        return this.getProperty<emDocumentStatus>(GoodsIssueLine.PROPERTY_LINESTATUS_NAME);
    }
    /** 设置-单据状态 */
    set lineStatus(value: emDocumentStatus) {
        this.setProperty(GoodsIssueLine.PROPERTY_LINESTATUS_NAME, value);
    }

    /** 映射的属性名称-类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(GoodsIssueLine.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(GoodsIssueLine.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(GoodsIssueLine.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(GoodsIssueLine.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-版本 */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-版本 */
    get logInst(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_LOGINST_NAME);
    }
    /** 设置-版本 */
    set logInst(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-服务系列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_SERIES_NAME);
    }
    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-参考1 */
    static PROPERTY_REFERENCE1_NAME: string = "Reference1";
    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_REFERENCE1_NAME);
    }
    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_REFERENCE1_NAME, value);
    }

    /** 映射的属性名称-参考2 */
    static PROPERTY_REFERENCE2_NAME: string = "Reference2";
    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_REFERENCE2_NAME);
    }
    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_REFERENCE2_NAME, value);
    }

    /** 映射的属性名称-已引用 */
    static PROPERTY_REFERENCED_NAME: string = "Referenced";
    /** 获取-已引用 */
    get referenced(): emYesNo {
        return this.getProperty<emYesNo>(GoodsIssueLine.PROPERTY_REFERENCED_NAME);
    }
    /** 设置-已引用 */
    set referenced(value: emYesNo) {
        this.setProperty(GoodsIssueLine.PROPERTY_REFERENCED_NAME, value);
    }

    /** 映射的属性名称-基于类型 */
    static PROPERTY_BASEDOCUMENTTYPE_NAME: string = "BaseDocumentType";
    /** 获取-基于类型 */
    get baseDocumentType(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_BASEDOCUMENTTYPE_NAME);
    }
    /** 设置-基于类型 */
    set baseDocumentType(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_BASEDOCUMENTTYPE_NAME, value);
    }

    /** 映射的属性名称-基于标识 */
    static PROPERTY_BASEDOCUMENTENTRY_NAME: string = "BaseDocumentEntry";
    /** 获取-基于标识 */
    get baseDocumentEntry(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_BASEDOCUMENTENTRY_NAME);
    }
    /** 设置-基于标识 */
    set baseDocumentEntry(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_BASEDOCUMENTENTRY_NAME, value);
    }

    /** 映射的属性名称-基于行号 */
    static PROPERTY_BASEDOCUMENTLINEID_NAME: string = "BaseDocumentLineId";
    /** 获取-基于行号 */
    get baseDocumentLineId(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_BASEDOCUMENTLINEID_NAME);
    }
    /** 设置-基于行号 */
    set baseDocumentLineId(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_BASEDOCUMENTLINEID_NAME, value);
    }

    /** 映射的属性名称-物料编号 */
    static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
    /** 获取-物料编号 */
    get itemCode(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_ITEMCODE_NAME);
    }
    /** 设置-物料编号 */
    set itemCode(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_ITEMCODE_NAME, value);
    }

    /** 映射的属性名称-物料/服务描述 */
    static PROPERTY_ITEMDESCRIPTION_NAME: string = "ItemDescription";
    /** 获取-物料/服务描述 */
    get itemDescription(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_ITEMDESCRIPTION_NAME);
    }
    /** 设置-物料/服务描述 */
    set itemDescription(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_ITEMDESCRIPTION_NAME, value);
    }

    /** 映射的属性名称-物料类型 */
    static PROPERTY_ITEMTYPE_NAME: string = "ItemType";
    /** 获取-物料类型 */
    get itemType(): emItemType {
        return this.getProperty<emItemType>(GoodsIssueLine.PROPERTY_ITEMTYPE_NAME);
    }
    /** 设置-物料类型 */
    set itemType(value: emItemType) {
        this.setProperty(GoodsIssueLine.PROPERTY_ITEMTYPE_NAME, value);
    }

    /** 映射的属性名称-序号管理 */
    static PROPERTY_SERIALMANAGEMENT_NAME: string = "SerialManagement";
    /** 获取-序号管理 */
    get serialManagement(): emYesNo {
        return this.getProperty<emYesNo>(GoodsIssueLine.PROPERTY_SERIALMANAGEMENT_NAME);
    }
    /** 设置-序号管理 */
    set serialManagement(value: emYesNo) {
        this.setProperty(GoodsIssueLine.PROPERTY_SERIALMANAGEMENT_NAME, value);
    }

    /** 映射的属性名称-批号管理 */
    static PROPERTY_BATCHMANAGEMENT_NAME: string = "BatchManagement";
    /** 获取-批号管理 */
    get batchManagement(): emYesNo {
        return this.getProperty<emYesNo>(GoodsIssueLine.PROPERTY_BATCHMANAGEMENT_NAME);
    }
    /** 设置-批号管理 */
    set batchManagement(value: emYesNo) {
        this.setProperty(GoodsIssueLine.PROPERTY_BATCHMANAGEMENT_NAME, value);
    }

    /** 映射的属性名称-数量 */
    static PROPERTY_QUANTITY_NAME: string = "Quantity";
    /** 获取-数量 */
    get quantity(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_QUANTITY_NAME);
    }
    /** 设置-数量 */
    set quantity(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_QUANTITY_NAME, value);
    }

    /** 映射的属性名称-计量单位 */
    static PROPERTY_UOM_NAME: string = "UOM";
    /** 获取-计量单位 */
    get uom(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_UOM_NAME);
    }
    /** 设置-计量单位 */
    set uom(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_UOM_NAME, value);
    }

    /** 映射的属性名称-仓库 */
    static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
    /** 获取-仓库 */
    get warehouse(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_WAREHOUSE_NAME);
    }
    /** 设置-仓库 */
    set warehouse(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_WAREHOUSE_NAME, value);
    }

    /** 映射的属性名称-价格 */
    static PROPERTY_PRICE_NAME: string = "Price";
    /** 获取-价格 */
    get price(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_PRICE_NAME);
    }
    /** 设置-价格 */
    set price(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_PRICE_NAME, value);
    }

    /** 映射的属性名称-货币 */
    static PROPERTY_CURRENCY_NAME: string = "Currency";
    /** 获取-货币 */
    get currency(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_CURRENCY_NAME);
    }
    /** 设置-货币 */
    set currency(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_CURRENCY_NAME, value);
    }

    /** 映射的属性名称-汇率 */
    static PROPERTY_RATE_NAME: string = "Rate";
    /** 获取-汇率 */
    get rate(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_RATE_NAME);
    }
    /** 设置-汇率 */
    set rate(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_RATE_NAME, value);
    }

    /** 映射的属性名称-行总计 */
    static PROPERTY_LINETOTAL_NAME: string = "LineTotal";
    /** 获取-行总计 */
    get lineTotal(): number {
        return this.getProperty<number>(GoodsIssueLine.PROPERTY_LINETOTAL_NAME);
    }
    /** 设置-行总计 */
    set lineTotal(value: number) {
        this.setProperty(GoodsIssueLine.PROPERTY_LINETOTAL_NAME, value);
    }

    /** 映射的属性名称-项目代码 */
    static PROPERTY_PROJECT_NAME: string = "Project";
    /** 获取-项目代码 */
    get project(): string {
        return this.getProperty<string>(GoodsIssueLine.PROPERTY_PROJECT_NAME);
    }
    /** 设置-项目代码 */
    set project(value: string) {
        this.setProperty(GoodsIssueLine.PROPERTY_PROJECT_NAME, value);
    }
    /** 映射的属性名称-库存发货-行-序列号集合 */
    static PROPERTY_GOODSISSUEMATERIALSERIALJOURNALS_NAME: string = "GoodsIssueMaterialSerialJournals";
    /** 获取-库存发货-行-序列号集合 */
    get goodsIssueMaterialSerialJournals(): GoodsIssueMaterialSerialJournals {
        return this.getProperty<GoodsIssueMaterialSerialJournals>(GoodsIssueLine.PROPERTY_GOODSISSUEMATERIALSERIALJOURNALS_NAME);
    }
    /** 设置-库存发货-行-序列号集合 */
    set goodsIssueMaterialSerialJournals(value: GoodsIssueMaterialSerialJournals) {
        this.setProperty(GoodsIssueLine.PROPERTY_GOODSISSUEMATERIALSERIALJOURNALS_NAME, value);
    }
    /** 映射的属性名称-库存发货-行-批次集合 */
    static PROPERTY_GOODSISSUEMATERIALBATCHJOURNALS_NAME: string = "GoodsIssueMaterialBatchJournals";
    /** 获取-库存发货-行-序列号集合 */
    get goodsIssueMaterialBatchJournals(): GoodsIssueMaterialBatchJournals {
        return this.getProperty<GoodsIssueMaterialBatchJournals>(GoodsIssueLine.PROPERTY_GOODSISSUEMATERIALBATCHJOURNALS_NAME);
    }
    /** 设置-库存发货-行-序列号集合 */
    set goodsIssueMaterialBatchJournals(value: GoodsIssueMaterialBatchJournals) {
        this.setProperty(GoodsIssueLine.PROPERTY_GOODSISSUEMATERIALBATCHJOURNALS_NAME, value);
    }
    /** 初始化数据 */
    protected init(): void {
        this.goodsIssueMaterialBatchJournals = new GoodsIssueMaterialBatchJournals(this);
        this.goodsIssueMaterialSerialJournals = new GoodsIssueMaterialSerialJournals(this);
        this.objectCode = config.applyVariables(GoodsIssue.BUSINESS_OBJECT_CODE);
    }
}

