const Message = require('../models/message');
const { body,validationResult } = require('express-validator');

exports.messageGet = (req, res, next) => {
  res.render('messageForm');
}

exports.messagePost = [
  body('title', 'Empty title').trim().isLength({ min: 1 }).escape(),
  body('message', 'Empty message').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('messageForm', { errors: errors.array() });
    }else {
      const message = new Message(
        {
          title: req.body.title,
          message: req.body.message,
          date: new Date(),
          user: req.user.id,
        }
      ).save(err => {
        if (err) { return next(err); }
    
        res.redirect('/');
      })
    } 

  }
]