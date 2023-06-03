const {Schema, model} = require('mongoose')

const ObjectiveSchema = new Schema({
    user:{type:Schema.Types.ObjectId, require:true},
    objective:{type:String},
    

})
const ObjectiveModel = model('Objective', ObjectiveSchema)
module.exports = ObjectiveModel