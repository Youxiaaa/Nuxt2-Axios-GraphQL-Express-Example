import Vue from 'vue'
import {
  getTodos,
  addTodo,
  completedTodo,
  deletedTodo
} from '~/api/todos'

export default({}, inject) => {
  const api = {
    getTodos,
    addTodo,
    completedTodo,
    deletedTodo
  }
  Vue.prototype.api = api
  inject('api', api)
}