/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    /** 模块-标识 */
    const CONSOLE_ID: string;
    /** 模块-名称 */
    const CONSOLE_NAME: string;
    /** 模块-版本 */
    const CONSOLE_VERSION: string;
    namespace config {
        /**
         * 获取此模块配置
         * @param key 配置项
         * @param defalut 默认值
         */
        function get<T>(key: string, defalut?: T): T;
    }
    namespace bo {
        /** 业务仓库名称 */
        const BO_REPOSITORY_REPORTANALYSIS: string;
        /** 业务对象编码-报表 */
        const BO_CODE_REPORT: string;
        /** 业务对象编码-报表簿 */
        const BO_CODE_REPORTBOOK: string;
        /** 业务对象编码-报表结果 */
        const BO_CODE_REPORTRESULT: string;
        /**
         * 报表类型
         */
        enum emReportType {
            /** 系统报表 */
            REPORT = 0,
            /** 服务报表 */
            SERVICE = 1,
            /** 报表文件 */
            FILE = 2,
            /** 第三方应用 */
            THIRD_APP = 3
        }
        /**
         * 报表参数类型
         */
        enum emReportParameterType {
            /** 自由文本 */
            TEXT = 0,
            /** 日期 */
            DATETIME = 1,
            /** 系统变量 */
            SYSTEM = 2,
            /** 范围值 */
            RANGE = 3,
            /** 预置值 */
            PRESET = 4,
            /** 选择服务 */
            CHOOSE_LIST = 5
        }
        /**
         * 分配类型
         */
        enum emAssignedType {
            /** 用户 */
            USER = 0,
            /** 角色 */
            ROLE = 1,
            /** 全部 */
            ALL = 2
        }
    }
    namespace app {
        /** 报表数据服务契约 */
        interface IReportDataServiceContract extends ibas.IServiceContract {
            /** 标题 */
            title?: string;
            /** 使用的报表查询 */
            criteria: ibas.ICriteria | ibas.ICondition[];
            /** 报表参数 */
            parameters?: ibas.KeyText[];
            /** 选择类型 */
            chooseType: ibas.emChooseType;
        }
        /** 报表数据服务代理 */
        class ReportDataServiceProxy extends ibas.ServiceProxy<IReportDataServiceContract> {
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace bo {
        /** 报表 */
        interface IReport extends ibas.IBOSimple {
            /** 对象编号 */
            objectKey: number;
            /** 对象类型 */
            objectCode: string;
            /** 实例号 */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据来源 */
            dataSource: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 更新日期 */
            updateDate: Date;
            /** 更新时间 */
            updateTime: number;
            /** 创建用户 */
            createUserSign: number;
            /** 更新用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 数据所有者 */
            dataOwner: number;
            /** 团队成员 */
            teamMembers: string;
            /** 数据所属组织 */
            organization: string;
            /** 报表名称 */
            name: string;
            /** 激活 */
            activated: ibas.emYesNo;
            /** 报表类型 */
            category: emReportType;
            /** 报表组别 */
            group: string;
            /** 关联的业务对象 */
            boCode: string;
            /** 关联的应用 */
            applicationId: string;
            /** 关联的报表 */
            associatedReport: number;
            /** 查询语句 */
            sqlString: string;
            /** 服务器名称 */
            server: string;
            /** 用户名 */
            user: string;
            /** 密码 */
            password: string;
            /** 报表地址 */
            address: string;
            /** 第三方应用 */
            thirdPartyApp: string;
            /** 备注 */
            remarks: string;
            /** 报表参数集合 */
            reportParameters: IReportParameters;
        }
        /** 报表参数 */
        interface IReportParameter extends ibas.IBOSimpleLine {
            /** 对象编号 */
            objectKey: number;
            /** 对象行号 */
            lineId: number;
            /** 对象类型 */
            objectCode: string;
            /** 实例号 */
            logInst: number;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 更新日期 */
            updateDate: Date;
            /** 更新时间 */
            updateTime: number;
            /** 创建用户 */
            createUserSign: number;
            /** 更新用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 参数名称 */
            name: string;
            /** 参数类型 */
            category: emReportParameterType;
            /** 参数说明 */
            description: string;
            /** 参数值 */
            value: string;
        }
        /** 报表参数 集合 */
        interface IReportParameters extends ibas.IBusinessObjects<IReportParameter> {
            /** 创建并添加子项 */
            create(): IReportParameter;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace bo {
        /** 报表簿 */
        interface IReportBook extends ibas.IBOSimple {
            /** 对象编号 */
            objectKey: number;
            /** 对象类型 */
            objectCode: string;
            /** 实例号 */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 更新日期 */
            updateDate: Date;
            /** 更新时间 */
            updateTime: number;
            /** 创建用户 */
            createUserSign: number;
            /** 更新用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 数据所有者 */
            dataOwner: number;
            /** 团队成员 */
            teamMembers: string;
            /** 数据所属组织 */
            organization: string;
            /** 指派类型 */
            assignedType: emAssignedType;
            /** 指派目标 */
            assigned: string;
            /** 报表名称 */
            name: string;
            /** 激活 */
            activated: ibas.emYesNo;
            /** 备注 */
            remarks: string;
            /** 报表簿-项目集合 */
            reportBookItems: IReportBookItems;
        }
        /** 报表簿-项目 */
        interface IReportBookItem extends ibas.IBOSimpleLine {
            /** 对象编号 */
            objectKey: number;
            /** 对象行号 */
            lineId: number;
            /** 对象类型 */
            objectCode: string;
            /** 实例号 */
            logInst: number;
            /** 数据源 */
            dataSource: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 更新日期 */
            updateDate: Date;
            /** 更新时间 */
            updateTime: number;
            /** 创建用户 */
            createUserSign: number;
            /** 更新用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 报表编号 */
            report: number;
            /** 项目名称 */
            name: string;
        }
        /** 报表簿-项目 集合 */
        interface IReportBookItems extends ibas.IBusinessObjects<IReportBookItem> {
            /** 创建并添加子项 */
            create(): IReportBookItem;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace bo {
        /** ReportAnalysis 业务仓库 */
        interface IBORepositoryReportAnalysis extends ibas.IBORepositoryApplication {
            /**
             * 获取地址
             */
            toUrl(document: bo.IReport): string;
            /**
             * 查询 报表
             * @param fetcher 查询者
             */
            fetchReport(fetcher: ibas.IFetchCaller<bo.IReport>): void;
            /**
             * 保存 报表
             * @param saver 保存者
             */
            saveReport(saver: ibas.ISaveCaller<bo.IReport>): void;
            /**
             * 查询 报表簿
             * @param fetcher 查询者
             */
            fetchReportBook(fetcher: ibas.IFetchCaller<bo.IReportBook>): void;
            /**
             * 保存 报表簿
             * @param saver 保存者
             */
            saveReportBook(saver: ibas.ISaveCaller<bo.IReportBook>): void;
        }
        /**
         * 用户相关调用者
         */
        interface IUserMethodsCaller<P> extends ibas.IMethodCaller<P> {
            /** 用户 */
            user: string;
            /** 平台 */
            platform?: string;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace bo {
        /** 报表 */
        class Report extends ibas.BOSimple<Report> implements IReport {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象编号 */
            get objectKey(): number;
            /** 设置-对象编号 */
            set objectKey(value: number);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            get objectCode(): string;
            /** 设置-对象类型 */
            set objectCode(value: string);
            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号 */
            get logInst(): number;
            /** 设置-实例号 */
            set logInst(value: number);
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            get dataSource(): string;
            /** 设置-数据源 */
            set dataSource(value: string);
            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-服务系列 */
            get series(): number;
            /** 设置-服务系列 */
            set series(value: number);
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            get createDate(): Date;
            /** 设置-创建日期 */
            set createDate(value: Date);
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            get createTime(): number;
            /** 设置-创建时间 */
            set createTime(value: number);
            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-更新日期 */
            get updateDate(): Date;
            /** 设置-更新日期 */
            set updateDate(value: Date);
            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-更新时间 */
            get updateTime(): number;
            /** 设置-更新时间 */
            set updateTime(value: number);
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            get createUserSign(): number;
            /** 设置-创建用户 */
            set createUserSign(value: number);
            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-更新用户 */
            get updateUserSign(): number;
            /** 设置-更新用户 */
            set updateUserSign(value: number);
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            get createActionId(): string;
            /** 设置-创建动作标识 */
            set createActionId(value: string);
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            get updateActionId(): string;
            /** 设置-更新动作标识 */
            set updateActionId(value: string);
            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string;
            /** 获取-数据所有者 */
            get dataOwner(): number;
            /** 设置-数据所有者 */
            set dataOwner(value: number);
            /** 映射的属性名称-团队成员 */
            static PROPERTY_TEAMMEMBERS_NAME: string;
            /** 获取-团队成员 */
            get teamMembers(): string;
            /** 设置-团队成员 */
            set teamMembers(value: string);
            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string;
            /** 获取-数据所属组织 */
            get organization(): string;
            /** 设置-数据所属组织 */
            set organization(value: string);
            /** 映射的属性名称-报表名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-报表名称 */
            get name(): string;
            /** 设置-报表名称 */
            set name(value: string);
            /** 映射的属性名称-激活 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活 */
            get activated(): ibas.emYesNo;
            /** 设置-激活 */
            set activated(value: ibas.emYesNo);
            /** 映射的属性名称-报表类型 */
            static PROPERTY_CATEGORY_NAME: string;
            /** 获取-报表类型 */
            get category(): emReportType;
            /** 设置-报表类型 */
            set category(value: emReportType);
            /** 映射的属性名称-报表组别 */
            static PROPERTY_GROUP_NAME: string;
            /** 获取-报表组别 */
            get group(): string;
            /** 设置-报表组别 */
            set group(value: string);
            /** 映射的属性名称-关联的业务对象 */
            static PROPERTY_BOCODE_NAME: string;
            /** 获取-关联的业务对象 */
            get boCode(): string;
            /** 设置-关联的业务对象 */
            set boCode(value: string);
            /** 映射的属性名称-关联的应用 */
            static PROPERTY_APPLICATIONID_NAME: string;
            /** 获取-关联的应用 */
            get applicationId(): string;
            /** 设置-关联的应用 */
            set applicationId(value: string);
            /** 映射的属性名称-关联的报表 */
            static PROPERTY_ASSOCIATEDREPORT_NAME: string;
            /** 获取-关联的报表 */
            get associatedReport(): number;
            /** 设置-关联的报表 */
            set associatedReport(value: number);
            /** 映射的属性名称-查询语句 */
            static PROPERTY_SQLSTRING_NAME: string;
            /** 获取-查询语句 */
            get sqlString(): string;
            /** 设置-查询语句 */
            set sqlString(value: string);
            /** 映射的属性名称-服务器名称 */
            static PROPERTY_SERVER_NAME: string;
            /** 获取-服务器名称 */
            get server(): string;
            /** 设置-服务器名称 */
            set server(value: string);
            /** 映射的属性名称-用户名 */
            static PROPERTY_USER_NAME: string;
            /** 获取-用户名 */
            get user(): string;
            /** 设置-用户名 */
            set user(value: string);
            /** 映射的属性名称-密码 */
            static PROPERTY_PASSWORD_NAME: string;
            /** 获取-密码 */
            get password(): string;
            /** 设置-密码 */
            set password(value: string);
            /** 映射的属性名称-报表地址 */
            static PROPERTY_ADDRESS_NAME: string;
            /** 获取-报表地址 */
            get address(): string;
            /** 设置-报表地址 */
            set address(value: string);
            /** 映射的属性名称-第三方应用 */
            static PROPERTY_THIRDPARTYAPP_NAME: string;
            /** 获取-第三方应用 */
            get thirdPartyApp(): string;
            /** 设置-第三方应用 */
            set thirdPartyApp(value: string);
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            get remarks(): string;
            /** 设置-备注 */
            set remarks(value: string);
            /** 映射的属性名称-报表参数集合 */
            static PROPERTY_REPORTPARAMETERS_NAME: string;
            /** 获取-报表参数集合 */
            get reportParameters(): ReportParameters;
            /** 设置-报表参数集合 */
            set reportParameters(value: ReportParameters);
            /** 初始化数据 */
            protected init(): void;
        }
        /** 报表参数 */
        class ReportParameter extends ibas.BOSimpleLine<ReportParameter> implements IReportParameter {
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象编号 */
            get objectKey(): number;
            /** 设置-对象编号 */
            set objectKey(value: number);
            /** 映射的属性名称-对象行号 */
            static PROPERTY_LINEID_NAME: string;
            /** 获取-对象行号 */
            get lineId(): number;
            /** 设置-对象行号 */
            set lineId(value: number);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            get objectCode(): string;
            /** 设置-对象类型 */
            set objectCode(value: string);
            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号 */
            get logInst(): number;
            /** 设置-实例号 */
            set logInst(value: number);
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            get createDate(): Date;
            /** 设置-创建日期 */
            set createDate(value: Date);
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            get createTime(): number;
            /** 设置-创建时间 */
            set createTime(value: number);
            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-更新日期 */
            get updateDate(): Date;
            /** 设置-更新日期 */
            set updateDate(value: Date);
            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-更新时间 */
            get updateTime(): number;
            /** 设置-更新时间 */
            set updateTime(value: number);
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            get createUserSign(): number;
            /** 设置-创建用户 */
            set createUserSign(value: number);
            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-更新用户 */
            get updateUserSign(): number;
            /** 设置-更新用户 */
            set updateUserSign(value: number);
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            get createActionId(): string;
            /** 设置-创建动作标识 */
            set createActionId(value: string);
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            get updateActionId(): string;
            /** 设置-更新动作标识 */
            set updateActionId(value: string);
            /** 映射的属性名称-参数名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-参数名称 */
            get name(): string;
            /** 设置-参数名称 */
            set name(value: string);
            /** 映射的属性名称-参数类型 */
            static PROPERTY_CATEGORY_NAME: string;
            /** 获取-参数类型 */
            get category(): emReportParameterType;
            /** 设置-参数类型 */
            set category(value: emReportParameterType);
            /** 映射的属性名称-参数说明 */
            static PROPERTY_DESCRIPTION_NAME: string;
            /** 获取-参数说明 */
            get description(): string;
            /** 设置-参数说明 */
            set description(value: string);
            /** 映射的属性名称-参数值 */
            static PROPERTY_VALUE_NAME: string;
            /** 获取-参数值 */
            get value(): string;
            /** 设置-参数值 */
            set value(value: string);
            /** 初始化数据 */
            protected init(): void;
            /** 属性改变时 */
            protected onPropertyChanged(name: string): void;
        }
        /** 报表参数 集合 */
        class ReportParameters extends ibas.BusinessObjects<ReportParameter, Report> implements IReportParameters {
            /** 创建并添加子项 */
            create(): ReportParameter;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace bo {
        /** 报表簿 */
        class ReportBook extends ibas.BOSimple<ReportBook> implements IReportBook {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象编号 */
            get objectKey(): number;
            /** 设置-对象编号 */
            set objectKey(value: number);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            get objectCode(): string;
            /** 设置-对象类型 */
            set objectCode(value: string);
            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号 */
            get logInst(): number;
            /** 设置-实例号 */
            set logInst(value: number);
            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-服务系列 */
            get series(): number;
            /** 设置-服务系列 */
            set series(value: number);
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            get dataSource(): string;
            /** 设置-数据源 */
            set dataSource(value: string);
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            get createDate(): Date;
            /** 设置-创建日期 */
            set createDate(value: Date);
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            get createTime(): number;
            /** 设置-创建时间 */
            set createTime(value: number);
            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-更新日期 */
            get updateDate(): Date;
            /** 设置-更新日期 */
            set updateDate(value: Date);
            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-更新时间 */
            get updateTime(): number;
            /** 设置-更新时间 */
            set updateTime(value: number);
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            get createUserSign(): number;
            /** 设置-创建用户 */
            set createUserSign(value: number);
            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-更新用户 */
            get updateUserSign(): number;
            /** 设置-更新用户 */
            set updateUserSign(value: number);
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            get createActionId(): string;
            /** 设置-创建动作标识 */
            set createActionId(value: string);
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            get updateActionId(): string;
            /** 设置-更新动作标识 */
            set updateActionId(value: string);
            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string;
            /** 获取-数据所有者 */
            get dataOwner(): number;
            /** 设置-数据所有者 */
            set dataOwner(value: number);
            /** 映射的属性名称-团队成员 */
            static PROPERTY_TEAMMEMBERS_NAME: string;
            /** 获取-团队成员 */
            get teamMembers(): string;
            /** 设置-团队成员 */
            set teamMembers(value: string);
            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string;
            /** 获取-数据所属组织 */
            get organization(): string;
            /** 设置-数据所属组织 */
            set organization(value: string);
            /** 映射的属性名称-指派类型 */
            static PROPERTY_ASSIGNEDTYPE_NAME: string;
            /** 获取-指派类型 */
            get assignedType(): emAssignedType;
            /** 设置-指派类型 */
            set assignedType(value: emAssignedType);
            /** 映射的属性名称-指派目标 */
            static PROPERTY_ASSIGNED_NAME: string;
            /** 获取-指派目标 */
            get assigned(): string;
            /** 设置-指派目标 */
            set assigned(value: string);
            /** 映射的属性名称-报表名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-报表名称 */
            get name(): string;
            /** 设置-报表名称 */
            set name(value: string);
            /** 映射的属性名称-激活 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活 */
            get activated(): ibas.emYesNo;
            /** 设置-激活 */
            set activated(value: ibas.emYesNo);
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            get remarks(): string;
            /** 设置-备注 */
            set remarks(value: string);
            /** 映射的属性名称-报表簿-项目集合 */
            static PROPERTY_REPORTBOOKITEMS_NAME: string;
            /** 获取-报表簿-项目集合 */
            get reportBookItems(): ReportBookItems;
            /** 设置-报表簿-项目集合 */
            set reportBookItems(value: ReportBookItems);
            protected onPropertyChanged(name: string): void;
            /** 初始化数据 */
            protected init(): void;
        }
        /** 报表簿-项目 */
        class ReportBookItem extends ibas.BOSimpleLine<ReportBookItem> implements IReportBookItem {
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象编号 */
            get objectKey(): number;
            /** 设置-对象编号 */
            set objectKey(value: number);
            /** 映射的属性名称-对象行号 */
            static PROPERTY_LINEID_NAME: string;
            /** 获取-对象行号 */
            get lineId(): number;
            /** 设置-对象行号 */
            set lineId(value: number);
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            get objectCode(): string;
            /** 设置-对象类型 */
            set objectCode(value: string);
            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号 */
            get logInst(): number;
            /** 设置-实例号 */
            set logInst(value: number);
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            get dataSource(): string;
            /** 设置-数据源 */
            set dataSource(value: string);
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            get createDate(): Date;
            /** 设置-创建日期 */
            set createDate(value: Date);
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            get createTime(): number;
            /** 设置-创建时间 */
            set createTime(value: number);
            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-更新日期 */
            get updateDate(): Date;
            /** 设置-更新日期 */
            set updateDate(value: Date);
            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-更新时间 */
            get updateTime(): number;
            /** 设置-更新时间 */
            set updateTime(value: number);
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            get createUserSign(): number;
            /** 设置-创建用户 */
            set createUserSign(value: number);
            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-更新用户 */
            get updateUserSign(): number;
            /** 设置-更新用户 */
            set updateUserSign(value: number);
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            get createActionId(): string;
            /** 设置-创建动作标识 */
            set createActionId(value: string);
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            get updateActionId(): string;
            /** 设置-更新动作标识 */
            set updateActionId(value: string);
            /** 映射的属性名称-报表编号 */
            static PROPERTY_REPORT_NAME: string;
            /** 获取-报表编号 */
            get report(): number;
            /** 设置-报表编号 */
            set report(value: number);
            /** 映射的属性名称-项目名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-项目名称 */
            get name(): string;
            /** 设置-项目名称 */
            set name(value: string);
            /** 初始化数据 */
            protected init(): void;
        }
        /** 报表簿-项目 集合 */
        class ReportBookItems extends ibas.BusinessObjects<ReportBookItem, ReportBook> implements IReportBookItems {
            /** 创建并添加子项 */
            create(): ReportBookItem;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace bo {
        /** 报表数据 */
        class ReportData {
            /** 标识 */
            id: string;
            /** 名称 */
            name: string;
            /** 组 */
            group: string;
            /** 备注 */
            remarks: string;
            /** 参数 */
            parameters: ReportDataParameter[];
        }
        /** 报表参数 */
        class ReportDataParameter {
            /** 名称 */
            name: string;
            /** 值 */
            value: string;
        }
        /** 报表组 */
        class ReportGroup {
            /** 父项标识 */
            parentId: string;
            /** 标识 */
            id: string;
            /** 名称 */
            name: string;
            /** 备注 */
            remarks: string;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace bo {
        /** 用户报表 */
        class UserReport {
            static create(report: IReport): UserReport;
            constructor();
            /** 标识 */
            id: string;
            /** 名称 */
            name: string;
            /** 类型 */
            category: emReportType;
            /** 组 */
            group: string;
            /** 报表参数 */
            parameters: ibas.ArrayList<UserReportParameter>;
            /** 参数获取值 */
            valueParameters(): void;
        }
        /** 用户报表参数 */
        class UserReportParameter {
            static create(parameter: IReportParameter): UserReportParameter;
            /** 参数名称 */
            name: string;
            /** 参数类型 */
            category: emReportParameterType;
            /** 参数说明 */
            description: string;
            /** 参数值 */
            value: string;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace bo {
        namespace ibas4j {
            /** ibas的java端数据声明 */
            /** 操作消息 */
            interface IDataDeclaration {
                /** 数据类型 */
                type: string;
            }
            /** 用户报表 */
            interface IUserReport extends IDataDeclaration {
                /** 标识 */
                Id: string;
                /** 名称 */
                Name: string;
                /** 类型 */
                Category: string;
                /** 组 */
                Group: string;
                /** 报表参数 */
                Parameters: IUserReportParameter[];
            }
            /** 用户报表参数 */
            interface IUserReportParameter extends IDataDeclaration {
                /** 参数名称 */
                Name: string;
                /** 参数类型 */
                Category: string;
                /** 参数说明 */
                Description: string;
                /** 参数值 */
                Value: string;
            }
            /** 报表数据 */
            interface IReportData extends IDataDeclaration {
                /** 标识 */
                Id: string;
                /** 名称 */
                Name: string;
                /** 组 */
                Group: string;
                /** 备注 */
                Remarks: string;
                /** 参数 */
                Parameters: IReportDataParameter[];
            }
            /** 报表参数 */
            interface IReportDataParameter extends IDataDeclaration {
                /** 名称 */
                Name: string;
                /** 值 */
                Value: string;
            }
            /** 报表数据 */
            interface IReportGroup extends IDataDeclaration {
                /** 父项标识 */
                ParentId: string;
                /** 标识 */
                Id: string;
                /** 名称 */
                Name: string;
                /** 备注 */
                Remarks: string;
            }
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace bo {
        /** 数据转换者 */
        class DataConverter extends ibas.DataConverter4j {
            /** 创建业务对象转换者 */
            protected createConverter(): ibas.BOConverter;
            /**
             * 转换业务对象数据
             * @param data 本地类型
             * @param sign 特殊标记
             * @returns 目标类型
             */
            convert(data: any, sign: string): any;
            /**
             * 解析业务对象数据
             * @param data 目标类型
             * @param sign 特殊标记
             * @returns 本地类型
             */
            parsing(data: any, sign: string): any;
        }
        /** 模块业务对象工厂 */
        const boFactory: ibas.BOFactory;
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace bo {
        /** ReportAnalysis 业务仓库 */
        class BORepositoryReportAnalysis extends ibas.BORepositoryApplication implements IBORepositoryReportAnalysis {
            /** 创建此模块的后端与前端数据的转换者 */
            protected createConverter(): ibas.IDataConverter;
            /** 获取报表地址 */
            toUrl(report: bo.Report): string;
            /** 获取文件地址 */
            toUrl(file: string): string;
            /**
             * 上传报表文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void;
            /**
             * 读取报表文件
             * @param caller 调用者
             */
            download(caller: ibas.IDownloadFileCaller<Blob>): void;
            /**
             * 查询用户报表
             * @param ibas.IListener 用户检索监听者
             */
            fetchUserReports(caller: IUserMethodsCaller<bo.UserReport>): void;
            /**
             * 运行用户报表
             * @param ibas.IListener 用户检索监听者
             */
            runUserReport(caller: IRunUserReportCaller): void;
            /**
             * 查询 报表
             * @param fetcher 查询者
             */
            fetchReport(fetcher: ibas.IFetchCaller<bo.Report>): void;
            /**
             * 保存 报表
             * @param saver 保存者
             */
            saveReport(saver: ibas.ISaveCaller<bo.Report>): void;
            /**
             * 查询 报表簿
             * @param fetcher 查询者
             */
            fetchReportBook(fetcher: ibas.IFetchCaller<bo.ReportBook>): void;
            /**
             * 保存 报表簿
             * @param saver 保存者
             */
            saveReportBook(saver: ibas.ISaveCaller<bo.ReportBook>): void;
        }
        /**
         * 用户相关调用者
         */
        interface IRunUserReportCaller extends ibas.IMethodCaller<ibas.DataTable> {
            /** 用户 */
            report: bo.UserReport;
        }
        /** 远程报表服务 */
        class RemoteReporterService extends ibas.BORepositoryApplication {
            get token(): string;
            set token(value: string);
            setToken(user: string, password: string): void;
            /** 创建此模块的后端与前端数据的转换者 */
            protected createConverter(): ibas.IDataConverter;
            /**
             * 查询 报表数据
             * @param fetcher 查询者
             */
            fetchReportData(fetcher: ibas.IFetchCaller<bo.ReportData>): void;
            /**
             * 查询 报表组
             * @param fetcher 查询者
             */
            fetchReportGroup(fetcher: ibas.IFetchCaller<bo.ReportGroup>): void;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace bo {
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        /** 查看应用-报表 */
        abstract class ReportViewApp<T extends IReportViewView> extends ibas.Application<T> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            run(): void;
            run(report: bo.Report): void;
            run(report: bo.UserReport): void;
            protected report: bo.UserReport;
            protected runReport(): void;
            protected valueLink(objectCode: string, value: string, rowData?: any): void;
        }
        /** 视图-报表 */
        export interface IReportViewView extends ibas.IView {
            /** 运行报表 */
            runReportEvent: Function;
            /** 重置报表 */
            resetReportEvent: Function;
            /** 显示报表 */
            showReport(report: bo.UserReport): void;
            /** 显示报表结果 */
            showResults(table: ibas.DataTable): void;
            /** 值链接事件 */
            valueLinkEvent: Function;
        }
        /** 查看应用-报表普通 */
        export class ReportViewerApp extends ReportViewApp<IReportDataChooseView> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 构造函数 */
            constructor();
        }
        /** 查看应用-报表页签 */
        export class ReportTabViewerApp extends ReportViewApp<IReportDataChooseView> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 构造函数 */
            constructor();
            /** 使用报表 */
            useReport(report: bo.UserReport): void;
        }
        /** 查看应用-报表数据选择 */
        export class ReportDataChooseApp extends ReportViewApp<IReportDataChooseView> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            private chooseData;
            run(): void;
            run(report: bo.Report, chooseType?: ibas.emChooseType, chooseFirst?: ibas.emYesNo): void;
            run(report: bo.UserReport, chooseType?: ibas.emChooseType, chooseFirst?: ibas.emYesNo): void;
            /** 数据选择完成 */
            onChoosedData: (table: ibas.DataTable) => void;
        }
        /** 视图-报表 */
        export interface IReportDataChooseView extends IReportViewView {
            /** 选择数据 */
            chooseDataEvent: Function;
            /** 选择类型 */
            chooseType: ibas.emChooseType;
            /** 选择第一行 */
            chooseFirtData: ibas.emYesNo;
        }
        export {};
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        /** 应用-报表 */
        class ReportChooseApp extends ibas.BOChooseService<IReportChooseView, bo.Report> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
            /** 新建数据 */
            protected newData(): void;
        }
        /** 视图-报表 */
        interface IReportChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Report[]): void;
        }
        /** 报表选择服务映射 */
        class ReportChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.Report>>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        /** 应用-报表 */
        class ReportEditApp extends ibas.BOEditService<IReportEditView, bo.Report> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.Report): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            /** 添加报表参数事件 */
            private addReportParameter;
            /** 删除报表参数事件 */
            private removeReportParameter;
            /** 选择报表 */
            private chooseReportAssociatedReport;
            /** 报表参数-系统变量选择 */
            private chooseReportParameterVariable;
            /** 选择业务对象 */
            private chooseReportBusinessObject;
            /** 选择第三方应用 */
            private chooseReportThirdPartyApp;
            /** 上传报表 */
            private uploadReport;
            /** 下载文件 */
            protected downloadFile(): void;
            protected runReport(): void;
        }
        /** 视图-报表 */
        interface IReportEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showReport(data: bo.Report): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加报表参数事件 */
            addReportParameterEvent: Function;
            /** 删除报表参数事件 */
            removeReportParameterEvent: Function;
            /** 显示数据 */
            showReportParameters(datas: bo.ReportParameter[]): void;
            /** 报表-业务对象选择 */
            chooseReportBusinessObjectEvent: Function;
            /** 报表-第三方应用选择 */
            chooseReportThirdPartyAppEvent: Function;
            /** 报表-报表选择 */
            chooseReportAssociatedReportEvent: Function;
            /** 报表参数-系统变量选择 */
            chooseReportParameterVariableEvent: Function;
            /** 上传报表文件 */
            uploadReportEvent: Function;
            /** 下载报表文件 */
            downloadReportEvent: Function;
            /** 运行报表 */
            runReportEvent: Function;
        }
        /** 报表编辑服务映射 */
        class ReportEditServiceMapping extends ibas.BOEditServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOEditServiceCaller<bo.Report>>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        class ReportFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID: string;
            /** 功能名称 */
            static FUNCTION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        /** 列表应用-报表 */
        class ReportListApp extends ibas.BOListApplication<IReportListView, bo.Report> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
            /** 新建数据 */
            protected newData(): void;
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.Report): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.Report): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.Report | bo.Report[]): void;
        }
        /** 视图-报表 */
        interface IReportListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.Report[]): void;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        class ReportDataService extends ibas.ServiceWithResultApplication<IReporDataServiceView, IReportDataServiceContract, ibas.DataTable> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            protected runService(contract: IReportDataServiceContract): void;
            private triggerData?;
            private parameters?;
            private dataChooseType;
            private chooseFirstData;
            protected viewShowed(): void;
            /** 新建数据 */
            protected newData(): void;
            protected chooseData(report: bo.Report): void;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
        }
        /** 视图-报表 */
        interface IReporDataServiceView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Report[]): void;
        }
        /** 报表数据服务映射 */
        class ReportDataServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract>;
        }
        /** 报表结果服务映射 */
        class ReportResultServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        /** 业务对象报表服务 */
        class BOReportService extends ibas.ServiceApplication<IBOReportServiceView, ibas.IBOServiceContract> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            constructor();
            /** 运行服务 */
            runService(contract: ibas.IBOServiceContract): void;
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            protected report: bo.UserReport;
            private selectReport;
            private resetReport;
            private runReport;
            private valueLink;
        }
        /** 业务对象报表服务-视图 */
        interface IBOReportServiceView extends IReportViewView {
            /** 显示报表 */
            showReports(reports: bo.UserReport[]): void;
            /** 选择报表 */
            selectReportEvent: Function;
        }
        /** 业务对象报表服务映射 */
        class BOReportServiceMapping extends ibas.ServiceMapping {
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        /** 应用-报表簿 */
        class ReportBookChooseApp extends ibas.BOChooseService<IReportBookChooseView, bo.ReportBook> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
            /** 新建数据 */
            protected newData(): void;
        }
        /** 视图-报表簿 */
        interface IReportBookChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.ReportBook[]): void;
        }
        /** 报表簿选择服务映射 */
        class ReportBookChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.ReportBook>>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        /** 应用-报表簿 */
        class ReportBookEditApp extends ibas.BOEditApplication<IReportBookEditView, bo.ReportBook> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.ReportBook): void;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            /** 添加报表簿-项目事件 */
            addReportBookItem(): void;
            /** 删除报表簿-项目事件 */
            removeReportBookItem(items: bo.ReportBookItem[]): void;
            /** 选择客户、角色行事件 */
            private chooseUserRole;
            /** 选择报表簿-项目-报表事件 */
            chooseReportBookItemReport(caller: bo.ReportBookItem): void;
        }
        /** 视图-报表簿 */
        interface IReportBookEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showReportBook(data: bo.ReportBook): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加报表簿-项目事件 */
            addReportBookItemEvent: Function;
            /** 删除报表簿-项目事件 */
            removeReportBookItemEvent: Function;
            /** 显示数据 */
            showReportBookItems(datas: bo.ReportBookItem[]): void;
            /** 选择报表簿-项目-报表事件 */
            chooseReportBookItemReportEvent: Function;
            /** 选择用户、角色事件 */
            chooseUserRoleEvent: Function;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        class ReportBookFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID: string;
            /** 功能名称 */
            static FUNCTION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        /** 列表应用-报表簿 */
        class ReportBookListApp extends ibas.BOListApplication<IReportBookListView, bo.ReportBook> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void;
            /** 新建数据 */
            protected newData(): void;
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.ReportBook): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.ReportBook): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.ReportBook | bo.ReportBook[]): void;
        }
        /** 视图-报表簿 */
        interface IReportBookListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.ReportBook[]): void;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        /** 列表应用-BOE报表 */
        class ReportImportApp extends ibas.Application<IReportImportView> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            /** 获取目录 */
            fetchReportDataGroup(): void;
            /** 获取报表 */
            fetchReportData(groups: bo.ReportGroup[]): void;
            /** 导入报表 */
            importReport(datas: bo.ReportData[]): void;
        }
        /** 视图-BOE报表 */
        interface IReportImportView extends ibas.IView {
            /** 服务地址 */
            readonly server: string;
            /** 用户 */
            readonly user: string;
            /** 密码 */
            readonly password: string;
            /** 获取目录 */
            fetchReportDataGroupEvent: Function;
            /** 显示目录 */
            showReportGroups(datas: bo.ReportGroup[]): void;
            /** 获取报表 */
            fetchReportDataEvent: Function;
            /** 显示报表 */
            showReportDatas(datas: bo.ReportData[]): void;
            /** 导入报表 */
            importReportEvent: Function;
        }
    }
}
/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        class ReportImportFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID: string;
            /** 功能名称 */
            static FUNCTION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView>;
        }
    }
}
/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        class UserReportPageFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID: string;
            /** 功能名称 */
            static FUNCTION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView>;
        }
        /**
         * 用户报表簿功能
         */
        class UserReportBookFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID_PREFIX: string;
            /** 构造函数 */
            constructor(report: bo.UserReport);
            private report;
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView>;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        /** 显示的报表类型 */
        const CONFIG_ITEM_DISPLAY_REPORT_TYPE: string;
        const PARAMETER_NAME_ASSOCIATED_REPORT: string;
        /** 应用-用户报表 */
        class UserReportPageApp extends ibas.Application<IUserReportPageView> {
            /** 应用标识 */
            static APPLICATION_ID: string;
            /** 应用名称 */
            static APPLICATION_NAME: string;
            /** 构造函数 */
            constructor();
            /** 注册视图 */
            protected registerView(): void;
            /** 视图显示后 */
            protected viewShowed(): void;
            private activeReport;
            /** 当前用户报表集合 */
            private reports;
            private refreshReports;
        }
        /** 视图-报表 */
        interface IUserReportPageView extends ibas.IView {
            /** 显示用户报表 */
            showReports(reports: bo.UserReport[]): void;
            /** 激活报表 */
            activeReportEvent: Function;
            /** 刷新报表 */
            refreshReportsEvent: Function;
            /** 更新报表 */
            updateReport(report: bo.UserReport, table: ibas.DataTable): void;
        }
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace reportanalysis {
    namespace app {
        /** 模块控制台 */
        class Console extends ibas.ModuleConsole {
            /** 构造函数 */
            constructor();
            /** 创建视图导航 */
            navigation(): ibas.IViewNavigation;
            /** 初始化 */
            protected registers(): void;
            /** 运行 */
            run(): void;
        }
        /** 模块控制台 */
        class ConsolePhone extends Console {
            /** 初始化 */
            protected registers(): void;
        }
        /** 配置项目-禁用报表功能 */
        const CONFIG_ITEM_DISABLE_REPORT_FUNCTIONS: string;
        /** 模块控制台 */
        class ConsoleUsers extends ibas.ModuleConsole {
            /** 模块-标识 */
            static CONSOLE_ID: string;
            /** 模块-名称 */
            static CONSOLE_NAME: string;
            /** 模块-版本 */
            static CONSOLE_VERSION: string;
            /** 构造函数 */
            constructor();
            /** 创建视图导航 */
            navigation(): ibas.IViewNavigation;
            /** 初始化 */
            protected registers(): void;
            /** 运行 */
            run(): void;
            /** 设置报表仓库地址 */
            setRepository(address: string): boolean;
        }
    }
}
