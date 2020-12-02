<template>
  <div class="item-Data_Single item-Single">
    <LazyMarkdown :input="blok.text_left" />
    <LazyMarkdown :input="blok.text_right" />
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  },
  mounted() {
    console.log(this.blok)
  }
}
</script>
