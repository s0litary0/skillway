import api from "./api"

export default class LessonListService {
    static async getLessonsByCourseId(courseId) {
        const response = await api.get(`courses/lessons`, { course: courseId})
        return response.data
    }

    static async getLessonById(lessonId) {
        const response = await api.get(`courses/lessons/${lessonId}`)
        return response.data
    }

    // static async getCurrentLesson(le)
}