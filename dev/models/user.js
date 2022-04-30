class User {
    db
    id
    role
    name
    email
    password

    constructor(db, id, role, name, email, password) {
        this.db = db
        this.id = id
        this.role = role
        this.name = name
        this.email = email
        this.password = password
    }

    static getUserById(db, id) {
        const user = new User(db, 1, "user", "geni", "geani@gmail.com", "parola123")
        return user;
    }

    static deleteUserById(db, id) {

    }

    create() {

    }

    update() {

    }

    delete() {

    }
}

export default User