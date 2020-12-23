<template>
  <section class="section section-NavViewer">
    <div class="section-NavViewer_Title">
      <h1 v-if="$route.name === 'index'">NEW VENTUS</h1>
    </div>
    <ul class="section-NavViewer_VideoContainer">
      <li
        v-for="(item, i) in list"
        :key="i"
        :data-slug="item.slug"
        :data-page="$route.name"
        :data-fullscreen="fullscreen"
        class="project"
      >
        <component
          :is="item.content.video[0].component | dashify"
          :key="item._uid"
          :blok="item.content.video[0]"
        ></component>
      </li>
    </ul>
    <!-- PREVIOUS -->
    <div
      :data-page="$route.name"
      :data-fullscreen="fullscreen"
      class="section-NavViewer_Nav section-NavViewer_Prev"
    >
      <div class="controls-Row">
        <transition name="navControls">
          <p v-if="!fullscreen" @click="clickNextProject">previous</p>
        </transition>
      </div>
    </div>
    <!-- CENTER -->
    <div
      :data-page="$route.name"
      :data-fullscreen="fullscreen"
      class="section-NavViewer_Nav section-NavViewer_Center"
    >
      <div class="controls-Row">
        <transition name="navControls">
          <p v-if="$route.name === 'index'" @click="clickCenterProject">
            view project
          </p>
        </transition>
        <!-- <transition name="navControls">
          <p
            v-if="$route.name === 'projects-slug' && !fullscreen"
            @click="toggleFullscreen"
          >
            fullscreen
          </p>
        </transition> -->
        <transition name="navControls">
          <p
            v-if="$route.name === 'projects-slug' && !fullscreen"
            @click="clickCenterProject"
          >
            close project
          </p>
        </transition>
        <transition name="navControls">
          <p v-if="fullscreen" @click="toggleFullscreen">
            close
          </p>
        </transition>
      </div>
    </div>
    <!-- NEXT -->
    <div
      :data-page="$route.name"
      :data-fullscreen="fullscreen"
      class="section-NavViewer_Nav section-NavViewer_Next"
    >
      <div class="controls-Row">
        <transition name="navControls">
          <p v-if="$route.name === 'index'" @click="clickPrevProject">next</p>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import lodash from "lodash"
import { mapState } from "vuex"
import { gsap } from "gsap"

