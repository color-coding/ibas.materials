@echo off
setlocal EnableDelayedExpansion
echo ***************************************************************************
echo      deploy_packages.bat
echo                     by niuren.zhu
echo                           2017.09.06
echo  ˵����
echo     1. ����jar����maven�ֿ⡣
echo     2. ��setting.xml��^<servers^>�ڵ�����ӣ������û�����������Ҫ�����Ա���룩
echo           ^<server^>
echo             ^<id^>ibas-maven^<^/id^>
echo             ^<username^>�û���^<^/username^>
echo             ^<password^>����^<^/password^>
echo           ^<^/server^>
echo ****************************************************************************
REM ���ò�������
SET WORK_FOLDER=%~dp0
REM �ֿ����ַ
SET ROOT_URL=http://maven.colorcoding.org/repository/
REM �ֿ�����
SET REPOSITORY=%1
REM ����Ĭ�ϲֿ�����
if "%REPOSITORY%"=="" SET REPOSITORY=maven-releases
set REPOSITORY_URL=%ROOT_URL%%REPOSITORY%
set REPOSITORY_ID=ibas-maven

echo --���maven���л���
call mvn -v >nul || goto :CHECK_MAVEN_FAILD

echo --������ַ��%REPOSITORY_URL%
REM ��������
if exist %WORK_FOLDER%\pom.xml (
  call mvn deploy:deploy-file ^
    -Dfile=%WORK_FOLDER%\pom.xml ^
    -DpomFile=%WORK_FOLDER%\pom.xml ^
    -Durl=%REPOSITORY_URL% ^
    -DrepositoryId=%REPOSITORY_ID% ^
    -Dpackaging=pom
)
REM ��������
for /f %%m in (%WORKFOLDER%compile_order.txt) do (
  if exist %WORK_FOLDER%%%m\pom.xml (
    for /f %%l in ('dir /s /a /b %WORK_FOLDER%release\%%m-*.jar' ) do (
      call mvn deploy:deploy-file ^
        -Dfile=%%l ^
        -DpomFile=%WORK_FOLDER%%%m\pom.xml ^
        -Durl=%REPOSITORY_URL% ^
        -DrepositoryId=%REPOSITORY_ID% ^
        -Dpackaging=jar
    )
  )
)
echo --�������

goto :EOF
REM ********************************����Ϊ����************************************
:CHECK_MAVEN_FAILD
echo û�м�⵽MAVEN���밴�����²�����
echo 1. �Ƿ�װ�����ص�ַ��http://maven.apache.org/download.cgi
echo 2. �Ƿ����õ�PATH���������ú���Ҫ����
echo 3. ����mvn -v��������Ƿ�ɹ�
goto :EOF