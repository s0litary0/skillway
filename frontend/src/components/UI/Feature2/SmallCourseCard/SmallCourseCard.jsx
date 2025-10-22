import classes from './SmallCourseCard.module.css'

export default function SmallCourseCard({name, description, image_url}) {
  return (
    <div className={classes.card}>
      <div className={classes.textArea}>
        <h3 className={`heading-3 ${classes.title}`}>{name}</h3>
        <p className={`main-text ${classes.text}`}>{description ? description.slice(0, 80) + "..." : "null"}</p>
      </div>
      {image_url 
      ? <img className={classes.courseImage} src={image_url} alt="course image" />
      : <div className={classes.courseImage}></div>
      }
    </div>
  )

}