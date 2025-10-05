# 할 일 관리 앱 (Todo App)

React로 만든 할 일 관리 웹 애플리케이션입니다.

## 🚀 기능

- ✅ 할 일 추가/삭제
- ✅ 할 일 완료 처리
- ✅ 할 일 내용 편집 (더블클릭)
- ✅ 로컬 스토리지 데이터 지속성
- ✅ 반응형 디자인
- ✅ 모던한 UI/UX

## 🛠️ 기술 스택

- **Frontend**: React 18, HTML5, CSS3
- **Build Tool**: Babel (in-browser)
- **Testing**: Playwright
- **CI/CD**: GitHub Actions

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm start
# 또는
npm run dev
```

애플리케이션이 `http://localhost:5001`에서 실행됩니다.

## 🧪 테스트

### Playwright 테스트 실행

```bash
# 모든 테스트 실행
npm test

# UI 모드로 테스트 실행
npm run test:ui

# 헤드 모드로 테스트 실행 (브라우저 창 표시)
npm run test:headed

# 디버그 모드로 테스트 실행
npm run test:debug
```

### 테스트 커버리지

테스트는 다음 시나리오를 포함합니다:

1. **사용자 플로우 테스트**
   - 할 일 3개 추가
   - 두 번째 할일 완료 처리
   - 세 번째 할일 삭제
   - 첫 번째 할일 내용 수정

2. **개별 기능 테스트**
   - 할 일 추가/삭제
   - 완료 상태 토글
   - 모든 할 일 삭제
   - 로컬 스토리지 지속성

3. **브라우저 호환성 테스트**
   - Chrome, Firefox, Safari
   - 모바일 Chrome, Safari

4. **콘솔 에러 체크**
   - JavaScript 에러 모니터링
   - 경고 메시지 확인

## 🔄 CI/CD

GitHub Actions를 통한 자동화된 테스트:

- **Push/PR 시**: 모든 브라우저에서 테스트 실행
- **메인 브랜치**: 성능 테스트 및 보안 스캔 포함
- **아티팩트**: 테스트 결과, 스크린샷, 리포트 자동 저장

### 워크플로우 파일
- `.github/workflows/playwright.yml`: 메인 테스트 워크플로우

## 📁 프로젝트 구조

```
├── index.html          # 메인 HTML 파일
├── app.js              # React 애플리케이션
├── styles.css          # CSS 스타일
├── package.json        # 프로젝트 설정
├── playwright.config.js # Playwright 설정
├── tests/
│   └── todo-app.spec.js # E2E 테스트
├── .github/
│   └── workflows/
│       └── playwright.yml # GitHub Actions
└── README.md           # 프로젝트 문서
```

## 🎯 사용법

### 할 일 추가
1. 하단 입력 필드에 할 일 내용 입력
2. "추가" 버튼 클릭 또는 Enter 키

### 할 일 완료 처리
- 할 일 왼쪽의 체크박스 클릭

### 할 일 편집
- 할 일 텍스트를 더블클릭하여 편집 모드 활성화
- Enter 키로 저장, Escape 키로 취소

### 할 일 삭제
- 할 일 오른쪽의 🗑️ 버튼 클릭

### 모든 할 일 삭제
- 하단의 "모든 할 일 삭제" 버튼 클릭

## 🔧 개발

### 코드 스타일
- ESLint 설정 권장
- Prettier 설정 권장
- JSDoc 주석 사용

### 브라우저 지원
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 테스트 결과

테스트 실행 후 다음 아티팩트가 생성됩니다:

- `test-results/`: 테스트 결과 파일
- `playwright-report/`: HTML 테스트 리포트
- `test-results/screenshots/`: 각 단계별 스크린샷

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.
