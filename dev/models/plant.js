class Plant  {
    db
    id
    id_plant_type
    id_user
    plant_name

    constructor(db, id_plant_type, id_user, plant_name,id)
    {
        this.db = db;
        this.id_plant_type = id_plant_type;
        this.id_user = id_user;
        this.plant_name = plant_name;
        this.id = id;
        
    }

    async create() {
        if(this.db) console.log("DA!")
        else
                     console.log(this.db);
        this.id = await this.db.plantRepository.create( this.id_user, 
                                                        this.id_plant_type,
                                                        this.plant_name)                                                    
    }

    static async getAllUserPlantByType(db,id_user,id_type){
        const typedPlants = await db.plantRepository.getAllUserPlantsByType(id_user,id_type);
        const result = typedPlants.map( row => new Plant (db,
                                                          id_type,
                                                          id_user,
                                                          row["NAME"],
                                                          row["ID"]
                                                           ));
            return result;
    }

    toPOJO(){
        return {
            "id" : this.id,
            "id_plant_type" : this.id_plant_type,
            "id_user" : this.id_user,
            "plant_name" : this.plant_name
        }
    }
}

export default Plant