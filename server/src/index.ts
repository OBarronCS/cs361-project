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


// ID to post
const posts = new Map<number,Post>();
let id = 0;

app.get("/post/:post_num", (req,res,next) => {
    const post_num = req.params["post_num"];



});

class Post {
    constructor(public title: string, public contents: string, public tags: string){}
}



app.post("/create", (req,res,next) => {
    const post: Post = new Post(
        "Title",
        "Contents",
        "Tags"
    );

    posts.set(id++,post);
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});