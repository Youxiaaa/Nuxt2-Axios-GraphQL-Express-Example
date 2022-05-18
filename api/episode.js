import api from './index'

export const getEpisodes = async (data) => {
  const query = `
    query getEpisodes {
      episodes {
        results {
          ${data}
        }
      }
    }
  `

  const variables = {}
  const graphqlQuery = {
    query,
    variables
  }

  return await api.post('/graphql', graphqlQuery)
}