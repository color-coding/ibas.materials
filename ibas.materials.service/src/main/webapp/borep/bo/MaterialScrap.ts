/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 物料废品率 */
        export class MaterialScrap extends ibas.BOSimple<MaterialScrap> implements IMaterialScrap {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALSCRAP;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-编号 */
            get objectKey(): number {
                return this.getProperty<number>(MaterialScrap.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-编号 */
            set objectKey(value: number) {
                this.setProperty(MaterialScrap.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-类型 */
            get objectCode(): string {
                return this.getProperty<string>(MaterialScrap.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-类型 */
            set objectCode(value: string) {
                this.setProperty(MaterialScrap.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号（版本） */
            get logInst(): number {
                return this.getProperty<number>(MaterialScrap.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号（版本） */
            set logInst(value: number) {
                this.setProperty(MaterialScrap.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(MaterialScrap.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(MaterialScrap.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-编号系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-编号系列 */
            get series(): number {
                return this.getProperty<number>(MaterialScrap.PROPERTY_SERIES_NAME);
            }
            /** 设置-编号系列 */
            set series(value: number) {
                this.setProperty(MaterialScrap.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(MaterialScrap.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(MaterialScrap.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(MaterialScrap.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(MaterialScrap.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(MaterialScrap.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(MaterialScrap.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(MaterialScrap.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(MaterialScrap.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(MaterialScrap.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(MaterialScrap.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(MaterialScrap.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(MaterialScrap.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(MaterialScrap.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(MaterialScrap.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(MaterialScrap.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(MaterialScrap.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(MaterialScrap.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(MaterialScrap.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(MaterialScrap.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(MaterialScrap.PROPERTY_ORGANIZATION_NAME, value);
            }

            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string = "Name";
            /** 获取-名称 */
            get name(): string {
                return this.getProperty<string>(MaterialScrap.PROPERTY_NAME_NAME);
            }
            /** 设置-名称 */
            set name(value: string) {
                this.setProperty(MaterialScrap.PROPERTY_NAME_NAME, value);
            }

            /** 映射的属性名称-描述 */
            static PROPERTY_DESCRIPTION_NAME: string = "Description";
            /** 获取-描述 */
            get description(): string {
                return this.getProperty<string>(MaterialScrap.PROPERTY_DESCRIPTION_NAME);
            }
            /** 设置-描述 */
            set description(value: string) {
                this.setProperty(MaterialScrap.PROPERTY_DESCRIPTION_NAME, value);
            }

            /** 映射的属性名称-已激活的 */
            static PROPERTY_ACTIVATED_NAME: string = "Activated";
            /** 获取-已激活的 */
            get activated(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(MaterialScrap.PROPERTY_ACTIVATED_NAME);
            }
            /** 设置-已激活的 */
            set activated(value: ibas.emYesNo) {
                this.setProperty(MaterialScrap.PROPERTY_ACTIVATED_NAME, value);
            }

            /** 映射的属性名称-率 */
            static PROPERTY_RATE_NAME: string = "Rate";
            /** 获取-率 */
            get rate(): number {
                return this.getProperty<number>(MaterialScrap.PROPERTY_RATE_NAME);
            }
            /** 设置-率 */
            set rate(value: number) {
                this.setProperty(MaterialScrap.PROPERTY_RATE_NAME, value);
            }

            /** 映射的属性名称-值 */
            static PROPERTY_VALUE_NAME: string = "Value";
            /** 获取-值 */
            get value(): number {
                return this.getProperty<number>(MaterialScrap.PROPERTY_VALUE_NAME);
            }
            /** 设置-值 */
            set value(value: number) {
                this.setProperty(MaterialScrap.PROPERTY_VALUE_NAME, value);
            }

            /** 映射的属性名称-阶梯的 */
            static PROPERTY_TIERED_NAME: string = "Tiered";
            /** 获取-阶梯的 */
            get tiered(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(MaterialScrap.PROPERTY_TIERED_NAME);
            }
            /** 设置-阶梯的 */
            set tiered(value: ibas.emYesNo) {
                this.setProperty(MaterialScrap.PROPERTY_TIERED_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(MaterialScrap.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(MaterialScrap.PROPERTY_REMARKS_NAME, value);
            }


            /** 映射的属性名称-物料废品率 - 阶梯集合 */
            static PROPERTY_MATERIALSCRAPSECTIONS_NAME: string = "MaterialScrapSections";
            /** 获取-物料废品率 - 阶梯集合 */
            get materialScrapSections(): MaterialScrapSections {
                return this.getProperty<MaterialScrapSections>(MaterialScrap.PROPERTY_MATERIALSCRAPSECTIONS_NAME);
            }
            /** 设置-物料废品率 - 阶梯集合 */
            set materialScrapSections(value: MaterialScrapSections) {
                this.setProperty(MaterialScrap.PROPERTY_MATERIALSCRAPSECTIONS_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.materialScrapSections = new MaterialScrapSections(this);
                this.objectCode = ibas.config.applyVariables(MaterialScrap.BUSINESS_OBJECT_CODE);
                this.activated = ibas.emYesNo.YES;
                this.tiered = ibas.emYesNo.YES;
            }

            /**
             * 计算数量的损耗
             * @param quantity 计划数量
             * @returns 加了损耗的数量
             */
            compute(quantity: number): number {
                if (this.tiered === ibas.emYesNo.YES) {
                    // 阶梯损耗
                    for (let section of this.materialScrapSections) {
                        if (section.sectionStart > 0 && section.sectionStart > quantity) {
                            continue;
                        }
                        if (section.sectionEnd > 0 && section.sectionEnd < quantity) {
                            continue;
                        }
                        let total: number = 0;
                        if (section.value > 0) {
                            total += section.value;
                        }
                        if (section.rate > 0) {
                            total += (quantity * section.rate);
                        }
                        return quantity += total;
                    }
                } else {
                    let total: number = 0;
                    if (this.value > 0) {
                        total += this.value;
                    }
                    if (this.rate > 0) {
                        total += (quantity * this.rate);
                    }
                    quantity += total;
                }
                return quantity;
            }

        }

        /** 物料废品率 - 阶梯 集合 */
        export class MaterialScrapSections extends ibas.BusinessObjects<MaterialScrapSection, MaterialScrap> implements IMaterialScrapSections {
            /** 创建并添加子项 */
            create(): MaterialScrapSection {
                let item: MaterialScrapSection = new MaterialScrapSection();
                this.add(item);
                return item;
            }
        }

        /** 物料废品率 - 阶梯 */
        export class MaterialScrapSection extends ibas.BOSimpleLine<MaterialScrapSection> implements IMaterialScrapSection {
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-编号 */
            get objectKey(): number {
                return this.getProperty<number>(MaterialScrapSection.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-编号 */
            set objectKey(value: number) {
                this.setProperty(MaterialScrapSection.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-行号 */
            get lineId(): number {
                return this.getProperty<number>(MaterialScrapSection.PROPERTY_LINEID_NAME);
            }
            /** 设置-行号 */
            set lineId(value: number) {
                this.setProperty(MaterialScrapSection.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-类型 */
            get objectCode(): string {
                return this.getProperty<string>(MaterialScrapSection.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-类型 */
            set objectCode(value: string) {
                this.setProperty(MaterialScrapSection.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号（版本） */
            get logInst(): number {
                return this.getProperty<number>(MaterialScrapSection.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号（版本） */
            set logInst(value: number) {
                this.setProperty(MaterialScrapSection.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(MaterialScrapSection.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(MaterialScrapSection.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(MaterialScrapSection.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(MaterialScrapSection.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(MaterialScrapSection.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(MaterialScrapSection.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(MaterialScrapSection.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(MaterialScrapSection.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(MaterialScrapSection.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(MaterialScrapSection.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(MaterialScrapSection.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(MaterialScrapSection.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(MaterialScrapSection.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(MaterialScrapSection.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(MaterialScrapSection.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(MaterialScrapSection.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(MaterialScrapSection.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(MaterialScrapSection.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-区间开始 */
            static PROPERTY_SECTIONSTART_NAME: string = "SectionStart";
            /** 获取-区间开始 */
            get sectionStart(): number {
                return this.getProperty<number>(MaterialScrapSection.PROPERTY_SECTIONSTART_NAME);
            }
            /** 设置-区间开始 */
            set sectionStart(value: number) {
                this.setProperty(MaterialScrapSection.PROPERTY_SECTIONSTART_NAME, value);
            }

            /** 映射的属性名称-区间结束 */
            static PROPERTY_SECTIONEND_NAME: string = "SectionEnd";
            /** 获取-区间结束 */
            get sectionEnd(): number {
                return this.getProperty<number>(MaterialScrapSection.PROPERTY_SECTIONEND_NAME);
            }
            /** 设置-区间结束 */
            set sectionEnd(value: number) {
                this.setProperty(MaterialScrapSection.PROPERTY_SECTIONEND_NAME, value);
            }

            /** 映射的属性名称-率 */
            static PROPERTY_RATE_NAME: string = "Rate";
            /** 获取-率 */
            get rate(): number {
                return this.getProperty<number>(MaterialScrapSection.PROPERTY_RATE_NAME);
            }
            /** 设置-率 */
            set rate(value: number) {
                this.setProperty(MaterialScrapSection.PROPERTY_RATE_NAME, value);
            }

            /** 映射的属性名称-值 */
            static PROPERTY_VALUE_NAME: string = "Value";
            /** 获取-值 */
            get value(): number {
                return this.getProperty<number>(MaterialScrapSection.PROPERTY_VALUE_NAME);
            }
            /** 设置-值 */
            set value(value: number) {
                this.setProperty(MaterialScrapSection.PROPERTY_VALUE_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(MaterialScrapSection.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(MaterialScrapSection.PROPERTY_REMARKS_NAME, value);
            }


            /** 初始化数据 */
            protected init(): void {
            }
        }

    }
}
