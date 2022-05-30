import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const CoursePageController = {

    view: async (zen, request, response) => {
        const course = await Course.getById(zen.db, request.parameters.id)
        await response.sendZenView(
            {"course": course}, "views/course.html")
    }
}

export default CoursePageController;