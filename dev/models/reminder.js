class Reminder  {
    db
    id
    id_plant
    content

    constructor(db, id_plant, content, id)
    {
        this.db = db;
        this.id_plant = id_plant;
        this.content = content;
        this.id = id;
        
    }

    async create() {
            const result = await this.db.plantRepository.create(id_plant,content);               
            return result;
        }

    static async getById(db,id){
       const reminder = await db.plantRepository.getById(id);
       
       return reminder==null? null: new Reminder(
           db,
           reminder["ID_PLANT"],
           reminder["CONTENT"],
           reminder["ID"]
       )
       
    }

    static async getByUserId(db,id){
        const remindersRaw = await db.reminderRepository.getByUserId(id);
        const reminders = remindersRaw.map(row=>new Reminder(
            db,
            row["ID_PLANT"],
            row["CONTENT"],
            row["ID"],
        ));
        return reminders;
    }

    static async deleteById(db,id) {
        await db.plantRepository.deleteById(id);
    }

    toPOJO(){
        return {
            "id" : this.id,
            "id_plant" : this.id_plant,
            "content" : this.content
        }
    }
}

export default Reminder