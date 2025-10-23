import classes from './Button.module.css'

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      className={`px-[16px] py-[12px] rounded-[12px] 
            bg-black hover:scale-[0.98]
            text-(--text-color-white) 
            text-[24px]/[1.4] font-bold 
            transition duration-75 ease
            ${className} ${classes.btn}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
