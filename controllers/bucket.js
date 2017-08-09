var express = require('express');
var bucketRouter = new express.Router();

bucketRouter.get("/", function(req, res){
  res.json({data: "Hello from the bucket!"})
});

module.exports = bucketRouter;