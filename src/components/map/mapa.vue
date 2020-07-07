<template>
  <div>
    <div id="mapa" style="height: 960px;">

    </div>
    <div class="SeachMap" :class="[upClose?'close':'']" >
    <el-input id="searchInput" v-if="showSearch"  v-model="searchInput" placeholder="搜地点" @input="select"/>
      <div class="closeInput" v-if="showSearch" @click="searchInput=''">
        <img src="@/assets/images/closeIcon.png"/>
      </div>

      <div class="openSearch flex-xy-center" @click="showSearch=!showSearch">
        <img src="@/assets/i/Vector.png">
      </div>

      <div class="goup" @click="upClose=!upClose" >
      <img src="@/assets/images/goup2.png"/>
      </div>

    </div>

    <div class="searchk" v-show="searchShow">
         <div class="list" v-for="(item,index) in selectList" :key="index" @click="getLng(item)">
           <span>{{item.name}}</span>
         </div>

    </div>
    <div class="SeachMapClose" :class="[upClose?'close':'']" @click="upClose=!upClose">
      <img src="@/assets/images/goxia.png">
    </div>
    <div class="addEqu flex-x-between" >
      <img src="@/assets/i/Group 379.png" @click="addEqu"/>
      <img src="@/assets/i/Group 378.png" @click="delEqu"/>
    </div>
<!--    <div :class="['delEqu flex-xy-center',isDelButton?'unBg':'']" >删除设备</div>-->
    <div class="EquWindow" v-show="showEqu">
      <div class="head">
        <span>添加设备</span>
        <img src="@/assets/images/Union.png" @click="showEqu=false">
      </div>
      <div class="EquBody">
        <div class="divs flex-xy-center" >
          <span class="flex-y-center" style="width: 100px"><span style="color: red;font-size: 24px">*</span>设备类型:</span>
          <el-cascader
            v-model="EquObj.sb" style="width: 332px"
            placeholder="请选择关联设备"
            :popper-append-to-body="false"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"></el-cascader>
        </div>

        <div class="flex-y-center">
          <span class="flex-y-center" style="width: 126px"><span style="color: red;font-size: 24px">*</span>设备名称:</span>
          <el-input v-model="EquObj.name" placeholder="请输入名称"/>
        </div>

        <div class="flex-xy-center">
          <span class="flex-y-center" style="width: 100px"><span style="color: red;font-size: 24px">*</span>关联设备:</span>
          <el-select v-model="EquObj.con" placeholder="请选择类型" style="width: 332px" :popper-append-to-body="false">
            <el-option value='1' label="周界1">周界1</el-option>
            <el-option value='2' label="周界2">周界2</el-option>
            <el-option value='3' label="周界3">周界3</el-option>
            <el-option value='4' label="周界4">周界4</el-option>
            <el-option value='5' label="周界5">周界5</el-option>
          </el-select>
        </div>
        <div class="btn">
          <div class="flex-xy-center" @click="showEqu=false">取消</div>
          <div class="flex-xy-center" @click="starOk">确定</div>
        </div>
      </div>
    </div>
    <div class="to2D3D" :class="[bottomClose?'close':'']">
      <div class="change2D3D">
      <div :class="[viewMode==='2D'?'changeMap':'']" @click="mapChange('2D')" >2D</div>
      <div :class="[viewMode==='3D'?'changeMap':'']"  @click="mapChange('3D')">3D</div>
      </div>
      <div class="bottom_close" @click="bottomClose=!bottomClose">
        <img src="@/assets/images/godown.png">
      </div>
    </div>
    <div class="bottom_close_up" :class="[bottomClose?'close':'']" @click="bottomClose=!bottomClose">
      <img src="@/assets/images/goup.png">
    </div>
    <div class="videoPostion" :class="[isDetail?'bg1':'bg2']" v-if="showVideo">
      <div class="videoK">
        <onTimeVideo :height="height" :width="width"   :src="srcMoive" :openVideo="true" />
        <div class="closeVideo" @click="closeVideo">关闭</div>
      </div>
      <div class="detail" @click="isDetail=!isDetail"/>
    </div>
    <div class="pos-center isOK" v-if="delK">
      <div class="wariness">
        <span>温馨提示</span>
      </div>
      <div class="warinessContent">请点击所要删除的图标</div>
    </div>
    <div class="pos-center isOK" v-if="delDK">
      <div class="isOKHead">
        删除图标
      </div>
      <div class="isOKContent">是否删除该图标</div>
      <div class="myBtn">
        <div class="flex-xy-center" @click="delOK">确认</div>
        <div class="flex-xy-center" @click="delCancel">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import selectData from '@/selectData'
