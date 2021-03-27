const express = require('express');
const router = express.Router();

const user = 'chandan';

router.get('/', (req, res) => {
    res.send('<h1>welcome to home page {{user}}</h1>');
});
module.exports = router;


