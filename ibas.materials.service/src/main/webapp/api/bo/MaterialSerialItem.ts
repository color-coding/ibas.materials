/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {

        /** 物料序列项目 */
        export interface IMaterialSerialItem extends ibas.IBOSimple {

            /** 序列编码 */
            serialCode: string;

            /** 基于类型 */
            documentType: string;

            /** 基于标识 */
            documentEntry: number;

            /** 基于行号 */
            documentLineId: number;

            /** 对象编号 */
            objectKey: number;

            /** 对象类型 */
            objectCode: string;

            /** 实例号 */
            logInst: number;

            /** 数据源 */
            dataSource: string;

            /** 创建日期 */
            createDate: Date;

            /** 创建时间 */
            createTime: number;

            /** 更新日期 */
            updateDate: Date;

            /** 更新时间 */
            updateTime: number;

            /** 创建用户 */
            createUserSign: number;

            /** 更新用户 */
            updateUserSign: number;

            /** 创建动作标识 */
            createActionId: string;

            /** 更新动作标识 */
            updateActionId: string;


        }

        /** 物料序列记录集合 */
        export interface IMaterialSerialItems extends ibas.IBusinessObjects<IMaterialSerialItem> {
            /** 创建实例 */
            create(): IMaterialSerialItem;
            create(serialCode: string): IMaterialSerialItem;
            /** 总计 */
            total(): number;
        }
        /** 序列管理单据行 */
        export interface IMaterialSerialItemParent extends ibas.IBusinessObject {

            /** 序号管理 */
            serialManagement: ibas.emYesNo;

            /** 类型 */
            objectCode: string;

            /** 标识 */
            docEntry: number;

            /** 行号 */
            lineId: number;

            /** 物料 */
            itemCode: string;

            /** 仓库 */
            warehouse: string;

            /** 数量 */
            quantity: number;

            /** 物料序列集合 */
            materialSerials: IMaterialSerialItems;
        }

        /** 物料序列项目 */
        export class MaterialSerialItem extends ibas.BOSimple<MaterialSerialItem> implements IMaterialSerialItem {

            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIALSERIALITEM;
            /** 构造函数 */
            constructor() {
                super();
            }

            /** 映射的属性名称-序列编码 */
            static PROPERTY_SERIALCODE_NAME: string = "SerialCode";
            /** 获取-序列编码 */
            get serialCode(): string {
                return this.getProperty<string>(MaterialSerialItem.PROPERTY_SERIALCODE_NAME);
            }
            /** 设置-序列编码 */
            set serialCode(value: string) {
                this.setProperty(MaterialSerialItem.PROPERTY_SERIALCODE_NAME, value);
            }

            /** 映射的属性名称-基于类型 */
            static PROPERTY_DOCUMENTTYPE_NAME: string = "DocumentType";
            /** 获取-基于类型 */
            get documentType(): string {
                return this.getProperty<string>(MaterialSerialItem.PROPERTY_DOCUMENTTYPE_NAME);
            }
            /** 设置-基于类型 */
            set documentType(value: string) {
                this.setProperty(MaterialSerialItem.PROPERTY_DOCUMENTTYPE_NAME, value);
            }

            /** 映射的属性名称-基于标识 */
            static PROPERTY_DOCUMENTENTRY_NAME: string = "DocumentEntry";
            /** 获取-基于标识 */
            get documentEntry(): number {
                return this.getProperty<number>(MaterialSerialItem.PROPERTY_DOCUMENTENTRY_NAME);
            }
            /** 设置-基于标识 */
            set documentEntry(value: number) {
                this.setProperty(MaterialSerialItem.PROPERTY_DOCUMENTENTRY_NAME, value);
            }

            /** 映射的属性名称-基于行号 */
            static PROPERTY_DOCUMENTLINEID_NAME: string = "DocumentLineId";
            /** 获取-基于行号 */
            get documentLineId(): number {
                return this.getProperty<number>(MaterialSerialItem.PROPERTY_DOCUMENTLINEID_NAME);
            }
            /** 设置-基于行号 */
            set documentLineId(value: number) {
                this.setProperty(MaterialSerialItem.PROPERTY_DOCUMENTLINEID_NAME, value);
            }

            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(MaterialSerialItem.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(MaterialSerialItem.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(MaterialSerialItem.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(MaterialSerialItem.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(MaterialSerialItem.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(MaterialSerialItem.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(MaterialSerialItem.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(MaterialSerialItem.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(MaterialSerialItem.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(MaterialSerialItem.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(MaterialSerialItem.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(MaterialSerialItem.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(MaterialSerialItem.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(MaterialSerialItem.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(MaterialSerialItem.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(MaterialSerialItem.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(MaterialSerialItem.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(MaterialSerialItem.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(MaterialSerialItem.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(MaterialSerialItem.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(MaterialSerialItem.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(MaterialSerialItem.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(MaterialSerialItem.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(MaterialSerialItem.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(MaterialSerialItem.BUSINESS_OBJECT_CODE);
            }
        }



        /** 物料序列记录集合 */
        export class MaterialSerialItems
            extends ibas.BusinessObjects<IMaterialSerialItem, IMaterialSerialItemParent>
            implements IMaterialSerialItems {
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
                let item: MaterialSerialItem = new MaterialSerialItem();
                if (!ibas.strings.isEmpty(serialCode)) {
                    item.serialCode = serialCode;
                }
                this.add(item);
                return item;
            }
            afterAdd(item: IMaterialSerialItem): void {
                super.afterAdd(item);
                item.documentType = this.parent.objectCode;
                item.documentEntry = this.parent.docEntry;
                item.documentLineId = this.parent.lineId;
            }
            /**
             * 父项单据行发生改变
             */
            onParentPropertyChanged(name: string): void {
                if (ibas.strings.equalsIgnoreCase(name, ibas.BO_PROPERTY_NAME_OBJECTCODE)) {
                    for (let item of this) {
                        item.documentType = this.parent.objectCode;
                    }
                } else if (ibas.strings.equalsIgnoreCase(name, ibas.BO_PROPERTY_NAME_DOCENTRY)) {
                    for (let item of this) {
                        item.documentEntry = this.parent.docEntry;
                    }
                } else if (ibas.strings.equalsIgnoreCase(name, ibas.BO_PROPERTY_NAME_LINEID)) {
                    for (let item of this) {
                        item.documentLineId = this.parent.lineId;
                    }
                }
            }
            /** 总计 */
            total(): number {
                let total: number = 0;
                for (let item of this) {
                    if (item.isDeleted) {
                        continue;
                    }
                    total += 1;
                }
                return total;
            }
        }
    }
}