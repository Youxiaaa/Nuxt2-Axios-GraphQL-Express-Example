const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const { buildSchema } = require('graphql')

const schema = buildSchema(
  `
    input TodoData {
      id: String
      content: String
      isCompleted: Boolean
    }
    type Todos {
      id: String
      content: String
      isCompleted: Boolean
    }
    type Msg {
      msg: String
    }
    type Mutation {
      addTodo(input: TodoData): Msg
      completedTodo(id: ID!): Msg
      deletedTodo(id: ID!): Msg
    }
    type Query {
      getTodos: [Todos]
    }
  `
)

let todos = [
  {
    id: '52789453',
    content: '初始Content',
    isCompleted: false
  }
]

const root = {
  getTodos() {
    return todos
  },
  addTodo({ input }) {
    const response = {
      msg: ''
    }
    const data = {
      id: input.id,
      content: input.content,
      isCompleted: false
    }
    todos.push(data)
    response.msg = '新增成功'
    return response
  },
  completedTodo({ id }) {
    const response = {
      msg: ''
    }
    const target = todos.filter((item) => item.id === id)
    if (target.length !== 0) {
      const index = todos.map((item) => item.id).indexOf(id)
      todos[index].isCompleted = !todos[index].isCompleted
      response.msg = '編輯成功'
      return response
    } else {
      response.msg = '編輯失敗'
      return response
    }
  },
  deletedTodo({ id }) {
    const response = {
      msg: ''
    }
    const target = todos.filter((item) => item.id === id)
    if(target.length !== 0) {
      todos = todos.filter((item) => item.id !== id)
      response.msg = '刪除成功'
      return response
    } else {
      response.msg = '刪除失敗'
      return response
    }
  }
}


const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: false
}))


module.exports = {
  path: 'api',
  handler: app
}