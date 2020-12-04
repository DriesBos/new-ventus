<template>
  <div v-editable="story.content" class="page page-Project_Slug">
    <div class="slug-Title">
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

export default {
  mixins: [onPageLoad],
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
    console.log(this.story.content)
  }
}
</script>

<style lang="sass">
.slug
  &-Title
    position: absolute
    top: 0
    left: 0
    font-size: 4rem
    z-index: $titles
    color: white
    padding-top: 1rem
    padding-left: 1rem
    h1
      color: rgba(0,0,0,0)
      -webkit-text-stroke: 2px white
      text-transform: uppercase
      line-height: 1.25
</style>
