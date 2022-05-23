import { User } from "./index.js"

class AppAdmin extends User {

    constructor(db, name, email, password, id = 0) {
        super(db, "admin", name, email, password, id)
    }

    static async getAppAdminById(db, id) {
        const user = await User.getUserById(db, id)
        
        if (user != null || user.role != "admin")
        {
            return null
        }

        return new AppAdmin(user.db, user.name, user.email, user.password, user.id);
    }

    static async getAppAdminByEmail(db, email) {
        const user = await User.getUserByEmail(db, email)

        if (user != null || user.role != "admin")
        {
            return null
        }

        return new AppAdmin(user.db, user.name, user.email, user.password, user.id);
    }

    async create() {
        await super.create()
    }
}

export default AppAdmin