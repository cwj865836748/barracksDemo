<template>
  <div class="test_two_box">
    <video
      ref="myVideo"
      class="video-js"
    >
      <source
        :src=videoSrc
        type="video/mp4"
      >
    </video>
  </div>
</template>

<script>
export default {
  name: 'earthVideo',
  props: ['videoSrc'],

  data () {
    return {

    }
  },
  mounted () {
    this.initVideo()
  },
  methods: {
    initVideo () {
      const that = this
      // 初始化视频方法
      const myPlayer = this.$video(this.$refs.myVideo, {
        // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: false,
        // 自动播放属性,muted:静音播放
        autoplay: 'muted',
        // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: 'auto',
        // 设置视频播放器的显示宽度（以像素为单位）
        width: '1920px'
        // 设置视频播放器的显示高度（以像素为单位）

      }, function () {
        this.on('ended', () => {
          that.$emit('closeShow')
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
