<template>
  <div v-editable="story.content" class="page page-Project_Slug">
    <div class="section-NavViewer_Title">
      <template v-if="story.tag_list">
        <div v-for="tag in story.tag_list" :id="tag" :key="tag">
          <p>{{ tag }}</p>
        </div>
      </template>
      <p v-else>Project</p>
      <h1>{{ story.content.title }}</h1>
    </div>
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
        return res.data
      })
      .catch(res => {
        if (!res.response) {
          console.error(res)
          context.error({
            statusCode: 404,
            message: "Failed to receive content from api"
          })
        } else {
          console.error(res.response.data)
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
  head() {
    return {
      title: this.story.name + " — NEW VENTUS"
    }
  },
  mounted() {
    console.log(this.story, "PROJECT CONTENT")
  }
}
</script>

<style lang="sass">
.slug
  &-Title
    position: relative
    font-size: 4rem
    z-index: $titles
    margin-top: var(--spacing-vertical)
    margin-bottom: var(--spacing-vertical)
    padding-left: 20vw
    h1
      -webkit-text-stroke: 2px $black
      text-transform: uppercase
      line-height: 1.25
</style>
