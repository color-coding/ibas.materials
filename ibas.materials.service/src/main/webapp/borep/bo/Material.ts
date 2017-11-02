/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    emYesNo,
    emDocumentStatus,
    emBOStatus,
    emApprovalStatus,
    BusinessObject,
    BusinessObjects,
    BOMasterData,
    BOMasterDataLine,
    BODocument,
    BODocumentLine,
    BOSimple,
    BOSimpleLine,
    config,
} from "ibas/index";
import {
    IMaterial,
    BO_CODE_MATERIAL,
    emItemType,
} from "../../api/index";
import { MaterialBase } from "./MaterialBase";
/** 物料 */
export class Material extends MaterialBase<Material> implements IMaterial {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_MATERIAL;
    /** 构造函数 */
    constructor() {
        super();
    }

    /** 映射的属性名称-价格 */
    static PROPERTY_AVGPRICE_NAME: string = "AvgPrice";
    /** 获取-价格 */
    get avgPrice(): number {
        return this.getProperty<number>(Material.PROPERTY_AVGPRICE_NAME);
    }
    /** 设置-价格 */
    set avgPrice(value: number) {
        this.setProperty(Material.PROPERTY_AVGPRICE_NAME, value);
    }

    /** 映射的属性名称-库存 */
    static PROPERTY_ONHAND_NAME: string = "OnHand";
    /** 获取-库存 */
    get onHand(): number {
        return this.getProperty<number>(Material.PROPERTY_ONHAND_NAME);
    }
    /** 设置-库存 */
    set onHand(value: number) {
        this.setProperty(Material.PROPERTY_ONHAND_NAME, value);
    }

    /** 映射的属性名称-已承诺 */
    static PROPERTY_ONCOMMITED_NAME: string = "OnCommited";
    /** 获取-已承诺 */
    get onCommited(): number {
        return this.getProperty<number>(Material.PROPERTY_ONCOMMITED_NAME);
    }
    /** 设置-已承诺 */
    set onCommited(value: number) {
        this.setProperty(Material.PROPERTY_ONCOMMITED_NAME, value);
    }

    /** 映射的属性名称-已订购 */
    static PROPERTY_ONORDERED_NAME: string = "OnOrdered";
    /** 获取-已订购 */
    get onOrdered(): number {
        return this.getProperty<number>(Material.PROPERTY_ONORDERED_NAME);
    }
    /** 设置-已订购 */
    set onOrdered(value: number) {
        this.setProperty(Material.PROPERTY_ONORDERED_NAME, value);
    }

    /** 映射的属性名称-最低库存量 */
    static PROPERTY_MINIMUMINVENTORY_NAME: string = "MinimumInventory";
    /** 获取-最低库存量 */
    get minimumInventory(): number {
        return this.getProperty<number>(Material.PROPERTY_MINIMUMINVENTORY_NAME);
    }
    /** 设置-最低库存量 */
    set minimumInventory(value: number) {
        this.setProperty(Material.PROPERTY_MINIMUMINVENTORY_NAME, value);
    }


    /** 映射的属性名称-生效日期 */
    static PROPERTY_VALIDDATE_NAME: string = "ValidDate";
    /** 获取-生效日期 */
    get validDate(): Date {
        return this.getProperty<Date>(Material.PROPERTY_VALIDDATE_NAME);
    }
    /** 设置-生效日期 */
    set validDate(value: Date) {
        this.setProperty(Material.PROPERTY_VALIDDATE_NAME, value);
    }

    /** 映射的属性名称-失效日期 */
    static PROPERTY_INVALIDDATE_NAME: string = "InvalidDate";
    /** 获取-失效日期 */
    get invalidDate(): Date {
        return this.getProperty<Date>(Material.PROPERTY_INVALIDDATE_NAME);
    }
    /** 设置-失效日期 */
    set invalidDate(value: Date) {
        this.setProperty(Material.PROPERTY_INVALIDDATE_NAME, value);
    }

    /** 映射的属性名称-图片 */
    static PROPERTY_PICTURE_NAME: string = "Picture";
    /** 获取-图片 */
    get picture(): string {
        return this.getProperty<string>(Material.PROPERTY_PICTURE_NAME);
    }
    /** 设置-图片 */
    set picture(value: string) {
        this.setProperty(Material.PROPERTY_PICTURE_NAME, value);
    }

    /** 映射的属性名称-备注 */
    static PROPERTY_REMARKS_NAME: string = "Remarks";
    /** 获取-备注 */
    get remarks(): string {
        return this.getProperty<string>(Material.PROPERTY_REMARKS_NAME);
    }
    /** 设置-备注 */
    set remarks(value: string) {
        this.setProperty(Material.PROPERTY_REMARKS_NAME, value);
    }

    /** 映射的属性名称-已引用 */
    static PROPERTY_REFERENCED_NAME: string = "Referenced";
    /** 获取-已引用 */
    get referenced(): emYesNo {
        return this.getProperty<emYesNo>(Material.PROPERTY_REFERENCED_NAME);
    }
    /** 设置-已引用 */
    set referenced(value: emYesNo) {
        this.setProperty(Material.PROPERTY_REFERENCED_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(Material.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(Material.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(Material.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(Material.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(Material.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(Material.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(Material.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(Material.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(Material.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(Material.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-版本 */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-版本 */
    get logInst(): number {
        return this.getProperty<number>(Material.PROPERTY_LOGINST_NAME);
    }
    /** 设置-版本 */
    set logInst(value: number) {
        this.setProperty(Material.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-服务系列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(Material.PROPERTY_SERIES_NAME);
    }
    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(Material.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(Material.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(Material.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(Material.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(Material.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(Material.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(Material.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(Material.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(Material.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(Material.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(Material.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-审批状态 */
    static PROPERTY_APPROVALSTATUS_NAME: string = "ApprovalStatus";
    /** 获取-审批状态 */
    get approvalStatus(): emApprovalStatus {
        return this.getProperty<emApprovalStatus>(Material.PROPERTY_APPROVALSTATUS_NAME);
    }
    /** 设置-审批状态 */
    set approvalStatus(value: emApprovalStatus) {
        this.setProperty(Material.PROPERTY_APPROVALSTATUS_NAME, value);
    }

    /** 映射的属性名称-数据所有者 */
    static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
    /** 获取-数据所有者 */
    get dataOwner(): number {
        return this.getProperty<number>(Material.PROPERTY_DATAOWNER_NAME);
    }
    /** 设置-数据所有者 */
    set dataOwner(value: number) {
        this.setProperty(Material.PROPERTY_DATAOWNER_NAME, value);
    }

    /** 映射的属性名称-数据所属组织 */
    static PROPERTY_ORGANIZATION_NAME: string = "Organization";
    /** 获取-数据所属组织 */
    get organization(): string {
        return this.getProperty<string>(Material.PROPERTY_ORGANIZATION_NAME);
    }
    /** 设置-数据所属组织 */
    set organization(value: string) {
        this.setProperty(Material.PROPERTY_ORGANIZATION_NAME, value);
    }



    /** 初始化数据 */
    protected init(): void {
        this.objectCode = config.applyVariables(Material.BUSINESS_OBJECT_CODE);
    }
}


