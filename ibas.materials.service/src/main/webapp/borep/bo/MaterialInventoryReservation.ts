/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 物料库存预留 */
        export class MaterialInventoryReservation extends ibas.BOSimple<MaterialInventoryReservation> implements IMaterialInventoryReservation {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALINVENTORYRESERVATION;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-物料编码 */
            static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
            /** 获取-物料编码 */
            get itemCode(): string {
                return this.getProperty<string>(MaterialInventoryReservation.PROPERTY_ITEMCODE_NAME);
            }
            /** 设置-物料编码 */
            set itemCode(value: string) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_ITEMCODE_NAME, value);
            }

            /** 映射的属性名称-仓库编码 */
            static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
            /** 获取-仓库编码 */
            get warehouse(): string {
                return this.getProperty<string>(MaterialInventoryReservation.PROPERTY_WAREHOUSE_NAME);
            }
            /** 设置-仓库编码 */
            set warehouse(value: string) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_WAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-批次编码 */
            static PROPERTY_BATCHCODE_NAME: string = "BatchCode";
            /** 获取-批次编码 */
            get batchCode(): string {
                return this.getProperty<string>(MaterialInventoryReservation.PROPERTY_BATCHCODE_NAME);
            }
            /** 设置-批次编码 */
            set batchCode(value: string) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_BATCHCODE_NAME, value);
            }

            /** 映射的属性名称-序列编码 */
            static PROPERTY_SERIALCODE_NAME: string = "SerialCode";
            /** 获取-序列编码 */
            get serialCode(): string {
                return this.getProperty<string>(MaterialInventoryReservation.PROPERTY_SERIALCODE_NAME);
            }
            /** 设置-序列编码 */
            set serialCode(value: string) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_SERIALCODE_NAME, value);
            }

            /** 映射的属性名称-数量 */
            static PROPERTY_QUANTITY_NAME: string = "Quantity";
            /** 获取-数量 */
            get quantity(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_QUANTITY_NAME);
            }
            /** 设置-数量 */
            set quantity(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_QUANTITY_NAME, value);
            }

            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string = "InvalidDate";
            /** 获取-失效日期 */
            get invalidDate(): Date {
                return this.getProperty<Date>(MaterialInventoryReservation.PROPERTY_INVALIDDATE_NAME);
            }
            /** 设置-失效日期 */
            set invalidDate(value: Date) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_INVALIDDATE_NAME, value);
            }

            /** 映射的属性名称-失效时间 */
            static PROPERTY_INVALIDTIME_NAME: string = "InvalidTime";
            /** 获取-失效时间 */
            get invalidTime(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_INVALIDTIME_NAME);
            }
            /** 设置-失效时间 */
            set invalidTime(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_INVALIDTIME_NAME, value);
            }

            /** 映射的属性名称-目标单据类型 */
            static PROPERTY_TARGETDOCUMENTTYPE_NAME: string = "TargetDocumentType";
            /** 获取-目标单据类型 */
            get targetDocumentType(): string {
                return this.getProperty<string>(MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTTYPE_NAME);
            }
            /** 设置-目标单据类型 */
            set targetDocumentType(value: string) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTTYPE_NAME, value);
            }

            /** 映射的属性名称-目标单据编号 */
            static PROPERTY_TARGETDOCUMENTENTRY_NAME: string = "TargetDocumentEntry";
            /** 获取-目标单据编号 */
            get targetDocumentEntry(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTENTRY_NAME);
            }
            /** 设置-目标单据编号 */
            set targetDocumentEntry(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTENTRY_NAME, value);
            }

            /** 映射的属性名称-目标单据行号 */
            static PROPERTY_TARGETDOCUMENTLINEID_NAME: string = "TargetDocumentLineId";
            /** 获取-目标单据行号 */
            get targetDocumentLineId(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTLINEID_NAME);
            }
            /** 设置-目标单据行号 */
            set targetDocumentLineId(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTLINEID_NAME, value);
            }

            /** 映射的属性名称-原因 */
            static PROPERTY_CAUSES_NAME: string = "Causes";
            /** 获取-原因 */
            get causes(): string {
                return this.getProperty<string>(MaterialInventoryReservation.PROPERTY_CAUSES_NAME);
            }
            /** 设置-原因 */
            set causes(value: string) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_CAUSES_NAME, value);
            }

            /** 映射的属性名称-状态 */
            static PROPERTY_STATUS_NAME: string = "Status";
            /** 获取-状态 */
            get status(): ibas.emBOStatus {
                return this.getProperty<ibas.emBOStatus>(MaterialInventoryReservation.PROPERTY_STATUS_NAME);
            }
            /** 设置-状态 */
            set status(value: ibas.emBOStatus) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_STATUS_NAME, value);
            }

            /** 映射的属性名称-已清数量 */
            static PROPERTY_CLOSEDQUANTITY_NAME: string = "ClosedQuantity";
            /** 获取-已清数量 */
            get closedQuantity(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_CLOSEDQUANTITY_NAME);
            }
            /** 设置-已清数量 */
            set closedQuantity(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_CLOSEDQUANTITY_NAME, value);
            }

            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(MaterialInventoryReservation.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(MaterialInventoryReservation.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(MaterialInventoryReservation.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-版本 */
            get logInst(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_LOGINST_NAME);
            }
            /** 设置-版本 */
            set logInst(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(MaterialInventoryReservation.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(MaterialInventoryReservation.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(MaterialInventoryReservation.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(MaterialInventoryReservation.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(MaterialInventoryReservation.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_ORGANIZATION_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(MaterialInventoryReservation.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(MaterialInventoryReservation.PROPERTY_REMARKS_NAME, value);
            }

            /** 基于物料库存信息 */
            baseBusinessObject(data: IMaterialInventory): void;
            /** 基于物料批次信息 */
            baseBusinessObject(data: IMaterialBatch): void;
            /** 基于物料序列信息 */
            baseBusinessObject(data: IMaterialSerial): void;
            /** 基于业务对象 */
            baseBusinessObject(): void {
                if (arguments[0] instanceof MaterialInventory) {
                    let data: MaterialInventory = arguments[0];
                    this.itemCode = data.itemCode;
                    this.warehouse = data.warehouse;
                } else if (arguments[0] instanceof MaterialBatch) {
                    let data: MaterialBatch = arguments[0];
                    this.itemCode = data.itemCode;
                    this.warehouse = data.warehouse;
                    this.batchCode = data.batchCode;
                    this.serialCode = undefined;
                } else if (arguments[0] instanceof MaterialSerial) {
                    let data: MaterialSerial = arguments[0];
                    this.itemCode = data.itemCode;
                    this.warehouse = data.warehouse;
                    this.serialCode = data.serialCode;
                    this.batchCode = undefined;
                }
            }
            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(MaterialInventoryReservation.BUSINESS_OBJECT_CODE);
                this.quantity = 0;
                this.closedQuantity = 0;
                this.status = ibas.emBOStatus.OPEN;
            }
            /** 重置 */
            reset(): void {
                super.reset();
                this.quantity = 0;
                this.closedQuantity = 0;
                this.status = ibas.emBOStatus.OPEN;
            }
        }


    }
}
