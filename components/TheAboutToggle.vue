<template>
  <div class="fullscreenEnabled about-Toggle">
    <a
      v-if="!aboutProp"
      href="mailto:film@newventus.nl?subject=Konichiwa!"
      target="_blank"
      title="mail"
      >mail</a
    >
    <a v-if="!aboutProp" href="tel:+31648591921" title="call">call</a>
    <p v-if="aboutProp" title="close about" @click="emitClicked()">close</p>
    <p v-else title="open about" @click="emitClicked()">about</p>
  </div>
</template>

<script>
export default {
  props: {
    aboutProp: Boolean
  },
  mounted() {
    console.log("TOOGGLE ABOUTPROP", this.aboutProp)
  },
  methods: {
    emitClicked() {
      this.$emit("clicked")
    }
  }
}
</script>

<style lang="sass">
.about
  &-Toggle
    position: fixed
    top: 0
    right: 0
    display: flex
    flex-direction: row
    align-items: flex-end
    cursor: pointer
    pointer-events: auto
    mix-blend-mode: difference
    z-index: $about
    padding-top: 1rem
    p, a
      position: relative
      font-size: 1.25rem
      line-height: 1.33em
      font-family: 'Presicav', sans-serif
      text-transform: uppercase
      text-decoration: none
      text-align: right
      display: inline
      margin-right: 1.66rem
      &:hover
        &::after
          position: absolute
          bottom: 0
          left: 0
          width: 100%
          height: 2px
          background: white
          content: ''
    a:last-child
      margin-right: 1rem
</style>
