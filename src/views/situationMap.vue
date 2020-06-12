<template>
  <div class="content">
    <!--头部-->
    <div class="content_head">
      <img src="@/assets/images/head.png"/>
      <div class="head_text">XX营区安全管控综合态势图</div>
      <div class="head_camp" @click="campShow=!campShow">{{camp}}营区<img src="@/assets/images/select.png"/></div>
      <div class="head_date">{{nowDate}}</div>
      <div class="head_choose" v-show="campShow">
        <div :class="['camp_icon',camp==='A'?'icon':'']" @click="chooseCamp('A')">A营区</div>
        <div :class="['camp_icon',camp==='B'?'icon':'']" @click="chooseCamp('B')">B营区</div>
        <div :class="['camp_icon',camp==='C'?'icon':'']" @click="chooseCamp('C')">C营区</div>
      </div>
    </div>

    <div class="content-footer">
      <div class="content-footer-week">
        <zy-title text="周安全形势"/>
        <Plain/>
      </div>
      <div class="content-footer-today">
        <zy-title text="今日安全形势" :type="2"/>
        <div class="content-footer-today-box">
          <div class="content-footer-today-box-header">
            <span class="title">今日安全形势</span>
            <div class="progress-bar">
              <span class="schedule"></span>
              <span class="number">70%</span>
            </div>
            <img src="../assets/images/schedule.png" alt="">
            <span class="desc">较昨日上升20%</span>
          </div>
          <div class="flex-row content-footer-today-box-footer  ">
            <div class="flex-grow-1 flex-col flex-x-center flex-y-center">
              <img src="../assets/images/qiu.png" alt="" width="108" height="108">
              <span>人行安全形势</span>
            </div>
            <div class="flex-grow-1 flex-col flex-x-center flex-y-center">
              <img src="../assets/images/qiu.png" alt="" width="108" height="108">
              <span>人行安全形势</span>
            </div>
            <div class="flex-grow-1 flex-col flex-x-center">
              <img src="../assets/images/qiu.png" alt="" width="108" height="108">
              <span>人行安全形势</span>
            </div>
            <div class="flex-grow-1 flex-col flex-x-center">
              <img src="../assets/images/qiu.png" alt="" width="108" height="108">
              <span>人行安全形势</span>
            </div>
            <div class="flex-grow-1 flex-col flex-x-center">
              <img src="../assets/images/qiu.png" alt="" width="108" height="108">
              <span>人行安全形势</span>
            </div>

          </div>
        </div>
      </div>
      <div class="content-footer-month">
        <zy-title text="月安全形势"/>
      </div>
      <div class="content-footer-personnel">
        <zy-title text="人员管理"/>
        <Pie/>
      </div>
      <div class="content-footer-vedio">
        <zy-title text="周安全形势"/>
      </div>
      <div class="content-footer-bullet">
        <zy-title text="枪弹管理"/>
      </div>
      <div class="content-footer-vehicle">
        <zy-title text="车辆管理"/>
        <brokenLine/>
      </div>
      <div class="content-footer-device">
        <zy-title text="设备运维"/>
      </div>
    </div>
    <earthVideo class="myEarthVideo" :videoSrc="videoSrc" v-if="videoShow" @closeShow="videoShow=false"/>

  </div>
</template>

<script>
import { TimeFormat } from '@/utils/utils'
import Plain from '@/components/echarts/plain'
import Pie from '@/components/echarts/pie'
import brokenLine from '@/components/echarts/brokenLine'
import earthVideo from '@/components/earthVideo/earthVideo'
import zyTitle from '@/components/title/index'
import 'echarts-liquidfill/src/liquidFill.js'

