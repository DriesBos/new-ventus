<template>
  <section v-editable="blok" class="item item-NonImage item-Text">
    <div class="item_Container item-NonImage_Container item-Text_Container">
      <div class="item_Single item-NonImage_Single item-Text_Single">
        <Markdown :input="blok.text" />
      </div>
    </div>
  </section>
</template>

<script>
import Markdown from "~/components/Markdown.vue"

export default {
  components: {
    Markdown
  },
  props: {
    blok: Object
  },
  mounted() {
    console.log("[ItemText] Full blok:", this.blok)
    console.log("[ItemText] Text content:", this.blok?.text)
  }
}
</script>
