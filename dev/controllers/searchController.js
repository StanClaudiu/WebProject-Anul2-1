import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const SearchController = {

    search: async (zen, request, response) => {

        let courses = await Course.getCourses(zen.db)
        
        for (let it = 0; it < courses.length; it++) {
            courses[it].computedProgress = await courses[it].getProgressForUser(zen.session["user"].id);
        }

        let foundCourses = null;

        if (request.body.fields["searchName"] == '') {
            foundCourses = courses
        }
        else
        {
            foundCourses = courses.filter(course => course.name.toLowerCase().includes(request.body.fields["searchName"].toLowerCase())) 
        }

        const constructedCourses = foundCourses.map(foundCourse => 
            {
                let coursePlainData = foundCourse.toPOJO()
                coursePlainData.computedProgress = foundCourse.computedProgress
                return coursePlainData
            })

        await response.status(200).json ({"courses": constructedCourses})
    } 
}

export default SearchController;