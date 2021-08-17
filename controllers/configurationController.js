const express = require('express');
const paginate = require("jw-paginate");
const router = express.Router();
const {bank, session, classList, sectionList, subjectList} = require('../models/configuration');
const users = require('../models/auth');

// bank API's start
router.post('/bank_list', (req, res) => {
    let auth_token = req.query.auth_token;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            let bankInfo = new bank({
                code: req.body.value.code,
                name: req.body.value.name,
                description: req.body.value.description,
                status: req.body.value.status,
            });
            bankInfo.save()
                .then( data => {
                    res.status(200).send(data);
                })
                .catch( err => {
                    res.status(400).json({message: 'Something Went Wrong'});
                })
        })
        .catch( err => {
            console.log(err);
        });
});

router.get('/bank_list', (req, res) => {
    let auth_token = req.query.auth_token;
    let page = req.query.page;
    let per_page = req.query.per_page;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            bank.find()
                .then( data => {
                    const pager = paginate(data.length, page, per_page);
                    const items = data.slice(pager.startIndex, pager.endIndex + 1);
                    res.status(200).send({
                        items: items.reverse(),
                        total_count: pager.totalItems
                    });
                })
                .catch( err => {
                    res.status(400).json({message: 'Something Went Wrong'});
                });
        })
        .catch( err => {
            console.log(err);
        });
});

router.get('/bank_detail', (req, res) => {
    let id = req.query.id;
    let auth_token = req.query.auth_token;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            bank.findById({_id: id})
                .then( bankListById => {
                    res.status(200).send(bankListById);
                })
                .catch( error => {
                    console.log('error', error);
                    res.status(400).json({message: 'Something Went Wrong'});
                })
        })
        .catch( err => {
            console.log(err);
        });
});

router.put('/bank_detail', (req, res) => {
    let id = req.query.id;
    let auth_token = req.query.auth_token;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            let obj = {
                code: req.body.value.code,
                name: req.body.value.name,
                description: req.body.value.description,
                status: req.body.value.status,
            }
            bank.findByIdAndUpdate({_id: id}, {$set: obj}, {new: true})
                .then( data => {
                    res.status(200).send(data);
                })
                .catch( err => {
                    res.status(400).json({message: 'Something Went Wrong'});
                })
        })
        .catch( err => {
            console.log(err);
        });
});
// bank API's end

// class API's start
router.post('/class_list', (req, res) => {
    let auth_token = req.query.auth_token;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            let classInfo = new classList({
                code: req.body.value.code,
                name: req.body.value.name,
                description: req.body.value.description,
                status: req.body.value.status,
            });
            classInfo.save()
                .then( data => {
                    res.status(200).send(data);
                })
                .catch( err => {
                    res.status(400).json({message: 'Something Went Wrong'});
                })
        })
        .catch( err => {
            console.log(err);
        });
});

router.get('/class_list', (req, res) => {
    let auth_token = req.query.auth_token;
    let page = req.query.page;
    let per_page = req.query.per_page;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            classList.find()
                .then( data => {
                    const pager = paginate(data.length, page, per_page);
                    const items = data.slice(pager.startIndex, pager.endIndex + 1);
                    res.status(200).send({
                        items: items.reverse(),
                        total_count: pager.totalItems
                    });
                })
                .catch( err => {
                    res.status(400).json({message: 'Something Went Wrong'});
                });
        })
        .catch( err => {
            console.log(err);
        });
});

router.get('/class_detail', (req, res) => {
    let id = req.query.id;
    let auth_token = req.query.auth_token;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            classList.findById({_id: id})
                .then( data => {
                    res.status(200).send(data);
                })
                .catch( error => {
                    console.log('error', error);
                    res.status(400).json({message: 'Something Went Wrong'});
                })
        })
        .catch( err => {
            console.log(err);
        });
});

router.put('/class_detail', (req, res) => {
    let id = req.query.id;
    let auth_token = req.query.auth_token;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            let obj = {
                code: req.body.value.code,
                name: req.body.value.name,
                description: req.body.value.description,
                status: req.body.value.status,
            }
            classList.findByIdAndUpdate({_id: id}, {$set: obj}, {new: true})
                .then( data => {
                    res.status(200).send(data);
                })
                .catch( err => {
                    res.status(400).json({message: 'Something Went Wrong'});
                })
        })
        .catch( err => {
            console.log(err);
        });
});
// class API's end

