<template>
  <div class="about-Toggle" @click="emitClicked()">
    <p v-if="aboutProp">close</p>
    <p v-else>about</p>
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
    cursor: pointer
    pointer-events: auto
    mix-blend-mode: difference
    z-index: $about
    p
      font-size: 1.25rem
      line-height: 2em
      padding: 1em
      font-family: 'Presicav', sans-serif
      text-transform: uppercase
</style>
