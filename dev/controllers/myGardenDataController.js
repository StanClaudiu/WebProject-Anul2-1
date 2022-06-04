import { StatusCodes } from "http-status-codes"
import { Plant, PlantType, Reminder } from "../models/index.js"
import fs from "fs"

const isIsInPlantTypes = (id, plantTypes) => {
    for (let it = 0; it < plantTypes.length; it++) {
        if (plantTypes[it].id == id) {
            return true;
        }
    }
    return false;
}

const MyGardenDataController = {

    download: async (zen, request, response) => {
        let data = []

        const userPlantTypes = await PlantType.getUserPlantTypes(zen.db, zen.session.user.id);

        userPlantTypes.forEach(userPlantType => {
            const userPlantTypePOJO = userPlantType.toPOJO()
            data.push(userPlantTypePOJO)
        });

        for (let it = 0; it < data.length; it++) {
            data[it].plantsOfType = 
                (await Plant.getAllUserPlantByType(zen.db, zen.session["user"].id, data[it].id)).map(plant => plant.toPOJO())
        }

        response.status(200).json(data)
    },

    upload: async (zen, request, response) => {
        const uploadedFile = request.body.files["file_app"]
        const uploadedData = fs.readFileSync(uploadedFile.filepath)

        const plantTypes = await PlantType.getPlantTypes(zen.db);

        const dictData = JSON.parse(uploadedData)

        for (let it = 0; it < dictData.length; it++) {
            if (isIsInPlantTypes(dictData[it].id, plantTypes)) {

                for (let jt = 0; jt < dictData[it]["plantsOfType"].length; jt++) {

                    const plantData = dictData[it]["plantsOfType"][jt]

                    const plant = new Plant(zen.db, 
                        plantData["id_plant_type"],
                        plantData["id_user"],
                        plantData["plant_name"] )
                    await plant.create()

                }
            }
        }

        response.redirect("/myGarden")
    }
}

export default MyGardenDataController;