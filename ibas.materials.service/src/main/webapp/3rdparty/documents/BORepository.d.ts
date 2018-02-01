/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    FetchCaller,
    SaveCaller,
    UploadFileCaller,
    FileData,
    DownloadFileCaller,
    IBORepositoryApplication
} from "ibas/index";
import * as bo from "./bo/index"

/** Documents 业务仓库 */
export interface IBORepositoryDocuments extends IBORepositoryApplication {

    /**
     * 获取地址
     */
    toUrl(document: bo.IDocument): string;
    /**
     * 上传文档
     * @param caller 调用者
     */
    upload(caller: UploadFileCaller<FileData>);
    /**
     * 文件下载
     * @param caller 调用者
     */
    download(caller: DownloadFileCaller<Blob>);
    /**
     * 查询 文档
     * @param fetcher 查询者
     */
    fetchDocument(fetcher: FetchCaller<bo.IDocument>);
    /**
     * 保存 文档
     * @param saver 保存者
     */
    saveDocument(saver: SaveCaller<bo.IDocument>);


}
