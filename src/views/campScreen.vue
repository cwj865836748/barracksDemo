<template>
  <div class="content" >
    <!--头部-->
     <div class="content_head">
       <img src="@/assets/images/head.png"/>
       <div class="head_text">XX营区安全管理平台</div>
       <div class="head_camp">
         <el-select v-model="campName" filterable placeholder="请选择" @change="chooseCamp" :popper-append-to-body="false">
           <el-option
             v-for="item in campList"
             :key="item.name"
             :label="`${item.name}营区`"
             :value="item.name"
           >
           </el-option>
         </el-select>
<!--         <img src="@/assets/images/select.png"/>-->
       </div>
       <div class="head_date">{{nowDate}}</div>
<!--       <div class="head_choose" v-show="campShow" @mouseleave="campShow=false">-->
<!--         <div v-for="(item,index) in campList" :key='index' :class="['camp_icon',camp===item.name?'icon':'']"  @click="chooseCamp(item.name,item.zoom, [item.lng, item.lat])">{{`${item.name}营区`}}</div>-->
<!--       </div>-->
     </div>
    <!--背景-->
    <div class="content_bg" >
      <mapa :list="mapList" :lng="lng" :lat="lat" :zoom="zoom" ref="map"/>
    </div>

    <!--左边-->
     <div class="content_left" :class="[leftClose?'close':'']">
       <div class="left_comprehensive">
         <div class="left_comprehensive_top" >

           <span @click="comprehensiveCloseShow">综合动态</span>
           <img src="@/assets/images/select.png"/>
             <div class="light" v-show="lightShow">
               <img src="@/assets/images/openEq.png" v-if="imgShow" @click.stop="imgShow=!imgShow">
               <img src="@/assets/images/closeEq.png" v-if="!imgShow" @click.stop="imgShow=!imgShow">

               <img src="@/assets/images/openEq.png" v-if="imgShow1" @click.stop="imgShow1=!imgShow1">
               <img src="@/assets/images/closeEq.png" v-if="!imgShow1" @click.stop="imgShow1=!imgShow1">

               <img src="@/assets/images/openEq.png" v-if="imgShow2" @click.stop="imgShow2=!imgShow2">
               <img src="@/assets/images/closeEq.png" v-if="!imgShow2" @click.stop="imgShow2=!imgShow2">

               <img src="@/assets/images/closeEq.png" v-if="imgShow3" @click.stop="imgShow3=!imgShow3">
               <img src="@/assets/images/openEq.png" v-if="!imgShow3" @click.stop="imgShow3=!imgShow3">

               <img src="@/assets/images/closeEq.png" v-if="imgShow4" @click.stop="imgShow4=!imgShow4">
               <img src="@/assets/images/openEq.png" v-if="!imgShow4" @click.stop="imgShow4=!imgShow4">

               <img src="@/assets/images/closeEq.png" v-if="imgShow5" @click.stop="imgShow5=!imgShow5">
               <img src="@/assets/images/openEq.png" v-if="!imgShow5" @click.stop="imgShow5=!imgShow5">
               <div class="close" @click.stop="lightShow=false"></div>
             </div>
           <div class="lightOpen" @click.stop="lightShow=!lightShow"></div>
         </div>
         <div class="left_comprehensive_body" :class="[topClose?'close':'']">
           <div class="left_comprehensive_content" :class="[topClose?'close':'']"  @mouseenter="Stop()" @mouseleave="ScrollUp()" @scroll="paperScroll()">
               <div class="detail" v-for="(item,index) in comprehensiveLists" :style="{ top:comprehensiveTop }" :key="index" @click="openCar(item.pic)">
                 <div>【<span :style="{color:item.color}">{{item.name}}</span>】</div>
                 <div>{{item.time}}</div>
                 <div>{{item.work}}</div>
               </div>
           </div>
         </div>
         <div class="left_comprehensive_checkbox" v-show="comprehensiveShow">
           <div :class="[comprehensiveStatus===0?'all':'']" style="cursor:pointer;" @mouseover="changeStatus('status',0)"  @click="getStatus('all')">全部动态</div>
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
             <div class="personDetail" v-for="(item,index) in personList" :key="index" @click="showLeftWindow(index,1)">
               <div>{{item.name}}</div>
               <div class="lineColor">
               <div :class="item.color" :style="{width: item.width}"></div>
               </div>
               <div>{{item.personNumber}}人</div>
             </div>
           </div>
           <div class="left_border"/>
           <div class="left_status">车辆信息</div>
           <div class="personMessage">
             <div class="personDetail" v-for="(item,index) in carList" :key="index" @click="showLeftWindow(index,2)">
               <div class="personWidth">{{item.name}}</div>
               <div class="lineColor">
                 <div :class="item.color" :style="{width: item.width}"></div>
               </div>
               <div>{{item.personNumber}}辆</div>
             </div>
           </div>
           <div class="left_border"/>
           <div class="left_status">枪支信息</div>
           <div class="personMessage personMessage_q">
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
           <div class="leftdownWindow" v-if="leftBottomWindow">
              <div class="heads">
                <span>{{leftBottomType===1?personList[leftBottomIndex].name:carList[leftBottomIndex].name}}列表</span>
                <div class="closeIcon" @click="leftBottomWindow=false"/>
              </div>
              <div class="table">
                 <div class="tablecontent">
                   <span class="span1">{{leftBottomType===1?personList[leftBottomIndex].list[0]:carList[leftBottomIndex].list[0]}}</span>
                   <span class="span2">{{leftBottomType===1?personList[leftBottomIndex].list[1]:carList[leftBottomIndex].list[1]}}</span>
                   <span class="span3">{{leftBottomType===1?personList[leftBottomIndex].list[2]:carList[leftBottomIndex].list[2]}}</span>
                   <span class="span4">{{leftBottomType===1?personList[leftBottomIndex].list[3]:carList[leftBottomIndex].list[3]}}</span>
                 </div>
                <div class="tablecontent" v-for="(item,index) in number" :key="index">
                  <span class="span1" v-if="leftBottomType===1">张月</span>
                  <span class="span1" v-else>粤B234L6</span>
                  <span class="span2">2020-06-22 10:20:23</span>
                  <span class="span3">东门</span>
                  <span class="span4 click" @click="leftBottomClick(1)">查看</span>
                </div>
              </div>
           </div>
           <div class="leftdownWindow" v-if="leftBottomDetailWindow">
             <div class="heads" v-if="leftBottomType===1">
               <span>张月的轨迹</span>
               <img class="formIcon" src="@/assets/images/form.png" v-if="iconShow"/>
               <img class="formIcon" src="@/assets/images/formUn.png" v-if="!iconShow" @click="iconShow=true"/>
               <img class="formMapIcon" src="@/assets/images/formMap.png" v-if="iconShow" @click="iconShow=false"/>
               <img class="formMapIcon" src="@/assets/images/formMapShow.png" v-if="!iconShow"/>
               <div class="closeIcon" @click="leftBottomClick(2)"/>
             </div>
             <div class="heads" v-else>
               <span>粤B234L6的轨迹</span>
               <img class="formIcon2" src="@/assets/images/form.png" v-if="iconShow"/>
               <img class="formIcon2" src="@/assets/images/formUn.png" v-if="!iconShow" @click="iconShow=true"/>
               <img class="formMapIcon2" src="@/assets/images/formMap.png" v-if="iconShow" @click="iconShow=false"/>
               <img class="formMapIcon2" src="@/assets/images/formMapShow.png" v-if="!iconShow"/>
               <div class="closeIcon" @click="leftBottomClick(2)"/>
             </div>
             <div class="table" v-if="iconShow">
               <div class="tablecontent">
                 <span class="span5 one">轨迹时间</span>
                 <span class="span6">轨迹位置</span>
               </div>
               <div class="tablecontent" v-for="(item,index) in number" :key="index">
                 <span class="span5 one">2020-06-22 10:20:23</span>
                 <span class="span6">东门</span>
               </div>
             </div>
             <div :class="[leftBottomType===1?'tableGui':'tableGui2']" v-else>

             </div>
           </div>
         </div>
         <div class="topClose" @click="topCloseBottom=!topCloseBottom">
           <img src="@/assets/images/goup.png" v-if="!topCloseBottom">
           <img src="@/assets/images/gobottom.png" v-else>
         </div>
       </div>
     </div>
     <div class="content_left_img" v-show="comprehensiveWindowShow">
       <div class="content_close" @click="policeRing"></div>
       <div class="content_close2" @click="comprehensiveWindowShow=false"></div>
       <img src="@/assets/images/showCar.png" v-if="carType===7" />
       <img src="@/assets/images/showCar1.png" v-if="carType===10"/>
       <img src="@/assets/images/showCar2.png" v-if="carType===2" />
       <img src="@/assets/images/showCar3.png" v-if="carType===11" />
       <img src="@/assets/images/showCar4.png" v-if="carType===5"/>
       <img src="@/assets/images/showCar5.png" v-if="carType===0" />
       <img src="@/assets/images/showCar6.png" v-if="carType===3" />
       <img src="@/assets/images/showCar7.png" v-if="carType===8"/>
       <img src="@/assets/images/showCar8.png" v-if="carType===9" />
       <img src="@/assets/images/showCar9.png" v-if="carType===1" />
       <img src="@/assets/images/showCar10.png" v-if="carType===4"/>
       <img src="@/assets/images/showCar11.png" v-if="carType===6" />
     </div>
     <div class="content_left_close" :class="[leftClose?'close':'']"  @click="leftClose=!leftClose">
      <img src="@/assets/images/goleft.png" v-if="!leftClose">
      <img src="@/assets/images/leftClose.png" v-else>
    </div>
    <!--右边-->
    <div class="content_right" :class="[rightClose?'close':'']">
      <img :src="rightPic!==0?Frame14:Frame15" @mouseover="rightPic=0" @mouseout="rightPic=-1"
           @click="$router.push('/situationMap')"/>
      <img :src="rightPic!==1?Frame:Frame7" @mouseover="rightPic=1" @mouseout="rightPic=-1" @click="$router.push('/sysManage')"/>
      <img :src="rightPic!==2?Frame1:Frame8" @mouseover="rightPic=2" @mouseout="rightPic=-1" @click="$router.push('/personManage')"/>
      <img :src="rightPic!==3?Frame2:Frame9" @mouseover="rightPic=3" @mouseout="rightPic=-1" @click="$router.push('/carManage')"/>
      <img :src="rightPic!==4?Frame3:Frame10" @mouseover="rightPic=4" @mouseout="rightPic=-1"/>
      <img :src="rightPic!==5?Frame4:Frame11" @mouseover="rightPic=5" @mouseout="rightPic=-1"/>
      <img :src="rightPic!==6?Frame5:Frame12" @mouseover="rightPic=6" @mouseout="rightPic=-1"/>
      <img :src="rightPic!==7?Frame6:Frame13" @mouseover="rightPic=7" @mouseout="rightPic=-1"/>
    </div>
    <div class="content_right_close" :class="[rightClose?'close':'']" @click="rightClose = !rightClose">
      <img src="@/assets/images/goright.png" v-if="!rightClose">
      <img src="@/assets/images/rightClose.png" v-else>
    </div>
    <!--下边-->
     <div class="content_bottom" :class="[bottomClose?'close':'']">
       <div class="bottom_checkbox">
         <div class="checkbox_one" @click="checkTrueOrFalse(0)"><img :src="checkAllShow?checkOK:checkCancel"/>全选</div>
         <div class="checkbox_one" @click="checkTrueOrFalse(1)"><img :src="sentryShow?checkOK:checkCancel"/>哨兵</div>
         <div class="checkbox_one" @click="checkTrueOrFalse(2)"><img :src="cameraShow?checkOK:checkCancel"/>摄像机</div>
         <div class="checkbox_one" @click="checkTrueOrFalse(3)"><img :src="sensorShow?checkOK:checkCancel"/>传感器</div>
         <div class="checkbox_one" @click="checkTrueOrFalse(4)"><img :src="gateShow?checkOK:checkCancel"/>道闸</div>
         <div class="checkbox_one" @click="checkTrueOrFalse(5)"><img :src="essentialShow?checkOK:checkCancel"/>要素</div>
       </div>
       <div class="bottom_close" @click="bottomClose=!bottomClose">
         <img src="@/assets/images/godown.png">
     </div>
     </div>
    <div class="bottom_close_up" :class="[bottomClose?'close':'']" @click="bottomClose=!bottomClose">
      <img src="@/assets/images/goup.png">
    </div>
    <earthVideo class="myEarthVideo" :videoSrc="videoSrc" v-if="videoShow" @closeShow="videoCloseShow"/>

    <audio v-if="!ringType.length" class="audio" src="/music/bj.mp3" controls autoplay="autoplay"
           hidden="true"></audio>
  </div>
