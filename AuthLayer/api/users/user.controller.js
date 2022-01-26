const { create, getUserById, getUsers, getUserByEmail } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        // call service
        create(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },

    getUserById: (req, res) => {
        const id = req.params.id;

        // call service
        getUserById(id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.status(200).json({
                    success:0,
                    data: "Record not found"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        const id = req.params.id;

        // call service
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.status(200).json({
                    success:0,
                    data: "Record not found"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },

    login: (req, res) => {
        const body = req.body;

        // call service
        getUserByEmail(body.email, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.status(401).json({
                    success:0,
                    data: "Invalid email or password"
                });
            }

            const result = compareSync(body.password, results.Password);

            if(result) {
                results.Password = undefined;
                const jsontoken = sign({ result: results }, process.env.JWT_KEY,{
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    success:1,
                    data: jsontoken
                });
            } else {
                return res.status(401).json({
                    success:0,
                    data: "Invalid email or password"
                });
            }
            
        });
    }
}