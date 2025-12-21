import classes from './Button.module.css'

export default function Button({ disabled, children, onClick, className = "" }) {
  return (
    <button
      className={`${classes.btn} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

