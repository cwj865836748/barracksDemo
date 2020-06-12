<template>
  <div id="app">
    <keep-alive class="keep">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="noKeep" v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'App',
    data() {
      return {
        windowWidth: $(window).width(),
        windowHight: $(window).height()
      }
    },
    mounted() {
      // const that = this
      // that.resizeDiv()
      // window.onresize = () => {
      //   return (() => {
      //     that.windowWidth = $(window).width()
      //     that.windowHight = $(window).height()
      //     that.resizeDiv()
      //   })()
      // }
    },
    methods: {
      resizeDiv() {
        const scaleX = this.windowWidth / 1920 // 设备默认宽度为810px
        const scaleY = this.windowHight / 1080 // 设备默认高度为340px
        // 按设备比例缩放div的比例
        const scaleFunc = 'scale(' + scaleX + ',' + scaleY + ')'
        $('body').css({
          transform: scaleFunc, // 缩放比例
          '-ms-transform': scaleFunc, /* IE 9 */
          '-moz-transform': scaleFunc, /* Firefox */
          '-webkit-transform': scaleFunc, /* Safari 和 Chrome */
          '-o-transform': scaleFunc /* Opera */
        })
        $('body').show()
      }
    }
  }
</script>

<style lang="scss">
  @import "assets/css/reset.scss";

  body {
    /*display: none; !**先隐藏，缩放后再显示，防止闪烁**!*/
    width: 1920px;
    height: 1080px;
    /*transform-origin: left top;// 缩放基点*/
    /*-ms-transform-origin: left top;*/
    /*-moz-transform-origin: left top;*/
    /*-webkit-transform-origin: left top;*/
    /*-o-transform-origin: left top*/
  }

  [v-cloak] {
    display: none
  }

  #app {
    width: 100% !important;
    height: 100%;
    overflow: hidden;
  }

</style>
