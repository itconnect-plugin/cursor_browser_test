#!/bin/bash

# 로컬에서 Playwright 테스트를 실행하는 스크립트
# GitHub Actions와 동일한 환경에서 테스트

echo "🚀 할 일 관리 앱 Playwright 테스트 시작"

# 의존성 설치
echo "📦 의존성 설치 중..."
npm ci

# Playwright 브라우저 설치
echo "🌐 Playwright 브라우저 설치 중..."
npx playwright install --with-deps

# 테스트 실행
echo "🧪 테스트 실행 중..."
npm test

# 테스트 결과 확인
if [ $? -eq 0 ]; then
    echo "✅ 모든 테스트가 성공적으로 완료되었습니다!"
    echo "📊 테스트 리포트: npx playwright show-report"
    echo "📸 스크린샷: test-results/screenshots/"
else
    echo "❌ 테스트 실행 중 오류가 발생했습니다."
    exit 1
fi
