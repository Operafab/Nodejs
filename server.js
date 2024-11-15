const express = require("express");
const path = require("path")
const cors = require("cors")
const app = express();
const PORT = 3000
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");



// Use custom middleware
app.use(logger)

const whiteList = ["https://facebook.com"];

const corsOptions = {
  origin:(origin, callback) =>{
    if(whiteList.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    }else{
      console.log("Testing....")
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// Allow Cors
app.use(cors(corsOptions))

// InBui]lt Middleware
// used to handle url-encoded data
// in order words: form data

app.use(express.urlencoded({extended:false}))

// Built in middleware fro json
app.use(express.json())


// serves static files
app.use(express.static(path.join (__dirname, "public")));

const myLogger = function (req, res, next){
  console.log("LOGGED");
  next();
}

app.use(myLogger);

app.get('^/$|/index(.html)?', (req, res)=>{

res.sendFile("./views/index.html", {root:__dirname})
// res.sendFile(path.join(__dirname, "views", "index.html"))
  // res.send("Hello World!")
})

// Chaining route handlers
const one = (req, res, next)=>{
  console.log("one")
  next()
}
const two = (req, res, next)=>{
  console.log("two")
  next()
}
const three = (req, res, next)=>{
  console.log("last one")
  res.send("Finished!")
}

app.get("/chain",[one, two, three])

// to make the endpoint chain or chain.html
// app.get("/chain(.html)?",[one, two, three])

app.all("*", (req,res)=>{
  res.status(404);
  res.sendFile(path.join(__dirname, "views", "index.html"))
});

app.use(errorHandler)

app.listen(PORT,()=>console.log("Server is runnong on local host 3000"))