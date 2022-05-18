import api from './index'

export const getLocations = async (data) => {
  const query = `
    query getLocations {
      locations {
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