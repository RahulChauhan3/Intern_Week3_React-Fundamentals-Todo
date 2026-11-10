import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import Footer from './components/Footer.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';

const FILTERS = {
  all: () => true,
  active: (todo) => !todo.completed,
  completed: (todo) => todo.completed,
};

export default function App() {
  // State lives here and flows down to children as props.
  const [todos, setTodos] = useLocalStorage('react-todo-app.todos', []);
  const [filter, setFilter] = useState('all');

  const addTodo = (text) =>
    setTodos((prev) => [
      { id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() },
      ...prev,
    ]);

  const toggleTodo = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

  const editTodo = (id, text) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));

  const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

  const toggleAll = () => {
    const allDone = todos.length > 0 && todos.every((t) => t.completed);
    setTodos((prev) => prev.map((t) => ({ ...t, completed: !allDone })));
  };

  const clearCompleted = () => setTodos((prev) => prev.filter((t) => !t.completed));

  const visibleTodos = useMemo(() => todos.filter(FILTERS[filter]), [todos, filter]);
  const remaining = todos.filter(FILTERS.active).length;
  const completedCount = todos.length - remaining;

  return (
    <main className="app">
      <Header remaining={remaining} total={todos.length} />
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={visibleTodos}
        filter={filter}
        hasTodos={todos.length > 0}
        allDone={todos.length > 0 && remaining === 0}
        onToggle={toggleTodo}
        onEdit={editTodo}
        onDelete={deleteTodo}
        onToggleAll={toggleAll}
      />
      {todos.length > 0 && (
        <Footer
          filter={filter}
          onFilterChange={setFilter}
          remaining={remaining}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />
      )}
    </main>
  );
}
