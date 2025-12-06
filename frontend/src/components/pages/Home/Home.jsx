import Hero from "../../UI/Hero/Hero.jsx";
import Feature1 from "../../UI/Feature1/Feature1.jsx";
import Feature2 from "../../UI/Feature2/Feature2.jsx";
import Testimonials from "../../UI/Testimonials/Testimonials.jsx";
import Navigation from "../../layouts/Navigation/Navigation.jsx"
import classes from "./Home.module.css"


export default function Home() {
  return (
    <div className={classes.home}>
      <Navigation></Navigation>
      <Hero title={'Unlock Your Full Potential with SkillWay'} btns={{btn1: 'Start learning', btn2: 'Try demo'}}>
        Learn smarter, faster, and better through interactive lessons and
        AI-powered guidance.
      </Hero>
      <Feature1 />
      {/*<Feature2 />
      <Testimonials />
      <Hero title={'Start Your Journey Today'} btns={{btn1: 'Sign up now', btn2: 'Explore courses'}}> 
        Join thousands of learners already improving their skills with SkillWay. 
        Your next step toward success begins here. 
      </Hero> */}
    </div>
    
  );
}
