const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine" ,"ejs");
app.set("views" ,path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));



let posts = [
{
    id:uuidv4(), 
    username:"rohit",
    content:"i love coding"
},
{
    id:uuidv4(), 
    username:"shradhaa",
    content:"i love coding and Job"
},
{
    id:uuidv4(),
    username:"anish",
    content:"i love coding +++ "
},
];
app.get("/posts",(req, res) => {
res.render("index.ejs",{posts});
});

app.get("/posts/new", (req, res) =>
{
res.render("new.ejs");
});
app.post("/posts", (req,res)=>
{
    let{username, content} = req.body;
    let id = uuidv4(); 
    posts.push({id,username, content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req, res)=>
{
    let{id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
    res.send("request working");
});

// app.patch("/post/:id",(req,res)=>
// {
//     let{id} = req.params;
//     console.log(id);
//     res.send("patch request working");
// });

app.get("/posts/:id/edit",(req,res) =>
{
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});
app.listen(port, () => {
    console.log("listening to the port: 8080");
});