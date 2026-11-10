import { useState } from 'react';
import PropTypes from 'prop-types';

const MAX_LENGTH = 120;

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Write a task before adding it.');
      return;
    }
    onAdd(trimmed);
    setText('');
    setError('');
  };

  const handleChange = (event) => {
    setText(event.target.value);
    if (error) setError('');
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="new-task" className="visually-hidden">
        New task
      </label>
      <input
        id="new-task"
        className="form__input"
        type="text"
        value={text}
        onChange={handleChange}
        maxLength={MAX_LENGTH}
        placeholder="What needs doing?"
        autoComplete="off"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'new-task-error' : undefined}
      />
      <button type="submit" className="btn btn--primary">
        Add task
      </button>
      {error && (
        <p id="new-task-error" className="form__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

TodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
