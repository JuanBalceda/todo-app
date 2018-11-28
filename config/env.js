process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
process.env.PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'dev') {
  process.env.URL_DB = 'mongodb://rhtest:123456@localhost:27017/todo_app'
} else {
  process.env.URL_DB = 'mongodb://todo-db:rh2019@ds119024.mlab.com:19024/jb-todo'
}
