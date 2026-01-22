import Button from "../Button/Button";
import classes from './Hero.module.css';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero({ children, title, btns }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <section className={classes.hero}>
      <div className={classes["grid-container"]}>
        <header className={`${classes["text-container"]} ${classes["grid-item"]}`}>
          <h1 className={`${classes.title} ${classes["flex-item"]}`}> {t(title)} </h1>
          <p className={`${classes.description} ${classes["flex-item"]} text`}> {t(children)} </p>
        </header>

        <footer className={`${classes["grid-item"]} ${classes["btn-container"]}`}>
          <Button onClick={() => handleClick(btns.btn1.path)} className={classes.btn1}>
            {t(btns.btn1.title)}
          </Button>
          <Button onClick={() => handleClick(btns.btn2.path)} className={classes.btn2}>
            {t(btns.btn2.title)}
          </Button>
        </footer>
      </div>
    </section>
  );
}
