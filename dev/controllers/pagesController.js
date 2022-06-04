import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const PagesController = {
    coursesPage: async (zen, request, response) => {
        await response.sendZenView({}, "views/courses.html")
    },

    myGardenPage: async (zen, request, response) => {
        await response.sendZenView({}, "views/myGarden.html")
    },

    favicon: async (zen, request, response) => {
        await response.sendFile("public/frontend/resources/favicon.ico")
    }
}

export default PagesController;