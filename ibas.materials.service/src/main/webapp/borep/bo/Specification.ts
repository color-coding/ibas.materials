/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 规格模板 */
        export class Specification extends ibas.BOSimple<Specification> implements ISpecification {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_SPECIFICATION;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(Specification.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(Specification.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(Specification.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(Specification.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(Specification.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(Specification.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(Specification.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(Specification.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(Specification.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(Specification.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(Specification.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(Specification.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-版本 */
            get logInst(): number {
                return this.getProperty<number>(Specification.PROPERTY_LOGINST_NAME);
            }
            /** 设置-版本 */
            set logInst(value: number) {
                this.setProperty(Specification.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(Specification.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(Specification.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(Specification.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(Specification.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(Specification.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(Specification.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(Specification.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(Specification.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(Specification.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(Specification.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(Specification.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(Specification.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-审批状态 */
            static PROPERTY_APPROVALSTATUS_NAME: string = "ApprovalStatus";
            /** 获取-审批状态 */
            get approvalStatus(): ibas.emApprovalStatus {
                return this.getProperty<ibas.emApprovalStatus>(Specification.PROPERTY_APPROVALSTATUS_NAME);
            }
            /** 设置-审批状态 */
            set approvalStatus(value: ibas.emApprovalStatus) {
                this.setProperty(Specification.PROPERTY_APPROVALSTATUS_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(Specification.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(Specification.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-团队成员 */
            static PROPERTY_TEAMMEMBERS_NAME: string = "TeamMembers";
            /** 获取-团队成员 */
            get teamMembers(): string {
                return this.getProperty<string>(Specification.PROPERTY_TEAMMEMBERS_NAME);
            }
            /** 设置-团队成员 */
            set teamMembers(value: string) {
                this.setProperty(Specification.PROPERTY_TEAMMEMBERS_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(Specification.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(Specification.PROPERTY_ORGANIZATION_NAME, value);
            }

            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string = "Name";
            /** 获取-名称 */
            get name(): string {
                return this.getProperty<string>(Specification.PROPERTY_NAME_NAME);
            }
            /** 设置-名称 */
            set name(value: string) {
                this.setProperty(Specification.PROPERTY_NAME_NAME, value);
            }

            /** 映射的属性名称-目标类型 */
            static PROPERTY_TARGETTYPE_NAME: string = "TargetType";
            /** 获取-目标类型 */
            get targetType(): emSpecificationTarget {
                return this.getProperty<emSpecificationTarget>(Specification.PROPERTY_TARGETTYPE_NAME);
            }
            /** 设置-目标类型 */
            set targetType(value: emSpecificationTarget) {
                this.setProperty(Specification.PROPERTY_TARGETTYPE_NAME, value);
            }

            /** 映射的属性名称-目标 */
            static PROPERTY_TARGET_NAME: string = "Target";
            /** 获取-目标 */
            get target(): string {
                return this.getProperty<string>(Specification.PROPERTY_TARGET_NAME);
            }
            /** 设置-目标 */
            set target(value: string) {
                this.setProperty(Specification.PROPERTY_TARGET_NAME, value);
            }

            /** 映射的属性名称-是否激活 */
            static PROPERTY_ACTIVATED_NAME: string = "Activated";
            /** 获取-是否激活 */
            get activated(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Specification.PROPERTY_ACTIVATED_NAME);
            }
            /** 设置-是否激活 */
            set activated(value: ibas.emYesNo) {
                this.setProperty(Specification.PROPERTY_ACTIVATED_NAME, value);
            }
            /** 映射的属性名称-生效日期 */
            static PROPERTY_VALIDDATE_NAME: string = "ValidDate";
            /** 获取-生效日期 */
            get validDate(): Date {
                return this.getProperty<Date>(Specification.PROPERTY_VALIDDATE_NAME);
            }
            /** 设置-生效日期 */
            set validDate(value: Date) {
                this.setProperty(Specification.PROPERTY_VALIDDATE_NAME, value);
            }

            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string = "InvalidDate";
            /** 获取-失效日期 */
            get invalidDate(): Date {
                return this.getProperty<Date>(Specification.PROPERTY_INVALIDDATE_NAME);
            }
            /** 设置-失效日期 */
            set invalidDate(value: Date) {
                this.setProperty(Specification.PROPERTY_INVALIDDATE_NAME, value);
            }

            /** 映射的属性名称-分配类型 */
            static PROPERTY_ASSIGNEDTYPE_NAME: string = "AssignedType";
            /** 获取-分配类型 */
            get assignedType(): emSpecificationAssigned {
                return this.getProperty<emSpecificationAssigned>(Specification.PROPERTY_ASSIGNEDTYPE_NAME);
            }
            /** 设置-分配类型 */
            set assignedType(value: emSpecificationAssigned) {
                this.setProperty(Specification.PROPERTY_ASSIGNEDTYPE_NAME, value);
            }

            /** 映射的属性名称-分配目标 */
            static PROPERTY_ASSIGNED_NAME: string = "Assigned";
            /** 获取-分配目标 */
            get assigned(): string {
                return this.getProperty<string>(Specification.PROPERTY_ASSIGNED_NAME);
            }
            /** 设置-分配目标 */
            set assigned(value: string) {
                this.setProperty(Specification.PROPERTY_ASSIGNED_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(Specification.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(Specification.PROPERTY_REMARKS_NAME, value);
            }


            /** 映射的属性名称-规格模板-项目集合 */
            static PROPERTY_SPECIFICATIONITEMS_NAME: string = "SpecificationItems";
            /** 获取-规格模板-项目集合 */
            get specificationItems(): SpecificationItems {
                return this.getProperty<SpecificationItems>(Specification.PROPERTY_SPECIFICATIONITEMS_NAME);
            }
            /** 设置-规格模板-项目集合 */
            set specificationItems(value: SpecificationItems) {
                this.setProperty(Specification.PROPERTY_SPECIFICATIONITEMS_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.specificationItems = new SpecificationItems(this);
                this.objectCode = ibas.config.applyVariables(Specification.BUSINESS_OBJECT_CODE);
                this.targetType = emSpecificationTarget.MATERIAL;
                this.assignedType = emSpecificationAssigned.BUSINESS_PARTNER_GROUP;
                this.activated = ibas.emYesNo.YES;
            }
        }

        /** 规格模板-项目 集合 */
        export class SpecificationItems extends ibas.BusinessObjects<SpecificationItem, Specification> implements ISpecificationItems {
            /** 创建并添加子项 */
            create(): SpecificationItem {
                let item: SpecificationItem = new SpecificationItem();
                this.add(item);
                item.sign = ibas.strings.fill(item.lineId.toString(), 4, "0") + "00";
                return item;
            }
        }

        /** 规格模板-项目 */
        export class SpecificationItem extends ibas.BOSimpleLine<SpecificationItem> implements ISpecificationItem {
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(SpecificationItem.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(SpecificationItem.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-对象行号 */
            get lineId(): number {
                return this.getProperty<number>(SpecificationItem.PROPERTY_LINEID_NAME);
            }
            /** 设置-对象行号 */
            set lineId(value: number) {
                this.setProperty(SpecificationItem.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(SpecificationItem.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(SpecificationItem.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(SpecificationItem.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(SpecificationItem.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(SpecificationItem.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(SpecificationItem.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(SpecificationItem.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(SpecificationItem.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(SpecificationItem.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(SpecificationItem.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(SpecificationItem.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(SpecificationItem.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(SpecificationItem.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(SpecificationItem.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(SpecificationItem.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(SpecificationItem.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(SpecificationItem.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(SpecificationItem.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(SpecificationItem.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(SpecificationItem.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(SpecificationItem.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(SpecificationItem.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-组标记 */
            static PROPERTY_PARENTSIGN_NAME: string = "ParentSign";
            /** 获取-组标记 */
            get parentSign(): string {
                return this.getProperty<string>(SpecificationItem.PROPERTY_PARENTSIGN_NAME);
            }
            /** 设置-组标记 */
            set parentSign(value: string) {
                this.setProperty(SpecificationItem.PROPERTY_PARENTSIGN_NAME, value);
            }

            /** 映射的属性名称-标记 */
            static PROPERTY_SIGN_NAME: string = "Sign";
            /** 获取-标记 */
            get sign(): string {
                return this.getProperty<string>(SpecificationItem.PROPERTY_SIGN_NAME);
            }
            /** 设置-标记 */
            set sign(value: string) {
                this.setProperty(SpecificationItem.PROPERTY_SIGN_NAME, value);
            }

            /** 映射的属性名称-描述 */
            static PROPERTY_DESCRIPTION_NAME: string = "Description";
            /** 获取-描述 */
            get description(): string {
                return this.getProperty<string>(SpecificationItem.PROPERTY_DESCRIPTION_NAME);
            }
            /** 设置-描述 */
            set description(value: string) {
                this.setProperty(SpecificationItem.PROPERTY_DESCRIPTION_NAME, value);
            }

            /** 映射的属性名称-内容 */
            static PROPERTY_CONTENT_NAME: string = "Content";
            /** 获取-内容 */
            get content(): string {
                return this.getProperty<string>(SpecificationItem.PROPERTY_CONTENT_NAME);
            }
            /** 设置-内容 */
            set content(value: string) {
                this.setProperty(SpecificationItem.PROPERTY_CONTENT_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_NOTE_NAME: string = "Note";
            /** 获取-备注 */
            get note(): string {
                return this.getProperty<string>(SpecificationItem.PROPERTY_NOTE_NAME);
            }
            /** 设置-备注 */
            set note(value: string) {
                this.setProperty(SpecificationItem.PROPERTY_NOTE_NAME, value);
            }

            /** 映射的属性名称-可编辑 */
            static PROPERTY_EDITABLE_NAME: string = "Editable";
            /** 获取-可编辑 */
            get editable(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(SpecificationItem.PROPERTY_EDITABLE_NAME);
            }
            /** 设置-可编辑 */
            set editable(value: ibas.emYesNo) {
                this.setProperty(SpecificationItem.PROPERTY_EDITABLE_NAME, value);
            }

            /** 映射的属性名称-必填的 */
            static PROPERTY_REQUIRED_NAME: string = "Required";
            /** 获取-必填的 */
            get required(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(SpecificationItem.PROPERTY_REQUIRED_NAME);
            }
            /** 设置-必填的 */
            set required(value: ibas.emYesNo) {
                this.setProperty(SpecificationItem.PROPERTY_REQUIRED_NAME, value);
            }

            /** 映射的属性名称-规格模板-项目值集合 */
            static PROPERTY_SPECIFICATIONITEMVALUES_NAME: string = "SpecificationItemValues";
            /** 获取-规格模板-项目值集合 */
            get specificationItemValues(): SpecificationItemValues {
                return this.getProperty<SpecificationItemValues>(SpecificationItem.PROPERTY_SPECIFICATIONITEMVALUES_NAME);
            }
            /** 设置-规格模板-项目值集合 */
            set specificationItemValues(value: SpecificationItemValues) {
                this.setProperty(SpecificationItem.PROPERTY_SPECIFICATIONITEMVALUES_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.specificationItemValues = new SpecificationItemValues(this);
                this.editable = ibas.emYesNo.YES;
            }
        }

        /** 规格模板-项目值 集合 */
        export class SpecificationItemValues extends ibas.BusinessObjects<SpecificationItemValue, SpecificationItem> implements ISpecificationItemValues {
            /** 创建并添加子项 */
            create(): SpecificationItemValue {
                let item: SpecificationItemValue = new SpecificationItemValue();
                this.add(item);
                return item;
            }
        }
        /** 规格模板-项目值 */
        export class SpecificationItemValue extends ibas.BOSimpleLine<SpecificationItemValue> implements ISpecificationItemValue {
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(SpecificationItemValue.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(SpecificationItemValue.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-对象行号 */
            get lineId(): number {
                return this.getProperty<number>(SpecificationItemValue.PROPERTY_LINEID_NAME);
            }
            /** 设置-对象行号 */
            set lineId(value: number) {
                this.setProperty(SpecificationItemValue.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(SpecificationItemValue.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(SpecificationItemValue.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(SpecificationItemValue.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(SpecificationItemValue.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(SpecificationItemValue.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(SpecificationItemValue.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(SpecificationItemValue.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(SpecificationItemValue.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(SpecificationItemValue.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(SpecificationItemValue.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(SpecificationItemValue.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(SpecificationItemValue.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(SpecificationItemValue.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(SpecificationItemValue.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(SpecificationItemValue.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(SpecificationItemValue.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(SpecificationItemValue.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(SpecificationItemValue.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(SpecificationItemValue.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(SpecificationItemValue.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(SpecificationItemValue.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(SpecificationItemValue.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-项目号 */
            static PROPERTY_ITEMID_NAME: string = "ItemId";
            /** 获取-项目号 */
            get itemId(): number {
                return this.getProperty<number>(SpecificationItemValue.PROPERTY_ITEMID_NAME);
            }
            /** 设置-项目号 */
            set itemId(value: number) {
                this.setProperty(SpecificationItemValue.PROPERTY_ITEMID_NAME, value);
            }

            /** 映射的属性名称-值 */
            static PROPERTY_VALUE_NAME: string = "Value";
            /** 获取-值 */
            get value(): string {
                return this.getProperty<string>(SpecificationItemValue.PROPERTY_VALUE_NAME);
            }
            /** 设置-值 */
            set value(value: string) {
                this.setProperty(SpecificationItemValue.PROPERTY_VALUE_NAME, value);
            }

            /** 映射的属性名称-描述 */
            static PROPERTY_DESCRIPTION_NAME: string = "Description";
            /** 获取-描述 */
            get description(): string {
                return this.getProperty<string>(SpecificationItemValue.PROPERTY_DESCRIPTION_NAME);
            }
            /** 设置-描述 */
            set description(value: string) {
                this.setProperty(SpecificationItemValue.PROPERTY_DESCRIPTION_NAME, value);
            }

            /** 映射的属性名称-关联的 */
            static PROPERTY_ASSOCIATED_NAME: string = "Associated";
            /** 获取-关联的 */
            get associated(): string {
                return this.getProperty<string>(SpecificationItemValue.PROPERTY_ASSOCIATED_NAME);
            }
            /** 设置-关联的 */
            set associated(value: string) {
                this.setProperty(SpecificationItemValue.PROPERTY_ASSOCIATED_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
            }
        }

    }
}
