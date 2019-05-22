/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 查看应用-规格模板 */
        export class SpecificationTreeService extends ibas.ServiceWithResultApplication<ISpecificationTreeView, ISpecificationTreeContract, bo.IMaterialSpecification> {
            /** 应用标识 */
            static APPLICATION_ID: string = "9969b8e3-dc26-41a7-9c38-0d9ea7bff68b";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_specification_service";
            /** 构造函数 */
            constructor() {
                super();
                this.id = SpecificationTreeService.APPLICATION_ID;
                this.name = SpecificationTreeService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.saveEvent = this.save;
                this.view.usingEvent = this.using;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 运行服务 */
            runService(contract: ISpecificationTreeContract): void {
                this.extraData = { name: contract.name, remarks: contract.remarks };
                this.name = contract.name;
                if (contract.target instanceof bo.MaterialSpecification) {
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    criteria.result = 1;
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = "template";
                    condition.value = contract.target.specification.toString();
                    this.showSpecification(criteria);
                } else if (typeof contract.target === "string") {
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    criteria.result = 1;
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = "material";
                    condition.value = contract.target;
                    this.showSpecification(criteria);
                } else {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "target"));
                }
            }
            private extraData: { remarks: string, name: string };
            private specification: bo.SpecificationTree;

            private showSpecification(criteria: ibas.ICriteria): void {
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchSpecificationTree({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.SpecificationTree>): void {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (!that.isViewShowed()) {
                                that.show();
                            }
                            that.view.showSpecifications(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            private using(specification: bo.SpecificationTree): void {
                if (!(specification instanceof bo.SpecificationTree)) {
                    this.messages(ibas.emMessageType.ERROR, ibas.i18n.prop("sys_invalid_parameter", "specification"));
                    return;
                }
                this.busy(true);
                this.specification = specification;
                this.view.showSpecificationTree(this.specification);
                this.busy(false);
            }
            private save(): void {
                this.busy(true);
                let data: bo.MaterialSpecification = new bo.MaterialSpecification();
                data.name = (this.extraData.name ? this.extraData.name : "") + this.specification.name;
                data.specification = this.specification.template;
                data.remarks = this.extraData.remarks;
                let createItem: Function = function (item: bo.SpecificationTreeItem, parentSign: string = undefined): void {
                    let dataItem: bo.MaterialSpecificationItem = data.materialSpecificationItems.create();
                    dataItem.parentSign = parentSign;
                    dataItem.sign = item.sign;
                    dataItem.description = item.description;
                    dataItem.content = item.content;
                    dataItem.note = item.note;
                    if (item.items instanceof Array) {
                        for (let sItem of item.items) {
                            createItem(sItem, item.sign);
                        }
                    }
                };
                if (this.specification.items instanceof Array) {
                    for (let sItem of this.specification.items) {
                        createItem(sItem);
                    }
                }
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.saveMaterialSpecification({
                    beSaved: data,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSpecification>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "result"));
                            }
                            that.fireCompleted(opRslt.resultObjects.firstOrDefault());
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
        }
        /** 视图-规格模板 */
        export interface ISpecificationTreeView extends ibas.IBOView {
            /** 显示规格 */
            showSpecifications(datas: bo.SpecificationTree[]): void;
            /** 使用事件 */
            usingEvent: Function;
            /** 保存事件 */
            saveEvent: Function;
            /** 显示规格 */
            showSpecificationTree(data: bo.SpecificationTree): void;
        }
        /** 规格模板连接服务映射 */
        export class SpecificationTreeServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = SpecificationTreeService.APPLICATION_ID;
                this.name = SpecificationTreeService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = SpecificationTreeServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new SpecificationTreeService();
            }
        }
    }
}
