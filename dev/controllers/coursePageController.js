import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const buildCoursesTree = async (startingCourse) => {
    let rootCourse = {}

    if (startingCourse.parentCourseId == null) {
        rootCourse = startingCourse
    }
    else {
        rootCourse = await Course.getById(rootCourse.parentCourseId)
    }

    rootCourse.childCourses = await rootCourse.getChildCourses()
    return rootCourse
}

const CoursePageController = {

    view: async (zen, request, response) => {
        const course = await Course.getById(zen.db, request.parameters.id)
        await response.sendZenView(
            {"course": course, "courseTree": await buildCoursesTree(course)}, "views/course.html")
    }
}

export default CoursePageController;