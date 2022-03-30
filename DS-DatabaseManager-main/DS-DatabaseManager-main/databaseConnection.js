const dotenv = require('dotenv');
var mongoose = require ("mongoose");


dotenv.config();
var mongoURI = process.env.DB_CONNECT;

// Connect to MongoDB Atlas
// The code is from the web development project
function connect(){
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
        if (err) {
            console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
            console.error(err.stack);
            process.exit(1);
        }
        console.log(`Connected to MongoDB with URI: ${mongoURI}`);
    });
};

module.exports= {
    connect : connect()
}

