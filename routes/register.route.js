const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const registerRoutes = express.Router();

//require business model in our routes model
let Register = require('../models/register');


//defined store router
//app.post('/', function (req, res) {
registerRoutes.route('/add').post(function(req, res){
  let user = new Register(req.body);
    user.save()
      .then(user => {
            res.status(200).json({'user': true, 'name' : req.body.email});
      })
      .catch(err => {
          res.status(400).send('unable to log user');
      });
});

registerRoutes.route('/login').post(function(req, res){
  Register.findOne({ email: req.body.email }, function (err, adventure) {
          if(err){
            return res.status(401).json({
              failed: 'Unauthorized Access'
           });
          }

          if(adventure) {
             if(adventure.password == req.body.password){
           //    return res.status(200).json({
           //    success: adventure.password
           // });
           const JWTToken = jwt.sign({
                      email: adventure.email,
                      _id: adventure._id
                    },
                'secret',
                      {
                        expiresIn: '2h'
                      });
                      return res.status(200).json({
                          success: 'Verification Passed',
                          token: JWTToken,
                          user: adventure.email
                  });
          }

         else{
           return res.status(200).json({
           erorr: 'failed Unauthorized'
          })
         }
      }
  })
    .catch(err => {
      res.status(500).json({
         error: error
      });
   });
});

 module.exports = registerRoutes;