export default {
  name: 'situationMap',
  data () {
    return {
      nowDate: '',
      timer: null,
      intnum: null,
      camp: 'A',
      campShow: false, // 下拉
      videoShow: false,
      temp: 10
    }
  },
  components: {
    Plain,
    Pie,
    brokenLine,
    earthVideo,
    zyTitle
  },

  created () {
    this.getDate()
    // this.drawTemperature();
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
    },
    drawTemperature () {
      const myChart = this.$echarts.init(document.getElementById('temperatrue-echarts'))
      // window.console.log(this.temp)
      var value = parseInt(this.temp) / 100
      var value1 = this.temp
      var data = [{
        value: value,
        amplitude: '5%',
        waveLength: '80%',
        itemStyle: {
          color: 'rgba(52, 130, 250, 0.9)'
        }
      }, {
        value: value,
        amplitude: '5%',
        waveLength: '80%',
        itemStyle: {
          color: 'rgba(52, 130, 250, 0.9)'
        }
      }]
      var option = {
        series: [{
          type: 'liquidFill',
          radius: '95%',
          // cent  er: ['50%', '40%'],
          data: data,
          outline: {
            show: false,
            borderDistance: 0
          },
          backgroundStyle: {
            borderWidth: 5,
            borderColor: 'rgba(53, 133, 255, 1)',
            color: 'rgba(9, 14, 47, 0.76)'
          },
          label: {
            normal: {
              formatter: function () {
                return value1
              },
              textStyle: {
                fontSize: 64,
                color: 'rgba(255, 255, 255, 1)'
              }
            }
          }

        }]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
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
      top: 0;
      left: 0;
      z-index: 999;
    }

    &-footer {
      padding: 20px;
      box-sizing: border-box;
      height: 960px;
      position: relative;
      background: url("../assets/images/bg.png") no-repeat;
      background-size: 100% 100%;

      &-week {
        width: 450px;
        height: 290px;
        position: absolute;
        top: 20px;
        left: 20px;
        border: 2px solid #000D62;
        background: rgba(2, 0, 40, 0.7);
      }

      &-today {
        width: 920px;
        height: 290px;
        position: absolute;
        top: 20px;
        left: 500px;
        border: 2px solid #000D62;
        background: rgba(2, 0, 40, 0.7);

        &-box {
          padding: 20px;
          &-header {
            line-height: 24px;
            display: flex;
            align-items: center;

            .title {
              font-size: 18px;
              color: #ffffff;
              padding: 0 10px 0 20px;
            }

            .desc {
              color: #ffffff;
              font-size: 14px;
            }

            .progress-bar {
              width: 600px;
              height: 24px;
              display: inline-block;
              background: rgba(0, 3, 37, 0.7);
              position: relative;
            }

            .schedule {
              position: absolute;
              top: 0;
              left: 0;
              background: #FF2756;
              width: 420px;
              height: 24px;
            }
            .number {
              position: absolute;
              top: 0;
              left: 430px;
              color: #ffffff;
              font-size: 14px;
            }
          }
          &-footer {
          }
        }
      }

      &-month {
        width: 450px;
        height: 290px;
        position: absolute;
        top: 20px;
        right: 20px;
        border: 2px solid #000D62;
        background: rgba(2, 0, 40, 0.7);
      }

      &-personnel {
        width: 450px;
        height: 290px;
        position: absolute;
        top: 335px;
        left: 20px;
        border: 2px solid #000D62;
        background: rgba(2, 0, 40, 0.7);
      }

      &-vedio {
        width: 920px;
        height: 605px;
        background: green;
        position: absolute;
        top: 335px;
        left: 500px;
      }

      &-bullet {
        width: 450px;
        height: 290px;
        background: green;
        position: absolute;
        top: 335px;
        right: 20px;
      }

      &-vehicle {
        width: 450px;
        height: 290px;
        position: absolute;
        bottom: 20px;
        left: 20px;
        border: 2px solid #000D62;
        background: rgba(2, 0, 40, 0.7);
      }

      &-device {
        width: 450px;
        height: 290px;
        background: green;
        position: absolute;
        bottom: 20px;
        right: 20px;
      }

    }
  }

</style>
