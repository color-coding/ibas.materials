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
import { MaterialInventoryJournalEditApp } from "./MaterialInventoryJournalEditApp";

/** 查看应用-仓库日记账 */
export class MaterialInventoryJournalViewApp extends ibas.BOViewService<IMaterialInventoryJournalViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "9d313771-b5d6-497e-9440-930b8b829850";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialjournal_view";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.MaterialInventoryJournal.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialInventoryJournalViewApp.APPLICATION_ID;
        this.name = MaterialInventoryJournalViewApp.APPLICATION_NAME;
        this.boCode = MaterialInventoryJournalViewApp.BUSINESS_OBJECT_CODE;
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
            this.viewData = new bo.MaterialInventoryJournal();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
        }
        this.view.showMaterialJournal(this.viewData);
    }

    private viewDate: bo.MaterialInventoryJournal;
    /** 编辑数据，参数：目标数据 */
    protected editData(): void {
        let app: MaterialInventoryJournalEditApp = new MaterialInventoryJournalEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(this.viewData);
    }
    /** 运行,覆盖原方法 */
    run(): void;
    run(data: bo.MaterialInventoryJournal): void;
    run(): void {
        if (ibas.objects.instanceOf(arguments[0], bo.MaterialInventoryJournal)) {
            this.viewData = arguments[0];
            this.show();
        } else {
            super.run.apply(this, arguments);
        }
    }
    private viewData: bo.MaterialInventoryJournal;
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria | string): void {
        this.busy(true);
        let that: this = this;
        if (typeof criteria === "string") {
            criteria = new ibas.Criteria();
            // 添加查询条件

        }
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialInventoryJournal({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialInventoryJournal>): void {
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
/** 视图-仓库日记账 */
export interface IMaterialInventoryJournalViewView extends ibas.IBOViewView {
    showMaterialJournal(data: bo.MaterialInventoryJournal): void;
}
/** 仓库日记账连接服务映射 */
export class MaterialInventoryJournalLinkServiceMapping extends ibas.BOLinkServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialInventoryJournalViewApp.APPLICATION_ID;
        this.name = MaterialInventoryJournalViewApp.APPLICATION_NAME;
        this.boCode = MaterialInventoryJournalViewApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务实例 */
    create(): ibas.IService<ibas.IBOLinkServiceCaller> {
        return new MaterialInventoryJournalViewApp();
    }
}
