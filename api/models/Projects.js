const {Schema, model} = require('mongoose')

const ProjectsSchema = new Schema({
    title:{type:String},
    description:{type:String},
    

})
const ProjectsModel = model('Projects', ProjectsSchema)
module.exports = ProjectsModel