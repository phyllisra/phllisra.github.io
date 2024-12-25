@echo off
echo Creating directories...
mkdir assets\images\analysis
mkdir assets\images\rendering
mkdir assets\images\logo
mkdir portfolio

echo Copying files...
xcopy /Y "G:\Cursor test\images1\*" "assets\images\analysis\"
xcopy /Y "G:\Cursor test\images2\*" "assets\images\rendering\"
xcopy /Y "G:\Cursor test\images3\*" "assets\images\logo\"
xcopy /Y "G:\Cursor test\portfolio\个人作品集郑祎旋.pdf" "portfolio\"

echo Renaming files...
cd assets\images\analysis
for /f "tokens=1* delims=:" %%a in ('dir /b *.jpg ^| findstr /n "^"') do ren "%%b" "%%a.jpg"

cd ..\rendering
for /f "tokens=1* delims=:" %%a in ('dir /b *.jpg ^| findstr /n "^"') do ren "%%b" "%%a.jpg"

cd ..\logo
for /f "tokens=1* delims=:" %%a in ('dir /b *.jpg ^| findstr /n "^"') do ren "%%b" "%%a.jpg"

cd ..\..\..

echo Setup complete!
pause 