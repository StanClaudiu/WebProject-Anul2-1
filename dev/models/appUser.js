import { User } from "./index.js"

class AppUser extends User {
    
    constructor(db, name, email, password, id = 0) {
        super(db, "user", name, email, password, id)
    }

    static getAppUserById(db, id) {
        const user = User.getUserById(db, id)
        
        if (user.role != "user")
        {
            //verry bad things may happen
        }

        return new AppUser(user.db, user.name, user.email, user.password);
    }

    static getAppUserByEmail(db, email) {
        const user = User.getUserByEmail(db, id)

        if (user.role != "user")
        {
            //verry bad things may happen
        }

        return new AppUser(user.db, user.name, user.email, user.password);
    }

    static deleteAppUserById(db, id) {

    }

    create() {
        super.create()
    }

    update() {

    }

    delete() {

    }
}

export default AppUser