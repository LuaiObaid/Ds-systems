var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    userid : { type : Number , required : true, unique: true },
   requestid: { type : Number , required : true, unique: true },
    time : { type : String, required : true, unique: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
