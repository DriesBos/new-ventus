<template>
  <div v-editable="blok" class="item item-Image item-VideoItem">
    <div
      :id="blok._uid"
      class="item_Container item-Image_Container"
      :class="[blok.size, blok.alignment]"
    >
      <div class="item_Single item-Image_Single">
        <!-- START VIMEO -->
        <div class="player-ItemContainer">
          <!-- prettier-ignore -->
          <iframe
            :src="'https://player.vimeo.com/video/' + blok.video_id + '?loop=0&autoplay=0&autopause=0&muted=0'"
            frameborder="0"
            transparent="true"
            title="false"
          />
        </div>
        <!-- END VIMEO -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  },
  mounted() {
    console.log("VIDEO ITEM", this.blok)
  }
}
</script>

<style lang="sass">
.player-ItemContainer
  position: relative
  width: 100%
  height: 0
  padding-bottom: 56.25% //16:9
  iframe
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
</style>
