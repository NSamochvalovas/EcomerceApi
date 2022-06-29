const express = require('express');
const {verifyAuth} = require('../middelware/verifyToken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

//Update
router.put("/:id", verifyAuth, async (req, res) => {
  if(req.body.password){
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }

  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new:true});

    res.status(200).send({ msg:'Data updated'});

  }catch(err){
    res.status(500).send(err);
  }
});

module.exports = router;