<template>
  <section class="section section-NavViewer">
    <ul class="section-NavViewer_VideoContainer">
      <li
        v-for="(item, i) in list"
        :key="i"
        :data-slug="item.slug"
        class="project"
      >
        <component
          :is="item.content.video[0].component | dashify"
          :key="item._uid"
          :blok="item.content.video[0]"
        ></component>
      </li>
    </ul>
    <div
      v-if="this.$route.name === 'index'"
      class="section-NavViewer_Prev"
      @click="clickNextProject"
    ></div>
    <div
      v-if="this.$route.name === 'index'"
      class="section-NavViewer_Center"
      @click="clickCenterProject"
    ></div>
    <div
      v-if="this.$route.name === 'index'"
      class="section-NavViewer_Next"
      @click="clickPrevProject"
    ></div>
    <div
      v-if="this.$route.name === 'projects-slug'"
      class="section-NavViewer_SlugCenter"
      @click="clickCenterProject"
    ></div>
    <div
      v-if="this.$route.name === 'projects-slug'"
      class="section-NavViewer_SlugNext"
      @click="clickSlugNextProject"
    ></div>
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
      list: {}
    }
  },
  computed: {
    ...mapState({
      projects: state => state.projects.list
    })
  },
  watch: {
    $route() {
      // console.log(this.$route)
    }
  },
  mounted() {
    this.resetList()
    this.initProjectNumbers()
    this.setAnimateStart()
    this.handleDebouncedResize = lodash.debounce(this.setAnimateStart, 50)
    window.addEventListener("resize", this.handleDebouncedResize)
  },
  destroyed() {
    window.removeEventListener("resize", this.setAnimateStart)
  },
  methods: {
    clickPrevProject() {
      this.animatePrev()
      this.setPrevProject()
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
      this.animateNext()
      this.setNextProject()
    },
    clickSlugNextProject() {
      // console.log("SLUG NEXT")
      this.animateSlugNext()
      this.setNextProject()
      var array = document.querySelectorAll(".project")
      array.forEach(el => {
        if (el.dataset.project === "2") {
          this.$router.push("/projects/" + el.dataset.slug)
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
            ease: "Power4.easeInOut",
            duration: 1.2,
            left: "20vw",
            top: 0,
            width: "80vw",
            height: height - (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "3") {
          gsap.to(el, {
            ease: "Power4.easeInOut",
            duration: 1.2,
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
          gsap.to(el, {
            ease: "Power4.easeInOut",
            duration: 1.2,
            left: "20vw",
            top: (height - width * 0.3) / 2,
            width: "60vw",
            height: "30vw"
          })
        } else if (el.dataset.project === "3") {
          gsap.to(el, {
            ease: "Power4.easeInOut",
            duration: 1.2,
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
            ease: "Power4.easeInOut",
            duration: 1.2,
            left: "100vw",
            top: 0 - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "1") {
          gsap.to(el, {
            ease: "Power4.easeInOut",
            duration: 1.2,
            left: "-20vw",
            top: "100vh",
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "2") {
          gsap.to(el, {
            ease: "Power4.easeInOut",
            duration: 1.2,
            left: 0,
            top: height - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "3") {
          gsap.to(el, {
            ease: "Power4.easeInOut",
            duration: 1.2,
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
            ease: "Power4.easeInOut",
            duration: 1.2,
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
            ease: "Power4.easeInOut",
            duration: 1.2,
            left: 0,
            top: height - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "1") {
          gsap.to(el, {
            ease: "Power4.easeInOut",
            duration: 1.2,
            left: "20vw",
            top: (height - width * 0.3) / 2,
            width: "60vw",
            height: "30vw"
          })
        } else if (el.dataset.project === "2") {
          gsap.to(el, {
            ease: "Power4.easeInOut",
            duration: 1.2,
            left: "80vw",
            top: 0,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "3") {
          gsap.to(el, {
            ease: "Power4.easeInOut",
            duration: 1.2,
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
            ease: "Power4.easeInOut",
            duration: 1.2,
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
            ease: "Power4.easeInOut",
            duration: 1.2,
            left: 0,
            top: height - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "1") {
          gsap.to(el, {
            ease: "Power4.easeInOut",
            duration: 1.2,
            left: "20vw",
            top: 0,
            width: "80vw",
            height: height - (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "2") {
          gsap.to(el, {
            ease: "Power4.easeInOut",
            duration: 1.2,
            left: "100vw",
            top: 0 - (height - width * 0.3) / 2,
            width: "20vw",
            height: (height - width * 0.3) / 2
          })
        } else if (el.dataset.project === "3") {
          gsap.to(el, {
            ease: "Power4.easeInOut",
            duration: 1.2,
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
            ease: "Power4.easeInOut",
            duration: 1.2,
            left: "-20vw",
            top: "100vh",
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
      setTimeout(function() {
        var array = document.querySelectorAll(".project")
        array.forEach((el, index) => {
          return (el.dataset.project = index)
        })
      }, 125)
    },
    setAnimateStart() {
      var width = window.innerWidth
      var height = window.innerHeight
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
      this.sortByDate(this.list)
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
    &_VideoContainer
      position: relative
      width: 100%
      height: 100%
    &_Prev
      position: absolute
      left: 0
      bottom: 0
      width: 20vw
      height: calc((100vh - 30vw)/2)
      z-index: $video-prevnext
    &_Center
      position: absolute
      top: calc((100vh - 30vw)/2)
      left: 20vw
      width: 60vw
      height: 30vw
      z-index: $video-prevnext
    &_Next
      position: absolute
      top: 0
      right: 0
      width: 20vw
      height: calc((100vh - 30vw)/2)
      z-index: $video-prevnext
    &_SlugNext
      position: absolute
      left: 0
      bottom: 0
      width: 20vw
      height: calc((100vh - 30vw)/2)
      z-index: $video-prevnext
    &_SlugCenter
      position: absolute
      top: 0
      left: 20vw
      width: 80vw
      height: calc(100vh - ((100vh - 30vw) / 2))
      z-index: $video-prevnext

.project
  position: absolute
  background: grey
  height: 33.3333vh
  cursor: pointer
  overflow: hidden
</style>
