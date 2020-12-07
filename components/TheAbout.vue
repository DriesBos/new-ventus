<template>
  <div class="page page-About">
    <div class="about-Container">
      <div class="about-Toggle" @click="toggleAbout">
        <p v-if="aboutState">close</p>
        <p v-else>about</p>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap"

export default {
  data() {
    return {
      aboutState: false,
      animationDuration: 0.75,
      animationEase: "Power4.easeInOut"
    }
  },
  methods: {
    toggleAbout() {
      var aboutPage = document.querySelector(".page-About")
      var container = document.querySelector(".about-Container")
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
.about
  &-Toggle
    position: absolute
    left: 0
    top: 0
    background: $black
    width: 20vw
    height: calc((100vh - 30vw)/4)
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
</style>