// section API's start
router.post('/section_list', (req, res) => {
    let auth_token = req.query.auth_token;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            let sectionInfo = new sectionList({
                code: req.body.value.code,
                name: req.body.value.name,
                description: req.body.value.description,
                status: req.body.value.status,
            });
            sectionInfo.save()
                .then( data => {
                    res.status(200).send(data);
                })
                .catch( err => {
                    res.status(400).json({message: 'Something Went Wrong'});
                })
        })
        .catch( err => {
            console.log(err);
        });
});

router.get('/section_list', (req, res) => {
    let auth_token = req.query.auth_token;
    let page = req.query.page;
    let per_page = req.query.per_page;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            sectionList.find()
                .then( data => {
                    const pager = paginate(data.length, page, per_page);
                    const items = data.slice(pager.startIndex, pager.endIndex + 1);
                    res.status(200).send({
                        items: items.reverse(),
                        total_count: pager.totalItems
                    });
                })
                .catch( err => {
                    res.status(400).json({message: 'Something Went Wrong'});
                });
        })
        .catch( err => {
            console.log(err);
        });
});

router.get('/section_detail', (req, res) => {
    let id = req.query.id;
    let auth_token = req.query.auth_token;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            sectionList.findById({_id: id})
                .then( data => {
                    res.status(200).send(data);
                })
                .catch( error => {
                    console.log('error', error);
                    res.status(400).json({message: 'Something Went Wrong'});
                })
        })
        .catch( err => {
            console.log(err);
        });
});

router.put('/section_detail', (req, res) => {
    let id = req.query.id;
    let auth_token = req.query.auth_token;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            let obj = {
                code: req.body.value.code,
                name: req.body.value.name,
                description: req.body.value.description,
                status: req.body.value.status,
            }
            sectionList.findByIdAndUpdate({_id: id}, {$set: obj}, {new: true})
                .then( data => {
                    res.status(200).send(data);
                })
                .catch( err => {
                    res.status(400).json({message: 'Something Went Wrong'});
                })
        })
        .catch( err => {
            console.log(err);
        });
});
// section API's end

// subject API's start
router.post('/subject_list', (req, res) => {
    let auth_token = req.query.auth_token;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            let subjectInfo = new subjectList({
                code: req.body.value.code,
                name: req.body.value.name,
                description: req.body.value.description,
                total_marks: req.body.value.total_marks,
                passing_marks: req.body.value.passing_marks,
                status: req.body.value.status,
            });
            subjectInfo.save()
                .then( data => {
                    res.status(200).send(data);
                })
                .catch( err => {
                    res.status(400).json({message: 'Something Went Wrong'});
                })
        })
        .catch( err => {
            console.log(err);
        });
});

router.get('/subject_list', (req, res) => {
    let auth_token = req.query.auth_token;
    let page = req.query.page;
    let per_page = req.query.per_page;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            subjectList.find()
                .then( data => {
                    const pager = paginate(data.length, page, per_page);
                    const items = data.slice(pager.startIndex, pager.endIndex + 1);
                    res.status(200).send({
                        items: items.reverse(),
                        total_count: pager.totalItems
                    });
                })
                .catch( err => {
                    res.status(400).json({message: 'Something Went Wrong'});
                });
        })
        .catch( err => {
            console.log(err);
        });
});

router.get('/subject_detail', (req, res) => {
    let id = req.query.id;
    let auth_token = req.query.auth_token;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            subjectList.findById({_id: id})
                .then( data => {
                    res.status(200).send(data);
                })
                .catch( error => {
                    console.log('error', error);
                    res.status(400).json({message: 'Something Went Wrong'});
                })
        })
        .catch( err => {
            console.log(err);
        });
});

router.put('/subject_detail', (req, res) => {
    let id = req.query.id;
    let auth_token = req.query.auth_token;
    session.find()
        .then( data => {
            if (data[data.length - 1].auth_token !== auth_token) {
                res.status(400).json({message: `User's Matching query does not exists` });
                return;
            }
            let obj = {
                code: req.body.value.code,
                name: req.body.value.name,
                description: req.body.value.description,
                total_marks: req.body.value.total_marks,
                passing_marks: req.body.value.passing_marks,
                status: req.body.value.status,
            }
            subjectList.findByIdAndUpdate({_id: id}, {$set: obj}, {new: true})
                .then( data => {
                    res.status(200).send(data);
                })
                .catch( err => {
                    res.status(400).json({message: 'Something Went Wrong'});
                })
        })
        .catch( err => {
            console.log(err);
        });
});
// subject API's end

module.exports = router;
