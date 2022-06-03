class Plant  {
    db
    id
    id_plant_type
    id_user
    plant_name

    constructor(db, id_plant_type, id_user, plant_name)
    {
        this.db = db;
        this.id_plant_type = id_plant_type;
        this.id_user = id_user;
        this.plant_name = plant_name;
        
    }

    async create() {
        if(this.db) console.log("DA!")
        else
                     console.log(this.db);
        this.id = await this.db.plantRepository.create( this.id_user, 
                                                        this.id_plant_type,
                                                        this.plant_name)                                                    
    }
}

export default Plant