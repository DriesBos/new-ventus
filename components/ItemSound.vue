<template>
  <section v-editable="blok" class="item item-Image item-Sound">
    <div
      class="item_Container item-Image_Container item-Sound_Container medium"
    >
      <div class="item_Single item-Image_Single item-Sound_Single">
        <audio id="audioPlayer" preload="none" loop>
          <source :src="blok.file.filename" type="audio/mpeg" />
          Your browser does not support the <code>audio</code> element.
        </audio>
        <div
          id="audioPlayButton"
          class="item-AudioPlayer_Button"
          @click="playAudio()"
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
        <p @click="playAudio()">
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
      audio: "stopped"
    }
  },
  mounted() {
    console.log(this.blok, "SOUND ITEM")
    // this.stickyWhenVisible()
  },
  methods: {
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
    &_Single
      position: relative
      display: flex
      align-items: center
      padding-left: 2.5rem
      padding-bottom: 1rem
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
