import { StatusCodes } from "http-status-codes"

const PagesController = {
    landingPage: (zen, request, response) => {
        response.sendFile("public/frontend/pages/index.html")
    },

    favicon: (zen, request, response) => {
        response.sendFile("public/frontend/resources/favicon.ico")
    }
}

export default PagesController;