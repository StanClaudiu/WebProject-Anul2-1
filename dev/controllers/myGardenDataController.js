import { StatusCodes } from "http-status-codes"
import { Plant, PlantType, Reminder } from "../models/index.js"

const MyGardenDataController = {

    download: async (zen, request, response) => {
        let data = []

        const userPlantTypes = await PlantType.getUserPlantTypes(zen.db, zen.session.user.id);

        userPlantTypes.forEach(userPlantType => {
            userPlantTypePOJO = userPlantType.toPOJO()
            userPlantTypePOJO.plantsOfType = 
                (await Plant.getAllUserPlantByType(zen.db,id_user,id_type)).map(plant => plant.toPOJO())

            data.push(userPlantTypePOJO)
        });

        response.status(200).json(data)
    },

    upload: async (zen, request, response) => {

        let userPlantTypes = await PlantType.getUserPlantTypes(zen.db,zen.session.user.id);
        let plantTypes = await PlantType.getPlantTypes(zen.db);
        console.log(plantTypes);
     
        let reminders = await Reminder.getByUserId(zen.db,zen.session.user.id);
        console.log(reminders);
        
     
        response.sendZenView({"plantTypes": plantTypes , "userPlantTypes" : userPlantTypes,"reminders":reminders},"views/myGarden.html");
        
        return response;
    }
}

export default MyGardenDataController;