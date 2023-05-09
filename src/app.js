/*const express = require("express");
const app= express();
const path=require("path");
require("./db/conn");

const Register = require("./models/registers")

const port= process.env.PORT || 3000;

const static_path=path.join(__dirname, "../public");

app.use(express.static(static_path));
app.set("view engine", "hbs");

app.get("/", (req, res) =>{
    res.render("index")
}); 

app.post("/register", async(req,res)=>{
    try{
        console.log(req.body);
        res.send(req.body);
    }
    catch(error){
        res.status(400).send(error);
    }
})
app.listen(port, () =>{
    console.log(`server : ${port}`);
});
*/
const express=require("express");
const path=require("path");
const app=express();
const hbs=require("hbs");
require("./db/conn");
const Register = require("./models/registers");
const port=process.env.PORT || 800;

const static_path=path.join(__dirname, "../public");
const temp_path=path.join(__dirname, "../templates/views");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", temp_path);
app.get("/", (req,res) => {
    res.render("index")
});

app.get("/register", (req,res) => {
    res.render("register")
});

app.get("/login", (req,res) => {
    res.render("login")
});

app.post("/register", async(req,res)=>{
    try{
        const pwd=req.body.password;
        const cpwd=req.body.confirmpassword;
        if(pwd===cpwd){
            const reg=new Register({
                name:req.body.name,
                email:req.body.email,
                password:pwd,
                confirmpassword:cpwd
            })
            const registered=await reg.save();
            res.status(201).render("index");
        }
        else{
            res.send("Password are not matching");
        }        
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.post("/login", async(req,res) =>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        const useremail = await Register.findOne({email:email});
        if(useremail.password === password){
            res.status(201).render("index");
        }
    else{
        res.send("invalid credentials")
    }
    }
    catch(e){
        res.status(400).send("invalid credentials");
    }    
})
app.listen(port, () => {
    console.log(`server is runing at ${port}`);
});