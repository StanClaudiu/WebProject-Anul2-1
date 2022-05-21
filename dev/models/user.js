class User {
    db
    id
    role
    name
    email
    password

    constructor(db, role, name, email, password, id = 0) {
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
        this.id = this.db.userRepository.create(this.role, this.name, this.email, this.password);
    }

    update() {

    }

    delete() {

    }
}

export default User