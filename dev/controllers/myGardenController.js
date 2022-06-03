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
        let id_user = zen.session.user.id;
        let id_type = request.parameters.id;
        let userPlantsTyped = await Plant.getAllUserPlantByType(zen.db,id_user,id_type);
        console.log(userPlantsTyped);

        userPlantsTyped = userPlantsTyped.map (elem => elem.toPOJO());

        await response.status(200).json(userPlantsTyped);
        return response;
    },

    create: async (zen, request, response) => {
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