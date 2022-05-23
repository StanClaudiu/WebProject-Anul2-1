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
            
            console.log(result);
            return result.rows[0][Object.keys(result.rows[0])[0]]; //the id
        }
        catch (err) {
            console.log(err);
        }
    }

    async getById(id) {
        try {
            const result = await this.db.execute(
                `SELECT * from TABLE( user_packege.get_user_by_id('${id}'))`);
            
            console.log(result);
            return result.rows.length == 0 ? null : result.rows[0]; //the id
        }
        catch (err) {
            console.log(err);
        }
    }

    async getByEmail(email) {
        try {
            const result = await this.db.execute(
                `SELECT * from TABLE( user_packege.get_user_by_email('${email}'))`);
            
            console.log(result);
            return result.rows.length == 0 ? null : result.rows[0]; //the id
        }
        catch (err) {
            console.log(err);
        }
    }
}

export default UserRepository;