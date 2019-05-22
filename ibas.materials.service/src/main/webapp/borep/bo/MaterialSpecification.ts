/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 物料规格 */
        export class MaterialSpecification extends ibas.BOSimple<MaterialSpecification> implements IMaterialSpecification {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALSPECIFICATION;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(MaterialSpecification.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(MaterialSpecification.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(MaterialSpecification.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(MaterialSpecification.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(MaterialSpecification.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(MaterialSpecification.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(MaterialSpecification.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(MaterialSpecification.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(MaterialSpecification.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(MaterialSpecification.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(MaterialSpecification.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(MaterialSpecification.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-版本 */
            get logInst(): number {
                return this.getProperty<number>(MaterialSpecification.PROPERTY_LOGINST_NAME);
            }
            /** 设置-版本 */
            set logInst(value: number) {
                this.setProperty(MaterialSpecification.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(MaterialSpecification.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(MaterialSpecification.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(MaterialSpecification.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(MaterialSpecification.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(MaterialSpecification.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(MaterialSpecification.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(MaterialSpecification.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(MaterialSpecification.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(MaterialSpecification.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(MaterialSpecification.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(MaterialSpecification.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(MaterialSpecification.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-审批状态 */
            static PROPERTY_APPROVALSTATUS_NAME: string = "ApprovalStatus";
            /** 获取-审批状态 */
            get approvalStatus(): ibas.emApprovalStatus {
                return this.getProperty<ibas.emApprovalStatus>(MaterialSpecification.PROPERTY_APPROVALSTATUS_NAME);
            }
            /** 设置-审批状态 */
            set approvalStatus(value: ibas.emApprovalStatus) {
                this.setProperty(MaterialSpecification.PROPERTY_APPROVALSTATUS_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(MaterialSpecification.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(MaterialSpecification.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-团队成员 */
            static PROPERTY_TEAMMEMBERS_NAME: string = "TeamMembers";
            /** 获取-团队成员 */
            get teamMembers(): string {
                return this.getProperty<string>(MaterialSpecification.PROPERTY_TEAMMEMBERS_NAME);
            }
            /** 设置-团队成员 */
            set teamMembers(value: string) {
                this.setProperty(MaterialSpecification.PROPERTY_TEAMMEMBERS_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(MaterialSpecification.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(MaterialSpecification.PROPERTY_ORGANIZATION_NAME, value);
            }

            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string = "Name";
            /** 获取-名称 */
            get name(): string {
                return this.getProperty<string>(MaterialSpecification.PROPERTY_NAME_NAME);
            }
            /** 设置-名称 */
            set name(value: string) {
                this.setProperty(MaterialSpecification.PROPERTY_NAME_NAME, value);
            }

            /** 映射的属性名称-规格模板 */
            static PROPERTY_SPECIFICATION_NAME: string = "Specification";
            /** 获取-规格模板 */
            get specification(): number {
                return this.getProperty<number>(MaterialSpecification.PROPERTY_SPECIFICATION_NAME);
            }
            /** 设置-规格模板 */
            set specification(value: number) {
                this.setProperty(MaterialSpecification.PROPERTY_SPECIFICATION_NAME, value);
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

            /** 映射的属性名称-参考1 */
            static PROPERTY_REFERENCE1_NAME: string = "Reference1";
            /** 获取-参考1 */
            get reference1(): string {
                return this.getProperty<string>(MaterialSpecification.PROPERTY_REFERENCE1_NAME);
            }
            /** 设置-参考1 */
            set reference1(value: string) {
                this.setProperty(MaterialSpecification.PROPERTY_REFERENCE1_NAME, value);
            }

            /** 映射的属性名称-参考2 */
            static PROPERTY_REFERENCE2_NAME: string = "Reference2";
            /** 获取-参考2 */
            get reference2(): string {
                return this.getProperty<string>(MaterialSpecification.PROPERTY_REFERENCE2_NAME);
            }
            /** 设置-参考2 */
            set reference2(value: string) {
                this.setProperty(MaterialSpecification.PROPERTY_REFERENCE2_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(MaterialSpecification.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(MaterialSpecification.PROPERTY_REMARKS_NAME, value);
            }


            /** 映射的属性名称-物料规格-项目集合 */
            static PROPERTY_MATERIALSPECIFICATIONITEMS_NAME: string = "MaterialSpecificationItems";
            /** 获取-物料规格-项目集合 */
            get materialSpecificationItems(): MaterialSpecificationItems {
                return this.getProperty<MaterialSpecificationItems>(MaterialSpecification.PROPERTY_MATERIALSPECIFICATIONITEMS_NAME);
            }
            /** 设置-物料规格-项目集合 */
            set materialSpecificationItems(value: MaterialSpecificationItems) {
                this.setProperty(MaterialSpecification.PROPERTY_MATERIALSPECIFICATIONITEMS_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.materialSpecificationItems = new MaterialSpecificationItems(this);
                this.objectCode = ibas.config.applyVariables(MaterialSpecification.BUSINESS_OBJECT_CODE);
            }
        }

        /** 物料规格-项目 集合 */
        export class MaterialSpecificationItems extends ibas.BusinessObjects<MaterialSpecificationItem, MaterialSpecification> implements IMaterialSpecificationItems {
            /** 创建并添加子项 */
            create(): MaterialSpecificationItem {
                let item: MaterialSpecificationItem = new MaterialSpecificationItem();
                this.add(item);
                return item;
            }
        }

        /** 物料规格-项目 */
        export class MaterialSpecificationItem extends ibas.BOSimpleLine<MaterialSpecificationItem> implements IMaterialSpecificationItem {
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(MaterialSpecificationItem.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-对象行号 */
            get lineId(): number {
                return this.getProperty<number>(MaterialSpecificationItem.PROPERTY_LINEID_NAME);
            }
            /** 设置-对象行号 */
            set lineId(value: number) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(MaterialSpecificationItem.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(MaterialSpecificationItem.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(MaterialSpecificationItem.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(MaterialSpecificationItem.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(MaterialSpecificationItem.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(MaterialSpecificationItem.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(MaterialSpecificationItem.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(MaterialSpecificationItem.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(MaterialSpecificationItem.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(MaterialSpecificationItem.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(MaterialSpecificationItem.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-组标记 */
            static PROPERTY_PARENTSIGN_NAME: string = "ParentSign";
            /** 获取-组标记 */
            get parentSign(): string {
                return this.getProperty<string>(MaterialSpecificationItem.PROPERTY_PARENTSIGN_NAME);
            }
            /** 设置-组标记 */
            set parentSign(value: string) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_PARENTSIGN_NAME, value);
            }

            /** 映射的属性名称-标记 */
            static PROPERTY_SIGN_NAME: string = "Sign";
            /** 获取-标记 */
            get sign(): string {
                return this.getProperty<string>(MaterialSpecificationItem.PROPERTY_SIGN_NAME);
            }
            /** 设置-标记 */
            set sign(value: string) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_SIGN_NAME, value);
            }

            /** 映射的属性名称-描述 */
            static PROPERTY_DESCRIPTION_NAME: string = "Description";
            /** 获取-描述 */
            get description(): string {
                return this.getProperty<string>(MaterialSpecificationItem.PROPERTY_DESCRIPTION_NAME);
            }
            /** 设置-描述 */
            set description(value: string) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_DESCRIPTION_NAME, value);
            }

            /** 映射的属性名称-内容 */
            static PROPERTY_CONTENT_NAME: string = "Content";
            /** 获取-内容 */
            get content(): string {
                return this.getProperty<string>(MaterialSpecificationItem.PROPERTY_CONTENT_NAME);
            }
            /** 设置-内容 */
            set content(value: string) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_CONTENT_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_NOTE_NAME: string = "Note";
            /** 获取-备注 */
            get note(): string {
                return this.getProperty<string>(MaterialSpecificationItem.PROPERTY_NOTE_NAME);
            }
            /** 设置-备注 */
            set note(value: string) {
                this.setProperty(MaterialSpecificationItem.PROPERTY_NOTE_NAME, value);
            }


            /** 初始化数据 */
            protected init(): void {
            }
        }

    }
}
