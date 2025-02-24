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

    static async getUserById(db, id) {
        const userDetails = await db.userRepository.getById(id)
        return userDetails == null ? null : 
            new User(db, userDetails["ROLE"], userDetails["NAME"], userDetails["EMAIL"], userDetails["PASSWORD"], userDetails["ID"])
    }

    static async getUserByEmail(db, email) {
        const userDetails = await db.userRepository.getByEmail(email)
        return userDetails == null ? null :
            new User(db, userDetails["ROLE"], userDetails["NAME"], userDetails["EMAIL"], userDetails["PASSWORD"], userDetails["ID"])
    }

    static async getUsers(db) {
        const usersData = await db.userRepository.get()

        const users = usersData.map(userData => 
            new User(db, 
                userData["ROLE"], 
                userData["NAME"], 
                userData["EMAIL"], 
                userData["PASSWORD"], 
                userData["ID"]
            )
        );
        return users;
    }

    async create() {
        this.id = await this.db.userRepository.create(this.role, this.name, this.email, this.password);
    }
}

export default User