import api from "./api";

export default class MCQService {
  static async getMCQByTaskId(taskId = null) {
    try {
      const params = taskId ? { task: taskId } : {};
      const response = await api.get("courses/mcqs/", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching MCQs:", error);
      throw error;
    }
  }

}
