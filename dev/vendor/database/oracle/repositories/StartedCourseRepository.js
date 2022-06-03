import fs from "fs"

class StartedCourseUserRepository {
    db

    constructor(db) {
        this.db = db;
    }

    async initRepoEnvironment() {
        try {
            const data = fs.readFileSync('vendor/database/oracle/plsql/StartedCoursesPackage.sql', 'utf8');
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

    async getAllStratedCourses (userId) {
        try {
            const result = await this.db.execute(
                `SELECT * from TABLE( started_courses_package.getAllStartedCourses('${userId}'))`);
            
            console.log(result);
            return result.rows; //the id
        }
        catch (err) {
            console.log(err);
        }
    }

    async create(user_id, course_id) {
        try {
            const result = await this.db.execute(
                `SELECT started_courses_package.create_started_course('${user_id}', '${course_id}') FROM DUAL`);
            
            console.log(result);
            return result.rows[0][Object.keys(result.rows[0])[0]]; //the id
        }
        catch (err) {
            console.log(err);
        }
    }

    async update(id, progress) {
        try {
            const result = await this.db.execute(
                `SELECT started_courses_package.update_course(${id}, ${progress}) FROM DUAL`);
            
            console.log(result);
            return result.rows[0][Object.keys(result.rows[0])[0]]; //the id
        }
        catch (err) {
            console.log(err);
        }
    }

    async getByUserAndCourse(userId, courseId) {
        try {
            const result = await this.db.execute(
                `SELECT started_courses_package.getByUserAndCourse(${userId}, ${courseId}) FROM DUAL`);
            
            console.log(result);
            return result.rows.length == 0 ? null : result.rows[0]; //the id
        }
        catch (err) {
            console.log(err);
        }
    }
}

export default StartedCourseUserRepository;