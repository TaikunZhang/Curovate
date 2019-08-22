const csv = require('csv-parser');  
const fs = require('fs');
const mailgun = require("mailgun-js");
const DOMAIN = "curovate.com";
const mg = mailgun({apiKey: "key-1e9a8d69f6d508ad8732c7f7c4513835", domain: DOMAIN});
var prices = "New rates are now $3.75 monthly or $16.99 lifetime USD.";

fs.createReadStream('PatientInfo.csv')  
  .pipe(csv())
  .on('data', (row) => {
    console.log(row.firstname);
    const data = {
        from: "Curovate <info@curovate.com>",
        to: row.email,
        subject: row.firstname + "! 50% off for the Curovate ACL recovery app subscription!",
        text: "Dear " + row.firstname + ",\n\nFor a limited time we are offering 50% off of monthly and life subscriptions to Curovate.\n\n" + prices + "\n\nWe hope you will use Curovate for your recovery!\n\nSincerely,\nCurovate Team",
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });