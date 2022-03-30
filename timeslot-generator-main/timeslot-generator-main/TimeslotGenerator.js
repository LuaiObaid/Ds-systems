const { next } = require('cheerio/lib/api/traversing')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/timeSlot')
//const fetch = require('node-fetch');
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.emqx.io')



  
client.subscribe('dentistries')
var appointmentGenerator = {appointment:[]} 
var data = null;


client.on("message", function(topic, message) {
  console.log("topic：", topic);
  console.log("Number is：", message.toString());
  data = JSON.parse(message)
  generator(data);
});

function generator(data) {
              var i ;
               for(i = 0; i < 4; i++){
                // quality of service 1
                // data.json()
               var weekdayID = null;
               var weekday = null;
               var num1 = 0;
               var num2 = 0;
               

               for(const [key, value] of Object.entries( data[i].openinghours)){
                var body = {
                  dentistID: null,
                  weekdayID: null,
                  weekday: null,
                  timeslots : []
                }
                // console.log(key, value.split("-"))
                 weekday = key
                 num1=+ value.split("-")[0].split(":")[0]
                 num2=+ value.split("-")[1].split(":")[0]
                 weekdayID = idGen(data[i].id,weekday)
                 //console.log("dentistID: "+data.dentists[i].id+"  weekdayID: "+weekdayID+"  "+weekday+"  "+ timeslotGen(num1, num2))
                 body.dentistID = data[i].id
                 body.weekdayID = weekdayID
                 body.weekday = weekday
                 body.timeslots = timeslotGen(num1, num2)
                 appointmentGenerator.appointment.push(body)
                 
               }console.log(JSON.stringify(appointmentGenerator))

        }
           client.publish("dentist/openHour", JSON.stringify(appointmentGenerator), {qos: 0, retain: false}, (error) => {
              if(error) {
                console.log(error);
              }else {
                
                console.log("Published!")
              }
            })
  }

  function timeslotGen(start,end){
    var timeslots = [];
    for (var j = start; j <= end; j++){
        //console.log(j+":30",j+":00")
        if(j == end){timeslots.push(j + ":00")}
        else{timeslots.push(j + ":00", j + ":30")}
        
    }
    timeslots = timeslots.filter(time=>time!=="11:00")
    timeslots = timeslots.filter(time=>time!=="11:30")
    timeslots = timeslots.filter(time=>time!=="14:00")
    return timeslots;

  }

  function idGen(id, weekday){
    var temp = null;
    switch(weekday){
      case "monday":
        temp = 1
        break;
      case "tuesday":
        temp = 2
        break;
      case "wednesday":
        temp = 3
        break;
      case "thursday":
        temp = 4
        break;
      case "friday":
        temp = 5
        break;
    } 
    var weekdayID = id + "0" + temp
    return weekdayID;
  }

  
