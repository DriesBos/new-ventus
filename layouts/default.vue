<template>
  <main lang="en-US" translate="no">
    <TheNavViewer />
    <nuxt />
    <!-- <TheAbout :about-prop="aboutState" /> -->
    <!-- <TheAboutToggle :about-prop="aboutState" @clicked="toggleAbout" /> -->
  </main>
</template>

<script>
import TheNavViewer from "~/components/TheNavViewer.vue"

export default {
  components: {
    TheNavViewer
  },
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
