import { StatusCodes } from "http-status-codes"

const PagesController = {
    landingPage: (zen, request, response) => {
        response.sendFile("public/landing_page.html")
    }
}

export default PagesController;