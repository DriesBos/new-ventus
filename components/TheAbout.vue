<template>
  <div class="about-Container">
    <div
      class="about-BackgroundImage"
      style="background-image: url('https://a.storyblok.com/f/98100/400x720/135c1f3138/gif-final.gif')"
    ></div>
    <div class="about-Content">
      <component
        :is="blok.component | dashify"
        v-for="blok in about[0].content.body"
        :key="blok._uid"
        :blok="blok"
      ></component>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { gsap } from "gsap"
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
  mixins: [storyblokLivePreview],
  props: {
    aboutProp: Boolean
  },
  data() {
    return {
      animationDuration: 0.75,
      animationEase: "Power4.easeInOut"
    }
  },
  computed: {
    ...mapState({
      about: state => state.about.list
    })
  },
  watch: {
    aboutProp: function() {
      this.toggleAbout()
    }
  },
  methods: {
    toggleAbout() {
      var container = document.querySelector(".about-Container")
      var aboutContent = document.querySelector(".about-Content")
      var aboutBackgroundImage = document.querySelector(
        ".about-BackgroundImage"
      )
      console.log("PROP", this.aboutProp)
      if (this.aboutProp) {
        gsap.to(container, {
          ease: this.animationEase,
          duration: this.animationDuration,
          right: 0,
          top: 0,
          width: "100%",
          height: "100%"
        })
        gsap.to(aboutContent, {
          opacity: 1,
          ease: this.animationEase,
          duration: 0.5,
          delay: 0.5
        })
        gsap.to(aboutBackgroundImage, {
          opacity: 1,
          display: "block",
          ease: this.animationEase,
          duration: 0.5,
          delay: 0.5
        })
      } else {
        gsap.to(container, {
          ease: this.animationEase,
          duration: this.animationDuration,
          right: 0,
          top: 0,
          width: 0,
          height: 0
        })
        gsap.to(aboutContent, {
          opacity: 0,
          ease: this.animationEase,
          duration: this.animationDuration / 4
        })
        gsap.to(aboutBackgroundImage, {
          opacity: 0,
          display: "none",
          ease: this.animationEase,
          duration: this.animationDuration / 4
        })
      }
    }
  }
}
</script>

<style lang="sass">
.about
  &-Container
    position: fixed
    right: 0
    top: 0
    width: 0
    height: 0
    background: $bg-about
    overflow-y: auto
    z-index: $about
    section:first-of-type, section:last-of-type
      margin-top: 0
      padding-top: 9rem
      margin-bottom: 0
      padding-bottom: 9rem
  &-BackgroundImage
    opacity: 0
    display: none
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-repeat: no-repeat
    background-size: contain
    background-position: center center
    pointer-events: 0
    img
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      object-fit: contain
  &-Content
    position: relative
    opacity: 0
</style>
