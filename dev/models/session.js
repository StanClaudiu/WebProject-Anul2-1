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

    static async getIdByToken(db, token) {

    }

    static async getSessionById(db, id) {
        const user = await new User(db, 1, "user", "geni", "geani@gmail.com", "parola123")
        return user;
    }

    static async deleteSessionById(db, id) {

    }

    async create() {

    }

    async update() {

    }

    async delete() {

    }
}

export default Session