class CourseProgress {
    db
    id
    userId
    courseId
    progress

    constructor(db, userId, courseId, progress=0, id = 0) {
        this.db = db
        this.id = id
        this.userId = userId
        this.courseId = courseId
        this.progress = progress
    }

    static async getByUserAndCourse(db, user_id, course_id) {
        const startedCoursesData = await db.startedCourseRepository.getByUserAndCourse(user_id, course_id)

        return startedCoursesData == null ? null : 
            new CourseProgress(db, 
                startedCoursesData["ID_USER"],
                startedCoursesData["ID_CURS"],
                startedCoursesData["PROGRESS"],
                startedCoursesData["ID_STATISTICS"]
            )
    }

    async create() {
        this.id = await this.db.startedCourseRepository.create(this.userId, this.courseId)
    }

    async update() {
        await this.db.startedCourseRepository.update(this.id, this.progress)
    }
}

export default CourseProgress