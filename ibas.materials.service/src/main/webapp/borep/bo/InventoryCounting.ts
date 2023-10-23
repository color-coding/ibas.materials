/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 库存盘点 */
        export class InventoryCounting extends ibas.BODocument<InventoryCounting> implements IInventoryCounting {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_INVENTORYCOUNTING;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-凭证编号 */
            static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
            /** 获取-凭证编号 */
            get docEntry(): number {
                return this.getProperty<number>(InventoryCounting.PROPERTY_DOCENTRY_NAME);
            }
            /** 设置-凭证编号 */
            set docEntry(value: number) {
                this.setProperty(InventoryCounting.PROPERTY_DOCENTRY_NAME, value);
            }

            /** 映射的属性名称-单据编码 */
            static PROPERTY_DOCNUM_NAME: string = "DocNum";
            /** 获取-单据编码 */
            get docNum(): string {
                return this.getProperty<string>(InventoryCounting.PROPERTY_DOCNUM_NAME);
            }
            /** 设置-单据编码 */
            set docNum(value: string) {
                this.setProperty(InventoryCounting.PROPERTY_DOCNUM_NAME, value);
            }

            /** 映射的属性名称-期间 */
            static PROPERTY_PERIOD_NAME: string = "Period";
            /** 获取-期间 */
            get period(): number {
                return this.getProperty<number>(InventoryCounting.PROPERTY_PERIOD_NAME);
            }
            /** 设置-期间 */
            set period(value: number) {
                this.setProperty(InventoryCounting.PROPERTY_PERIOD_NAME, value);
            }

            /** 映射的属性名称-取消 */
            static PROPERTY_CANCELED_NAME: string = "Canceled";
            /** 获取-取消 */
            get canceled(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(InventoryCounting.PROPERTY_CANCELED_NAME);
            }
            /** 设置-取消 */
            set canceled(value: ibas.emYesNo) {
                this.setProperty(InventoryCounting.PROPERTY_CANCELED_NAME, value);
            }

            /** 映射的属性名称-状态 */
            static PROPERTY_STATUS_NAME: string = "Status";
            /** 获取-状态 */
            get status(): ibas.emBOStatus {
                return this.getProperty<ibas.emBOStatus>(InventoryCounting.PROPERTY_STATUS_NAME);
            }
            /** 设置-状态 */
            set status(value: ibas.emBOStatus) {
                this.setProperty(InventoryCounting.PROPERTY_STATUS_NAME, value);
            }

            /** 映射的属性名称-审批状态 */
            static PROPERTY_APPROVALSTATUS_NAME: string = "ApprovalStatus";
            /** 获取-审批状态 */
            get approvalStatus(): ibas.emApprovalStatus {
                return this.getProperty<ibas.emApprovalStatus>(InventoryCounting.PROPERTY_APPROVALSTATUS_NAME);
            }
            /** 设置-审批状态 */
            set approvalStatus(value: ibas.emApprovalStatus) {
                this.setProperty(InventoryCounting.PROPERTY_APPROVALSTATUS_NAME, value);
            }

            /** 映射的属性名称-单据状态 */
            static PROPERTY_DOCUMENTSTATUS_NAME: string = "DocumentStatus";
            /** 获取-单据状态 */
            get documentStatus(): ibas.emDocumentStatus {
                return this.getProperty<ibas.emDocumentStatus>(InventoryCounting.PROPERTY_DOCUMENTSTATUS_NAME);
            }
            /** 设置-单据状态 */
            set documentStatus(value: ibas.emDocumentStatus) {
                this.setProperty(InventoryCounting.PROPERTY_DOCUMENTSTATUS_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(InventoryCounting.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(InventoryCounting.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(InventoryCounting.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(InventoryCounting.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(InventoryCounting.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(InventoryCounting.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(InventoryCounting.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(InventoryCounting.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(InventoryCounting.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(InventoryCounting.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-版本 */
            get logInst(): number {
                return this.getProperty<number>(InventoryCounting.PROPERTY_LOGINST_NAME);
            }
            /** 设置-版本 */
            set logInst(value: number) {
                this.setProperty(InventoryCounting.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(InventoryCounting.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(InventoryCounting.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(InventoryCounting.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(InventoryCounting.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(InventoryCounting.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(InventoryCounting.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(InventoryCounting.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(InventoryCounting.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(InventoryCounting.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(InventoryCounting.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(InventoryCounting.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(InventoryCounting.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(InventoryCounting.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(InventoryCounting.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-团队成员 */
            static PROPERTY_TEAMMEMBERS_NAME: string = "TeamMembers";
            /** 获取-团队成员 */
            get teamMembers(): string {
                return this.getProperty<string>(InventoryCounting.PROPERTY_TEAMMEMBERS_NAME);
            }
            /** 设置-团队成员 */
            set teamMembers(value: string) {
                this.setProperty(InventoryCounting.PROPERTY_TEAMMEMBERS_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(InventoryCounting.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(InventoryCounting.PROPERTY_ORGANIZATION_NAME, value);
            }

            /** 映射的属性名称-过账日期 */
            static PROPERTY_POSTINGDATE_NAME: string = "PostingDate";
            /** 获取-过账日期 */
            get postingDate(): Date {
                return this.getProperty<Date>(InventoryCounting.PROPERTY_POSTINGDATE_NAME);
            }
            /** 设置-过账日期 */
            set postingDate(value: Date) {
                this.setProperty(InventoryCounting.PROPERTY_POSTINGDATE_NAME, value);
            }

            /** 映射的属性名称-到期日 */
            static PROPERTY_DELIVERYDATE_NAME: string = "DeliveryDate";
            /** 获取-到期日 */
            get deliveryDate(): Date {
                return this.getProperty<Date>(InventoryCounting.PROPERTY_DELIVERYDATE_NAME);
            }
            /** 设置-到期日 */
            set deliveryDate(value: Date) {
                this.setProperty(InventoryCounting.PROPERTY_DELIVERYDATE_NAME, value);
            }

            /** 映射的属性名称-凭证日期 */
            static PROPERTY_DOCUMENTDATE_NAME: string = "DocumentDate";
            /** 获取-凭证日期 */
            get documentDate(): Date {
                return this.getProperty<Date>(InventoryCounting.PROPERTY_DOCUMENTDATE_NAME);
            }
            /** 设置-凭证日期 */
            set documentDate(value: Date) {
                this.setProperty(InventoryCounting.PROPERTY_DOCUMENTDATE_NAME, value);
            }

            /** 映射的属性名称-盘点日期 */
            static PROPERTY_COUNTDATE_NAME: string = "CountDate";
            /** 获取-盘点日期 */
            get countDate(): Date {
                return this.getProperty<Date>(InventoryCounting.PROPERTY_COUNTDATE_NAME);
            }
            /** 设置-盘点日期 */
            set countDate(value: Date) {
                this.setProperty(InventoryCounting.PROPERTY_COUNTDATE_NAME, value);
            }

            /** 映射的属性名称-盘点时间 */
            static PROPERTY_COUNTTIME_NAME: string = "CountTime";
            /** 获取-盘点时间 */
            get countTime(): number {
                return this.getProperty<number>(InventoryCounting.PROPERTY_COUNTTIME_NAME);
            }
            /** 设置-盘点时间 */
            set countTime(value: number) {
                this.setProperty(InventoryCounting.PROPERTY_COUNTTIME_NAME, value);
            }

            /** 映射的属性名称-盘点类型 */
            static PROPERTY_COUNTTYPE_NAME: string = "CountType";
            /** 获取-盘点类型 */
            get countType(): string {
                return this.getProperty<string>(InventoryCounting.PROPERTY_COUNTTYPE_NAME);
            }
            /** 设置-盘点类型 */
            set countType(value: string) {
                this.setProperty(InventoryCounting.PROPERTY_COUNTTYPE_NAME, value);
            }

            /** 映射的属性名称-参考1 */
            static PROPERTY_REFERENCE1_NAME: string = "Reference1";
            /** 获取-参考1 */
            get reference1(): string {
                return this.getProperty<string>(InventoryCounting.PROPERTY_REFERENCE1_NAME);
            }
            /** 设置-参考1 */
            set reference1(value: string) {
                this.setProperty(InventoryCounting.PROPERTY_REFERENCE1_NAME, value);
            }

            /** 映射的属性名称-参考2 */
            static PROPERTY_REFERENCE2_NAME: string = "Reference2";
            /** 获取-参考2 */
            get reference2(): string {
                return this.getProperty<string>(InventoryCounting.PROPERTY_REFERENCE2_NAME);
            }
            /** 设置-参考2 */
            set reference2(value: string) {
                this.setProperty(InventoryCounting.PROPERTY_REFERENCE2_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(InventoryCounting.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(InventoryCounting.PROPERTY_REMARKS_NAME, value);
            }

            /** 映射的属性名称-单据类型 */
            static PROPERTY_ORDERTYPE_NAME: string = "OrderType";
            /** 获取-单据类型 */
            get orderType(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_ORDERTYPE_NAME);
            }
            /** 设置-单据类型 */
            set orderType(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_ORDERTYPE_NAME, value);
            }

            /** 映射的属性名称-库存盘点-行集合 */
            static PROPERTY_INVENTORYCOUNTINGLINES_NAME: string = "InventoryCountingLines";
            /** 获取-库存盘点-行集合 */
            get inventoryCountingLines(): InventoryCountingLines {
                return this.getProperty<InventoryCountingLines>(InventoryCounting.PROPERTY_INVENTORYCOUNTINGLINES_NAME);
            }
            /** 设置-库存盘点-行集合 */
            set inventoryCountingLines(value: InventoryCountingLines) {
                this.setProperty(InventoryCounting.PROPERTY_INVENTORYCOUNTINGLINES_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.inventoryCountingLines = new InventoryCountingLines(this);
                this.objectCode = ibas.config.applyVariables(InventoryCounting.BUSINESS_OBJECT_CODE);
                this.documentStatus = ibas.emDocumentStatus.RELEASED;
                this.documentDate = ibas.dates.today();
                this.countDate = ibas.dates.today();
                this.countTime = ibas.dates.time();
            }
            /** 重置 */
            reset(): void {
                super.reset();
                this.documentStatus = ibas.emDocumentStatus.RELEASED;
                this.inventoryCountingLines.forEach(c => c.lineStatus = ibas.emDocumentStatus.RELEASED);
            }
        }

        /** 库存盘点-行 集合 */
        export class InventoryCountingLines extends ibas.BusinessObjects<InventoryCountingLine, InventoryCounting> implements IInventoryCountingLines {
            /** 创建并添加子项 */
            create(): InventoryCountingLine {
                let item: InventoryCountingLine = new InventoryCountingLine();
                this.add(item);
                return item;
            }
        }

        /** 库存盘点-行 */
        export class InventoryCountingLine extends ibas.BODocumentLine<InventoryCountingLine> implements IInventoryCountingLine {
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-编码 */
            static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
            /** 获取-编码 */
            get docEntry(): number {
                return this.getProperty<number>(InventoryCountingLine.PROPERTY_DOCENTRY_NAME);
            }
            /** 设置-编码 */
            set docEntry(value: number) {
                this.setProperty(InventoryCountingLine.PROPERTY_DOCENTRY_NAME, value);
            }

            /** 映射的属性名称-行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-行号 */
            get lineId(): number {
                return this.getProperty<number>(InventoryCountingLine.PROPERTY_LINEID_NAME);
            }
            /** 设置-行号 */
            set lineId(value: number) {
                this.setProperty(InventoryCountingLine.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-显示顺序 */
            static PROPERTY_VISORDER_NAME: string = "VisOrder";
            /** 获取-显示顺序 */
            get visOrder(): number {
                return this.getProperty<number>(InventoryCountingLine.PROPERTY_VISORDER_NAME);
            }
            /** 设置-显示顺序 */
            set visOrder(value: number) {
                this.setProperty(InventoryCountingLine.PROPERTY_VISORDER_NAME, value);
            }

            /** 映射的属性名称-状态 */
            static PROPERTY_STATUS_NAME: string = "Status";
            /** 获取-状态 */
            get status(): ibas.emBOStatus {
                return this.getProperty<ibas.emBOStatus>(InventoryCountingLine.PROPERTY_STATUS_NAME);
            }
            /** 设置-状态 */
            set status(value: ibas.emBOStatus) {
                this.setProperty(InventoryCountingLine.PROPERTY_STATUS_NAME, value);
            }

            /** 映射的属性名称-单据状态 */
            static PROPERTY_LINESTATUS_NAME: string = "LineStatus";
            /** 获取-单据状态 */
            get lineStatus(): ibas.emDocumentStatus {
                return this.getProperty<ibas.emDocumentStatus>(InventoryCountingLine.PROPERTY_LINESTATUS_NAME);
            }
            /** 设置-单据状态 */
            set lineStatus(value: ibas.emDocumentStatus) {
                this.setProperty(InventoryCountingLine.PROPERTY_LINESTATUS_NAME, value);
            }

            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-类型 */
            get objectCode(): string {
                return this.getProperty<string>(InventoryCountingLine.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-类型 */
            set objectCode(value: string) {
                this.setProperty(InventoryCountingLine.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(InventoryCountingLine.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(InventoryCountingLine.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(InventoryCountingLine.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(InventoryCountingLine.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(InventoryCountingLine.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(InventoryCountingLine.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(InventoryCountingLine.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(InventoryCountingLine.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-版本 */
            get logInst(): number {
                return this.getProperty<number>(InventoryCountingLine.PROPERTY_LOGINST_NAME);
            }
            /** 设置-版本 */
            set logInst(value: number) {
                this.setProperty(InventoryCountingLine.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(InventoryCountingLine.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(InventoryCountingLine.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(InventoryCountingLine.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(InventoryCountingLine.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(InventoryCountingLine.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(InventoryCountingLine.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(InventoryCountingLine.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(InventoryCountingLine.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(InventoryCountingLine.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(InventoryCountingLine.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(InventoryCountingLine.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(InventoryCountingLine.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-参考1 */
            static PROPERTY_REFERENCE1_NAME: string = "Reference1";
            /** 获取-参考1 */
            get reference1(): string {
                return this.getProperty<string>(InventoryCountingLine.PROPERTY_REFERENCE1_NAME);
            }
            /** 设置-参考1 */
            set reference1(value: string) {
                this.setProperty(InventoryCountingLine.PROPERTY_REFERENCE1_NAME, value);
            }

            /** 映射的属性名称-参考2 */
            static PROPERTY_REFERENCE2_NAME: string = "Reference2";
            /** 获取-参考2 */
            get reference2(): string {
                return this.getProperty<string>(InventoryCountingLine.PROPERTY_REFERENCE2_NAME);
            }
            /** 设置-参考2 */
            set reference2(value: string) {
                this.setProperty(InventoryCountingLine.PROPERTY_REFERENCE2_NAME, value);
            }

            /** 映射的属性名称-物料编码 */
            static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
            /** 获取-物料编码 */
            get itemCode(): string {
                return this.getProperty<string>(InventoryCountingLine.PROPERTY_ITEMCODE_NAME);
            }
            /** 设置-物料编码 */
            set itemCode(value: string) {
                this.setProperty(InventoryCountingLine.PROPERTY_ITEMCODE_NAME, value);
            }

            /** 映射的属性名称-物料/服务描述 */
            static PROPERTY_ITEMDESCRIPTION_NAME: string = "ItemDescription";
            /** 获取-物料/服务描述 */
            get itemDescription(): string {
                return this.getProperty<string>(InventoryCountingLine.PROPERTY_ITEMDESCRIPTION_NAME);
            }
            /** 设置-物料/服务描述 */
            set itemDescription(value: string) {
                this.setProperty(InventoryCountingLine.PROPERTY_ITEMDESCRIPTION_NAME, value);
            }

            /** 映射的属性名称-物料标识 */
            static PROPERTY_ITEMSIGN_NAME: string = "ItemSign";
            /** 获取-物料标识 */
            get itemSign(): string {
                return this.getProperty<string>(InventoryCountingLine.PROPERTY_ITEMSIGN_NAME);
            }
            /** 设置-物料标识 */
            set itemSign(value: string) {
                this.setProperty(InventoryCountingLine.PROPERTY_ITEMSIGN_NAME, value);
            }

            /** 映射的属性名称-序号管理 */
            static PROPERTY_SERIALMANAGEMENT_NAME: string = "SerialManagement";
            /** 获取-序号管理 */
            get serialManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(InventoryCountingLine.PROPERTY_SERIALMANAGEMENT_NAME);
            }
            /** 设置-序号管理 */
            set serialManagement(value: ibas.emYesNo) {
                this.setProperty(InventoryCountingLine.PROPERTY_SERIALMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-批号管理 */
            static PROPERTY_BATCHMANAGEMENT_NAME: string = "BatchManagement";
            /** 获取-批号管理 */
            get batchManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(InventoryCountingLine.PROPERTY_BATCHMANAGEMENT_NAME);
            }
            /** 设置-批号管理 */
            set batchManagement(value: ibas.emYesNo) {
                this.setProperty(InventoryCountingLine.PROPERTY_BATCHMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-仓库 */
            static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
            /** 获取-仓库 */
            get warehouse(): string {
                return this.getProperty<string>(InventoryCountingLine.PROPERTY_WAREHOUSE_NAME);
            }
            /** 设置-仓库 */
            set warehouse(value: string) {
                this.setProperty(InventoryCountingLine.PROPERTY_WAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-库存数量 */
            static PROPERTY_INVENTORYQUANTITY_NAME: string = "InventoryQuantity";
            /** 获取-库存数量 */
            get inventoryQuantity(): number {
                return this.getProperty<number>(InventoryCountingLine.PROPERTY_INVENTORYQUANTITY_NAME);
            }
            /** 设置-库存数量 */
            set inventoryQuantity(value: number) {
                this.setProperty(InventoryCountingLine.PROPERTY_INVENTORYQUANTITY_NAME, value);
            }

            /** 映射的属性名称-盘点数量 */
            static PROPERTY_COUNTQUANTITY_NAME: string = "CountQuantity";
            /** 获取-盘点数量 */
            get countQuantity(): number {
                return this.getProperty<number>(InventoryCountingLine.PROPERTY_COUNTQUANTITY_NAME);
            }
            /** 设置-盘点数量 */
            set countQuantity(value: number) {
                this.setProperty(InventoryCountingLine.PROPERTY_COUNTQUANTITY_NAME, value);
            }

            /** 映射的属性名称-差额 */
            static PROPERTY_DIFFERENCE_NAME: string = "Difference";
            /** 获取-差额 */
            get difference(): number {
                return this.getProperty<number>(InventoryCountingLine.PROPERTY_DIFFERENCE_NAME);
            }
            /** 设置-差额 */
            set difference(value: number) {
                this.setProperty(InventoryCountingLine.PROPERTY_DIFFERENCE_NAME, value);
            }

            /** 映射的属性名称-单位 */
            static PROPERTY_UOM_NAME: string = "UOM";
            /** 获取-单位 */
            get uom(): string {
                return this.getProperty<string>(InventoryCountingLine.PROPERTY_UOM_NAME);
            }
            /** 设置-单位 */
            set uom(value: string) {
                this.setProperty(InventoryCountingLine.PROPERTY_UOM_NAME, value);
            }

            /** 映射的属性名称-已盘点 */
            static PROPERTY_COUNTED_NAME: string = "Counted";
            /** 获取-已盘点 */
            get counted(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(InventoryCountingLine.PROPERTY_COUNTED_NAME);
            }
            /** 设置-已盘点 */
            set counted(value: ibas.emYesNo) {
                this.setProperty(InventoryCountingLine.PROPERTY_COUNTED_NAME, value);
            }

            /** 映射的属性名称-冻结物料 */
            static PROPERTY_FREEZE_NAME: string = "Freeze";
            /** 获取-冻结物料 */
            get freeze(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(InventoryCountingLine.PROPERTY_FREEZE_NAME);
            }
            /** 设置-冻结物料 */
            set freeze(value: ibas.emYesNo) {
                this.setProperty(InventoryCountingLine.PROPERTY_FREEZE_NAME, value);
            }

            /** 映射的属性名称-物料批次集合 */
            static PROPERTY_MATERIALBATCHES_NAME: string = "MaterialBatches";
            /** 获取-物料批次集合 */
            get materialBatches(): MaterialBatchItems {
                return this.getProperty<MaterialBatchItems>(InventoryCountingLine.PROPERTY_MATERIALBATCHES_NAME);
            }
            /** 设置-物料批次集合 */
            set materialBatches(value: MaterialBatchItems) {
                this.setProperty(InventoryCountingLine.PROPERTY_MATERIALBATCHES_NAME, value);
            }

            /** 映射的属性名称-物料序列集合 */
            static PROPERTY_MATERIALSERIALS_NAME: string = "MaterialSerials";
            /** 获取-物料序列集合 */
            get materialSerials(): MaterialSerialItems {
                return this.getProperty<MaterialSerialItems>(InventoryCountingLine.PROPERTY_MATERIALSERIALS_NAME);
            }
            /** 设置-物料序列集合 */
            set materialSerials(value: MaterialSerialItems) {
                this.setProperty(InventoryCountingLine.PROPERTY_MATERIALSERIALS_NAME, value);
            }

            get targetQuantity(): number {
                return this.countQuantity;
            }

            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(InventoryCounting.BUSINESS_OBJECT_CODE);
                this.materialBatches = new MaterialBatchItemCs(this);
                this.materialSerials = new MaterialSerialItemCs(this);
            }
            protected registerRules(): ibas.IBusinessRule[] {
                return [
                    // 差额 = 盘点数 - 库存数
                    new ibas.BusinessRuleSubtraction(
                        InventoryCountingLine.PROPERTY_DIFFERENCE_NAME, InventoryCountingLine.PROPERTY_COUNTQUANTITY_NAME, InventoryCountingLine.PROPERTY_INVENTORYQUANTITY_NAME),
                ];
            }
            /** 属性改变时 */
            protected onPropertyChanged(name: string): void {
                super.onPropertyChanged(name);
                // 已盘点，设置盘点数量为库存数量
                if (ibas.strings.equalsIgnoreCase(InventoryCountingLine.PROPERTY_COUNTED_NAME, name)) {
                    if (this.counted === ibas.emYesNo.YES) {
                        if (isNaN(this.countQuantity) || this.countQuantity === 0) {
                            this.countQuantity = this.inventoryQuantity;
                        }
                    }
                }
                // 设置库存数量，未盘点设置为已盘点
                if (ibas.strings.equalsIgnoreCase(InventoryCountingLine.PROPERTY_DIFFERENCE_NAME, name)) {
                    if (!isNaN(this.difference) && this.counted !== ibas.emYesNo.YES) {
                        this.counted = ibas.emYesNo.YES;
                    }
                }
            }
        }

        /** 物料批次项目（库存盘点专用） */
        class MaterialBatchItemC extends MaterialBatchItem {

        }
        /** 物料批次记录集合（库存盘点专用） */
        class MaterialBatchItemCs extends MaterialBatchItems {
            /** 创建并添加子项 */
            create(): IMaterialBatchItem;
            /** 创建并添加子项，批次号 */
            create(batchCode: string): IMaterialBatchItem;
            create(): IMaterialBatchItem {
                let batchCode: string = arguments[0];
                if (!ibas.strings.isEmpty(batchCode)) {
                    for (let item of this) {
                        if (item.batchCode === batchCode) {
                            return item;
                        }
                    }
                }
                let item: MaterialBatchItemC = new MaterialBatchItemC();
                if (!ibas.strings.isEmpty(batchCode)) {
                    item.batchCode = batchCode;
                }
                this.add(item);
                return item;
            }
        }
        /** 物料序列项目（库存盘点专用） */
        class MaterialSerialItemC extends MaterialSerialItem {

        }
        /** 物料序列记录集合（库存盘点专用） */
        class MaterialSerialItemCs extends MaterialSerialItems {
            /** 创建并添加子项 */
            create(): IMaterialSerialItem;
            /** 创建并添加子项，序列编号 */
            create(serialCode: string): IMaterialSerialItem;
            create(): IMaterialSerialItem {
                let serialCode: string = arguments[0];
                if (!ibas.strings.isEmpty(serialCode)) {
                    for (let item of this) {
                        if (item.serialCode === serialCode) {
                            return item;
                        }
                    }
                }
                let item: MaterialSerialItemC = new MaterialSerialItemC();
                if (!ibas.strings.isEmpty(serialCode)) {
                    item.serialCode = serialCode;
                }
                this.add(item);
                return item;
            }
        }
    }
}
