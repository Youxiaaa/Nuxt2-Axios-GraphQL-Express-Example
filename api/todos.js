import axios from 'axios'

const headers = {
  'Content-Type': 'application/json'
}

export const getTodos = async (data) => {
  const query = `
    query Todos{
      getTodos {
        ${data}
      }
    }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  const response = await axios({
    url: 'http://localhost:3000/api/graphql',
    headers,
    method: 'POST',
    data: graphqlQuery
  })
  return response.data.data.getTodos
}

export const addTodo = async (data) => {
  const query = `
  mutation {
    addTodo(input: { id: "${data.id}", content: "${data.content}", isCompleted: false }) {
      msg
    }
  }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  const response = await axios({
    url: 'http://localhost:3000/api/graphql',
    headers,
    method: 'POST',
    data: graphqlQuery
  })
  return response.data.data.addTodo.msg
}

export const completedTodo = async (id) => {
  const query = `
  mutation {
    completedTodo(id: "${id}") {
      msg
    }
  }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  const response = await axios({
    url: 'http://localhost:3000/api/graphql',
    headers,
    method: 'POST',
    data: graphqlQuery
  })
  return response.data.data.completedTodo.msg
}

export const deletedTodo = async (id) => {
  const query = `
  mutation {
    deletedTodo(id: "${id}") {
      msg
    }
  }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  const response = await axios({
    url: 'http://localhost:3000/api/graphql',
    headers,
    method: 'POST',
    data: graphqlQuery
  })
  return response.data.data.deletedTodo.msg
}