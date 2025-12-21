import api from "./api";

export default class TaskService {

  // Get single task
  static async getTask(taskId) {
    try {
      const response = await api.get(`courses/tasks/${taskId}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching task:", error);
      throw error;
    }
  }

  // (Optional) Get tasks by lesson if your API supports it
  static async getTasksByLesson(lessonId) {
    try {
      const response = await api.get(`courses/tasks/`, {
        params: { lesson: lessonId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching lesson tasks:", error);
      throw error;
    }
  }

  // Submit MCQ answer (MAIN METHOD)
  static async submitTaskAnswer(userId, taskId, answer) {
    try {
      const response = await api.post(
        `courses/tasks/${taskId}/submit/`,
        { answer,
          user_id: userId
         }
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting task answer:", error);
      throw error;
    }
  }

  static async getUserSubmission(userId, taskId) {
    try {
      const response = await api.get(`/courses/submissions/`, {
        params: { user: userId, task: taskId },
      });

      const submissions = response.data;
      console.log(submissions, "submissions")

      if (!submissions || submissions.length === 0) return null;

      // Assuming submissions are sorted by date, return the latest one
      const latestSubmission = submissions[submissions.length - 1];
      return latestSubmission;
    } catch (error) {
      console.error(
        `Error fetching submission for user ${userId} and task ${taskId}:`,
        error
      );
      return null;
    }
  }
}
