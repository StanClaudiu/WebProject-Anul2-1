import { StatusCodes } from "http-status-codes"
import { AppUser } from "../models/index.js"

const AuthController = {
    register: (zen, request, response) => {
        const user = new AppUser(zen.db, 
            request.body.fields["name"], 
            request.body.fields["email"], 
            request.body.fields["password"])

        user.create()

        response.json("all good")
    },

    login: (zen, request, response) => {
        const user = new AppUser(zen.db, "Radu", "radustefan11302@gmail.com", "123456789")

        user.create()

        response.json("all good")
    }
}

export default AuthController;