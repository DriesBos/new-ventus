<template>
  <section v-editable="blok" class="item item-NonImage item-Data mixBlend">
    <div class="item_Container item-NonImage_Container item-Data_Container">
      <component
        :is="blok.component | dashify"
        v-for="blok in blok.body"
        :key="blok._uid"
        :blok="blok"
      ></component>
    </div>
  </section>
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
        margin-bottom: 0
        white-space: normal
        p, h1, h2, h3, h4, h5, a
          font-size: $type-size-data
          line-height: $lineheight-data
        a
          text-decoration: none
          &:before
            content: ''
            position: absolute
            left: 0
            bottom: 0
            right: 0
            height: 1px
            background: currentColor
      &:first-of-type
        border-top: 1px solid currentColor
      &:last-of-type
        border-bottom: 1px solid currentColor
</style>
