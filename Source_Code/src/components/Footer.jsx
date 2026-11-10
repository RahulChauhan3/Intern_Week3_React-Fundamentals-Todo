import PropTypes from 'prop-types';

const FILTER_LABELS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export default function Footer({
  filter,
  onFilterChange,
  remaining,
  completedCount,
  onClearCompleted,
}) {
  return (
    <footer className="footer">
      <span className="footer__count">
        {remaining} {remaining === 1 ? 'task' : 'tasks'} left
      </span>

      <div className="filters" role="group" aria-label="Filter tasks">
        {FILTER_LABELS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`filters__btn${filter === key ? ' is-active' : ''}`}
            aria-pressed={filter === key}
            onClick={() => onFilterChange(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="link-btn"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  remaining: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};
