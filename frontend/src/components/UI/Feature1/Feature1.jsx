import classes from './Feature1.module.css';

export default function Feature1() {
  return (
    <section
      className={classes.container}
    >
      <div>
        <h2 className="heading-2">Learn the Way That Fits You</h2>
        <p className={`${classes.paragraph} main-text`}>
          SkillWay is an adaptive online learning platform that personalizes
          your educational journey. Whether you're mastering mathematics,
          coding, or science, SkillWay adjusts to your level and pace — making
          every lesson effective and engaging.
        </p>
      </div>
      <img
        src="src/assets/illustrations/feature1.jpg"
        alt=""
        className="w-[640px] h-[480px]"
      />
    </section>
  );
}
