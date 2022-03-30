var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MyBooking')
const dentistry = require('./models/dentistry');



setTimeout(readDentistries, 1000)

dentistry.deleteMany({}, function (error) {
    if(err){
        console.log(error)
      }
      else{
        console.log('deleted succesfully')
      }
})

function readDentistries(){
    dentistry.find(function(error, result){
      if (error) {
        console.log(error)
      } else {
        console.log(result)
      }
    })
  }
