
//get required packages
var mongoose  = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var mongoose_uri  = 'mongodb://localhost/physiophriend';
const mailgun = require("mailgun-js");
const username ='';
const password = '';

//setup mailgun API and email info
const DOMAIN = 'curovate.com';
const mg = mailgun({apiKey: 'key-1e9a8d69f6d508ad8732c7f7c4513835', domain: DOMAIN});

var path          = require('path');
var PA            = require(path.join(__dirname, "PA.js"));

//current date
var d = new Date(); 


//change x and y to the specific amount of days before the current date for querying users in the database
//start date for query
var x = 1; // number of days before current date
var startDate = new Date(d- x*86400*1000);
//end date for query
var y = 1; //number of days before current date
var endDate = new Date(d-y*86400*1000);



//connect to local physiophriend database
mongoose.connect(mongoose_uri, {
    user: '',
    pass: ''
});

//check connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function callback () {
    console.log('Connected to MongoDB');
        try{
            var email = await send_emails(0,startDate,endDate);
            console.log(email);
        }catch(err) {
            console.log(err);
        }
    process.exit(0);
});

//sends Day1Emails to users who have signed up within a day
async function send_emails(dayNum, start_date, end_date){

    console.log("Inside the send email function");
    
    return new Promise((resolve, reject) => {
        PA.find({"createdate":{"$gte":end_date,"$lt":start_date}}, async function(err, users) {

            if (err){
                reject(err);
            }else{

                console.log("Number of Users", users.length);

                for (i=0; i<users.length; i++){

                    //set up email content
                    const data = {
                        from: 'Curovate <info@curovate.com>',
                        to: users.emailaddress,
                        subject: user[i].firstname + "! Use these tips and resources to stay engaged with your ACL recovery",
                        template: '',
                        "o:tracking": 'yes',
                        "o:tag" : [''],
                    };

                    var body = await mg.messages().send(email);
                }
            }

        resolve("done");

        });
    });
}