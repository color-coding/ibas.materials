/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 业务伙伴物料目录 */
        export class BusinessPartnerMaterialCatalog extends ibas.BOSimple<BusinessPartnerMaterialCatalog> implements IBusinessPartnerMaterialCatalog {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_BUSINESSPARTNERMATERIALCATALOG;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-业务伙伴类型 */
            static PROPERTY_BUSINESSPARTNERTYPE_NAME: string = "BusinessPartnerType";
            /** 获取-业务伙伴类型 */
            get businessPartnerType(): businesspartner.bo.emBusinessPartnerType {
                return this.getProperty<businesspartner.bo.emBusinessPartnerType>(BusinessPartnerMaterialCatalog.PROPERTY_BUSINESSPARTNERTYPE_NAME);
            }
            /** 设置-业务伙伴类型 */
            set businessPartnerType(value: businesspartner.bo.emBusinessPartnerType) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_BUSINESSPARTNERTYPE_NAME, value);
            }

            /** 映射的属性名称-业务伙伴代码 */
            static PROPERTY_BUSINESSPARTNERCODE_NAME: string = "BusinessPartnerCode";
            /** 获取-业务伙伴代码 */
            get businessPartnerCode(): string {
                return this.getProperty<string>(BusinessPartnerMaterialCatalog.PROPERTY_BUSINESSPARTNERCODE_NAME);
            }
            /** 设置-业务伙伴代码 */
            set businessPartnerCode(value: string) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_BUSINESSPARTNERCODE_NAME, value);
            }

            /** 映射的属性名称-物料编码 */
            static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
            /** 获取-物料编码 */
            get itemCode(): string {
                return this.getProperty<string>(BusinessPartnerMaterialCatalog.PROPERTY_ITEMCODE_NAME);
            }
            /** 设置-物料编码 */
            set itemCode(value: string) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_ITEMCODE_NAME, value);
            }

            /** 映射的属性名称-目录编码 */
            static PROPERTY_CATALOGCODE_NAME: string = "CatalogCode";
            /** 获取-目录编码 */
            get catalogCode(): string {
                return this.getProperty<string>(BusinessPartnerMaterialCatalog.PROPERTY_CATALOGCODE_NAME);
            }
            /** 设置-目录编码 */
            set catalogCode(value: string) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_CATALOGCODE_NAME, value);
            }

            /** 映射的属性名称-目录名称 */
            static PROPERTY_CATALOGNAME_NAME: string = "CatalogName";
            /** 获取-目录名称 */
            get catalogName(): string {
                return this.getProperty<string>(BusinessPartnerMaterialCatalog.PROPERTY_CATALOGNAME_NAME);
            }
            /** 设置-目录名称 */
            set catalogName(value: string) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_CATALOGNAME_NAME, value);
            }

            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(BusinessPartnerMaterialCatalog.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(BusinessPartnerMaterialCatalog.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(BusinessPartnerMaterialCatalog.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(BusinessPartnerMaterialCatalog.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(BusinessPartnerMaterialCatalog.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(BusinessPartnerMaterialCatalog.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-版本 */
            get logInst(): number {
                return this.getProperty<number>(BusinessPartnerMaterialCatalog.PROPERTY_LOGINST_NAME);
            }
            /** 设置-版本 */
            set logInst(value: number) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(BusinessPartnerMaterialCatalog.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(BusinessPartnerMaterialCatalog.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(BusinessPartnerMaterialCatalog.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(BusinessPartnerMaterialCatalog.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(BusinessPartnerMaterialCatalog.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(BusinessPartnerMaterialCatalog.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(BusinessPartnerMaterialCatalog.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(BusinessPartnerMaterialCatalog.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_ORGANIZATION_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(BusinessPartnerMaterialCatalog.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(BusinessPartnerMaterialCatalog.PROPERTY_REMARKS_NAME, value);
            }



            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(BusinessPartnerMaterialCatalog.BUSINESS_OBJECT_CODE);
                this.businessPartnerType = businesspartner.bo.emBusinessPartnerType.CUSTOMER;
            }
        }


    }
}
