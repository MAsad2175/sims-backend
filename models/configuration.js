const mongoose = require('mongoose');

let session = mongoose.model('session', {
    first_name: String,
    middle_name: String,
    last_name: String,
    email: String,
    username: String,
    auth_token: String,
    login_date_time: String,
});

let bank = mongoose.model('bank', {
    code: String,
    name: String,
    description: String,
    status: Boolean,
});

let classList = mongoose.model('class', {
    code: String,
    name: String,
    description: String,
    status: Boolean,
});

let sectionList = mongoose.model('section', {
    code: String,
    name: String,
    description: String,
    status: Boolean,
});

let subjectList = mongoose.model('subject', {
    code: String,
    name: String,
    total_marks: Number,
    passing_marks: Number,
    description: String,
    status: Boolean,
});

module.exports = {bank, session, classList, sectionList, subjectList};
