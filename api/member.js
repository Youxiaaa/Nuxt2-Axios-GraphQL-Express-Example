import api from './index'

export const getCharacters = async (data) => {
  const query = `
    query getCharacters{
      characters {
        results {
          ${data}
        }
      }
    }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return await api.post('/graphql', graphqlQuery)
}

export const getCharacter = async (id, data) => {
  const query = `
    query getCharacter($id: ID!) {
      character(id: $id) {
        ${data}
      }
    }
  `
  const variables = {
    id
  }

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return await api.post('/graphql', graphqlQuery)
}