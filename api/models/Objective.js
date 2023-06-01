const {Schema, model} = require('mongoose')

const ObjectiveSchema = new Schema({
    objective:{type:String},
    

})
const ObjectiveModel = model('Objective', ObjectiveSchema)
module.exports = ObjectiveModel