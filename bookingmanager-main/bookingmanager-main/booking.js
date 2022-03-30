var database = require('./databaseConnection')
var mqtt = require('mqtt')
const appointment = require('./model/appointment')
var client  = mqtt.connect('mqtt://broker.emqx.io')
//var Dentistry = require('./model/dentist')

database.connect;

var counter = 0
client.subscribe('booking/request')
//var appointmentGenerator = {appointment:[]}
//var data = null;


client.on("message", function(topic, message) {
  console.log("topic：", topic);
  console.log("Number is：", message.toString());
  data = JSON.parse(message)
  bookingGenerator(data);
  counter = counter + 1
  console.log(counter)

  if (counter >= 100) {
    console.log("Que is Full!")
    client.end()
    
  }


});
function timeConverter(sec){
    var num = new Date(sec)
    var hours = num.getHours()
   var mins = num.getMinutes()
  sec = hours + ":" + mins
  return sec
}
function bookingGenerator(data){


    var body = {
        userid: data.userid,
        requestid: data.requestid,
        time: timeConverter(data.issuance)
         }
    
    console.log(body)
    var app = new appointment(body)
    app.save(body,function(err,result){
      if(err){console.log(err)}
      console.log("saved: "+result)
    })


    //  if (bookings.length < 3){
    //    app.save(bookings, function (err, result) {
    //      if (err) {
    //        console-log(err)
    //      }
    //    })
    //  }
    

// client.publish("booking/recipt", JSON.stringify(body), {qos: 1, retain: false}, (error) => {
//     if(error) {
//       console.log(error);
//     }else {

//       console.log("Published!")
//       console.log(body)
//     }
//   })
}