</template>

<script>
import { TimeFormat } from '@/utils/utils'
import earthVideo from '@/components/earthVideo/earthVideo'
import mapa from '@/components/map/mapa'
export default {
  name: 'campScreen',
  data () {
    return {
      /** 哨兵**/
      sentryShow: true,
      sentryDetail: true,
      /** 摄像头**/
      cameraShow: true,
      cameraDetail: true,
      /** 传感器**/
      sensorShow: true,
      sensorDetail: true,
      /** 道闸**/
      gateShow: true,
      gateDetail: true,
      /** 要素**/
      essentialShow: true,
      essentialDetail: true,
      centerDetail: true,
      checkAllShow: true,
      /** 综合动态弹框**/
      comprehensiveShow: false,
      comprehensiveDetailShow: false,
      comprehensiveStatus: 0,
      comprehensiveDetailStatus: -1,
      /** 地图参数**/
      lng: 115.750556,
      lat: 39.603056,
      zoom: 16,
      /** 下边checkbox图标**/
      checkOK: require('@/assets/images/u21.png'),
      checkCancel: require('@/assets/images/u40.png'),
      /** 右边图标**/
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
      /** 结束**/
      camp: this.$store.state.camp,
      campList: [
        { name: 'A', zoom: 16, lng: 115.770594, lat: 39.604709 },
        { name: 'B', zoom: 17, lng: 115.773423, lat: 39.603872 },
        { name: 'C', zoom: 17, lng: 115.774588, lat: 39.606939 }
      ],
      nowDate: '', // 现在事件
      timer: null, // 时间定时器
      intnum: null, // 滚动列表
      activeIndex: 0, // 滚动
      videoShow: false, // 视频展现
      videoSrc: '/video/join.mp4', // 视频源
      comprehensiveWindowShow: false,
      carType: null,
      comprehensiveList: [
        { name: '人员出入', color: '#fff', time: '14:23', work: '东门进入内部人员王悦', type: 3, pic: 0 },
        { name: '车辆出入', color: '#fff', time: '14:25', work: '北门进入访客车辆冀AQA644', type: 4, pic: 1 },
        { name: '普通报警', color: '#A06A1E', time: '14:32', work: '配电室设备03出现故障', type: 0, pic: 2 },
        { name: '人员出入', color: '#fff', time: '14:34', work: '北门进入军人刘亚东', type: 3, pic: 3 },
        { name: '车辆出入', color: '#fff', time: '14:54', work: '西门进入内部车辆京NP4323', type: 4, pic: 4 },
        { name: '普通报警', color: '#A06A1E', time: '14:55', work: '公区0322号摄像头被遮挡', type: 0, pic: 5 },
        { name: '紧急报警', color: '#C0450A', time: '15:10', work: '仓库A物资摆放有误', type: 1, pic: 6 },
        { name: '紧急报警', color: '#C0450A', time: '15:13', work: '东门口有陌生人徘徊', type: 1, pic: 7 },
        { name: '物资出入', color: '#fff', time: '15:42', work: '北门进入一批物资，编号0332721', type: 5, pic: 8 },
        { name: '物资出入', color: '#fff', time: '15:43', work: '北门进入一批物资，编号7183300', type: 5, pic: 9 },
        { name: '特急报警', color: 'red', time: '15:52', work: '东侧周界遭到入侵', type: 2, pic: 10 },
        { name: '特急报警', color: 'red', time: '16:44', work: '枪弹仓库物资摆放不合格', type: 2, pic: 11 }
      ],
      comprehensiveLists: [],
      personList: [
        { name: '军人外出', color: 'pink', personNumber: 10, width: '50%', list: ['外出军人', '外出时间', '外出位置', '人员轨迹'] },
        { name: '军人归队', color: 'blue', personNumber: 6, width: '38%', list: ['归队军人', '归队时间', '归队位置', '人员轨迹'] },
        { name: '访客进入', color: 'pink', personNumber: 18, width: '75%', list: ['进入访客', '进入时间', '进入位置', '人员轨迹'] },
        { name: '访客离开', color: 'blue', personNumber: 15, width: '70%', list: ['离开访客', '离开时间', '离开位置', '人员轨迹'] },
        { name: '人员进入', color: 'pink', personNumber: 24, width: '85%', list: ['进入人员', '进入时间', '进入位置', '人员轨迹'] },
        { name: '人员离开', color: 'blue', personNumber: 38, width: '98%', list: ['离开人员', '离开时间', '离开位置', '人员轨迹'] }
      ],
      carList: [
        { name: '军车外出', color: 'pink', personNumber: 22, width: '85%', list: ['外出军车', '外出时间', '外出位置', '车辆轨迹'] },
        { name: '军车归队', color: 'blue', personNumber: 20, width: '80%', list: ['归队军车', '归队时间', '归队位置', '车辆轨迹'] },
        { name: '访客车进入', color: 'pink', personNumber: 10, width: '40%', list: ['进入访客车', '进入时间', '进入位置', '车辆轨迹'] },
        { name: '访客车离开', color: 'blue', personNumber: 6, width: '20%', list: ['离开访客车', '离开时间', '离开位置', '车辆轨迹'] },
        { name: '车辆进入', color: 'pink', personNumber: 30, width: '100%', list: ['进入车辆', '进入时间', '进入位置', '车辆轨迹'] },
        { name: '车辆离开', color: 'blue', personNumber: 28, width: '95%', list: ['离开车辆', '离开时间', '离开位置', '车辆轨迹'] }
      ],
      leftBottomWindow: false,
      leftBottomIndex: -1,
      leftBottomType: -1,
      leftBottomDetailWindow: false,
      iconShow: true,
      number: [1, 2, 3, 4, 5, 6, 7],
      rightPic: -1, // 右边图片切换
      rightClose: false, // 右边关闭
      bottomClose: false, // 下边关闭
      leftClose: false, // 左边关闭
      topClose: false, // 左边栏上面关闭
      topCloseBottom: false, // 左边栏下面关闭
      mapList: [
        {
          type: 0, // 0军营 1哨兵 2摄像头 3传感器
          lng: 115.770594, // 经度
          lat: 39.604709, // 纬度
          imgUrl: require('../assets/i/yq.png'),
          isShow: true,
          tkImg: require('../assets/img/yqtk.png')
        },
        {
          type: 1,
          lng: 115.773847, // 经度
          lat: 39.606708, // 纬度
          imgUrl: require('../assets/i/sb.png'),
          isShow: true,
          tkImg: require('../assets/img/sbtk.png'),
          tkImgDetail: require('../assets/img/sbtkxq.png')
        },
        {
          type: 2,
          lng: 115.772136, // 经度
          lat: 39.604674, // 纬度
          imgUrl: require('../assets/i/sxt.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 3,
          lng: 115.773429, // 经度
          lat: 39.602905, // 纬度
          imgUrl: require('../assets/i/cgq.png'),
          isShow: true,
          tkImg: require('../assets/img/cgqtk.png'),
          tkImgDetail: require('../assets/img/cgqtkxq.png')
        },
        {
          type: 4,
          lng: 115.771541, // 经度
          lat: 39.603947, // 纬度
          imgUrl: require('../assets/i/dz.png'),
          isShow: true,
          tkImg: require('../assets/img/dztk.png'),
          tkImgDetail: require('../assets/img/dztkxq.png')
        },
        {
          type: 5,
          lng: 115.770516, // 经度
          lat: 39.605005, // 纬度
          imgUrl: require('../assets/i/ys.png'),
          isShow: true,
          tkImg: require('../assets/img/ystk.png'),
          tkImgDetail: require('../assets/img/ystkxq.png')
        },

        {
          type: 0, // 0军营 1哨兵 2摄像头 3传感器
          lng: 115.773423, // 经度
          lat: 39.603872, // 纬度
          imgUrl: require('../assets/i/yq.png'),
          isShow: true,
          tkImg: require('../assets/img/yqtk.png')
        },
        {
          type: 1,
          lng: 115.771498, // 经度
          lat: 39.604749, // 纬度
          imgUrl: require('../assets/i/sb.png'),
          isShow: true,
          tkImg: require('../assets/img/sbtk.png'),
          tkImgDetail: require('../assets/img/sbtkxq.png')
        },
        {
          type: 2,
          lng: 115.774051, // 经度
          lat: 39.607088, // 纬度
          imgUrl: require('../assets/i/sxt.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 3,
          lng: 115.775939, // 经度
          lat: 39.60393, // 纬度
          imgUrl: require('../assets/i/cgq.png'),
          isShow: true,
          tkImg: require('../assets/img/cgqtk.png'),
          tkImgDetail: require('../assets/img/cgqtkxq.png')
        },
        {
          type: 4,
          lng: 115.771895, // 经度
          lat: 39.604823, // 纬度
          imgUrl: require('../assets/i/dz.png'),
          isShow: true,
          tkImg: require('../assets/img/dztk.png'),
          tkImgDetail: require('../assets/img/dztkxq.png')
        },
        {
          type: 5,
          lng: 115.775258, // 经度
          lat: 39.607274, // 纬度
          imgUrl: require('../assets/i/ys.png'),
          isShow: true,
          tkImg: require('../assets/img/ystk.png'),
          tkImgDetail: require('../assets/img/ystkxq.png')
        },

        {
          type: 0, // 0军营 1哨兵 2摄像头 3传感器
          lng: 115.774588, // 经度
          lat: 39.606939, // 纬度
          imgUrl: require('../assets/i/yq.png'),
          isShow: true,
          tkImg: require('../assets/img/yqtk.png')
        },
        {
          type: 1,
          lng: 115.775725, // 经度
          lat: 39.604294, // 纬度
          imgUrl: require('../assets/i/sb.png'),
          isShow: true,
          tkImg: require('../assets/img/sbtk.png'),
          tkImgDetail: require('../assets/img/sbtkxq.png')
        },
        {
          type: 2,
          lng: 115.775011, // 经度
          lat: 39.604567, // 纬度
          imgUrl: require('../assets/i/sxt.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 3,
          lng: 115.769947, // 经度
          lat: 39.602409, // 纬度
          imgUrl: require('../assets/i/cgq.png'),
          isShow: true,
          tkImg: require('../assets/img/cgqtk.png'),
          tkImgDetail: require('../assets/img/cgqtkxq.png')
        },
        {
          type: 4,
          lng: 115.77278, // 经度
          lat: 39.60393, // 纬度
          imgUrl: require('../assets/i/dz.png'),
          isShow: true,
          tkImg: require('../assets/img/dztk.png'),
          tkImgDetail: require('../assets/img/dztkxq.png')
        },
        {
          type: 5,
          lng: 115.775199, // 经度
          lat: 39.604579, // 纬度
          imgUrl: require('../assets/i/ys.png'),
          isShow: true,
          tkImg: require('../assets/img/ystk.png'),
          tkImgDetail: require('../assets/img/ystkxq.png')
        },
        {
          type: 2,
          lng: 115.773856, // 经度
          lat: 39.606661, // 纬度
          imgUrl: require('../assets/images/sxt1.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 2,
          lng: 115.772794, // 经度
          lat: 39.606827, // 纬度
          imgUrl: require('../assets/images/sxt2.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 2,
          lng: 115.770659, // 经度
          lat: 39.604562, // 纬度
          imgUrl: require('../assets/images/sxt3.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 2,
          lng: 115.772579, // 经度
          lat: 39.604595, // 纬度
          imgUrl: require('../assets/images/sxt4.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 2,
          lng: 115.774682, // 经度
          lat: 39.607008, // 纬度
          imgUrl: require('../assets/images/sxt5.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 2,
          lng: 115.775261, // 经度
          lat: 39.605487, // 纬度
          imgUrl: require('../assets/images/sxt6.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 2,
          lng: 115.772193, // 经度
          lat: 39.604636, // 纬度
          imgUrl: require('../assets/images/sxt7.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 2,
          lng: 115.775315, // 经度
          lat: 39.605099, // 纬度
          imgUrl: require('../assets/images/sxt8.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 2,
          lng: 115.773201, // 经度
          lat: 39.604132, // 纬度
          imgUrl: require('../assets/images/sxt9.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 2,
          lng: 115.775294, // 经度
          lat: 39.605231, // 纬度
          imgUrl: require('../assets/images/sxt10.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 2,
          lng: 115.775669, // 经度
          lat: 39.604454, // 纬度
          imgUrl: require('../assets/images/sxt11.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 2,
          lng: 115.774725, // 经度
          lat: 39.603586, // 纬度
          imgUrl: require('../assets/images/sxt12.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        },
        {
          type: 2,
          lng: 115.774049, // 经度
          lat: 39.605901, // 纬度
          imgUrl: require('../assets/images/sxt13.png'),
          isShow: true,
          tkImg: require('../assets/img/sxttk.png'),
          tkImgDetail: require('../assets/img/sxttkxq.png')
        }
      ],
      ringTime: 0,
      ringClean: null,
      ringType: [2, 7, 10],
      autoClose: null,
      autoTime: 0,
      isHistory: true,
      autoNum: -1,
      lightShow: false,
      imgShow:true,
      imgShow1:true,
      imgShow2:true,
      imgShow3:true,
      imgShow4:true,
      imgShow5:true,
    }
  },
  components: {
    earthVideo,
    mapa
  },
  computed: {
    comprehensiveTop () {
      return -this.activeIndex * 50 + 'px'
    },
    campName: {
      get () {
        return `${this.camp}营区`
      },
      set (val) {
        this.camp = val
      }

    }
  },
  created () {
    this.getDate()
    this.comprehensiveLists = this.comprehensiveList
  },

  beforeDestroy () {
    clearInterval(this.timer)
    clearInterval(this.intnum)
    this.ringStop()
    this.timer = null
    this.intnum = null
  },
  activated () {
    this.camp = this.$store.state.camp
    this.chooseCamp(this.camp)
  },
  mounted () {
    this.ScrollUp()
    this.ringInterval()
  },
  methods: {
    showLeftWindow (index, type) {
      this.leftBottomIndex = index
      this.leftBottomType = type
      this.leftBottomDetailWindow = false
      this.leftBottomWindow = true
      this.iconShow = true
    },
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
        if (this.activeIndex < this.comprehensiveLists.length) {
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
      // this.videoSrc = `/video/${this.camp}${val}.mp4`
      // this.videoShow = true
      let campOne = null
      this.campList.forEach(item => {
        if (item.name === val) {
          campOne = item
        }
      })
      this.zoom = campOne.zoom
      this.lng = campOne.lng
      this.lat = campOne.lat
      // this.camp = val
      this.$store.commit('updateCamp', val)
      this.$refs.map.map.setZoomAndCenter(this.zoom, [this.lng, this.lat])
      // this.rightClose = true
      // this.bottomClose = true
      // this.leftClose = true
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
    comprehensiveCloseShow () {
      this.comprehensiveShow = !this.comprehensiveShow
      this.comprehensiveDetailShow = false
    },
    videoCloseShow () {
      this.videoShow = false
    },
    checkTrueOrFalse (type) {
      if (type === 0) {
        this.checkAllShow = !this.checkAllShow
        this.sensorShow = this.checkAllShow
        this.sentryShow = this.checkAllShow
        this.gateShow = this.checkAllShow
        this.essentialShow = this.checkAllShow
        this.cameraShow = this.checkAllShow
      } else if (type === 1) {
        this.sentryShow = !this.sentryShow
      } else if (type === 2) {
        this.cameraShow = !this.cameraShow
      } else if (type === 3) {
        this.sensorShow = !this.sensorShow
      } else if (type === 4) {
        this.gateShow = !this.gateShow
      } else {
        this.essentialShow = !this.essentialShow
      }
      this.checkAllShow = !!(this.sentryShow && this.cameraShow && this.sensorShow && this.gateShow && this.essentialShow)
    },
    openCar (pic) {
      this.comprehensiveWindowShow = true
      this.carType = pic
      this.isHistory = false
    },
    leftBottomClick (type) {
      if (type === 1) {
        this.leftBottomDetailWindow = true
        this.leftBottomWindow = false
      } else {
        this.leftBottomDetailWindow = false
        this.leftBottomWindow = true
      }
    },
    ringStop () {
      this.ringTime = 0
      clearInterval(this.ringClean)
      this.ringClean = null
    },
    autoStop () {
      this.autoTime = 0
      clearInterval(this.autoClose)
      this.autoClose = null
    },
    ringInterval () {
      this.autoNum = this.ringType[0]// 第一个普通预警
      this.ringClean = setInterval(() => { // 创建定时器
        if (this.ringTime === 60000) {
          this.carType = this.ringType[0] // 判断展示的图片
          this.comprehensiveWindowShow = true
          this.isHistory = true// 判断是否是左边点击还是自动展示的
          this.ringType.splice(0, 1)
          this.ringStop()
        } else {
          this.ringTime += 1000
        }
      }, 1000)
    },
    policeRing () {
      this.comprehensiveWindowShow = false
      if (this.ringType.length !== 0 && this.isHistory) {
        // this.autoStop()
        if (this.autoNum === 2) {
          this.autoStop()
        }
        this.ringInterval()
      }
    }
  },

  watch: {
    'ringClean' (val, newVal) {
      if (!val && this.autoNum === 2) {
        this.autoClose = setInterval(() => { // 创建定时器
          if (this.autoTime === 60000) {
            this.comprehensiveWindowShow = false
            this.autoStop()
            this.ringInterval()
          } else {
            this.autoTime += 1000
          }
        }, 1000)
      }
    },

    'sentryShow' () {
      this.mapList.forEach(item => {
        if (item.type === 1) {
          item.isShow = this.sentryShow
        }
      })
    },
    'cameraShow' () {
      this.mapList.forEach(item => {
        if (item.type === 2) {
          item.isShow = this.cameraShow
        }
      })
    },
    'sensorShow' () {
      this.mapList.forEach(item => {
        if (item.type === 3) {
          item.isShow = this.sensorShow
        }
      })
    },
    'gateShow' () {
      this.mapList.forEach(item => {
        if (item.type === 4) {
          item.isShow = this.gateShow
        }
      })
    },
    'essentialShow' () {
      this.mapList.forEach(item => {
        if (item.type === 5) {
          item.isShow = this.essentialShow
        }
      })
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
      position: absolute;
      height: 30px;
      left: 122px;
      top: 25px;
      width: 125px;
      /deep/.el-input__inner{
        border: none;
        font-size: 24px;
        padding: 0;
        font-weight: bold;
        line-height: 30px;
        letter-spacing: 0.1em;
        color: #FFFFFF;
        font-family: Microsoft YaHei UI;
        font-style: normal;
        background-color: transparent;
        /*width: 75px;*/
      }
      /deep/.el-select .el-input .el-select__caret {
        color: #34E3FE;
        font-size: 25px;
        transition: transform .3s;
        transform: rotateZ(180deg);
        cursor: pointer;
      }
      //修改单个的选项的样式
      /deep/.el-select-dropdown {
        background-color: #030038;
        border: 1px solid #0060FF;
      }
      /deep/.el-select-dropdown__list {
        padding: 0;
      }
      /deep/ .el-select-dropdown__item{
        border: none;
        font-size: 24px;
        font-weight: bold;
        line-height: 30px;
        letter-spacing: 0.1em;
         color: #81809B;
        font-family: Microsoft YaHei UI;
        font-style: normal;
        background-color: transparent;
        padding: 25px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #0A2A83;
      }
      //item选项的hover样式
      /deep/ .el-select-dropdown__item.hover,
      /deep/ .el-select-dropdown__item:hover{
        color:#FFFFFF;
      }
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
    position: relative;
    overflow: hidden;
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
        position: relative;
        .light {
          width: 495px;
          height: 300px;
          position: absolute;
          left: 439px;
          top: 22px;
          background: url("../assets/images/Group 345.png") no-repeat;
          background-size: 100% 100%;
          .close {
            width: 24px;
            height: 24px;
            background: transparent;
            position: absolute;
            top: 20px;
            right: 25px;

          }
          img:nth-child(1){
            position: absolute;
            right: 158px;
            top: 120px;

          }
          img:nth-child(2){
            position: absolute;
            right: 158px;
            top: 180px;

          }
          img:nth-child(3){
            position: absolute;
            right: 158px;
            top: 240px;

          }
          img:nth-child(4){
            position: absolute;
            right: 32px;
            top: 120px;

          }
          img:nth-child(5){
            position: absolute;
            right: 32px;
            top: 180px;

          }
          img:nth-child(6){
            position: absolute;
            right: 32px;
            top: 240px;

          }
          img {
            cursor: pointer;
          }
        }
        img {
          margin-left: 10px;
        }
        span {
          background: linear-gradient(90deg, #0075FF 0%, #00EAFF 49.56%, #01ACFF 99.99%);
          -webkit-background-clip: text;
          color: transparent;
          position: relative;
          cursor: pointer;
        }
        .lightOpen {
          width: 24px;
          height: 24px;
          background: url("../assets/images/tuodong.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 15px;
          right: 15px;
          cursor: pointer;
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
          height: 225px;
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
            .personWidth  {
              width: 95px;
            }
            .lineColor {
              width: 180px;
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
          height: 92px;
        }
        .leftdownWindow {
          width: 720px;
          height: 450px;
          left: 600px;
          top: 315px;
          position: fixed;
          .heads {
            width: 720px;
            height: 56px;
            display: flex;
            align-items: center;
            color: #FFFFFF;
            font-size: 18px;
            font-family: Microsoft YaHei UI;
            border-bottom: 1px solid #0272CA;
            background: #00137F;
            padding-left: 32px;
            position: relative;
            .formIcon {
              width: 24px;
              height: 24px;
              position: absolute;
              left: 158px;
              top: 16px;
              cursor: pointer;
            }
            .formIcon2 {
              width: 24px;
              height: 24px;
              position: absolute;
              left: 198px;
              top: 16px;
              cursor: pointer;
            }
            .formMapIcon {
              width: 24px;
              height: 24px;
              position: absolute;
              left: 195px;
              top: 16px;
              cursor: pointer;
            }
            .formMapIcon2 {
              width: 24px;
              height: 24px;
              position: absolute;
              left: 235px;
              top: 16px;
              cursor: pointer;
            }
            .closeIcon {
              width: 20px;
              height: 20px;
              background: url("../assets/images/closeWindow.png") no-repeat;
              background-size: 100% 100%;
              position: absolute;
              right: 22px;
              top: 18px;
            }
          }
          .table {
            width: 720px;
            height: 384px;
            background: #08062D;
            border-radius: 4px 4px 0px 0px;
            font-size: 16px;
            color: #FFFFFF;
            .tablecontent {
              display:flex;
              align-items: center;
              height: 48px;
              border-bottom: 1px solid #09216E;
              .span1 {
                width: 28%;
                padding-left: 32px;
                box-sizing: border-box;
              }
              .span2 {
                width: 30%;
              }
              .span3 {
                width: 27%;
              }
              .span4 {
                width: 15%;
                &.click {
                  color: #34E3FE;
                  cursor: pointer;
                }
              }
              .span5 {
                width: 60%;
                &.one {
                  padding-left: 32px;
                  box-sizing: border-box;
                }
              }
            }
          }
          .tableGui {
            width: 720px;
            height: 394px;
            background: url("../assets/images/Group 328.png") no-repeat;
            background-size: 100% 100%;
          }
          .tableGui2 {
            width: 720px;
            height: 394px;
            background: url("../assets/images/Group 329.png") no-repeat;
            background-size: 100% 100%;
          }
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
      top: 532px;
      right: 126px;
      z-index: 7;
      width: 62px;
      height: 30px;
    }
    .content_close2 {
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
    z-index: 999;

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
