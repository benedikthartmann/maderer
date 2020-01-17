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
npm run start:dev
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
- https://stackabuse.com/managing-environment-variables-in-node-js-with-dotenv/

### Todos ###
- [x] db parameter in a separate config file like (https://stackabuse.com/managing-environment-variables-in-node-js-with-dotenv/)
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

### Problems
problems when installing Tailwindcss and next.js as described here (https://dev.to/notrab/get-up-and-running-with-tailwind-css-and-next-js-3a73). Reason because in next.config.js it seems only possible to export one module, and we already export the environment variables.

### Todos ###
- [x] api link in a config file -> next.config.js
- [x] if a new record is added it should be immediately visible in the list --> trigger
- [ ] pagination: scroll and load more container & div layout
- [ ] using next.js, what are the advantages? (routing)
- [ ] why the AddressForm is loaded three times?, if the addressform is loaded the list is reloaded
- [ ] decision for css framework: use tailwindcss?
- [ ] cancel, delete button
- [ ] uber date component
- [ ] how to deal with more pages and forms like events, ...
- [ ] master slave logic (head - position)
- [ ] wide screen scenario
