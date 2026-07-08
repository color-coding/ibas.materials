<div align="center">

# IBAS Materials

**物料与库存管理模块**

IBAS 系统的物料与库存管理模块，提供物料主数据、仓库管理、库存收发、库存盘点、库存转储、批次序列号管理、物料价格清单等全流程物料管理功能。

Materials and inventory management module for the IBAS system — material master data, warehouse management, goods receipt/issue, inventory counting, inventory transfer, batch/serial tracking, and price list management.

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-1.8+-orange.svg)](https://www.oracle.com/java/)
[![Maven](https://img.shields.io/badge/Maven-3.x-red.svg)](https://maven.apache.org/)
[![Version](https://img.shields.io/badge/version-0.2.0-green.svg)](pom.xml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-贡献--contributing)

</div>

---

## 📖 目录 | Table of Contents

- [✨ 特性 | Features](#-特性--features)
- [📦 模块结构 | Modules](#-模块结构--modules)
- [🚀 快速开始 | Quick Start](#-快速开始--quick-start)
- [📋 业务对象 | Business Objects](#-业务对象--business-objects)
- [📚 相关项目 | Related Projects](#-相关项目--related-projects)
- [🤝 贡献 | Contributing](#-贡献--contributing)
- [📄 许可证 | License](#-许可证--license)

---

## ✨ 特性 | Features

- **📦 物料主数据** — 物料（Material）、产品（Product）、物料组（Material Group）、物料版本（Material Version）管理
- **🏭 仓库管理** — 仓库（Warehouse）与库存（Material Inventory）管理
- **📥 收发货** — 收货（Goods Receipt）、发货（Goods Issue）、废料（Material Scrap）管理
- **🔄 库存转储** — 库存转储（Inventory Transfer）与转储申请（Inventory Transfer Request）
- **📋 库存盘点** — 库存盘点（Inventory Counting）管理
- **📦 拣货** — 拣货单（Pick Lists）管理
- **🏷️ 批次与序列号** — 物料批次（Material Batch）与序列号（Material Serial）追踪
- **💰 价格清单** — 物料价格清单（Material Price List）管理
- **📋 物料目录** — 业务伙伴物料目录（Material Catalog）管理
- **🔢 编号关联** — 物料编号关联（Material Number Association）
- **📐 规格管理** — 物料规格（Specification）与扩展设置
- **📊 计量单位** — 计量单位（Unit）管理

---

## 📦 模块结构 | Modules

| 模块 | 类型 | 说明 |
|------|------|------|
| `ibas.materials` | JAR | **核心模块** — 业务对象定义、仓储层、业务逻辑 |
| `ibas.materials.service` | WAR | **REST 服务** — Jersey 端点（DataService、FileService） |

---

## 🚀 快速开始 | Quick Start

### 环境要求 | Prerequisites

- **JDK** 1.8+
- **Maven** 3.x
- [ibas-framework](https://github.com/color-coding/ibas-framework)（BOBAS 框架）

### 构建 | Build

```bash
# 克隆仓库
git clone https://github.com/color-coding/ibas.materials.git
cd ibas.materials

# 编译全部模块
./compile_packages.sh            # Linux / macOS
compile_packages.bat             # Windows

# 编译单个模块
mvn clean package install -Dmaven.test.skip=true -f ibas.materials/pom.xml

# 运行测试
mvn test -f ibas.materials/pom.xml

# 部署
./deploy_packages.sh
```

### Maven 依赖

```xml
<dependency>
    <groupId>org.colorcoding.apps</groupId>
    <artifactId>ibas.materials</artifactId>
    <version>0.2.0</version>
</dependency>
```

---

## 📋 业务对象 | Business Objects

| 业务对象 | 说明 |
|----------|------|
| `Material` / `MaterialBase` / `MaterialGroup` | 物料主数据 |
| `MaterialVersion` / `MaterialSubstitute` | 物料版本与替代料 |
| `MaterialPrice` / `MaterialPriceList` | 物料价格与价格清单 |
| `Product` / `SchedulingGroup` | 产品与排产组 |
| `MaterialQuantity` | 物料数量 |
| `Warehouse` | 仓库 |
| `MaterialInventory` | 库存 |
| `GoodsIssue` / `GoodsIssueLine` | 发货与发货行 |
| `GoodsReceipt` | 收货 |
| `InventoryCounting` | 库存盘点 |
| `InventoryTransfer` / `InventoryTransferRequest` | 库存转储与转储申请 |
| `MaterialBatch` / `MaterialBatchItem` / `MaterialBatchJournal` | 物料批次 |
| `MaterialSerial` | 物料序列号 |
| `MaterialScrap` | 物料废料 |
| `PickingList` | 拣货单 |
| `MaterialNumberAssociation` | 物料编号关联 |
| `BusinessPartnerMaterialCatalog` | 业务伙伴物料目录 |
| `Specification` / `MaterialSpecification` | 物料规格 |
| `MaterialExtendedSetting` | 物料扩展设置 |
| `Unit` | 计量单位 |

---

## 📚 相关项目 | Related Projects

| 项目 | 说明 |
|------|------|
| [ibas-framework](https://github.com/color-coding/ibas-framework) | BOBAS 业务对象框架 |
| [ibas.sales](https://github.com/color-coding/ibas.sales) | 销售管理模块 |
| [ibas.purchase](https://github.com/color-coding/ibas.purchase) | 采购管理模块 |

---

## 🤝 贡献 | Contributing

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 发起 Pull Request

---

## 📄 许可证 | License

本项目基于 [Apache License 2.0](LICENSE) 开源。
---

## 🙏 鸣谢 | Thanks

<div align="center">

**[Color-Coding Studio](http://colorcoding.org/)** · 咔啦工作室

</div>
