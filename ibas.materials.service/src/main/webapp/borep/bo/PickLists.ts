/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace bo {
        /** 拣配清单 */
        export class PickLists extends ibas.BOSimple<PickLists> implements IPickLists {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_PICKLISTS;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(PickLists.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(PickLists.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(PickLists.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(PickLists.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(PickLists.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(PickLists.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(PickLists.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(PickLists.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(PickLists.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(PickLists.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(PickLists.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(PickLists.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(PickLists.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(PickLists.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(PickLists.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(PickLists.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(PickLists.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(PickLists.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(PickLists.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(PickLists.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(PickLists.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(PickLists.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(PickLists.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(PickLists.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(PickLists.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(PickLists.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(PickLists.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(PickLists.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(PickLists.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(PickLists.PROPERTY_ORGANIZATION_NAME, value);
            }

            /** 映射的属性名称-参考1 */
            static PROPERTY_REFERENCE1_NAME: string = "Reference1";
            /** 获取-参考1 */
            get reference1(): string {
                return this.getProperty<string>(PickLists.PROPERTY_REFERENCE1_NAME);
            }
            /** 设置-参考1 */
            set reference1(value: string) {
                this.setProperty(PickLists.PROPERTY_REFERENCE1_NAME, value);
            }

            /** 映射的属性名称-参考2 */
            static PROPERTY_REFERENCE2_NAME: string = "Reference2";
            /** 获取-参考2 */
            get reference2(): string {
                return this.getProperty<string>(PickLists.PROPERTY_REFERENCE2_NAME);
            }
            /** 设置-参考2 */
            set reference2(value: string) {
                this.setProperty(PickLists.PROPERTY_REFERENCE2_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(PickLists.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(PickLists.PROPERTY_REMARKS_NAME, value);
            }

            /** 映射的属性名称-拣配员 */
            static PROPERTY_PICKER_NAME: string = "Picker";
            /** 获取-拣配员 */
            get picker(): string {
                return this.getProperty<string>(PickLists.PROPERTY_PICKER_NAME);
            }
            /** 设置-拣配员 */
            set picker(value: string) {
                this.setProperty(PickLists.PROPERTY_PICKER_NAME, value);
            }

            /** 映射的属性名称-拣配日期 */
            static PROPERTY_PICKDATE_NAME: string = "PickDate";
            /** 获取-拣配日期 */
            get pickDate(): Date {
                return this.getProperty<Date>(PickLists.PROPERTY_PICKDATE_NAME);
            }
            /** 设置-拣配日期 */
            set pickDate(value: Date) {
                this.setProperty(PickLists.PROPERTY_PICKDATE_NAME, value);
            }

            /** 映射的属性名称-拣配状态 */
            static PROPERTY_PICKSTATUS_NAME: string = "PickStatus";
            /** 获取-拣配状态 */
            get pickStatus(): emPickStatus {
                return this.getProperty<emPickStatus>(PickLists.PROPERTY_PICKSTATUS_NAME);
            }
            /** 设置-拣配状态 */
            set pickStatus(value: emPickStatus) {
                this.setProperty(PickLists.PROPERTY_PICKSTATUS_NAME, value);
            }


            /** 映射的属性名称-拣配清单-行集合 */
            static PROPERTY_PICKLISTSLINES_NAME: string = "PickListsLines";
            /** 获取-拣配清单-行集合 */
            get pickListsLines(): PickListsLines {
                return this.getProperty<PickListsLines>(PickLists.PROPERTY_PICKLISTSLINES_NAME);
            }
            /** 设置-拣配清单-行集合 */
            set pickListsLines(value: PickListsLines) {
                this.setProperty(PickLists.PROPERTY_PICKLISTSLINES_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.pickListsLines = new PickListsLines(this);
                this.objectCode = ibas.config.applyVariables(PickLists.BUSINESS_OBJECT_CODE);
                this.pickStatus = bo.emPickStatus.RELEASED;
                this.dataOwner = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_ID);
                this.organization = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_BELONG);
                this.picker = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_NAME);
                this.pickDate = ibas.dates.today();
            }
        }

        /** 拣配清单-行 集合 */
        export class PickListsLines extends ibas.BusinessObjects<PickListsLine, PickLists> implements IPickListsLines {
            /** 创建并添加子项 */
            create(): PickListsLine {
                let item: PickListsLine = new PickListsLine();
                this.add(item);
                return item;
            }
            public afterAdd(item: PickListsLine): void {
                super.afterAdd(item);
                this.updatePickStatus();
            }
            public afterRemove(item: PickListsLine): void {
                super.afterRemove(item);
                this.updatePickStatus();
            }
            protected onItemPropertyChanged(item: PickListsLine, name: string): void {
                super.onItemPropertyChanged(item, name);
                if (ibas.strings.equalsIgnoreCase(PickListsLine.PROPERTY_PICKSTATUS_NAME, name)) {
                    this.updatePickStatus();
                }
            }
            protected updatePickStatus(): void {
                let filterDeleted: PickListsLine[] = this.filterDeleted();
                let line: PickListsLine = filterDeleted.find(c => c.pickStatus !== emPickStatus.RELEASED);
                if (ibas.objects.isNull(line)) {
                    this.parent.pickStatus = emPickStatus.RELEASED;
                    return;
                }
                line = filterDeleted.find(c => c.pickStatus !== emPickStatus.PICKED);
                if (ibas.objects.isNull(line)) {
                    this.parent.pickStatus = emPickStatus.PICKED;
                    return;
                }
                line = filterDeleted.find(c => c.pickStatus !== emPickStatus.CLOSED && c.pickStatus !== emPickStatus.PARTIALLYDELIVERED);
                if (ibas.objects.isNull(line)) {
                    this.parent.pickStatus = emPickStatus.CLOSED;
                    return;
                }
                line = filterDeleted.find(c => c.pickStatus === emPickStatus.PARTIALLYDELIVERED || c.pickStatus === emPickStatus.CLOSED);
                if (!ibas.objects.isNull(line)) {
                    this.parent.pickStatus = emPickStatus.PARTIALLYDELIVERED;
                    return;
                }
                line = filterDeleted.find(c => c.pickStatus === emPickStatus.PARTIALLYPICKED || c.pickStatus === emPickStatus.PICKED);
                if (!ibas.objects.isNull(line)) {
                    this.parent.pickStatus = emPickStatus.PARTIALLYPICKED;
                    return;
                }
            }
            async useInventoryReservationToPick(): Promise<void> {
                try {
                    this.resetAll();
                    let items: Array<materials.bo.IPickListsLine> = this.filterDeleted().filter(c => {
                        // 已交货或部分交货的行不重置
                        return c.pickStatus !== bo.emPickStatus.PARTIALLYDELIVERED && c.pickStatus !== bo.emPickStatus.CLOSED;
                    });
                    for (const item of items) {
                        let inventoryReservations: ibas.IList<materials.bo.MaterialInventoryReservation> = await this.fetchMaterialInventoryReservationAsync(item);
                        if (inventoryReservations.length === 0) {
                            continue;
                        }
                        let pickQuantity: number = 0;
                        for (const inventoryReservation of inventoryReservations) {
                            let reservationQunatity: number = ibas.numbers.round(inventoryReservation.quantity - inventoryReservation.closedQuantity);
                            pickQuantity = ibas.numbers.round(pickQuantity + reservationQunatity);
                            if (!ibas.strings.isEmpty(inventoryReservation.serialCode)) {
                                let serialItem: bo.IPickListsNumber = item.pickListsNumbers.create();
                                serialItem.serialCode = inventoryReservation.serialCode;
                                serialItem.warehouse = inventoryReservation.warehouse;
                                serialItem.pickQuantity = 1;
                            } else if (!ibas.strings.isEmpty(inventoryReservation.batchCode)) {
                                let batchItem: bo.IPickListsNumber = item.pickListsNumbers.create();
                                batchItem.batchCode = inventoryReservation.batchCode;
                                batchItem.warehouse = inventoryReservation.warehouse;
                                batchItem.pickQuantity = reservationQunatity;
                            }
                        }
                        item.pickQuantity = pickQuantity;
                    }
                } catch (error) {
                    throw error;
                }
            }
            protected resetAll(): void {
                let items: Array<materials.bo.IPickListsLine> = this.filterDeleted().filter(c => {
                    // 已交货或部分交货的行不重置
                    return c.pickStatus !== bo.emPickStatus.PARTIALLYDELIVERED && c.pickStatus !== bo.emPickStatus.CLOSED;
                });
                for (const item of items) {
                    item.pickQuantity = 0;
                    // 移除序号
                    let batchItems: bo.IPickListsNumber[] = item.pickListsNumbers.filterDeleted();
                    for (let batchItem of batchItems) {
                        if (item.pickListsNumbers.indexOf(batchItem) >= 0) {
                            if (item.isNew) {
                                // 新建的移除集合
                                item.pickListsNumbers.remove(batchItem);
                            } else {
                                // 非新建标记删除
                                batchItem.delete();
                            }
                        }
                    }
                }
            }
            /**
             * 获取物料库存预留
             */
            private async fetchMaterialInventoryReservationAsync(item: bo.IPickListsLine): Promise<ibas.IList<materials.bo.MaterialInventoryReservation>> {
                let criteria: ibas.Criteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = materials.bo.MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTTYPE_NAME;
                condition.value = item.baseDocumentType;
                condition = criteria.conditions.create();
                condition.alias = materials.bo.MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTENTRY_NAME;
                condition.value = ibas.strings.valueOf(ibas.numbers.valueOf(item.baseDocumentEntry));
                condition = criteria.conditions.create();
                condition.alias = materials.bo.MaterialInventoryReservation.PROPERTY_TARGETDOCUMENTLINEID_NAME;
                condition.value = ibas.strings.valueOf(ibas.numbers.valueOf(item.baseDocumentLineId));
                condition = criteria.conditions.create();
                condition.alias = materials.bo.MaterialInventoryReservation.PROPERTY_STATUS_NAME;
                condition.value = ibas.emBOStatus.OPEN.toString();
                condition = criteria.conditions.create();
                condition.alias = materials.bo.MaterialInventoryReservation.PROPERTY_QUANTITY_NAME;
                condition.operation = ibas.emConditionOperation.GRATER_THAN;
                condition.comparedAlias = materials.bo.MaterialInventoryReservation.PROPERTY_CLOSEDQUANTITY_NAME;
                let promise: Promise<ibas.IList<materials.bo.MaterialInventoryReservation>> = new Promise<ibas.IList<materials.bo.MaterialInventoryReservation>>(async (resolve) => {
                    let boRepository: materials.bo.BORepositoryMaterials = new materials.bo.BORepositoryMaterials();
                    boRepository.fetchMaterialInventoryReservation({
                        criteria: criteria,
                        onCompleted(opRslt: ibas.IOperationResult<materials.bo.MaterialInventoryReservation>): void {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                resolve(opRslt.resultObjects);
                            } catch (error) {
                                resolve(new ibas.ArrayList());
                            }
                        }
                    });
                });
                return promise;
            }
        }

        /** 拣配清单-行 */
        export class PickListsLine extends ibas.BOSimpleLine<PickListsLine> implements IPickListsLine {
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(PickListsLine.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-对象行号 */
            get lineId(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_LINEID_NAME);
            }
            /** 设置-对象行号 */
            set lineId(value: number) {
                this.setProperty(PickListsLine.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(PickListsLine.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(PickListsLine.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(PickListsLine.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(PickListsLine.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(PickListsLine.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(PickListsLine.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(PickListsLine.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(PickListsLine.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(PickListsLine.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(PickListsLine.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(PickListsLine.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(PickListsLine.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(PickListsLine.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(PickListsLine.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(PickListsLine.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(PickListsLine.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(PickListsLine.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(PickListsLine.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(PickListsLine.PROPERTY_REMARKS_NAME, value);
            }

            /** 映射的属性名称-基于类型 */
            static PROPERTY_BASEDOCUMENTTYPE_NAME: string = "BaseDocumentType";
            /** 获取-基于类型 */
            get baseDocumentType(): string {
                return this.getProperty<string>(PickListsLine.PROPERTY_BASEDOCUMENTTYPE_NAME);
            }
            /** 设置-基于类型 */
            set baseDocumentType(value: string) {
                this.setProperty(PickListsLine.PROPERTY_BASEDOCUMENTTYPE_NAME, value);
            }

            /** 映射的属性名称-基于标识 */
            static PROPERTY_BASEDOCUMENTENTRY_NAME: string = "BaseDocumentEntry";
            /** 获取-基于标识 */
            get baseDocumentEntry(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_BASEDOCUMENTENTRY_NAME);
            }
            /** 设置-基于标识 */
            set baseDocumentEntry(value: number) {
                this.setProperty(PickListsLine.PROPERTY_BASEDOCUMENTENTRY_NAME, value);
            }

            /** 映射的属性名称-基于行号 */
            static PROPERTY_BASEDOCUMENTLINEID_NAME: string = "BaseDocumentLineId";
            /** 获取-基于行号 */
            get baseDocumentLineId(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_BASEDOCUMENTLINEID_NAME);
            }
            /** 设置-基于行号 */
            set baseDocumentLineId(value: number) {
                this.setProperty(PickListsLine.PROPERTY_BASEDOCUMENTLINEID_NAME, value);
            }

            /** 映射的属性名称-交货/到期日期 */
            static PROPERTY_DELIVERYDATE_NAME: string = "DeliveryDate";
            /** 获取-交货/到期日期 */
            get deliveryDate(): Date {
                return this.getProperty<Date>(PickListsLine.PROPERTY_DELIVERYDATE_NAME);
            }
            /** 设置-交货/到期日期 */
            set deliveryDate(value: Date) {
                this.setProperty(PickListsLine.PROPERTY_DELIVERYDATE_NAME, value);
            }

            /** 映射的属性名称-物料编码 */
            static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
            /** 获取-物料编码 */
            get itemCode(): string {
                return this.getProperty<string>(PickListsLine.PROPERTY_ITEMCODE_NAME);
            }
            /** 设置-物料编码 */
            set itemCode(value: string) {
                this.setProperty(PickListsLine.PROPERTY_ITEMCODE_NAME, value);
            }

            /** 映射的属性名称-物料/服务描述 */
            static PROPERTY_ITEMDESCRIPTION_NAME: string = "ItemDescription";
            /** 获取-物料/服务描述 */
            get itemDescription(): string {
                return this.getProperty<string>(PickListsLine.PROPERTY_ITEMDESCRIPTION_NAME);
            }
            /** 设置-物料/服务描述 */
            set itemDescription(value: string) {
                this.setProperty(PickListsLine.PROPERTY_ITEMDESCRIPTION_NAME, value);
            }

            /** 映射的属性名称-物料标识 */
            static PROPERTY_ITEMSIGN_NAME: string = "ItemSign";
            /** 获取-物料标识 */
            get itemSign(): string {
                return this.getProperty<string>(PickListsLine.PROPERTY_ITEMSIGN_NAME);
            }
            /** 设置-物料标识 */
            set itemSign(value: string) {
                this.setProperty(PickListsLine.PROPERTY_ITEMSIGN_NAME, value);
            }

            /** 映射的属性名称-序号管理 */
            static PROPERTY_SERIALMANAGEMENT_NAME: string = "SerialManagement";
            /** 获取-序号管理 */
            get serialManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(PickListsLine.PROPERTY_SERIALMANAGEMENT_NAME);
            }
            /** 设置-序号管理 */
            set serialManagement(value: ibas.emYesNo) {
                this.setProperty(PickListsLine.PROPERTY_SERIALMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-批号管理 */
            static PROPERTY_BATCHMANAGEMENT_NAME: string = "BatchManagement";
            /** 获取-批号管理 */
            get batchManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(PickListsLine.PROPERTY_BATCHMANAGEMENT_NAME);
            }
            /** 设置-批号管理 */
            set batchManagement(value: ibas.emYesNo) {
                this.setProperty(PickListsLine.PROPERTY_BATCHMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-数量 */
            static PROPERTY_QUANTITY_NAME: string = "Quantity";
            /** 获取-数量 */
            get quantity(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_QUANTITY_NAME);
            }
            /** 设置-数量 */
            set quantity(value: number) {
                this.setProperty(PickListsLine.PROPERTY_QUANTITY_NAME, value);
            }

            /** 映射的属性名称-单位 */
            static PROPERTY_UOM_NAME: string = "UOM";
            /** 获取-单位 */
            get uom(): string {
                return this.getProperty<string>(PickListsLine.PROPERTY_UOM_NAME);
            }
            /** 设置-单位 */
            set uom(value: string) {
                this.setProperty(PickListsLine.PROPERTY_UOM_NAME, value);
            }

            /** 映射的属性名称-库存单位 */
            static PROPERTY_INVENTORYUOM_NAME: string = "InventoryUOM";
            /** 获取-库存单位 */
            get inventoryUOM(): string {
                return this.getProperty<string>(PickListsLine.PROPERTY_INVENTORYUOM_NAME);
            }
            /** 设置-库存单位 */
            set inventoryUOM(value: string) {
                this.setProperty(PickListsLine.PROPERTY_INVENTORYUOM_NAME, value);
            }

            /** 映射的属性名称-单位换算率 */
            static PROPERTY_UOMRATE_NAME: string = "UOMRate";
            /** 获取-单位换算率 */
            get uomRate(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_UOMRATE_NAME);
            }
            /** 设置-单位换算率 */
            set uomRate(value: number) {
                this.setProperty(PickListsLine.PROPERTY_UOMRATE_NAME, value);
            }

            /** 映射的属性名称-库存数量 */
            static PROPERTY_INVENTORYQUANTITY_NAME: string = "InventoryQuantity";
            /** 获取-库存数量 */
            get inventoryQuantity(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_INVENTORYQUANTITY_NAME);
            }
            /** 设置-库存数量 */
            set inventoryQuantity(value: number) {
                this.setProperty(PickListsLine.PROPERTY_INVENTORYQUANTITY_NAME, value);
            }

            /** 映射的属性名称-拣配状态 */
            static PROPERTY_PICKSTATUS_NAME: string = "PickStatus";
            /** 获取-拣配状态 */
            get pickStatus(): emPickStatus {
                return this.getProperty<emPickStatus>(PickListsLine.PROPERTY_PICKSTATUS_NAME);
            }
            /** 设置-拣配状态 */
            set pickStatus(value: emPickStatus) {
                this.setProperty(PickListsLine.PROPERTY_PICKSTATUS_NAME, value);
            }

            /** 映射的属性名称-拣配数量 */
            static PROPERTY_PICKQUANTITY_NAME: string = "PickQuantity";
            /** 获取-拣配数量 */
            get pickQuantity(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_PICKQUANTITY_NAME);
            }
            /** 设置-拣配数量 */
            set pickQuantity(value: number) {
                this.setProperty(PickListsLine.PROPERTY_PICKQUANTITY_NAME, value);
            }

            /** 映射的属性名称-已清数量 */
            static PROPERTY_CLOSEDQUANTITY_NAME: string = "ClosedQuantity";
            /** 获取-已清数量 */
            get closedQuantity(): number {
                return this.getProperty<number>(PickListsLine.PROPERTY_CLOSEDQUANTITY_NAME);
            }
            /** 设置-已清数量 */
            set closedQuantity(value: number) {
                this.setProperty(PickListsLine.PROPERTY_CLOSEDQUANTITY_NAME, value);
            }

            /** 映射的属性名称-仓库 */
            static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
            /** 获取-仓库 */
            get warehouse(): string {
                return this.getProperty<string>(PickListsLine.PROPERTY_WAREHOUSE_NAME);
            }
            /** 设置-仓库 */
            set warehouse(value: string) {
                this.setProperty(PickListsLine.PROPERTY_WAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-拣配清单-序号集合 */
            static PROPERTY_PICKLISTSNUMBERS_NAME: string = "PickListsNumbers";
            /** 获取-拣配清单-序号集合 */
            get pickListsNumbers(): PickListsNumbers {
                return this.getProperty<PickListsNumbers>(PickListsLine.PROPERTY_PICKLISTSNUMBERS_NAME);
            }
            /** 设置-拣配清单-序号集合 */
            set pickListsNumbers(value: PickListsNumbers) {
                this.setProperty(PickListsLine.PROPERTY_PICKLISTSNUMBERS_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(PickLists.BUSINESS_OBJECT_CODE);
                this.pickListsNumbers = new PickListsNumbers(this);
                this.pickStatus = bo.emPickStatus.RELEASED;
                this.uomRate = 1;
            }
            protected registerRules(): ibas.IBusinessRule[] {
                return [
                    // 计算库存数量 = 数量 * 换算率
                    new materials.bo.BusinessRuleCalculateInventoryQuantity(
                        PickListsLine.PROPERTY_INVENTORYQUANTITY_NAME, PickListsLine.PROPERTY_QUANTITY_NAME, PickListsLine.PROPERTY_UOMRATE_NAME)
                ];
            }
            protected onPropertyChanged(name: string): void {
                super.onPropertyChanged(name);
                if (ibas.strings.equalsIgnoreCase(PickListsLine.PROPERTY_PICKQUANTITY_NAME, name)
                    || ibas.strings.equalsIgnoreCase(PickListsLine.PROPERTY_CLOSEDQUANTITY_NAME, name)
                    || ibas.strings.equalsIgnoreCase(PickListsLine.PROPERTY_INVENTORYQUANTITY_NAME, name)) {
                    let pickQuantity: number = ibas.numbers.valueOf(this.pickQuantity);
                    let closedQuantity: number = ibas.numbers.valueOf(this.closedQuantity);
                    let inventoryQuantity: number = ibas.numbers.valueOf(this.inventoryQuantity);
                    if (closedQuantity > 0) {
                        this.pickStatus = bo.emPickStatus.PARTIALLYDELIVERED;
                        if (inventoryQuantity > 0 && closedQuantity >= inventoryQuantity) {
                            this.pickStatus = bo.emPickStatus.CLOSED;
                        }
                    } else if (pickQuantity > 0) {
                        this.pickStatus = bo.emPickStatus.PARTIALLYPICKED;
                        if (inventoryQuantity > 0 && pickQuantity >= inventoryQuantity) {
                            this.pickStatus = bo.emPickStatus.PICKED;
                        }
                    } else {
                        this.pickStatus = bo.emPickStatus.RELEASED;
                    }
                }
            }
            baseBusinessObject(data: app.IPickListsTarget | Material): void {
                if (data instanceof Material) {
                    /** 物料/服务描述 */
                    this.itemDescription = data.name;
                    /** 物料标识 */
                    this.itemSign = data.sign;
                    /** 序号管理 */
                    this.serialManagement = data.serialManagement;
                    /** 批号管理 */
                    this.batchManagement = data.batchManagement;
                    /** 库存单位 */
                    this.inventoryUOM = data.inventoryUOM;
                } else {
                    /** 基于类型 */
                    this.baseDocumentType = data.baseDocumentType;
                    /** 基于标识 */
                    this.baseDocumentEntry = data.baseDocumentEntry;
                    /** 基于行号 */
                    this.baseDocumentLineId = data.baseDocumentLineId;
                    /** 交货/到期日期 */
                    this.deliveryDate = data.deliveryDate;
                    /** 物料编码 */
                    this.itemCode = data.itemCode;
                    /** 数量 */
                    this.quantity = data.unclosedQuantity;
                    /** 单位 */
                    this.uom = data.uom;
                    /** 仓库 */
                    this.warehouse = data.warehouse;
                    // /** 业务伙伴编码 */
                    // this.cardCode = data.cardCode;
                    // /** 业务伙伴名称 */
                    // this.cardName = data.cardName;
                    /** 物料/服务描述 */
                    this.itemDescription = data.itemDescription;
                    /** 物料标识 */
                    this.itemSign = data.itemSign;
                    /** 序号管理 */
                    this.serialManagement = data.serialManagement;
                    /** 批号管理 */
                    this.batchManagement = data.batchManagement;
                    /** 库存单位 */
                    this.inventoryUOM = data.inventoryUOM;
                    /** 单位换算率 */
                    this.uomRate = data.uomRate;
                    /** 库存数量 */
                    this.inventoryQuantity = data.inventoryQuantity;
                    /** 备注 */
                    this.remarks = data.remarks;
                }
            }
        }

        /** 拣配清单-序号 集合 */
        export class PickListsNumbers extends ibas.BusinessObjects<PickListsNumber, PickListsLine>
            implements IPickListsNumbers, IMaterialBatchItems, IMaterialSerialItems {
            /** 创建并添加子项 */
            create(): PickListsNumber {
                let item: PickListsNumber = new PickListsNumber();
                this.add(item);
                return item;
            }
            protected afterAdd(item: PickListsNumber): void {
                super.afterAdd(item);
                if (!(item.lineId >= 0) && item.isNew) {
                    item.itemId = this.parent.lineId;
                }
            }
            total(): number {
                let total: number = 0;
                for (let item of this) {
                    total += item.pickQuantity;
                }
                return total;
            }
        }
        /** 拣配清单-序号 */
        export class PickListsNumber extends ibas.BOSimpleLine<PickListsNumber>
            implements IPickListsNumber, IMaterialBatchItem, IMaterialSerialItem {
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(PickListsNumber.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(PickListsNumber.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-对象行号 */
            get lineId(): number {
                return this.getProperty<number>(PickListsNumber.PROPERTY_LINEID_NAME);
            }
            /** 设置-对象行号 */
            set lineId(value: number) {
                this.setProperty(PickListsNumber.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(PickListsNumber.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(PickListsNumber.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(PickListsNumber.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(PickListsNumber.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(PickListsNumber.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(PickListsNumber.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(PickListsNumber.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(PickListsNumber.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(PickListsNumber.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(PickListsNumber.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(PickListsNumber.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(PickListsNumber.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(PickListsNumber.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(PickListsNumber.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(PickListsNumber.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(PickListsNumber.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(PickListsNumber.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(PickListsNumber.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(PickListsNumber.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(PickListsNumber.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(PickListsNumber.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(PickListsNumber.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(PickListsNumber.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(PickListsNumber.PROPERTY_REMARKS_NAME, value);
            }

            /** 映射的属性名称-行项目号 */
            static PROPERTY_ITEMID_NAME: string = "ItemId";
            /** 获取-行项目号 */
            get itemId(): number {
                return this.getProperty<number>(PickListsNumber.PROPERTY_ITEMID_NAME);
            }
            /** 设置-行项目号 */
            set itemId(value: number) {
                this.setProperty(PickListsNumber.PROPERTY_ITEMID_NAME, value);
            }

            /** 映射的属性名称-仓库编码 */
            static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
            /** 获取-仓库编码 */
            get warehouse(): string {
                return this.getProperty<string>(PickListsNumber.PROPERTY_WAREHOUSE_NAME);
            }
            /** 设置-仓库编码 */
            set warehouse(value: string) {
                this.setProperty(PickListsNumber.PROPERTY_WAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-批次编码 */
            static PROPERTY_BATCHCODE_NAME: string = "BatchCode";
            /** 获取-批次编码 */
            get batchCode(): string {
                return this.getProperty<string>(PickListsNumber.PROPERTY_BATCHCODE_NAME);
            }
            /** 设置-批次编码 */
            set batchCode(value: string) {
                this.setProperty(PickListsNumber.PROPERTY_BATCHCODE_NAME, value);
            }

            /** 映射的属性名称-序列编码 */
            static PROPERTY_SERIALCODE_NAME: string = "SerialCode";
            /** 获取-序列编码 */
            get serialCode(): string {
                return this.getProperty<string>(PickListsNumber.PROPERTY_SERIALCODE_NAME);
            }
            /** 设置-序列编码 */
            set serialCode(value: string) {
                this.setProperty(PickListsNumber.PROPERTY_SERIALCODE_NAME, value);
            }

            /** 映射的属性名称-拣配数量 */
            static PROPERTY_PICKQUANTITY_NAME: string = "PickQuantity";
            /** 获取-拣配数量 */
            get pickQuantity(): number {
                return this.getProperty<number>(PickListsNumber.PROPERTY_PICKQUANTITY_NAME);
            }
            /** 设置-拣配数量 */
            set pickQuantity(value: number) {
                this.setProperty(PickListsNumber.PROPERTY_PICKQUANTITY_NAME, value);
            }

            get documentType(): string {
                return this[PROPERTY_DOCUMENT_TYPE];
            }
            set documentType(value: string) {
                this[PROPERTY_DOCUMENT_TYPE] = value;
            }
            get documentEntry(): number {
                return this[PROPERTY_DOCUMENT_ENTRY];
            }
            set documentEntry(value: number) {
                this[PROPERTY_DOCUMENT_ENTRY] = value;
            }
            get documentLineId(): number {
                return this[PROPERTY_DOCUMENT_LINEID];
            }
            set documentLineId(value: number) {
                this[PROPERTY_DOCUMENT_LINEID] = value;
            }
            get quantity(): number {
                return this.pickQuantity;
            }
            set quantity(value: number) {
                this.pickQuantity = value;
            }

            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(PickLists.BUSINESS_OBJECT_CODE);
            }
        }
        const PROPERTY_DOCUMENT_TYPE: symbol = Symbol("documentType");
        const PROPERTY_DOCUMENT_ENTRY: symbol = Symbol("documentEntry");
        const PROPERTY_DOCUMENT_LINEID: symbol = Symbol("documentLineId");

    }
}
