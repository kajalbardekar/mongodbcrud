const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json())

const userModel = require("./models/User")

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/mongocrud").then(data => {
    console.log("Database connected")
}).catch(err => {
    console.log(err)
})





app.post("/saveuser", (req, res) => {
    const user = new userModel({
        name: req.body.name,
        age: req.body.age,
        url: req.body.url
    })
    user.save().then(data => {
        console.log(data)
        res.send("user got saved");
    }).catch(err => {
        console.log(err);
    })
})


app.get("getData", (req, res) => {

    userModel.find().then(data => {
        res.json({
            message: "Success",
            data:data
        })
    }).catch(err => {
        console.log(err);
    })
})


app.get("getData/:id", (req, res) => {

    userModel.findOne({_id:req.params.id}).then(data => {
        res.json({
            message: "Success",
            data:data
        })
    }).catch(err => {
        console.log(err);
    })
})



app.put("change/:id",(req,resp)=>{
      
    userModel.updateOne({_id:req.params.id},{$set:{name:req.body.namme}}).then(data=>{
        res.json({
            message:"data updated"
        })
        
       }).catch(err=>{
        console.log(err);
       })
})


app.delete("remove/:id",(req,res)=>{
    userModel.deleteOne({_id:req.params.id}).then(data=>{
        res.json({
            message:"deleted"
        }).catch(err=>{
            console.log(err)
        })
    })
})



app.listen(9091, () => {
    console.log("port is running")
})