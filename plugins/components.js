import Vue from "vue"

// PAGES
import Page from "~/components/Page.vue"

// ITEMS
// import ItemContactForm from "~/components/ItemContactForm.vue"
import ItemVideoVimeo from "~/components/ItemVideoVimeo.vue"
import ItemVideoYoutube from "~/components/ItemVideoYoutube.vue"
import ItemText from "~/components/ItemText.vue"
import ItemImage from "~/components/ItemImage.vue"
// import ItemVideoplayer from "~/components/ItemVideoplayer.vue"

// PAGES
Vue.component("blok-page", Page)

// ITEMS
// Vue.component("blok-item-contact-form", ItemContactForm)
Vue.component("blok-item-video-vimeo", ItemVideoVimeo)
Vue.component("blok-item-video-youtube", ItemVideoYoutube)
Vue.component("blok-item-text", ItemText)
Vue.component("blok-item-image", ItemImage)
// Vue.component("blok-item-videoplayer", ItemVideoplayer)
