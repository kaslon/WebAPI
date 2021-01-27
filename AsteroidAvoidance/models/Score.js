var mongoose = require('mongoose')
var Schema = mongoose.Schema

var GameSchema = new Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        score:
        {
            type:String,
            required:true
        }
    })
    

    
    mongoose.model('score', GameSchema)