export default {
  data() {
    return {
      direction: null,
      list: {},
      fullscreen: false,
      animationDuration: 1,
      animationEase: "Power4.easeInOut"
    }
  },
  computed: {
    ...mapState({
      projects: state => state.projects.list
    })
  },
  mounted() {
    // INIT
    this.resetList()
    this.initProjectNumbers()
    this.setAnimateStart()
    // INIT ON RESIZE
    this.handleDebouncedResize = lodash.debounce(this.setAnimateStart, 50)
    window.addEventListener("resize", this.handleDebouncedResize)
    // KEYBINDINGS
    document.addEventListener("keydown", this.keyBindings)
    // console.log(this.projects, this.list)
  },
  updated() {},
  destroyed() {
    window.removeEventListener("resize", this.setAnimateStart)
  },
  methods: {
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen
      this.animateProjectFullscreen()
    },
    keyBindings(event) {
      if (event.keyCode === 27 || event.keyCode === 32) {
        this.clickCenterProject()
      } else if (event.keyCode === 39) {
        this.clickNextProject()
      } else if (event.keyCode === 37) {
        this.clickPrevProject()
      }
    },
    clickPrevProject() {
      if (this.$route.name === "index") {
        this.animatePrev()
        this.setPrevProject()
      } else {
        this.animateSlugPrev()
        this.setPrevProject()
        var array = document.querySelectorAll(".project")
        array.forEach(el => {
          if (el.dataset.project === "2") {
            this.$router.push("/projects/" + el.dataset.slug)
          }
        })
      }
    },
    clickCenterProject() {
      var array = document.querySelectorAll(".project")
      if (this.$route.name === "index") {
        this.animateProjectOpen()
        array.forEach(el => {
          if (el.dataset.project === "2") {
            this.$router.push("/projects/" + el.dataset.slug)
          }
        })
      } else {
        this.animateProjectClose()
        this.$router.push("/")
      }
    },
    clickNextProject() {
      if (this.$route.name === "index") {
        this.animateNext()
        this.setNextProject()
      } else {
        this.animateSlugNext()
        this.setNextProject()
        var array = document.querySelectorAll(".project")
        array.forEach(el => {
          if (el.dataset.project === "2") {
            this.$router.push("/projects/" + el.dataset.slug)
          }
        })
      }
    },
    animateProjectFullscreen() {
      var width = window.innerWidth
      var height = window.innerHeight
      var array = document.querySelectorAll(".project")
      array.forEach(el => {
        if (el.dataset.project === "2" && this.fullscreen) {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh"
          })
        } else if (el.dataset.project === "2" && !this.fullscreen) {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "20vw",
            top: 0,
            width: "80vw",
            height: height - (height - width * 0.3) / 2
          })
        }
        if (el.dataset.project === "1" && this.fullscreen) {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "-20vw",
            top: "100vh",
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "1" && !this.fullscreen) {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: 0,
            top: height - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        }
      })
    },
    animateProjectOpen() {
      var width = window.innerWidth
      var height = window.innerHeight
      var array = document.querySelectorAll(".project")
      array.forEach(el => {
        if (el.dataset.project === "2") {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "20vw",
            top: 0,
            width: "80vw",
            height: height - (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "3") {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "100vw",
            top: 0 - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        }
      })
    },
    animateProjectClose() {
      var width = window.innerWidth
      var height = window.innerHeight
      var array = document.querySelectorAll(".project")
      array.forEach(el => {
        if (el.dataset.project === "2") {
          gsap.set(el, {
            opacity: 1
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "20vw",
            top: (height - width * 0.3) / 2,
            width: "60vw",
            height: "30vw"
          })
        } else if (el.dataset.project === "3") {
          gsap.set(el, {
            opacity: 1
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "80vw",
            top: 0,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        }
      })
    },
    animatePrev() {
      var width = window.innerWidth
      var height = window.innerHeight
      var array = document.querySelectorAll(".project")
      array.forEach(el => {
        if (el.dataset.project === "0") {
          gsap.set(el, {
            opacity: 0
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "100vw",
            top: 0 - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "1") {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "-20vw",
            top: "100vh",
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "2") {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: 0,
            top: height - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "3") {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "20vw",
            top: (height - width * 0.3) / 2,
            width: "60vw",
            height: "30vw"
          })
        } else if (el.dataset.project === "4") {
          gsap.set(el, {
            opacity: 1
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "80vw",
            top: 0,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        }
      })
    },
    animateNext() {
      var width = window.innerWidth
      var height = window.innerHeight
      var array = document.querySelectorAll(".project")
      array.forEach(el => {
        if (el.dataset.project === "0") {
          gsap.set(el, {
            opacity: 1
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: 0,
            top: height - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "1") {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "20vw",
            top: (height - width * 0.3) / 2,
            width: "60vw",
            height: "30vw"
          })
        } else if (el.dataset.project === "2") {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "80vw",
            top: 0,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "3") {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "100vw",
            top: 0 - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "4") {
          gsap.set(el, {
            opacity: 0
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "-20vw",
            top: "100vh",
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        }
      })
    },
    animateSlugNext() {
      var width = window.innerWidth
      var height = window.innerHeight
      var array = document.querySelectorAll(".project")
      array.forEach(el => {
        if (el.dataset.project === "0") {
          gsap.set(el, {
            opacity: 1
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: 0,
            top: height - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "1") {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "20vw",
            top: 0,
            width: "80vw",
            height: height - (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "2") {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "100vw",
            top: 0 - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "3") {
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "100vw",
            top: 0 - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "4") {
          gsap.set(el, {
            opacity: 0
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "-20vw",
            top: "100vh",
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        }
      })
    },
    animateSlugPrev() {
      var width = window.innerWidth
      var height = window.innerHeight
      var array = document.querySelectorAll(".project")
      array.forEach(el => {
        if (el.dataset.project === "0") {
          gsap.set(el, {
            opacity: 0
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "100vw",
            top: 0 - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "1") {
          gsap.set(el, {
            opacity: 1
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "-20vw",
            top: "100vh",
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "2") {
          gsap.set(el, {
            opacity: 1
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: 0,
            top: height - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "3") {
          gsap.set(el, {
            opacity: 1
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "20vw",
            top: 0,
            width: "80vw",
            height: height - (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "4") {
          gsap.set(el, {
            opacity: 0
          })
          gsap.to(el, {
            ease: this.animationEase,
            duration: this.animationDuration,
            left: "100vw",
            top: 0 - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        }
      })
    },
    setPrevProject() {
      var array = document.querySelectorAll(".project")
      array.forEach(el => {
        if (el.dataset.project === "0") {
          el.dataset.project = "4"
        } else if (el.dataset.project === "1") {
          el.dataset.project = "0"
        } else if (el.dataset.project === "2") {
          el.dataset.project = "1"
        } else if (el.dataset.project === "3") {
          el.dataset.project = "2"
        } else if (el.dataset.project === "4") {
          el.dataset.project = "3"
        }
      })
    },
    setNextProject() {
      var array = document.querySelectorAll(".project")
      array.forEach(el => {
        if (el.dataset.project === "0") {
          el.dataset.project = "1"
        } else if (el.dataset.project === "1") {
          el.dataset.project = "2"
        } else if (el.dataset.project === "2") {
          el.dataset.project = "3"
        } else if (el.dataset.project === "3") {
          el.dataset.project = "4"
        } else if (el.dataset.project === "4") {
          el.dataset.project = "0"
        }
      })
    },
    initProjectNumbers() {
      var route = this.$route
      setTimeout(function() {
        var array = document.querySelectorAll(".project")
        if (route.name === "index") {
          array.forEach((el, index) => {
            return (el.dataset.project = index)
          })
        } else if (route.name === "projects-slug") {
          var indexMain = 0
          array.forEach((el, index) => {
            if (el.dataset.slug == route.params.slug) {
              indexMain = 2 - index
              el.dataset.project = 2
            }
          })
          array.forEach((el, index) => {
            el.dataset.project = index + indexMain
          })
          array.forEach(el => {
            if (el.dataset.project < 0) {
              el.dataset.project = parseInt(el.dataset.project) + 5
            } else if (el.dataset.project > 4) {
              el.dataset.project = parseInt(el.dataset.project) - 5
            }
          })
        }
      }, 250)
    },
    setAnimateStart() {
      var width = window.innerWidth
      var height = window.innerHeight
      this.fullscreen = false
      if (this.$route.name === "index") {
        setTimeout(function() {
          var array = document.querySelectorAll(".project")
          array.forEach(el => {
            if (el.dataset.project === "0") {
              gsap.set(el, {
                left: "-20vw",
                top: "100vh",
                width: "20vw",
                height: (height - width * 0.3) / 2
              })
            } else if (el.dataset.project === "1") {
              gsap.set(el, {
                left: 0,
                top: height - (height - width * 0.3) / 2,
                width: "20vw",
                height: (height - width * 0.3) / 2
              })
            } else if (el.dataset.project === "2") {
              gsap.set(el, {
                left: "20vw",
                top: (height - width * 0.3) / 2,
                width: "60vw",
                height: "30vw"
              })
            } else if (el.dataset.project === "3") {
              gsap.set(el, {
                left: "80vw",
                top: 0,
                width: "20vw",
                height: (height - width * 0.3) / 2
              })
            } else if (el.dataset.project === "4") {
              gsap.set(el, {
                left: "100vw",
                top: "-33.3333vh",
                width: "20vw",
                height: (height - width * 0.3) / 2
              })
            }
          })
        }, 250)
      } else {
        setTimeout(function() {
          var array = document.querySelectorAll(".project")
          array.forEach(el => {
            if (el.dataset.project === "0") {
              gsap.set(el, {
                left: "-20vw",
                top: "100vh",
                width: "20vw",
                height: (height - width * 0.3) / 2
              })
            } else if (el.dataset.project === "1") {
              gsap.set(el, {
                left: 0,
                top: height - (height - width * 0.3) / 2,
                width: "20vw",
                height: (height - width * 0.3) / 2
              })
            } else if (el.dataset.project === "2") {
              gsap.set(el, {
                left: "20vw",
                top: 0,
                width: "80vw",
                height: height - (height - width * 0.3) / 2
              })
            } else if (el.dataset.project === "3") {
              gsap.set(el, {
                left: "100vw",
                top: 0 - (height - width * 0.3) / 2,
                width: "20vw",
                height: (height - width * 0.3) / 2
              })
            } else if (el.dataset.project === "4") {
              gsap.set(el, {
                left: "100vw",
                top: "-33.3333vh",
                width: "20vw",
                height: (height - width * 0.3) / 2
              })
            }
          })
        }, 250)
      }
    },
    resetList() {
      this.list = [...this.projects]
      // this.sortByDate(this.list)
    },
    sortByDate(values) {
      values.sort((a, b) =>
        a.created_at < b.created_at ? 1 : b.created_at < a.created_at ? -1 : 0
      )
    }
  }
}
</script>

<style lang="sass">
.section
  &-NavViewer
    position: relative
    width: 100%
    height: 100vh
    overflow: hidden
    z-index: $slider
    background-color: white
    transition: background-color .33s ease-in
    &_Title
      position: fixed
      top: 0
      left: 0
      font-size: 4rem
      z-index: $titles
      padding-top: 1rem
      padding-left: 1rem
      mix-blend-mode: difference
      max-width: 15em
      h1
        -webkit-text-stroke: 2px white
        text-transform: uppercase
        line-height: 1.25
    &_VideoContainer
      position: relative
      width: 100%
      height: 100%
    &_Nav
      position: absolute
      z-index: $slider-controls
    &_Prev
      left: 0
      bottom: 0
      width: 20vw
      height: calc((100vh - 30vw)/2)
      &[data-fullscreen="true"]
        display: none
    &_Center
      top: calc((100vh - 30vw)/2)
      left: 20vw
      width: 60vw
      height: 30vw
      &[data-page="projects-slug"]
        top: 0
        left: 20vw
        width: 80vw
        height: calc(100vh - ((100vh - 30vw) / 2))
      &[data-page="projects-slug"][data-fullscreen="true"]
        top: 0
        left: 0
        width: 100vw
        height: 100vh
    &_Next
      top: 0
      right: 0
      width: 20vw
      height: calc((100vh - 30vw)/2)
      &[data-page="projects-slug"]
        display: none

.project
  position: absolute
  background: grey
  height: 33.3333vh
  cursor: pointer
  overflow: hidden
  transition: filter 1s ease
  iframe
    height: 1000%
    width: 100%
    border: 2px solid red
    @media (max-aspect-ratio: 1477/776)
      height: 115%
      width: 1000%
    @media (min-aspect-ratio: 1477/776)
      height: 1000%
      width: 100%
  &[data-project="0"], &[data-project="1"], &[data-project="3"], &[data-project="4"]
    filter: grayscale(1)
  &[data-project="2"]
    filter: grayscale(0)
  &[data-page="projects-slug"][data-project="2"]
    .controls-Row_Fullscreen
      opacity: 1
      z-index: $video-controls
</style>
