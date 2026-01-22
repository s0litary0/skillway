import Hero from "../../UI/Hero/Hero.jsx";
import Feature1 from "../../UI/Feature1/Feature1.jsx";
import Feature2 from "../../UI/Feature2/Feature2.jsx";
import Testimonials from "../../UI/Testimonials/Testimonials.jsx";
import Navigation from "../../layouts/Nav/Nav.jsx";
import classes from "./Home.module.css";

export default function Home() {
  return (
    <div className={classes.home}>
      {/* <Hero
        title={"hero_title"}
        btns={{
          btn1: { title: "Start learning", path: "/courses" },
          btn2: { title: "Try demo", path: "/demo" },
        }}
      >
        Learn smarter, faster, and better through interactive lessons and
        AI-powered guidance.
      </Hero> */}
      <Hero
        title="hero_title"
        btns={{
          btn1: { title: "hero_btn1", path: "/register" },
          btn2: { title: "hero_btn2", path: "/about" },
        }}
      >
        hero_description
      </Hero>

      <Feature1 />
      <Feature2 />
      <Testimonials />
      <Hero
        title={"Start Your Journey Today"}
        btns={{
          btn1: { title: "Sign up now", path: "/register" },
          btn2: { title: "Explore courses", path: "/courses" },
        }}
      >
        Join thousands of learners already improving their skills with SkillWay.
        Your next step toward success begins here.
      </Hero>
    </div>
  );
}
