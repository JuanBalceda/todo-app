# Todo-App

Restful API developed with Node.js, Express.js and MongoDB.

## Root endpoint

```bash
 $ curl 
```

## Available paths
Path | Method | Description 
----------|----------|----------


## Requirements

For replicating this demo the following software is required:

* Download and install [Node.js and npm](https://nodejs.org/en/).
* Download and install [MongoDB](https://www.mongodb.com/). For this demo a [Docker container](#mongodb-docker-commands) was used.
* (Optional) Download and install [Postman](https://www.getpostman.com/). Recommended for testing purposes.

## Local Installation Instructions

1. 
2. 
3. 

## NPM Commands (Dependencies)

```bash
 $ npm init
 $ npm install nodemon
 $ npm install express
 $ npm install mongoose
```

## MongoDB Docker commands

```bash
$ docker container run -p 27017:27017 --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=123456 -d mongo:latest
$ docker exec -it mongodb bash
```
## MongoDB commands

```bash
# On container shell
$ mongo --authenticationDatabase admin -u admin -p 123456

# On mongodb shell
use todo_app
db.createUser(
  {
    user: "rhtest",
    pwd: "123456",
    roles: [ 
       { role: "readWrite", db: "todo_app" }
    ],
    mechanisms:[  
        "SCRAM-SHA-1"
    ]
  }
)
```

## License

This app is [MIT licensed](./LICENSE).