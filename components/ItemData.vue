<template>
  <div v-editable="blok" class="item item-NonImage item-Data mixBlend">
    <div class="item_Container item-NonImage_Container item-Data_Container">
      <component
        :is="blok.component | dashify"
        v-for="blok in blok.body"
        :key="blok._uid"
        :blok="blok"
      ></component>
    </div>
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

<style lang="sass">
.item
  &-Data
    &_Single
      display: flex
      padding: 1.25rem 0
      border-bottom: 1px solid currentColor
      > div
        flex-basis: 50%
      .markdown
        p, h1, h2, h3, h4, h5, a
          font-size: $type-size-data
          line-height: $lineheight-data
        a
          text-decoration: none
          border-bottom: 1px solid currentColor
      &:first-of-type
        border-top: 1px solid currentColor
      &:last-of-type
        border-bottom: 1px solid currentColor
</style>
