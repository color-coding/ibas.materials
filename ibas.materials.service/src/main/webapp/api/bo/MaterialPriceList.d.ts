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
    IBusinessObject,
    IBusinessObjects,
    IBOMasterData,
    IBOMasterDataLine,
    IBODocument,
    IBODocumentLine,
    IBOSimple,
    IBOSimpleLine
} from "ibas/index";
import {

} from "../Datas";
export interface IMaterialPriceList extends IBOSimple {
    /** 价格清单名称 */
    name: string;

    /** 分组 */
    group: string;

    /** 币种 */
    currency: string;

    /** 基于的清单 */
    baseOnList: number;

    /** 系数 */
    factor: number;

    /** 生效日期 */
    validDate: Date;

    /** 失效日期 */
    inValidDate: Date;

    /**对象编号 */
    objectKey: number;

    /**对象类型 */
    objectCode: string;

    /** 创建日期 */
    createDate: Date;

    /** 创建时间 */
    createTime: number;

    /** 修改日期 */
    updateDate: Date;

    /** 修改时间 */
    updateTime: number;

    /** 实例号 */
    logInst: number;

    /** 服务系列 */
    series: number;

    /** 数据源 */
    dataSource: string;

    /**创建用户 */
    createUserSign: number

    /**更新用户 */
    updateUserSign: number

    /**创建动作标识 */
    createActionId: string;

    /**更新动作标识 */
    updateActionId: string

    /** 价格清单-行集合 */
    materialPriceItems: IMaterialPriceItems;
}
export interface IMaterialPriceItems extends IBusinessObjects<IMaterialPriceItem, IMaterialPriceList> {
    /** 创建并添加子项 */
    create(): IMaterialPriceItem;
}

export interface IMaterialPriceItem extends IBOSimpleLine {

    /** 物料编码 */
    itemCode: string;

    /** 价格 */
    price: number;

    /** 对象编号 */
    objectKey: number;

    /** 行号 */
    lineId: number;

    /** 对象类型 */
    objectCode: string;

    /** 实例号 */
    logInst: number;

    /** 服务系列 */
    series: number;

    /** 数据源 */
    dataSource: string;

    /**创建用户 */
    createUserSign: number

    /**更新用户 */
    updateUserSign: number

    /**创建动作标识 */
    createActionId: string;

    /**更新动作标识 */
    updateActionId: string
}
