import { User } from "./index.js"

class AppUser extends User {
    
    constructor(db, name, email, password, id = 0) {
        super(db, "user", name, email, password, id)
    }

    static async getAppUserById(db, id) {
        const user = await User.getUserById(db, id)
        
        if (user.role != "user")
        {
            //verry bad things may happen
        }

        return new AppUser(user.db, user.name, user.email, user.password);
    }

    static async getAppUserByEmail(db, email) {
        const user = await User.getUserByEmail(db, id)

        if (user.role != "user")
        {
            //verry bad things may happen
        }

        return new AppUser(user.db, user.name, user.email, user.password);
    }

    static async deleteAppUserById(db, id) {

    }

    async create() {
        await super.create()
    }

    async update() {

    }

    async delete() {

    }
}

export default AppUser