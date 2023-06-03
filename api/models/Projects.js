const {Schema, model} = require('mongoose')

const ProjectsSchema = new Schema({
    user:{type:Schema.Types.ObjectId, require:true},
    project:[
        {

            title:{type:String},
            description:{type:String},
        }
    ]
    

})
const ProjectsModel = model('Projects', ProjectsSchema)
module.exports = ProjectsModel