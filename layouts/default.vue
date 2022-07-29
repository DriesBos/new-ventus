<template>
  <!-- Change if needed -->
  <main lang="en-US" translate="no">
    <LazyTheNavViewer />
    <nuxt />
    <LazyTheAbout :about-prop="aboutState" />
    <!-- <LazyTheAboutToggle :about-prop="aboutState" @clicked="toggleAbout" /> -->
    <div class="cursor">
      <img class="icon-Prev" src="~/assets/icons/arrow-left.svg" />
      <img class="icon-Next" src="~/assets/icons/arrow-right.svg" />
      <img class="icon-Open" src="~/assets/icons/expand.svg" />
      <img class="icon-Close" src="~/assets/icons/contract.svg" />
    </div>
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
