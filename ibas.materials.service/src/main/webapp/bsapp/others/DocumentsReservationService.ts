/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace app {
        /**
         * 待预留单据
         */
        export class MaterialOrderedReservationTargetReportService extends ibas.ServiceApplication<ibas.IView, materials.app.IMaterialOrderedReservationTarget> {
            /** 应用标识 */
            static APPLICATION_ID: string = "f982784c-9907-2df5-ee26-f6670ee7d1c9";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_reservation_target_report";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialOrderedReservationTargetReportService.APPLICATION_ID;
                this.name = MaterialOrderedReservationTargetReportService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
            }
            protected runService(contract: materials.app.IMaterialOrderedReservationTarget): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                criteria.result = 1;
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = reportanalysis.bo.Report.PROPERTY_APPLICATIONID_NAME;
                condition.value = MaterialOrderedReservationService.APPLICATION_ID;
                condition = criteria.conditions.create();
                condition.alias = reportanalysis.bo.Report.PROPERTY_ACTIVATED_NAME;
                condition.value = ibas.emYesNo.YES.toString();
                condition = criteria.conditions.create();
                condition.alias = reportanalysis.bo.Report.PROPERTY_CATEGORY_NAME;
                condition.value = reportanalysis.bo.emReportType.REPORT.toString();
                let sort: ibas.ISort = criteria.sorts.create();
                sort.alias = reportanalysis.bo.Report.PROPERTY_OBJECTKEY_NAME;
                sort.sortType = ibas.emSortType.DESCENDING;
                let boRepository: reportanalysis.bo.BORepositoryReportAnalysis = new reportanalysis.bo.BORepositoryReportAnalysis();
                boRepository.fetchReport({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                throw new Error(ibas.i18n.prop("materials_not_found_reserved_data_report", MaterialOrderedReservationService.APPLICATION_ID));
                            }
                            for (let item of opRslt.resultObjects) {
                                ibas.servicesManager.runApplicationService<reportanalysis.app.IReportDataServiceContract, ibas.DataTable>({
                                    proxy: new reportanalysis.app.ReportDataServiceProxy({
                                        criteria: item.criteria(),
                                        parameters: [
                                            new ibas.KeyText("${" + bo.MaterialOrderedReservation.PROPERTY_ITEMCODE_NAME + "}", contract.itemCode),
                                            new ibas.KeyText("${" + bo.MaterialOrderedReservation.PROPERTY_DELIVERYDATE_NAME + "}", ibas.dates.toString(contract.deliveryDate, "yyyy-MM-dd")),
                                            new ibas.KeyText("${" + bo.MaterialOrderedReservation.PROPERTY_QUANTITY_NAME + "}", ibas.numbers.toString(contract.quantity)),
                                            new ibas.KeyText("${" + bo.MaterialOrderedReservation.PROPERTY_WAREHOUSE_NAME + "}", contract.warehouse),
                                            new ibas.KeyText("${UOM}", contract.uom),
                                        ],
                                    }),
                                    onCompleted(table: ibas.DataTable): void {
                                        let datas: any[] = table.convert();
                                        if (datas instanceof Array) {
                                            for (let data of datas) {
                                                let objectCode: string, docEntry: number, lineId: number, quantity: number;
                                                for (let item in data) {
                                                    if (typeof item !== "string") {
                                                        continue;
                                                    }
                                                    let ptyItem: string = item.toLowerCase();
                                                    if (ibas.strings.isWith(ptyItem, undefined, "targetdocumenttype")) {
                                                        objectCode = data[item];
                                                    } else if (ibas.strings.isWith(ptyItem, undefined, "targetdocumententry")) {
                                                        docEntry = data[item];
                                                    } else if (ibas.strings.isWith(ptyItem, undefined, "targetdocumentlineid")) {
                                                        lineId = data[item];
                                                    } else if (ibas.strings.isWith(ptyItem, undefined, "quantity")) {
                                                        quantity = data[item];
                                                    }
                                                }
                                                if (!ibas.strings.isEmpty(objectCode)
                                                    && docEntry > 0 && lineId >= 0 && quantity > 0) {
                                                    contract.onReserved(objectCode, docEntry, lineId, quantity);
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
            }
            protected viewShowed(): void {
            }

        }
        export class MaterialOrderedReservationTargetReportServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialOrderedReservationTargetReportService.APPLICATION_ID;
                this.name = MaterialOrderedReservationTargetReportService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = MaterialOrderedReservationTargetServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialOrderedReservationTargetReportService();
            }
        }
        /**
         * 可预留单据
         */
        export class MaterialOrderedReservationSourceReportService extends ibas.ServiceApplication<ibas.IView, materials.app.IMaterialOrderedReservationTarget> {
            /** 应用标识 */
            static APPLICATION_ID: string = "c0912778-ce7e-43f7-8118-9d26922b7902";
            /** 应用名称 */
            static APPLICATION_NAME: string = "materials_app_reservation_source_report";
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialOrderedReservationSourceReportService.APPLICATION_ID;
                this.name = MaterialOrderedReservationSourceReportService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
            }
            protected runService(contract: materials.app.IMaterialOrderedReservationTarget): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                criteria.result = 1;
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = reportanalysis.bo.Report.PROPERTY_APPLICATIONID_NAME;
                condition.value = MaterialInventoryReservationService.APPLICATION_ID;
                condition = criteria.conditions.create();
                condition.alias = reportanalysis.bo.Report.PROPERTY_ACTIVATED_NAME;
                condition.value = ibas.emYesNo.YES.toString();
                condition = criteria.conditions.create();
                condition.alias = reportanalysis.bo.Report.PROPERTY_CATEGORY_NAME;
                condition.value = reportanalysis.bo.emReportType.REPORT.toString();
                let sort: ibas.ISort = criteria.sorts.create();
                sort.alias = reportanalysis.bo.Report.PROPERTY_OBJECTKEY_NAME;
                sort.sortType = ibas.emSortType.DESCENDING;
                let boRepository: reportanalysis.bo.BORepositoryReportAnalysis = new reportanalysis.bo.BORepositoryReportAnalysis();
                boRepository.fetchReport({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                throw new Error(ibas.i18n.prop("materials_not_found_reserved_data_report", MaterialInventoryReservationService.APPLICATION_ID));
                            }
                            for (let item of opRslt.resultObjects) {
                                ibas.servicesManager.runApplicationService<reportanalysis.app.IReportDataServiceContract, ibas.DataTable>({
                                    proxy: new reportanalysis.app.ReportDataServiceProxy({
                                        criteria: item.criteria(),
                                        parameters: [
                                            new ibas.KeyText("${" + bo.MaterialOrderedReservation.PROPERTY_ITEMCODE_NAME + "}", contract.itemCode),
                                            new ibas.KeyText("${" + bo.MaterialOrderedReservation.PROPERTY_DELIVERYDATE_NAME + "}", ibas.dates.toString(contract.deliveryDate, "yyyy-MM-dd")),
                                            new ibas.KeyText("${" + bo.MaterialOrderedReservation.PROPERTY_QUANTITY_NAME + "}", ibas.numbers.toString(contract.quantity)),
                                            new ibas.KeyText("${" + bo.MaterialOrderedReservation.PROPERTY_WAREHOUSE_NAME + "}", contract.warehouse),
                                            new ibas.KeyText("${UOM}", contract.uom),
                                        ],
                                    }),
                                    onCompleted(table: ibas.DataTable): void {
                                        let datas: any[] = table.convert();
                                        if (datas instanceof Array) {
                                            for (let data of datas) {
                                                let objectCode: string, docEntry: number, lineId: number, quantity: number;
                                                for (let item in data) {
                                                    if (typeof item !== "string") {
                                                        continue;
                                                    }
                                                    let ptyItem: string = item.toLowerCase();
                                                    if (ibas.strings.isWith(ptyItem, undefined, "sourcedocumenttype")) {
                                                        objectCode = data[item];
                                                    } else if (ibas.strings.isWith(ptyItem, undefined, "sourcedocumententry")) {
                                                        docEntry = data[item];
                                                    } else if (ibas.strings.isWith(ptyItem, undefined, "sourcedocumentlineid")) {
                                                        lineId = data[item];
                                                    } else if (ibas.strings.isWith(ptyItem, undefined, "quantity")) {
                                                        quantity = data[item];
                                                    }
                                                }
                                                if (!ibas.strings.isEmpty(objectCode)
                                                    && docEntry > 0 && lineId >= 0 && quantity > 0) {
                                                    contract.onReserved(objectCode, docEntry, lineId, quantity);
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
            }
            protected viewShowed(): void {
            }

        }
        export class MaterialOrderedReservationSourceReportServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = MaterialOrderedReservationSourceReportService.APPLICATION_ID;
                this.name = MaterialOrderedReservationSourceReportService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = materials.app.MaterialOrderedReservationSourceServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new MaterialOrderedReservationSourceReportService();
            }
        }
    }
}
