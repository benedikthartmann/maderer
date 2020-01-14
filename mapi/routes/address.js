var express = require('express');
var router = express.Router();

let addressController = require("../controllers/addressController.js");

/* GET address listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource for address');
});

router.get('/list', addressController.address_list);
router.get('/:id', addressController.address_read);
router.post('/:id', addressController.address_createOrUpdate);

/**
router.param('id', function (req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.address = {
    id: id,
    name: 'TJ'
  }
  next()
})
*/
/*
router.route('/:id')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next()
  })
  .get(addressController)
  .put(function (req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name
    // save user ... etc
    res.json(req.user)
  })
  .post(function (req, res, next) {
    next(new Error('not implemented'))
  })
  .delete(function (req, res, next) {
    next(new Error('not implemented'))
  })
*/
module.exports = router;
