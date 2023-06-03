const {Schema, model} = require('mongoose')

const EducationSchema = new Schema({
    user:{type:Schema.Types.ObjectId, require:true},
    education:[
        {

            course:{type:String},
            school:{type:String},
            grade:{type:String},
            year:{type:String},
        }
    ]
    // details:{type:String}, 

})
const EducationModel = model('Education', EducationSchema)
module.exports = EducationModel