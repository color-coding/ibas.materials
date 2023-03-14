/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
 namespace materials {
    export namespace app {
        /** 编辑应用-物料废品率 */
        export class MaterialScrapEditApp extends ibas.BOEditApplication<IMaterialScrapEditView, bo.MaterialScrap> {
            /** 应用标识 */
            static APPLICATION_ID: string = "6939fa1c-d0b5-4c06-ae6f-d2d3b2ba4fc1";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_materialscrap_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.MaterialScrap.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialScrapEditApp.APPLICATION_ID;
                this.name = MaterialScrapEditApp.APPLICATION_NAME;
                this.boCode = MaterialScrapEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.addMaterialScrapSectionEvent = this.addMaterialScrapSection;
                this.view.removeMaterialScrapSectionEvent = this.removeMaterialScrapSection;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.MaterialScrap();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showMaterialScrap(this.editData);
                this.view.showMaterialScrapSections(this.editData.materialScrapSections.filterDeleted());
            }
            run(): void;
            run(data: bo.MaterialScrap): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.MaterialScrap)) {
                    let data: bo.MaterialScrap = arguments[0];
                    // 新对象直接编辑
                    if (data.isNew) {
                        that.editData = data;
                        that.show();
                        return;
                    }
                    // 尝试重新查询编辑对象
                    let criteria: ibas.ICriteria = data.criteria();
                    if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                        // 有效的查询对象查询
                        let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                        boRepository.fetchMaterialScrap({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.MaterialScrap>): void {
                                let data: bo.MaterialScrap;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.MaterialScrap)) {
                                    // 查询到了有效数据
                                    that.editData = data;
                                    that.show();
                                } else {
                                    // 数据重新检索无效
                                    that.messages({
                                        type: ibas.emMessageType.WARNING,
                                        message: ibas.i18n.prop("shell_data_deleted_and_created"),
                                        onCompleted(): void {
                                            that.show();
                                        }
                                    });
                                }
                            }
                        });
                        return; // 退出
                    }
                }
                super.run.apply(this, arguments);
            }
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.saveMaterialScrap({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.MaterialScrap>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                // 删除成功，释放当前对象
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                                that.editData = undefined;
                            } else {
                                // 替换编辑对象
                                that.editData = opRslt.resultObjects.firstOrDefault();
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                            }
                            // 刷新当前视图
                            that.viewShowed();
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 删除数据 */
            protected deleteData(): void {
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_delete_continue"),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action === ibas.emMessageAction.YES) {
                            that.editData.delete();
                            that.saveData();
                        }
                    }
                });
            }
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void {
                let that: this = this;
                let createData: Function = function (): void {
                    if (clone) {
                        // 克隆对象
                        that.editData = that.editData.clone();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_cloned_new"));
                        that.viewShowed();
                    } else {
                        // 新建对象
                        that.editData = new bo.MaterialScrap();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                        that.viewShowed();
                    }
                };
                if (that.editData.isDirty) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        title: ibas.i18n.prop(this.name),
                        message: ibas.i18n.prop("shell_data_not_saved_continue"),
                        actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                        onCompleted(action: ibas.emMessageAction): void {
                            if (action === ibas.emMessageAction.YES) {
                                createData();
                            }
                        }
                    });
                } else {
                    createData();
                }
            }
            /** 添加物料废品率 - 阶梯事件 */
            protected addMaterialScrapSection(): void {
                this.editData.materialScrapSections.create();
                // 仅显示没有标记删除的
                this.view.showMaterialScrapSections(this.editData.materialScrapSections.filterDeleted());
            }
            /** 删除物料废品率 - 阶梯事件 */
            protected removeMaterialScrapSection(items: bo.MaterialScrapSection[]): void {
                // 非数组，转为数组
                if (!(items instanceof Array)) {
                    items = [items];
                }
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (this.editData.materialScrapSections.indexOf(item) >= 0) {
                        if (item.isNew) {
                            // 新建的移除集合
                            this.editData.materialScrapSections.remove(item);
                        } else {
                            // 非新建标记删除
                            item.delete();
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showMaterialScrapSections(this.editData.materialScrapSections.filterDeleted());
            }

        }
        /** 视图-物料废品率 */
        export interface IMaterialScrapEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showMaterialScrap(data: bo.MaterialScrap): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加物料废品率 - 阶梯事件 */
            addMaterialScrapSectionEvent: Function;
            /** 删除物料废品率 - 阶梯事件 */
            removeMaterialScrapSectionEvent: Function;
            /** 显示数据-物料废品率 - 阶梯 */
            showMaterialScrapSections(datas: bo.MaterialScrapSection[]): void;
        }
    }
}
