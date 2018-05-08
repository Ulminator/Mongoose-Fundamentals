var Standup = require('../models/standup.server.model');

exports.create = function(req, res) {
    var entry = new Standup({
        memberName: req.body.memberName,
        project: req.body.project,
        workYesterday: req.body.workYesterday,
        workToday: req.body.workToday,
        impediment: req.body.impediment,
    });

    //validate name
    // entry.schema.path('memberName').validate(function(value) {
    //     return value != 'None';
    // }, 'You must select a team member name.')

    entry.save((err) => {
        if(err){
            var errMsg = 'Sorry, there was an error saving the stand-up meeting note. ' + err;
            console.log(err);
            res.render('newnote', {title: 'Standup - New Note (error)', message: errMsg});
        }
        else{
            console.log('Stand-up meeting note was saved!');
            res.redirect(301, '/');
        }
    });

};

exports.getNote = function(req, res) {
    res.render('newnote', {title: 'Standup - New Note'});
}

exports.list = function(req, res) {
    var query = Standup.find();

    query.sort({ createdOn: 'desc' })
        .limit(12)
        .exec(function(err, results){
            res.render('index', {title: 'Standup - Lit', notes: results}); //where swig in index.js gets notes
        })
}

exports.filterByMember = function(req, res) {
    var query = Standup.find();
    var filter = req.body.memberName;

    query.sort({ createdOn: 'desc' });

    if (filter.length > 0){
        query.where({memberName: filter})
    }

    query.exec(function(err, results) {
        res.render('index', {title: 'Standup - List', notes: results});
    })
}