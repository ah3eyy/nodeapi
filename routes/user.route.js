const express = require('express');
const app = express();
const userRoutes = express.Router();

//require business model in our routes model
let User = require('../models/user');


//defined store router
//app.post('/', function (req, res) {
userRoutes.route('/login').post(function(req, res){
      User.findOne({email: req.body.email})
        .exec()
          .then(function(user)
          {
              if(err){
                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
              }

              if(result){
                  return res.status(200).json({
                      success: 'welecome to JWT Auth'
                  });
              }

              return res.status(401).json({
                  failed: 'Unauthorized Access'
              });
          })
          .catch(error => {
            res.status(500).json({
                error: error
            });
          });
})



 module.exports = userRoutes;
