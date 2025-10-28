import Button from "../Button/Button";
import classes from './Hero.module.css'


export default function Hero({ children, title, btns }) {

  const handleClick = () => {
    alert("Goes to another page")
  }

  return (
    <section className={classes.hero}>
      <div className={classes["grid-container"]}>
        <header className={`${classes["text-container"]} ${classes["grid-item"]}`}>
          <h1 className={`${classes.title} ${classes["flex-item"]}`}> {title} </h1>
          <p className={`${classes.description} ${classes["flex-item"]} text`}> {children} </p>
        </header>

        <footer className={`${classes["grid-item"]} ${classes["btn-container"]}`}>
          <Button onClick={handleClick} className={classes.btn1}>
            {btns.btn1}
          </Button>
          <Button onClick={handleClick} className={classes.btn2}>
            {btns.btn2}
          </Button>
        </footer>
      </div>
    </section>
  );
}
