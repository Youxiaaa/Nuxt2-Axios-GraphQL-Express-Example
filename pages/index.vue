<template>
  <section class="w-full min-h-screen bg-gradient-to-tr from-pink-300 to-purple-300 flex flex-col justify-center items-center px-4">
    <div v-if="isLoading" class="w-full h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.25)] backdrop-blur-sm flex items-center justify-center">
      <h2 class="text-white font-bold text-4xl">Loading...</h2>
    </div>
    <div class="flex items-center gap-4 self-start mt-10">
      <button @click="changeSelect('character')" class="px-4 py-2 text-white rounded-lg duration-300" :class="{'bg-green-300': selected === 'character', 'bg-[#f1f1f1] text-black': selected !== 'character'}">Show Character</button>
      <button @click="changeSelect('location')" class="px-4 py-2 text-white rounded-lg duration-300" :class="{'bg-green-300': selected === 'location', 'bg-[#f1f1f1] text-black': selected !== 'location'}">Show Location</button>
      <button @click="changeSelect('episode')" class="px-4 py-2 text-white rounded-lg duration-300" :class="{'bg-green-300': selected === 'episode', 'bg-[#f1f1f1] text-black': selected !== 'episode'}">Show Episode</button>
    </div>

    <ul v-if="selected === 'character'" class="mb-10 w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white rounded-lg p-4 shadow-md">
      <li @click="$router.push(`/member/${item.id}`)" v-for="item in characters" :key="item.id" class="cursor-pointer">
        <div class="flex items-center gap-4">
          <img :src="item.image" :alt="item.name" class="w-20 h-20 rounded-full">
          <div class="p-4 bg-[#f1f1f1] w-full">
            <h2>Name : {{ item.name }}</h2>
            <p>Gender : {{ item.gender }}</p>
            <p>Location : {{ item.location.name }}</p>
          </div>
        </div>
      </li>
    </ul>

    <ul v-else-if="selected === 'location'" class="mb-10 w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white rounded-lg p-4 shadow-md">
      <li v-for="item in locations" :key="item.id" class="p-4 bg-[#efefef] rounded-lg shadow-md hover:shadow-inner">
        <p>Name : {{ item.name }}</p>
        <p>Type : {{ item.type }}</p>
        <p>Dimension : {{ item.dimension }}</p>
        <button @click="showResidents === item.id ? showResidents = 0 : showResidents = item.id" class="py-1.5">
          <p v-if="showResidents !== item.id">Residents [{{ item.residents.length }}]: <span class="text-green-500">Show Residents</span></p>
          <p v-else>Residents [{{ item.residents.length }}] : <span class="text-red-400">Hide Residents</span></p>
        </button>
        <ul class="max-h-0 overflow-hidden duration-700 flex flex-col gap-4" :class="{'max-h-[7000px]': showResidents === item.id}">
          <h2 v-if="item.residents.length === 0" class="text-red-400">No resident on this location</h2>
          <li @click="$router.push(`/member/${resident.id}`)" v-for="resident in item.residents" :key="resident.id" class="flex items-center gap-4 cursor-pointer">
            <img :src="resident.image" :alt="resident.name" class="w-10 h-10 rounded-full">
            <h2>{{ resident.name }} - {{ resident.gender }}</h2>
          </li>
        </ul>
      </li>
    </ul>

    <ul v-else class="mb-10 w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white rounded-lg p-4 shadow-md">
      <li v-for="item in episodes" :key="item.id" class="p-4 bg-[#e4e4e4] flex flex-col gap-4 rounded-lg shadow-md">
        <h2>Name : {{ item.name }} - {{ item.air_date }}</h2>
        <p>Episode : {{ item.episode }}</p>
        <p @click="showCharacter === item.id ? showCharacter = 0 : showCharacter = item.id" class="cursor-pointer">
          <span v-if="showCharacter !== item.id" class="text-green-500">Show Characters</span>
          <span v-else class="text-red-400">Hide Characters</span>
          [{{ item.characters.length }}]
        </p>
        <ul class="max-h-0 overflow-hidden duration-700 flex flex-col gap-4" :class="{'max-h-[2000px]': showCharacter === item.id}">
          <li @click="$router.push(`/member/${character.id}`)" v-for="character in item.characters" :key="character.id" class="flex items-center gap-4 cursor-pointer">
            <img :src="character.image" :alt="character.name" class="w-14 h-14 rounded-full">
            <h2>{{ character.name }} - {{ character.gender }}</h2>
          </li>
        </ul>
      </li>
    </ul>

  </section>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData(context) {
    let characters = []
    const query = 'id name gender image location { name }'
    // 參數帶上需要回傳的key值
    await context.$api.getCharacters(query)
    .then((res) => {
      characters = res.data.data.characters.results
    })
    .catch((err) => console.log(err))
    return { characters }
  },
  data() {
    return {
      selected: 'character',
      isLoading: false,
      locations: [],
      showResidents: 0,
      episodes: [],
      showCharacter: 0
    }
  },
  methods: {
    async changeSelect(selectName) {
      if (this.selected === selectName) return
      this.isLoading = true
      this.selected = selectName
      if (this.selected === 'character') this.isLoading = false
      if (this.selected === 'location') {
        if (this.locations.length === 0) {
          const data = 'id name type dimension residents {id name gender image}'
          await this.api.getLocations(data)
          .then((res) => {
            this.locations = res.data.data.locations.results
            this.$nextTick(() => {
              this.isLoading = false
            })
          })
          .catch((err) => {
            this.isLoading = false
            console.log(err)
          })
        } else {
          this.isLoading = false
        }
      }
      if (this.selected === 'episode') {
        if (this.episodes.length === 0) {
          const query = 'id name air_date episode characters { id name gender image }'
          this.api.getEpisodes(query)
          .then((res) => {
            this.episodes = res.data.data.episodes.results
            this.$nextTick(() => {
              this.isLoading = false
            })
          })
          .catch((err) => {
            this.isLoading = false
            console.log(err)
          })
        } else {
          this.isLoading = false
        }
      }
    },
  }
}
</script>
