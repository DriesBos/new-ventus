<template>
  <div class="markdown" v-html="compiledMarkdown"></div>
</template>

<script>
// https://marked.js.org/
const marked = require("marked")
const renderer = new marked.Renderer()

marked.setOptions({
  renderer: new marked.Renderer(),
  breaks: true
})

renderer.link = function(href, title, text) {
  return (
    '<a target="_blank" href="' +
    href +
    '" title="' +
    text +
    '">' +
    text +
    "</a>"
  )
}

export default {
  name: "MarkdownItem",
  props: {
    input: String
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { renderer: renderer })
    }
  }
}
</script>

<style lang="sass">
.markdown
  white-space: pre-line
  margin-bottom: $lineheight-p
  a, a:hover
    position: relative
    text-decoration: none
    &:before
      content: ''
      position: absolute
      left: 0
      bottom: 0
      right: 0
      height: 1px
      background: currentColor
  &:last-child
    margin-bottom: 0
// Prefer style handling by cascading css (typography.sass) as much as possible.
</style>
