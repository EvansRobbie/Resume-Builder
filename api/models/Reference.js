const {Schema, model} = require('mongoose')

const ReferenceSchema = new Schema({
    name:{type:String},
    title:{type:String},
    companyName:{type:String},
    email:{type:String},
    phone:{type:String}, 
   

})
const ReferenceModel = model('Reference', ReferenceSchema)
module.exports = ReferenceModel