<template>
  <div v-editable="blok" class="item item-Text">
    <div class="item-Text_Container item-Container" :class="blok.size">
      <div class="item-Text_Single item-Single">
        <LazyMarkdown :input="blok.text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  }
}
</script>
