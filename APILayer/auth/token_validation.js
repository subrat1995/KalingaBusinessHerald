const e = require("express");
const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization');
        if(token) {
            // remove 'Bearer ', hence 7th index
            token = token.slice(7);
            verify(token, process.env.JWT_KEY, (err, decoded) => {
                if(err) {
                    res.status(401).json({
                        success:0,
                        data: "Access denied! Invalid token"
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.status(401).json({
                success:0,
                data: "Access denied! Unauthorized user"
            });
        }
    }
}