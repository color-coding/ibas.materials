package org.colorcoding.ibas.materials.service.rest;

import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.FileData;
import org.colorcoding.ibas.bobas.repository.FileRepository;
import org.colorcoding.ibas.bobas.repository.jersey.FileRepositoryService;
import org.colorcoding.ibas.materials.MyConfiguration;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

@Path("file")
public class FileService extends FileRepositoryService {

	public final static String WORK_FOLDER = MyConfiguration.getConfigValue(
			MyConfiguration.CONFIG_ITEM_MATERIALS_FILE_FOLDER,
			MyConfiguration.getDataFolder() + File.separator + "materials_files");

	public FileService() {
		// 设置工作目录
		this.getRepository().setRepositoryFolder(FileService.WORK_FOLDER);
	}

	@POST
	@Path("upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public OperationResult<FileData> upload(@FormDataParam("file") InputStream fileStream,
			@FormDataParam("file") FormDataContentDisposition fileDisposition, @QueryParam("token") String token) {
		return super.save(fileStream, fileDisposition, token);
	}

	@POST
	@Path("download")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public byte[] download(Criteria criteria, @QueryParam("token") String token,
			@Context HttpServletResponse response) {
		try {
			// 获取文件
			IOperationResult<FileData> operationResult = this.fetch(criteria, token);
			if (operationResult.getError() != null) {
				throw operationResult.getError();
			}
			FileData fileData = operationResult.getResultObjects().firstOrDefault();
			if (fileData != null) {
				response.setHeader("Content-Disposition",
						String.format("attachment;filename=%s", fileData.getFileName()));
				return fileData.getFileBytes();
			} else {
				// 文件不存在
				throw new WebApplicationException(404);
			}
		} catch (WebApplicationException e) {
			throw e;
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	@GET
	@Path("{resource}")
	public void resource(@PathParam("resource") String resource, @QueryParam("token") String token,
			@Context HttpServletResponse response) {
		try {
			Criteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(FileRepository.CRITERIA_CONDITION_ALIAS_FILE_NAME);
			condition.setValue(resource);
			// 获取文件
			IOperationResult<FileData> operationResult = this.fetch(criteria, token);
			if (operationResult.getError() != null) {
				throw operationResult.getError();
			}
			FileData fileData = operationResult.getResultObjects().firstOrDefault();
			if (fileData != null) {
				// 设置内容类型
				response.setContentType(this.getContentType(fileData));
				// 写入响应输出流
				OutputStream os = response.getOutputStream();
				os.write(fileData.getFileBytes());
				os.flush();
			} else {
				// 文件不存在
				throw new WebApplicationException(404);
			}
		} catch (WebApplicationException e) {
			throw e;
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}
}
