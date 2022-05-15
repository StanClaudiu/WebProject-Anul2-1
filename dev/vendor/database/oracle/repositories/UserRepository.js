import fs from "fs"

class UserRepository {
    db

    constructor(db) {
        this.db = db;
    }

    async initRepoEnvironment() {
        try {
            const data = fs.readFileSync('vendor/database/oracle/plsql/UserPackege.sql', 'utf8');
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

    async create(role, name, email, password) {
        try {
            const result = await this.db.execute(
                `SELECT user_packege.add_user('${role}', '${name}', '${email}', '${password}') FROM DUAL`);
            console.log(result)
        }
        catch (err) {
            console.log(err);
        }
    }
}

export default UserRepository;