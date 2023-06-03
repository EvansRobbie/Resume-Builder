const {Schema, model} = require('mongoose')

const ExperienceSchema = new Schema({
    user:{type:Schema.Types.ObjectId, require:true},
    experiences:[
        {

            companyName:{type:String},
            jobTitle:{type:String},
            start:{type:String},
            end:{type:String},
            details:{type:String}, 
        }
    ]

})
const ExperienceModel = model('Experience', ExperienceSchema)
module.exports = ExperienceModel