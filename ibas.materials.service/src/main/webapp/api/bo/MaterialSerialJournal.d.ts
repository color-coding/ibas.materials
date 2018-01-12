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
    emDirection,
    emApprovalStatus,
    IBusinessObject,
    IBusinessObjects,
    IBOMasterData,
    IBOMasterDataLine,
    IBODocument,
    IBODocumentLine,
    IBOSimple,
    ArrayList,
    IBOSimpleLine
} from "ibas/index";

/** 物料序列记录 */
export interface IMaterialSerialJournal extends IBOSimple {
    /**物料编号 */
    itemCode: string;

    /**序列编号 */
    serialCode: string;

    /**仓库编码 */
    warehouse: string;

    /**方向 */
    direction: emDirection;

    /**在仓库 */
    inStock: emYesNo;

    /**锁定 */
    locked: emYesNo;

    /**供应商序号 */
    supplierSerial: string;

    /**批次序号 */
    batchSerial: string;

    /**过期日期 */
    expirationDate: Date;

    /**生产日期 */
    manufacturingDate: Date;

    /**准入日期 */
    admissionDate: Date;

    /**保修开始日期 */
    warrantyStartDate: Date;

    /**保修结束日期 */
    warrantyEndDate: Date;

    /**备注 */
    notes: string;

    /** 单据状态 */
    lineStatus: emDocumentStatus;

    /**基于类型 */
    baseDocumentType: string;

    /**基于标识 */
    baseDocumentEntry: number

    /**基于行号 */
    baseDocumentLineId: number;

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
}
/** 物料序列记录集合 */
export interface IMaterialSerialJournals extends IBusinessObjects<IMaterialSerialJournal, IMaterialSerialJournalsParent> {
    /** 创建实例 */
    create(): IMaterialSerialJournal;
    /** 总计 */
    total(): number;
}
/** 序列管理单据行 */
export interface IMaterialSerialJournalsParent extends IBusinessObject {

    /** 序号管理 */
    serialManagement: emYesNo;

    /**类型 */
    objectCode: string;

    /**标识 */
    docEntry: number

    /**行号 */
    lineId: number;

    /** 物料 */
    itemCode: string;

    /** 仓库 */
    warehouse: string;

    /** 数量 */
    quantity: number;

    /** 行状态 */
    lineStatus: emDocumentStatus;

    /** 物料序列集合 */
    materialSerials: IMaterialSerialJournals;
}