@echo off
setlocal

rem Relative path of kobold settings kcpps file
set RELATIVE_PATH=hermes16.kcpps.kcpps

rem Get the full path
set "FULL_PATH=%~dp0%RELATIVE_PATH%"

rem Display the full path (optional)
echo Full Path: %FULL_PATH%

rem Run the executable with the full path as an argument
koboldcpp.exe --config "%FULL_PATH%"

rem Continue with the rest of your script...

endlocal
