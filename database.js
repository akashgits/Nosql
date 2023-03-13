const mongodb=require('mongodb');

const MongoClient=mongodb.MongoClient;
let _db;

const mongoConnect=(callback)=>{
  MongoClient.connect('mongodb://localhost:27017')
.then(client=>{
  console.log("connected");
_db=client.db('udemyexpress');
console.log(_db);
  callback();
})
.catch(err=>{
  console.log("oops error");
  throw err;

})

}

const getdb=()=>{
  console.log(_db+"this is ")
  if(_db){
    return _db;

  }
  throw 'no database found';

}
exports.mongoConnect=mongoConnect;
exports.getdb=getdb;

