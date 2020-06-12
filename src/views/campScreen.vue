<template>
  <div class="content" >
    <!--头部-->
     <div class="content_head">
       <img src="@/assets/images/head.png"/>
       <div class="head_text">XX营区安全管理平台</div>
       <div class="head_camp" @click="campShow=!campShow">{{camp}}营区<img src="@/assets/images/select.png"/></div>
       <div class="head_date">{{nowDate}}</div>
       <div class="head_choose" v-show="campShow">
         <div :class="['camp_icon',camp==='A'?'icon':'']"  @click="chooseCamp('A')">A营区</div>
         <div :class="['camp_icon',camp==='B'?'icon':'']"  @click="chooseCamp('B')">B营区</div>
         <div :class="['camp_icon',camp==='C'?'icon':'']"  @click="chooseCamp('C')">C营区</div>
       </div>
     </div>
    <!--背景-->
    <div class="content_bg" :style="{backgroundImage:`url(${require(`@/assets/images/${camp}.png`)})`}" >
      <img src="@/assets/images/Group-5.png" v-show="sensorShow" @click="sensorWindow=!sensorWindow"/>
      <img src="@/assets/images/Group-6.png" v-show="gateShow" @click="gateWindow=!gateWindow"/>
      <img src="@/assets/images/Group-3.png" v-show="sentryShow" @click="sentryWindow=!sentryWindow"/>
      <img src="@/assets/images/Group-2.png" v-show="cameraShow" @click="cameraWindow=!cameraWindow"/>
      <img src="@/assets/images/Group-4.png" v-show="essentialShow" @click="essentialWindow=!essentialWindow"/>
      <img src="@/assets/images/Group-1.png" @click="centerWindow=!centerWindow"/>
      <img src="@/assets/images/Group-4.png" v-show="essentialShow"/>
      <img src="@/assets/images/Group-2.png" v-show="cameraShow" />
      <img src="@/assets/images/Group-3.png" v-show="sentryShow" />
      <img src="@/assets/images/Group-6.png" v-show="gateShow" />
      <img src="@/assets/images/Group-5.png" v-show="sensorShow"/>
      <!--效果图-->
      <img :src="sensorDetail?require('@/assets/images/Group 27.png'):require('@/assets/images/Group 28.png')" v-show="sensorWindow" @click="changeDetail(0)"/>
      <img :src="gateDetail?require('@/assets/images/Group 29.png'):require('@/assets/images/Group 30.png')" v-show="gateWindow" @click="changeDetail(1)"/>
      <img :src="cameraDetail?require('@/assets/images/Group 31.png'):require('@/assets/images/Group 32.png')" v-show="cameraWindow" @click="changeDetail(2)"/>
      <img :src="sentryDetail?require('@/assets/images/Group 36.png'):require('@/assets/images/Group 35.png')" v-show="sentryWindow" @click="changeDetail(3)"/>
      <img :src="essentialDetail?require('@/assets/images/Group 33.png'):require('@/assets/images/Group 34.png')" v-show="essentialWindow" @click="changeDetail(4)"/>
      <img src="@/assets/images/image 7.png" v-show="centerWindow" @click="changeDetail(5)"/>

    </div>

    <!--左边-->
     <div class="content_left" :class="[leftClose?'close':'']">
       <div class="left_comprehensive">
         <div class="left_comprehensive_top" @click="comprehensiveCloseShow">
           <span>综合动态</span>
           <img src="@/assets/images/select.png"/>
         </div>
         <div class="left_comprehensive_body" :class="[topClose?'close':'']">
           <div class="left_comprehensive_content" :class="[topClose?'close':'']"  @mouseenter="Stop()" @mouseleave="ScrollUp()" @scroll="paperScroll()">
               <div class="detail" v-for="(item,index) in comprehensiveLists" :style="{ top:comprehensiveTop }" :key="index" @click="leftCarShow=true">
                 <div>【<span :style="{color:(item.isRed?'red':'')}">{{item.name}}</span>】</div>
                 <div>{{item.time}}</div>
                 <div>{{item.work}}</div>
               </div>
           </div>
         </div>
         <div class="left_comprehensive_checkbox" v-show="comprehensiveShow">
           <div :class="[comprehensiveStatus===0?'all':'']" style="cursor:pointer;" @mouseover="changeStatus('status',0)" @click="getStatus('all')">全部动态</div>
           <div :class="[comprehensiveStatus===1?'select':'']" @mouseover="changeStatus('status',1)">报警动态</div>
           <div :class="[comprehensiveStatus===2?'select':'']" @mouseover="changeStatus('status',2)">出入动态</div>
         </div>
         <div :class="['left_comprehensive_checkbox2',comprehensiveStatus===1?'absolute2':'absolute3']" v-show="comprehensiveDetailShow">
           <div class="checkbox_content" v-show="comprehensiveStatus===1">
            <div :class="[comprehensiveDetailStatus===0?'select':'']" @mouseover="changeStatus('detail',0)" @click="getStatus(0)">普通报警</div>
            <div :class="[comprehensiveDetailStatus===1?'select':'']" @mouseover="changeStatus('detail',1)" @click="getStatus(1)">紧急报警</div>
            <div :class="[comprehensiveDetailStatus===2?'select':'']" @mouseover="changeStatus('detail',2)" @click="getStatus(2)">特急报警</div>
           </div>
           <div class="checkbox_content" v-show="comprehensiveStatus===2">
             <div :class="[comprehensiveDetailStatus===3?'select':'']" @mouseover="changeStatus('detail',3)" @click="getStatus(3)">人员出入</div>
             <div :class="[comprehensiveDetailStatus===4?'select':'']" @mouseover="changeStatus('detail',4)" @click="getStatus(4)">车辆出入</div>
             <div :class="[comprehensiveDetailStatus===5?'select':'']" @mouseover="changeStatus('detail',5)" @click="getStatus(5)">物资出入</div>
           </div>
         </div>
         <div class="topClose" @click="topClose=!topClose">
           <img src="@/assets/images/goup.png" v-if="!topClose">
           <img src="@/assets/images/gobottom.png" v-else>
         </div>
       </div>
       <div class="left_comprehensive">
         <div class="left_comprehensive_top">
          <span>值班信息</span>
         </div>
         <div class="left_comprehensive_body_two" :class="[topClose?'close':'',topCloseBottom?'closeBottom':'']">
           <div :class="[topCloseBottom?'left_body':'']">
           <div class="left_status">值班动态</div>
           <div class="personal">
             <div><img src="@/assets/images/Group.png"/>值班首长：张三</div>
             <div><img src="@/assets/images/Group.png"/>值班人员：赵六</div>
             <div><img src="@/assets/images/Group.png"/>值班人员：李四</div>
             <div><img src="@/assets/images/Group.png"/>值班人员：王五</div>
           </div>
           <div class="left_border"/>
           <div class="left_status">人员信息</div>
           <div class="personMessage">
             <div class="personDetail">
               <div>编制人员</div>
               <div class="lineColor">
               <div class="pink" style="width: 100%"></div>
               </div>
               <div>500人</div>
             </div>
             <div class="personDetail">
               <div>实有人员</div>
               <div class="lineColor">
                 <div class="blue" style="width: 85%"></div>
               </div>
               <div>450人</div>
             </div>
             <div class="personDetail">
               <div>在位人员</div>
               <div class="lineColor">
                 <div class="pink" style="width: 65%"></div>
               </div>
               <div>300人</div>
             </div>
             <div class="personDetail">
               <div>访客数量</div>
               <div class="lineColor">
                 <div class="blue" style="width: 65%"></div>
               </div>
               <div>300人</div>
             </div>
           </div>
           <div class="left_border"/>
           <div class="left_status">车辆信息</div>
           <div class="personMessage">
             <div class="personDetail">
               <div>编制车辆</div>
               <div class="lineColor">
                 <div class="pink" style="width: 100%"></div>
               </div>
               <div>20辆</div>
             </div>
             <div class="personDetail">
               <div>实有车辆</div>
               <div class="lineColor">
                 <div class="blue" style="width: 85%"></div>
               </div>
               <div>15辆</div>
             </div>
             <div class="personDetail">
               <div>在位车辆</div>
               <div class="lineColor">
                 <div class="pink" style="width: 65%"></div>
               </div>
               <div>14辆</div>
             </div>
             <div class="personDetail">
               <div>访客车辆</div>
               <div class="lineColor">
                 <div class="blue" style="width: 20%"></div>
               </div>
               <div>2辆</div>
             </div>
           </div>
           <div class="left_border"/>
           <div class="left_status">枪支信息</div>
           <div class="personMessage personMessage_q">
             <div class="personDetail">
               <div>编制枪支</div>
               <div class="lineColor">
                 <div class="pink" style="width: 100%"></div>
               </div>
               <div>200支</div>
             </div>
             <div class="personDetail">
               <div>实有枪支</div>
               <div class="lineColor">
                 <div class="blue" style="width: 90%"></div>
               </div>
               <div>120支</div>
             </div>
             <div class="personDetail">
               <div>在位枪支</div>
               <div class="lineColor">
                 <div class="pink" style="width: 75%"></div>
               </div>
               <div>100支</div>
             </div>
           </div>
           </div>
         </div>
         <div class="topClose" @click="topCloseBottom=!topCloseBottom">
           <img src="@/assets/images/goup.png" v-if="!topCloseBottom">
           <img src="@/assets/images/gobottom.png" v-else>
         </div>
       </div>
     </div>
     <div class="content_left_img" v-show="leftCarShow">
       <div class="content_close" @click="leftCarShow=false"></div>
       <img src="@/assets/images/showCar.png"/>
     </div>
     <div class="content_left_close" :class="[leftClose?'close':'']"  @click="leftClose=!leftClose">
      <img src="@/assets/images/goleft.png" v-if="!leftClose">
      <img src="@/assets/images/leftClose.png" v-else>
    </div>
    <!--右边-->
    <div class="content_right" :class="[rightClose?'close':'']">
      <img :src="rightPic!==0?Frame14:Frame15" @mouseover="rightPic=0" @mouseout="rightPic=-1"
           @click="$router.push('/situationMap')"/>
      <img :src="rightPic!==1?Frame:Frame7" @mouseover="rightPic=1" @mouseout="rightPic=-1"/>
      <img :src="rightPic!==2?Frame1:Frame8" @mouseover="rightPic=2" @mouseout="rightPic=-1"/>
      <img :src="rightPic!==3?Frame2:Frame9" @mouseover="rightPic=3" @mouseout="rightPic=-1"/>
      <img :src="rightPic!==4?Frame3:Frame10" @mouseover="rightPic=4" @mouseout="rightPic=-1"/>
      <img :src="rightPic!==5?Frame4:Frame11" @mouseover="rightPic=5" @mouseout="rightPic=-1"/>
      <img :src="rightPic!==6?Frame5:Frame12" @mouseover="rightPic=6" @mouseout="rightPic=-1"/>
      <img :src="rightPic!==7?Frame6:Frame13" @mouseover="rightPic=7" @mouseout="rightPic=-1"/>
    </div>
    <div class="content_right_close" :class="[rightClose?'close':'']" @click="handleRightClose">
      <img src="@/assets/images/goright.png" v-if="!rightClose">
      <img src="@/assets/images/rightClose.png" v-else>
    </div>
    <!--下边-->
     <div class="content_bottom" :class="[bottomClose?'close':'']">
       <div class="bottom_checkbox">
         <div class="checkbox_one" @click="sentryShow=!sentryShow"><img :src="sentryShow?checkOK:checkCancel"/>哨兵</div>
         <div class="checkbox_one" @click="cameraShow=!cameraShow"><img :src="cameraShow?checkOK:checkCancel"/>摄像头</div>
         <div class="checkbox_one" @click="sensorShow=!sensorShow"><img :src="sensorShow?checkOK:checkCancel"/>传感器</div>
         <div class="checkbox_one" @click="gateShow=!gateShow"><img :src="gateShow?checkOK:checkCancel"/>道闸</div>
         <div class="checkbox_one" @click="essentialShow=!essentialShow"><img :src="essentialShow?checkOK:checkCancel"/>要素</div>
       </div>
       <div class="bottom_close" @click="bottomClose=!bottomClose">
         <img src="@/assets/images/godown.png">
       </div>
     </div>
    <div class="bottom_close_up" :class="[bottomClose?'close':'']" @click="bottomClose=!bottomClose">
      <img src="@/assets/images/goup.png">
    </div>
    <earthVideo class="myEarthVideo" :videoSrc="videoSrc" v-if="videoShow" @closeShow="videoCloseShow" :key="videoKey"/>
  </div>
