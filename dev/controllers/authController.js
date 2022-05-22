import { StatusCodes } from "http-status-codes"
import { User, AppUser, AppAdmin } from "../models/index.js"

const AuthController = {
    register: async (zen, request, response) => {
        const appUser = new AppUser(zen.db, 
            request.body.fields["name"], 
            request.body.fields["email"], 
            request.body.fields["password"])

        await appUser.create()

        response.json("all good")
    },

    login: async (zen, request, response) => {
        const user = await User.getUserByEmail(zen.db, request.body.fields["email"])
        console.log(user)
        response.json("all good")
    }
}

export default AuthController;