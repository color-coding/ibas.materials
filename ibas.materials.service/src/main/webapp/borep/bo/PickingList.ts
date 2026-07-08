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
        export class PickingList extends ibas.BOSimple<PickingList> implements IPickingList {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_PICKINGLIST;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(PickingList.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(PickingList.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(PickingList.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(PickingList.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(PickingList.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(PickingList.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(PickingList.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(PickingList.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(PickingList.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(PickingList.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(PickingList.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(PickingList.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(PickingList.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(PickingList.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(PickingList.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(PickingList.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(PickingList.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(PickingList.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(PickingList.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(PickingList.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(PickingList.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(PickingList.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(PickingList.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(PickingList.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(PickingList.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(PickingList.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(PickingList.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(PickingList.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(PickingList.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(PickingList.PROPERTY_ORGANIZATION_NAME, value);
            }

            /** 映射的属性名称-参考1 */
            static PROPERTY_REFERENCE1_NAME: string = "Reference1";
            /** 获取-参考1 */
            get reference1(): string {
                return this.getProperty<string>(PickingList.PROPERTY_REFERENCE1_NAME);
            }
            /** 设置-参考1 */
            set reference1(value: string) {
                this.setProperty(PickingList.PROPERTY_REFERENCE1_NAME, value);
            }

            /** 映射的属性名称-参考2 */
            static PROPERTY_REFERENCE2_NAME: string = "Reference2";
            /** 获取-参考2 */
            get reference2(): string {
                return this.getProperty<string>(PickingList.PROPERTY_REFERENCE2_NAME);
            }
            /** 设置-参考2 */
            set reference2(value: string) {
                this.setProperty(PickingList.PROPERTY_REFERENCE2_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(PickingList.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(PickingList.PROPERTY_REMARKS_NAME, value);
            }

            /** 映射的属性名称-拣配员 */
            static PROPERTY_PICKER_NAME: string = "Picker";
            /** 获取-拣配员 */
            get picker(): string {
                return this.getProperty<string>(PickingList.PROPERTY_PICKER_NAME);
            }
            /** 设置-拣配员 */
            set picker(value: string) {
                this.setProperty(PickingList.PROPERTY_PICKER_NAME, value);
            }

            /** 映射的属性名称-拣配日期 */
            static PROPERTY_PICKINGDATE_NAME: string = "PickingDate";
            /** 获取-拣配日期 */
            get pickingDate(): Date {
                return this.getProperty<Date>(PickingList.PROPERTY_PICKINGDATE_NAME);
            }
            /** 设置-拣配日期 */
            set pickingDate(value: Date) {
                this.setProperty(PickingList.PROPERTY_PICKINGDATE_NAME, value);
            }

            /** 映射的属性名称-拣配状态 */
            static PROPERTY_PICKINGSTATUS_NAME: string = "PickingStatus";
            /** 获取-拣配状态 */
            get pickingStatus(): emPickingStatus {
                return this.getProperty<emPickingStatus>(PickingList.PROPERTY_PICKINGSTATUS_NAME);
            }
            /** 设置-拣配状态 */
            set pickingStatus(value: emPickingStatus) {
                this.setProperty(PickingList.PROPERTY_PICKINGSTATUS_NAME, value);
            }


            /** 映射的属性名称-拣配清单-行集合 */
            static PROPERTY_PICKINGLISTLINES_NAME: string = "PickingListLines";
            /** 获取-拣配清单-行集合 */
            get pickingListLines(): PickingListLines {
                return this.getProperty<PickingListLines>(PickingList.PROPERTY_PICKINGLISTLINES_NAME);
            }
            /** 设置-拣配清单-行集合 */
            set pickingListLines(value: PickingListLines) {
                this.setProperty(PickingList.PROPERTY_PICKINGLISTLINES_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.pickingListLines = new PickingListLines(this);
                this.objectCode = ibas.config.applyVariables(PickingList.BUSINESS_OBJECT_CODE);
                this.pickingStatus = bo.emPickingStatus.RELEASED;
                this.dataOwner = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_ID);
                this.organization = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_BELONG);
                this.picker = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_NAME);
                this.pickingDate = ibas.dates.today();
            }
        }

        /** 拣配清单-行 集合 */
        export class PickingListLines extends ibas.BusinessObjects<PickingListLine, PickingList> implements IPickingListLines {
            /** 创建并添加子项 */
            create(): PickingListLine {
                let item: PickingListLine = new PickingListLine();
                this.add(item);
                return item;
            }
            public afterAdd(item: PickingListLine): void {
                super.afterAdd(item);
                this.updatePickStatus();
            }
            public afterRemove(item: PickingListLine): void {
                super.afterRemove(item);
                this.updatePickStatus();
            }
            protected onItemPropertyChanged(item: PickingListLine, name: string): void {
                super.onItemPropertyChanged(item, name);
                if (ibas.strings.equalsIgnoreCase(PickingListLine.PROPERTY_PICKINGSTATUS_NAME, name)) {
                    this.updatePickStatus();
                }
            }
            protected updatePickStatus(): void {
                let filterDeleted: PickingListLine[] = this.filterDeleted();
                let line: PickingListLine = filterDeleted.find(c => c.pickingStatus !== emPickingStatus.RELEASED);
                if (ibas.objects.isNull(line)) {
                    this.parent.pickingStatus = emPickingStatus.RELEASED;
                    return;
                }
                line = filterDeleted.find(c => c.pickingStatus !== emPickingStatus.PICKED);
                if (ibas.objects.isNull(line)) {
                    this.parent.pickingStatus = emPickingStatus.PICKED;
                    return;
                }
                line = filterDeleted.find(c => c.pickingStatus !== emPickingStatus.CLOSED && c.pickingStatus !== emPickingStatus.PARTIALLY_DELIVERED);
                if (ibas.objects.isNull(line)) {
                    this.parent.pickingStatus = emPickingStatus.CLOSED;
                    return;
                }
                line = filterDeleted.find(c => c.pickingStatus === emPickingStatus.PARTIALLY_DELIVERED || c.pickingStatus === emPickingStatus.CLOSED);
                if (!ibas.objects.isNull(line)) {
                    this.parent.pickingStatus = emPickingStatus.PARTIALLY_DELIVERED;
                    return;
                }
                line = filterDeleted.find(c => c.pickingStatus === emPickingStatus.PARTIALLY_PICKED || c.pickingStatus === emPickingStatus.PICKED);
                if (!ibas.objects.isNull(line)) {
                    this.parent.pickingStatus = emPickingStatus.PARTIALLY_PICKED;
                    return;
                }
            }
            async useInventoryReservationToPick(): Promise<void> {
                try {
                    this.resetAll();
                    let items: Array<materials.bo.IPickingListLine> = this.filterDeleted().filter(c => {
                        // 已交货或部分交货的行不重置
                        return c.pickingStatus !== bo.emPickingStatus.PARTIALLY_DELIVERED && c.pickingStatus !== bo.emPickingStatus.CLOSED;
                    });
                    for (let item of items) {
                        let inventoryReservations: ibas.IList<materials.bo.MaterialInventoryReservation> = await this.fetchMaterialInventoryReservationAsync(item);
                        if (inventoryReservations.length === 0) {
                            continue;
                        }
                        let pickingQuantity: number = 0;
                        for (let inventoryReservation of inventoryReservations) {
                            let reservationQunatity: number = ibas.numbers.round(inventoryReservation.quantity - inventoryReservation.closedQuantity);
                            pickingQuantity = ibas.numbers.round(pickingQuantity + reservationQunatity);
                            if (!ibas.strings.isEmpty(inventoryReservation.serialCode)) {
                                let serialItem: bo.IPickingListNumber = item.pickingListNumbers.create();
                                serialItem.serialCode = inventoryReservation.serialCode;
                                serialItem.warehouse = inventoryReservation.warehouse;
                                serialItem.pickingQuantity = 1;
                            } else if (!ibas.strings.isEmpty(inventoryReservation.batchCode)) {
                                let batchItem: bo.IPickingListNumber = item.pickingListNumbers.find(c => {
                                    return ibas.strings.equals(c.batchCode, inventoryReservation.batchCode)
                                        && ibas.strings.equals(c.warehouse, inventoryReservation.warehouse);
                                });
                                if (ibas.objects.isNull(batchItem)) {
                                    batchItem = item.pickingListNumbers.create();
                                    batchItem.batchCode = inventoryReservation.batchCode;
                                    batchItem.warehouse = inventoryReservation.warehouse;
                                    batchItem.pickingQuantity = 0;
                                }
                                batchItem.pickingQuantity = ibas.numbers.round(batchItem.pickingQuantity + reservationQunatity);
                            }
                        }
                        item.pickingQuantity = pickingQuantity;
                    }
                } catch (error) {
                    throw error;
                }
            }
            protected resetAll(): void {
                let items: Array<materials.bo.IPickingListLine> = this.filterDeleted().filter(c => {
                    // 已交货或部分交货的行不重置
                    return c.pickingStatus !== bo.emPickingStatus.PARTIALLY_DELIVERED && c.pickingStatus !== bo.emPickingStatus.CLOSED;
                });
                for (let item of items) {
                    item.pickingQuantity = 0;
                    // 移除序号
                    let batchItems: bo.IPickingListNumber[] = item.pickingListNumbers.filterDeleted();
                    for (let batchItem of batchItems) {
                        if (item.pickingListNumbers.indexOf(batchItem) >= 0) {
                            if (item.isNew) {
                                // 新建的移除集合
                                item.pickingListNumbers.remove(batchItem);
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
            private async fetchMaterialInventoryReservationAsync(item: bo.IPickingListLine): Promise<ibas.IList<materials.bo.MaterialInventoryReservation>> {
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
                condition.operation = ibas.emConditionOperation.GREATER_THAN;
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
        export class PickingListLine extends ibas.BOSimpleLine<PickingListLine> implements IPickingListLine {
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(PickingListLine.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-对象行号 */
            get lineId(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_LINEID_NAME);
            }
            /** 设置-对象行号 */
            set lineId(value: number) {
                this.setProperty(PickingListLine.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(PickingListLine.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(PickingListLine.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(PickingListLine.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(PickingListLine.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(PickingListLine.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(PickingListLine.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(PickingListLine.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(PickingListLine.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(PickingListLine.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(PickingListLine.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(PickingListLine.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(PickingListLine.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(PickingListLine.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(PickingListLine.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(PickingListLine.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(PickingListLine.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(PickingListLine.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(PickingListLine.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(PickingListLine.PROPERTY_REMARKS_NAME, value);
            }

            /** 映射的属性名称-基于类型 */
            static PROPERTY_BASEDOCUMENTTYPE_NAME: string = "BaseDocumentType";
            /** 获取-基于类型 */
            get baseDocumentType(): string {
                return this.getProperty<string>(PickingListLine.PROPERTY_BASEDOCUMENTTYPE_NAME);
            }
            /** 设置-基于类型 */
            set baseDocumentType(value: string) {
                this.setProperty(PickingListLine.PROPERTY_BASEDOCUMENTTYPE_NAME, value);
            }

            /** 映射的属性名称-基于标识 */
            static PROPERTY_BASEDOCUMENTENTRY_NAME: string = "BaseDocumentEntry";
            /** 获取-基于标识 */
            get baseDocumentEntry(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_BASEDOCUMENTENTRY_NAME);
            }
            /** 设置-基于标识 */
            set baseDocumentEntry(value: number) {
                this.setProperty(PickingListLine.PROPERTY_BASEDOCUMENTENTRY_NAME, value);
            }

            /** 映射的属性名称-基于行号 */
            static PROPERTY_BASEDOCUMENTLINEID_NAME: string = "BaseDocumentLineId";
            /** 获取-基于行号 */
            get baseDocumentLineId(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_BASEDOCUMENTLINEID_NAME);
            }
            /** 设置-基于行号 */
            set baseDocumentLineId(value: number) {
                this.setProperty(PickingListLine.PROPERTY_BASEDOCUMENTLINEID_NAME, value);
            }

            /** 映射的属性名称-交货/到期日期 */
            static PROPERTY_DELIVERYDATE_NAME: string = "DeliveryDate";
            /** 获取-交货/到期日期 */
            get deliveryDate(): Date {
                return this.getProperty<Date>(PickingListLine.PROPERTY_DELIVERYDATE_NAME);
            }
            /** 设置-交货/到期日期 */
            set deliveryDate(value: Date) {
                this.setProperty(PickingListLine.PROPERTY_DELIVERYDATE_NAME, value);
            }

            /** 映射的属性名称-物料编码 */
            static PROPERTY_ITEMCODE_NAME: string = "ItemCode";
            /** 获取-物料编码 */
            get itemCode(): string {
                return this.getProperty<string>(PickingListLine.PROPERTY_ITEMCODE_NAME);
            }
            /** 设置-物料编码 */
            set itemCode(value: string) {
                this.setProperty(PickingListLine.PROPERTY_ITEMCODE_NAME, value);
            }

            /** 映射的属性名称-物料/服务描述 */
            static PROPERTY_ITEMDESCRIPTION_NAME: string = "ItemDescription";
            /** 获取-物料/服务描述 */
            get itemDescription(): string {
                return this.getProperty<string>(PickingListLine.PROPERTY_ITEMDESCRIPTION_NAME);
            }
            /** 设置-物料/服务描述 */
            set itemDescription(value: string) {
                this.setProperty(PickingListLine.PROPERTY_ITEMDESCRIPTION_NAME, value);
            }

            /** 映射的属性名称-物料标识 */
            static PROPERTY_ITEMSIGN_NAME: string = "ItemSign";
            /** 获取-物料标识 */
            get itemSign(): string {
                return this.getProperty<string>(PickingListLine.PROPERTY_ITEMSIGN_NAME);
            }
            /** 设置-物料标识 */
            set itemSign(value: string) {
                this.setProperty(PickingListLine.PROPERTY_ITEMSIGN_NAME, value);
            }

            /** 映射的属性名称-序号管理 */
            static PROPERTY_SERIALMANAGEMENT_NAME: string = "SerialManagement";
            /** 获取-序号管理 */
            get serialManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(PickingListLine.PROPERTY_SERIALMANAGEMENT_NAME);
            }
            /** 设置-序号管理 */
            set serialManagement(value: ibas.emYesNo) {
                this.setProperty(PickingListLine.PROPERTY_SERIALMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-批号管理 */
            static PROPERTY_BATCHMANAGEMENT_NAME: string = "BatchManagement";
            /** 获取-批号管理 */
            get batchManagement(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(PickingListLine.PROPERTY_BATCHMANAGEMENT_NAME);
            }
            /** 设置-批号管理 */
            set batchManagement(value: ibas.emYesNo) {
                this.setProperty(PickingListLine.PROPERTY_BATCHMANAGEMENT_NAME, value);
            }

            /** 映射的属性名称-数量 */
            static PROPERTY_QUANTITY_NAME: string = "Quantity";
            /** 获取-数量 */
            get quantity(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_QUANTITY_NAME);
            }
            /** 设置-数量 */
            set quantity(value: number) {
                this.setProperty(PickingListLine.PROPERTY_QUANTITY_NAME, value);
            }

            /** 映射的属性名称-单位 */
            static PROPERTY_UOM_NAME: string = "UOM";
            /** 获取-单位 */
            get uom(): string {
                return this.getProperty<string>(PickingListLine.PROPERTY_UOM_NAME);
            }
            /** 设置-单位 */
            set uom(value: string) {
                this.setProperty(PickingListLine.PROPERTY_UOM_NAME, value);
            }

            /** 映射的属性名称-库存单位 */
            static PROPERTY_INVENTORYUOM_NAME: string = "InventoryUOM";
            /** 获取-库存单位 */
            get inventoryUOM(): string {
                return this.getProperty<string>(PickingListLine.PROPERTY_INVENTORYUOM_NAME);
            }
            /** 设置-库存单位 */
            set inventoryUOM(value: string) {
                this.setProperty(PickingListLine.PROPERTY_INVENTORYUOM_NAME, value);
            }

            /** 映射的属性名称-单位换算率 */
            static PROPERTY_UOMRATE_NAME: string = "UOMRate";
            /** 获取-单位换算率 */
            get uomRate(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_UOMRATE_NAME);
            }
            /** 设置-单位换算率 */
            set uomRate(value: number) {
                this.setProperty(PickingListLine.PROPERTY_UOMRATE_NAME, value);
            }

            /** 映射的属性名称-库存数量 */
            static PROPERTY_INVENTORYQUANTITY_NAME: string = "InventoryQuantity";
            /** 获取-库存数量 */
            get inventoryQuantity(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_INVENTORYQUANTITY_NAME);
            }
            /** 设置-库存数量 */
            set inventoryQuantity(value: number) {
                this.setProperty(PickingListLine.PROPERTY_INVENTORYQUANTITY_NAME, value);
            }

            /** 映射的属性名称-拣配状态 */
            static PROPERTY_PICKINGSTATUS_NAME: string = "PickingStatus";
            /** 获取-拣配状态 */
            get pickingStatus(): emPickingStatus {
                return this.getProperty<emPickingStatus>(PickingListLine.PROPERTY_PICKINGSTATUS_NAME);
            }
            /** 设置-拣配状态 */
            set pickingStatus(value: emPickingStatus) {
                this.setProperty(PickingListLine.PROPERTY_PICKINGSTATUS_NAME, value);
            }

            /** 映射的属性名称-拣配数量 */
            static PROPERTY_PICKINGQUANTITY_NAME: string = "PickingQuantity";
            /** 获取-拣配数量 */
            get pickingQuantity(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_PICKINGQUANTITY_NAME);
            }
            /** 设置-拣配数量 */
            set pickingQuantity(value: number) {
                this.setProperty(PickingListLine.PROPERTY_PICKINGQUANTITY_NAME, value);
            }

            /** 映射的属性名称-已清数量 */
            static PROPERTY_CLOSEDQUANTITY_NAME: string = "ClosedQuantity";
            /** 获取-已清数量 */
            get closedQuantity(): number {
                return this.getProperty<number>(PickingListLine.PROPERTY_CLOSEDQUANTITY_NAME);
            }
            /** 设置-已清数量 */
            set closedQuantity(value: number) {
                this.setProperty(PickingListLine.PROPERTY_CLOSEDQUANTITY_NAME, value);
            }

            /** 映射的属性名称-仓库 */
            static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
            /** 获取-仓库 */
            get warehouse(): string {
                return this.getProperty<string>(PickingListLine.PROPERTY_WAREHOUSE_NAME);
            }
            /** 设置-仓库 */
            set warehouse(value: string) {
                this.setProperty(PickingListLine.PROPERTY_WAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-拣配清单-序号集合 */
            static PROPERTY_PICKINGLISTNUMBERS_NAME: string = "PickingListNumbers";
            /** 获取-拣配清单-序号集合 */
            get pickingListNumbers(): PickingListNumbers {
                return this.getProperty<PickingListNumbers>(PickingListLine.PROPERTY_PICKINGLISTNUMBERS_NAME);
            }
            /** 设置-拣配清单-序号集合 */
            set pickingListNumbers(value: PickingListNumbers) {
                this.setProperty(PickingListLine.PROPERTY_PICKINGLISTNUMBERS_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(PickingList.BUSINESS_OBJECT_CODE);
                this.pickingListNumbers = new PickingListNumbers(this);
                this.pickingStatus = bo.emPickingStatus.RELEASED;
                this.uomRate = 1;
            }
            protected registerRules(): ibas.IBusinessRule[] {
                return [
                    // 计算库存数量 = 换算率 * 数量
                    new ibas.BusinessRuleMultiplicativeDeductionEx(PickingListLine.PROPERTY_QUANTITY_NAME,
                        PickingListLine.PROPERTY_UOMRATE_NAME, PickingListLine.PROPERTY_INVENTORYQUANTITY_NAME)
                ];
            }
            protected onPropertyChanged(name: string): void {
                super.onPropertyChanged(name);
                if (ibas.strings.equalsIgnoreCase(PickingListLine.PROPERTY_PICKINGQUANTITY_NAME, name)
                    || ibas.strings.equalsIgnoreCase(PickingListLine.PROPERTY_CLOSEDQUANTITY_NAME, name)
                    || ibas.strings.equalsIgnoreCase(PickingListLine.PROPERTY_INVENTORYQUANTITY_NAME, name)) {
                    let pickingQuantity: number = ibas.numbers.valueOf(this.pickingQuantity);
                    let closedQuantity: number = ibas.numbers.valueOf(this.closedQuantity);
                    let inventoryQuantity: number = ibas.numbers.valueOf(this.inventoryQuantity);
                    if (closedQuantity > 0) {
                        this.pickingStatus = bo.emPickingStatus.PARTIALLY_DELIVERED;
                        if (inventoryQuantity > 0 && closedQuantity >= inventoryQuantity) {
                            this.pickingStatus = bo.emPickingStatus.CLOSED;
                        }
                    } else if (pickingQuantity > 0) {
                        this.pickingStatus = bo.emPickingStatus.PARTIALLY_PICKED;
                        if (inventoryQuantity > 0 && pickingQuantity >= inventoryQuantity) {
                            this.pickingStatus = bo.emPickingStatus.PICKED;
                        }
                    } else {
                        this.pickingStatus = bo.emPickingStatus.RELEASED;
                    }
                }
            }
            baseBusinessObject(data: app.IPickingListTarget | Material): void {
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
        export class PickingListNumbers extends ibas.BusinessObjects<PickingListNumber, PickingListLine>
            implements IPickingListNumbers, IMaterialBatchItems, IMaterialSerialItems {
            /** 创建并添加子项 */
            create(): PickingListNumber {
                let item: PickingListNumber = new PickingListNumber();
                this.add(item);
                return item;
            }
            protected afterAdd(item: PickingListNumber): void {
                super.afterAdd(item);
                if (!(item.lineId >= 0) && item.isNew) {
                    item.itemId = this.parent.lineId;
                }
            }
            total(): number {
                let total: number = 0;
                for (let item of this) {
                    total += item.pickingQuantity;
                }
                return total;
            }
        }
        /** 拣配清单-序号 */
        export class PickingListNumber extends ibas.BOSimpleLine<PickingListNumber>
            implements IPickingListNumber, IMaterialBatchItem, IMaterialSerialItem {
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(PickingListNumber.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(PickingListNumber.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-对象行号 */
            get lineId(): number {
                return this.getProperty<number>(PickingListNumber.PROPERTY_LINEID_NAME);
            }
            /** 设置-对象行号 */
            set lineId(value: number) {
                this.setProperty(PickingListNumber.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(PickingListNumber.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(PickingListNumber.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(PickingListNumber.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(PickingListNumber.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(PickingListNumber.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(PickingListNumber.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(PickingListNumber.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(PickingListNumber.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(PickingListNumber.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(PickingListNumber.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(PickingListNumber.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(PickingListNumber.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(PickingListNumber.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(PickingListNumber.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(PickingListNumber.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(PickingListNumber.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(PickingListNumber.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(PickingListNumber.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(PickingListNumber.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(PickingListNumber.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(PickingListNumber.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(PickingListNumber.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(PickingListNumber.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(PickingListNumber.PROPERTY_REMARKS_NAME, value);
            }

            /** 映射的属性名称-行项目号 */
            static PROPERTY_ITEMID_NAME: string = "ItemId";
            /** 获取-行项目号 */
            get itemId(): number {
                return this.getProperty<number>(PickingListNumber.PROPERTY_ITEMID_NAME);
            }
            /** 设置-行项目号 */
            set itemId(value: number) {
                this.setProperty(PickingListNumber.PROPERTY_ITEMID_NAME, value);
            }

            /** 映射的属性名称-仓库编码 */
            static PROPERTY_WAREHOUSE_NAME: string = "Warehouse";
            /** 获取-仓库编码 */
            get warehouse(): string {
                return this.getProperty<string>(PickingListNumber.PROPERTY_WAREHOUSE_NAME);
            }
            /** 设置-仓库编码 */
            set warehouse(value: string) {
                this.setProperty(PickingListNumber.PROPERTY_WAREHOUSE_NAME, value);
            }

            /** 映射的属性名称-批次编码 */
            static PROPERTY_BATCHCODE_NAME: string = "BatchCode";
            /** 获取-批次编码 */
            get batchCode(): string {
                return this.getProperty<string>(PickingListNumber.PROPERTY_BATCHCODE_NAME);
            }
            /** 设置-批次编码 */
            set batchCode(value: string) {
                this.setProperty(PickingListNumber.PROPERTY_BATCHCODE_NAME, value);
            }

            /** 映射的属性名称-序列编码 */
            static PROPERTY_SERIALCODE_NAME: string = "SerialCode";
            /** 获取-序列编码 */
            get serialCode(): string {
                return this.getProperty<string>(PickingListNumber.PROPERTY_SERIALCODE_NAME);
            }
            /** 设置-序列编码 */
            set serialCode(value: string) {
                this.setProperty(PickingListNumber.PROPERTY_SERIALCODE_NAME, value);
            }

            /** 映射的属性名称-拣配数量 */
            static PROPERTY_PICKINGQUANTITY_NAME: string = "PickingQuantity";
            /** 获取-拣配数量 */
            get pickingQuantity(): number {
                return this.getProperty<number>(PickingListNumber.PROPERTY_PICKINGQUANTITY_NAME);
            }
            /** 设置-拣配数量 */
            set pickingQuantity(value: number) {
                this.setProperty(PickingListNumber.PROPERTY_PICKINGQUANTITY_NAME, value);
            }

            /** 映射的属性名称-已清数量 */
            static PROPERTY_CLOSEDQUANTITY_NAME: string = "ClosedQuantity";
            /** 获取-已清数量 */
            get closedQuantity(): number {
                return this.getProperty<number>(MaterialBatchItem.PROPERTY_CLOSEDQUANTITY_NAME);
            }
            /** 设置-已清数量 */
            set closedQuantity(value: number) {
                this.setProperty(MaterialBatchItem.PROPERTY_CLOSEDQUANTITY_NAME, value);
            }
            /** 获取-已清 */
            get closed(): ibas.emYesNo {
                return this.closedQuantity > 0 ? ibas.emYesNo.YES : ibas.emYesNo.NO;
            }
            /** 设置-已清 */
            set closed(value: ibas.emYesNo) {
                this.closedQuantity = value === ibas.emYesNo.YES ? 1 : 0;
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
                return this.pickingQuantity;
            }
            set quantity(value: number) {
                this.pickingQuantity = value;
            }

            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(PickingList.BUSINESS_OBJECT_CODE);
            }
        }
        const PROPERTY_DOCUMENT_TYPE: symbol = Symbol("documentType");
        const PROPERTY_DOCUMENT_ENTRY: symbol = Symbol("documentEntry");
        const PROPERTY_DOCUMENT_LINEID: symbol = Symbol("documentLineId");

    }
}
