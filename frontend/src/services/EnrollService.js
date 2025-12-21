import api from "./api";

export default class EnrollService {
  static async getEnrollmentsByCourse(courseId) {
    const response = await api.get(`courses/enrollments?search=${courseId}`);
    return response.data;
  }
  static async getEnrollmentsByUser(userId) {
    const response = await api.get(`courses/enrollments?search=${userId}`);
    return response.data;
  }
  static async enroll(userId, courseId) {
    const response = await api.post(`courses/enrollments/`, {
      course: courseId,
      user: userId,
    });
    return response.data;
  }
  static async checkEnrollment(userId, courseId) {
    const response = await api.get("courses/enrollments/", {
      params: { user: userId, course: courseId }
    });
    console.log("Check enrollment", response.data)
    return response.data.length > 0; // returns true if enrollment exists
  }

  static async dropCourse(enrollmentId) {
    const response = await api.delete(`courses/enrollments/${enrollmentId}/`)
    return response.data
  }
}
