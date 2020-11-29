<template>
  <div v-editable="blok" class="item item-Image">
    <div class="item-Image_Container" :class="blok.size">
      <div class="item-Image_Single">
        <img
          v-lazy="`${transformImage(blok.image.filename, '1440x0')}`"
          :data-srcset="
            `${transformImage(blok.image.filename, '400x0')} 400w, 
                 ${transformImage(blok.image.filename, '800x0')} 800w, 
                 ${transformImage(blok.image.filename, '1200x0')} 1200w,
                 ${transformImage(blok.image.filename, '1600x0')} 1600w,
                 ${transformImage(blok.image.filename, '2000x0')} 2000w`
          "
          class="lazy"
          :alt="blok.image.name"
        />
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
    console.log("BLOK IMAGE ITEM", this.blok)
  },
  methods: {
    transformImage(image, option) {
      if (!image) return ""
      if (!option) return ""
      let imageService = "//img2.storyblok.com/"
      let pathOne = image.replace("https://a.storyblok.com", "")
      let pathTwo = pathOne.replace("//a.storyblok.com", "")
      return imageService + option + pathTwo
    }
  }
}
</script>

<style lang="sass">
.item
  &-Image
    width: 100%
    &_Container
      display: flex
      justify-content: flex-end
      &.small
        justify-content: flex-end
        .item-Image_Single
          width: 20vw
      &.medium
        justify-content: center
        .item-Image_Single
          width: 60vw
        align-self: center
      &.large
        justify-content: flex-end
        .item-Image_Single
          width: 80vw
    img
      width: 100%
      max-width: 100%
      height: auto
</style>
