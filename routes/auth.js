const express = require('express');
const router = express.Router()

router.get('/', (req,res) =>{
    obj = {
        a: 'shubham',
        number: 88
    }
    res.json(obj)
})

module.exports = router