@echo off
REM Windows용 로컬 테스트 스크립트

echo 🚀 할 일 관리 앱 Playwright 테스트 시작

REM 의존성 설치
echo 📦 의존성 설치 중...
call npm ci

REM Playwright 브라우저 설치
echo 🌐 Playwright 브라우저 설치 중...
call npx playwright install --with-deps

REM 테스트 실행
echo 🧪 테스트 실행 중...
call npm test

REM 테스트 결과 확인
if %errorlevel% equ 0 (
    echo ✅ 모든 테스트가 성공적으로 완료되었습니다!
    echo 📊 테스트 리포트: npx playwright show-report
    echo 📸 스크린샷: test-results/screenshots/
) else (
    echo ❌ 테스트 실행 중 오류가 발생했습니다.
    exit /b 1
)
