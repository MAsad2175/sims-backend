const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let schema = new Schema({
    first_name: String,
    middle_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String,
    auth_token: String,
    created_at: String
});

schema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
};

schema.methods.isValid = function(hashedPassword){
    return bcrypt.compareSync(hashedPassword, this.password);
}

module.exports = mongoose.model('users', schema);
