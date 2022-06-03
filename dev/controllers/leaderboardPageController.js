import { StatusCodes } from "http-status-codes"
import { Course, AppUser } from "../models/index.js"
import RSS from "rss"

const getUserStatistics = async (db) => {

    let users = await AppUser.getAppUsers(db)

    for (let it = 0; it < users.length; it++) {
        let courses = await Course.getUserCourses(db, users[it].id)

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

    return users;
} 

const getRssData = (userStatistics) => {
    const feed = new RSS({
        title: "Most active users on Gardening Web Tutor",
        description: "This feed provides statistics about the most active users on the Gardening Web Tutor application",
        author: "automated"
    });
    
    userStatistics.forEach(userStatistic => {

        feed.item({
            title: `Statistic for user : ${userStatistic.name}`,
            description: 'Absolute and relative score on user',
            date: (new Date()).getDate(),
            custom_elements: [
                {'absolutePerformanceScore': userStatistic.absolutePerformanceScore},
                {'relativePerformanceScore': userStatistic.relativePerformanceScore}
            ]
        });
    })

    return feed.xml({indent: true})
}

const LeaderboardPageController = {
    view: async (zen, request, response) => {
        const scoredUsers = await getUserStatistics(zen.db)

        await response.sendZenView(
            {"scoredUsers": scoredUsers}, "views/leaderboard.html")
    },

    rssFeed: async (zen, request, response) => {
        const scoredUsers = await getUserStatistics(zen.db)
        const rssData = getRssData(scoredUsers)

        await response.sendRaw(rssData, "application/rss+xml")
    }
}

export default LeaderboardPageController;