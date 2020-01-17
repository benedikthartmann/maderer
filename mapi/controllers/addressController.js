var Address = require('../models/address');

exports.address_read = function(req, res) {
  Address.read(req.params.id, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.address_list = function(req, res) {
  Address.list(req.query.offset,req.query.limit,function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.address_createOrUpdate = function(req, res) {
  Address.createOrUpdate(req.params.id, new Address(req.body), function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

/*
exports.address_read = function(req, res) {
    res.json(
      req.address = {
        id: req.params.id,
        name: 'TJ'
      });
};
*/
