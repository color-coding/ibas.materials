/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 库存转储 */
        export class InventoryTransfer extends ibas.BODocument<InventoryTransfer> implements IInventoryTransfer {

            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_INVENTORYTRANSFER;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-凭证编号 */
            static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
            /** 获取-凭证编号 */
            get docEntry(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_DOCENTRY_NAME);
            }
            /** 设置-凭证编号 */
            set docEntry(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_DOCENTRY_NAME, value);
            }

            /** 映射的属性名称-期间编号 */
            static PROPERTY_DOCNUM_NAME: string = "DocNum";
            /** 获取-期间编号 */
            get docNum(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_DOCNUM_NAME);
            }
            /** 设置-期间编号 */
            set docNum(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_DOCNUM_NAME, value);
            }

            /** 映射的属性名称-期间 */
            static PROPERTY_PERIOD_NAME: string = "Period";
            /** 获取-期间 */
            get period(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_PERIOD_NAME);
            }
            /** 设置-期间 */
            set period(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_PERIOD_NAME, value);
            }

            /** 映射的属性名称-取消 */
            static PROPERTY_CANCELED_NAME: string = "Canceled";
            /** 获取-取消 */
            get canceled(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(InventoryTransfer.PROPERTY_CANCELED_NAME);
            }
            /** 设置-取消 */
            set canceled(value: ibas.emYesNo) {
                this.setProperty(InventoryTransfer.PROPERTY_CANCELED_NAME, value);
            }

            /** 映射的属性名称-状态 */
            static PROPERTY_STATUS_NAME: string = "Status";
            /** 获取-状态 */
            get status(): ibas.emBOStatus {
                return this.getProperty<ibas.emBOStatus>(InventoryTransfer.PROPERTY_STATUS_NAME);
            }
            /** 设置-状态 */
            set status(value: ibas.emBOStatus) {
                this.setProperty(InventoryTransfer.PROPERTY_STATUS_NAME, value);
            }

            /** 映射的属性名称-审批状态 */
            static PROPERTY_APPROVALSTATUS_NAME: string = "ApprovalStatus";
            /** 获取-审批状态 */
            get approvalStatus(): ibas.emApprovalStatus {
                return this.getProperty<ibas.emApprovalStatus>(InventoryTransfer.PROPERTY_APPROVALSTATUS_NAME);
            }
            /** 设置-审批状态 */
            set approvalStatus(value: ibas.emApprovalStatus) {
                this.setProperty(InventoryTransfer.PROPERTY_APPROVALSTATUS_NAME, value);
            }

            /** 映射的属性名称-单据状态 */
            static PROPERTY_DOCUMENTSTATUS_NAME: string = "DocumentStatus";
            /** 获取-单据状态 */
            get documentStatus(): ibas.emDocumentStatus {
                return this.getProperty<ibas.emDocumentStatus>(InventoryTransfer.PROPERTY_DOCUMENTSTATUS_NAME);
            }
            /** 设置-单据状态 */
            set documentStatus(value: ibas.emDocumentStatus) {
                this.setProperty(InventoryTransfer.PROPERTY_DOCUMENTSTATUS_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(InventoryTransfer.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(InventoryTransfer.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(InventoryTransfer.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(InventoryTransfer.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-版本 */
            get logInst(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_LOGINST_NAME);
            }
            /** 设置-版本 */
            set logInst(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-团队成员 */
            static PROPERTY_TEAMMEMBERS_NAME: string = "TeamMembers";
            /** 获取-团队成员 */
            get teamMembers(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_TEAMMEMBERS_NAME);
            }
            /** 设置-团队成员 */
            set teamMembers(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_TEAMMEMBERS_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_ORGANIZATION_NAME, value);
            }

            /** 映射的属性名称-过账日期 */
            static PROPERTY_POSTINGDATE_NAME: string = "PostingDate";
            /** 获取-过账日期 */
            get postingDate(): Date {
                return this.getProperty<Date>(InventoryTransfer.PROPERTY_POSTINGDATE_NAME);
            }
            /** 设置-过账日期 */
            set postingDate(value: Date) {
                this.setProperty(InventoryTransfer.PROPERTY_POSTINGDATE_NAME, value);
            }

            /** 映射的属性名称-到期日 */
            static PROPERTY_DELIVERYDATE_NAME: string = "DeliveryDate";
            /** 获取-到期日 */
            get deliveryDate(): Date {
                return this.getProperty<Date>(InventoryTransfer.PROPERTY_DELIVERYDATE_NAME);
            }
            /** 设置-到期日 */
            set deliveryDate(value: Date) {
                this.setProperty(InventoryTransfer.PROPERTY_DELIVERYDATE_NAME, value);
            }

            /** 映射的属性名称-凭证日期 */
            static PROPERTY_DOCUMENTDATE_NAME: string = "DocumentDate";
            /** 获取-凭证日期 */
            get documentDate(): Date {
                return this.getProperty<Date>(InventoryTransfer.PROPERTY_DOCUMENTDATE_NAME);
            }
            /** 设置-凭证日期 */
            set documentDate(value: Date) {
                this.setProperty(InventoryTransfer.PROPERTY_DOCUMENTDATE_NAME, value);
            }

            /** 映射的属性名称-参考1 */
            static PROPERTY_REFERENCE1_NAME: string = "Reference1";
            /** 获取-参考1 */
            get reference1(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_REFERENCE1_NAME);
            }
            /** 设置-参考1 */
            set reference1(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_REFERENCE1_NAME, value);
            }

            /** 映射的属性名称-参考2 */
            static PROPERTY_REFERENCE2_NAME: string = "Reference2";
            /** 获取-参考2 */
            get reference2(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_REFERENCE2_NAME);
            }
            /** 设置-参考2 */
            set reference2(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_REFERENCE2_NAME, value);
            }

            /** 映射的属性名称-已引用 */
            static PROPERTY_REFERENCED_NAME: string = "Referenced";
            /** 获取-已引用 */
            get referenced(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(InventoryTransfer.PROPERTY_REFERENCED_NAME);
            }
            /** 设置-已引用 */
            set referenced(value: ibas.emYesNo) {
                this.setProperty(InventoryTransfer.PROPERTY_REFERENCED_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_REMARKS_NAME, value);
            }

            /** 映射的属性名称-单据货币 */
            static PROPERTY_DOCUMENTCURRENCY_NAME: string = "DocumentCurrency";
            /** 获取-单据货币 */
            get documentCurrency(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_DOCUMENTCURRENCY_NAME);
            }
            /** 设置-单据货币 */
            set documentCurrency(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_DOCUMENTCURRENCY_NAME, value);
            }

            /** 映射的属性名称-单据汇率 */
            static PROPERTY_DOCUMENTRATE_NAME: string = "DocumentRate";
            /** 获取-单据汇率 */
            get documentRate(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_DOCUMENTRATE_NAME);
            }
            /** 设置-单据汇率 */
            set documentRate(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_DOCUMENTRATE_NAME, value);
            }

            /** 映射的属性名称-单据总计 */
            static PROPERTY_DOCUMENTTOTAL_NAME: string = "DocumentTotal";
            /** 获取-单据总计 */
            get documentTotal(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_DOCUMENTTOTAL_NAME);
            }
            /** 设置-单据总计 */
            set documentTotal(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_DOCUMENTTOTAL_NAME, value);
            }

            /** 映射的属性名称-价格清单 */
            static PROPERTY_PRICELIST_NAME: string = "PriceList";
            /** 获取-价格清单 */
            get priceList(): number {
                return this.getProperty<number>(InventoryTransfer.PROPERTY_PRICELIST_NAME);
            }
            /** 设置-价格清单 */
            set priceList(value: number) {
                this.setProperty(InventoryTransfer.PROPERTY_PRICELIST_NAME, value);
            }

            /** 映射的属性名称-项目代码 */
            static PROPERTY_PROJECT_NAME: string = "Project";
            /** 获取-项目代码 */
            get project(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_PROJECT_NAME);
            }
            /** 设置-项目代码 */
            set project(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_PROJECT_NAME, value);
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

            /** 映射的属性名称-从仓库 */
            static PROPERTY_FROMWAREHOUSE_NAME: string = "FromWarehouse";
            /** 获取-从仓库 */
            get fromWarehouse(): string {
                return this.getProperty<string>(InventoryTransfer.PROPERTY_FROMWAREHOUSE_NAME);
            }
            /** 设置-从仓库 */
            set fromWarehouse(value: string) {
                this.setProperty(InventoryTransfer.PROPERTY_FROMWAREHOUSE_NAME, value);
            }


            /** 映射的属性名称-库存转储-行集合 */
            static PROPERTY_INVENTORYTRANSFERLINES_NAME: string = "InventoryTransferLines";
            /** 获取-库存转储-行集合 */
            get inventoryTransferLines(): InventoryTransferLines {
                return this.getProperty<InventoryTransferLines>(InventoryTransfer.PROPERTY_INVENTORYTRANSFERLINES_NAME);
            }
            /** 设置-库存转储-行集合 */
            set inventoryTransferLines(value: InventoryTransferLines) {
                this.setProperty(InventoryTransfer.PROPERTY_INVENTORYTRANSFERLINES_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.inventoryTransferLines = new InventoryTransferLines(this);
                this.objectCode = ibas.config.applyVariables(InventoryTransfer.BUSINESS_OBJECT_CODE);
                this.documentStatus = ibas.emDocumentStatus.RELEASED;
                this.documentCurrency = ibas.config.get(ibas.CONFIG_ITEM_DEFAULT_CURRENCY);
            }
            /** 重置 */
            reset(): void {
                super.reset();
                this.documentStatus = ibas.emDocumentStatus.RELEASED;
                this.inventoryTransferLines.forEach(c => c.lineStatus = ibas.emDocumentStatus.RELEASED);
            }
            protected registerRules(): ibas.IBusinessRule[] {
                return [
                    // 计算项目-行总计
                    new ibas.BusinessRuleSumElements(
                        InventoryTransfer.PROPERTY_DOCUMENTTOTAL_NAME, InventoryTransfer.PROPERTY_INVENTORYTRANSFERLINES_NAME, InventoryTransferLine.PROPERTY_LINETOTAL_NAME),
                ];
            }
        }
        /** 库存转储-行 集合 */
        export class InventoryTransferLines extends ibas.BusinessObjects<InventoryTransferLine, InventoryTransfer> implements IInventoryTransferLines {
            /** 创建并添加子项 */
            create(): InventoryTransferLine {
                let item: InventoryTransferLine = new InventoryTransferLine();
                this.add(item);
                return item;
            }
        }

        /** 库存转储-行 */
        export class InventoryTransferLine extends ibas.BODocumentLine<InventoryTransferLine> implements IInventoryTransferLine {

            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-编码 */
            static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
            /** 获取-编码 */
            get docEntry(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_DOCENTRY_NAME);
            }
            /** 设置-编码 */
            set docEntry(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_DOCENTRY_NAME, value);
            }

            /** 映射的属性名称-行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-行号 */
            get lineId(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_LINEID_NAME);
            }
            /** 设置-行号 */
            set lineId(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-显示顺序 */
            static PROPERTY_VISORDER_NAME: string = "VisOrder";
            /** 获取-显示顺序 */
            get visOrder(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_VISORDER_NAME);
            }
            /** 设置-显示顺序 */
            set visOrder(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_VISORDER_NAME, value);
            }

            /** 映射的属性名称-取消 */
            static PROPERTY_CANCELED_NAME: string = "Canceled";
            /** 获取-取消 */
            get canceled(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(InventoryTransferLine.PROPERTY_CANCELED_NAME);
            }
            /** 设置-取消 */
            set canceled(value: ibas.emYesNo) {
                this.setProperty(InventoryTransferLine.PROPERTY_CANCELED_NAME, value);
            }

            /** 映射的属性名称-状态 */
            static PROPERTY_STATUS_NAME: string = "Status";
            /** 获取-状态 */
            get status(): ibas.emBOStatus {
                return this.getProperty<ibas.emBOStatus>(InventoryTransferLine.PROPERTY_STATUS_NAME);
            }
            /** 设置-状态 */
            set status(value: ibas.emBOStatus) {
                this.setProperty(InventoryTransferLine.PROPERTY_STATUS_NAME, value);
            }

            /** 映射的属性名称-单据状态 */
            static PROPERTY_LINESTATUS_NAME: string = "LineStatus";
            /** 获取-单据状态 */
            get lineStatus(): ibas.emDocumentStatus {
                return this.getProperty<ibas.emDocumentStatus>(InventoryTransferLine.PROPERTY_LINESTATUS_NAME);
            }
            /** 设置-单据状态 */
            set lineStatus(value: ibas.emDocumentStatus) {
                this.setProperty(InventoryTransferLine.PROPERTY_LINESTATUS_NAME, value);
            }

            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-类型 */
            get objectCode(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-类型 */
            set objectCode(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(InventoryTransferLine.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(InventoryTransferLine.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(InventoryTransferLine.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(InventoryTransferLine.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-版本 */
            get logInst(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_LOGINST_NAME);
            }
            /** 设置-版本 */
            set logInst(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-参考1 */
            static PROPERTY_REFERENCE1_NAME: string = "Reference1";
            /** 获取-参考1 */
            get reference1(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_REFERENCE1_NAME);
            }
            /** 设置-参考1 */
            set reference1(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_REFERENCE1_NAME, value);
            }

            /** 映射的属性名称-参考2 */
            static PROPERTY_REFERENCE2_NAME: string = "Reference2";
            /** 获取-参考2 */
            get reference2(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_REFERENCE2_NAME);
            }
            /** 设置-参考2 */
            set reference2(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_REFERENCE2_NAME, value);
            }

            /** 映射的属性名称-已引用 */
            static PROPERTY_REFERENCED_NAME: string = "Referenced";
            /** 获取-已引用 */
            get referenced(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(InventoryTransferLine.PROPERTY_REFERENCED_NAME);
            }
            /** 设置-已引用 */
            set referenced(value: ibas.emYesNo) {
                this.setProperty(InventoryTransferLine.PROPERTY_REFERENCED_NAME, value);
            }

            /** 映射的属性名称-基于类型 */
            static PROPERTY_BASEDOCUMENTTYPE_NAME: string = "BaseDocumentType";
            /** 获取-基于类型 */
            get baseDocumentType(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_BASEDOCUMENTTYPE_NAME);
            }
            /** 设置-基于类型 */
            set baseDocumentType(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_BASEDOCUMENTTYPE_NAME, value);
            }

            /** 映射的属性名称-基于标识 */
            static PROPERTY_BASEDOCUMENTENTRY_NAME: string = "BaseDocumentEntry";
            /** 获取-基于标识 */
            get baseDocumentEntry(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_BASEDOCUMENTENTRY_NAME);
            }
            /** 设置-基于标识 */
            set baseDocumentEntry(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_BASEDOCUMENTENTRY_NAME, value);
            }

            /** 映射的属性名称-基于行号 */
            static PROPERTY_BASEDOCUMENTLINEID_NAME: string = "BaseDocumentLineId";
            /** 获取-基于行号 */
            get baseDocumentLineId(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_BASEDOCUMENTLINEID_NAME);
            }
            /** 设置-基于行号 */
            set baseDocumentLineId(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_BASEDOCUMENTLINEID_NAME, value);
            }

            /** 映射的属性名称-物料编码 */
            static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
            /** 获取-物料编码 */
            get itemCode(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_ITEMCODE_NAME);
            }
            /** 设置-物料编码 */
            set itemCode(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_ITEMCODE_NAME, value);
            }

            /** 映射的属性名称-物料/服务描述 */
            static PROPERTY_ITEMDESCRIPTION_NAME: string = "ItemDescription";
            /** 获取-物料/服务描述 */
            get itemDescription(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_ITEMDESCRIPTION_NAME);
            }
            /** 设置-物料/服务描述 */
            set itemDescription(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_ITEMDESCRIPTION_NAME, value);
            }

            /** 映射的属性名称-物料标识 */
            static PROPERTY_ITEMSIGN_NAME: string = "ItemSign";
            /** 获取-物料标识 */
            get itemSign(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_ITEMSIGN_NAME);
            }
            /** 设置-物料标识 */
            set itemSign(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_ITEMSIGN_NAME, value);
            }

            /** 映射的属性名称-序号管理 */
            static PROPERTY_SERIALMANAGEMENT_NAME: string = "SerialManagement";
            /** 获取-序号管理 */
            get serialManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(InventoryTransferLine.PROPERTY_SERIALMANAGEMENT_NAME);
            }
            /** 设置-序号管理 */
            set serialManagement(value: ibas.emYesNo) {
                this.setProperty(InventoryTransferLine.PROPERTY_SERIALMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-批号管理 */
            static PROPERTY_BATCHMANAGEMENT_NAME: string = "BatchManagement";
            /** 获取-批号管理 */
            get batchManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(InventoryTransferLine.PROPERTY_BATCHMANAGEMENT_NAME);
            }
            /** 设置-批号管理 */
            set batchManagement(value: ibas.emYesNo) {
                this.setProperty(InventoryTransferLine.PROPERTY_BATCHMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-数量 */
            static PROPERTY_QUANTITY_NAME: string = "Quantity";
            /** 获取-数量 */
            get quantity(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_QUANTITY_NAME);
            }
            /** 设置-数量 */
            set quantity(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_QUANTITY_NAME, value);
            }

            /** 映射的属性名称-计量单位 */
            static PROPERTY_UOM_NAME: string = "UOM";
            /** 获取-计量单位 */
            get uom(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_UOM_NAME);
            }
            /** 设置-计量单位 */
            set uom(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_UOM_NAME, value);
            }

            /** 映射的属性名称-仓库 */
            static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
            /** 获取-仓库 */
            get warehouse(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_WAREHOUSE_NAME);
            }
            /** 设置-仓库 */
            set warehouse(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_WAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-价格 */
            static PROPERTY_PRICE_NAME: string = "Price";
            /** 获取-价格 */
            get price(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_PRICE_NAME);
            }
            /** 设置-价格 */
            set price(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_PRICE_NAME, value);
            }

            /** 映射的属性名称-货币 */
            static PROPERTY_CURRENCY_NAME: string = "Currency";
            /** 获取-货币 */
            get currency(): string {
                return this.getProperty<string>(InventoryTransferLine.PROPERTY_CURRENCY_NAME);
            }
            /** 设置-货币 */
            set currency(value: string) {
                this.setProperty(InventoryTransferLine.PROPERTY_CURRENCY_NAME, value);
            }

            /** 映射的属性名称-汇率 */
            static PROPERTY_RATE_NAME: string = "Rate";
            /** 获取-汇率 */
            get rate(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_RATE_NAME);
            }
            /** 设置-汇率 */
            set rate(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_RATE_NAME, value);
            }

            /** 映射的属性名称-行总计 */
            static PROPERTY_LINETOTAL_NAME: string = "LineTotal";
            /** 获取-行总计 */
            get lineTotal(): number {
                return this.getProperty<number>(InventoryTransferLine.PROPERTY_LINETOTAL_NAME);
            }
            /** 设置-行总计 */
            set lineTotal(value: number) {
                this.setProperty(InventoryTransferLine.PROPERTY_LINETOTAL_NAME, value);
            }

            /** 映射的属性名称-物料批次集合 */
            static PROPERTY_MATERIALBATCHES_NAME: string = "MaterialBatches";
            /** 获取-物料批次集合 */
            get materialBatches(): MaterialBatchItems {
                return this.getProperty<MaterialBatchItems>(InventoryTransferLine.PROPERTY_MATERIALBATCHES_NAME);
            }
            /** 设置-物料批次集合 */
            set materialBatches(value: MaterialBatchItems) {
                this.setProperty(InventoryTransferLine.PROPERTY_MATERIALBATCHES_NAME, value);
            }

            /** 映射的属性名称-物料序列集合 */
            static PROPERTY_MATERIALSERIALS_NAME: string = "MaterialSerials";
            /** 获取-物料序列集合 */
            get materialSerials(): MaterialSerialItems {
                return this.getProperty<MaterialSerialItems>(InventoryTransferLine.PROPERTY_MATERIALSERIALS_NAME);
            }
            /** 设置-物料序列集合 */
            set materialSerials(value: MaterialSerialItems) {
                this.setProperty(InventoryTransferLine.PROPERTY_MATERIALSERIALS_NAME, value);
            }

            get targetQuantity(): number {
                return this.quantity;
            }
            /** 初始化数据 */
            protected init(): void {
                this.materialBatches = new MaterialBatchItemTs(this);
                this.materialSerials = new MaterialSerialItemTs(this);
                this.objectCode = ibas.config.applyVariables(InventoryTransfer.BUSINESS_OBJECT_CODE);
                this.currency = ibas.config.get(ibas.CONFIG_ITEM_DEFAULT_CURRENCY);
            }

            /** 赋值物料 */
            baseMaterial(source: materials.bo.IMaterial): void {
                if (ibas.objects.isNull(source)) {
                    return;
                }
                bo.baseMaterial(this, source);
            }

            protected registerRules(): ibas.IBusinessRule[] {
                return [
                    // 计算总计 = 数量 * 价格
                    new ibas.BusinessRuleMultiplication(
                        InventoryTransferLine.PROPERTY_LINETOTAL_NAME, InventoryTransferLine.PROPERTY_QUANTITY_NAME, InventoryTransferLine.PROPERTY_PRICE_NAME
                        , ibas.config.get(ibas.CONFIG_ITEM_DECIMAL_PLACES_SUM)),
                ];
            }
        }
        /** 物料批次项目（库存转储专用） */
        class MaterialBatchItemT extends MaterialBatchItem {

        }
        /** 物料批次记录集合（库存转储专用） */
        class MaterialBatchItemTs extends MaterialBatchItems {
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
                let item: MaterialBatchItemT = new MaterialBatchItemT();
                if (!ibas.strings.isEmpty(batchCode)) {
                    item.batchCode = batchCode;
                }
                this.add(item);
                return item;
            }
        }
        /** 物料序列项目（库存转储专用） */
        class MaterialSerialItemT extends MaterialSerialItem {

        }
        /** 物料序列记录集合（库存转储专用） */
        class MaterialSerialItemTs extends MaterialSerialItems {
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
                let item: MaterialSerialItemT = new MaterialSerialItemT();
                if (!ibas.strings.isEmpty(serialCode)) {
                    item.serialCode = serialCode;
                }
                this.add(item);
                return item;
            }
        }
    }
}
