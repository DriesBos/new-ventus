<template>
  <div v-editable="story.content" class="page page-Project_Slug">
    <div class="section-NavViewer_Title">
      <template v-if="story.tag_list">
        <div v-for="tag in story.tag_list" :id="tag" :key="tag">
          <p class="fullscreenEnabled">{{ tag }}</p>
        </div>
      </template>
      <p v-else class="fullscreenEnabled">Project</p>
      <h1>{{ story.content.title }}</h1>
    </div>
    <div class="page-Project_ScrollDown" @click="scrollDown">
      <div
        class="icon icon-Down"
        v-html="require('~/assets/icons/arrow.svg?include')"
      />
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
  top: calc(100vh - 1.25rem)
  left: calc(20vw + 1.25rem)
  left: 60vw
  transform: translateY(-100%)
  svg
    fill: none
</style>
