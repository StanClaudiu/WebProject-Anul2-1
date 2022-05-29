import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const AdminPageController = {

    view: async (zen, request, response) => {
        Course.getCourses(zen.db)

        await response.sendZenView({}, "views/adminPage.html")
    },
    
    create: async (zen, request, response) => {
        zen.fileManager.upload(request.body.files["image"])

        await response.sendZenView({}, "views/adminPage.html")
    }
}

export default AdminPageController;