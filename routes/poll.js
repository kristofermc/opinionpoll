const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '976570',
    key: 'a1546fab7abad0216516',
    secret: '88862991ca8d6ac0369b',
    cluster: 'eu',
    encrypted: true
  });

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({success: true,
    votes: votes}));
});

router.post('/', (req, res) => {
    const newVote = {
        lang: req.body.lang,
        points: 1
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('lang-poll', 'lang-vote', {
            points: parseInt(vote.points),
            lang: vote.lang
    });
    window.reload()
        return res.json({ success: true, message: 'Thank you for your opinion!' });
    });
});

module.exports = router;
