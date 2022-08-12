const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("node:https")

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]

  };

  var jsonData = JSON.stringify(data);
  const url = "https://us12.api.mailchimp.com/3.0/lists/95935edc27";

  const options = {
    method: "POST",
    auth: "sal1:834abe46681c1cd93b318797bba77548-us12"
  }

  //for posting the data
  const request = https.request(url, options, function(response){
    if(response.statusCode == 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }

  });
  request.write(jsonData)
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(3000, function(res, req){
  console.log("server is runnig on port 3000...");
});
