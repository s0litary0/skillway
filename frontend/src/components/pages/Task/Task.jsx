import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskService from "../../../services/TaskService";
import MCQService from "../../../services/MCQService";
import LessonListService from "../../../services/LessonListService";
import Spinner from "../../UI/Spinner/Spinner";
import Button from "../../UI/Button/Button";
import Block from "../../UI/Block/Block";
import { useAuth } from "../../../hooks";
import "./Task.css";
import { useTranslation } from "react-i18next";

export default function Task() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { courseId, taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [mcq, setMcq] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load task, lesson, MCQ, and last submission
  useEffect(() => {
    const loadData = async () => {
      try {
        const taskData = await TaskService.getTask(taskId);
        setTask(taskData);

        const lessonData = await LessonListService.getLessonById(taskData.lesson);
        setLesson(lessonData);

        const mcqData = await MCQService.getMCQByTaskId(taskId);
        setMcq(mcqData[0]);

        if (!user) return;
        const submission = await TaskService.getUserSubmission(user.id, taskId);
        if (submission) {
          setSubmitted(true);
          setResult(submission);
          setSelectedOption(submission.answer);
        } else {
          setSubmitted(false);
          setResult(null);
          setSelectedOption(null);
        }
      } catch (err) {
        console.error(err);
        setError(t("task_load_failed"));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [taskId, user, t]);

  const handleSubmit = async () => {
    if (!selectedOption) return;

    try {
      const response = await TaskService.submitTaskAnswer(user.id, taskId, selectedOption);
      setResult(response);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || t("submission_failed"));
    }
  };

  const handleRetry = () => {
    setSubmitted(false);
    setSelectedOption(null);
    setResult(null);
  };

  if (loading) return <Spinner />;

  const canRetry = submitted && !result?.is_correct;

  return (
    <div className="task-page">
      {/* Sidebar */}
      <Block className="side-panel">
        <h4>{t("tasks")} {lesson?.name}</h4>
        <ul>
          {lesson?.tasks.map((t) => (
            <li
              key={t.id}
              className={`${t.id == taskId ? "current-task" : ""} side-panel__task`}
            >
              {t.order}. {t.name}
            </li>
          ))}
        </ul>
      </Block>

      {/* Task card */}
      <Block className="task-card">
        <h1>{task?.name}</h1>
        <p className="task-description">{task?.description}</p>

        {/* MCQ */}
        <div className="mcq-question">
          <h3>{mcq?.question}</h3>

          {["A", "B", "C", "D"].map((option) => (
            <label
              key={option}
              className={`mcq-option
                ${submitted && option === result?.answer && result?.is_correct ? "correct" : ""}
                ${submitted && option === selectedOption && !result?.is_correct ? "incorrect" : ""}
              `}
            >
              <span>{option}.</span>
              <input
                type="radio"
                name="mcq"
                value={option}
                disabled={submitted && result?.is_correct}
                onChange={() => setSelectedOption(option)}
                checked={selectedOption === option}
                className={`${selectedOption === option ? "correct-radio" : ""}`}
              />
              {mcq ? mcq[`option_${option.toLowerCase()}`] : ""}
            </label>
          ))}
        </div>

        {/* Action / Feedback */}
        {submitted && (
          <>
            <div className={`mcq-feedback-explanation ${result?.is_correct ? "success" : "error"}`}>
              <p>
                {result?.is_correct ? `${mcq?.correct_option}) ${t("correct")}` : t("incorrect")}
              </p>
              {error && <p>{error}</p>}
            </div>
            {mcq?.explanation && result?.is_correct && <div className="mcq-explanation"><p>{mcq.explanation}</p></div>}
          </>
        )}

        {/* Navigation */}
        <div className="nav-buttons">
          {!submitted ? (
            <Button onClick={handleSubmit} className="submit-btn" disabled={!selectedOption}>
              {t("submit_answer")}
            </Button>
          ) : (
            canRetry && (
              <Button className="try-again" onClick={handleRetry}>
                {t("try_again")}
              </Button>
            )
          )}
          <Button
            className="prev-btn"
            disabled={task?.order === 1}
            onClick={() => navigate(`/courses/${courseId}/learn/task/${Number(taskId) - 1}`)}
          >
            {t("previous")}
          </Button>
          <Button
            className="next-btn"
            disabled={task?.order === lesson?.tasks.length}
            onClick={() => navigate(`/courses/${courseId}/learn/task/${Number(taskId) + 1}`)}
          >
            {t("next")}
          </Button>
        </div>
      </Block>
    </div>
  );
}
