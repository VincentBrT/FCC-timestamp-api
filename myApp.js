
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use((req, res, next)=>{
console.log(req.method + " " + req.path + " - " + req.ip);
next();
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */

console.log("Hello World");

/** 2) A first working Express Server */
const filePath = __dirname + "/views/index.html";

app.get("/", (req, res) => {
        res.sendFile(filePath);
});

/** 3) Serve an HTML file */


/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'));

/** 5) serve JSON on a specific route */
app.get("/json", (req, res) => {
  const message = "Hello json";
  res.json(process.env.MESSAGE_STYLE === "uppercase" ? {"message": message.toUpperCase()} : {"message" : message});

});
/** 6) Use the .env file to configure the app */
process.env.MESSAGE_STYLE="uppercase";
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({"time" : req.time});
});
  

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", (req, res) => {
  res.json({"echo": req.params.word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", (req, res) => {
  res.json({"name": req.query.first + ' ' + req.query.last})
  });
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */

app.post("/name", (req, res) => {
  res.json({"name": req.body.first + " " + req.body.last})
});

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/**app.listen(process.env.PORT || 3000 ); */

//ADD FOR TIMESTAMP PROJECT

app.get('/api/timestamp/:date_string?', (req, res) => {
  
  let date = "";
  if(!req.params.date_string){
    date = new Date();
    console.log(date);
  }
  else{
    date = new Date(req.params.date_string);
    console.log(date);
  }
  
  if(date == "Invalid Date") {
    res.json({"error": "Invalid Date"});
  }
  else{
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
  }
});

//ADD FOR HEADER PARSER MICROSERVICE

app.get('/api/whoami', (req, res) => {

    res.json({
      "ipaddress": req.header('x-forwarded-for').split(",")[0],
      "language": req.header('Content-Language'),
      "software": req.header('User-Agent')
    });
});


//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
