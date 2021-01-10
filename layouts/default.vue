<template>
  <!-- Change if needed -->
  <main lang="en-US" translate="no">
    <LazyTheNavViewer />
    <nuxt />
    <LazyTheAbout :about-prop="aboutState" />
    <LazyTheAboutToggle :about-prop="aboutState" @clicked="toggleAbout" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      aboutState: false
    }
  },
  methods: {
    toggleAbout() {
      this.aboutState = !this.aboutState
    }
  }
}
</script>
