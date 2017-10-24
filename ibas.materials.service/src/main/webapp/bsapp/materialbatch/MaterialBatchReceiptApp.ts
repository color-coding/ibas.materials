/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryMaterials } from "../../borep/BORepositories";

export class MaterialBatchReceiptApp extends ibas.BOChooseService<IMaterialBatchReceiptView, bo.MaterialBatchJournal> {
    /** 应用标识 */
    static APPLICATION_ID: string = "f4448871-b03a-48f5-bf6d-9418259fab9d";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialbatchreceipt";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.MaterialBatchJournal.BUSINESS_OBJECT_RECEIEPT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialBatchReceiptApp.APPLICATION_ID;
        this.name = MaterialBatchReceiptApp.BUSINESS_OBJECT_CODE;
        this.boCode = MaterialBatchReceiptApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 待编辑的数据 */
    protected editData: bo.MaterialBatchJournal[];
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.addBatchEvent = this.addBatch;
        this.view.removeBatchEvent = this.removeBatch;
    }
    protected  addBatch(): void {
        // this.editData..create();
        if(this.editData == null || this.editData === undefined) {
            this.editData = [];
        }
        let materialBatch: bo.MaterialBatchJournal = new bo.MaterialBatchJournal();
        this.editData.push(materialBatch);
        // 仅显示没有标记删除的
        this.view.showData(this.editData);
    }
    protected  removeBatch(items: bo.MaterialBatchJournal[]): void {
        // 非数组，转为数组
        if (!(items instanceof Array)) {
            items = [items];
        }
        if (items.length === 0) {
            return;
        }
        // 移除项目
        for (let item of items) {
            if (this.editData.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    // this.editData.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showData(this.editData);
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    protected newData(): void {
        throw new Error("Method not implemented.");
    }
    protected fetchData(criteria: ibas.ICriteria): void {
        throw new Error("Method not implemented.");
    }
}


/** 视图-新建批次 */
export interface IMaterialBatchReceiptView extends ibas.IBOChooseView {
    /** 显示数据 */
    showData(datas: bo.MaterialBatchJournal[]): void;
    /** 添加批次事件 */
    addBatchEvent: Function;
    /** 移除批次事件 */
    removeBatchEvent: Function;
}

/** 新建批次服务映射 */
export class MaterialBatchReceipServiceMapping extends ibas.BOChooseServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialBatchReceiptApp.APPLICATION_ID;
        this.name = MaterialBatchReceiptApp.APPLICATION_NAME;
        this.boCode = MaterialBatchReceiptApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new MaterialBatchReceiptApp();
    }
}