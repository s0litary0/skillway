import { useEffect, useState } from 'react';
import classes from './Feature2.module.css';
import SmallCourseCard from './SmallCourseCard/SmallCourseCard.jsx';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Feature2() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/courses/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <section className={classes.container}>
      <h2 className={`${classes.title}`}>{t('feature2_title')}</h2>
      <div className={`${classes.cardList}`}>
        {courses.slice(0, 4).map((course) => (
          <SmallCourseCard 
            key={course.id} 
            name={course.name}
            description={course.description}
            image_url={course.image_base64}
          />
        ))}
      </div>
      <a
        onClick={(e) => {
          e.preventDefault();
          // alert(JSON.stringify(courses));
          // <Navigate to="/courses/"/>
          navigate("/courses")
        }}
        href="#"
        className={`text ${classes.viewCourses}`}
      >
        {t('feature2_view_all')}
      </a>
    </section>
  );
}
