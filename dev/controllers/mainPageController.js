import { StatusCodes } from "http-status-codes"
import { Course, User } from "../models/index.js"

const MainPageController = {
    view: async (zen, request, response) => {
        const courses = (await Course.getCourses(zen.db)).
                        filter(course => course.parrentCourseId == null)
        
        const nrOfUsers = (await User.getUsers(zen.db)).length

        await response.sendZenView({"session": zen.session, 
                                    "courses": courses,
                                    "nrOfUsers": nrOfUsers}, "views/index.html")
    }
}

export default MainPageController;