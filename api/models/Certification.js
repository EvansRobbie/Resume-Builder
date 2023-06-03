const {Schema, model} = require('mongoose')

const CertificationSchema = new Schema({
    user:{type:Schema.Types.ObjectId, require:true},
    certificate:{type:String},
    

})
const CertificationModel = model('Certification', CertificationSchema)
module.exports = CertificationModel