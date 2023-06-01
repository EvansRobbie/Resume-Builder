const {Schema, model} = require('mongoose')

const EducationSchema = new Schema({
    course:{type:String},
    school:{type:String},
    grade:{type:String},
    year:{type:String},
    // details:{type:String}, 

})
const EducationModel = model('Education', EducationSchema)
module.exports = EducationModel