import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const PagesController = {
    landingPage: async (zen, request, response) => {
        await response.sendZenView(zen.session, "views/index.html")
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

    myGardenPage: async (zen, request, response) => {
        await response.sendZenView({}, "views/myGarden.html")
    },

    adminPage: async (zen,request,response) => {
        await response.sendZenView({}, "views/adminPage.html")
    },

    favicon: async (zen, request, response) => {
        await response.sendFile("public/frontend/resources/favicon.ico")
    },

    test: async (zen, request, response) => {
        const curs = new Course(zen.db, "Acesta este cursul", "uite asa", "geani", "moraru", "aici")
        await curs.create()
        curs.content = "L-am schimbat"
        await curs.update()
        response.json(curs)
    }
}

export default PagesController;