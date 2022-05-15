import { StatusCodes } from "http-status-codes"
import { AppUser } from "../models/index.js"

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

    leaderboardPage: (zen, request, response) => {
        response.sendFile("public/frontend/pages/leaderboard.html")
    },

    favicon: (zen, request, response) => {
        response.sendFile("public/frontend/resources/favicon.ico")
    },

    login: (zen, request, response) => {
        const user = new AppUser(zen.db, "Radu", "radustefan11302@gmail.com", "123456789")

        user.create()

        response.json("all good")
    }
}

export default PagesController;