import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  // Focus the edit field as soon as it appears.
  useEffect(() => {
    if (isEditing) inputRef.current?.select();
  }, [isEditing]);

  const startEditing = () => {
    setDraft(todo.text);
    setIsEditing(true);
  };

  const save = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      onDelete(todo.id); // an emptied task is removed
    } else if (trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const cancel = () => {
    setDraft(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') save();
    if (event.key === 'Escape') cancel();
  };

  return (
    <li className={`item${todo.completed ? ' item--done' : ''}`}>
      <input
        id={`todo-${todo.id}`}
        className="item__check"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          className="item__edit"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={save}
          aria-label={`Edit task: ${todo.text}`}
        />
      ) : (
        <>
          <label
            htmlFor={`todo-${todo.id}`}
            className="item__text"
            onDoubleClick={startEditing}
          >
            {todo.text}
          </label>
          <div className="item__actions">
            <button
              type="button"
              className="icon-btn"
              onClick={startEditing}
              aria-label={`Edit task: ${todo.text}`}
            >
              Edit
            </button>
            <button
              type="button"
              className="icon-btn icon-btn--danger"
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete task: ${todo.text}`}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
