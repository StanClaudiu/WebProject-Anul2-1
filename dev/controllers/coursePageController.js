import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const buildCoursesTree = async (db, startingCourse) => {
    let rootCourse = {}

    if (startingCourse.parrentCourseId == null) {
        rootCourse = startingCourse
    }
    else {
        rootCourse = await Course.getById(db, startingCourse.parrentCourseId)
    }

    rootCourse.childCourses = await rootCourse.getChildCourses()
    return rootCourse
}

const CoursePageController = {

    view: async (zen, request, response) => {
        const course = await Course.getById(zen.db, request.parameters.id)
        
        if (await course.getProgressForUser(zen.session["user"].id) == null) {
            course.startProgressForUser(zen.session["user"].id)
        }

        await response.sendZenView(
            {"course": course, "courseTree": await buildCoursesTree(zen.db, course)}, "views/course.html")
    }
}

export default CoursePageController;