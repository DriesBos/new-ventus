<template>
  <div v-editable="story.content" class="page-Index">
    <component
      :is="story.content.component | dashify"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    ></component>
  </div>
</template>

<script>
import onPageLoad from "@/mixins/onPageLoad"
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
  mixins: [onPageLoad, storyblokLivePreview],
  asyncData(context) {
    return context.app.$storyapi
      .get("cdn/stories/home", {
        version: process.env.NODE_ENV == "production" ? "published" : "draft"
      })
      .then(res => {
        console.log("[INDEX] Full Storyblok response:", res.data)
        console.log("[INDEX] Story:", res.data.story)
        console.log("[INDEX] Story content:", res.data.story?.content)
        return res.data
      })
      .catch(res => {
        if (!res.response) {
          console.error("[INDEX] Error (no response):", res)
          context.error({
            statusCode: 404,
            message: "Failed to receive content from api"
          })
        } else {
          console.error("[INDEX] Error response:", res.response.data)
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
    console.log("[INDEX] Mounted with story:", this.story)
  },
  head() {
    return {
      title: this.story.name + " — NEW VENTUS"
    }
  }
}
</script>
