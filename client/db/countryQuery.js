var MongoClient = require('mongodb').MongoClient;

var BucketList = function(){
  this.url = "mongodb://localhost:27017/BucketList";
};

BucketList.prototype = {
  all: function(callback){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection('bucketlist');
      collection.find().toArray(function(err, result){
        callback(result);
      });
    });
  },
  add: function(filmToAdd, callback){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection('bucketlist');
        collection.insert(countryToAdd);
        collection.find().toArray(function(err, results){
          callback(results);
        });
      };
    });
  }
};

module.exports = BucketList;