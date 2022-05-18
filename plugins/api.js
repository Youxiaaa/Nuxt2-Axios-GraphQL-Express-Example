import Vue from 'vue'
import {
  getCharacters,
  getCharacter
} from '~/api/member'
import {
  getLocations
} from '~/api/location'
import {
  getEpisodes
} from '~/api/episode'

export default({}, inject) => {
  const api = {
    getCharacters,
    getCharacter,
    getLocations,
    getEpisodes
  }
  Vue.prototype.api = api
  inject('api', api)
}