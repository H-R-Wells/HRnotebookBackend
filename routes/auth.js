const { Router } = require("express");
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Create a user using: POST "api/auth/createuser". No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 5 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 char').isLength({ min: 5 })
],(req,res)=>{

    // If there are errors , return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Create user in database
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=> {console.log(err)
    res.json({error: "Please enter a unique value for email",message:err.message})});
})

module.exports = router