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
import { MaterialInventoryEditApp } from "./MaterialInventoryEditApp";

/** 查看应用-物料库存 */
export class MaterialInventoryViewApp extends ibas.BOViewService<IMaterialInventoryViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "39920e47-f503-4b4b-9975-812d8775a8fb";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialinventory_view";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.MaterialInventory.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialInventoryViewApp.APPLICATION_ID;
        this.name = MaterialInventoryViewApp.APPLICATION_NAME;
        this.boCode = MaterialInventoryViewApp.BUSINESS_OBJECT_CODE;
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
        if (ibas.objects.isNull(this.viewData)) {
            // 创建编辑对象实例
            this.viewData = new bo.MaterialInventory();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
        }
        this.view.showMaterialInventory(this.viewData);
    }

    private viewData: bo.MaterialInventory;
    /** 编辑数据，参数：目标数据 */
    protected editData(): void {
        let app: MaterialInventoryEditApp = new MaterialInventoryEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(this.viewData);
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        if (arguments[0] instanceof bo.MaterialInventory) {
            this.viewData = arguments[0];
            this.show();
        } else {
            super.run.apply(this, args);
        }
    }

    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria | string): void {
        this.busy(true);
        let that: this = this;
        if (typeof criteria === "string") {
            criteria = new ibas.Criteria();
            // 添加查询条件

        }
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialInventory({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialInventory>): void {
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
/** 视图-物料库存 */
export interface IMaterialInventoryViewView extends ibas.IBOViewView {
    showMaterialInventory(data: bo.MaterialInventory): void;
}
/** 物料库存连接服务映射 */
export class MaterialInventoryLinkServiceMapping extends ibas.BOLinkServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialInventoryViewApp.APPLICATION_ID;
        this.name = MaterialInventoryViewApp.APPLICATION_NAME;
        this.boCode = MaterialInventoryViewApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new MaterialInventoryViewApp();
    }
}
