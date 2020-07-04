<template>
  <videoPlayer
    ref="video"
    :style="{height,width}"
    class="vjs-custom-skin videoPlayer"
    :options="videoOptions"
    :playsinline="true"
    v-if="openVideo"
  />
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'
import SWF_URL from 'videojs-swf/dist/video-js.swf'
export default {
  name: 'index',
  components: {
    videoPlayer
  },
  props: ['height', 'width', 'src', 'type', 'openVideo'],
  data () {
    return {
      videoOptions: {
        live: false,
        autoplay: true,
        fluid: true,
        notSupportedMessage: '暂时无法播放',
        controlBar: false,
        loop: true,
        muted: true,
        // controlBar: {
        //   timeDivider: false,
        //   durationDisplay: false,
        //   remainingTimeDisplay: false,
        //   fullscreenToggle: false // 全屏按钮
        // },
        techOrder: ['flash'],
        flash: {
          hls: { withCredentials: false },
          swf: SWF_URL // 引入静态文件swf
        },
        sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
          type: this.type,
          src: this.src// 这是芒果TV现场直播视频，地址是可以用的，最后需要替换成后端给的项目地址
        }]
      }
    }
  }
}
</script>

<style scoped>
  /deep/.video-js .vjs-big-play-button {
    font-size: 3em;
    line-height: 1.5em;
    height: 1.5em;
    width: 3em;
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 0;
    cursor: pointer;
    opacity: 1;
    border: 0.06666em solid #fff;
    background-color: #2B333F;
    background-color: rgba(43, 51, 63, 0.7);
    border-radius: 0.3em;
    transition: all 0.4s;
    transform: translate(-50%,-50%);
  }
</style>
