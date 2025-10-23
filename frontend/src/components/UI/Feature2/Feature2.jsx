import { useEffect, useState } from 'react'
import classes from './Feature2.module.css'
import SmallCourseCard from './SmallCourseCard/SmallCourseCard.jsx'

export default function Feature2() {

  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/courses/courses')
    .then(response => response.json())
    .then(data => setCourses(data))
    .catch(error => console.log(error))
  }, [])

  return (
    <section className={classes.container}>
      <h2 className={`heading-2 ${classes.title}`}>Explore Popular Courses</h2>
      <div className={`${classes.cardList}`}>
        {courses.slice(0, 4).map((course) => {
          return (<SmallCourseCard 
            key={course.id} 
            name={course.name}
            description={course.description}
            image_url={course.image_url}
          />)
        })}
      </div>
      <a onClick={(e) => {
        e.preventDefault()
        alert(JSON.stringify(courses))
      }} 
        href="" 
        className={`main-text ${classes.viewCourses}`}
      > 
        &gt; View all Courses
      </a>
    </section>
  )

}