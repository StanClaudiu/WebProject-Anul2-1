import { StatusCodes } from "http-status-codes"
import { hashSync, genSaltSync, compareSync } from "bcrypt"
import jwt from 'jsonwebtoken';
import { User, AppUser, AppAdmin } from "../models/index.js"

const setAuthTokenForUser = (user, response) => {
    const authToken = jwt.sign (
        {role: user.role, name: user.name, email: user.email}, 
        process.env.SECURITY_SECRET_KEY, {
            expiresIn: "24h"
        }
    )
    response.setCookie("authToken", authToken)
    return true
}

const AuthController = {
    register: async (zen, request, response) => {
        const salt = genSaltSync(10)
        const hashedPassword = hashSync(request.body.fields["password"], salt)

        const appUser = new AppUser(zen.db, 
            request.body.fields["name"], 
            request.body.fields["email"], 
            hashedPassword)

        await appUser.create()

        if (!setAuthTokenForUser(appUser, response)) {
            response.json("failiure")
            return
        }

        response.json("all good")
    },

    login: async (zen, request, response) => {
        const user = await User.getUserByEmail(zen.db, request.body.fields["email"])

        if (user == null || !compareSync(request.body.fields["password"], user.password)) {
            response.json("invalid email or password")
            return
        }

        if (!setAuthTokenForUser(user, response)) {
            response.json("failiure")
            return
        }

        response.json("all good")
    }
}

export default AuthController;