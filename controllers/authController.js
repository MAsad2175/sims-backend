const express = require('express');
const router = express.Router();
const users = require('../models/auth');
const jwt = require('jsonwebtoken');
const {session} = require('../models/configuration');

router.post('/register', (req, res) => {
    let data = new users({
        username: req.body.username,
        password:  users.hashPassword(req.body.password),
        created_at:  new Date().toISOString(),
    });
    data.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(400).json({message: 'Error Registration User'})
        });
});

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    users.findOne({username: username})
        .then(data => {
            if (data) {
                if (data.isValid(password)) {
                    let token = jwt.sign({username: data.username}, 'secret', {expiresIn: '3h'});
                    res.status(200).send({
                        auth_token: token,
                        first_name: data.first_name,
                        middle_name: data.middle_name,
                        last_name: data.last_name,
                        email: data.email,
                    });
                    let obj = new session({
                        first_name: data.first_name,
                        middle_name: data.middle_name,
                        last_name: data.last_name,
                        email: data.email,
                        username: data.username,
                        auth_token: token,
                        login_date_time: new Date().toISOString(),
                    });
                    obj.save()
                        .then( data => {
                            console.log('Session data saved Successfully');
                        })
                        .catch( err => {
                            console.log('err', err);
                        });
                } else {
                    res.status(400).json({message: 'Invalid Credentials'});
                }
            } else {
                res.status(400).json({message: 'Invalid Credentials'});
            }
        })
        .catch(err => {
            res.status(501).json({message: 'Internal Error'});
        })
});

module.exports = router;
