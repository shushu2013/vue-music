<template>
  <div>
    <i
      :class="getIcon"
      @click="toggleFullScreen">
    </i>
  </div>
</template>

<script>
import Vue from 'vue'
import fullscreen from 'vue-fullscreen'

Vue.use(fullscreen)

export default {
  data() {
    return {
      fullscreen: false
    }
  },
  computed: {
    getIcon() {
      return this.fullscreen ? 'icon-shrink' : 'icon-enlarge'
    }
  },
  methods: {
    toggleFullScreen() {
      this.$fullscreen.toggle(document.documentElement, {
        wrap: false,
        callback: (fullscreen) => {
          this.fullscreen = fullscreen
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .full-screen
    opacity: 0.8
</style>
