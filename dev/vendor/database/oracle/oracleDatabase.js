import oracledb from 'oracledb'; 
import { UserRepository,
         CourseRepository,
         StartedCourseRepository,
         PlantRepository,
         PlantTypeRepository,
         ReminderRepository
        } from './repositories/index.js'
import "dotenv/config";

class OracleDatabase {
    dbPool
    userRepository
    startedCourseRepository
    courseRepository
    plantRepository
    plantTypeRepository
    reminderRepository

    constructor() {
        this.userRepository = new UserRepository(this)
        this.courseRepository = new CourseRepository(this)
        this.startedCourseRepository = new StartedCourseRepository(this)
        this.plantRepository = new PlantRepository(this)
        this.plantTypeRepository = new PlantTypeRepository(this)
        this.reminderRepository = new ReminderRepository(this);
    }

    async connect() {
        this.dbPool = await OracleDatabase.getDBPool()
    }

    async initEnvironment() {
        console.log("Initializing db environment...")

        await this.userRepository.initRepoEnvironment()
        await this.courseRepository.initRepoEnvironment()
        await this.startedCourseRepository.initRepoEnvironment()
        await this.plantTypeRepository.initRepoEnvironment()
        await this.plantRepository.initRepoEnvironment()
        await this.reminderRepository.initRepoEnvironment()

        console.log("Done initializing db environment")
    }

    static async getDBPool() {
        const config = {
            connectString: process.env.DB_CONNECT_STRING,  
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            poolMin: parseInt(process.env.DB_POOL_MIN),
            poolMax: parseInt(process.env.DB_POOL_MAX),
            poolIncrement: parseInt(process.env.DB_POOL_INCREMENT)
        };

        try {
            const pool = await oracledb.createPool(config);
            return pool;
        } 
        catch (err) {
            console.log("Failed intializing db module");
            console.log(err);
            throw new Error("Critical application error");
        }
    }

    static async closeDBPool() {
        try {
            await oracledb.getPool().close();
        }
        catch (err) {
            console.log("Failed closing db module");
            console.log(err);
            throw new Error("Critical application error");
        }
    }

    execute (statement, binds = [], opts = {}) {
        return new Promise(async (resolve, reject) => 
        {
            let connection;
        
            opts.outFormat = oracledb.OBJECT;
            opts.autoCommit = true;
        
            try {
                connection = await oracledb.getConnection();
            
                const result = await connection.execute(statement, binds, opts);

                resolve(result);
            } 
            catch (error) {
                reject(error);
            } 
            finally {
                if (connection) {
                    try {
                        await connection.close();
                    } 
                    catch (error) {
                        console.log(error);
                    }
                }
            }
        });
    }
}

export default OracleDatabase
