import { StatusCodes } from "http-status-codes"

const PagesController = {
    landingPage: (zen, request, response) => {
        response.sendFile("public/frontend/pages/index.html")
    },

    coursePage: (zen, request, response) => {
        response.sendFile("public/frontend/pages/course.html")
    },

    coursesPage: (zen, request, response) => {
        response.sendFile("public/frontend/pages/courses.html")
    },

    favicon: (zen, request, response) => {
        response.sendFile("public/frontend/resources/favicon.ico")
    }
}

export default PagesController;