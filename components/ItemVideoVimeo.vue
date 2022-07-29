<template>
  <!-- prettier-ignore -->
  <div class="player-Container vimeo" :data-ratio="blok.aspect_ratio">
    <iframe
      :src="'https://player.vimeo.com/video/' + blok.video_id + '?loop=1&transparent=1&autoplay=1&autopause=0&muted=' + muted"
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
  data() {
    return {
      muted: 1
    }
  },
  watch: {
    $route() {
      this.soundOff()
    }
  },
  methods: {
    soundOff() {
      this.muted = 1
    }
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
</style>
