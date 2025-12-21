import api from "./api"


export default class CourseListService {
  static async getCourses(params = {}) {
    // params can include: search, name, difficulty_level
    const response = await api.get("courses/courses/", { params });
    return response.data;
  }

  static async getCourse(id) {
    const response = await api.get(`courses/courses/${id}/`)
    return response.data
  }

  static async createCourse(data) {
    const response = await api.post("courses/", data);
    return response.data;
  }

  static async updateCourse(id, data) {
    const response = await api.put(`courses/${id}/`, data);
    return response.data;
  }

  static async deleteCourse(id) {
    const response = await api.delete(`courses/${id}/`);
    return response.data;
  }
}
