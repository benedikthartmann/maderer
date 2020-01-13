# Maderer - Fullstack Webapplication
## Introduction
Fullstack webapplication test environment with:
* client:
  - react
  - next
  - zeit swr
* backend:
  - node.js
  - express
  - mysql
* optimized for gcloud hosting

## backend: mapi
### Development
Start Development Server:
```
set DEBUG=portlasrv:*
npm start
```

### Deployment ###
```
gcloud app deploy
```

### References
Helpful Tutorials:
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
- https://www.codementor.io/@julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2
- http://stayregular.net/blog/make-a-nodejs-api-with-mysql

### Todos ###
- [ ] db parameter in a seperate config file like (https://medium.com/@austinhale/building-a-node-api-with-express-and-google-cloud-sql-9bda260b040f)
- [ ] api link in a config file

## client: mclient
### Development
run it:
start local mysql docker:
```
docker start mysql
```

Start Development Server:
```
npm run dev
Start Development Server:
```
activate CORS Plugin in Browser

### Deployment ###
- change the location of the api in the AddressList.js
- run:
```
npm run build
```
- copy to content of the folder "out" to the project mapi/public

### References
- based on: https://sergiodxa.com/articles/swr/intro/
- modal popup tailwind: https://www.tailwindtoolbox.com/components/modal

### Todos ###
- [ ] api link in a config file
- [ ] pagination: scroll and load more container & div layout
