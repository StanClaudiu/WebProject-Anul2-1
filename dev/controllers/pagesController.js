import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const PagesController = {
    landingPage: async (zen, request, response) => {
        await response.sendZenView(zen.session, "views/index.html")
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