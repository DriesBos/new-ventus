<template>
  <section v-editable="blok" class="item item-NonImage item-Text">
    <div class="item_Container item-NonImage_Container item-Text_Container">
      <div class="item_Single item-NonImage_Single item-Text_Single">
        <LazyMarkdown :input="blok.text" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    blok: Object
  }
}
</script>
