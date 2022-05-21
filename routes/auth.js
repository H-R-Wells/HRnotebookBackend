const { Router } = require("express");
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { response } = require("express");



// Just a message at web page about what we are doing at this endpoint
router.get('/createuser',(req,res)=>{
  res.send("We are creating a user at this endpoint");
});




router.post('/createuser',
 [
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 char').isLength({ min: 5 })
],


async (req, res) => {



  // If there are errors , return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }



  // Check whether the user with this email is already exists 

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(404).json({ error: "User already exist with this email id" })
    }
    // Create a user using: POST "api/auth/createuser". No login required
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Sone error occured")
  }
})

module.exports = router