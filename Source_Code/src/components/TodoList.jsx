import PropTypes from 'prop-types';
import TodoItem from './TodoItem.jsx';

const EMPTY_MESSAGES = {
  all: 'No tasks yet. Add your first one above.',
  active: 'Nothing left to do. Nice work.',
  completed: 'No completed tasks yet.',
};

export default function TodoList({
  todos,
  filter,
  hasTodos,
  allDone,
  onToggle,
  onEdit,
  onDelete,
  onToggleAll,
}) {
  if (todos.length === 0) {
    return (
      <p className="empty" role="status">
        {hasTodos ? EMPTY_MESSAGES[filter] : EMPTY_MESSAGES.all}
      </p>
    );
  }

  return (
    <section className="list-wrap">
      <button type="button" className="link-btn" onClick={onToggleAll}>
        {allDone ? 'Mark all as active' : 'Mark all as done'}
      </button>
      <ul className="list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  hasTodos: PropTypes.bool.isRequired,
  allDone: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleAll: PropTypes.func.isRequired,
};
