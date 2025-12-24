<template>
  <div class="page-Index">
    <!-- Storyblok integration commented out - add your content here -->
    <div class="container">
      <h1>NEW VENTUS</h1>
      <p>Website is ready! Add your content here.</p>
      <p>Navigate to the projects or other pages to add more content.</p>
    </div>
    <!-- 
    <div v-editable="story.content">
      <component
        :is="story.content.component | dashify"
        v-if="story.content.component"
        :key="story.content._uid"
        :blok="story.content"
      ></component>
    </div>
    -->
  </div>
</template>

<script>
import onPageLoad from "@/mixins/onPageLoad"
// import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
  mixins: [onPageLoad],
  data() {
    return {
      story: { content: {}, name: "Home" }
    }
  },
  head() {
    return {
      title: "NEW VENTUS"
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
