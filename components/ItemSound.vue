<template>
  <section v-editable="blok" class="item item-NonImage item-Sound">
    <div
      class="item_Container item-NonImage_Container item-Sound_Container medium"
    >
      <div class="item_Single item-NonImage_Single item-Sound_Single">
        <div class="item-Sound_Wrapper" :class="audio">
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
      // var target = document.querySelector(".item-Sound_Wrapper")
      if (
        el.offsetTop - window.innerHeight / 2 < this.offsetTop &&
        this.controlsUsed == false
      ) {
        this.audio = "stopped"
        this.playAudio()
        // gsap.to(target, {
        //   ease: "ease",
        //   duration: 0.33,
        //   minWidth: "100%",
        //   delay: 0
        // })
      } else if (
        el.offsetTop - window.innerHeight / 2 > this.offsetTop &&
        this.controlsUsed == false
      ) {
        this.audio = "playing"
        this.playAudio()
        // gsap.to(target, {
        //   ease: "ease",
        //   duration: 0.33,
        //   minWidth: "0%",
        //   delay: 0
        // })
      }
    },
    pressAudio() {
      this.controlsUsed = true
      this.playAudio()
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
    &_Wrapper
      display: inline-flex
      position: relative
      align-items: center
      padding-bottom: .65rem
      width: auto
      &::before
        content: ''
        position: absolute
        left: 0
        bottom: 0
        background: white
        width: 100%
        max-width: 0%
        height: 1px
        transition: max-width .165s ease-in-out
      &.playing
        &::before
          max-width: 100%
</style>
