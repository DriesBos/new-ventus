<template>
  <div v-editable="blok" class="page">
    <component
      :is="blok.component | dashify"
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    ></component>
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  },
  mounted() {
    console.log("[Page] Full blok:", this.blok)
    console.log("[Page] Body:", this.blok?.body)
    if (this.blok?.body) {
      this.blok.body.forEach((item, index) => {
        console.log(`[Page] Body item ${index}:`, item)
        console.log(`[Page] Body item ${index} component:`, item.component)
      })
    }
  }
}
</script>
