import { StatusCodes } from "http-status-codes"

const PagesController = {
    landingPage: (zen, request, response) => {
        response.sendFile("public/frontend/pages/index.html")
    }
}

export default PagesController;