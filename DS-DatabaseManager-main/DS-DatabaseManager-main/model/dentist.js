const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dentistsSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: String,
    require: true,
    unique: true,
  },
  dentists: {
    type: Number
  },
  address: {
    type: String,
    require: true,
    trim: true,
  },
  city: {
    type: String,
    require: true,
  },
  coordinate  : ({
    longitude : {type: Number, required: true},
    latitude  : {type: Number, required: true}
}),
openinghours  : ({
  monday      : {type: String, required: true},
  tuesday     : {type: String, required: true},
  wednesday   : {type: String, required: true},
  thursday    : {type: String, required: true},
  friday      : {type: String, required: true}
})

})

module.exports = mongoose.model('dentist',dentistsSchema);