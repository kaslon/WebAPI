var express = require("express")
var mongoose = require("mongoose")
var app = express()
var path = require("path")
var bodyparser = require("body-parser")

// sets up our middleware to use in our application
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/highScores",{
    useNewUrlParser:true
}).then(function()
{
    console.log("Connected to MongoDB database")
}).catch(function(err)
{
    console.log(err)
})

// load in database templates
require('./models/Score')
var Score = mongoose.model('score')

// Basic code for saving an entry
/*
var Game = mongoose.model("Game", {nameofgame:String})

var game = new Game({nameofgame:"Skyrim"})
game.save().then(function()
{
    console.log("Game saved")
})
*/


// Example of a Post router
app.post("/saveHighScore",function(req,res)
{
    console.log("Request Made")
    console.log(req.body)

    new Score(req.body).save().then(function()
    {
        res.redirect('scoreList.html')
    })

})

// geet the data for the list
app.get('/getData', function(req,res)
{
    Score.find({}).then(function(score)
    {
        res.json({score})
    })
})


app.use(express.static(__dirname+"/views"))
app.listen(5000, function()
{
    console.log("Listening on port 3000")
})