import onTimeVideo from '@/components/onTimeVideo/index'
export default {
  name: 'mapa',
  props: ['list', 'lng', 'lat', 'zoom'],
  data () {
    return {
      star: '/image/star.png',
      isDelButton: false,
      delK: false,
      delDK: false,
      isDetail: true,
      srcMoive: '',
      width: '510px',
      height: '290px',
      map: null,
      showVideo: false,
      curTk: {},
      curTKMarker: null,
      clickNum: 0,
      viewMode: '3D',
      searchInput: '',
      upClose: false,
      bottomClose: false,
      showEqu: false,
      searchShow: false,
      selectList: [],
      options: [
        {
          value: '1',
          label: '哨兵'
        }, {
          value: '2',
          label: '摄像机',
          children: [
            {
              value: '21',
              label: '人脸采集摄像头'
            }, {
              value: '22',
              label: '监控半球（室内+公桌）'
            }, {
              value: '23',
              label: '夜市网络球型摄像机'
            }, {
              value: '24',
              label: '热成像监测摄像机'
            }, {
              value: '25',
              label: '防爆摄像机'
            }, {
              value: '26',
              label: '防油污摄像机'
            }, {
              value: '27',
              label: '全景抓拍网络摄像机'
            }, {
              value: '28',
              label: '180度AR全景摄像机'
            }, {
              value: '29',
              label: '360度AR全景摄像机'
            }, {
              value: '210',
              label: '高清卡口抓拍机'
            }, {
              value: '211',
              label: '智能网络摄像机'
            }, {
              value: '212',
              label: '180度全景摄像机（近距离、无球机）'
            }, {
              value: '213',
              label: '人脸抓拍摄像机'
            }
          ]
        }, {
          value: '3',
          label: '传感器'
        }, {
          value: '4',
          label: '道闸'
        }, {
          value: '5',
          label: '要素'
        }
      ],
      // layers: [
      //   // 卫星
      //   new AMap.TileLayer.Satellite(),
      //   // 路网
      //   new AMap.TileLayer.RoadNet()
      // ],
      placeSearch: null,
      EquObj: {
        type: '',
        name: '',
        con: '',
        sb: null
      },
      mList: [],
      sbList: [],
      Satellite: null,
      RoadNet: null,
      marker: null,
      latlng: null,
      delIconObj: null,
      showSearch: false
    }
  },
  components: {
    onTimeVideo
  },
  mounted () {
    this.initMap()
  },
  methods: {
    closeVideo () {
      this.isDetail = true
      this.showVideo = false
    },
    delEqu () {
      this.isDelButton = true
      this.delK = true
      setTimeout(() => {
        this.delK = false
      }, 2000)
    },
    delCancel () {
      this.isDelButton = false
      this.delDK = false
    },
    delOK () {
      this.delIconObj.marker.remove()
      this.list.splice(this.delIconObj.index, 1)

      this.delCancel()
    },
    // 初始化
    // initMap () {
    //   const that = this
    //   this.map = new AMap.Map('mapa', {
    //     resizeEnable: true,
    //     center: [this.lng, this.lat],
    //     viewMode: this.viewMode,
    //     layers: this.layers,
    //     zoom: this.zoom
    //   })
    //   AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
    //     var autoOptions = {
    //       input: 'searchInput'// 前端搜索框
    //     }
    //     var auto = new AMap.Autocomplete(autoOptions)
    //     that.placeSearch = new AMap.PlaceSearch(
    //       {
    //         map: that.map
    //       }
    //     )
    //     AMap.event.addListener(auto, 'select', that.select)// 注册监听，当选中某条记录时会触发
    //   })
    //   this.addMapItem()
    //   // 限制地图滚动
    //   // var bounds = this.map.getBounds();
    //   // this.map.setLimitBounds(bounds);
    //   // this.map.setFitView()
    // },
    // select (e) {
    //   this.$parent.lng = e.poi.location.lng
    //   this.$parent.lat = e.poi.location.lat
    //   this.placeSearch.search(e.poi.name) // 关键字查询查询
    // },
    // addMapItem () {
    //   // 移除覆盖物群组
    //   this.map.clearMap()
    //
    //   this.list.forEach((item) => {
    //     if (item.isShow) {
    //       var marker = new AMap.Marker({
    //         map: this.map,
    //         position: new AMap.LngLat(item.lng, item.lat),
    //         icon: item.imgUrl
    //       })
    //       marker.on('click', () => {
    //         this.clickNum = 0
    //         if (this.curTKMarker) {
    //           this.map.remove(this.curTKMarker)
    //           if (item.type === this.curTk.type) {
    //             this.curTKMarker = null
    //           } else {
    //             this.curTKMarker = new AMap.Marker({
    //               map: this.map,
    //               position: new AMap.LngLat(item.lng + (98.304 / (Math.pow(2, this.map.getZoom()))), item.lat),
    //               icon: item.tkImg
    //             })
    //             this.curTk = item
    //           }
    //           this.showMovie = false
    //         } else {
    //           this.curTKMarker = new AMap.Marker({
    //             map: this.map,
    //             position: new AMap.LngLat(item.lng + (98.304 / (Math.pow(2, this.map.getZoom()))), item.lat),
    //             icon: item.tkImg
    //           })
    //           this.curTk = item
    //           this.showMovie = true
    //         }
    //
    //         if (this.curTKMarker && item.type != 0) {
    //           this.curTKMarker.on('click', () => {
    //             this.clickNum++
    //             this.curTKMarker.setIcon(this.clickNum % 2 ? item.tkImgDetail : item.tkImg)
    //           })
    //         }
    //         // if (item.type === 2 && this.showMovie) {
    //         //   console.log(this.showMovie)
    //         //   this.$parent.videoShow = true
    //         // }
    //       })
    //     }
    //   })
    // },
    // mapChange (viewMode) {
    //   if (this.viewMode === viewMode) {
    //     return
    //   }
    //   this.viewMode = viewMode
    //   if (viewMode === '2D') {
    //     this.layers = []
    //   } else {
    //     this.layers = [
    //       // 卫星
    //       new AMap.TileLayer.Satellite(),
    //       // 路网
    //       new AMap.TileLayer.RoadNet()
    //     ]
    //   }
    //   this.initMap()
    // }

    initMap () {
      BM.Config.HTTP_URL = mapId.url
      const that = this
      this.map = BM.map('mapa', null, { crs: BM.CRS.EPSG4326, center: [40.25034713745117, 116.46249389648438], zoom: this.zoom, zoomControl: true, maxZoom: 16 })
      // BM.circle([39.603056, 115.765111], { radius: 500 }).addTo(this.map)
      this.Satellite = BM.tileLayer(mapId.Satellite)
      this.RoadNet = BM.tileLayer(mapId.RoadNet)
      this.Satellite.addTo(this.map)
      this.map.fitBounds([[39.44145965576172, 115.41685485839844], [41.05923080444336, 117.50813293457031]])
      this.map.on('zoomend', (e) => {
        this.sbList.forEach(item => {
          item.remove()
        })
      })
      this.map.on('contextmenu', (e) => {
        this.isDelButton = false
      })
      this.addMapItem()
    },
    addMapItem () {
      // // 移除覆盖物群组
      this.mList.forEach(item => {
        item.remove()
      })

      this.list.forEach((item, index) => {
        if (!item.isShow) return
        var marker = BM.marker(
          [item.lat, item.lng],
          { icon: BM.icon({ iconUrl: item.imgUrl }) }).addTo(this.map)
        this.mList.push(marker)
        marker.on('click', (e) => {
          if (this.isDelButton) {
            this.delDK = true
            this.delIconObj = {
              marker, index
            }

            return
          }
          if (item.type === 2) {
            this.srcMoive = item.mapMovie
            this.$nextTick(() => {
              this.showVideo = true
            })
            return
          }
          this.clickNum = 0
          if (this.curTKMarker) {
            this.curTKMarker.remove()
            if (item.type === this.curTk.type) {
              this.curTKMarker = null
            } else {
              this.curTKMarker = BM.marker(
                [item.lat, item.lng + Math.pow(2, 22 - this.map.getZoom()) / 100000],
                { icon: BM.icon({ iconUrl: item.tkImg }), zIndexOffset: 500 }).addTo(this.map)
              this.curTk = item
              this.sbList.push(this.curTKMarker)
            }
          } else {
            this.curTKMarker = BM.marker(
              [item.lat, item.lng + Math.pow(2, 22 - this.map.getZoom()) / 100000],
              { icon: BM.icon({ iconUrl: item.tkImg }), zIndexOffset: 500 }).addTo(this.map)
            this.curTk = item
            this.sbList.push(this.curTKMarker)
          }
          if (this.curTKMarker && item.type != 0) {
            this.curTKMarker.on('click', () => {
              this.clickNum++
              this.curTKMarker.setIcon(this.clickNum % 2 ? BM.icon({
                iconUrl: item.tkImgDetail
              }) : BM.icon({
                iconUrl: item.tkImg
              }))
            })
          }
        })
      })
    },
    select () {
      this.selectList = selectData.filter(item => item.name.includes(this.searchInput))
      if (this.selectList.length > 0) {
        this.searchShow = true
      }

      if (this.selectList.length >= 10) {
        this.selectList = this.selectList.slice(0, 10)
      }
    },
    getLng (item) {
      this.searchShow = false
      this.searchInput = item.name
      this.map.panTo(BM.latLng(item.lat, item.lng), { animate: true, duration: 0.5 })
    },
    mapChange (viewMode) {
      if (this.viewMode === viewMode) {
        return
      }
      this.viewMode = viewMode
      if (viewMode === '2D') {
        this.Satellite.remove(this.map)
        this.RoadNet.addTo(this.map)
      } else {
        this.RoadNet.remove(this.map)
        this.Satellite.addTo(this.map)
      }
    },
    handleChange () {
      console.log(this.EquObj.sb.length)
      if (this.EquObj.sb.length === 2) {
        this.EquObj.type = this.EquObj.sb[1]
      } else {
        this.EquObj.type = this.EquObj.sb[0]
      }
    },
    addEqu () {
      const that = this
      if (this.marker) {
        this.marker.remove()
      }

      this.marker = BM.marker(
        [39.603056, 115.765111],
        { icon: BM.icon({ iconUrl: this.star }), draggable: true }).addTo(this.map)
      this.marker.on('moveend', function (e) {
        that.latlng = e.target._latlng
        that.showEqu = true
      })
      this.marker.on('dblclick', () => {
        this.marker.remove()
      })
    },
    starOk () {
      this.marker.remove()
      let obj = null
      console.log(this.EquObj.type)
      switch (this.EquObj.type) {
        case '1':
          obj = {
            type: 1,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/i/sb.png'),
            isShow: true,
            tkImg: require('../../assets/img/sbtk.png'),
            tkImgDetail: require('../../assets/img/sbtkxq.png')
          }
          break
        case '2':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/i/sxt.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: null
          }
          break
        case '3':
          obj = {
            type: 3,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/i/cgq.png'),
            isShow: true,
            tkImg: require('../../assets/img/cgqtk.png'),
            tkImgDetail: require('../../assets/img/cgqtkxq.png')
          }
          break
        case '4':
          obj = {
            type: 4,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/i/dz.png'),
            isShow: true,
            tkImg: require('../../assets/img/dztk.png'),
            tkImgDetail: require('../../assets/img/dztkxq.png')
          }
          break
        case '5':
          obj = {
            type: 5,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/i/ys.png'),
            isShow: true,
            tkImg: require('../../assets/img/ystk.png'),
            tkImgDetail: require('../../assets/img/ystkxq.png')
          }
          break
        case '21':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt1.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[3]
          }
          break
        case '22':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt2.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[4]
          }
          break
        case '23':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt3.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[5]
          }
          break
        case '24':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt4.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[6]
          }
          break
        case '25':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt5.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[7]
          }
          break
        case '26':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt6.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[8]
          }
          break
        case '27':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt7.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[9]
          }
          break
        case '28':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt8.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[10]
          }
          break
        case '29':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt9.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[11]
          }
          break
        case '210':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt10.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[12]
          }
          break
        case '211':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt11.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[13]
          }
          break
        case '212':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt12.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[14]
          }
          break
        case '213':
          obj = {
            type: 2,
            lng: this.latlng.lng, // 经度
            lat: this.latlng.lat, // 纬度
            imgUrl: require('../../assets/images/sxt13.png'),
            isShow: true,
            tkImg: require('../../assets/img/sxttk.png'),
            tkImgDetail: require('../../assets/img/sxttkxq.png'),
            mapMovie: mapId.mapMovie[15]
          }
          break
      }
      console.log(obj)
      this.list.push(obj)
      this.showEqu = false
      this.EquObj.type = ''
    }
  },
  watch: {
    list: {
      handler (newVal, oldVal) {
        if (newVal && oldVal) {
          localStorage.setItem('list', JSON.stringify(newVal))
          this.addMapItem()
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped >
.mapChange {
  width: 300px;
  height: 100px;
  background-color: rgb(51, 51, 51);
  z-index: 200;
  position: fixed;
  top: 0;
  left: 50%;
  display: flex;

  .btn {
    width: 50%;
    height: 100%;
    background-color: #FFFFFF;
    border-radius: 50%;
    color: #333333;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

}
  .SeachMap {
    position: absolute;
    left: 970px;
    top: 8px;
    z-index: 250;
    width: 582px;
    transition: all 2s ease;
    &.close{
      top:-80px;
    }

    /deep/.el-input__inner {
      height: 56px;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 34px;
      background: #0E0E36;
      color: #AAAAAA;
      position: relative;
      border:none;

    }
    .closeInput {
      position: absolute;
      top: 16px;
      right: 100px;
      cursor: pointer;
    }
    .closeInput::after {
      content: '';
      display: block;
      width: 1px;
      height: 40px;
      position: absolute;
      top: -8px;
      right: 40px;
      background: rgba(114,114,114,0.7);
      z-index:300
    }
    .openSearch {
      width: 72px;
      height: 56px;
      background: #003ACB;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1000;
    }
    .goup {
      position: absolute;
      top: 0px;
      right: -38px;
      cursor: pointer;
    }

  }

.searchk {
  position: absolute;
  left: 1040px;
  top: 64px;
  background: #0E0E36;
  color: #AAAAAA;
  z-index: 250;
  border: 1px solid #00137F;
  width: 500px;
  padding: 0 15px;
  .list {
     height: 40px;
    font-size: 16px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .list:hover {
    background: rgba(85,172,255,0.5);
  }
}
  .SeachMapClose {
    position: absolute;
    left: 1504px;
    top: -80px;
    transition: all 2s;
    cursor: pointer;
    &.close{
      top:0px;
    }
  }
  .addEqu {
    background: transparent;
    position: absolute;
    top: 8px;
    left: 83.39%;
    width: 129px;
    height: 54px;
    font-size: 24px;
    cursor: pointer;
  }
  .delEqu {
    background: red;
    border-radius: 8px;
    color: #FFFFFF;
    position: absolute;
    top: 70px;
    left: 83.39%;
    width: 129px;
    height: 54px;
    font-size: 24px;
    cursor: pointer;
    &.unBg {
      background: slategrey;
  }
  }
  .EquWindow {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 495px;
    height: 343px;
    .head {
      height: 64px;
      background: #00137F;
      border-radius: 4px 4px 0px 0px;
      box-sizing: border-box;
      padding: 22px 20px 0;
      color: #FFFFFF;
      font-size: 18px;
      border-bottom: 1px solid #018FC4;
      position: relative;
      img {
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .EquBody {
      height: 343px;
      box-sizing: border-box;
      padding: 36px 30px 75px;
      background: #08062D;
      border-radius: 4px;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      color: #FFFFFF;
      font-size: 18px;
      position: relative;
      .divs {
        justify-content: flex-start;
      }
      .btn {
        width: 144px;
        height: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        right: 28px;
        bottom: 28px;
        cursor: pointer;
        div {
          font-size: 14px;
          width: 64px;
          height: 32px;
        }
        div:first-child {
          color: #595959;
          background: #FFFFFF;
          border-radius: 4px;

        }
        div:last-child {
          color: #FFFFFF;
          background: #0049FF;
          border-radius: 4px;

        }
      }
    }
  }

  .to2D3D {
    position: absolute;
    left: 1500px;
    top: 852px;
    display: flex;
    transition: all 0.5s;
    &.close{
      top: 1080px;
    }
    .change2D3D {
    width: 136px;
    height: 76px;
    display: flex;
    background: rgba(2,0,40,0.8);
    border: 1px solid #00137F;
    box-sizing: border-box;
    border-radius: 8px;
    cursor: pointer;
    div {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 34px;
      /* identical to box height */
      width: 67px;
      height: 74px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #64657D;
      &.changeMap {
        background: #003ACB;
        color: #FFFFFF;
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
  left: 84%;
  transition: all 0.5s;
  cursor: pointer;
  &.close{
    top: 922px;
    transition-delay: 0.5s;
  }
}
.videoPostion {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 10000;
  background-size: 100% 100%;
  width: 548px;
  height: 520px;
  &.bg1 {
    background: url('../../assets/img/sxttk.png') no-repeat;
  }
  &.bg2 {
    background: url('../../assets/img/sxttkxq.png') no-repeat;
  }
  .videoK {
    position: absolute;
    width: 510px;
    height: 290px;
    left: 20px;
    top: 20px;

  }
  .detail {
    height: 23px;
    width: 36px;
    position: absolute;
    top: 334px;
    right: 30px;
    background: transparent;
  }
}
.closeVideo {
  position: absolute;
  top: 0;
  right: 0;
  background: black;
  color: #FFFFFF;
  height: 20px;
  width: 60px;
  text-align: center;
  cursor: pointer;
  z-index: 10001;
}

  /deep/.el-select-dropdown__item {
     padding: 0 30px;
  }
/deep/.el-select-dropdown__item:hover {
  background: #E2EFFF;
  position: relative;

}
/deep/.el-select-dropdown__item:hover::after {
  content: '';
  width: 2px;
  height: 20.27px;

  background: #0049FF;
  position: absolute;
  left: 20px;
  top: 6px;
}
.isOK {
  width: 375px;
  height: 216px;
  overflow: hidden;
  .wariness {
    width: 100%;
    height: 54px;
    background: linear-gradient(90deg, #051A88 0%, #020863 99.84%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Microsoft YaHei';
    font-weight: bold;
    font-size: 22px;
    span {
      background: linear-gradient(90deg, #0075FF 0%, #00EAFF 49.56%, #01ACFF 99.99%);
      -webkit-background-clip: text;
      color: transparent
    }
  }
  .warinessContent {
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #08062D;
    font-size: 23px;
    color: #FFFFFF;
  }
  .isOKHead {
    background: #00137F;
    border-radius: 4px 4px 0px 0px;
    height: 64px;
    width: 100%;
    border-bottom: 1px solid #0069BF;
    font-size: 18px;
    line-height: 16px;
    color: #FFFFFF;
    padding: 24px;
  }
  .isOKContent {
    height: 216px;
    background: #08062D;
    border-radius: 4px;
    width: 375px;
    text-align: center;
    box-sizing: border-box;
    padding-top: 32px;
    color: #FFFFFF;
    font-size: 22px;
  }
  .myBtn {
    width: 144px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    right: 28px;
    bottom: 28px;
    cursor: pointer;
    div {
      font-size: 14px;
      width: 64px;
      height: 32px;
    }
    div:first-child {
      color: #FFFFFF;
      background: #0049FF;
      border-radius: 4px;
    }
    div:last-child {

      color: #595959;

      border-radius: 4px;
      background: #FFFFFF;
    }
  }

}

</style>
