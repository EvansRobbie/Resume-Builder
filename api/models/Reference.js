const {Schema, model} = require('mongoose')

const ReferenceSchema = new Schema({
    user:{type:Schema.Types.ObjectId, require:true},
    referees:[
        {

            name:{type:String},
            title:{type:String},
            companyName:{type:String},
            email:{type:String},
            phone:{type:String}, 
        }
    ]
   

})
const ReferenceModel = model('Reference', ReferenceSchema)
module.exports = ReferenceModel