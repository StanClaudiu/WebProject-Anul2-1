import { StatusCodes } from "http-status-codes"
import { Course } from "../models/index.js"

const MyGardenPageController = {

    view: async (zen, request, response) => {
        response.sendZenView({"mama":"tata"},"views/myGarden.html");
    },

   
}

export default MyGardenPageController;