/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace businesspartner {
    /** 模块-标识 */
    const CONSOLE_ID: string;
    /** 模块-名称 */
    const CONSOLE_NAME: string;
    /** 模块-版本 */
    const CONSOLE_VERSION: string;
    namespace bo {
        /** 业务仓库名称 */
        const BO_REPOSITORY_BUSINESSPARTNER: string;
        /** 业务对象编码-业务伙伴地址 */
        const BO_CODE_ADDRESS: string;
        /** 业务对象编码-业务伙伴组 */
        const BO_CODE_BUSINESSPARTNERGROUP: string;
        /** 业务对象编码-业务伙伴联系人 */
        const BO_CODE_CONTACTPERSON: string;
        /** 业务对象编码-客户 */
        const BO_CODE_CUSTOMER: string;
        /** 业务对象编码-供应商 */
        const BO_CODE_SUPPLIER: string;
        /** 业务对象编码-资产项目 */
        const BO_CODE_ASSETITEM: string;
        /** 业务对象编码-业务伙伴资产 */
        const BO_CODE_BUSINESSPARTNERASSET: string;
        /** 业务对象编码-业务伙伴资产日记账 */
        const BO_CODE_BUSINESSPARTNERASSETJOURNAL: string;
        /** 业务伙伴性质 */
        enum emBusinessPartnerNature {
            /** 公司 */
            COMPANY = 0,
            /** 私人 */
            PRIVATE = 1
        }
        /** 业务伙伴类型 */
        enum emBusinessPartnerType {
            /** 客户 */
            CUSTOMER = 0,
            /** 供应商 */
            SUPPLIER = 1
        }
        /** 性别 */
        enum emGender {
            /** 男 */
            MALE = 0,
            /** 女 */
            FEMALE = 1
        }
        /** 资产请求 */
        class IAssetRequest {
            /** 业务伙伴 */
            businessPartner: string;
            /** 单据类型 */
            documentType?: string;
            /** 单据编号 */
            documentEntry?: number;
            /** 单据行号 */
            documentLineId?: number;
            /** 总计 */
            total?: number;
            /** 货币 */
            currency: string;
        }
    }
    namespace app {
        /** 收款契约 */
        interface IReceiptContract extends ibas.IServiceContract {
            /** 业务伙伴类型 */
            businessPartnerType: bo.emBusinessPartnerType;
            /** 业务伙伴编码 */
            businessPartnerCode: string;
            /** 单据类型 */
            documentType: string;
            /** 单据编号 */
            documentEntry: number;
            /** 单据行号 */
            documentLineId?: number;
            /** 单据总计 */
            documentTotal: number;
            /** 单据货币 */
            documentCurrency: string;
            /** 单据摘要 */
            documentSummary?: string;
        }
        /** 收款服务代理 */
        class ReceiptServiceProxy extends ibas.ServiceProxy<IReceiptContract> {
        }
        /** 付款契约 */
        interface IPaymentContract extends ibas.IServiceContract {
            /** 业务伙伴类型 */
            businessPartnerType: bo.emBusinessPartnerType;
            /** 业务伙伴编码 */
            businessPartnerCode: string;
            /** 单据类型 */
            documentType: string;
            /** 单据编号 */
            documentEntry: number;
            /** 单据行号 */
            documentLineId?: number;
            /** 单据总计 */
            documentTotal: number;
            /** 单据货币 */
            documentCurrency: string;
            /** 单据摘要 */
            documentSummary?: string;
        }
        /** 付款服务代理 */
        class PaymentServiceProxy extends ibas.ServiceProxy<IPaymentContract> {
        }
        /** 查询条件 */
        namespace conditions {
            namespace customer {
                /** 默认查询条件 */
                function create(): ibas.IList<ibas.ICondition>;
            }
            namespace supplier {
                /** 默认查询条件 */
                function create(): ibas.IList<ibas.ICondition>;
            }
            namespace contactperson {
                function create(type: bo.emBusinessPartnerType, bpCode: string): ibas.IList<ibas.ICondition>;
            }
            namespace address {
                function create(type: bo.emBusinessPartnerType, bpCode: string): ibas.IList<ibas.ICondition>;
            }
            namespace assetitem {
                /** 默认查询条件 */
                function create(): ibas.IList<ibas.ICondition>;
            }
            namespace businesspartnerasset {
                /** 默认查询条件 */
                function create(type: bo.emBusinessPartnerType, bpCode: string): ibas.IList<ibas.ICondition>;
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
declare namespace businesspartner {
    namespace bo {
        /** 业务伙伴地址 */
        interface IAddress extends ibas.IBOSimple, ibas.IBOUserFields {
            /** 业务伙伴 */
            businessPartner: string;
            /** 归属类型 */
            ownerType: emBusinessPartnerType;
            /** 有效的 */
            activated: ibas.emYesNo;
            /** 名称 */
            name: string;
            /** 街道 */
            street: string;
            /** 县/区 */
            district: string;
            /** 市 */
            city: string;
            /** 省 */
            province: string;
            /** 国 */
            country: string;
            /** 邮编 */
            zipCode: string;
            /** 联系电话 */
            mobilePhone: string;
            /** 电话 1 */
            telephone1: string;
            /** 电话 2 */
            telephone2: string;
            /** 备注 1 */
            remark1: string;
            /** 备注 2 */
            remark2: string;
            /** 联系人 */
            contacts: string;
            /** 对象编号 */
            objectKey: number;
            /** 对象类型 */
            objectCode: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
            /** 实例号（版本） */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
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
declare namespace businesspartner {
    namespace bo {
        /** 业务伙伴组 */
        interface IBusinessPartnerGroup extends ibas.IBOMasterData, ibas.IBOUserFields {
            /** 编号 */
            code: string;
            /** 名称 */
            name: string;
            /** 激活 */
            activated: ibas.emYesNo;
            /** 对象编号 */
            docEntry: number;
            /** 对象类型 */
            objectCode: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
            /** 版本 */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 数据所有者 */
            dataOwner: number;
            /** 数据所属组织 */
            organization: string;
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
declare namespace businesspartner {
    namespace bo {
        /** 业务伙伴联系人 */
        interface IContactPerson extends ibas.IBOSimple, ibas.IBOUserFields {
            /** 业务伙伴 */
            businessPartner: string;
            /** 归属类型 */
            ownerType: emBusinessPartnerType;
            /** 有效的 */
            activated: ibas.emYesNo;
            /** 名称 */
            name: string;
            /** 性别 */
            gender: emGender;
            /** 职位 */
            position: string;
            /** 地址 */
            address: string;
            /** 电话 1 */
            telephone1: string;
            /** 电话 2 */
            telephone2: string;
            /** 移动电话 */
            mobilePhone: string;
            /** 传真 */
            fax: string;
            /** 电子邮件 */
            mail: string;
            /** 备注 1 */
            remark1: string;
            /** 备注 2 */
            remark2: string;
            /** 对象编号 */
            objectKey: number;
            /** 对象类型 */
            objectCode: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
            /** 实例号（版本） */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
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
declare namespace businesspartner {
    namespace bo {
        /** 客户 */
        interface ICustomer extends ibas.IBOMasterData, ibas.IBOUserFields {
            /** 编码 */
            code: string;
            /** 名称 */
            name: string;
            /** 标识 */
            sign: string;
            /** 组代码 */
            group: string;
            /** 激活 */
            activated: ibas.emYesNo;
            /** 公司/个人 */
            companyPrivate: emBusinessPartnerNature;
            /** 联系人 */
            contactPerson: number;
            /** 账单地址 */
            billAddress: number;
            /** 送货地址 */
            shipAddress: number;
            /** 注册地址 */
            registrationAddress: number;
            /** 电话 1 */
            telephone1: string;
            /** 电话 2 */
            telephone2: string;
            /** 移动电话 */
            mobilePhone: string;
            /** 传真号 */
            faxNumber: string;
            /** 国税编号 */
            taxId: string;
            /** 开户银行 */
            bank: string;
            /** 银行账户 */
            bankAccount: string;
            /** 发票地址 */
            invoiceAddress: string;
            /** 发票电话 */
            invoiceTelephone: string;
            /** 价格清单 */
            priceList: number;
            /** 货币 */
            currency: string;
            /** 仓库 */
            warehouse: string;
            /** 生效日期 */
            validDate: Date;
            /** 失效日期 */
            invalidDate: Date;
            /** 底价清单 */
            floorList: number;
            /** 税收组 */
            taxGroup: string;
            /** 备注 */
            remarks: string;
            /** 已引用 */
            referenced: ibas.emYesNo;
            /** 已删除 */
            deleted: ibas.emYesNo;
            /** 对象编号 */
            docEntry: number;
            /** 对象类型 */
            objectCode: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
            /** 版本 */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 审批状态 */
            approvalStatus: ibas.emApprovalStatus;
            /** 数据所有者 */
            dataOwner: number;
            /** 数据所属组织 */
            organization: string;
            /** 所属渠道 */
            channel: string;
            /** 组织单位 */
            organizationalUnit: string;
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
declare namespace businesspartner {
    namespace bo {
        /** 供应商 */
        interface ISupplier extends ibas.IBOMasterData, ibas.IBOUserFields {
            /** 编码 */
            code: string;
            /** 名称 */
            name: string;
            /** 标识 */
            sign: string;
            /** 组代码 */
            group: string;
            /** 激活 */
            activated: ibas.emYesNo;
            /** 公司/个人 */
            companyPrivate: emBusinessPartnerNature;
            /** 联系人 */
            contactPerson: number;
            /** 账单地址 */
            billAddress: number;
            /** 送货地址 */
            shipAddress: number;
            /** 注册地址 */
            registrationAddress: number;
            /** 电话 1 */
            telephone1: string;
            /** 电话 2 */
            telephone2: string;
            /** 移动电话 */
            mobilePhone: string;
            /** 传真号 */
            faxNumber: string;
            /** 国税编号 */
            taxId: string;
            /** 开户银行 */
            bank: string;
            /** 银行账户 */
            bankAccount: string;
            /** 发票地址 */
            invoiceAddress: string;
            /** 发票电话 */
            invoiceTelephone: string;
            /** 价格清单 */
            priceList: number;
            /** 仓库 */
            warehouse: string;
            /** 货币 */
            currency: string;
            /** 生效日期 */
            validDate: Date;
            /** 失效日期 */
            invalidDate: Date;
            /** 税收组 */
            taxGroup: string;
            /** 备注 */
            remarks: string;
            /** 已引用 */
            referenced: ibas.emYesNo;
            /** 已删除 */
            deleted: ibas.emYesNo;
            /** 对象编号 */
            docEntry: number;
            /** 对象类型 */
            objectCode: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
            /** 版本 */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 审批状态 */
            approvalStatus: ibas.emApprovalStatus;
            /** 数据所有者 */
            dataOwner: number;
            /** 数据所属组织 */
            organization: string;
            /** 所属渠道 */
            channel: string;
            /** 组织单位 */
            organizationalUnit: string;
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
declare namespace businesspartner {
    namespace bo {
        /** 资产项目 */
        interface IAssetItem extends ibas.IBOMasterData, ibas.IBOUserFields {
            /** 编号 */
            code: string;
            /** 名称 */
            name: string;
            /** 激活 */
            activated: ibas.emYesNo;
            /** 已引用 */
            referenced: ibas.emYesNo;
            /** 已删除 */
            deleted: ibas.emYesNo;
            /** 对象编号 */
            docEntry: number;
            /** 对象类型 */
            objectCode: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
            /** 版本 */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 审批状态 */
            approvalStatus: ibas.emApprovalStatus;
            /** 数据所有者 */
            dataOwner: number;
            /** 数据所属组织 */
            organization: string;
            /** 生效日期 */
            validDate: Date;
            /** 失效日期 */
            invalidDate: Date;
            /** 面值 */
            faceAmount: number;
            /** 单位 */
            amountUnit: string;
            /** 可用次数 */
            usingTimes: number;
            /** 使用时折扣 */
            usingDiscount: number;
            /** 透支额 */
            overdraft: number;
            /** 有效天数 */
            validDays: number;
            /** 可充值的 */
            rechargeable: ibas.emYesNo;
            /** 图片 */
            picture: string;
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
declare namespace businesspartner {
    namespace bo {
        /** 业务伙伴资产 */
        interface IBusinessPartnerAsset extends ibas.IBOMasterData, ibas.IBOUserFields {
            /** 编号 */
            code: string;
            /** 名称 */
            name: string;
            /** 对象编号 */
            docEntry: number;
            /** 对象类型 */
            objectCode: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
            /** 版本 */
            logInst: number;
            /** 服务系列 */
            series: number;
            /** 数据源 */
            dataSource: string;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 审批状态 */
            approvalStatus: ibas.emApprovalStatus;
            /** 数据所有者 */
            dataOwner: number;
            /** 数据所属组织 */
            organization: string;
            /** 已引用 */
            referenced: ibas.emYesNo;
            /** 已删除 */
            deleted: ibas.emYesNo;
            /** 业务伙伴类型 */
            businessPartnerType: emBusinessPartnerType;
            /** 业务伙伴编码 */
            businessPartnerCode: string;
            /** 资产项目 */
            assetCode: string;
            /** 激活 */
            activated: ibas.emYesNo;
            /** 获得日期 */
            acquiredDate: Date;
            /** 生效日期 */
            validDate: Date;
            /** 失效日期 */
            invalidDate: Date;
            /** 剩余价值 */
            amount: number;
            /** 剩余次数 */
            times: number;
            /** 基于类型 */
            baseDocumentType: string;
            /** 基于标识 */
            baseDocumentEntry: number;
            /** 基于行号 */
            baseDocumentLineId: number;
            /** 交易金额 */
            tradingAmount: number;
            /** 交易货币 */
            tradingCurrency: string;
            /** 备注 1 */
            remark1: string;
            /** 备注 2 */
            remark2: string;
        }
        /** 客户资产 */
        class ICustomerAsset {
            /** 资产编码 */
            code: string;
            /** 资产名称 */
            name: string;
            /** 图片 */
            picture: string;
            /** 生效日期 */
            validDate: Date;
            /** 失效日期 */
            invalidDate: Date;
            /** 可用值 */
            amount: number;
            /** 值单位 */
            unit: string;
            /** 可用次数 */
            times: number;
            /** 折扣 */
            discount: number;
            /** 客户 */
            customer: string;
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
declare namespace businesspartner {
    namespace bo {
        /** 业务伙伴资产日记账 */
        interface IBusinessPartnerAssetJournal extends ibas.IBOSimple {
            /** 对象编号 */
            objectKey: number;
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
            /** 业务伙伴资产码 */
            serviceCode: string;
            /** 方向 */
            direction: ibas.emDirection;
            /** 交易量 */
            amount: number;
            /** 交易次数 */
            times: number;
            /** 基于类型 */
            baseDocumentType: string;
            /** 基于标识 */
            baseDocumentEntry: number;
            /** 基于行号 */
            baseDocumentLineId: number;
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
declare namespace businesspartner {
    namespace bo {
        /** 业务仓库 */
        interface IBORepositoryBusinessPartner extends ibas.IBORepositoryApplication {
            /**
             * 上传文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void;
            /**
             * 下载文件
             * @param caller 调用者
             */
            download(caller: ibas.IDownloadFileCaller<Blob>): void;
            /**
             * 查询 业务伙伴地址
             * @param fetcher 查询者
             */
            fetchAddress(fetcher: ibas.IFetchCaller<bo.IAddress>): void;
            /**
             * 保存 业务伙伴地址
             * @param saver 保存者
             */
            saveAddress(saver: ibas.ISaveCaller<bo.IAddress>): void;
            /**
             * 查询 业务伙伴组
             * @param fetcher 查询者
             */
            fetchBusinessPartnerGroup(fetcher: ibas.IFetchCaller<bo.IBusinessPartnerGroup>): void;
            /**
             * 保存 业务伙伴组
             * @param saver 保存者
             */
            saveBusinessPartnerGroup(saver: ibas.ISaveCaller<bo.IBusinessPartnerGroup>): void;
            /**
             * 查询 业务伙伴联系人
             * @param fetcher 查询者
             */
            fetchContactPerson(fetcher: ibas.IFetchCaller<bo.IContactPerson>): void;
            /**
             * 保存 业务伙伴联系人
             * @param saver 保存者
             */
            saveContactPerson(saver: ibas.ISaveCaller<bo.IContactPerson>): void;
            /**
             * 查询 客户
             * @param fetcher 查询者
             */
            fetchCustomer(fetcher: ibas.IFetchCaller<bo.ICustomer>): void;
            /**
             * 保存 客户
             * @param saver 保存者
             */
            saveCustomer(saver: ibas.ISaveCaller<bo.ICustomer>): void;
            /**
             * 查询 供应商
             * @param fetcher 查询者
             */
            fetchSupplier(fetcher: ibas.IFetchCaller<bo.ISupplier>): void;
            /**
             * 保存 供应商
             * @param saver 保存者
             */
            saveSupplier(saver: ibas.ISaveCaller<bo.ISupplier>): void;
            /**
             * 查询 资产项目
             * @param fetcher 查询者
             */
            fetchAssetItem(fetcher: ibas.IFetchCaller<bo.IAssetItem>): void;
            /**
             * 保存 资产项目
             * @param saver 保存者
             */
            saveAssetItem(saver: ibas.ISaveCaller<bo.IAssetItem>): void;
            /**
             * 查询 业务伙伴资产
             * @param fetcher 查询者
             */
            fetchBusinessPartnerAsset(fetcher: ibas.IFetchCaller<bo.IBusinessPartnerAsset>): void;
            /**
             * 保存 业务伙伴资产
             * @param saver 保存者
             */
            saveBusinessPartnerAsset(saver: ibas.ISaveCaller<bo.IBusinessPartnerAsset>): void;
            /**
             * 查询 业务伙伴资产日记账
             * @param fetcher 查询者
             */
            fetchBusinessPartnerAssetJournal(fetcher: ibas.IFetchCaller<bo.IBusinessPartnerAssetJournal>): void;
            /**
             * 保存 业务伙伴资产日记账
             * @param saver 保存者
             */
            saveBusinessPartnerAssetJournal(saver: ibas.ISaveCaller<bo.IBusinessPartnerAssetJournal>): void;
            /**
             * 查询 客户资产
             * @param fetcher 查询者
             */
            fetchCustomerAsset(fetcher: IAssetRequester): void;
        }
        /**
         * 查询调用者
         */
        interface IAssetRequester extends ibas.IMethodCaller<bo.ICustomerAsset> {
            /** 请求 */
            request: IAssetRequest;
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
declare namespace businesspartner {
    namespace bo {
        /** 业务伙伴地址 */
        class Address extends ibas.BOSimple<Address> implements IAddress {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-业务伙伴 */
            static PROPERTY_BUSINESSPARTNER_NAME: string;
            /** 获取-业务伙伴 */
            /** 设置-业务伙伴 */
            businessPartner: string;
            /** 映射的属性名称-归属类型 */
            static PROPERTY_OWNERTYPE_NAME: string;
            /** 获取-归属类型 */
            /** 设置-归属类型 */
            ownerType: emBusinessPartnerType;
            /** 映射的属性名称-有效的 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-有效的 */
            /** 设置-有效的 */
            activated: ibas.emYesNo;
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-名称 */
            /** 设置-名称 */
            name: string;
            /** 映射的属性名称-街道 */
            static PROPERTY_STREET_NAME: string;
            /** 获取-街道 */
            /** 设置-街道 */
            street: string;
            /** 映射的属性名称-县/区 */
            static PROPERTY_DISTRICT_NAME: string;
            /** 获取-县/区 */
            /** 设置-县/区 */
            district: string;
            /** 映射的属性名称-市 */
            static PROPERTY_CITY_NAME: string;
            /** 获取-市 */
            /** 设置-市 */
            city: string;
            /** 映射的属性名称-省 */
            static PROPERTY_PROVINCE_NAME: string;
            /** 获取-省 */
            /** 设置-省 */
            province: string;
            /** 映射的属性名称-国 */
            static PROPERTY_COUNTRY_NAME: string;
            /** 获取-国 */
            /** 设置-国 */
            country: string;
            /** 映射的属性名称-邮编 */
            static PROPERTY_ZIPCODE_NAME: string;
            /** 获取-邮编 */
            /** 设置-邮编 */
            zipCode: string;
            /** 映射的属性名称-联系电话 */
            static PROPERTY_MOBILEPHONE_NAME: string;
            /** 获取-联系电话 */
            /** 设置-联系电话 */
            mobilePhone: string;
            /** 映射的属性名称-电话 1 */
            static PROPERTY_TELEPHONE1_NAME: string;
            /** 获取-电话 1 */
            /** 设置-电话 1 */
            telephone1: string;
            /** 映射的属性名称-电话 2 */
            static PROPERTY_TELEPHONE2_NAME: string;
            /** 获取-电话 2 */
            /** 设置-电话 2 */
            telephone2: string;
            /** 映射的属性名称-备注 1 */
            static PROPERTY_REMARK1_NAME: string;
            /** 获取-备注 1 */
            /** 设置-备注 1 */
            remark1: string;
            /** 映射的属性名称-备注 2 */
            static PROPERTY_REMARK2_NAME: string;
            /** 获取-备注 2 */
            /** 设置-备注 2 */
            remark2: string;
            /** 映射的属性名称-联系人 */
            static PROPERTY_CONTACTS_NAME: string;
            /** 获取-联系人 */
            /** 设置-联系人 */
            contacts: string;
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象编号 */
            /** 设置-对象编号 */
            objectKey: number;
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            /** 设置-对象类型 */
            objectCode: string;
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            /** 设置-创建日期 */
            createDate: Date;
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            /** 设置-创建时间 */
            createTime: number;
            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-修改日期 */
            /** 设置-修改日期 */
            updateDate: Date;
            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-修改时间 */
            /** 设置-修改时间 */
            updateTime: number;
            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号（版本） */
            /** 设置-实例号（版本） */
            logInst: number;
            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-服务系列 */
            /** 设置-服务系列 */
            series: number;
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            /** 设置-数据源 */
            dataSource: string;
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            /** 设置-创建用户 */
            createUserSign: number;
            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-修改用户 */
            /** 设置-修改用户 */
            updateUserSign: number;
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            /** 设置-创建动作标识 */
            createActionId: string;
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            /** 设置-更新动作标识 */
            updateActionId: string;
            /** 初始化数据 */
            protected init(): void;
            protected registerRules(): ibas.IBusinessRule[];
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
declare namespace businesspartner {
    namespace bo {
        /** 业务伙伴组 */
        class BusinessPartnerGroup extends ibas.BOMasterData<BusinessPartnerGroup> implements IBusinessPartnerGroup {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-编号 */
            static PROPERTY_CODE_NAME: string;
            /** 获取-编号 */
            /** 设置-编号 */
            code: string;
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-名称 */
            /** 设置-名称 */
            name: string;
            /** 映射的属性名称-激活 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活 */
            /** 设置-激活 */
            activated: ibas.emYesNo;
            /** 映射的属性名称-对象编号 */
            static PROPERTY_DOCENTRY_NAME: string;
            /** 获取-对象编号 */
            /** 设置-对象编号 */
            docEntry: number;
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            /** 设置-对象类型 */
            objectCode: string;
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            /** 设置-创建日期 */
            createDate: Date;
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            /** 设置-创建时间 */
            createTime: number;
            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-修改日期 */
            /** 设置-修改日期 */
            updateDate: Date;
            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-修改时间 */
            /** 设置-修改时间 */
            updateTime: number;
            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-版本 */
            /** 设置-版本 */
            logInst: number;
            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-服务系列 */
            /** 设置-服务系列 */
            series: number;
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            /** 设置-数据源 */
            dataSource: string;
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            /** 设置-创建用户 */
            createUserSign: number;
            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-修改用户 */
            /** 设置-修改用户 */
            updateUserSign: number;
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            /** 设置-创建动作标识 */
            createActionId: string;
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            /** 设置-更新动作标识 */
            updateActionId: string;
            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string;
            /** 获取-数据所有者 */
            /** 设置-数据所有者 */
            dataOwner: number;
            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string;
            /** 获取-数据所属组织 */
            /** 设置-数据所属组织 */
            organization: string;
            /** 初始化数据 */
            protected init(): void;
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
declare namespace businesspartner {
    namespace bo {
        /** 业务伙伴联系人 */
        class ContactPerson extends ibas.BOSimple<ContactPerson> implements IContactPerson {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-业务伙伴 */
            static PROPERTY_BUSINESSPARTNER_NAME: string;
            /** 获取-业务伙伴 */
            /** 设置-业务伙伴 */
            businessPartner: string;
            /** 映射的属性名称-归属类型 */
            static PROPERTY_OWNERTYPE_NAME: string;
            /** 获取-归属类型 */
            /** 设置-归属类型 */
            ownerType: emBusinessPartnerType;
            /** 映射的属性名称-有效的 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-有效的 */
            /** 设置-有效的 */
            activated: ibas.emYesNo;
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-名称 */
            /** 设置-名称 */
            name: string;
            /** 映射的属性名称-性别 */
            static PROPERTY_GENDER_NAME: string;
            /** 获取-性别 */
            /** 设置-性别 */
            gender: emGender;
            /** 映射的属性名称-职位 */
            static PROPERTY_POSITION_NAME: string;
            /** 获取-职位 */
            /** 设置-职位 */
            position: string;
            /** 映射的属性名称-地址 */
            static PROPERTY_ADDRESS_NAME: string;
            /** 获取-地址 */
            /** 设置-地址 */
            address: string;
            /** 映射的属性名称-电话 1 */
            static PROPERTY_TELEPHONE1_NAME: string;
            /** 获取-电话 1 */
            /** 设置-电话 1 */
            telephone1: string;
            /** 映射的属性名称-电话 2 */
            static PROPERTY_TELEPHONE2_NAME: string;
            /** 获取-电话 2 */
            /** 设置-电话 2 */
            telephone2: string;
            /** 映射的属性名称-移动电话 */
            static PROPERTY_MOBILEPHONE_NAME: string;
            /** 获取-移动电话 */
            /** 设置-移动电话 */
            mobilePhone: string;
            /** 映射的属性名称-传真 */
            static PROPERTY_FAX_NAME: string;
            /** 获取-传真 */
            /** 设置-传真 */
            fax: string;
            /** 映射的属性名称-电子邮件 */
            static PROPERTY_MAIL_NAME: string;
            /** 获取-电子邮件 */
            /** 设置-电子邮件 */
            mail: string;
            /** 映射的属性名称-备注 1 */
            static PROPERTY_REMARK1_NAME: string;
            /** 获取-备注 1 */
            /** 设置-备注 1 */
            remark1: string;
            /** 映射的属性名称-备注 2 */
            static PROPERTY_REMARK2_NAME: string;
            /** 获取-备注 2 */
            /** 设置-备注 2 */
            remark2: string;
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象编号 */
            /** 设置-对象编号 */
            objectKey: number;
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            /** 设置-对象类型 */
            objectCode: string;
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            /** 设置-创建日期 */
            createDate: Date;
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            /** 设置-创建时间 */
            createTime: number;
            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-修改日期 */
            /** 设置-修改日期 */
            updateDate: Date;
            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-修改时间 */
            /** 设置-修改时间 */
            updateTime: number;
            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号（版本） */
            /** 设置-实例号（版本） */
            logInst: number;
            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-服务系列 */
            /** 设置-服务系列 */
            series: number;
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            /** 设置-数据源 */
            dataSource: string;
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            /** 设置-创建用户 */
            createUserSign: number;
            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-修改用户 */
            /** 设置-修改用户 */
            updateUserSign: number;
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            /** 设置-创建动作标识 */
            createActionId: string;
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            /** 设置-更新动作标识 */
            updateActionId: string;
            /** 初始化数据 */
            protected init(): void;
            protected registerRules(): ibas.IBusinessRule[];
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
declare namespace businesspartner {
    namespace bo {
        /** 客户 */
        class Customer extends ibas.BOMasterData<Customer> implements ICustomer {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-编码 */
            static PROPERTY_CODE_NAME: string;
            /** 获取-编码 */
            /** 设置-编码 */
            code: string;
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-名称 */
            /** 设置-名称 */
            name: string;
            /** 映射的属性名称-标识 */
            static PROPERTY_SIGN_NAME: string;
            /** 获取-标识 */
            /** 设置-标识 */
            sign: string;
            /** 映射的属性名称-组代码 */
            static PROPERTY_GROUP_NAME: string;
            /** 获取-组代码 */
            /** 设置-组代码 */
            group: string;
            /** 映射的属性名称-激活 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活 */
            /** 设置-激活 */
            activated: ibas.emYesNo;
            /** 映射的属性名称-公司/个人 */
            static PROPERTY_COMPANYPRIVATE_NAME: string;
            /** 获取-公司/个人 */
            /** 设置-公司/个人 */
            companyPrivate: emBusinessPartnerNature;
            /** 映射的属性名称-联系人 */
            static PROPERTY_CONTACTPERSON_NAME: string;
            /** 获取-联系人 */
            /** 设置-联系人 */
            contactPerson: number;
            /** 映射的属性名称-账单地址 */
            static PROPERTY_BILLADDRESS_NAME: string;
            /** 获取-账单地址 */
            /** 设置-账单地址 */
            billAddress: number;
            /** 映射的属性名称-送货地址 */
            static PROPERTY_SHIPADDRESS_NAME: string;
            /** 获取-送货地址 */
            /** 设置-送货地址 */
            shipAddress: number;
            /** 映射的属性名称-注册地址 */
            static PROPERTY_REGISTRATIONADDRESS_NAME: string;
            /** 获取-注册地址 */
            /** 设置-注册地址 */
            registrationAddress: number;
            /** 映射的属性名称-电话 1 */
            static PROPERTY_TELEPHONE1_NAME: string;
            /** 获取-电话 1 */
            /** 设置-电话 1 */
            telephone1: string;
            /** 映射的属性名称-电话 2 */
            static PROPERTY_TELEPHONE2_NAME: string;
            /** 获取-电话 2 */
            /** 设置-电话 2 */
            telephone2: string;
            /** 映射的属性名称-移动电话 */
            static PROPERTY_MOBILEPHONE_NAME: string;
            /** 获取-移动电话 */
            /** 设置-移动电话 */
            mobilePhone: string;
            /** 映射的属性名称-传真号 */
            static PROPERTY_FAXNUMBER_NAME: string;
            /** 获取-传真号 */
            /** 设置-传真号 */
            faxNumber: string;
            /** 映射的属性名称-国税编号 */
            static PROPERTY_TAXID_NAME: string;
            /** 获取-国税编号 */
            /** 设置-国税编号 */
            taxId: string;
            /** 映射的属性名称-开户银行 */
            static PROPERTY_BANK_NAME: string;
            /** 获取-开户银行 */
            /** 设置-开户银行 */
            bank: string;
            /** 映射的属性名称-银行账户 */
            static PROPERTY_BANKACCOUNT_NAME: string;
            /** 获取-银行账户 */
            /** 设置-银行账户 */
            bankAccount: string;
            /** 映射的属性名称-发票地址 */
            static PROPERTY_INVOICEADDRESS_NAME: string;
            /** 获取-发票地址 */
            /** 设置-发票地址 */
            invoiceAddress: string;
            /** 映射的属性名称-发票电话 */
            static PROPERTY_INVOICETELEPHONE_NAME: string;
            /** 获取-发票电话 */
            /** 设置-发票电话 */
            invoiceTelephone: string;
            /** 映射的属性名称-价格清单 */
            static PROPERTY_PRICELIST_NAME: string;
            /** 获取-价格清单 */
            /** 设置-价格清单 */
            priceList: number;
            /** 映射的属性名称-货币 */
            static PROPERTY_CURRENCY_NAME: string;
            /** 获取-货币 */
            /** 设置-货币 */
            currency: string;
            /** 映射的属性名称-仓库 */
            static PROPERTY_WAREHOUSE_NAME: string;
            /** 获取-仓库 */
            /** 设置-仓库 */
            warehouse: string;
            /** 映射的属性名称-生效日期 */
            static PROPERTY_VALIDDATE_NAME: string;
            /** 获取-生效日期 */
            /** 设置-生效日期 */
            validDate: Date;
            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string;
            /** 获取-失效日期 */
            /** 设置-失效日期 */
            invalidDate: Date;
            /** 映射的属性名称-底价清单 */
            static PROPERTY_FLOORLIST_NAME: string;
            /** 获取-底价清单 */
            /** 设置-底价清单 */
            floorList: number;
            /** 映射的属性名称-税收组 */
            static PROPERTY_TAXGROUP_NAME: string;
            /** 获取-税收组 */
            /** 设置-税收组 */
            taxGroup: string;
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            /** 设置-备注 */
            remarks: string;
            /** 映射的属性名称-已引用 */
            static PROPERTY_REFERENCED_NAME: string;
            /** 获取-已引用 */
            /** 设置-已引用 */
            referenced: ibas.emYesNo;
            /** 映射的属性名称-已删除 */
            static PROPERTY_DELETED_NAME: string;
            /** 获取-已删除 */
            /** 设置-已删除 */
            deleted: ibas.emYesNo;
            /** 映射的属性名称-对象编号 */
            static PROPERTY_DOCENTRY_NAME: string;
            /** 获取-对象编号 */
            /** 设置-对象编号 */
            docEntry: number;
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            /** 设置-对象类型 */
            objectCode: string;
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            /** 设置-创建日期 */
            createDate: Date;
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            /** 设置-创建时间 */
            createTime: number;
            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-修改日期 */
            /** 设置-修改日期 */
            updateDate: Date;
            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-修改时间 */
            /** 设置-修改时间 */
            updateTime: number;
            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-版本 */
            /** 设置-版本 */
            logInst: number;
            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-服务系列 */
            /** 设置-服务系列 */
            series: number;
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            /** 设置-数据源 */
            dataSource: string;
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            /** 设置-创建用户 */
            createUserSign: number;
            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-修改用户 */
            /** 设置-修改用户 */
            updateUserSign: number;
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            /** 设置-创建动作标识 */
            createActionId: string;
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            /** 设置-更新动作标识 */
            updateActionId: string;
            /** 映射的属性名称-审批状态 */
            static PROPERTY_APPROVALSTATUS_NAME: string;
            /** 获取-审批状态 */
            /** 设置-审批状态 */
            approvalStatus: ibas.emApprovalStatus;
            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string;
            /** 获取-数据所有者 */
            /** 设置-数据所有者 */
            dataOwner: number;
            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string;
            /** 获取-数据所属组织 */
            /** 设置-数据所属组织 */
            organization: string;
            /** 映射的属性名称-所属渠道 */
            static PROPERTY_CHANNEL_NAME: string;
            /** 获取-所属渠道 */
            /** 设置-所属渠道 */
            channel: string;
            /** 映射的属性名称-组织单位 */
            static PROPERTY_ORGANIZATIONALUNIT_NAME: string;
            /** 获取-组织单位 */
            /** 设置-组织单位 */
            organizationalUnit: string;
            /** 初始化数据 */
            protected init(): void;
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
declare namespace businesspartner {
    namespace bo {
        /** 供应商 */
        class Supplier extends ibas.BOMasterData<Supplier> implements ISupplier {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-编码 */
            static PROPERTY_CODE_NAME: string;
            /** 获取-编码 */
            /** 设置-编码 */
            code: string;
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-名称 */
            /** 设置-名称 */
            name: string;
            /** 映射的属性名称-标识 */
            static PROPERTY_SIGN_NAME: string;
            /** 获取-标识 */
            /** 设置-标识 */
            sign: string;
            /** 映射的属性名称-组代码 */
            static PROPERTY_GROUP_NAME: string;
            /** 获取-组代码 */
            /** 设置-组代码 */
            group: string;
            /** 映射的属性名称-激活 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活 */
            /** 设置-激活 */
            activated: ibas.emYesNo;
            /** 映射的属性名称-公司/个人 */
            static PROPERTY_COMPANYPRIVATE_NAME: string;
            /** 获取-公司/个人 */
            /** 设置-公司/个人 */
            companyPrivate: emBusinessPartnerNature;
            /** 映射的属性名称-联系人 */
            static PROPERTY_CONTACTPERSON_NAME: string;
            /** 获取-联系人 */
            /** 设置-联系人 */
            contactPerson: number;
            /** 映射的属性名称-账单地址 */
            static PROPERTY_BILLADDRESS_NAME: string;
            /** 获取-账单地址 */
            /** 设置-账单地址 */
            billAddress: number;
            /** 映射的属性名称-送货地址 */
            static PROPERTY_SHIPADDRESS_NAME: string;
            /** 获取-送货地址 */
            /** 设置-送货地址 */
            shipAddress: number;
            /** 映射的属性名称-注册地址 */
            static PROPERTY_REGISTRATIONADDRESS_NAME: string;
            /** 获取-注册地址 */
            /** 设置-注册地址 */
            registrationAddress: number;
            /** 映射的属性名称-电话 1 */
            static PROPERTY_TELEPHONE1_NAME: string;
            /** 获取-电话 1 */
            /** 设置-电话 1 */
            telephone1: string;
            /** 映射的属性名称-电话 2 */
            static PROPERTY_TELEPHONE2_NAME: string;
            /** 获取-电话 2 */
            /** 设置-电话 2 */
            telephone2: string;
            /** 映射的属性名称-移动电话 */
            static PROPERTY_MOBILEPHONE_NAME: string;
            /** 获取-移动电话 */
            /** 设置-移动电话 */
            mobilePhone: string;
            /** 映射的属性名称-传真号 */
            static PROPERTY_FAXNUMBER_NAME: string;
            /** 获取-传真号 */
            /** 设置-传真号 */
            faxNumber: string;
            /** 映射的属性名称-国税编号 */
            static PROPERTY_TAXID_NAME: string;
            /** 获取-国税编号 */
            /** 设置-国税编号 */
            taxId: string;
            /** 映射的属性名称-开户银行 */
            static PROPERTY_BANK_NAME: string;
            /** 获取-开户银行 */
            /** 设置-开户银行 */
            bank: string;
            /** 映射的属性名称-银行账户 */
            static PROPERTY_BANKACCOUNT_NAME: string;
            /** 获取-银行账户 */
            /** 设置-银行账户 */
            bankAccount: string;
            /** 映射的属性名称-发票地址 */
            static PROPERTY_INVOICEADDRESS_NAME: string;
            /** 获取-发票地址 */
            /** 设置-发票地址 */
            invoiceAddress: string;
            /** 映射的属性名称-发票电话 */
            static PROPERTY_INVOICETELEPHONE_NAME: string;
            /** 获取-发票电话 */
            /** 设置-发票电话 */
            invoiceTelephone: string;
            /** 映射的属性名称-价格清单 */
            static PROPERTY_PRICELIST_NAME: string;
            /** 获取-价格清单 */
            /** 设置-价格清单 */
            priceList: number;
            /** 映射的属性名称-货币 */
            static PROPERTY_CURRENCY_NAME: string;
            /** 获取-货币 */
            /** 设置-货币 */
            currency: string;
            /** 映射的属性名称-仓库 */
            static PROPERTY_WAREHOUSE_NAME: string;
            /** 获取-仓库 */
            /** 设置-仓库 */
            warehouse: string;
            /** 映射的属性名称-生效日期 */
            static PROPERTY_VALIDDATE_NAME: string;
            /** 获取-生效日期 */
            /** 设置-生效日期 */
            validDate: Date;
            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string;
            /** 获取-失效日期 */
            /** 设置-失效日期 */
            invalidDate: Date;
            /** 映射的属性名称-税收组 */
            static PROPERTY_TAXGROUP_NAME: string;
            /** 获取-税收组 */
            /** 设置-税收组 */
            taxGroup: string;
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            /** 设置-备注 */
            remarks: string;
            /** 映射的属性名称-已引用 */
            static PROPERTY_REFERENCED_NAME: string;
            /** 获取-已引用 */
            /** 设置-已引用 */
            referenced: ibas.emYesNo;
            /** 映射的属性名称-已删除 */
            static PROPERTY_DELETED_NAME: string;
            /** 获取-已删除 */
            /** 设置-已删除 */
            deleted: ibas.emYesNo;
            /** 映射的属性名称-对象编号 */
            static PROPERTY_DOCENTRY_NAME: string;
            /** 获取-对象编号 */
            /** 设置-对象编号 */
            docEntry: number;
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            /** 设置-对象类型 */
            objectCode: string;
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            /** 设置-创建日期 */
            createDate: Date;
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            /** 设置-创建时间 */
            createTime: number;
            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-修改日期 */
            /** 设置-修改日期 */
            updateDate: Date;
            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-修改时间 */
            /** 设置-修改时间 */
            updateTime: number;
            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-版本 */
            /** 设置-版本 */
            logInst: number;
            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-服务系列 */
            /** 设置-服务系列 */
            series: number;
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            /** 设置-数据源 */
            dataSource: string;
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            /** 设置-创建用户 */
            createUserSign: number;
            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-修改用户 */
            /** 设置-修改用户 */
            updateUserSign: number;
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            /** 设置-创建动作标识 */
            createActionId: string;
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            /** 设置-更新动作标识 */
            updateActionId: string;
            /** 映射的属性名称-审批状态 */
            static PROPERTY_APPROVALSTATUS_NAME: string;
            /** 获取-审批状态 */
            /** 设置-审批状态 */
            approvalStatus: ibas.emApprovalStatus;
            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string;
            /** 获取-数据所有者 */
            /** 设置-数据所有者 */
            dataOwner: number;
            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string;
            /** 获取-数据所属组织 */
            /** 设置-数据所属组织 */
            organization: string;
            /** 映射的属性名称-所属渠道 */
            static PROPERTY_CHANNEL_NAME: string;
            /** 获取-所属渠道 */
            /** 设置-所属渠道 */
            channel: string;
            /** 映射的属性名称-组织单位 */
            static PROPERTY_ORGANIZATIONALUNIT_NAME: string;
            /** 获取-组织单位 */
            /** 设置-组织单位 */
            organizationalUnit: string;
            /** 初始化数据 */
            protected init(): void;
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
declare namespace businesspartner {
    namespace bo {
        /** 资产项目 */
        class AssetItem extends ibas.BOMasterData<AssetItem> implements IAssetItem {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-编号 */
            static PROPERTY_CODE_NAME: string;
            /** 获取-编号 */
            /** 设置-编号 */
            code: string;
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-名称 */
            /** 设置-名称 */
            name: string;
            /** 映射的属性名称-激活 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活 */
            /** 设置-激活 */
            activated: ibas.emYesNo;
            /** 映射的属性名称-已引用 */
            static PROPERTY_REFERENCED_NAME: string;
            /** 获取-已引用 */
            /** 设置-已引用 */
            referenced: ibas.emYesNo;
            /** 映射的属性名称-已删除 */
            static PROPERTY_DELETED_NAME: string;
            /** 获取-已删除 */
            /** 设置-已删除 */
            deleted: ibas.emYesNo;
            /** 映射的属性名称-对象编号 */
            static PROPERTY_DOCENTRY_NAME: string;
            /** 获取-对象编号 */
            /** 设置-对象编号 */
            docEntry: number;
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            /** 设置-对象类型 */
            objectCode: string;
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            /** 设置-创建日期 */
            createDate: Date;
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            /** 设置-创建时间 */
            createTime: number;
            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-修改日期 */
            /** 设置-修改日期 */
            updateDate: Date;
            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-修改时间 */
            /** 设置-修改时间 */
            updateTime: number;
            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-版本 */
            /** 设置-版本 */
            logInst: number;
            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-服务系列 */
            /** 设置-服务系列 */
            series: number;
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            /** 设置-数据源 */
            dataSource: string;
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            /** 设置-创建用户 */
            createUserSign: number;
            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-修改用户 */
            /** 设置-修改用户 */
            updateUserSign: number;
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            /** 设置-创建动作标识 */
            createActionId: string;
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            /** 设置-更新动作标识 */
            updateActionId: string;
            /** 映射的属性名称-审批状态 */
            static PROPERTY_APPROVALSTATUS_NAME: string;
            /** 获取-审批状态 */
            /** 设置-审批状态 */
            approvalStatus: ibas.emApprovalStatus;
            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string;
            /** 获取-数据所有者 */
            /** 设置-数据所有者 */
            dataOwner: number;
            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string;
            /** 获取-数据所属组织 */
            /** 设置-数据所属组织 */
            organization: string;
            /** 映射的属性名称-生效日期 */
            static PROPERTY_VALIDDATE_NAME: string;
            /** 获取-生效日期 */
            /** 设置-生效日期 */
            validDate: Date;
            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string;
            /** 获取-失效日期 */
            /** 设置-失效日期 */
            invalidDate: Date;
            /** 映射的属性名称-面值 */
            static PROPERTY_FACEAMOUNT_NAME: string;
            /** 获取-面值 */
            /** 设置-面值 */
            faceAmount: number;
            /** 映射的属性名称-单位 */
            static PROPERTY_AMOUNTUNIT_NAME: string;
            /** 获取-单位 */
            /** 设置-单位 */
            amountUnit: string;
            /** 映射的属性名称-可用次数 */
            static PROPERTY_USINGTIMES_NAME: string;
            /** 获取-可用次数 */
            /** 设置-可用次数 */
            usingTimes: number;
            /** 映射的属性名称-使用时折扣 */
            static PROPERTY_USINGDISCOUNT_NAME: string;
            /** 获取-使用时折扣 */
            /** 设置-使用时折扣 */
            usingDiscount: number;
            /** 映射的属性名称-透支额 */
            static PROPERTY_OVERDRAFT_NAME: string;
            /** 获取-透支额 */
            /** 设置-透支额 */
            overdraft: number;
            /** 映射的属性名称-有效天数 */
            static PROPERTY_VALIDDAYS_NAME: string;
            /** 获取-有效天数 */
            /** 设置-有效天数 */
            validDays: number;
            /** 映射的属性名称-可充值的 */
            static PROPERTY_RECHARGEABLE_NAME: string;
            /** 获取-可充值的 */
            /** 设置-可充值的 */
            rechargeable: ibas.emYesNo;
            /** 映射的属性名称-图片 */
            static PROPERTY_PICTURE_NAME: string;
            /** 获取-图片 */
            /** 设置-图片 */
            picture: string;
            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string;
            /** 获取-备注 */
            /** 设置-备注 */
            remarks: string;
            /** 初始化数据 */
            protected init(): void;
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
declare namespace businesspartner {
    namespace bo {
        /** 业务伙伴资产 */
        class BusinessPartnerAsset extends ibas.BOMasterData<BusinessPartnerAsset> implements IBusinessPartnerAsset {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-编号 */
            static PROPERTY_CODE_NAME: string;
            /** 获取-编号 */
            /** 设置-编号 */
            code: string;
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string;
            /** 获取-名称 */
            /** 设置-名称 */
            name: string;
            /** 映射的属性名称-对象编号 */
            static PROPERTY_DOCENTRY_NAME: string;
            /** 获取-对象编号 */
            /** 设置-对象编号 */
            docEntry: number;
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            /** 设置-对象类型 */
            objectCode: string;
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            /** 设置-创建日期 */
            createDate: Date;
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            /** 设置-创建时间 */
            createTime: number;
            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-修改日期 */
            /** 设置-修改日期 */
            updateDate: Date;
            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-修改时间 */
            /** 设置-修改时间 */
            updateTime: number;
            /** 映射的属性名称-版本 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-版本 */
            /** 设置-版本 */
            logInst: number;
            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string;
            /** 获取-服务系列 */
            /** 设置-服务系列 */
            series: number;
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            /** 设置-数据源 */
            dataSource: string;
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            /** 设置-创建用户 */
            createUserSign: number;
            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-修改用户 */
            /** 设置-修改用户 */
            updateUserSign: number;
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            /** 设置-创建动作标识 */
            createActionId: string;
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            /** 设置-更新动作标识 */
            updateActionId: string;
            /** 映射的属性名称-审批状态 */
            static PROPERTY_APPROVALSTATUS_NAME: string;
            /** 获取-审批状态 */
            /** 设置-审批状态 */
            approvalStatus: ibas.emApprovalStatus;
            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string;
            /** 获取-数据所有者 */
            /** 设置-数据所有者 */
            dataOwner: number;
            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string;
            /** 获取-数据所属组织 */
            /** 设置-数据所属组织 */
            organization: string;
            /** 映射的属性名称-已引用 */
            static PROPERTY_REFERENCED_NAME: string;
            /** 获取-已引用 */
            /** 设置-已引用 */
            referenced: ibas.emYesNo;
            /** 映射的属性名称-已删除 */
            static PROPERTY_DELETED_NAME: string;
            /** 获取-已删除 */
            /** 设置-已删除 */
            deleted: ibas.emYesNo;
            /** 映射的属性名称-业务伙伴类型 */
            static PROPERTY_BUSINESSPARTNERTYPE_NAME: string;
            /** 获取-业务伙伴类型 */
            /** 设置-业务伙伴类型 */
            businessPartnerType: emBusinessPartnerType;
            /** 映射的属性名称-业务伙伴编码 */
            static PROPERTY_BUSINESSPARTNERCODE_NAME: string;
            /** 获取-业务伙伴编码 */
            /** 设置-业务伙伴编码 */
            businessPartnerCode: string;
            /** 映射的属性名称-资产项目 */
            static PROPERTY_ASSETCODE_NAME: string;
            /** 获取-资产项目 */
            /** 设置-资产项目 */
            assetCode: string;
            /** 映射的属性名称-激活 */
            static PROPERTY_ACTIVATED_NAME: string;
            /** 获取-激活 */
            /** 设置-激活 */
            activated: ibas.emYesNo;
            /** 映射的属性名称-获得日期 */
            static PROPERTY_ACQUIREDDATE_NAME: string;
            /** 获取-获得日期 */
            /** 设置-获得日期 */
            acquiredDate: Date;
            /** 映射的属性名称-生效日期 */
            static PROPERTY_VALIDDATE_NAME: string;
            /** 获取-生效日期 */
            /** 设置-生效日期 */
            validDate: Date;
            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string;
            /** 获取-失效日期 */
            /** 设置-失效日期 */
            invalidDate: Date;
            /** 映射的属性名称-剩余价值 */
            static PROPERTY_AMOUNT_NAME: string;
            /** 获取-剩余价值 */
            /** 设置-剩余价值 */
            amount: number;
            /** 映射的属性名称-剩余次数 */
            static PROPERTY_TIMES_NAME: string;
            /** 获取-剩余次数 */
            /** 设置-剩余次数 */
            times: number;
            /** 映射的属性名称-基于类型 */
            static PROPERTY_BASEDOCUMENTTYPE_NAME: string;
            /** 获取-基于类型 */
            /** 设置-基于类型 */
            baseDocumentType: string;
            /** 映射的属性名称-基于标识 */
            static PROPERTY_BASEDOCUMENTENTRY_NAME: string;
            /** 获取-基于标识 */
            /** 设置-基于标识 */
            baseDocumentEntry: number;
            /** 映射的属性名称-基于行号 */
            static PROPERTY_BASEDOCUMENTLINEID_NAME: string;
            /** 获取-基于行号 */
            /** 设置-基于行号 */
            baseDocumentLineId: number;
            /** 映射的属性名称-交易金额 */
            static PROPERTY_TRADINGAMOUNT_NAME: string;
            /** 获取-交易金额 */
            /** 设置-交易金额 */
            tradingAmount: number;
            /** 映射的属性名称-交易货币 */
            static PROPERTY_TRADINGCURRENCY_NAME: string;
            /** 获取-交易货币 */
            /** 设置-交易货币 */
            tradingCurrency: string;
            /** 映射的属性名称-备注 1 */
            static PROPERTY_REMARK1_NAME: string;
            /** 获取-备注 1 */
            /** 设置-备注 1 */
            remark1: string;
            /** 映射的属性名称-备注 2 */
            static PROPERTY_REMARK2_NAME: string;
            /** 获取-备注 2 */
            /** 设置-备注 2 */
            remark2: string;
            /** 初始化数据 */
            protected init(): void;
            /** 重置 */
            reset(): void;
            protected registerRules(): ibas.IBusinessRule[];
        }
        /** 客户资产 */
        class CustomerAsset {
            /** 资产编码 */
            code: string;
            /** 资产名称 */
            name: string;
            /** 图片 */
            picture: string;
            /** 生效日期 */
            validDate: Date;
            /** 失效日期 */
            invalidDate: Date;
            /** 可用值 */
            amount: number;
            /** 值单位 */
            unit: string;
            /** 可用次数 */
            times: number;
            /** 折扣 */
            discount: number;
            /** 客户 */
            customer: string;
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
declare namespace businesspartner {
    namespace bo {
        /** 业务伙伴资产日记账 */
        class BusinessPartnerAssetJournal extends ibas.BOSimple<BusinessPartnerAssetJournal> implements IBusinessPartnerAssetJournal {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string;
            /** 构造函数 */
            constructor();
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string;
            /** 获取-对象编号 */
            /** 设置-对象编号 */
            objectKey: number;
            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string;
            /** 获取-对象类型 */
            /** 设置-对象类型 */
            objectCode: string;
            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string;
            /** 获取-实例号 */
            /** 设置-实例号 */
            logInst: number;
            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string;
            /** 获取-数据源 */
            /** 设置-数据源 */
            dataSource: string;
            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string;
            /** 获取-创建日期 */
            /** 设置-创建日期 */
            createDate: Date;
            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string;
            /** 获取-创建时间 */
            /** 设置-创建时间 */
            createTime: number;
            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string;
            /** 获取-更新日期 */
            /** 设置-更新日期 */
            updateDate: Date;
            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string;
            /** 获取-更新时间 */
            /** 设置-更新时间 */
            updateTime: number;
            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string;
            /** 获取-创建用户 */
            /** 设置-创建用户 */
            createUserSign: number;
            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string;
            /** 获取-更新用户 */
            /** 设置-更新用户 */
            updateUserSign: number;
            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string;
            /** 获取-创建动作标识 */
            /** 设置-创建动作标识 */
            createActionId: string;
            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string;
            /** 获取-更新动作标识 */
            /** 设置-更新动作标识 */
            updateActionId: string;
            /** 映射的属性名称-业务伙伴资产码 */
            static PROPERTY_SERVICECODE_NAME: string;
            /** 获取-业务伙伴资产码 */
            /** 设置-业务伙伴资产码 */
            serviceCode: string;
            /** 映射的属性名称-方向 */
            static PROPERTY_DIRECTION_NAME: string;
            /** 获取-方向 */
            /** 设置-方向 */
            direction: ibas.emDirection;
            /** 映射的属性名称-交易量 */
            static PROPERTY_AMOUNT_NAME: string;
            /** 获取-交易量 */
            /** 设置-交易量 */
            amount: number;
            /** 映射的属性名称-交易次数 */
            static PROPERTY_TIMES_NAME: string;
            /** 获取-交易次数 */
            /** 设置-交易次数 */
            times: number;
            /** 映射的属性名称-基于类型 */
            static PROPERTY_BASEDOCUMENTTYPE_NAME: string;
            /** 获取-基于类型 */
            /** 设置-基于类型 */
            baseDocumentType: string;
            /** 映射的属性名称-基于标识 */
            static PROPERTY_BASEDOCUMENTENTRY_NAME: string;
            /** 获取-基于标识 */
            /** 设置-基于标识 */
            baseDocumentEntry: number;
            /** 映射的属性名称-基于行号 */
            static PROPERTY_BASEDOCUMENTLINEID_NAME: string;
            /** 获取-基于行号 */
            /** 设置-基于行号 */
            baseDocumentLineId: number;
            /** 初始化数据 */
            protected init(): void;
            /** 属性改变时 */
            protected onPropertyChanged(name: string): void;
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
declare namespace businesspartner {
    namespace bo {
        namespace ibas4j {
            /** ibas的java端数据声明 */
            /** 操作消息 */
            interface IDataDeclaration {
                /** 数据类型 */
                type: string;
            }
            /** 资产请求 */
            interface IAssetRequest extends IDataDeclaration {
                /** 业务伙伴 */
                BusinessPartner: string;
                /** 单据类型 */
                DocumentType: string;
                /** 单据编号 */
                DocumentEntry: number;
                /** 单据行号 */
                DocumentLineId: number;
                /** 总计 */
                Total: number;
                /** 货币 */
                Currency: string;
            }
            /** 客户资产 */
            interface ICustomerAsset extends IDataDeclaration {
                /** 资产编码 */
                Code: string;
                /** 资产名称 */
                Name: string;
                /** 图片 */
                Picture: string;
                /** 生效日期 */
                ValidDate: string;
                /** 失效日期 */
                InvalidDate: string;
                /** 可用值 */
                Amount: number;
                /** 值单位 */
                Unit: string;
                /** 可用次数 */
                Times: number;
                /** 折扣 */
                Discount: number;
                /** 客户 */
                Customer: string;
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
declare namespace businesspartner {
    namespace bo {
        /** 数据转换者 */
        class DataConverter extends ibas.DataConverter4j {
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
            /** 创建业务对象转换者 */
            protected createConverter(): ibas.BOConverter;
        }
        /** 模块业务对象工厂 */
        const boFactory: ibas.BOFactory;
        /** 业务规则-清理属性值 */
        class BusinessRuleClearValue extends ibas.BusinessRuleCommon {
            /**
             * 构造
             * @param sProperty 触发属性
             * @param tProperty 目标属性
             */
            constructor(sProperty: string, tProperty: string);
            sourceProperty: string;
            targetProperty: string;
            /** 计算规则 */
            protected compute(context: ibas.BusinessRuleContextCommon): void;
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
declare namespace businesspartner {
    namespace bo {
        /** 业务对象仓库 */
        class BORepositoryBusinessPartner extends ibas.BORepositoryApplication implements IBORepositoryBusinessPartner {
            /** 创建此模块的后端与前端数据的转换者 */
            protected createConverter(): ibas.IDataConverter;
            /**
             * 上传文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void;
            /**
             * 下载文件
             * @param caller 调用者
             */
            download(caller: ibas.IDownloadFileCaller<Blob>): void;
            /**
             * 查询 业务伙伴地址
             * @param fetcher 查询者
             */
            fetchAddress(fetcher: ibas.IFetchCaller<bo.Address>): void;
            /**
             * 保存 业务伙伴地址
             * @param saver 保存者
             */
            saveAddress(saver: ibas.ISaveCaller<bo.Address>): void;
            /**
             * 查询 业务伙伴组
             * @param fetcher 查询者
             */
            fetchBusinessPartnerGroup(fetcher: ibas.IFetchCaller<bo.BusinessPartnerGroup>): void;
            /**
             * 保存 业务伙伴组
             * @param saver 保存者
             */
            saveBusinessPartnerGroup(saver: ibas.ISaveCaller<bo.BusinessPartnerGroup>): void;
            /**
             * 查询 业务伙伴联系人
             * @param fetcher 查询者
             */
            fetchContactPerson(fetcher: ibas.IFetchCaller<bo.ContactPerson>): void;
            /**
             * 保存 业务伙伴联系人
             * @param saver 保存者
             */
            saveContactPerson(saver: ibas.ISaveCaller<bo.ContactPerson>): void;
            /**
             * 查询 客户
             * @param fetcher 查询者
             */
            fetchCustomer(fetcher: ibas.IFetchCaller<bo.Customer>): void;
            /**
             * 保存 客户
             * @param saver 保存者
             */
            saveCustomer(saver: ibas.ISaveCaller<bo.Customer>): void;
            /**
             * 查询 供应商
             * @param fetcher 查询者
             */
            fetchSupplier(fetcher: ibas.IFetchCaller<bo.Supplier>): void;
            /**
             * 保存 供应商
             * @param saver 保存者
             */
            saveSupplier(saver: ibas.ISaveCaller<bo.Supplier>): void;
            /**
             * 查询 资产项目
             * @param fetcher 查询者
             */
            fetchAssetItem(fetcher: ibas.IFetchCaller<bo.AssetItem>): void;
            /**
             * 保存 资产项目
             * @param saver 保存者
             */
            saveAssetItem(saver: ibas.ISaveCaller<bo.AssetItem>): void;
            /**
             * 查询 业务伙伴资产
             * @param fetcher 查询者
             */
            fetchBusinessPartnerAsset(fetcher: ibas.IFetchCaller<bo.BusinessPartnerAsset>): void;
            /**
             * 保存 业务伙伴资产
             * @param saver 保存者
             */
            saveBusinessPartnerAsset(saver: ibas.ISaveCaller<bo.BusinessPartnerAsset>): void;
            /**
             * 查询 业务伙伴资产日记账
             * @param fetcher 查询者
             */
            fetchBusinessPartnerAssetJournal(fetcher: ibas.IFetchCaller<bo.BusinessPartnerAssetJournal>): void;
            /**
             * 保存 业务伙伴资产日记账
             * @param saver 保存者
             */
            saveBusinessPartnerAssetJournal(saver: ibas.ISaveCaller<bo.BusinessPartnerAssetJournal>): void;
            /**
             * 查询 业务伙伴资产
             * @param fetcher 查询者
             */
            fetchCustomerAsset(fetcher: IAssetRequester): void;
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
declare namespace businesspartner {
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
declare namespace businesspartner {
    namespace app {
        /** 选择应用-业务伙伴地址 */
        class AddressChooseApp extends ibas.BOChooseService<IAddressChooseView, bo.Address> {
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
        /** 视图-业务伙伴地址 */
        interface IAddressChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Address[]): void;
        }
        /** 业务伙伴地址选择服务映射 */
        class AddressChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.Address>;
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
declare namespace businesspartner {
    namespace app {
        /** 编辑应用-业务伙伴地址 */
        class AddressEditApp extends ibas.BOEditApplication<IAddressEditView, bo.Address> {
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
            run(): void;
            run(data: bo.Address): void;
            /** 待编辑的数据 */
            protected editData: bo.Address;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            private chooseBusinessPartner;
        }
        /** 视图-业务伙伴地址 */
        interface IAddressEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showAddress(data: bo.Address): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /*** 选择业务伙伴事件 */
            chooseBusinessPartnerEvent: Function;
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
declare namespace businesspartner {
    namespace app {
        class AddressFunc extends ibas.ModuleFunction {
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
declare namespace businesspartner {
    namespace app {
        /** 列表应用-业务伙伴地址 */
        class AddressListApp extends ibas.BOListApplication<IAddressListView, bo.Address> {
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
            protected viewData(data: bo.Address): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.Address): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.Address | bo.Address[]): void;
        }
        /** 视图-业务伙伴地址 */
        interface IAddressListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.Address[]): void;
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
declare namespace businesspartner {
    namespace app {
        /** 选择应用-业务伙伴组 */
        class BusinessPartnerGroupChooseApp extends ibas.BOChooseService<IBusinessPartnerGroupChooseView, bo.BusinessPartnerGroup> {
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
        /** 视图-业务伙伴组 */
        interface IBusinessPartnerGroupChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.BusinessPartnerGroup[]): void;
        }
        /** 业务伙伴组选择服务映射 */
        class BusinessPartnerGroupChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.BusinessPartnerGroup>>;
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
declare namespace businesspartner {
    namespace app {
        /** 编辑应用-业务伙伴组 */
        class BusinessPartnerGroupEditApp extends ibas.BOEditApplication<IBusinessPartnerGroupEditView, bo.BusinessPartnerGroup> {
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
            run(data: bo.BusinessPartnerGroup): void;
            /** 待编辑的数据 */
            protected editData: bo.BusinessPartnerGroup;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
        }
        /** 视图-业务伙伴组 */
        interface IBusinessPartnerGroupEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showBusinessPartnerGroup(data: bo.BusinessPartnerGroup): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
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
declare namespace businesspartner {
    namespace app {
        class BusinessPartnerGroupFunc extends ibas.ModuleFunction {
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
declare namespace businesspartner {
    namespace app {
        /** 列表应用-业务伙伴组 */
        class BusinessPartnerGroupListApp extends ibas.BOListApplication<IBusinessPartnerGroupListView, bo.BusinessPartnerGroup> {
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
            protected viewData(data: bo.BusinessPartnerGroup): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.BusinessPartnerGroup): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.BusinessPartnerGroup | bo.BusinessPartnerGroup[]): void;
        }
        /** 视图-业务伙伴组 */
        interface IBusinessPartnerGroupListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.BusinessPartnerGroup[]): void;
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
declare namespace businesspartner {
    namespace app {
        /** 选择应用-业务伙伴联系人 */
        class ContactPersonChooseApp extends ibas.BOChooseService<IContactPersonChooseView, bo.ContactPerson> {
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
        /** 视图-业务伙伴联系人 */
        interface IContactPersonChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.ContactPerson[]): void;
        }
        /** 业务伙伴联系人选择服务映射 */
        class ContactPersonChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.ContactPerson>>;
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
declare namespace businesspartner {
    namespace app {
        /** 编辑应用-业务伙伴联系人 */
        class ContactPersonEditApp extends ibas.BOEditApplication<IContactPersonEditView, bo.ContactPerson> {
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
            run(data: bo.ContactPerson): void;
            /** 待编辑的数据 */
            protected editData: bo.ContactPerson;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            private chooseBusinessPartner;
        }
        /** 视图-业务伙伴联系人 */
        interface IContactPersonEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showContactPerson(data: bo.ContactPerson): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /*** 选择业务伙伴事件 */
            chooseBusinessPartnerEvent: Function;
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
declare namespace businesspartner {
    namespace app {
        class ContactPersonFunc extends ibas.ModuleFunction {
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
declare namespace businesspartner {
    namespace app {
        /** 列表应用-业务伙伴联系人 */
        class ContactPersonListApp extends ibas.BOListApplication<IContactPersonListView, bo.ContactPerson> {
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
            protected viewData(data: bo.ContactPerson): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.ContactPerson): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.ContactPerson | bo.ContactPerson[]): void;
        }
        /** 视图-业务伙伴联系人 */
        interface IContactPersonListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.ContactPerson[]): void;
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
declare namespace businesspartner {
    namespace app {
        /** 选择应用-客户 */
        class CustomerChooseApp extends ibas.BOChooseService<ICustomerChooseView, bo.Customer> {
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
        /** 视图-客户 */
        interface ICustomerChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Customer[]): void;
            /** 选择事件 */
            chooseDataEvent: Function;
        }
        /** 客户选择服务映射 */
        class CustomerChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.Customer>>;
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
declare namespace businesspartner {
    namespace app {
        /** 编辑应用-客户 */
        class CustomerEditApp extends ibas.BOEditApplication<ICustomerEditView, bo.Customer> {
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
            run(data: bo.Customer): void;
            /** 待编辑的数据 */
            protected editData: bo.Customer;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            private chooseCustomerGroup;
            private chooseCustomerContactPerson;
            private chooseCustomerShipAddress;
            private chooseCustomerBillAddress;
            private chooseCustomerRegistrationAddress;
            private chooseCustomerPriceList;
            private chooseCustomerFloorList;
            private chooseCustomerWarehouse;
            private createContactPerson;
            private createAddress;
        }
        /** 视图-客户 */
        interface ICustomerEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showCustomer(data: bo.Customer): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择客户组事件 */
            chooseCustomerGroupEvent: Function;
            /** 选择客户联系人事件 */
            chooseCustomerContactPersonEvent: Function;
            /** 选择客户送货地址事件 */
            chooseCustomerShipAddressEvent: Function;
            /** 选择客户账单地址事件 */
            chooseCustomerBillAddressEvent: Function;
            /** 选择客户注册地址事件 */
            chooseCustomerRegistrationAddress: Function;
            /** 选择客户价格清单事件 */
            chooseCustomerPriceListEvent: Function;
            /** 选择客户底价清单事件 */
            chooseCustomerFloorListEvent: Function;
            /** 选择客户仓库事件 */
            chooseCustomerWarehouseEvent: Function;
            /** 创建联系人 */
            createContactPersonEvent: Function;
            /** 创建地址 */
            createAddressEvent: Function;
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
declare namespace businesspartner {
    namespace app {
        class CustomerFunc extends ibas.ModuleFunction {
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
declare namespace businesspartner {
    namespace app {
        /** 列表应用-客户 */
        class CustomerListApp extends ibas.BOListApplication<ICustomerListView, bo.Customer> {
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
            protected viewData(data: bo.Customer): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.Customer): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.Customer | bo.Customer[]): void;
            private customerGroup;
        }
        /** 视图-客户 */
        interface ICustomerListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 业务伙伴组事件 */
            customerGroupEvent: Function;
            /** 显示数据 */
            showData(datas: bo.Customer[]): void;
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
declare namespace businesspartner {
    namespace app {
        /** 查看应用-客户 */
        class CustomerViewApp extends ibas.BOViewService<ICustomerViewView, bo.Customer> {
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
            /** 编辑数据，参数：目标数据 */
            protected editData(): void;
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.Customer): void;
            protected viewData: bo.Customer;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria | string): void;
        }
        /** 视图-客户 */
        interface ICustomerViewView extends ibas.IBOViewView {
            showCustomer(viewData: bo.Customer): void;
        }
        /** 客户连接服务映射 */
        class CustomerLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOLinkServiceCaller>;
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
declare namespace businesspartner {
    namespace app {
        /** 选择应用-供应商 */
        class SupplierChooseApp extends ibas.BOChooseService<ISupplierChooseView, bo.Supplier> {
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
        /** 视图-供应商 */
        interface ISupplierChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.Supplier[]): void;
        }
        /** 供应商选择服务映射 */
        class SupplierChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.Supplier>>;
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
declare namespace businesspartner {
    namespace app {
        /** 编辑应用-供应商 */
        class SupplierEditApp extends ibas.BOEditApplication<ISupplierEditView, bo.Supplier> {
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
            run(data: bo.Supplier): void;
            /** 待编辑的数据 */
            protected editData: bo.Supplier;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            private chooseSupplierGroup;
            private chooseSupplierContactPerson;
            private chooseSupplierShipAddress;
            private chooseSupplierBillAddress;
            private chooseSupplierRegistrationAddress;
            private chooseSupplierPriceList;
            private chooseSupplierWarehouse;
            private createContactPerson;
            private createAddress;
        }
        /** 视图-供应商 */
        interface ISupplierEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showSupplier(data: bo.Supplier): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择供应商组事件 */
            chooseSupplierGroupEvent: Function;
            /** 选择供应商联系人事件 */
            chooseSupplierContactPersonEvent: Function;
            /** 选择供应商送货地址事件 */
            chooseSupplierShipAddressEvent: Function;
            /** 选择供应商账单地址事件 */
            chooseSupplierBillAddressEvent: Function;
            /** 选择客供应商注册地址事件 */
            chooseSupplierRegistrationAddress: Function;
            /** 选择供应商价格清单事件 */
            chooseSupplierPriceListEvent: Function;
            /** 选择供应商仓库事件 */
            chooseSupplierWarehouseEvent: Function;
            /** 创建联系人 */
            createContactPersonEvent: Function;
            /** 创建地址 */
            createAddressEvent: Function;
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
declare namespace businesspartner {
    namespace app {
        class SupplierFunc extends ibas.ModuleFunction {
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
declare namespace businesspartner {
    namespace app {
        /** 列表应用-供应商 */
        class SupplierListApp extends ibas.BOListApplication<ISupplierListView, bo.Supplier> {
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
            protected viewData(data: bo.Supplier): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.Supplier): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.Supplier | bo.Supplier[]): void;
            private supplierGroup;
        }
        /** 视图-供应商 */
        interface ISupplierListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 业务伙伴组事件 */
            supplierGroupEvent: Function;
            /** 显示数据 */
            showData(datas: bo.Supplier[]): void;
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
declare namespace businesspartner {
    namespace app {
        /** 查看应用-供应商 */
        class SupplierViewApp extends ibas.BOViewService<ISupplierViewView, bo.Supplier> {
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
            /** 编辑数据，参数：目标数据 */
            protected editData(): void;
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.Supplier): void;
            protected viewData: bo.Supplier;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria | string): void;
        }
        /** 视图-供应商 */
        interface ISupplierViewView extends ibas.IBOViewView {
            showSupplier(viewData: bo.Supplier): void;
        }
        /** 供应商连接服务映射 */
        class SupplierLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOLinkServiceCaller>;
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
declare namespace businesspartner {
    namespace app {
        class AssetItemFunc extends ibas.ModuleFunction {
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
declare namespace businesspartner {
    namespace app {
        /** 列表应用-资产项目 */
        class AssetItemListApp extends ibas.BOListApplication<IAssetItemListView, bo.AssetItem> {
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
            protected viewData(data: bo.AssetItem): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.AssetItem): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.AssetItem | bo.AssetItem[]): void;
        }
        /** 视图-资产项目 */
        interface IAssetItemListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.AssetItem[]): void;
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
declare namespace businesspartner {
    namespace app {
        /** 选择应用-资产项目 */
        class AssetItemChooseApp extends ibas.BOChooseService<IAssetItemChooseView, bo.AssetItem> {
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
        /** 视图-资产项目 */
        interface IAssetItemChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.AssetItem[]): void;
        }
        /** 资产项目选择服务映射 */
        class AssetItemChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.AssetItem>;
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
declare namespace businesspartner {
    namespace app {
        /** 查看应用-资产项目 */
        class AssetItemViewApp extends ibas.BOViewService<IAssetItemViewView, bo.AssetItem> {
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
            /** 编辑数据，参数：目标数据 */
            protected editData(): void;
            run(): void;
            run(data: bo.AssetItem): void;
            protected viewData: bo.AssetItem;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria | string): void;
        }
        /** 视图-资产项目 */
        interface IAssetItemViewView extends ibas.IBOViewView {
        }
        /** 资产项目连接服务映射 */
        class AssetItemLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IBOLinkService;
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
declare namespace businesspartner {
    namespace app {
        /** 编辑应用-资产项目 */
        class AssetItemEditApp extends ibas.BOEditApplication<IAssetItemEditView, bo.AssetItem> {
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
            run(): void;
            run(data: bo.AssetItem): void;
            /** 待编辑的数据 */
            protected editData: bo.AssetItem;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
        }
        /** 视图-资产项目 */
        interface IAssetItemEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showAssetItem(data: bo.AssetItem): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
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
declare namespace businesspartner {
    namespace app {
        class BusinessPartnerAssetFunc extends ibas.ModuleFunction {
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
declare namespace businesspartner {
    namespace app {
        /** 列表应用-业务伙伴资产 */
        class BusinessPartnerAssetListApp extends ibas.BOListApplication<IBusinessPartnerAssetListView, bo.BusinessPartnerAsset> {
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
            protected viewData(data: bo.BusinessPartnerAsset): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.BusinessPartnerAsset): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.BusinessPartnerAsset | bo.BusinessPartnerAsset[]): void;
            private viewDataJournal;
        }
        /** 视图-业务伙伴资产 */
        interface IBusinessPartnerAssetListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.BusinessPartnerAsset[]): void;
            /** 查看数据交易记录 */
            viewDataJournalEvent: Function;
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
declare namespace businesspartner {
    namespace app {
        /** 选择应用-业务伙伴资产 */
        class BusinessPartnerAssetChooseApp extends ibas.BOChooseService<IBusinessPartnerAssetChooseView, bo.BusinessPartnerAsset> {
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
        /** 视图-业务伙伴资产 */
        interface IBusinessPartnerAssetChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.BusinessPartnerAsset[]): void;
        }
        /** 业务伙伴资产选择服务映射 */
        class BusinessPartnerAssetChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IBOChooseService<bo.BusinessPartnerAsset>;
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
declare namespace businesspartner {
    namespace app {
        /** 查看应用-业务伙伴资产 */
        class BusinessPartnerAssetViewApp extends ibas.BOViewService<IBusinessPartnerAssetViewView, bo.BusinessPartnerAsset> {
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
            /** 编辑数据，参数：目标数据 */
            protected editData(): void;
            run(): void;
            run(data: bo.BusinessPartnerAsset): void;
            protected viewData: bo.BusinessPartnerAsset;
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria | string): void;
        }
        /** 视图-业务伙伴资产 */
        interface IBusinessPartnerAssetViewView extends ibas.IBOViewView {
        }
        /** 业务伙伴资产连接服务映射 */
        class BusinessPartnerAssetLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor();
            /** 创建服务实例 */
            create(): ibas.IBOLinkService;
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
declare namespace businesspartner {
    namespace app {
        /** 编辑应用-业务伙伴资产 */
        class BusinessPartnerAssetEditApp extends ibas.BOEditApplication<IBusinessPartnerAssetEditView, bo.BusinessPartnerAsset> {
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
            run(): void;
            run(data: bo.BusinessPartnerAsset): void;
            /** 待编辑的数据 */
            protected editData: bo.BusinessPartnerAsset;
            /** 保存数据 */
            protected saveData(): void;
            /** 删除数据 */
            protected deleteData(): void;
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void;
            private chooseBusinessPartner;
            private chooseAssetItem;
        }
        /** 视图-业务伙伴资产 */
        interface IBusinessPartnerAssetEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showBusinessPartnerAsset(data: bo.BusinessPartnerAsset): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /*** 选择业务伙伴事件 */
            chooseBusinessPartnerEvent: Function;
            /*** 选择资产项目事件 */
            chooseAssetItemEvent: Function;
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
declare namespace businesspartner {
    namespace app {
        /** 列表应用-业务伙伴资产日记账 */
        class BusinessPartnerAssetJournalListApp extends ibas.BOListApplication<IBusinessPartnerAssetJournalListView, bo.BusinessPartnerAssetJournal> {
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
            protected viewData(data: bo.BusinessPartnerAssetJournal): void;
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.BusinessPartnerAssetJournal): void;
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.BusinessPartnerAssetJournal | bo.BusinessPartnerAssetJournal[]): void;
            /** 查询业务伙伴资产交易记录 */
            protected fetchBusinessPartnerAssetJournal(criteria: ibas.ICriteria): void;
            /** 新建业务伙伴资产数据 */
            protected createBusinessPartnerAssetJournalEvent(data: bo.BusinessPartnerAsset): void;
        }
        /** 视图-业务伙伴资产日记账 */
        interface IBusinessPartnerAssetJournalListView extends ibas.IBOListView {
            /** 显示业务伙伴资产数据 */
            showBusinessPartnerAssets(datas: bo.BusinessPartnerAsset[]): void;
            /** 查询业务伙伴资产交易记录 */
            fetchBusinessPartnerAssetJournalEvent: Function;
            /** 显示业务伙伴资产交易数据 */
            showBusinessPartnerAssetJournals(datas: bo.BusinessPartnerAssetJournal[]): void;
            /** 新建业务伙伴资产数据 */
            createBusinessPartnerAssetJournalEvent: Function;
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
declare namespace businesspartner {
    namespace app {
        /** 编辑应用-业务伙伴资产日记账 */
        class BusinessPartnerAssetJournalEditApp extends ibas.BOEditApplication<IBusinessPartnerAssetJournalEditView, bo.BusinessPartnerAssetJournal> {
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
            run(): void;
            run(data: bo.BusinessPartnerAssetJournal): void;
            /** 待编辑的数据 */
            protected editData: bo.BusinessPartnerAssetJournal;
            /** 保存数据 */
            protected saveData(): void;
        }
        /** 视图-业务伙伴资产日记账 */
        interface IBusinessPartnerAssetJournalEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showBusinessPartnerAssetJournal(data: bo.BusinessPartnerAssetJournal): void;
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
declare namespace businesspartner {
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
        /** 模块控制台，手机端 */
        class ConsolePhone extends Console {
            /** 初始化 */
            protected registers(): void;
        }
    }
}
