import "./About.css";
import Block from "../../UI/Block/Block";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="static-page">
      <header className="static-header">
        <h1>{t("welcome_to_skillway")}</h1>
        <p>{t("your_go_to_source")}</p>
      </header>

      <main className="static-content">
        <section>
          <h2>{t("about_skillway")}</h2>
          <p>
            {t("skillway_description")}
          </p>
        </section>
        <Block className="poster-block">
          <img src="imgs/about.jpg" alt="" className="poster" />
        </Block>

        <Block className="bottom-section">
          <article>
            <h2>{t("our_services")}</h2>
            <ul>
              <li>{t("online_courses")}</li>
              <li>{t("interactive_learning")}</li>
              <li>{t("progress_tracking")}</li>
              <li>{t("leaderboards")}</li>
            </ul>
          </article>

          <article>
            <h2>{t("contacts")}</h2>
            <ul>
              <span>{t("email")}:</span>
              <li>sultanbaibolov1@gmail.com</li>
              <li>sultan_k@gmail.com</li>
            </ul>
            <ul>
              <span>{t("phone")}:</span>
              <li>+7 (776) 286 86 73</li>
              <li>+7 (705) 967 02 37</li>
            </ul>
          </article>
        </Block>
      </main>
    </div>
  );
}
