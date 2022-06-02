import { StatusCodes } from "http-status-codes"
import { Plant, PlantType } from "../models/index.js"

const MyGardenPageController = {

    view: async (zen, request, response) => {

        let plantTypes = await PlantType.getPlantTypes(zen.db);
        console.log(plantTypes);
        response.sendZenView({"plantTypes": plantTypes },"views/myGarden.html");///because Content-Type text/html browserul stie ce sa faca cu ea
        ////aici imi formateaza frumos response-ul si actioneaza pe @@zen
        
        return response;
    },


    read: async (zen, request, response) => {
        response.status(201).json({"salut":"ceFaci"});
        

        return response;
    },

    create: async (zen, request, response) => {
         console.log("I came at some point in here-----------------||||||||||----------");
         console.log(request.body.fields);
         let myPlant = new Plant(zen.db,null,zen.session.user.id,request.body.fields.name_of_plant);
        
         ///momentan aducem aici plantele ... trebuie facut type-urile

         await response.redirect(`/myGarden`); //move me there...deci faci si request
       
         // in raspuns ii spune, boss te duci aici acum
       
         return response;
    }


    

   
}

export default MyGardenPageController;