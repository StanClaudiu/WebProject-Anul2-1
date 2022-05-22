import { StatusCodes } from "http-status-codes"

const PagesController = {
    landingPage: async (zen, request, response) => {
        await response.sendFile("public/frontend/pages/index.html")
    },

    coursePage: async (zen, request, response) => {
        await response.sendFile("public/frontend/pages/course.html")
    },

    coursesPage: async (zen, request, response) => {
        await response.sendFile("public/frontend/pages/courses.html")
    },

    leaderboardPage: async (zen, request, response) => {
        await response.sendFile("public/frontend/pages/leaderboard.html")
    },

    favicon: async (zen, request, response) => {
        await response.sendFile("public/frontend/resources/favicon.ico")
    }
}

export default PagesController;