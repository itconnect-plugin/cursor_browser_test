const { useState, useEffect } = React;

/**
 * 할 일 관리 앱의 메인 컴포넌트
 * @component
 */
function TodoApp() {
    // 할 일 목록 상태 관리
    const [todos, setTodos] = useState([]);
    // 새 할 일 입력 상태 관리
    const [newTodo, setNewTodo] = useState('');
    // 편집 중인 할 일 ID 상태 관리
    const [editingId, setEditingId] = useState(null);
    // 편집 중인 할 일 텍스트 상태 관리
    const [editingText, setEditingText] = useState('');

    // 컴포넌트 마운트 시 로컬 스토리지에서 할 일 목록 불러오기
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // 할 일 목록이 변경될 때마다 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    /**
     * 새로운 할 일을 목록에 추가하는 함수
     * @param {Event} e - 폼 제출 이벤트
     */
    const addTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim() === '') return;

        const todo = {
            id: Date.now(),
            text: newTodo.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        setTodos([...todos, todo]);
        setNewTodo('');
    };

    /**
     * 할 일의 완료 상태를 토글하는 함수
     * @param {number} id - 할 일의 고유 ID
     */
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    /**
     * 할 일을 목록에서 삭제하는 함수
     * @param {number} id - 삭제할 할 일의 고유 ID
     */
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    /**
     * 모든 할 일을 삭제하는 함수
     */
    const clearAllTodos = () => {
        if (window.confirm('모든 할 일을 삭제하시겠습니까?')) {
            setTodos([]);
        }
    };

    /**
     * 할 일 편집을 시작하는 함수
     * @param {number} id - 편집할 할 일의 고유 ID
     * @param {string} text - 현재 할 일 텍스트
     */
    const startEditing = (id, text) => {
        setEditingId(id);
        setEditingText(text);
    };

    /**
     * 할 일 편집을 완료하는 함수
     * @param {number} id - 편집할 할 일의 고유 ID
     */
    const finishEditing = (id) => {
        if (editingText.trim() === '') return;
        
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, text: editingText.trim() } : todo
        ));
        setEditingId(null);
        setEditingText('');
    };

    /**
     * 할 일 편집을 취소하는 함수
     */
    const cancelEditing = () => {
        setEditingId(null);
        setEditingText('');
    };

    // 완료된 할 일과 미완료 할 일 개수 계산
    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;

    return (
        <div className="todo-app">
            <header className="app-header">
                <h1>📝 할 일 관리</h1>
                <p className="todo-stats">
                    총 {totalCount}개 중 {completedCount}개 완료
                </p>
            </header>

            <main className="app-main">
                {/* 할 일 추가 폼 */}
                <form onSubmit={addTodo} className="add-todo-form">
                    <div className="input-group">
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="새로운 할 일을 입력하세요..."
                            className="todo-input"
                        />
                        <button type="submit" className="add-button">
                            추가
                        </button>
                    </div>
                </form>

                {/* 할 일 목록 */}
                <div className="todo-list-container">
                    {todos.length === 0 ? (
                        <div className="empty-state">
                            <p>📋 할 일이 없습니다.</p>
                            <p>새로운 할 일을 추가해보세요!</p>
                        </div>
                    ) : (
                        <>
                            <div className="todo-list">
                                {todos.map(todo => (
                                    <TodoItem
                                        key={todo.id}
                                        todo={todo}
                                        onToggle={toggleTodo}
                                        onDelete={deleteTodo}
                                        onEdit={startEditing}
                                        onFinishEdit={finishEditing}
                                        onCancelEdit={cancelEditing}
                                        isEditing={editingId === todo.id}
                                        editingText={editingText}
                                        onEditingTextChange={setEditingText}
                                    />
                                ))}
                            </div>
                            
                            {todos.length > 0 && (
                                <div className="todo-actions">
                                    <button 
                                        onClick={clearAllTodos}
                                        className="clear-all-button"
                                    >
                                        모든 할 일 삭제
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

/**
 * 개별 할 일 아이템 컴포넌트
 * @component
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.todo - 할 일 객체
 * @param {Function} props.onToggle - 완료 상태 토글 함수
 * @param {Function} props.onDelete - 삭제 함수
 * @param {Function} props.onEdit - 편집 시작 함수
 * @param {Function} props.onFinishEdit - 편집 완료 함수
 * @param {Function} props.onCancelEdit - 편집 취소 함수
 * @param {boolean} props.isEditing - 편집 중인지 여부
 * @param {string} props.editingText - 편집 중인 텍스트
 * @param {Function} props.onEditingTextChange - 편집 텍스트 변경 함수
 */
function TodoItem({ 
    todo, 
    onToggle, 
    onDelete, 
    onEdit, 
    onFinishEdit, 
    onCancelEdit, 
    isEditing, 
    editingText, 
    onEditingTextChange 
}) {
    /**
     * 편집 모드에서 Enter 키를 눌렀을 때 편집 완료
     * @param {Event} e - 키보드 이벤트
     */
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onFinishEdit(todo.id);
        } else if (e.key === 'Escape') {
            onCancelEdit();
        }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="todo-checkbox"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={editingText}
                        onChange={(e) => onEditingTextChange(e.target.value)}
                        onKeyDown={handleKeyPress}
                        onBlur={() => onFinishEdit(todo.id)}
                        className="todo-edit-input"
                        autoFocus
                    />
                ) : (
                    <span 
                        className="todo-text"
                        onDoubleClick={() => onEdit(todo.id, todo.text)}
                        title="더블클릭하여 편집"
                    >
                        {todo.text}
                    </span>
                )}
            </div>
            <button
                onClick={() => onDelete(todo.id)}
                className="delete-button"
                title="삭제"
            >
                🗑️
            </button>
        </div>
    );
}

// React 앱을 DOM에 렌더링
ReactDOM.render(<TodoApp />, document.getElementById('root'));
