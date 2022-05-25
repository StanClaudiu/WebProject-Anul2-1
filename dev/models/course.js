class Course {
    db
    id
    parrentCourse
    content
    description
    name
    imgPath
    videoPath

    constructor(db, content, description, name, imgPath, videoPath= "null", parrentCourse = undefined,  id = 0) {
        this.db = db
        this.id = id
        this.parrentCourse = parrentCourse
        this.content = content
        this.description = description
        this.name = name
        this.imgPath = imgPath
        this.videoPath = videoPath
    }

    static async getIdByToken(db, token) {

    }

    static async getCourseById(db, id) {
        const user = await new User(db, 1, "user", "geni", "geani@gmail.com", "parola123")
        return user;
    }

    static async deleteCourseById(db, id) {

    }

    async create() {
        this.id = await this.db.courseRepository.create(
            this.parrentCourse != undefined ?  this.parrentCourse.id : "null", 
            this.content, this.description, this.name, this.imgPath, this.videoPath)
    }

    async update() {
        await this.db.courseRepository.update(
            this.id, this.parrentCourse != undefined ?  this.parrentCourse.id : "null",
            this.content, this.description, this.name, this.imgPath, this.videoPath)
    }

    async delete() {

    }
}

export default Course