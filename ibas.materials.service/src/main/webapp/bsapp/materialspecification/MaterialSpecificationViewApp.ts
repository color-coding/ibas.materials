/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 查看应用-物料规格 */
        export class MaterialSpecificationViewApp extends ibas.BOViewService<IMaterialSpecificationViewView, bo.MaterialSpecification> {
            /** 应用标识 */
            static APPLICATION_ID: string = "9c9b5798-5828-4071-99b9-333a025ec87b";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialspecification_view";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialSpecification.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSpecificationViewApp.APPLICATION_ID;
                this.name = MaterialSpecificationViewApp.APPLICATION_NAME;
                this.boCode = MaterialSpecificationViewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.saveEvent = this.save;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                let criteria: ibas.Criteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = conditions.specificationtree.CONDITION_ALIAS_TEMPLATE;
                condition.value = this.viewData.specification.toString();
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchSpecificationTree({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.SpecificationTree>): void {
                        try {
                            let specTree: bo.SpecificationTree = opRslt.resultObjects.firstOrDefault();
                            if (ibas.objects.isNull(specTree)) {
                                // 没找到模板，直接输出
                                let prdTree: MaterialSpecificationTree = new MaterialSpecificationTree(that.viewData);
                                for (let item of that.viewData.materialSpecificationItems) {
                                    prdTree.items.add(new MaterialSpecificationTreeItem(item));
                                }
                                that.view.showSpecificationTree(prdTree);
                            } else {
                                let createItem: Function = function (specItem: bo.SpecificationTreeItem): MaterialSpecificationTreeItem {
                                    let item: bo.MaterialSpecificationItem = that.viewData.materialSpecificationItems.firstOrDefault(c => c.sign === specItem.sign);
                                    if (!ibas.objects.isNull(item)) {
                                        let prdItem: MaterialSpecificationTreeItem = new MaterialSpecificationTreeItem(item);
                                        prdItem.editable = specItem.editable;
                                        prdItem.vaildValues = specItem.vaildValues;
                                        for (let sItem of specItem.items) {
                                            let nItem: MaterialSpecificationTreeItem = createItem(sItem);
                                            if (ibas.objects.isNull(nItem)) {
                                                continue;
                                            }
                                            prdItem.items.add(nItem);
                                        }
                                        return prdItem;
                                    }
                                };
                                let prdTree: MaterialSpecificationTree = new MaterialSpecificationTree(that.viewData);
                                for (let item of specTree.items) {
                                    let nItem: MaterialSpecificationTreeItem = createItem(item);
                                    if (ibas.objects.isNull(nItem)) {
                                        continue;
                                    }
                                    prdTree.items.add(nItem);
                                }
                                that.view.showSpecificationTree(prdTree);
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            run(): void;
            run(data: bo.MaterialSpecification): void;
            run(criteria: ibas.Criteria | string): void;
            /** 运行 */
            run(): void {
                if (ibas.objects.instanceOf(arguments[0], bo.MaterialSpecification)) {
                    this.viewData = arguments[0];
                    this.show();
                } else if (arguments[0] instanceof ibas.Criteria || typeof arguments[0] === "string") {
                    this.fetchData(arguments[0]);
                } else {
                    super.run.apply(this, arguments);
                }
            }
            protected viewData: bo.MaterialSpecification;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria | string): void {
                this.busy(true);
                let that: this = this;
                if (typeof criteria === "string") {
                    let value: string = criteria;
                    criteria = new ibas.Criteria();
                    criteria.result = 1;
                    // 添加查询条件
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.MaterialSpecification.PROPERTY_OBJECTKEY_NAME;
                    condition.value = value;
                }
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchMaterialSpecification({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSpecification>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.viewData = opRslt.resultObjects.firstOrDefault();
                            if (!that.isViewShowed()) {
                                // 没显示视图，先显示
                                that.show();
                            } else {
                                that.viewShowed();
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            private save(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.saveMaterialSpecification({
                    beSaved: this.viewData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialSpecification>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.viewData = opRslt.resultObjects.firstOrDefault();
                            that.close();
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
        }
        /** 视图-物料规格 */
        export interface IMaterialSpecificationViewView extends ibas.IBOViewView {
            /** 保存事件 */
            saveEvent: Function;
            /** 显示规格 */
            showSpecificationTree(data: MaterialSpecificationTree): void;
        }
        /** 物料规格连接服务映射 */
        export class MaterialSpecificationLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialSpecificationViewApp.APPLICATION_ID;
                this.name = MaterialSpecificationViewApp.APPLICATION_NAME;
                this.boCode = MaterialSpecificationViewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IBOLinkService {
                return new MaterialSpecificationViewApp();
            }
        }
        export class MaterialSpecificationTree implements bo.ISpecificationTree {
            constructor(data: bo.MaterialSpecification) {
                this.data = data;
                this.items = new ibas.ArrayList<MaterialSpecificationTreeItem>();
            }
            data: bo.MaterialSpecification;
            /** 模板 */
            get template(): number {
                return this.data.objectKey;
            }
            set template(value: number) {
                this.data.objectKey = value;
            }
            /** 名称 */
            get name(): string {
                return this.data.name;
            }
            set name(value: string) {
                this.data.name = value;
            }
            /** 备注 */
            get remarks(): string {
                return this.data.remarks;
            }
            set remarks(value: string) {
                this.data.name = value;
            }
            /** 项目集合 */
            items: ibas.IList<bo.ISpecificationTreeItem>;
            /** 转换 */
            convert(): bo.MaterialSpecification {
                return this.data;
            }
        }
        export class MaterialSpecificationTreeItem implements bo.ISpecificationTreeItem {
            constructor(data: bo.MaterialSpecificationItem) {
                this.data = data;
                this.vaildValues = new ibas.ArrayList<bo.ISpecificationTreeItemValue>();
                this.items = new ibas.ArrayList<MaterialSpecificationTreeItem>();
            }
            data: bo.MaterialSpecificationItem;
            /** 标记 */
            get sign(): string {
                return this.data.sign;
            }
            set sign(value: string) {
                this.data.sign = value;
            }
            /** 描述 */
            get description(): string {
                return this.data.description;
            }
            set description(value: string) {
                this.data.description = value;
            }
            /** 可编辑 */
            editable: boolean;
            /** 内容 */
            get content(): string {
                return this.data.content;
            }
            set content(value: string) {
                this.data.content = value;
            }
            /** 关联 */
            get associated(): string {
                return this.data.associated;
            }
            set associated(value: string) {
                this.data.associated = value;
            }
            /** 备注 */
            get note(): string {
                return this.data.note;
            }
            set note(value: string) {
                this.data.note = value;
            }
            /** 可选值 */
            vaildValues: ibas.IList<bo.ISpecificationTreeItemValue>;
            /** 项目集合 */
            items: ibas.IList<bo.ISpecificationTreeItem>;
        }
    }
}
