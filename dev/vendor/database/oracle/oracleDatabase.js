import oracledb from 'oracledb'; 
import { UserRepository,
         AppUserRepository,
         AppAdminRepository,
         CourseRepository,
         SessionRepository
        } from './repositories/index.js'
import "dotenv/config";

class OracleDatabase {
    userRepository
    appAdminRepository
    appUserRepository
    sessionRepository
    courseRepository

    constructor() {
        const dbConnection = OracleDatabase.getDBConnectionFunction()
        this.userRepository = new UserRepository(dbConnection)
        this.appAdminRepository = new AppAdminRepository(dbConnection)
        this.appUserRepository = new AppUserRepository(dbConnection)
        this.sessionRepository = new SessionRepository(dbConnection)
        this.courseRepository = new CourseRepository(dbConnection)
    }

    static getDBConnectionFunction() {
        const config = {
            connectString: process.env.DB_CONNECT_STRING,  
            user: process.env.DB_USER,  
            password: process.env.DB_PASSWORD
        };

        return new Promise((resolve, reject) => {
            oracledb.getConnection(config, (err, conn) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(conn);
                }
            });
        });
    }
}

export default OracleDatabase
