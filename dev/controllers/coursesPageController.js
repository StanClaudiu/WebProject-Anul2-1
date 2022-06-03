import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const CoursesPageController = {
    view: async (zen, request, response) => {
        await Course.getUserCourses(zen.db, zen.session["user"].id)
        const courses = await Course.getCourses(zen.db)
        console.log(courses.length)
        await response.sendZenView(
            {"courses": courses}, "views/courses.html")
    }
}

export default CoursesPageController;