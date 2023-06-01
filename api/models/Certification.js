const {Schema, model} = require('mongoose')

const CertificationSchema = new Schema({
    certificate:{type:String},
    

})
const CertificationModel = model('Certification', CertificationSchema)
module.exports = CertificationModel