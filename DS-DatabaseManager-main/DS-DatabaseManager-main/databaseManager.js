
var database = require('./databaseConnection')
//const request = require('request');
//const cheerio = require('cheerio');
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.emqx.io')
//var topic = 'appointments'
const { JSDOM } = require( "jsdom" )
const { window } = new JSDOM( "" )
const bring = require( "jquery" )( window )


var Dentistry = require('./model/dentist')


//connect it to the database
database.connect;


// This method tells the Node.js process to terminate the process synchronously with an exit status code
process.on('exit', exitHandler.bind(null));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
// Node.js chose to use this event to start the built-in debugger
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
// Node.js chose to use this event to start the built-in debugger
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
// This event is emitted when an uncaught JavaScript exception bubbles back to the event loop.
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

function exitHandler(options, exitCode) {
  if (options.exit){
    client.unsubscribe('appointments')
    client.unsubscribe('dentistries')
    console.log("client unsubscribed")
    client.end()
    console.log("client ended")

    process.exit()
  }
}

// an array that will hold all the booking values
var appointments = []
// Saves the latest message in the broker,
var options = {
// A boolen value for the subscribers to get the saved values that they subsvribe for
  retain: true,
  qualityOfService: 0
}

client.subscribe('dentistries')
client.subscribe('appointments')


 


client.on('message', function (topic, message) {
  
})

function createDentistry(data){
  data = JSON.parse(JSON.stringify(data))
  var dentistry = new Dentistry(data)
  dentistry.save(function(err, result){
    if(err){
      console.log(err)
    }
    else{
        console.log("Dentistry is created successfully"+ result)
      }
  })
}


function fetchJson(){
  bring.getJSON('https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json', function(data){
  for(var i=0; i< data.dentists.length; i++){
    console.log(data.dentists[i])
    createDentistry(data.dentists[i])
  }
  
  })
}
Dentistry.find(function(err,result){
  if(!result){
    fetchJson()
  }
})



setInterval(function() {

  Dentistry.find(function(err, result){
    if(err){console.log(err)}
    publishDentistries(result, 1)
  })
        
 }, 10000)

function publishDentistries(message, qualityOfService) {
  
  options.qualityOfService = qualityOfService
  message = JSON.stringify(message)
  client.publish('dentistries', message, options)
  console.log(message, options)
}