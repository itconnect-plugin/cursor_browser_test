const { test, expect } = require('@playwright/test');

/**
 * 할 일 관리 앱 E2E 테스트
 * 사용자 플로우: 할 일 추가 → 완료 처리 → 삭제 → 편집
 */
test.describe('할 일 관리 앱', () => {
    test.beforeEach(async ({ page }) => {
        // 각 테스트 전에 앱에 접속
        await page.goto('http://localhost:5001/index.html');
        
        // 페이지 로딩 대기
        await page.waitForSelector('.todo-app');
        
        // 기존 할 일 목록 초기화 (로컬 스토리지 클리어)
        await page.evaluate(() => {
            localStorage.clear();
        });
        
        // 페이지 새로고침하여 초기 상태로 설정
        await page.reload();
        await page.waitForSelector('.todo-app');
    });

    test('사용자 플로우: 할 일 추가 → 완료 처리 → 삭제 → 편집', async ({ page }) => {
        // 스크린샷 저장을 위한 디렉토리 생성
        const screenshotDir = 'test-results/screenshots';
        
        // 1단계: 할 일 3개 추가
        await test.step('1단계: 할 일 3개 추가', async () => {
            // 첫 번째 할 일 추가
            await page.fill('.todo-input', '첫 번째 할 일: 프로젝트 계획서 작성');
            await page.click('.add-button');
            
            // 두 번째 할 일 추가
            await page.fill('.todo-input', '두 번째 할 일: 데이터베이스 설계');
            await page.click('.add-button');
            
            // 세 번째 할 일 추가
            await page.fill('.todo-input', '세 번째 할 일: UI/UX 디자인');
            await page.click('.add-button');
            
            // 할 일이 3개 추가되었는지 확인
            await expect(page.locator('.todo-item')).toHaveCount(3);
            await expect(page.locator('.todo-stats')).toContainText('총 3개 중 0개 완료');
            
            // 1단계 스크린샷
            await page.screenshot({ 
                path: `${screenshotDir}/step1-3-todos-added.png`,
                fullPage: true 
            });
        });

        // 2단계: 두 번째 할일 완료 처리
        await test.step('2단계: 두 번째 할일 완료 처리', async () => {
            // 두 번째 할 일의 체크박스 클릭 (인덱스 1)
            await page.locator('.todo-checkbox').nth(1).click();
            
            // 완료 상태 확인
            await expect(page.locator('.todo-item.completed')).toHaveCount(1);
            await expect(page.locator('.todo-stats')).toContainText('총 3개 중 1개 완료');
            
            // 2단계 스크린샷
            await page.screenshot({ 
                path: `${screenshotDir}/step2-second-todo-completed.png`,
                fullPage: true 
            });
        });

        // 3단계: 세 번째 할일 삭제
        await test.step('3단계: 세 번째 할일 삭제', async () => {
            // 세 번째 할 일의 삭제 버튼 클릭 (인덱스 2)
            await page.locator('.delete-button').nth(2).click();
            
            // 삭제 확인
            await expect(page.locator('.todo-item')).toHaveCount(2);
            await expect(page.locator('.todo-stats')).toContainText('총 2개 중 1개 완료');
            
            // 3단계 스크린샷
            await page.screenshot({ 
                path: `${screenshotDir}/step3-third-todo-deleted.png`,
                fullPage: true 
            });
        });

        // 4단계: 첫 번째 할일 내용 수정 (편집 기능 테스트)
        await test.step('4단계: 첫 번째 할일 내용 수정', async () => {
            // 첫 번째 할 일 텍스트 더블클릭하여 편집 모드 활성화
            const firstTodoText = page.locator('.todo-text').first();
            await firstTodoText.dblclick();
            
            // 편집 입력 필드가 나타나는지 확인
            const editInput = page.locator('.todo-edit-input');
            await expect(editInput).toBeVisible();
            
            // 편집 내용 입력
            await editInput.fill('첫 번째 할 일: 프로젝트 계획서 작성 (수정됨)');
            
            // Enter 키로 편집 완료
            await editInput.press('Enter');
            
            // 편집 완료 확인
            await expect(firstTodoText).toContainText('프로젝트 계획서 작성 (수정됨)');
            
            // 4단계 스크린샷
            await page.screenshot({ 
                path: `${screenshotDir}/step4-first-todo-edited.png`,
                fullPage: true 
            });
        });

        // 최종 상태 확인
        await test.step('최종 상태 확인', async () => {
            // 할 일 개수 확인
            await expect(page.locator('.todo-item')).toHaveCount(2);
            
            // 완료된 할 일 개수 확인
            await expect(page.locator('.todo-item.completed')).toHaveCount(1);
            
            // 통계 확인
            await expect(page.locator('.todo-stats')).toContainText('총 2개 중 1개 완료');
            
            // 최종 스크린샷
            await page.screenshot({ 
                path: `${screenshotDir}/final-state.png`,
                fullPage: true 
            });
        });
    });

    test('개별 기능 테스트: 할 일 추가', async ({ page }) => {
        await test.step('빈 입력으로 할 일 추가 시도', async () => {
            await page.click('.add-button');
            await expect(page.locator('.todo-item')).toHaveCount(0);
        });

        await test.step('유효한 할 일 추가', async () => {
            await page.fill('.todo-input', '새로운 할 일');
            await page.click('.add-button');
            
            await expect(page.locator('.todo-item')).toHaveCount(1);
            await expect(page.locator('.todo-text')).toContainText('새로운 할 일');
        });
    });

    test('개별 기능 테스트: 할 일 완료 처리', async ({ page }) => {
        // 할 일 추가
        await page.fill('.todo-input', '테스트 할 일');
        await page.click('.add-button');
        
        await test.step('할 일 완료 처리', async () => {
            await page.locator('.todo-checkbox').click();
            
            await expect(page.locator('.todo-item.completed')).toHaveCount(1);
            await expect(page.locator('.todo-stats')).toContainText('총 1개 중 1개 완료');
        });

        await test.step('완료된 할 일 취소', async () => {
            await page.locator('.todo-checkbox').click();
            
            await expect(page.locator('.todo-item.completed')).toHaveCount(0);
            await expect(page.locator('.todo-stats')).toContainText('총 1개 중 0개 완료');
        });
    });

    test('개별 기능 테스트: 할 일 삭제', async ({ page }) => {
        // 할 일 2개 추가
        await page.fill('.todo-input', '첫 번째 할 일');
        await page.click('.add-button');
        
        await page.fill('.todo-input', '두 번째 할 일');
        await page.click('.add-button');
        
        await test.step('할 일 삭제', async () => {
            await page.locator('.delete-button').first().click();
            
            await expect(page.locator('.todo-item')).toHaveCount(1);
            await expect(page.locator('.todo-text')).toContainText('두 번째 할 일');
        });
    });

    test('개별 기능 테스트: 모든 할 일 삭제', async ({ page }) => {
        // 할 일 2개 추가
        await page.fill('.todo-input', '첫 번째 할 일');
        await page.click('.add-button');
        
        await page.fill('.todo-input', '두 번째 할 일');
        await page.click('.add-button');
        
        await test.step('모든 할 일 삭제', async () => {
            // 확인 다이얼로그 자동 승인
            page.on('dialog', dialog => dialog.accept());
            
            await page.click('.clear-all-button');
            
            await expect(page.locator('.todo-item')).toHaveCount(0);
            await expect(page.locator('.empty-state')).toBeVisible();
        });
    });

    test('로컬 스토리지 지속성 테스트', async ({ page }) => {
        await test.step('할 일 추가 후 새로고침', async () => {
            await page.fill('.todo-input', '지속성 테스트 할 일');
            await page.click('.add-button');
            
            // 페이지 새로고침
            await page.reload();
            await page.waitForSelector('.todo-app');
            
            // 할 일이 유지되는지 확인
            await expect(page.locator('.todo-item')).toHaveCount(1);
            await expect(page.locator('.todo-text')).toContainText('지속성 테스트 할 일');
        });
    });

    test('콘솔 에러 체크', async ({ page }) => {
        const consoleMessages = [];
        
        // 콘솔 메시지 수집
        page.on('console', msg => {
            consoleMessages.push({
                type: msg.type(),
                text: msg.text()
            });
        });
        
        // 페이지 로드
        await page.goto('http://localhost:5001/index.html');
        await page.waitForSelector('.todo-app');
        
        // 기본 동작 수행
        await page.fill('.todo-input', '콘솔 테스트');
        await page.click('.add-button');
        
        // 콘솔 메시지 확인
        const errorMessages = consoleMessages.filter(msg => msg.type === 'error');
        const warningMessages = consoleMessages.filter(msg => msg.type === 'warning');
        
        // 심각한 에러가 없는지 확인 (React 18 경고는 허용)
        const criticalErrors = errorMessages.filter(msg => 
            !msg.text.includes('ReactDOM.render') && 
            !msg.text.includes('Warning:')
        );
        
        expect(criticalErrors).toHaveLength(0);
        
        // 콘솔 메시지 로그 출력
        console.log('콘솔 메시지:', consoleMessages);
    });
});
