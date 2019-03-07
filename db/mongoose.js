var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/vadasudu',{ useNewUrlParser: true },(err,client) =>{
if(err)
{
    return console.log("Unable to connect to server");
}
console.log('Connected');



});




module.exports = {mongoose};
