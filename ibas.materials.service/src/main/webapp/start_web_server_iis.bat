@echo off
echo ***************************************************************************
echo      start_web_server_iis.bat
echo                     by niuren.zhu
echo                           2017.01.24
echo  ˵����
echo     1. ��web����IIS Express��
echo ****************************************************************************
REM ���ò�������
SET WORK_FOLDER=%~dp0
SET WEB_SERVER="%ProgramFiles%\IIS Express\iisexpress.exe"
SET WEB_PORT=7788

if exist %WEB_SERVER% (
  call %WEB_SERVER% /path:%WORK_FOLDER% /port:%WEB_PORT%
) else (
  echo ��û�а�װIIS Express!
  pause
)
