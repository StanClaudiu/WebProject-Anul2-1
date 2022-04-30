import { User } from "./index"

class AppUser extends User {
    
    constructor(db, id, name, email, password) {
        supper(db, "user", id, name, email, password)
    }

    static getAppUserById(db, id) {
        const user = User.getUserById(db, id)
        
        if (user.role != "user")
        {
            //verry bad things may happen
        }

        return new AppUser(user.db, user.name, user.email, user.password);
    }

    static deleteAppUserById(db, id) {

    }

    create() {

    }

    update() {

    }

    delete() {

    }
}

export default AppUser