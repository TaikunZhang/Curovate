const csv = require('csv-parser');  
const fs = require('fs');
const mailgun = require("mailgun-js");
const DOMAIN = "curovate.com";
const mg = mailgun({apiKey: "key-1e9a8d69f6d508ad8732c7f7c4513835", domain: DOMAIN});

fs.createReadStream('PatientInfo.csv')  
  .pipe(csv())
  .on('data', (row) => {
    console.log(row.firstname);
    const data = {
        from: "Curovate <info@curovate.com>",
        to: row.email,
        subject: row.firstname + ", ACL resources to stay motivated for your full recovery.",
        template: "day15email",
        "o:tracking": 'yes',
        "o:tag" : ['Day15EmailB']
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });