import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const CoursesPageController = {
    view: async (zen, request, response) => {
        const courses = await Course.getCourses(zen.db)
        await response.sendZenView(
            {"courses": courses}, "views/courses.html")
    }
}

export default CoursesPageController;