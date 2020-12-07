<template>
  <div class="item_Single item-NonImage_Single item-Data_Single">
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
    // console.log(this.blok)
  }
}
</script>
