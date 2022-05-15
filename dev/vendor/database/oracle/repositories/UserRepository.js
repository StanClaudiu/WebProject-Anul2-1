import fs from "fs"

class UserRepository {
    db

    constructor(db) {
        this.db = db;
    }

    async initRepoEnvironment() {
        try {
            const data = fs.readFileSync('vendor/database/oracle/plsql/UserPackege.sql', 'utf8');
            console.log(data)
            const result = await this.db.execute(data);
            console.log(result)
        } 
        catch (err) {
            console.error(err);
        }
    }
}

export default UserRepository;