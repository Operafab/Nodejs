const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next)=>{
  // logEvents
  logEvents(`${err.name}\t${err.message}`, "errLog.text");
  console.log(req.method, req.url)
  // console.log(req.method,req.path);
  // next()
  res.status(500).send(err.message)
}

module.exports = errorHandler