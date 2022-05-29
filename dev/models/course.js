class Course {
    db
    id
    parrentCourse
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
        await db.courseRepository.get()
    }

    static async getCourseById(db, id) {
        const user = await new User(db, 1, "user", "geni", "geani@gmail.com", "parola123")
        return user;
    }

    static async deleteCourseById(db, id) {

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

    async delete() {

    }
}

export default Course