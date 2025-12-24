<template>
  <div v-editable="story.content" class="page page-Project_Slug">
    <component
      :is="blok.component | dashify"
      v-for="blok in story.content.body"
      :key="blok._uid"
      :blok="blok"
    ></component>
  </div>
</template>

<script>
import onPageLoad from "@/mixins/onPageLoad"
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
  mixins: [onPageLoad, storyblokLivePreview],
  asyncData(context) {
    let endpoint = "cdn/stories/projects/" + context.params.slug
    return context.app.$storyapi
      .get(endpoint, {
        version: process.env.NODE_ENV == "production" ? "published" : "draft"
      })
      .then(res => {
        console.log("[PROJECT] Full Storyblok response:", res.data)
        console.log("[PROJECT] Story:", res.data.story)
        console.log("[PROJECT] Story content:", res.data.story?.content)
        console.log("[PROJECT] Story body:", res.data.story?.content?.body)
        return res.data
      })
      .catch(res => {
        if (!res.response) {
          console.error("[PROJECT] Error (no response):", res)
          context.error({
            statusCode: 404,
            message: "Failed to receive content from api"
          })
        } else {
          console.error("[PROJECT] Error response:", res.response.data)
          context.error({
            statusCode: res.response.status,
            message: res.response.data
          })
        }
      })
  },
  data() {
    return {
      story: { content: {} }
    }
  },
  mounted() {
    console.log("[PROJECT] Mounted with story:", this.story)
    console.log("[PROJECT] Content body:", this.story.content?.body)
  },
  head() {
    return {
      title: this.story.name + " — NEW VENTUS"
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
