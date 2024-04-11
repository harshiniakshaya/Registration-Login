const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require("./models/Users.js")

const app = express()

//converts data from frontend to backend in json format
app.use(express.json())

app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Registration-Login-MERN");

app.post('/login', (req, res) => {
    const {email,password}=req.body;
    UserModel.findOne({email:email})
    .then(user =>{
        if(user){
            if(user.password===password){
                res.json("Success!");
            }
            else{
                res.json("The password is incorrect!");
            }
        }
        else{
            res.json("Email not registered. Create an account!");
        }
    })
})

app.post('/register', (req, res) => {
    console.log("Received registration request:", req.body);
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err=>res.json(err))
})

app.listen(3001,()=>{
    console.log("server is running!");
})