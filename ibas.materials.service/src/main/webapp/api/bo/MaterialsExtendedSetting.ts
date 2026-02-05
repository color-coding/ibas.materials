/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 */
namespace materials {
    export namespace bo {
        /** 物料扩展设置 */
        export interface IMaterialsExtendedSetting extends ibas.IBOSimple {
            /** 扩展项目 */
            element: string;
            /** 描述 */
            description: string;
            /** 目标类型 */
            targetCode: string;
            /** 目标键值 */
            targetKeys: string;
            /** 启用的 */
            enabled: ibas.emYesNo;
            /** 设置 */
            settings: string;
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

        }


    }
}
