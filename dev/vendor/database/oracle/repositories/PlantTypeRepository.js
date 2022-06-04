import fs from "fs"

class PlantTypeRepository {
    db

    constructor(db) {
        this.db = db;
    }

    async initRepoEnvironment() {
        try {
            const data = fs.readFileSync('vendor/database/oracle/plsql/PlantTypePackage.sql', 'utf8');
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

    async create(plantTypeName, imageLink) {
        try {
            const result = await this.db.execute(
                `SELECT plant_type_packege.add_plant_type('${plantTypeName}', '${imageLink}') FROM DUAL`);
                           
            console.log(result);
            return result.rows[0][Object.keys(result.rows[0])[0]]; 
        }
        catch (err) {
            console.log(err);
        }
    }

    async getAllPlantsTypes() {
        try {
            const result = await this.db.execute(
                `SELECT * FROM TABLE (plant_type_packege.get_plant_types())`
            );
            console.log(result);
            return result.rows;

        }
        catch(err)
        {
            console.log(err);
        }
    }

    async getAllUserPlantTypes(id_user) {
        try {
            const result = await this.db.execute(
                `SELECT * FROM TABLE  (plant_type_packege.get_plant_type_by_id_user(${id_user}))`);
            console.log("Uite ce am primit aici!")
            console.log(result);
            return result.rows;
        }
        catch(err){
            console.log(err);
        }
    }

}

export default PlantTypeRepository;