import "./CourseLearning.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseListService from "../../../services/CoursesListService";
import Spinner from "../../UI/Spinner/Spinner";
import Block from "../../UI/Block/Block";
import Button from "../../UI/Button/Button";
import LessonListService from "../../../services/LessonListService";

export default function CourseLearning() {
  const { courseId } = useParams();
  const navigate = useNavigate()
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedLessons, setExpandedLessons] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await CourseListService.getCourse(courseId);
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    const fetchLessons = async () => {
      try {
        const data = await LessonListService.getLessonsByCourseId(courseId);
        setLessons(data);
      } catch (err) {
        console.error("Error fetching lessons:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
    fetchLessons();
  }, [courseId]);

  const toggleLesson = (lessonId) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const goToTask = (taskId) => {
    navigate(`task/${taskId}`)
  }

  if (loading) return <Spinner />;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="course-learning-page">
      <Block className="course-modules">
        <h1>{course.name}</h1>
        <div className="lessons-list">
          {lessons.map((lesson) => (
            <Block key={lesson.id} className="lesson-block" >
              <div className="lesson-block__main" onClick={() => toggleLesson(lesson.id)}>
                <Button
                  className="lesson-toggle-btn"
                  onClick={() => toggleLesson(lesson.id)}
                >
                  {lesson.name}
                </Button>
                {expandedLessons[lesson.id] ? "↓" : "→"}
              </div>

              {expandedLessons[lesson.id] && (
                <div className="lesson-tasks">
                  {lesson.tasks.map((task) => (
                    <Block key={task.id} className="task-block" onClick={() => goToTask(task.id)}>
                      <p className="task-name"><span>{task.order}.</span> {task.name}</p>
                      <span>{task.description}</span>
                    </Block>
                  ))}
                </div>
              )}
            </Block>
          ))}
        </div>
      </Block>
    </div>
  );
}
