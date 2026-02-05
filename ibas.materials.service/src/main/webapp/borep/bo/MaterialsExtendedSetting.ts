/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 */
namespace materials {
    export namespace bo {
        /** 物料扩展设置 */
        export class MaterialsExtendedSetting extends ibas.BOSimple<MaterialsExtendedSetting> implements IMaterialsExtendedSetting {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALSEXTENDEDSETTING;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-扩展项目 */
            static PROPERTY_ELEMENT_NAME: string = "Element";
            /** 获取-扩展项目 */
            get element(): string {
                return this.getProperty<string>(MaterialsExtendedSetting.PROPERTY_ELEMENT_NAME);
            }
            /** 设置-扩展项目 */
            set element(value: string) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_ELEMENT_NAME, value);
            }

            /** 映射的属性名称-描述 */
            static PROPERTY_DESCRIPTION_NAME: string = "Description";
            /** 获取-描述 */
            get description(): string {
                return this.getProperty<string>(MaterialsExtendedSetting.PROPERTY_DESCRIPTION_NAME);
            }
            /** 设置-描述 */
            set description(value: string) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_DESCRIPTION_NAME, value);
            }

            /** 映射的属性名称-目标类型 */
            static PROPERTY_TARGETCODE_NAME: string = "TargetCode";
            /** 获取-目标类型 */
            get targetCode(): string {
                return this.getProperty<string>(MaterialsExtendedSetting.PROPERTY_TARGETCODE_NAME);
            }
            /** 设置-目标类型 */
            set targetCode(value: string) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_TARGETCODE_NAME, value);
            }

            /** 映射的属性名称-目标键值 */
            static PROPERTY_TARGETKEYS_NAME: string = "TargetKeys";
            /** 获取-目标键值 */
            get targetKeys(): string {
                return this.getProperty<string>(MaterialsExtendedSetting.PROPERTY_TARGETKEYS_NAME);
            }
            /** 设置-目标键值 */
            set targetKeys(value: string) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_TARGETKEYS_NAME, value);
            }

            /** 映射的属性名称-启用的 */
            static PROPERTY_ENABLED_NAME: string = "Enabled";
            /** 获取-启用的 */
            get enabled(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(MaterialsExtendedSetting.PROPERTY_ENABLED_NAME);
            }
            /** 设置-启用的 */
            set enabled(value: ibas.emYesNo) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_ENABLED_NAME, value);
            }

            /** 映射的属性名称-设置 */
            static PROPERTY_SETTINGS_NAME: string = "Settings";
            /** 获取-设置 */
            get settings(): string {
                return this.getProperty<string>(MaterialsExtendedSetting.PROPERTY_SETTINGS_NAME);
            }
            /** 设置-设置 */
            set settings(value: string) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_SETTINGS_NAME, value);
            }

            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(MaterialsExtendedSetting.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(MaterialsExtendedSetting.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(MaterialsExtendedSetting.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(MaterialsExtendedSetting.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(MaterialsExtendedSetting.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(MaterialsExtendedSetting.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-版本 */
            get logInst(): number {
                return this.getProperty<number>(MaterialsExtendedSetting.PROPERTY_LOGINST_NAME);
            }
            /** 设置-版本 */
            set logInst(value: number) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(MaterialsExtendedSetting.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(MaterialsExtendedSetting.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(MaterialsExtendedSetting.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(MaterialsExtendedSetting.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(MaterialsExtendedSetting.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(MaterialsExtendedSetting.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(MaterialsExtendedSetting.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(MaterialsExtendedSetting.BUSINESS_OBJECT_CODE);
            }
        }


    }
}
