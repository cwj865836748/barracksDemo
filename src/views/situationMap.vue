<template>
  <div class="content" >
    <!--头部-->
    <div class="content_head">
      <img src="@/assets/images/head.png"/>
      <div class="head_text">XX营区安全管控综合态势图</div>
      <div class="head_camp" @click="campShow=!campShow">{{camp}}营区<img src="@/assets/images/select.png"/></div>
      <div class="head_date">{{nowDate}}</div>
      <div class="head_choose" v-show="campShow">
        <div :class="['camp_icon',camp==='A'?'icon':'']"  @click="chooseCamp('A')">A营区</div>
        <div :class="['camp_icon',camp==='B'?'icon':'']"  @click="chooseCamp('B')">B营区</div>
        <div :class="['camp_icon',camp==='C'?'icon':'']"  @click="chooseCamp('C')">C营区</div>
      </div>
    </div>
    <!--左边-->
    <div class="content_left">
      <div class="content_left_one">
        <div class="myContent">
          <div>每天安全形势</div>
          <Plain/>
        </div>
      </div>
      <div class="content_left_one">
        <div class="myContent">
          <div>人员管理</div>
          <Pie/>
        </div>
      </div>
      <div class="content_left_one">
        <div class="myContent">
          <div>车辆管理</div>
          <brokenLine/>
        </div>
      </div>
    </div>
    <!--中间-->
    <!--右边-->
    <earthVideo class="myEarthVideo" :videoSrc="videoSrc" v-if="videoShow" @closeShow="videoShow=false"/>

  </div>
</template>

<script>
import { TimeFormat } from '@/utils/utils'
import Plain from '@/components/echarts/plain'
import Pie from '@/components/echarts/pie'
import brokenLine from '@/components/echarts/brokenLine'
import earthVideo from '@/components/earthVideo/earthVideo'

export default {
  name: 'situationMap',
  data () {
    return {
      nowDate: '',
      timer: null,
      intnum: null,
      camp: 'A',
      campShow: false,// 下拉
      videoShow:false
    }
  },
  components: {
    Plain, Pie, brokenLine, earthVideo
  },

  created () {
    this.getDate()
  },
  mounted () {
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    getDate () {
      this.timer = setInterval(() => { // 创建定时器
        var date = new Date()
        this.nowDate = TimeFormat(date)
      }, 1000)
    },
    chooseCamp (val) {
      this.videoSrc = `/video/${this.camp}${val}.mp4`
      this.videoShow = true
      this.camp = val
      this.campShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    position: relative;
    background: url("../assets/images/bg.png") no-repeat;
    background-size: 100% 100%;
    .content_head {
      width: 100%;
      height: 120px;
      .head_text {
        position: absolute;
        height: 46px;
        left: 766px;
        top: 24px;

        font-family: Microsoft YaHei UI;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 46px;
        /* identical to box height */

        text-align: center;
        letter-spacing: 0.15em;

        color: #FFFFFF;
      }
      .head_choose {
        width: 106px;
        height: 147px;
        background: url("../assets/images/u10.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        z-index: 10;
        top: 66px;
        left: 152px;
        .camp_icon {
          font-family: Microsoft YaHei UI;
          font-style: normal;
          font-weight: normal;
          font-size: 24px;
          line-height: 30px;
          color: #616079;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .icon {
          color: #FFFFFF;
        }
        .icon::before {
          content: '';
          width: 2px;
          height: 15.9px;
          display: block;
          background-color: #34E3FE;
          position: absolute;
          left: 15px;
        }
      }
      .head_date {
        position: absolute;
        width: 213px;
        height: 28px;
        left: 1685px;
        top: 29px;

        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        color: #FFFFFF;

      }
      .head_camp {
        display: flex;
        align-items: center;
        position: absolute;
        height: 30px;
        left: 122px;
        top: 25px;
        font-family: Microsoft YaHei UI;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 30px;
        letter-spacing: 0.1em;
        color: #FFFFFF;
        img {
          margin-left: 10px;
        }
      }
    }
    .content_left {
     .content_left_one {
       height: 285px;
       width: 446px;
       background: #020028;
       opacity: 0.7;
       border: 3px solid #000D55;
       .myContent {
         padding: 10px 20px 15px;
         font-family: Microsoft YaHei UI;
         font-style: normal;
         font-weight: normal;
         font-size: 24px;
         line-height: 30px;
         letter-spacing: 0.15em;
         color: #FFFFFF;
       }
     }
    }
    .myEarthVideo {
      position: fixed;
      top:0;
      left: 0;
      z-index: 999;
    }
  }
</style>
