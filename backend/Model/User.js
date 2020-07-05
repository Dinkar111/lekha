const mongoose=require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema =mongoose.Schema({
    picture: String,
    fullname:String,
    email:String,
    password:String,
    address:String
})
//ecrypt
UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(9));
}
// validate password
UserSchema.methods.validPassword =function(password){
    return bcrypt.compareSync(password, this.password);
}

const UserModel = mongoose.model('user',UserSchema); //naming table
/**
 * es5
 */
module.exports = UserModel;
/**
 * export UserModel variable from this file
 */