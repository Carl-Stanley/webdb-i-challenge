const express = require('express');

const db = require('./data/dbConfig');

const BudgetRouter = require('./budget/budget-router');


const server = express();

server.use(express.json());

server.use('/api/accounts', BudgetRouter);

server.get('/', (req, res) => {

    res.send('<h3>Accounts DB Default</h3>');
 
});

module.exports = server;