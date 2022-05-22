import { StatusCodes } from "http-status-codes"
import { hashSync, genSaltSync, compareSync } from "bcrypt"
import { User, AppUser, AppAdmin } from "../models/index.js"

const AuthController = {
    register: async (zen, request, response) => {
        const salt = genSaltSync(10)
        const hashedPassword = hashSync(request.body.fields["password"], salt)

        const appUser = new AppUser(zen.db, 
            request.body.fields["name"], 
            request.body.fields["email"], 
            hashedPassword)

        await appUser.create()

        response.json("all good")
    },

    login: async (zen, request, response) => {
        const user = await User.getUserByEmail(zen.db, request.body.fields["email"])

        console.log(user.password)
        console.log(request.body.fields["password"])
        console.log(compareSync(user.password, request.body.fields["password"]))
        
        if (user == null || !compareSync(user.password, request.body.fields["password"])) {
            response.json("invalid email or password")
            return
        }

        response.json("all good")
    }
}

export default AuthController;