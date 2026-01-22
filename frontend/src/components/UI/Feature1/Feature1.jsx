import classes from './Feature1.module.css';
import { useTranslation } from 'react-i18next';

export default function Feature1() {
  const { t } = useTranslation();

  return (
    <section className={classes.container}>
      <div className={`${classes["text-container"]}`}>
        <h2>{t("feature1_heading")}</h2>
        <p className={`${classes.paragraph} text`}>
          {t("feature1_text")}
        </p>
      </div>
      <div className={`${classes["img-container"]}`}>
        <img
          src="src/assets/illustrations/feature1.jpg"
          alt=""
          className={classes.image}
        />
      </div>
    </section>
  );
}
