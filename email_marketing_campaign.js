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


//create date paramters for queries
var messages = [
    {
        from: 'Curovate <info@curovate.com>',
        to: 'taikunzhang581@gmail.com',
        subject: '',
        template: 'day1email',
        "o:tracking": 'yes',
        "o:tag" : ['Day1emailA'], 
    },
    {
        from: 'Curovate <info@curovate.com>',
        to: 'taikunzhang581@gmail.com',
        subject: '',
        template: 'day3email',
        "o:tracking": 'yes',
        "o:tag" : ['Day3emailA'], 
    },
    {
        from: 'Curovate <info@curovate.com>',
        to: 'taikunzhang581@gmail.com',
        subject: '',
        template: 'day7email',
        "o:tracking": 'yes',
        "o:tag" : ['Day7emailA'], 
    },
    {
        from: 'Curovate <info@curovate.com>',
        to: 'taikunzhang581@gmail.com',
        subject: '',
        template: 'day15email',
        "o:tracking": 'yes',
        "o:tag" : ['Day15emailA'], 
    },

]
//dates for the Day1Email
var d = new Date();
var day1Date = new Date (d - 86400*1000);

//dates for the Day3Email
var day2Date = new Date (d - 2*86400*1000);
var day3Date = new Date (d - 3*86400*1000);

//dates for the Day7Email
var day6Date = new Date (d - 6*86400*1000);
var day7Date = new Date (d - 7*86400*1000);

//dates for the Day15Email
var day14Date = new Date (d - 14*86400*1000);
var day15Date = new Date (d - 15*86400*1000);


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
            var day1 = await send_emails(0,d,day1Date);
            console.log(day1);
        }catch(err) {
            console.log(err);
        }
        try{
            var day3 = await send_emails(1,day2Date,day3Date);
            console.log(day3);
        }catch(err) {
            console.log(err);
        }
        try{
            var day7 = await send_emails(2,day6Date,day7Date);
            console.log(day7);
        }catch(err) {
            console.log(err);
        }
        try{
            var day15 = await send_emails(3,day14Date,day15Date);
            console.log(day15);
        }catch(err) {
            console.log(err);
        }

    process.exit(0);
});


//sends Day1Emails to users who have signed up within a day
async function send_emails(dayNum, start_date, end_date){

    console.log("Inside the send email function");
    
    return new Promise((resolve, reject) => {
        PA.find({"createdate":{"$gte":end_date,"$lt":start_date}}, function(err, users) {
            
            var number;

            if (dayNum == 0)
            console.log("Sending day 1 emails.");
            if (dayNum == 1)
            console.log("Sending day 3 emails.");
            if (dayNum == 2)
            console.log("Sending day 7 emails.");
            if (dayNum == 3)
            console.log("Sending day 15 emails.");


            if (err){
                reject(err);
            }else{

                console.log("Number of Users", users.length);

                var email = messages[dayNum];

                for (i=0; i<users.length; i++){

                    if(dayNum == 0){
                        email.subject = "Welcome to Curovate " + users[i].firstname + "! Get started with your ACL recovery today by completing your exercises!";
                    }
                    else if (dayNum == 1){
                        email.subject = users[i].firstname + ", take advantage of Curovate’s ACL recovery tools! Watch video guided exercises, measure your knee extension, and track your progress during your ACL recovery";
                    }
                    else if (dayNum == 2){
                        email.subject == users[i].firstname + ", join the Curovate family and complete your 6 month ACL recovery journey!";
                    }
                    else if (dayNum == 3){
                        email.subject == users[i].firstname + "! Use these tips and resources to stay engaged with your ACL recovery";
                    }

                    mg.messages().send(email);
                };
            }

        resolve("done");

        });
    });
}


