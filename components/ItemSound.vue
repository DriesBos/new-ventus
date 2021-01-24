<template>
  <section v-editable="blok" class="item item-NonImage item-Sound">
    <div
      class="item_Container item-NonImage_Container item-Sound_Container medium"
    >
      <div class="item_Single item-NonImage_Single item-Sound_Single">
        <audio id="audioPlayer" preload="auto" loop>
          <source :src="blok.file.filename" type="audio/mpeg" />
          Your browser does not support the <code>audio</code> element.
        </audio>
        <div
          id="audioPlayButton"
          class="item-AudioPlayer_Button"
          @click="pressAudio()"
        >
          <div
            v-if="audio === 'stopped' || audio === 'paused'"
            class="icon icon-Audio"
            v-html="require('~/assets/images/icon-play.svg?include')"
          />
          <div
            v-else
            class="icon icon-Audio"
            v-html="require('~/assets/images/icon-stop.svg?include')"
          />
        </div>
        <p @click="pressAudio()">
          <span v-if="audio === 'stopped' || audio === 'paused'">Play</span
          ><span v-if="audio === 'playing'">Stop</span> soundscape
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default {
  props: {
    blok: Object
  },
  data() {
    return {
      audio: "stopped",
      offsetTop: 0,
      controlsUsed: false
    }
  },
  mounted() {
    console.log(this.blok, "SOUND ITEM")
    window.addEventListener("scroll", this.onScroll)
    // this.stickyWhenVisible()
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll)
  },
  methods: {
    onScroll() {
      var el = document.querySelector(".item-Sound")
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      if (
        el.offsetTop - window.innerHeight / 2 < this.offsetTop &&
        this.controlsUsed == false
      ) {
        this.audio = "stopped"
        this.playAudio()
      } else if (
        el.offsetTop - window.innerHeight / 2 > this.offsetTop &&
        this.controlsUsed == false
      ) {
        this.audio = "playing"
        this.playAudio()
      }
    },
    pressAudio() {
      this.controlsUsed = true
      this.playAudio()
    },
    stickyWhenVisible() {
      var target = document.querySelector(".item-Sound")
      gsap.to(target, {
        position: "fixed",
        ease: "none",
        scrollTrigger: {
          trigger: target,
          // scrub: true,
          start: "bottom bottom"
          // end: "bottom top"
        }
      })
    },
    playAudio() {
      var audio = document.getElementById("audioPlayer")
      if (this.audio === "stopped" || this.audio === "paused") {
        audio.play()
        this.audio = "playing"
      } else if (this.audio === "playing") {
        audio.pause()
        this.audio = "paused"
      }
    }
  }
}
</script>

<style lang="sass">
.item
  &-Sound
    position: relative
    bottom: 0
    color: white
    &_Single
      position: relative
      display: inline-flex
      align-items: center
      justify-content: flex-start
      padding-bottom: 1.25rem
      border-bottom: 1px solid currentColor
      p
        display: inline
        margin-left: .5rem
        cursor: pointer
      .item-AudioPlayer_Button
        color: white
        width: 1rem
        height: 1rem
        cursor: pointer
        img
          height: 100%
</style>
