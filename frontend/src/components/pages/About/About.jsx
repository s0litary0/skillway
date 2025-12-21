import "./About.css";
import Block from "../../UI/Block/Block";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="static-page">
      <header className="static-header">
        <h1>{t("welcome_to_skillway")}</h1>
        <p>Your go-to source for information and resources.</p>
      </header>

      <main className="static-content">
        <section>
          <h2>About Skillway</h2>
          <p>
            Skillway is a platform dedicated to helping learners acquire skills
            efficiently through interactive courses and practical tasks. Our
            mission is to empower students to reach their full potential and
            achieve their educational goals.
          </p>
        </section>
        <Block className="poster-block">
          <img src="imgs/about.jpg" alt="" className="poster" />
        </Block>

        <Block className="bottom-section">
          <article>
            <h2>Our Services</h2>
            <ul>
              <li>Online courses</li>
              <li>
                Interactive Learning with MCQs, plots and other all kinds of
                tasks
              </li>
              <li>Progress tracking and achievements</li>
              <li>Leaderboards</li>
            </ul>
          </article>

          <article>
            <h2>Contacts</h2>
            <ul>
              <span>Email:</span>
              <li>sultanbaibolov1@gmail.com</li>
              <li>sultan_k@gmail.com</li>
            </ul>
            <ul>
              <span>Phone:</span>
              <li>+7 (776) 286 86 73</li>
              <li>+7 (705) 967 02 37</li>
            </ul>
          </article>
        </Block>
      </main>
    </div>
  );
}
