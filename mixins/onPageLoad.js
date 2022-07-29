import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import JQuery from "jquery"
let $ = JQuery

gsap.registerPlugin(ScrollTrigger)

export default {
  data() {
    return {
      backgroundColor: 0
    }
  },
  watch: {
    $route() {
      this.changeBackground()
    }
  },
  mounted() {
    this.customCursor()
    this.changeBackground()
    $(".cursor-Active").on("mouseenter", this.changeCursor)
    $(".cursor-Prev").on("mouseenter", this.changeCursorToPrev)
    $(".cursor-Next").on("mouseenter", this.changeCursorToNext)
    $(".cursor-Open").on("mouseenter", this.changeCursorToOpen)
    $(".cursor-Close").on("mouseenter", this.changeCursorToClose)
    $(".cursor-Active").on("mouseleave", this.removeCursor)
    $(".cursor-Prev").on("mouseleave", this.removeCursor)
    $(".cursor-Next").on("mouseleave", this.removeCursor)
    $(".cursor-Open").on("mouseleave", this.removeCursor)
    $(".cursor-Close").on("mouseleave", this.removeCursor)
  },
  destroyed() {
    this.customCursor()
    this.changeBackground()
    $(".cursor-Active").off("mouseenter", this.changeCursor)
    $(".cursor-Prev").off("mouseenter", this.changeCursorToPrev)
    $(".cursor-Next").off("mouseenter", this.changeCursorToNext)
    $(".cursor-Next").off("mouseenter", this.changeCursorToOpen)
    $(".cursor-Next").off("mouseenter", this.changeCursorToClose)
    $(".cursor-Active").off("mouseleave", this.removeCursor)
    $(".cursor-Prev").off("mouseleave", this.removeCursor)
    $(".cursor-Next").off("mouseleave", this.removeCursor)
    $(".cursor-Open").off("mouseleave", this.removeCursor)
    $(".cursor-Close").off("mouseleave", this.removeCursor)
  },
  methods: {
    customCursor() {
      let $cursor = $(".cursor")
      function moveCursor(e) {
        gsap.to($cursor, 0, {
          left: e.clientX,
          top: e.clientY
        })
      }
      $(window).on("mousemove", moveCursor)
    },
    changeCursor() {
      let $cursor = $(".cursor")
      $cursor.addClass("cursor-Active")
      $cursor.removeClass("cursor-Prev")
      $cursor.removeClass("cursor-Next")
      $cursor.removeClass("cursor-Open")
      $cursor.removeClass("cursor-Close")
    },
    changeCursorToPrev() {
      let $cursor = $(".cursor")
      $cursor.addClass("cursor-Prev")
      $cursor.removeClass("cursor-Active")
      $cursor.removeClass("cursor-Next")
      $cursor.removeClass("cursor-Open")
      $cursor.removeClass("cursor-Close")
    },
    changeCursorToNext() {
      let $cursor = $(".cursor")
      $cursor.addClass("cursor-Next")
      $cursor.removeClass("cursor-Active")
      $cursor.removeClass("cursor-Prev")
      $cursor.removeClass("cursor-Open")
      $cursor.removeClass("cursor-Close")
    },
    changeCursorToOpen() {
      let $cursor = $(".cursor")
      $cursor.addClass("cursor-Open")
      $cursor.removeClass("cursor-Active")
      $cursor.removeClass("cursor-Prev")
      $cursor.removeClass("cursor-Next")
      $cursor.removeClass("cursor-Close")
    },
    changeCursorToClose() {
      let $cursor = $(".cursor")
      $cursor.addClass("cursor-Close")
      $cursor.removeClass("cursor-Active")
      $cursor.removeClass("cursor-Prev")
      $cursor.removeClass("cursor-Next")
      $cursor.removeClass("cursor-Open")
    },
    removeCursor() {
      let $cursor = $(".cursor")
      $cursor.removeClass("cursor-Active")
      $cursor.removeClass("cursor-Prev")
      $cursor.removeClass("cursor-Next")
      $cursor.removeClass("cursor-Open")
      $cursor.removeClass("cursor-Close")
    },
    changeBackground() {
      if (this.$route.name === "index") {
        document.body.style.backgroundColor = "white"
      } else if (
        this.$route.name == "projects" ||
        this.$route.name == "projects-slug"
      ) {
        document.body.style.backgroundColor = "black"
      } else {
        document.body.style.backgroundColor = "black"
      }
    },
    scrollSlow() {
      setTimeout(function() {
        var targets = document.querySelectorAll(".scrollSlow")
        targets.forEach(el => {
          gsap.to(el, {
            y: window.innerHeight,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              scrub: true,
              start: "top bottom",
              end: "bottom top"
            }
          })
        })
      }, 200)
    },
    scrollFast() {
      setTimeout(function() {
        var titles = document.querySelectorAll(".scrollFast")
        titles.forEach(el => {
          gsap.to(el, {
            y: -window.innerHeight,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              scrub: true,
              start: "top bottom",
              end: "bottom top"
            }
          })
        })
      }, 200)
    },
    scrollHorizontal() {
      setTimeout(function() {
        var viewportWidth = window.innerWidth
        var array = document.querySelectorAll(".scrollHorizontal")
        array.forEach(el => {
          let horizontalTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              scrub: true,
              start: "top bottom",
              end: "bottom top",
              ease: "none"
            }
          })
          horizontalTimeline.set(el, {
            x: 0
          })
          horizontalTimeline.to(el, {
            x: -viewportWidth
          })
        })
      }, 200)
    },
    rotateElement() {
      setTimeout(function() {
        var body = document.body,
          html = document.documentElement
        var height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        )
        // Calc number of rotations
        var rotations = height / (window.innerHeight * 3)
        var container = document.querySelector("main")
        // Scrolltrigger animation
        var array = document.querySelectorAll(".rotate")
        array.forEach(el => {
          let rotateTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              scrub: 0,
              start: "top top",
              end: "bottom bottom",
              ease: "none"
            }
          })
          rotateTimeline.to(el, {
            rotation: 360 * rotations,
            ease: "none"
          })
        })
      }, 200)
    }
  }
}
