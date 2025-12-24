<template>
  <div class="page page-Project_Slug">
    <!-- Storyblok integration commented out - add your project content here -->
    <div class="container">
      <h1>Project: {{ $route.params.slug }}</h1>
      <p>Add your project content here.</p>
    </div>
  </div>
</template>

<script>
import onPageLoad from "@/mixins/onPageLoad"

export default {
  mixins: [onPageLoad],
  data() {
    return {
      story: { content: {}, name: this.$route.params.slug }
    }
  },
  head() {
    return {
      title: (this.$route.params.slug || "Project") + " — NEW VENTUS"
    }
  },
  methods: {
    scrollDown() {
      var position = window.innerHeight
      window.scrollTo({
        top: position,
        behavior: "smooth"
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  padding: 2rem
  max-width: 1200px
  margin: 0 auto
</style>

<style lang="sass">
.page-Project_ScrollDown
  z-index: 999
  cursor: pointer
  position: absolute
  top: calc(100vh - (((100vh - 30vw)/2) / 2))
  left: calc(20vw + 4.86rem)
  transform: translate(-50%, -50%)
  @media screen and ( max-width: $breakpoint-mobile)
    top: calc(100vh - 1.25rem)
    left: 50%
    transform: translate(-50%, -100%)
  svg
    fill: none
</style>
