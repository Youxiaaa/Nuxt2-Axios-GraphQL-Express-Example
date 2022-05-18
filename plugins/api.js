import Vue from 'vue'
import {
  getCharacters,
  getCharacter

} from '~/api/member'

export default({}, inject) => {
  const api = {
    getCharacters,
    getCharacter
  }
  Vue.prototype.api = api
  inject('api', api)
}