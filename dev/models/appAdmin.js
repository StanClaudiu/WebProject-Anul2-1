import { User } from "./index.js"

class AppAdmin extends User {

    constructor(db, name, email, password, id = 0) {
        super(db, "admin", name, email, password, id)
    }

    static async getAppAdminById(db, id) {
        const user = await User.getUserById(db, id)
        
        if (user.role != "admin")
        {
            console.log("Role mismatch")
            return null
        }

        return new AppAdmin(user.db, user.name, user.email, user.password);
    }

    static async getAppAdminByEmail(db, email) {
        const user = await User.getUserByEmail(db, id)

        if (user.role != "admin")
        {
            console.log("Role mismatch")
            return null
        }

        return new AppAdmin(user.db, user.name, user.email, user.password);
    }

    async create() {
        await super.create()
    }
}

export default AppAdmin