import fs from "fs"

class CourseUserRepository {
    db

    constructor(db) {
        this.db = db;
    }

    async initRepoEnvironment() {
        try {
            const data = fs.readFileSync('vendor/database/oracle/plsql/CoursesPackage.sql', 'utf8');
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

    async create(parentId, content, description, name, imgPath, videoPath) {
        try {
            console.log(  `SELECT courses_package.create_course(${parentId}, '${content}',
            '${description}', '${name}', '${imgPath}', '${videoPath}') FROM DUAL`)
            const result = await this.db.execute(
                `SELECT courses_package.create_course(${parentId}, '${content}',
                 '${description}', '${name}', '${imgPath}', '${videoPath}') FROM DUAL`);
            
            console.log(result);
            return result.rows[0][Object.keys(result.rows[0])[0]]; //the id
        }
        catch (err) {
            console.log(err);
        }
    }

    async update(courseId, parentId, content, description, name, imgPath, videoPath) {
        try {
            const result = await this.db.execute(
                `SELECT courses_package.update_course(${courseId}, ${parentId}, '${content}',
                 '${description}', '${name}', '${imgPath}', '${videoPath}') FROM DUAL`);
            
            console.log(result);
            return result.rows[0][Object.keys(result.rows[0])[0]]; //the id
        }
        catch (err) {
            console.log(err);
        }
    }
}

export default CourseUserRepository;