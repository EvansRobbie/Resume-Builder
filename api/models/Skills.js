const {Schema, model} = require('mongoose')

const SkillsSchema = new Schema({
    user:{type:Schema.Types.ObjectId, require:true},
    content:{type:String},
    

})
const SkillsModel = model('Skills', SkillsSchema)
module.exports = SkillsModel