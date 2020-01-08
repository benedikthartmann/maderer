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
        sql.query("Select id,firstname as name, CONCAT('http://localhost:3001/address/',id) as url from address limit 100", function (err, res) {
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


/*
var addresslist = {
  "count": 964,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [{
      "id": "1",
      "name": "Valerie",
      "url": "http://localhost:3001/address/1"
    },
    {
      "id": "2",
      "name": "Flora",
      "url": "http://localhost:3001/address/2"
    },
    {
      "id": "3",
      "name": "Kinski",
      "url": "http://localhost:3001/address/3"
    },
    {
      "id": "4",
      "name": "Herzog",
      "url": "http://localhost:3001/address/4"
    },
    {
      "id": "5",
      "name": "Paul",
      "url": "http://localhost:3001/address/5"
    },
    {
      "id": "6",
      "name": "Herbert",
      "url": "http://localhost:3001/address/6"
    },
    {
      "id": "7",
      "name": "Mueller",
      "url": "http://localhost:3001/address/7"
    }
  ]
};

Address.list = function (result) {
  result(null,addresslist);
};
*/

module.exports= Address;
