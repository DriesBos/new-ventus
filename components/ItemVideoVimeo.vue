<template>
  <!-- prettier-ignore -->
  <div class="player-Container">
    <iframe
      :src="'https://player.vimeo.com/video/' + blok.video_id + '?loop=1&autoplay=1&autopause=0&muted=1'"
      frameborder="0"
      allow="autoplay"
      transparent="true"
      playsinline="true"
      title="false"
    />
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  },
  mounted() {
    // console.log("VIDEO ITEM VIMEO", this.blok)
  }
}
</script>

<style lang="sass">
.player-Container
  position: relative
  width: 100%
  height: 100%
  iframe, #player, .player, .vp-video-wrapper, .vp-center, .fallback
    position: absolute
    top: 0
    left: 0
    width: 100% !important
    height: 100% !important
    max-width: 100% !important
    max-height: 100% !important
    overflow: visible !important
</style>
