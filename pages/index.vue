<template>
  <section class="w-full min-h-screen bg-gradient-to-tr from-pink-300 to-purple-300 flex justify-center items-center">
    <ul class="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white rounded-lg p-4 shadow-md">
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
  }
}
</script>
