<template>
  <div class="page-Slug">
    <!-- Storyblok integration commented out - add your content here -->
    <div class="container">
      <h1>{{ $route.params.slug }}</h1>
      <p>Add your custom content for this page here.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { story: { content: {}, name: this.$route.params.slug } }
  },
  head() {
    return {
      title: (this.$route.params.slug || "Page") + " — NEW VENTUS"
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
