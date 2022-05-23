class Course {
    db
    id
    name
    parrentCourse
    description
    videoLink

    constructor(db, id, name, parrentCourse, description, videoLink) {
        this.db = db
        this.id = id
        this.name = name
        this.parrentCourse = parrentCourse
        this.description = description
        this.videoLink = videoLink
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

    }

    async update() {

    }

    async delete() {

    }
}

export default Course