</template>

<script>
import { TimeFormat } from '@/utils/utils'
import earthVideo from '@/components/earthVideo/earthVideo'
export default {
  name: 'campScreen',
  data () {
    return {
      videoKey: 0,
      sensorDetail: true,
      sensorWindow: false,
      gateDetail: true,
      gateWindow: false,
      cameraDetail: true,
      cameraWindow: false,
      sentryDetail: true,
      sentryWindow: false,
      essentialDetail: true,
      essentialWindow: false,
      centerDetail: true,
      centerWindow: false,
      sentryShow: true,
      cameraShow: true,
      sensorShow: true,
      gateShow: true,
      essentialShow: true,
      comprehensiveShow: false,
      comprehensiveDetailShow: false,
      comprehensiveStatus: 0,
      comprehensiveDetailStatus: -1,
      leftCarShow: false,
      checkOK: require('@/assets/images/u21.png'),
      checkCancel: require('@/assets/images/u40.png'),
      Frame14: require('@/assets/images/Frame-14.png'),
      Frame15: require('@/assets/images/Frame-15.png'),
      Frame: require('@/assets/images/Frame.png'),
      Frame1: require('@/assets/images/Frame-1.png'),
      Frame2: require('@/assets/images/Frame-2.png'),
      Frame3: require('@/assets/images/Frame-3.png'),
      Frame4: require('@/assets/images/Frame-4.png'),
      Frame5: require('@/assets/images/Frame-5.png'),
      Frame6: require('@/assets/images/Frame-6.png'),
      Frame7: require('@/assets/images/Frame-7.png'),
      Frame8: require('@/assets/images/Frame-8.png'),
      Frame9: require('@/assets/images/Frame-9.png'),
      Frame10: require('@/assets/images/Frame-10.png'),
      Frame11: require('@/assets/images/Frame-11.png'),
      Frame12: require('@/assets/images/Frame-12.png'),
      Frame13: require('@/assets/images/Frame-13.png'),
      camp: this.$store.state.camp,
      campShow: false, // 下拉
      nowDate: '',
      timer: null, // 时间
      intnum: null,
      activeIndex: 0, // 滚动
      videoShow: true,
      videoSrc: '/video/join.mp4',
      comprehensiveList: [
        { name: '人员出入', isRed: false, time: '10.46', work: '东门进入访客章司', type: 3 },
        { name: '普通报警', isRed: true, time: '10.59', work: '东门进入访客李维', type: 0 },
        { name: '物资出入', isRed: false, time: '11.40', work: '东门进入后勤物资', type: 5 },
        { name: '特急报警', isRed: true, time: '13.00', work: '李维从东门进', type: 2 },
        { name: '车辆出入', isRed: false, time: '13.30', work: '东门进入车辆车牌号为：鄂B305F6', type: 4 },
        { name: '紧急报警', isRed: true, time: '15.41', work: '东门进入访客章司', type: 1 },
        { name: '人员出入', isRed: false, time: '16.46', work: '东门进入访客章司', type: 3 },
        { name: '普通报警', isRed: true, time: '16.59', work: '东门进入访客李维', type: 0 },
        { name: '物资出入', isRed: false, time: '17.40', work: '东门进入后勤物资', type: 5 },
        { name: '特急报警', isRed: true, time: '18.00', work: '李维从东门进', type: 2 },
        { name: '车辆出入', isRed: false, time: '19.30', work: '东门进入车辆车牌号为：鄂B305F6', type: 4 },
        { name: '紧急报警', isRed: true, time: '20.41', work: '东门进入访客章司', type: 1 }
      ],
      comprehensiveLists: [],
      rightPic: -1,
      rightClose: false,
      bottomClose: false,
      leftClose: false,
      topClose: false,
      topCloseBottom: false
    }
  },
  components: {
    earthVideo
  },
  computed: {
    comprehensiveTop () {
      return -this.activeIndex * 50 + 'px'
    }
  },

  created () {
    this.getDate()
    this.comprehensiveLists = this.comprehensiveList
  },

  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  },
  activated () {
    this.camp = this.$store.state.camp
  },
  mounted () {
    this.ScrollUp()
  },
  methods: {
    getDate () {
      this.timer = setInterval(() => { // 创建定时器
        var date = new Date()
        this.nowDate = TimeFormat(date)
      }, 1000)
    },
    changeDetail (val) {
      if (val === 0) {
        this.sensorDetail = !this.sensorDetail
      } else if (val === 1) {
        this.gateDetail = !this.gateDetail
      } else if (val === 2) {
        this.cameraDetail = !this.cameraDetail
      } else if (val === 3) {
        this.sentryDetail = !this.sentryDetail
      } else if (val === 4) {
        this.essentialDetail = !this.essentialDetail
      } else if (val === 5) {
        this.centerDetail = !this.centerDetail
      }
    },
    ScrollUp () {
      this.intnum = setInterval(_ => {
        if (this.activeIndex < this.comprehensiveList.length) {
          this.activeIndex += 1
        } else {
          this.activeIndex = 0
        }
      }, 1000)
    },
    Stop () {
      clearInterval(this.intnum)
    },
    chooseCamp (val) {
      this.videoKey++
      this.videoSrc = `/video/${this.camp}${val}.mp4`
      this.videoShow = true
      this.camp = val
      this.$store.commit('updateCamp', val)
      this.campShow = false
      this.rightClose = true
      this.bottomClose = true
      this.leftClose = true
    },
    changeStatus (type, val) {
      if (type === 'status') {
        this.comprehensiveStatus = val
        this.comprehensiveDetailShow = val !== 0
        this.comprehensiveDetailStatus = -1
      } else {
        this.comprehensiveDetailStatus = val
      }
    },
    getStatus (val) {
      if (val !== 'all') {
        this.comprehensiveLists = this.comprehensiveList.filter(v => v.type === val)
      } else {
        this.comprehensiveLists = this.comprehensiveList
      }
      this.comprehensiveDetailShow = false
      this.comprehensiveShow = false
      this.Stop()
      this.activeIndex = 0
      this.ScrollUp()
    },
    paperScroll () {
      this.Stop()
      this.activeIndex = 0
    },
    /**
       * 关闭/打开右侧区域
       */
    handleRightClose () {
      this.rightClose = !this.rightClose
    },
    comprehensiveCloseShow () {
      this.comprehensiveShow = !this.comprehensiveShow
      this.comprehensiveDetailShow = false
    },
    videoCloseShow () {
      this.videoShow = false
      setTimeout(() => {
        this.rightClose = false
        this.bottomClose = false
        this.leftClose = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  background: url("../assets/images/bg.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .content_head {
    width: 100%;
    height: 120px;
    position: relative;
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
      left: 128px;
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
        cursor: pointer;
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
      cursor: pointer;
      img {
        margin-left: 10px;
      }
    }
  }
  .content_bg {
    width: 100%;
    height: 960px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    img {
      position: absolute;
      cursor: pointer;
    }
    img:nth-child(1){
      left: 26.25%;
      right: 71.25%;
      top: 61.57%;
      bottom: 33.33%;
    }
    img:nth-child(2){
      left: 31.04%;
      right: 66.46%;
      top: 33.33%;
      bottom: 61.57%;

    }
    img:nth-child(3){
      left: 33.49%;
      right: 64.01%;
      top: 68.61%;
      bottom: 26.3%;
    }
    img:nth-child(4){
      left: 34.06%;
      right: 63.44%;
      top: 52.96%;
      bottom: 41.94%;
    }
    img:nth-child(5){
      left: 46.51%;
      right: 50.99%;
      top: 57.5%;
      bottom: 37.41%;
    }
    img:nth-child(6){
      left: 47.97%;
      right: 49.53%;
      top: 46.94%;
      bottom: 47.96%;
    }
    img:nth-child(7){
      left: 51.09%;
      right: 46.41%;
      top: 56.3%;
      bottom: 38.61%;
    }
    img:nth-child(8){
      left: 66.41%;
      right: 31.09%;
      top: 59.91%;
      bottom: 35%;
    }
    img:nth-child(9){
      left: 67.23%;
      right: 30.27%;
      top: 28.19%;
      bottom: 66.71%;

    }
    img:nth-child(10){
      left: 67.66%;
      right: 29.84%;
      top: 36.2%;
      bottom: 58.7%;
    }
    img:nth-child(11){
      left: 70.42%;
      right: 27.08%;
      top: 50.74%;
      bottom: 44.17%;
    }
    img:nth-child(12){
      left: 29.25%;
      right: 65.25%;
      top: 26.57%;
      bottom: 33.33%;
    }
    img:nth-child(13){
      left: 34.04%;
      right: 66.46%;
      top: 35.33%;
      bottom: 61.57%;
    }
    img:nth-child(14){
      left: 36.49%;
      right: 64.01%;
      top: 19.61%;
      bottom: 26.3%;
    }
    img:nth-child(15){
      left: 36.06%;
      right: 63.44%;
      top: 52.96%;
      bottom: 41.94%;
      z-index:10
    }
    img:nth-child(16){
      left: 49%;
      right: 50.99%;
      top: 60.5%;
      bottom: 37.41%;
      z-index:10
    }
    img:nth-child(17){
      left: 50.97%;
      right: 49.53%;
      top: 13.94%;
      bottom: 47.96%;
    }
    .seeDetail:nth-child(1) {
      width:30px ;
      height: 30px;
      background: #333333;
    }
  }
  .content_left {
    position: absolute;
    left: 20px;
    top: 122px;

    box-sizing: border-box;
    transition: all 0.5s;
    &.close{
      left: -400px;
    }
    .left_comprehensive {
      position: relative;
      .left_comprehensive_top {
        width: 400px;
        height: 54px;
        background: linear-gradient(90deg, #051A88 0%, #020863 99.84%);
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Microsoft YaHei UI;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 30px;
        cursor: pointer;
        img {
          margin-left: 10px;
        }
        span {
          background: linear-gradient(90deg, #0075FF 0%, #00EAFF 49.56%, #01ACFF 99.99%);
          -webkit-background-clip: text;
          color: transparent;
        }
      }
      .left_comprehensive_checkbox {
        width: 181px;
        height: 173px;
        background: #030038;
        border: 1px solid #0060FF;
        box-sizing: border-box;
        position: absolute;
        top: 54px;
        left: 103px;
        z-index:10;
        div {
          height: 57px;
          font-family: Microsoft YaHei UI;
          font-style: normal;
          font-weight: normal;
          font-size: 24px;
          color: #424069;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid #001960;
        }
        .all {
          position: relative;
          color: #FFFFFF;
        }
        .all::before {
          content: '';
          width: 2px;
          height: 15.9px;
          display: block;
          background-color: #34E3FE;
          position: absolute;
          left: 24px;
        }
        .select {
          position: relative;
          color: #FFFFFF;
        }
        .select::before {
          content: '';
          width: 2px;
          height: 15.9px;
          display: block;
          background-color: #34E3FE;
          position: absolute;
          left: 24px;
        }
        .select::after {
          content: '';
          width: 11px;
          height: 21px;
          display: block;
          background: url("../assets/images/Vector.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          right: 22px;
        }
      }
      .left_comprehensive_checkbox2{
        width: 181px;
        height: 173px;
        background: #030038;
        border: 1px solid #0060FF;
        box-sizing: border-box;
        .checkbox_content {
          div {
            height: 57px;
            font-family: Microsoft YaHei UI;
            font-style: normal;
            font-weight: normal;
            font-size: 24px;
            color: #424069;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #001960;
          }
          .select {
            color: #FFFFFF;
          }
        }

      }
      .absolute2{
        position: absolute;
        top: 112px;
        left: 284px;
        cursor: pointer;
      }
      .absolute3{
        position: absolute;
        top: 168px;
        left: 284px;
        cursor: pointer;
      }
      .left_comprehensive_body {
        width: 400px;
        height: 352px;
        background: rgba(64,53,86,0.7);
        padding: 10px;
        border: 1px solid #012578;
        transition: all 0.5s;
        &.close{
          height: 38px;
        }

        .left_comprehensive_content {
          width:100% ;
          height: 100%;
          box-sizing: border-box;
          background: url("../assets/images/topBg.png") no-repeat;
          background-size: 100% 100%;
          padding: 0 20px;
          overflow: hidden;
          overflow-y:scroll;
          /*animation: scaleout 0.5s;*/
          transition: all 0.5s ;
          &.close{
            height: 0;
          }
          .detail{
            width: 100%;
            font-family: Microsoft YaHei UI;
            position: relative;
            transition: top 0.5s;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 23px;
            color: #FFFFFF;
            padding: 13px 0px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: #071A60 1px solid;
            div:first-child {
              width: 33%;
            }
            div:nth-child(2) {
              width: 15%;
            }
            div:last-child {
              width: 48%;
            }
          }
        }
        .left_comprehensive_content::-webkit-scrollbar {display:none}
      }

      .left_comprehensive_body_two {
        width: 400px;
        height: 468px;
        background: rgba(64,53,86,0.7);
        border: 1px solid #00137F;
        padding: 20px;
        position: relative;
        overflow: hidden;
        overflow-y: scroll;
        transition: all 0.5s;
        &.close{
          height: 782px;
        }
        &.closeBottom{
          height: 0;
        }
        .left_body {
          display: none;
        }
        .left_status {
          width: 100%;
          padding-left:5px;
          border-left: 3px solid #34E3FE;
          font-family: Microsoft YaHei UI;
          font-style: normal;
          font-weight: normal;
          font-size: 24px;
          line-height: 30px;
          color: #FFFFFF;
          margin-bottom: 12px;
        }
        .left_border {
          background: url("../assets/images/border-1.png") no-repeat;
          background-size: 100% 100%;
          width: 100%;
          height: 8px;
          margin: 12px 0;
        }
        .personal {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          font-family: Microsoft YaHei UI;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 23px;
          /* identical to box height */
          background: url("../assets/images/bg-1.png") no-repeat;
          background-size: 100% 100%;
          color: #FFFFFF;
          align-items: center;
          div {
            height: 50px;
            display: flex;
            align-items: center;
            img {
              margin-right: 5px;
            }

          }
        }
        .personMessage {
          background: url("../assets/images/bg-2.png") no-repeat;
          background-size: 100% 100%;
          height: 157px;
          width: 361px;
          padding:0 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .personDetail {
            display: flex;
            font-family: Microsoft YaHei UI;
            align-items: center;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 23px;
            /* identical to box height */
            color: #FFFFFF;
            div:first-child {
              margin-right: 10px;
            }
            .lineColor {
              width: 190px;
              height: 15px;
              margin-right: 10px;
              .pink {
                background-color:  #9B6BFF;
                height: 100%;
              }
              .blue {
                background-color: #55ACFF;
                height: 100%;
              }
            }
          }
        }
        .personMessage_q {
          background: url("../assets/images/bg-3.png") no-repeat;
          background-size: 100% 100%;
          height: 123px;
        }
      }
      .topClose {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -5px;
        cursor: pointer;
      }

    }
    .left_comprehensive_body_two::-webkit-scrollbar{
      display: none;
    }

  }
  .content_left_img {
    position: absolute;
    width: 1078px;
    height: 628px;
    left: 421px;
    top: 219px;
    z-index: 5;
    .content_close {
      position: absolute;
      top: 22px;
      right: 14px;
      z-index: 7;
      width: 30px;
      height: 30px;
    }
  }
  .content_left_close {
    position: absolute;
    width: 38px;
    height: 80px;
    left: 420px;
    top: 533px;
    transition: all 0.5s;
    cursor: pointer;
    &.close{
      left: 0px;
    }
  }
  .content_right {
    position: absolute;
    width: 145px;
    height: 928px;
    left: 1752px;
    top: 122px;
    background: rgba(2,0,40,0.7);
    border: 1px solid #00137F;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    transition: all 0.5s;
    img {
      cursor: pointer;
    }
    &.close{
      left: 1920px;
    }
  }
  .content_right_close {
    position: absolute;
    width: 38px;
    height: 80px;
    left: 1714px;
    top: 543px;
    transition: all 0.5s;
    cursor: pointer;
    &.close{
      left: 1880px;
    }
  }
  .content_bottom {
    position: absolute;
    width: 751px;
    height: 80px;
    left: 713px;
    top: 970px;
    display: flex;
    border: 1px solid #00137F;
    background: rgba(2,0,40,0.7);
    transition: all 0.5s;
    border-radius: 0 10px 10px 0;

    &.close{
      top: 1080px;
    }
    .bottom_checkbox {
      width: 780px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 34px;
      /* identical to box height */
      color: #FFFFFF;
      .checkbox_one {
        display: flex;
        align-items: center;
        cursor: pointer;
       img {
         margin-right: 10px;
       }
      }
    }
    .bottom_close {
      width: 38px;
      cursor: pointer;

    }
  }
  .bottom_close_up {
    position: absolute;
    top:1080px;
    left: 72%;
    transition: all 0.5s;
    cursor: pointer;
    &.close{
      top: 1040px;
      transition-delay: 0.5s;
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
