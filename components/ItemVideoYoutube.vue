<template>
  <!-- prettier-ignore -->
  <div class="player-Container youtube" :data-ratio="blok.aspect_ratio">
    <iframe
      id="mediaPlayer"
      :src="'https://www.youtube.com/embed/' + blok.video_id + '?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1'"
      frameborder="0"
      allow="autoplay"
      type="text/html"
    />
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  },
  mounted() {
    console.log("VIDEO ITEM YOUTUBE", this.blok)
  }
}
</script>
