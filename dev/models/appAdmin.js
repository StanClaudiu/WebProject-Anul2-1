import { User } from "./index"

class AppAdmin extends User {

    constructor(db, id, name, email, password) {
        supper(db, "admin", id, name, email, password)
    }

    static getAppAdminById(db, id) {
        const user = User.getUserById(db, id)
        
        if (user.role != "admin")
        {
            //verry bad things may happen
        }

        return new AppAdmin(user.db, user.name, user.email, user.password);
    }

    static deleteAppAdminById(db, id) {

    }

    create() {

    }

    update() {

    }

    delete() {

    }
}

export default AppAdmin