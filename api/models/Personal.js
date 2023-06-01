const {Schema, model} = require('mongoose')

const PersonalSchema = new Schema({
    name:{type:String},
    email:{type:String},
    address:{type:String},
    phone:{type:String},
    website:{type:String}, 
    linked:{type:String}

})
const PersonalModel = model('Personal', PersonalSchema)
module.exports = PersonalModel