# RESTful-API

RESTful API From Scratch Using Node, Express, Mongo DB and Backbone.js

### Getting Started

Representational state transfer or RESTful web services is an arhitectural style for designing network app, it's way of using HTTP protocol. In this project I use MEBN stack. Instead AngularJS I use BackboneJS on client-side.
The application manage with CRUD (Create, Read, Update, Delete) operations.

### Prerequisites

* Clone or download repo
* Node.js

### Install dependencies

    $ npm install

### Server start

    npm start

### Running the tests

    $ npm test


### Built With
* Express.js - creating routes
* MongoDB - database
* BackboneJS - frontend MV* framework
* Mocha & Chai - running and writting tests

### Good to know - MongoDB
#### Start mongo in shell

    $ mongo

    > use cinema

#### Basic shell commands:

select and use database:

    > use cinema

show selected databases:

    > show dbs

drop database

    > db.dropDatabase()

show collections in current db

    > show collections

create collection: Genres and Movies

    > db.createCollection('genres')
    > db.createCollection('movies')

delete by ID

    > db.movies.remove({_id: ObjectId("4f6f244f6f35438788aa138f")});

