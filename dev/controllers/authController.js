import { StatusCodes } from "http-status-codes"
import { User, AppUser, AppAdmin } from "../models/index.js"

const AuthController = {
    register: (zen, request, response) => {
        const appUser = new AppUser(zen.db, 
            request.body.fields["name"], 
            request.body.fields["email"], 
            request.body.fields["password"])

        appUser.create()

        response.json("all good")
    },

    login: (zen, request, response) => {
        const user = User.getUserByEmail(zen.db, request.body.fields["email"])

        response.json("all good")
    }
}

export default AuthController;