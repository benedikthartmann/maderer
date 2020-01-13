'user strict';
var sql = require('./db.js');

var Address = function(data){
    this.data = data;
    //this.status = data.status;
    this.created_at = new Date();
};

/*
Address.read = function (id, result) {
  result(null,{
    "id": id,
    "firstname": "Valerie123",
    "lastname": "Lintner"
  });
};
*/

Address.read = function (id, result) {
        sql.query("Select id,firstname,lastname from address where id = ? limit 1", id, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res[0]);

                }
            });
};

Address.list = function (result) {
    // http://localhost:3001
        sql.query("Select id,firstname as name, CONCAT('https://maderer.appspot.com/address/',id) as url from address limit 100", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                  let listres = {
                    "count": 964,
                    "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
                    "previous": null,
                    "results": res
                  }
                    result(null, listres);

                }
            });
};

Address.update = function(id, addressobj, result){
    console.log(addressobj.data);
  sql.query("UPDATE address SET firstname = ?, lastname = ? WHERE id = ?", [addressobj.data.firstname,addressobj.data.lastname, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};

module.exports= Address;
