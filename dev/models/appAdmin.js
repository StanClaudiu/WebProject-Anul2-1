import { User } from "./index.js"

class AppAdmin extends User {

    constructor(db, name, email, password, id = 0) {
        super(db, "admin", name, email, password, id)
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
        super.create()
    }

    update() {

    }

    delete() {

    }
}

export default AppAdmin