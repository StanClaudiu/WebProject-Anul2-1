import { AppAdmin } from "./../models/index.js" 
import { hashSync, genSaltSync, compareSync } from "bcrypt"


const SeedAdmins = async (db) => {
    const salt = genSaltSync(10)
    
    const delia = new AppAdmin (db, "Delia", "deliagrigorita@yahoo.com", hashSync("123456789", salt))
    const radu = new AppAdmin (db, "Radu", "radustefan1302@gmail.com",  hashSync("123456789", salt))
    const claudiu = new AppAdmin (db, "Claudiu", "claudiustan@gmail.com",  hashSync("123456789", salt))

    await delia.create()
    await radu.create()
    await claudiu.create()
}

export default SeedAdmins