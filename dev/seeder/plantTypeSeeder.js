import { PlantType } from "../models/index.js" 

const SeedPlantTypes = async (db, fileManager) => {
    
    const coniferePathImage = fileManager.populate('seeder/images/conifere.jpg')
    const conifere = new PlantType(db, "Conifere", coniferePathImage)

    const foioasePathImage = fileManager.populate('seeder/images/foioase.jpg')
    const foioase = new PlantType(db, "Foioase", foioasePathImage)
    
    const fructePathImage = fileManager.populate('seeder/images/fructe.jpg')
    const fructe = new PlantType(db, "Fructe", foioasePathImage)

    const legumePathImage = fileManager.populate('seeder/images/legume.jpg')
    const legume = new PlantType(db, "Legume", legumePathImage)

    
    await conifere.create()
    await foioase.create()
    await fructe.create()
    await legume.create()
}

export default SeedPlantTypes