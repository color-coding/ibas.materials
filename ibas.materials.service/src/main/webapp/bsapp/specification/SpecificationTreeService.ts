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
            private specification: bo.SpecificationTree;
            private extraData: {
                material: string;
                customer: string;
                supplier: string;
                name: string,
                project: string,
                remarks: string
            };
            /** 运行服务 */
            runService(contract: ISpecificationTreeContract): void {
                if (!(contract.target instanceof bo.MaterialSpecification
                    || (typeof contract.target === "string" && !ibas.strings.isEmpty(contract.target)))) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "target"));
                }
                this.extraData = {
                    material: typeof contract.target === "string" ? contract.target : undefined,
                    customer: contract.customer,
                    supplier: contract.supplier,
                    name: contract.name,
                    project: contract.project,
                    remarks: contract.remarks
                };
                if (contract.target instanceof bo.MaterialSpecification) {
                    // 模板查询
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = conditions.specificationtree.CONDITION_ALIAS_TEMPLATE;
                    condition.value = contract.target.specification.toString();
                    this.showSpecification(criteria);
                } else if (typeof contract.target === "string") {
                    // 物料查询
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = conditions.specificationtree.CONDITION_ALIAS_MATERIAL;
                    condition.value = contract.target;
                    condition = criteria.conditions.create();
                    condition.alias = conditions.specificationtree.CONDITION_ALIAS_DATE;
                    condition.value = ibas.dates.toString(contract.date ? contract.date : ibas.dates.today(), "yyyy-MM-dd");
                    if (!ibas.strings.isEmpty(contract.customer)) {
                        condition = criteria.conditions.create();
                        condition.alias = conditions.specificationtree.CONDITION_ALIAS_CUSTOMER;
                        condition.value = contract.customer;
                    } else if (!ibas.strings.isEmpty(contract.supplier)) {
                        condition = criteria.conditions.create();
                        condition.alias = conditions.specificationtree.CONDITION_ALIAS_SUPPLIER;
                        condition.value = contract.supplier;
                    }
                    this.showSpecification(criteria);
                }
            }
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
                let data: bo.IMaterialSpecification = this.specification.convert();
                if (this.extraData) {
                    if (!ibas.strings.isEmpty(this.extraData.material)) {
                        data.itemCode = this.extraData.material;
                    }
                    if (!ibas.strings.isEmpty(this.extraData.name)) {
                        data.name = this.extraData.name;
                    }
                    if (!ibas.strings.isEmpty(this.extraData.project)) {
                        data.project = this.extraData.project;
                    }
                    if (!ibas.strings.isEmpty(this.extraData.remarks)) {
                        data.remarks = this.extraData.remarks;
                    }
                    if (!ibas.strings.isEmpty(this.extraData.customer)) {
                        data.businessPartnerType = businesspartner.bo.emBusinessPartnerType.CUSTOMER;
                        data.businessPartnerCode = this.extraData.customer;
                    } else if (!ibas.strings.isEmpty(this.extraData.supplier)) {
                        data.businessPartnerType = businesspartner.bo.emBusinessPartnerType.SUPPLIER;
                        data.businessPartnerCode = this.extraData.supplier;
                    }
                }
                let that: this = this;
                let boRepository: bo.IBORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.saveMaterialSpecification({
                    beSaved: data,
                    onCompleted(opRslt: ibas.IOperationResult<bo.IMaterialSpecification>): void {
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
        class DoneError extends Error {
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
