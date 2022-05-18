import api from './index'

export const getLocations = async (page, data) => {
  const query = `
    query getLocations {
      locations(page: ${page}) {
        info {
          count
          pages
        }
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