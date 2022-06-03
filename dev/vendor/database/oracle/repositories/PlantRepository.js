import fs from "fs"

class PlantRepository {
    db

    constructor(db) {
        this.db = db;
    }

    async initRepoEnvironment() {
        try {
            const data = fs.readFileSync('vendor/database/oracle/plsql/PlantPackage.sql', 'utf8');
            const  sqlCommands = data.split("/* STATEMENT */;").join("#")
                                .split("/* STATEMENT */").join("#")
                                .split("#");
            
            for (const sqlCommand of sqlCommands) {
                console.log(sqlCommand)
                
                try {
                    const result = await this.db.execute(sqlCommand);
                    console.log(result)
                }
                catch(err) {
                    console.error(err);
                }
            }
        } 
        catch (err) {
            console.error(err);
        }
    }

    async create(id_user, id_plant_type, plant_name){
        try{
            const result = await this.db.execute(
                `SELECT plant_packege.add_plant(${id_user},${id_plant_type},'${plant_name}') 
                FROM DUAL`);
                console.log("I added a plant and had the following return");
                console.log(result);
                return result.rows[0][Object.keys(result.rows[0])[0]];///return the damn id
        }
        catch(err){
            console.log("The error is in create Plant Repo")
            console.log(err);
        }

    }

}

export default PlantRepository;