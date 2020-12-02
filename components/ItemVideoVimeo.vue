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
  iframe
    position: absolute
    top: 50%
    left: 50%
    object-fit: fill
    transform: translate(-50%, -50%)

    // @media (min-aspect-ratio: 16/9)
    //   border: 1px solid red
    //   width: 100%
    // @media (max-aspect-ratio: 16/9)
    //   border: blue 1px solid
    //     height: 56.25vw
    // // width: 100%
    // // height: 100%
    // // max-width: 100%
    // // max-height: 100%
</style>
