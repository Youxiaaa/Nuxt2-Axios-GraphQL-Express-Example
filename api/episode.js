import api from './index'

export const getEpisodes = async (page, data) => {
  const query = `
    query getEpisodes {
      episodes (page: ${page}) {
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
    query,
    variables
  }

  return await api.post('/graphql', graphqlQuery)
}