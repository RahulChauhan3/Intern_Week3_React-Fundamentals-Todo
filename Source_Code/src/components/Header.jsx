import PropTypes from 'prop-types';

const today = new Intl.DateTimeFormat('en-IN', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(new Date());

export default function Header({ remaining, total }) {
  const done = total - remaining;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <header className="header">
      <div>
        <p className="header__date">{today}</p>
        <h1 className="header__title">Tasks</h1>
      </div>
      <div className="progress" aria-label={`${percent}% of tasks complete`}>
        <span className="progress__label">
          {total === 0 ? 'Nothing planned' : `${done} of ${total} done`}
        </span>
        <div className="progress__track">
          <div className="progress__bar" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  remaining: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
