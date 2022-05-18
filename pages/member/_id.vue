<template>
  <section class="w-full min-h-screen flex flex-col items-center justify-center">
    <button @click="$router.go(-1)" class="p-4 bg-gradient-to-tr from-pink-300 to-purple-300 text-white rounded-lg mb-4">to prev page</button>
    <div class="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 border border-[#bebebe]">
      <img :src="character.image" :alt="character.name" class="w-32 h-32 rounded-full">
      <div class="flex flex-col gap-4">
        <h2>Name : {{ character.name }}</h2>
        <p>Gender : {{ character.gender }}</p>
        <p>Location : {{ character.location.name }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'member-id',
  async asyncData(context) {
    let character = {}
    const query = 'id name gender image location { name }'
    // 第一個參數帶上ID 第二個參數帶上需要回傳的key值
    await context.$api.getCharacter(context.params.id, query)
    .then((res) => {
      character = res.data.data.character
    })
    .catch((err) => console.log(err))
    return { character }
  }
}
</script>
