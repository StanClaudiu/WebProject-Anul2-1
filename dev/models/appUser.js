import { User } from "./index.js"

class AppUser extends User {
    
    constructor(db, name, email, password, id = 0) {
        super(db, "user", name, email, password, id)
    }

    static async getAppUserById(db, id) {
        const user = await User.getUserById(db, id)
        
        if (user == null || user.role != "user")
        {
            return null
        }

        return new AppUser(user.db, user.name, user.email, user.password, user.id);
    }

    static async getAppUserByEmail(db, email) {
        const user = await User.getUserByEmail(db, email)

        if (user == null || user.role != "user")
        {
            return null
        }

        return new AppUser(user.db, user.name, user.email, user.password, user.id);
    }
    
    static async getAppUsers(db) {
        const users = await User.getUsers(db);
        return users.filter(user => user.role == "user");
    }

    async create() {
        await super.create()
    }
}

export default AppUser