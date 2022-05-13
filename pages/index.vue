<template>
  <section class="w-full h-screen bg-gradient-to-tr from-pink-300 to-purple-300 flex justify-center items-center">
    <div class="w-[90%] max-w-[400px] bg-white p-4 rounded-xl shadow-md">
      <div class="w-full relative overflow-hidden rounded-2xl">
        <input @keyup.enter="addTodo" v-model="newTodo" type="text" class="px-3 py-1.5 border border-[#bebebe] rounded-2xl w-full">
        <div @click="addTodo" class="absolute right-0 top-0 w-[38px] h-[38px] rounded-full bg-pink-300 text-white flex justify-center items-center text-lg">+</div>
      </div>
      <ul class="w-full flex items-center gap-4 mt-4">
        <li @click="selectedTab = item.label" v-for="item in tabMenu" :key="item.id" class="w-full text-center px-3 py-2 bg-[#fafafa] rounded-xl cursor-pointer" :class="{'shadow-md': selectedTab !== item.label, ' shadow-inner': selectedTab === item.label}">
          <p>{{ item.label }}</p>
        </li>
      </ul>
      <transition-group tag="ul" name="fade" class="flex flex-col gap-4 mt-4">
        <li v-for="item in filterTodos" :key="item.id + 123123" class="flex justify-between px-4 py-2 shadow-md bg-[#fafafa] rounded-xl">
          <div class="flex items-center gap-2">
            <label :for="item.id" class="w-5 h-5 border border-[#bebebe] rounded-full flex justify-center items-center cursor-pointer">
              <div class="w-3.5 h-3.5 bg-pink-300 rounded-full scale-0 duration-300" :class="{'scale-100': item.isCompleted}"></div>
            </label>
            <input @change="completedTodo(item.id)" :id="item.id" v-model="item.isCompleted" type="checkbox" class="hidden">
            <p class="text-[#555]" :class="{'line-through': item.isCompleted}">{{ item.content }}</p>
          </div>
          <a @click="deletedTodo(item.id)" class="cursor-pointer">X</a>
        </li>
      </transition-group>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData(context) {
    let todos = []
    // 參數帶上需要回傳的key值
    await context.$api.getTodos('id content isCompleted')
    .then((res) => {
      todos = res
    })
    return { todos }
  },
  data() {
    return {
      todos: [],
      newTodo: '',
      selectedTab: '全部',
      tabMenu: [
        {id: 1, label: '全部'},
        {id: 2, label: '待完成'},
        {id: 3, label: '已完成'},
      ]
    }
  },
  methods: {
    async getTodos() {
      // 參數帶上需要回傳的key值
      await this.api.getTodos('id content isCompleted')
      .then((res) => {
        this.todos = res
      })
      .catch((err) => {
        console.log(err)
      })
    },
    addTodo() {
      const content = this.newTodo.trim()
      if (!content) return
      let data = {
        id: Math.floor(Date.now()).toString(),
        content,
        isCompleted: false
      }
      this.api.addTodo(data)
      .then((res) => {
        this.getTodos()
        this.newTodo = ''
        console.log(res)
      })
      .catch((err) => console.log(err))
    },
    completedTodo(id) {
      this.api.completedTodo(id)
      .then((res) => {
        this.getTodos()
        console.log(res)
      })
      .catch((err) => console.log(err))
    },
    async deletedTodo(id) {
      await this.api.deletedTodo(id)
      .then((res) => {
        console.log(res)
        this.getTodos()
      })
      .catch((err) => console.log(err))
    }
  },
  computed: {
    filterTodos() {
      switch(this.selectedTab) {
        case '全部':
          return this.todos
        case '待完成':
          return this.todos.filter((item) => !item.isCompleted)
        case '已完成':
          return this.todos.filter((item) => item.isCompleted)
      }
    }
  }
}
</script>
