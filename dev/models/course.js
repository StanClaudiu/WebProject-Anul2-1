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

    static getIdByToken(db, token) {

    }

    static getCourseById(db, id) {
        const user = new User(db, 1, "user", "geni", "geani@gmail.com", "parola123")
        return user;
    }

    static deleteCourseById(db, id) {

    }

    create() {

    }

    update() {

    }

    delete() {

    }
}

export default Course