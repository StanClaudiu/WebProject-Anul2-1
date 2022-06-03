class Course {
    db
    id
    parrentCourseId
    content
    description
    name
    duration
    imgPath
    videoPath

    constructor(db, content, description, name, duration, imgPath, videoPath= "null", parrentCourseId = null,  id = 0) {
        this.db = db
        this.id = id
        this.parrentCourseId = parrentCourseId
        this.content = content
        this.description = description
        this.name = name
        this.duration = duration
        this.imgPath = imgPath
        this.videoPath = videoPath
    }

    static async getCourses(db) {
        const coursesData = await db.courseRepository.get()
        const courses = coursesData.map(courseData => 
            new Course(db, 
                courseData["COURSE_CONTENT"],
                courseData["DESCRIPTION_COURSE"],
                courseData["COURSE_NAME"],
                courseData["COURSE_DURATION"],
                courseData["IMAGE_PATH_DOWNLOAD"],
                courseData["COURSE_VIDEO_PATH"],
                courseData["PARENT_ID"],
                courseData["ID_CURS"]
            )
        );
        return courses
    }

    static async getById(db, id) {
        const courseData = await db.courseRepository.getById(id)

        return courseData == null ? null : 
            new Course(db, 
                courseData["COURSE_CONTENT"],
                courseData["DESCRIPTION_COURSE"],
                courseData["COURSE_NAME"],
                courseData["COURSE_DURATION"],
                courseData["IMAGE_PATH_DOWNLOAD"],
                courseData["COURSE_VIDEO_PATH"],
                courseData["PARENT_ID"],
                courseData["ID_CURS"]
            )
    }

    static async deleteById(db, id) {
        await db.courseRepository.delete_course_by_id(id)
    }

    static async getUserCourses(db, course_id) {
        const userCoursesData = await db.startedCourseRepository.getAllStartedCourses(course_id)

        const userCourses = userCoursesData.map(userCourseData => 
            new Course(db, 
                userCourseData["COURSE_CONTENT"],
                userCourseData["DESCRIPTION_COURSE"],
                userCourseData["COURSE_NAME"],
                userCourseData["COURSE_DURATION"],
                userCourseData["IMAGE_PATH_DOWNLOAD"],
                userCourseData["COURSE_VIDEO_PATH"],
                userCourseData["PARENT_ID"],
                userCourseData["ID_CURS"]
            )
        );
        return userCourses;
    }

    static async getStartedByUserAndCourse(db, user_id, course_id) {
        const startedCoursesData = await db.startedCourseRepository.getByUserAndCourse(user_id, course_id)

        return startedCoursesData == null ? null : 
            new Course(db, 
                startedCoursesData["COURSE_CONTENT"],
                startedCoursesData["DESCRIPTION_COURSE"],
                startedCoursesData["COURSE_NAME"],
                startedCoursesData["COURSE_DURATION"],
                startedCoursesData["IMAGE_PATH_DOWNLOAD"],
                startedCoursesData["COURSE_VIDEO_PATH"],
                startedCoursesData["PARENT_ID"],
                startedCoursesData["ID_CURS"]
            )
    }

    async create() {
        this.id = await this.db.courseRepository.create(
            this.parrentCourseId != null ?  this.parrentCourseId : "null", 
            this.content, this.description, this.name, this.duration, this.imgPath, this.videoPath)
    }

    async update() {
        await this.db.courseRepository.update(
            this.id, this.parrentCourseId != null ?  this.parrentCourseId : "null",
            this.content, this.description, this.name, this.duration, this.imgPath, this.videoPath)
    }

    async getChildCourses() {
        const coursesData = await this.db.courseRepository.getByParentId(this.id)
        const courses = coursesData.map(courseData => 
            new Course(this.db, 
                courseData["COURSE_CONTENT"],
                courseData["DESCRIPTION_COURSE"],
                courseData["COURSE_NAME"],
                courseData["COURSE_DURATION"],
                courseData["IMAGE_PATH_DOWNLOAD"],
                courseData["COURSE_VIDEO_PATH"],
                courseData["PARENT_ID"],
                courseData["ID_CURS"]
            )
        );
        return courses
    }

    toPOJO() {
        return {
            "id": this.id,
            "parrentCourseId": this.parrentCourseId,
            "content": this.content,
            "description": this.description,
            "name": this.name,
            "duration": this.duration,
            "imgPath": this.imgPath,
            "videoPath": this.videoPath
        }
    }
}

export default Course