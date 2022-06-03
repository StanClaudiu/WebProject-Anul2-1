import { StatusCodes } from "http-status-codes"
import { Course, AppUser } from "../models/index.js"

const LeaderboardPageController = {
    view: async (zen, request, response) => {
        let users = await AppUser.getAppUsers(zen.db)

        for (let it = 0; it < users.length; it++) {
            let courses = await Course.getUserCourses(zen.db, users[it].id)

            let totalCoursesScore = 0

            for (let jt = 0; jt < courses.length; jt++) {
                totalCoursesScore += ((value) => value ? value : 0) (await courses[jt].getProgressForUser(users[it].id))
            }

            users[it].absolutePerformanceScore = totalCoursesScore
        }

        const maxAbsoluteScore = Math.max(...users.map(user => user.absolutePerformanceScore))

        let scoredUsers = users.map(user => {
            user.relativePerformanceScore = Math.trunc((user.absolutePerformanceScore / maxAbsoluteScore) * 100)
            return user;
        })

        scoredUsers.sort((lh, rh) => rh.absolutePerformanceScore - lh.absolutePerformanceScore)

        await response.sendZenView(
            {"scoredUsers": scoredUsers}, "views/leaderboard.html")
    }
}

export default LeaderboardPageController;