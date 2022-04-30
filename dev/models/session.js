class Session {
    db
    id
    token
    user

    constructor(db, id, token, user) {
        this.db = db
        this.id = id
        this.token = token
        this.user = user
    }

    static getIdByToken(db, token) {

    }

    static getSessionById(db, id) {
        const user = new User(db, 1, "user", "geni", "geani@gmail.com", "parola123")
        return user;
    }

    static deleteSessionById(db, id) {

    }

    create() {

    }

    update() {

    }

    delete() {

    }
}

export default Session