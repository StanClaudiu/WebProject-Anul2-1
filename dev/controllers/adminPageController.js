import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const AdminPageController = {

    view: async (zen, request, response) => {
        let courses = await Course.getCourses(zen.db)

        for (let it = 0; it < courses.length; it++) {
            courses[it].nrOfChildren = (await courses[it].getChildCourses()).length;
        }

        const parentCourses = courses.filter(course => course.parrentCourseId == null)

        await response.sendZenView(
            {"courses": courses, "parentCourses": parentCourses}, "views/adminPage.html")
    },

    read: async (zen, request, response) => {
        const course = await Course.getById(zen.db, request.parameters.id)
        response.status(200).json(course.toPOJO())
    },
    
    create: async (zen, request, response) => {
        const uploadImageURL = await zen.fileManager.upload(request.body.files["image"])
        const uploadVideoURL = await zen.fileManager.upload(request.body.files["video"])

        const course = new Course(zen.db, request.body.fields["content"], 
                                request.body.fields["description"], request.body.fields["name"],
                                request.body.fields["duration"], uploadImageURL, uploadVideoURL,
                                request.body.fields["parrentCourse"])
        
        await course.create()

        await response.redirect("/adminPage")
    },

    update: async (zen, request, response) => {
        const course = await Course.getById(zen.db, request.parameters.id)

        if ("image" in request.body.files) {
            course.imgPath = await zen.fileManager.upload(request.body.files["image"])
        }

        if ("video" in request.body.files) {
            course.videoPath = await zen.fileManager.upload(request.body.files["video"])
        }

        course.parrentCourseId = request.body.fields["parrentCourse"]
        course.content = request.body.fields["content"]
        course.description = request.body.fields["description"]
        course.name = request.body.fields["name"]
        course.duration = request.body.fields["duration"]

        await course.update()

        await response.redirect("/adminPage")
    },

    delete: async (zen, request, response) => {
        await Course.deleteById(zen.db, request.parameters.id)
        await response.redirect("/adminPage")
    }
}

export default AdminPageController;