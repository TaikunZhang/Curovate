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
var d = new Date();
var day1Date = d.setDate(d.getDate()-1);
var day2Date = d.setDate(d.getDate()-2);
var day3Date = d.setDate(d.getDate()-3);
var day4Date = d.setDate(d.getDate()-4);
var day5Date = d.setDate(d.getDate()-5);
var day6Date = d.setDate(d.getDate()-6);
var day7Date = d.setDate(d.getDate()-7);

//query for all day1 email users
var day1Query = mongoose.find({createdate: {$gte:day1Datw,$lt:d}});
//set up email content for day1 users

day1Query.forEach(function(user) {
	
	//set up email content for day1 users
	const data = {
	from: 'Curovate <info@curovate.com>',
	to: 'taikun.zhang@mail.utoronto.ca',
	subject: "Welcome to Curovate " + user.firstname + "! Get started with your ACL recovery today by completing your exercises!",
	template: 'day1email',
	"o:tracking": 'yes',
	"o:tag" : ['Day1emailA'],
	};

	
	mg.messages().send(data, function (error, body) {
        console.log(body);
    });
});

