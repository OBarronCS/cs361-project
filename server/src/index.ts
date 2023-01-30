import path from "path"
import express from "express"

// Environment variables
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname,".env") });

const app = express();
const PORT = process.env.PORT || 8080;

// app.use(express.static(__dirname + './public'))

app.get("/", (req, res, next) => {
    res.send("Ayo matey!")
});

app.get("/post/:post_num", (req,res,next) => {
    const post_num = req.params["post_num"];


});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});