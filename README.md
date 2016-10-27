# RESTful-API
RESTful API From Scratch Using Node, Express, Mongo DB and Backbone.js

Backend: Node.js, Express, MongoDB

Frontend: Backbone.js

###Server start

    $ npm install

    npm start

###Run test

    $ npm test

###Start mongo in shell

    $ mongo

    > use cinema

####Basic shell commands:

    *select and use database:
      > use library
    *show selected databases:
      > show dbs
    *drop database
      > db.dropDatabase()
    *show collections in current db
      > show collections
    *create collection: Books and Genres
        > db.createCollection('books')
        > db.createCollection('movies')
    *delete by ID
        > db.movies.remove({_id: ObjectId("4f6f244f6f35438788aa138f")});


###Install RESTEasy Chrome extension

  It allows developers a way of being able to debug and analyze an Http request/response. You can select methods for making request, such as GET, POST, PUT, DELETE and use in our workshop.

![alt text](https://github.com/domazet93/RESTful-API/blob/master/restEasy.gif)

