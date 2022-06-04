import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const PagesController = {
    favicon: async (zen, request, response) => {
        await response.sendFile("public/frontend/resources/favicon.ico")
    }
}

export default PagesController;