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

<style lang="sass">
.item-Text
  margin-top: 1rem
  margin-bottom: 1rem
  &_Container
    &.small
      .item-Text_Single
        padding-right: 1em
    &.large
      .item-Text_Single
        padding-right: 1em
    &.full
      .item-Text_Single
        padding-left: 1em
        padding-right: 1em
</style>
