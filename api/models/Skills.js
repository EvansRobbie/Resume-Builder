const {Schema, model} = require('mongoose')

const SkillsSchema = new Schema({
    content:{type:String},
    

})
const SkillsModel = model('Skills', SkillsSchema)
module.exports = SkillsModel