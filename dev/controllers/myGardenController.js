import { StatusCodes } from "http-status-codes"
import { Plant, PlantType } from "../models/index.js"

const MyGardenPageController = {

    view: async (zen, request, response) => {

        let userPlantTypes = await PlantType.getUserPlantTypes(zen.db,zen.session.user.id);
        let plantTypes = await PlantType.getPlantTypes(zen.db);
        console.log(plantTypes);
        response.sendZenView({"plantTypes": plantTypes , "userPlantTypes" : userPlantTypes},"views/myGarden.html");///because Content-Type text/html browserul stie ce sa faca cu ea
        ////aici imi formateaza frumos response-ul si actioneaza pe @@zen
        
        return response;
    },


    read: async (zen, request, response) => {
        response.status(201).json({"salut":"ceFaci"});
        

        return response;
    },

    create: async (zen, request, response) => {
         console.log("I came at some point in here-----------------||||||||||----------");
         console.log(request.body.fields.type_of_plant);
         let myPlant = new Plant(zen.db,
                                parseInt(request.body.fields.type_of_plant),
                                zen.session.user.id,
                                request.body.fields.name_of_plant);
         console.log(myPlant);
         await myPlant.create();

         await response.redirect(`/myGarden`); //move me there...deci faci si request
              
         return response;
    }


    

   
}

export default MyGardenPageController;