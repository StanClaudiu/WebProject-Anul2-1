import UserPackege from "./../plsql/UserPackege.sql";

class UserRepository {
    db

    constructor(db) {
        this.db = db;
    }

    async initRepo() {
        console.log(UserPackege)
        const result = await this.db.execute('select user, systimestamp from dual');
        
        console.log(result)
        const user = result.rows[0].USER;
        const date = result.rows[0].SYSTIMESTAMP;

        console.log(user)
        console.log(date)

    }
}

export default UserRepository;