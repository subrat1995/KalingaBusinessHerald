require("dotenv").config();

const express = require("express");
const app = express();

const userRouter= require("./api/users/user.router");

app.use(express.json())

// app.get("/api", (req, res) => {
//     res.json({
//         message: "testing"
//     })
// });
app.use('/api/users', userRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on PORT: ", process.env.APP_PORT);
});

