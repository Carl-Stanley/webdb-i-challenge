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
        res.status(500).json({ message: 'Error' });
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
                res.status(404).json({ message: 'id not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error' });
        })
});

// Delete an account 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const count = await db.del().from('accounts').where({ id });
        count ? res.status(200).json({ deleted: count })
            : res.status(404).json({ message: 'id not found' });
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err });
    }


});

// Add an account 
router.post('/', async (req, res) => {
    const postData = req.body;

    try {
        const post = await db.insert(postData).into('accounts');
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err });
    }

    return; 
    db.insert(postData).into('accounts')
        .then(account => {
            res.status(201).json(account);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error', error: err });
        });

});

// Update an account 
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts').where({ id }).update(changes)
        .then(count => {
            if (count) {
                res.status(200).json({ updated: count });
            } else {
                res.status(404).json({ message: 'id not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error' });
        });


});
module.exports = router;