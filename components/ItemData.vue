<template>
  <div v-editable="blok" class="item item-Data">
    <div class="item-Data_Container item-Container medium">
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
    console.log(this.blok)
  }
}
</script>

<style lang="sass">
.item
  &-Data
    margin-top: var(--spacing-vertical)
    margin-bottom: var(--spacing-vertical)
    &_Container
      display: flex
      flex-direction: column
    &_Single
      display: flex
      padding: 1.25rem 0
      border-bottom: 1px solid black
      > div
        flex-basis: 50%
      .markdown
        p, h1, h2, h3, h4, h5
          font-size: $type-size-data
          line-height: $lineheight-data
        a
          text-decoration: none
          border-bottom: 1px solid black
      &:first-of-type
        border-top: 1px solid black
      &:last-of-type
        border-bottom: 1px solid black
</style>
