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
            <div class="flex-grow-1 flex-col flex-x-center flex-y-center item">
              <div class="num">30%</div>
              <img src="../assets/images/qiu.png" alt="" width="108" height="108">
              <span>人行安全形势</span>
            </div>
            <div class="flex-grow-1 flex-col flex-x-center flex-y-center item">
              <div class="num">30%</div>
              <img src="../assets/images/qiu.png" alt="" width="108" height="108">
              <span>车辆安全形势</span>
            </div>
            <div class="flex-grow-1 flex-col flex-x-center flex-y-center item">
              <div class="num">30%</div>
              <img src="../assets/images/qiu.png" alt="" width="108" height="108">
              <span>枪支安全形势</span>
            </div>
            <div class="flex-grow-1 flex-col flex-x-center flex-y-center item">
              <div class="num">30%</div>
              <img src="../assets/images/qiu.png" alt="" width="108" height="108">
              <span>设备安全形势</span>
            </div>
            <div class="flex-grow-1 flex-col flex-x-center flex-y-center item">
              <div class="num">30%</div>
              <img src="../assets/images/qiu.png" alt="" width="108" height="108">
              <span>周界安全形势</span>
            </div>

          </div>
        </div>
      </div>
      <div class="content-footer-month">
        <zy-title text="月安全形势"/>
        <Month/>
      </div>
      <div class="content-footer-personnel">
        <zy-title text="人员管理"/>
        <Pie/>
      </div>
      <div class="content-footer-vedio">
        <div class="content-footer-vedio-list clearfix" v-show="vedioNum==4">
          <div class="content-footer-vedio-list-item flex-y-center flex-x-center">
            <img src="../assets/images/vedio1.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item flex-y-center flex-x-center">
            <img src="../assets/images/vedio2.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item flex-y-center flex-x-center">
            <img src="../assets/images/vedio4.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item flex-y-center flex-x-center">
            <img src="../assets/images/vedio3.png" alt="">
          </div>
        </div>
        <div class="content-footer-vedio-list clearfix" v-show="vedioNum==16">
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/vedio1.png" alt="" class="img1">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/vedio2.png" alt="" class="img1">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/xz.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/xz.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/vedio3.png" alt="" class="img1">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/vedio4.png" alt="" class="img1">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/xz.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/xz.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/xz.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/xz.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/xz.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/xz.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/xz.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/xz.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/xz.png" alt="">
          </div>
          <div class="content-footer-vedio-list-item16 flex-y-center flex-x-center">
            <img src="../assets/images/xz.png" alt="">
          </div>
        </div>
        <div class="content-footer-vedio-footer flex-row flex-x-center">
          <div class="btn" :class="[vedioNum==4?'active':'']" @click="vedioNum = 4">2*2</div>
          <div class="btn" :class="[vedioNum==16?'active':'']" @click="vedioNum = 16">4*4</div>
        </div>
      </div>
      <div class="content-footer-bullet">
        <zy-title text="枪弹管理"/>
        <Bullet/>
      </div>
      <div class="content-footer-vehicle">
        <zy-title text="车辆管理"/>
        <brokenLine/>
      </div>
      <div class="content-footer-device">
        <zy-title text="设备运维"/>
        <div class="content-footer-device-box">
          <div class="flex-row  flex-y-center">
            <div ref="myChart_pie1" :style="{width: '100px', height: '100px'}" class="flex-grow-0"></div>
            <div class="flex-grow-1 flex-row" style="justify-content:space-between;padding: 0 20px ">
              <div class="sb-item">
                <span class="ry"></span>
                <span class="title">摄像机</span>
                <div class="num">120台</div>
              </div>
              <div class="sb-item">
                <span class="ry" style="background: #0FEA8A;"></span>
                <span class="title">人行道闸</span>
                <div class="num">32台</div>
              </div>
              <div class="sb-item">
                <span class="ry" style="background: #0F71EA;"></span>
                <span class="title">车行道闸</span>
                <div class="num">8台</div>
              </div>
            </div>
          </div>
          <div class="flex-row flex-y-center" style="margin-top: 10px">
            <div ref="myChart_pie2" :style="{width: '100px', height: '100px'}"></div>
            <div class="flex-grow-1 flex-row" style="justify-content:space-between;padding: 0 20px ">
              <div class="sb-item">
                <span class="ry" style="background: #F94137"></span>
                <span class="title">摄像机故障</span>
                <div class="num">10台</div>
              </div>
              <div class="sb-item">
                <span class="ry" style="background: #FF8C00;"></span>
                <span class="title">人行故障</span>
                <div class="num">18台</div>
              </div>
              <div class="sb-item">
                <span class="ry" style="background: #E81168;"></span>
                <span class="title">车行故障</span>
                <div class="num">4台</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--左边-->
    <!--<div class="content_left">-->
    <!--<div class="content_left_one">-->
    <!--<div class="myContent">-->
    <!--<div>每天安全形势</div>-->
    <!--<Plain/>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="content_left_one">-->
    <!--<div class="myContent">-->
    <!--<div>人员管理</div>-->
    <!--<Pie/>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="content_left_one">-->
    <!--<div class="myContent">-->
    <!--<div>车辆管理</div>-->
    <!--<brokenLine/>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--中间-->

    <!--右边-->
    <earthVideo class="myEarthVideo" :videoSrc="videoSrc" v-if="videoShow" @closeShow="videoShow=false"/>
    <div class="back-btn" @click="$router.go(-1)">返回</div>
  </div>
