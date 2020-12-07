<template>
  <div class="page page-About">
    <div class="about-Container">
      <component
        :is="blok.component | dashify"
        v-for="blok in about[0].content.body"
        :key="blok._uid"
        :blok="blok"
        class="about-Content"
      ></component>
      <div class="about-Toggle" @click="toggleAbout">
        <p v-if="aboutState">close</p>
        <p v-else>about</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { gsap } from "gsap"
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
  mixins: [storyblokLivePreview],
  data() {
    return {
      aboutState: false,
      animationDuration: 0.75,
      animationEase: "Power4.easeInOut"
    }
  },
  computed: {
    ...mapState({
      about: state => state.about.list
    })
  },
  mounted() {
    this.onScroll()
  },
  methods: {
    onScroll() {
      var target = document.querySelector(".about-Container")
      var trigger = document.querySelector(".section-NavViewer")
      gsap.fromTo(
        target,
        {
          opacity: 0
        },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            scrub: true,
            start: "bottom bottom",
            end: "+=1px"
          }
        }
      )
    },
    toggleAbout() {
      var aboutPage = document.querySelector(".page-About")
      var container = document.querySelector(".about-Container")
      var aboutContent = document.querySelector(".about-Content")
      var button = document.querySelector(".about-Toggle")
      var buttonHeight = button.clientHeight
      var windowHeight = window.innerHeight - buttonHeight
      console.log("toggled", container, button, buttonHeight)
      if (!this.aboutState) {
        console.log("open")
        gsap.set(aboutPage, {
          zIndex: 900
        })
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
      } else {
        console.log("close")
        gsap.set(aboutPage, {
          zIndex: 300,
          delay: this.animationDuration
        })
        gsap.to(container, {
          ease: this.animationEase,
          duration: this.animationDuration,
          left: 0,
          top: windowHeight + "px",
          right: "auto",
          bottom: 0,
          width: "20vw",
          height: buttonHeight + "90px"
        })
        gsap.to(aboutContent, {
          opacity: 0,
          ease: this.animationEase,
          duration: this.animationDuration / 4
        })
      }
      this.aboutState = !this.aboutState
    }
  }
}
</script>

<style lang="sass">
.page
  &-About
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    pointer-events: none
    z-index: $about
    overflow: auto
    .markdown
      p, h1, h2, h3, h4, h5
        color: white
.about
  &-Content
    opacity: 0
  &-Toggle
    position: absolute
    left: 0
    top: 0
    background: $black
    width: 20vw
    display: flex
    justify-content: flex-start
    align-items: flex-end
    cursor: pointer
    pointer-events: auto
    p
      color: white
      font-size: 1.25rem
      padding: 1em
  &-Container
    position: absolute
    left: 0
    top: auto
    right: auto
    bottom: 0
    background: $black
    width: 20vw
    height: calc((100vh - 30vw)/4)
    overflow: auto
    pointer-events: auto
    opacity: 0
</style>
