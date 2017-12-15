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
import { InventoryTransferEditApp } from "./InventoryTransferEditApp";

/** 查看应用-库存转储 */
export class InventoryTransferViewApp extends ibas.BOViewService<IInventoryTransferViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "13faf01a-9596-423f-9596-81843d8b81b7";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_inventorytransfer_view";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.InventoryTransfer.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = InventoryTransferViewApp.APPLICATION_ID;
        this.name = InventoryTransferViewApp.APPLICATION_NAME;
        this.boCode = InventoryTransferViewApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.editDataEvent = this.editData;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        if (ibas.objects.isNull(this.editData)) {
            // 创建编辑对象实例
            this.viewData = new bo.InventoryTransfer();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
        }
        this.view.showInventoryTransfer(this.viewData);
        this.view.showInventoryTransferLines(this.viewData.inventoryTransferLines.filterDeleted());
    }
    /** 编辑数据，参数：目标数据 */
    protected editData(): void {
        let app: InventoryTransferEditApp = new InventoryTransferEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(this.viewData);
    }
    /** 运行,覆盖原方法 */
    run(): void;
    run(data: bo.InventoryTransfer): void;
    run(): void {
        if (!(arguments[0] instanceof bo.InventoryTransfer)) {
            this.viewData = arguments[0];
            this.show();
        } else {
            super.run.apply(this, arguments);
        }
    }
    private viewData: bo.InventoryTransfer;
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria | string): void {
        this.busy(true);
        let that: this = this;
        if (typeof criteria === "string") {
            criteria = new ibas.Criteria();
            // 添加查询条件

        }
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchInventoryTransfer({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.InventoryTransfer>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.viewData = opRslt.resultObjects.firstOrDefault();
                    that.viewShowed();
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }
    /** 获取服务的契约 */
    protected getServiceProxies(): ibas.IServiceProxy<ibas.IServiceContract>[] {
        return [];
    }
}
/** 视图-库存转储 */
export interface IInventoryTransferViewView extends ibas.IBOViewView {
    /** 显示数据 */
    showInventoryTransfer(data: bo.InventoryTransfer): void;
    /** 显示数据 */
    showInventoryTransferLines(datas: bo.InventoryTransferLine[]): void;
}
/** 库存转储连接服务映射 */
export class InventoryTransferLinkServiceMapping extends ibas.BOLinkServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = InventoryTransferViewApp.APPLICATION_ID;
        this.name = InventoryTransferViewApp.APPLICATION_NAME;
        this.boCode = InventoryTransferViewApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IBOLinkServiceCaller> {
        return new InventoryTransferViewApp();
    }
}
