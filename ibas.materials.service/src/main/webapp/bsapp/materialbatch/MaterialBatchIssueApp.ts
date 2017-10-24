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

export class MaterialBatchIssueApp extends ibas.BOApplication<IMaterialBatchIssueView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "141e2a0f-3120-40a3-9bb4-f8b61672ed9c";
    /** 应用名称 */
    static APPLICATION_NAME: string = "materials_app_materialbatchissue";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.MaterialBatchJournal.BUSINESS_OBJECT_ISSUE_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialBatchIssueApp.APPLICATION_ID;
        this.name = MaterialBatchIssueApp.APPLICATION_NAME;
        this.boCode = MaterialBatchIssueApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 服务输入数据 */
    protected inputData: bo.MaterialBatchInput[];
    /** 可选批次信息 */
    protected batchData: bo.MaterialBatch[];
    /** 已选批次信息 */
    protected selectedBatchData: bo.MaterialBatch[];

    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.selectMaterialBatchJournalLineEvent  = this.selectMaterialBatchJournalLine;
        this.view.autoSelectMaterialBatchEvent = this.autoSelectMaterialBatch;
        this.view.addBatchMaterialBatchEvent = this.addBatchMaterialBatch;
        this.view.removeBatchMaterialBatchEvent = this.removeBatchMaterialBatch;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showJournalLineData(this.inputData);
    }
    protected fetchData(criteria: ibas.ICriteria): void {
        this.busy(true);
        let that: this = this;
        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialBatchJournal({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatchJournal>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 1
                        && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true)) {
                        // 仅一条数据，直接选择
                        // that.chooseData(opRslt.resultObjects);
                    } else {
                        if (!that.isViewShowed()) {
                            // 没显示视图，先显示
                            that.show();
                        }
                        that.view.showLeftData(opRslt.resultObjects);
                        that.busy(false);
                    }
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
    }
    protected newData(): void {
        throw new Error("Method not implemented.");
    }
    protected selectMaterialBatchJournalLine(selected: bo.MaterialBatchInput): void {
        let that: this = this;
        // 根据物料查询可用批次
        let criteria: ibas.ICriteria = new ibas.Criteria();
        let condition: ibas.ICondition = criteria.conditions.create();
        condition = new ibas.Condition(bo.MaterialBatch.PROPERTY_ITEMCODE_NAME, ibas.emConditionOperation.EQUAL, selected.itemCode);
        condition = criteria.conditions.create();
        condition = new ibas.Condition(bo.MaterialBatch.PROPERTY_WAREHOUSE_NAME, ibas.emConditionOperation.EQUAL, selected.warehouse);
        condition.relationship = ibas.emConditionRelationship.AND;

        let boRepository: BORepositoryMaterials = new BORepositoryMaterials();
        boRepository.fetchMaterialBatch({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialBatch>): void {
                let data: bo.MaterialBatch[];
                if (opRslt.resultCode === 0) {
                    data = opRslt.resultObjects;
                }
                if (ibas.objects.instanceOf(data, bo.MaterialBatch)) {
                    // 查询到了有效数据
                    that.batchData = data;
                    that.show();
                } else {
                    // 数据重新检索无效
                    that.messages({
                        type: ibas.emMessageType.WARNING,
                        message: ibas.i18n.prop("sys_shell_data_deleted_and_created"),
                        onCompleted(): void {
                            that.show();
                        }
                    });
                }
            }
        });

    }
    protected autoSelectMaterialBatch(): void {
        /** 按照一定规则自动选择批次信息 */
        // 获取规则
        // 假设按照创建时间顺序自动选择
    }
    /** 添加选择的批次事件 */
    protected addBatchMaterialBatch(selected: bo.MaterialBatch): void {
        //
    }
    /** 移除选择的批次事件 */
    protected removeBatchMaterialBatch(selected: bo.MaterialBatch): void {
        //
    }

    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        // if (ibas.objects.instanceOf(arguments[0].caller.firstOrDefault, bo.MaterialBatchInput)) {
            if(arguments[0].caller.length >= 1) {
                that.inputData = arguments[0].caller;
            }
        super.run();
    }
}

/** 视图-批次新建 */
export interface IMaterialBatchIssueView extends ibas.IBOView {
    /** 显示数据 */
    showLeftData(datas: bo.MaterialBatchJournal[]): void;
    showRightData(datas: bo.MaterialBatchJournal[]): void;
    showJournalLineData(datas: bo.MaterialBatchInput[]): void;
    /** 选择设置批次中凭证行信息事件 */
    selectMaterialBatchJournalLineEvent: Function;
    /** 自动选择事件 */
    autoSelectMaterialBatchEvent: Function;
    /** 添加选择的批次事件 */
    addBatchMaterialBatchEvent: Function;
    /** 移除选择的批次事件 */
    removeBatchMaterialBatchEvent: Function;
}

/** 批次选择服务映射 */
export class MaterialBatchIssueServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = MaterialBatchIssueApp.APPLICATION_ID;
        this.name = MaterialBatchIssueApp.APPLICATION_NAME;
        this.category = MaterialBatchIssueApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = ibas.BOSelectServiceProxy;
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IBOSelectServiceContract> {
        return new MaterialBatchIssueApp();
    }
}