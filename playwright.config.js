// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright 설정 파일
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // 테스트 디렉토리
  testDir: './tests',
  
  // 각 테스트의 최대 실행 시간 (30초)
  timeout: 30 * 1000,
  
  // 전체 테스트 스위트의 최대 실행 시간 (10분)
  expect: {
    timeout: 5000,
  },
  
  // 실패 시 재시도 횟수
  retries: process.env.CI ? 2 : 0,
  
  // 병렬 실행할 워커 수
  workers: process.env.CI ? 1 : undefined,
  
  // 리포터 설정
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  
  // 전역 설정
  use: {
    // 기본 타임아웃
    actionTimeout: 0,
    
    // 스크린샷 설정
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // 트레이스 설정
    trace: 'on-first-retry',
    
    // 브라우저 컨텍스트 설정
    baseURL: 'http://localhost:5001',
    
    // 뷰포트 크기
    viewport: { width: 1280, height: 720 },
    
    // 사용자 에이전트
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },

  // 프로젝트 설정 (다양한 브라우저에서 테스트)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // 모바일 테스트
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // 웹 서버 설정 (테스트 실행 전 서버 시작)
  webServer: {
    command: 'npm run start',
    port: 5001,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  // 출력 디렉토리
  outputDir: 'test-results/',
  
  // 테스트 결과 저장 디렉토리
  testResultsDir: 'test-results/',
});
