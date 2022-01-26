const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO User_Base(Email,Password,PhoneNumber,Role,CreatedOn,CreatedBy,ModifiedOn,ModifiedBy) 
                    VALUES(?,?,?,?,?,?,?,?)`,
            [
                data.email,
                data.password,
                data.phoneNumber,
                data.role,
                data.createdOn,
                data.createdBy,
                data.modifiedOn,
                data.modifiedBy
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUsers: callBack => {
        pool.query(
            `select * from user_base`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getUserById: (id, callBack) => {
        pool.query(
            `select * from user_base where userid = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from user_base where email = ?`,
            [email],
            (error, results, fields) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }
};