var express= require("express")
var cors =require("cors")
var bodyParser = require("body-parser")
var app=express()
var mongoose = require("mongoose")
var port= 8081

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))

const mongoURI='mongodb://localhost:27017/ManoharDB'

mongoose.connect(mongoURI,{useNewUrlParser:true})
.then(()=>console.log("ManoharDB Connected"))
.catch(err=> console.log(err))

var Users=require("./routes/Users")

app.use("/users",Users)

app.listen(port,function(){
    console.log("Server is running on Port :" + port)
})