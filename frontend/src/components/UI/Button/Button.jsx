import classes from './Button.module.css'

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      className={`${classes.btn} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
