

var mongoose = require('mongoose');

var Signup = mongoose.model('userUp',{

    // text: {
    //     type: String,
    //     required: true,
    //     minlength: 1,
    //     trim: true
    //     },

username: String,
email: String,
psw:String,

});




module.exports = {Signup};
