const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

// Get all accounts 
router.get('/', (req, res) => {     
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(err => {
        res.status(500).json({ message: 'problem with the database' });
    })
});

// get one account by id 
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('accounts').where({ id })
        .then(account => {
            if (account[0]) {
                res.status(200).json(account);
            } else {
                res.status(404).json({ message: 'invalid id' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'db problem' });
        })
});

// Delete an account 
// Add an account 
module.exports = router;