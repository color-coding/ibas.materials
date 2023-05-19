/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /** 列表应用-计量单位换算率 */
        export class UnitRateEditListApp extends ibas.Application<IUnitRateEditListView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "e149e013-fba2-40b8-a2cb-f1ff1f978d4f";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_unitrate_edit_list";
            /** 构造函数 */
            constructor() {
                super();
                this.id = UnitRateEditListApp.APPLICATION_ID;
                this.name = UnitRateEditListApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.addDataEvent = this.addData;
                this.view.saveDataEvent = this.saveData;
                this.view.removeDataEvent = this.removeData;
                this.view.chooseDataUnitEvent = this.chooseDataUnit;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                let that: this = this;
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                boRepository.fetchUnitRate({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.UnitRate>): void {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (!that.isViewShowed()) {
                                // 没显示视图，先显示
                                that.show();
                            }
                            that.editDatas.clear();
                            that.editDatas.add(opRslt.resultObjects);
                            that.view.showData(that.editDatas.filter(c => c.isDeleted === false));
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            run(material?: bo.Material): void {
                if (!ibas.objects.isNull(material)) {
                    this.material = material;
                    this.fetchData(app.conditions.unitrate.create(material));
                } else {
                    super.run();
                }
            }
            private material: bo.Material;
            private editDatas: ibas.IList<bo.UnitRate> = new ibas.ArrayList<bo.UnitRate>();

            protected saveData(): void {
                let boRepository: bo.BORepositoryMaterials = new bo.BORepositoryMaterials();
                ibas.queues.execute(this.editDatas.where(c => c.isDirty === true),
                    (data, next) => {
                        boRepository.saveUnitRate({
                            beSaved: data,
                            onCompleted(opRslt: ibas.IOperationResult<bo.UnitRate>): void {
                                if (opRslt.resultCode !== 0) {
                                    next(new Error(opRslt.message));
                                } else {
                                    data.markOld();
                                    next();
                                }
                            }
                        });
                    },
                    (error) => {
                        if (error instanceof Error) {
                            this.messages(ibas.emMessageType.ERROR, error.message);
                        } else {
                            this.messages(ibas.emMessageType.SUCCESS,
                                ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                            this.destroy();
                        }
                    }
                );
            }
            protected addData(): void {
                // 调用选择服务
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.Unit>({
                    boCode: bo.BO_CODE_UNIT,
                    criteria: [
                        new ibas.Condition(bo.Unit.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<bo.Unit>): void {
                        for (let selected of selecteds) {
                            let unitRate: bo.UnitRate = new bo.UnitRate();
                            unitRate.source = selected.name;
                            unitRate.target = that.material?.inventoryUOM;
                            unitRate.condition = ibas.strings.format(conditions.unitrate.CONDITION_VALUE_TEMPLATE, that.material?.code);
                            unitRate.rate = 1;
                            that.editDatas.add(unitRate);
                        }
                        that.view.showData(that.editDatas.filter(c => c.isDeleted === false));
                    }
                });
            }
            protected removeData(data: bo.UnitRate): void {
                if (data.isNew === true) {
                    this.editDatas.remove(data);
                } else {
                    data.delete();
                }
                this.view.showData(this.editDatas.filter(c => c.isDeleted === false));
            }
            protected chooseDataUnit(data: bo.UnitRate, type: string): void {
                // 调用选择服务
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.Unit>({
                    chooseType: ibas.emChooseType.SINGLE,
                    boCode: bo.BO_CODE_UNIT,
                    criteria: [
                        new ibas.Condition(bo.Unit.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<bo.Unit>): void {
                        for (let selected of selecteds) {
                            if (!(data instanceof bo.UnitRate)) {
                                let data: bo.UnitRate = new bo.UnitRate();
                                data.target = that.material?.inventoryUOM;
                                data.condition = ibas.strings.format(conditions.unitrate.CONDITION_VALUE_TEMPLATE, that.material?.code);
                                data.rate = 1;
                                that.editDatas.add(data);
                            }
                            if (type === bo.UnitRate.PROPERTY_SOURCE_NAME) {
                                data.source = selected.name;
                            } else if (type === bo.UnitRate.PROPERTY_TARGET_NAME) {
                                data.target = selected.name;
                            }
                        }
                        that.view.showData(that.editDatas.filter(c => c.isDeleted === false));
                    }
                });
            }
        }
        /** 视图-计量单位换算率 */
        export interface IUnitRateEditListView extends ibas.IView {
            /** 保存数据事件 */
            saveDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.UnitRate[]): void;
            /** 添加数据事件 */
            addDataEvent: Function;
            /** 删除数据事件 */
            removeDataEvent: Function;
            /** 选择单位事件 */
            chooseDataUnitEvent: Function;
        }
    }
}
