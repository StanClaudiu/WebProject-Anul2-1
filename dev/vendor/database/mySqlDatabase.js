import { createPool } from "mysql";
import "dotenv/config";

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    multipleStatements: true
});


const mySqlDatabase = {
    getDataFromTable: (table, callBack) => {
        pool.query(
            `SELECT * FROM ??`, [
            table
        ],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results)
            }
        )

    }
};

export default mySqlDatabase
