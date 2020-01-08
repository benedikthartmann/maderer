DEBUG=portlasrv:* npm start

or
set DEBUG=portlasrv:*
npm start


npm install nodemon --save-dev

    "start": "if [[ ${NODE_ENV} == \"production\" ]]; then node ./bin/www; else nodemon ./bin/www; fi"


tutorials:
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
db: https://www.codementor.io/@julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2
http://stayregular.net/blog/make-a-nodejs-api-with-mysql
