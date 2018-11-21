@echo off
@rem ##############################################################################
@rem ##
@rem ##  XL Cli wrapper script for Windows
@rem ##
@rem ##############################################################################

if "%OS%"=="Windows_NT" setlocal

set PROG_DIR=%~dp0

FOR /F "tokens=1,2 delims==" %%a IN (%PROG_DIR%\.xebialabs\wrapper.conf) DO (set %%a=%%~b)

set XL_WRAPPER_HOME=%LOCALAPPDATA%\.xebialabs\wrapper\%CLI_VERSION%

IF not exist %XL_WRAPPER_HOME% (mkdir %XL_WRAPPER_HOME%)

set BINARY_NAME=xl.exe
set WRAPPER_BINARY=%XL_WRAPPER_HOME%\%BINARY_NAME%
set TEMP_BINARY_FILE=%WRAPPER_BINARY%.%RANDOM%

if not exist %WRAPPER_BINARY% (
    echo Downloading XL binary v%CLI_VERSION%
    powershell -Command "(New-Object Net.WebClient).DownloadFile('%CLI_BASE_URL%/%CLI_VERSION%/windows-amd64/%BINARY_NAME%', '%TEMP_BINARY_FILE%')" || goto :error
    call ren "%TEMP_BINARY_FILE%" %BINARY_NAME% || goto :error
)

call %WRAPPER_BINARY% %* || goto :error

if "%OS%"=="Windows_NT" endlocal

:error
exit /b %errorlevel%