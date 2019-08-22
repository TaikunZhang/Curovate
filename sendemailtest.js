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

//connect to local physiophriend database
mongoose.connect(mongoose_uri, {
    user: '',
    pass: ''
});

//check connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Connected to MongoDB');
});

//create date paramters for queries

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

//sends Day1Emails to users who have signed up within a day
function send_day_1_emails(){

    console.log("Inside the day1 function");
    console.log(day1Date);
    PA.find({"createdate":{"$gte":day1Date}}, function(err, user) {

	//console.log("Number of users: ", user.length);


        if (err){
            console.log(err);
        }else{

            console.log("Number of Users", user.length);

            for (i=0; i<user.length; i++){

                //set up email content for day1 users
                const data = {
                    from: 'Curovate <info@curovate.com>',
                    to: 'taikunzhang581@gmail.com',
                    subject: "Welcome to Curovate " + user[i].firstname + "! Get started with your ACL recovery today by completing your exercises!",
                    template: 'day1email',
                    "o:tracking": 'yes',
                    "o:tag" : ['Day1emailA'],
                };
                mg.messages().send(data, function (error, body) {
                   // console.log(body);
                });
            }
        }
    });
}
//sends Day3Emails to users who have signed up within 3 days
function send_day_3_emails(){

    console.log("Inside the day3 function");

    PA.find({"createdate":{"$gte":day3Date,"$lt":day2Date}}, function(err, user) {

	//console.log("Number of users: ", user.length);


        if (err){
            console.log("Cannot find the users");
        }else{

            console.log("Number of Users", user.length);

            for (i=0; i<user.length; i++){

                //set up email content for day3 users
                const data = {
                    from: 'Curovate <info@curovate.com>',
                    to: 'taikunzhang581@gmail.com',
                    subject: user[i].firstname + ", take advantage of Curovate’s ACL recovery tools! Watch video guided exercises, measure your knee extension, and track your progress during your ACL recovery",
                    template: 'day3email',
                    "o:tracking": 'yes',
                    "o:tag" : ['Day3emailA'],
                };
                mg.messages().send(data, function (error, body) {
                    //console.log(body);
                });
            }
        }
    });
}
//sends Day7mails to users who have signed up within 7 days
function send_day_7_emails(){

    console.log("Inside the day7 function");

    PA.find({"createdate":{"$gte":day7Date,"$lt":day6Date}}, function(err, user) {

	//console.log("Number of users: ", user.length);


        if (err){
            console.log("Cannot find the users");
        }else{

            console.log("Number of Users", user.length);

            for (i=0; i<user.length; i++){

                //set up email content for day7 users
                const data = {
                    from: 'Curovate <info@curovate.com>',
                    to: 'taikunzhang581@gmail.com',
                    subject: user[i].firstname + ", join the Curovate family and complete your 6 month ACL recovery journey!",
                    template: 'day7email',
                    "o:tracking": 'yes',
                    "o:tag" : ['Day7emailA'],
                };
                mg.messages().send(data, function (error, body) {
                    //console.log(body);
                });
            }
        }
    });
}
//sends Day3Emails to users who have signed up within 15 days
function send_day_15_emails(){

    console.log("Inside the day 15 function");

    PA.find({"createdate":{"$gte":day15Date,"$lt":day14Date}}, function(err, user) {

	//console.log("Number of users: ", user.length);


        if (err){
            console.log("Cannot find the users");
        }else{

            console.log("Number of Users", user.length);

            for (i=0; i<user.length; i++){

                //set up email content for day15 users
                const data = {
                    from: 'Curovate <info@curovate.com>',
                    to: 'taikunzhang581@gmail.com',
                    subject: user[i].firstname + "! Use these tips and resources to stay engaged with your ACL recovery",
                    template: 'day15email',
                    "o:tracking": 'yes',
                    "o:tag" : ['Day15emailA'],
                };
                mg.messages().send(data, function (error, body) {
                    //console.log(body);
                });
            }
        }
    });
}

send_day_1_emails();
//send_day_3_emails();
//send_day_7_emails();
//send_day_15_emails();
