import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const CoursesPageController = {
    view: async (zen, request, response) => {
        let courses = await Course.getCourses(zen.db)
        
        for (let it = 0; it < courses.length; it++) {
            courses[it].computedProgress = await courses[it].getProgressForUser(zen.session["user"].id);
        }

        await response.sendZenView(
            {"courses": courses}, "views/courses.html")
    }
}

export default CoursesPageController;