/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 物料系号关联 */
        export class MaterialNumberAssociation extends ibas.BOSimple<MaterialNumberAssociation> implements IMaterialNumberAssociation {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALNUMBERASSOCIATION;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-基于单据类型 */
            static PROPERTY_BASEDOCUMENTTYPE_NAME: string = "BaseDocumentType";
            /** 获取-基于单据类型 */
            get baseDocumentType(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_BASEDOCUMENTTYPE_NAME);
            }
            /** 设置-基于单据类型 */
            set baseDocumentType(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_BASEDOCUMENTTYPE_NAME, value);
            }

            /** 映射的属性名称-基于单据编号 */
            static PROPERTY_BASEDOCUMENTENTRY_NAME: string = "BaseDocumentEntry";
            /** 获取-基于单据编号 */
            get baseDocumentEntry(): number {
                return this.getProperty<number>(MaterialNumberAssociation.PROPERTY_BASEDOCUMENTENTRY_NAME);
            }
            /** 设置-基于单据编号 */
            set baseDocumentEntry(value: number) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_BASEDOCUMENTENTRY_NAME, value);
            }

            /** 映射的属性名称-基于单据行号 */
            static PROPERTY_BASEDOCUMENTLINEID_NAME: string = "BaseDocumentLineId";
            /** 获取-基于单据行号 */
            get baseDocumentLineId(): number {
                return this.getProperty<number>(MaterialNumberAssociation.PROPERTY_BASEDOCUMENTLINEID_NAME);
            }
            /** 设置-基于单据行号 */
            set baseDocumentLineId(value: number) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_BASEDOCUMENTLINEID_NAME, value);
            }

            /** 映射的属性名称-关系 */
            static PROPERTY_RELATION_NAME: string = "Relation";
            /** 获取-关系 */
            get relation(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_RELATION_NAME);
            }
            /** 设置-关系 */
            set relation(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_RELATION_NAME, value);
            }

            /** 映射的属性名称-物料编码 */
            static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
            /** 获取-物料编码 */
            get itemCode(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_ITEMCODE_NAME);
            }
            /** 设置-物料编码 */
            set itemCode(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_ITEMCODE_NAME, value);
            }

            /** 映射的属性名称-仓库编码 */
            static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
            /** 获取-仓库编码 */
            get warehouse(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_WAREHOUSE_NAME);
            }
            /** 设置-仓库编码 */
            set warehouse(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_WAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-批次编码 */
            static PROPERTY_BATCHCODE_NAME: string = "BatchCode";
            /** 获取-批次编码 */
            get batchCode(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_BATCHCODE_NAME);
            }
            /** 设置-批次编码 */
            set batchCode(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_BATCHCODE_NAME, value);
            }

            /** 映射的属性名称-序列编码 */
            static PROPERTY_SERIALCODE_NAME: string = "SerialCode";
            /** 获取-序列编码 */
            get serialCode(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_SERIALCODE_NAME);
            }
            /** 设置-序列编码 */
            set serialCode(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_SERIALCODE_NAME, value);
            }

            /** 映射的属性名称-关联物料编码 */
            static PROPERTY_ASSOCIATEDITEM_NAME: string = "AssociatedItem";
            /** 获取-关联物料编码 */
            get associatedItem(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_ASSOCIATEDITEM_NAME);
            }
            /** 设置-关联物料编码 */
            set associatedItem(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_ASSOCIATEDITEM_NAME, value);
            }

            /** 映射的属性名称-关联仓库编码 */
            static PROPERTY_ASSOCIATEDWAREHOUSE_NAME: string = "AssociatedWarehouse";
            /** 获取-关联仓库编码 */
            get associatedWarehouse(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_ASSOCIATEDWAREHOUSE_NAME);
            }
            /** 设置-关联仓库编码 */
            set associatedWarehouse(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_ASSOCIATEDWAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-关联批次编码 */
            static PROPERTY_ASSOCIATEDBATCH_NAME: string = "AssociatedBatch";
            /** 获取-关联批次编码 */
            get associatedBatch(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_ASSOCIATEDBATCH_NAME);
            }
            /** 设置-关联批次编码 */
            set associatedBatch(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_ASSOCIATEDBATCH_NAME, value);
            }

            /** 映射的属性名称-关联序列编码 */
            static PROPERTY_ASSOCIATEDSERIAL_NAME: string = "AssociatedSerial";
            /** 获取-关联序列编码 */
            get associatedSerial(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_ASSOCIATEDSERIAL_NAME);
            }
            /** 设置-关联序列编码 */
            set associatedSerial(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_ASSOCIATEDSERIAL_NAME, value);
            }

            /** 映射的属性名称-数量 */
            static PROPERTY_QUANTITY_NAME: string = "Quantity";
            /** 获取-数量 */
            get quantity(): number {
                return this.getProperty<number>(MaterialNumberAssociation.PROPERTY_QUANTITY_NAME);
            }
            /** 设置-数量 */
            set quantity(value: number) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_QUANTITY_NAME, value);
            }

            /** 映射的属性名称-原因 */
            static PROPERTY_CAUSES_NAME: string = "Causes";
            /** 获取-原因 */
            get causes(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_CAUSES_NAME);
            }
            /** 设置-原因 */
            set causes(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_CAUSES_NAME, value);
            }

            /** 映射的属性名称-失效日期 */
            static PROPERTY_EXPIRATIONDATE_NAME: string = "ExpirationDate";
            /** 获取-失效日期 */
            get expirationDate(): Date {
                return this.getProperty<Date>(MaterialNumberAssociation.PROPERTY_EXPIRATIONDATE_NAME);
            }
            /** 设置-失效日期 */
            set expirationDate(value: Date) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_EXPIRATIONDATE_NAME, value);
            }

            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(MaterialNumberAssociation.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(MaterialNumberAssociation.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(MaterialNumberAssociation.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(MaterialNumberAssociation.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(MaterialNumberAssociation.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-版本 */
            get logInst(): number {
                return this.getProperty<number>(MaterialNumberAssociation.PROPERTY_LOGINST_NAME);
            }
            /** 设置-版本 */
            set logInst(value: number) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(MaterialNumberAssociation.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(MaterialNumberAssociation.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(MaterialNumberAssociation.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(MaterialNumberAssociation.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(MaterialNumberAssociation.PROPERTY_REMARKS_NAME, value);
            }



            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(MaterialNumberAssociation.BUSINESS_OBJECT_CODE);
            }
        }


    }
}
