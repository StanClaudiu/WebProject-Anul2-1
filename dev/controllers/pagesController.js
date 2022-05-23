import { StatusCodes } from "http-status-codes"

const PagesController = {
    landingPage: async (zen, request, response) => {
        await response.sendZenView({}, "views/index.html")
    },

    coursePage: async (zen, request, response) => {
        await response.sendZenView({}, "views/course.html")
    },

    coursesPage: async (zen, request, response) => {
        await response.sendZenView({}, "views/courses.html")
    },

    leaderboardPage: async (zen, request, response) => {
        await response.sendZenView({}, "views/leaderboard.html")
    },

    favicon: async (zen, request, response) => {
        await response.sendFile("public/frontend/resources/favicon.ico")
    }
}

export default PagesController;