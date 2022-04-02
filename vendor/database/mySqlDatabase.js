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
    insertIntoTable(tablename, data, callBack) {
        var sqlString = `INSERT INTO ?? VALUES(`;

        for (let index = 0; index < data.length; index++) {
            if (index == data.length - 1) {
                sqlString += '?';
                break;
            }
            sqlString += '?,';
        }
        sqlString += ')';
        data.unshift(tablename)
        console.log(data)
        pool.query(
            sqlString, data,
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results)
            }
        )
    },
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
