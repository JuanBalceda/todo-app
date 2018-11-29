# Todo-App

Restful API developed with Node.js, Express.js and MongoDB and secured with JSON Web Token.

## Root endpoint

https://jb-todo-api.herokuapp.com/v1

## Available paths

Path | Method | Description 
----------|----------|----------
/tasks | post | Creates a new task
/tasks | get | Retrieve all tasks
/tasks/:id | get | Retrieve a task for a given id
/tasks/filter/:filter | get |  Retrieve all tasks for a given keyword
/tasks/:id | put | Updates a task for a given id
/tasks/:id | delete | Deletes a task for a given id

## Requirements

For replicating this demo the following software is required:

* Download and install [Node.js and npm](https://nodejs.org/en/).
* Download and install [MongoDB](https://www.mongodb.com/). For this demo a [Docker container](#mongodb-docker-commands) was used.
* (Optional) Download and install [Postman](https://www.getpostman.com/). Recommended for testing purposes.

## Getting Started

1. Clone the repository: `git clone https://github.com/JuanBalceda/todo-app.git`
2. Install all dependencies `npm install`
3. Configure the `/config/env.js`
4. Start the server `node start` or `npm restart` (nodemon)
5. Test the API with [Postman](https://www.getpostman.com/).

## How it works

The chosen endpoint will perform certain action if the username is specified on the jwt payload.

Example payload data:

```json
{
  "username": "juanbalceda",
  "iat": 1543438543
}
```


`https://jb-todo-api.herokuapp.com/v1/tasks`

```json
{
  "done":false,
  "_id":"5bfe89bf4d5f760016e4723a",
  "task":"Test API through UI",
  "who":"juanbalceda",
  "dueDate":"2018-11-29T00:00:00.000Z",
  "created":"2018-11-28T12:27:43.938Z",
  "__v":0
}
```
For more information about how jwt works, visit: https://jwt.io/

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
    ]
  }
)
```

## License

This app is [MIT licensed](./LICENSE).