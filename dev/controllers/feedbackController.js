import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const FeedbackController = {
    giveFeedback: async (zen, request, response) => {
        zen.sendMail(request.body.fields["email"], "Thank you for your feedback", 
        `This is the feedback you sent \n ${request.body.fields["body"]}`)

        await response.redirect("/main")
    }
}

export default FeedbackController;