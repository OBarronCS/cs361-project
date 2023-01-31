import path from "path"
import express from "express"
import { engine } from "express-handlebars"

// Environment variables
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname,".env") });

const app = express();
const PORT = process.env.PORT || 8080;

app.engine("handlebars", engine({
    defaultLayout:"main"
}))

app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static('static'));

app.get("/", (req, res, next) => {
    res.render("create", {
        content: "host"
    })
});



class Post {
    constructor(public title: string, public contents: string, public tags: string){}
}
// ID to post
const posts = new Map<number,Post>();
let id = 0;

app.get("/post/:post_num", (req,res,next) => {
    const post_num = parseInt(req.params["post_num"]);
    if(!posts.has(post_num)){
        res.redirect("/")
    } else {
        const post = posts.get(post_num);

        res.render("view_post", {
            title: post.title,
            content: post.contents,
            tags: post.tags        
        });
    }
});




app.post("/create", (req,res,next) => {

    const title = req.body.title;
    const content = req.body.content;
    const tags = req.body.tag;

    const post: Post = new Post(
        title, 
        content,
        tags
    );

    const id_to_use = id++;
    posts.set(id_to_use,post);
 
    res.redirect("/post/" + id_to_use);
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});