</template>

<script>
import { TimeFormat } from '@/utils/utils'
import Plain from '@/components/echarts/plain'
import Pie from '@/components/echarts/pie'
import Month from '@/components/echarts/month'
import brokenLine from '@/components/echarts/brokenLine'
import Bullet from '@/components/echarts/bullet'

import earthVideo from '@/components/earthVideo/earthVideo'
import zyTitle from '@/components/title/index'
// import 'echarts-liquidfill/src/liquidFill.js';

export default {
  name: 'situationMap',
  data () {
    return {
      nowDate: '',
      timer: null,
      intnum: null,
      camp: this.$store.state.camp,
      campShow: false, // 下拉
      videoShow: false,
      temp: 10,
      vedioNum: 4
    }
  },
  components: {
    Plain,
    Pie,
    brokenLine,
    Month,
    Bullet,
    earthVideo,
    zyTitle
  },

  created () {
    this.getDate()

    // this.drawTemperature();
  },

  mounted () {
    this.drawPie1()
    this.drawPie2()
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
      this.$store.commit('updateCamp', val)
      this.videoShow = true
      this.camp = val
      this.campShow = false
    },
    drawPie1 () {
      var myChart = this.$echarts.init(this.$refs.myChart_pie1)
      var scale = 1
      var echartData = [{
        value: parseInt(120),
        name: '摄像机'
      },
      {
        value: parseInt(8),
        name: '车行道闸'
      },
      {
        value: parseInt(32),
        name: '人行道闸'
      }
      ]

      var option = {
        // backgroundColor: 'rgba(0,0,0,0)',

        title: [{
          text: '160台',
          left: '24%',
          top: '20%',
          padding: [14, 0],
          textStyle: {
            color: '#fff',
            fontSize: 20 * scale,
            align: 'center'
          }
        }, {
          text: '设备总数',
          left: '22%',
          top: '42%',
          padding: [15, 0],
          textStyle: {
            color: '#fff',
            fontSize: 14 * scale,
            align: 'center'
          }
        }],
        series: [{
          //						name: '设备总数',
          type: 'pie', // 环形图的type和饼图相同
          // center: ['30%', '50%'],
          radius: ['66%', '100%'], // 饼图的半径，第一个为内半径，第二个为外半径
          avoidLabelOverlap: false,
          hoverAnimation: false,
          color: ['rgba(0, 255, 252, 1)', 'rgba(15, 113, 234, 1)', 'rgba(15, 234, 138, 1)'],
          label: {
            normal: { // 正常的样式
              show: false,
              position: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 20 * scale,
                //									align: 'center',
                fontWeight: 'bold',
                margin: [0, 0, 0, 5]
              },
              formatter: function (name) {
                var target = 0
                for (var j = 0; j < echartData.length; j++) {
                  target += echartData[j].value
                }
                // console.log(target)
                var arr = target + '台'
                return arr
              }
            }
          }, // 提示文字
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            borderWidth: 7,
            borderColor: '#050e28'
          },
          data: echartData
        }]
      }
      myChart.setOption(option)
    },
    drawPie2 () {
      var myChart = this.$echarts.init(this.$refs.myChart_pie2)
      var scale = 1
      var echartData = [{
        value: parseInt(18),
        name: '摄像机'
      },
      {
        value: parseInt(4),
        name: '车行道闸'
      },
      {
        value: parseInt(10),
        name: '人行道闸'
      }
      ]

      var option = {
        // backgroundColor: 'rgba(0,0,0,0)',

        title: [{
          text: '32台',
          left: '28%',
          top: '20%',
          padding: [14, 0],
          textStyle: {
            color: '#fff',
            fontSize: 20 * scale,
            align: 'center'
          }
        }, {
          text: '故障总数',
          left: '22%',
          top: '42%',
          padding: [15, 0],
          textStyle: {
            color: '#fff',
            fontSize: 14 * scale,
            align: 'center'
          }
        }],
        series: [{
          //						name: '设备总数',
          type: 'pie', // 环形图的type和饼图相同
          // center: ['30%', '50%'],
          radius: ['66%', '100%'], // 饼图的半径，第一个为内半径，第二个为外半径
          avoidLabelOverlap: false,
          hoverAnimation: false,
          color: ['rgba(249,65,55, 1)', 'rgba(232,17,104, 1)', 'rgba(255,140,0, 1)'],
          label: {
            normal: { // 正常的样式
              show: false,
              position: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 20 * scale,
                //									align: 'center',
                fontWeight: 'bold',
                margin: [0, 0, 0, 5]
              },
              formatter: function (name) {
                var target = 0
                for (var j = 0; j < echartData.length; j++) {
                  target += echartData[j].value
                }
                // console.log(target)
                var arr = target + '台'
                return arr
              }
            }
          }, // 提示文字
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            borderWidth: 7,
            borderColor: '#050e28'
          },
          data: echartData
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
        left: 704px;
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
            margin-top: 20px;
            span {
              font-size: 18px;
              color: #ffffff;
              line-height: 24px;
              margin-top: 6px;
            }
            .item {
              position: relative;
              .num {
                position: absolute;
                top: 20px;
                font-size: 16px;
                color: #ffffff;
              }
            }
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
        position: absolute;
        top: 335px;
        left: 500px;
        &-list {
          &-item {
            width: 450px;
            height: 270px;
            float: left;
            margin-right: 20px;
            margin-bottom: 14px;
            border: 2px solid #000D62;
            background: rgba(2, 0, 40, 0.7);
            &:nth-child(even) {
              margin-right: 0;
            }
          }
        }

        &-list {
          &-item16 {
            width: 220px;
            height: 130px;
            float: left;
            margin-right: 13px;
            margin-bottom: 12px;
            border: 2px solid #000D62;
            background: rgba(2, 0, 40, 0.7);
            &:nth-child(4n) {
              margin-right: 0;
            }
            img {
              width: 24px;
              height: 24px;
              animation: rotation 3s linear infinite;
            }
            .img1 {
              width: 206px;
              height: 114px;
              animation: none;
            }
          }
        }

        &-footer {
          .btn {
            width: 90px;
            line-height: 35px;
            font-size: 16px;
            color: #ffffff;
            background: #08062D;
            border: 1px solid #0029FF;
            border-radius: 2px;
            text-align: center;
            cursor: pointer;
            &:first-child {
              margin-right: 24px;
            }
            &.active {
              background: #0049FF;
              cursor: auto;
            }
          }
        }
      }

      &-bullet {
        width: 450px;
        height: 290px;
        position: absolute;
        top: 335px;
        right: 20px;
        border: 2px solid #000D62;
        background: rgba(2, 0, 40, 0.7);
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
        position: absolute;
        bottom: 20px;
        right: 20px;
        border: 2px solid #000D62;
        background: rgba(2, 0, 40, 0.7);

        &-box {
          padding: 10px 20px;

          .sb-item {
            .ry {
              width: 10px;
              height: 10px;
              display: inline-block;
              background: #00FFFC;
              border-radius: 50%;
              margin-right: 5px;
            }
            .title {
              font-size: 14px;
              color: #9B9B9B;
            }
            .num {
              color: #FFFFFF;
              font-size: 14px;
              font-weight: bold;
              margin-top: 10px;
              margin-left: 10px;
            }
          }
        }
      }

    }
  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .back-btn {
    position: absolute;
    top: 96px;
    right: 24px;
    width: 88px;
    line-height: 36px;
    font-size: 16px;
    color: #FFF;
    text-align: center;
    background: #0049FF;
    border-radius: 2px;
    cursor: pointer;
  }
</style>
