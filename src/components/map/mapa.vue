<template>
  <div>
    <div id="mapa" style="height: 960px;">

    </div>
    <div class="SeachMap" :class="[upClose?'close':'']" >
    <el-input id="searchInput" v-model="searchInput"  placeholder="搜地点"/>
      <div class="closeInput" @click="searchInput=''">
        <img src="@/assets/images/closeIcon.png"/>
      </div>
      <div class="goup" @click="upClose=!upClose" >
      <img src="@/assets/images/goup2.png"/>
      </div>
    </div>
    <div class="SeachMapClose" :class="[upClose?'close':'']" @click="upClose=!upClose">
      <img src="@/assets/images/goxia.png">
    </div>
    <div class="addEqu flex-xy-center" @click="showEqu=true">添加设备</div>
    <div class="EquWindow" v-show="showEqu">
      <div class="head">
        <span>添加设备</span>
        <img src="@/assets/images/Union.png" @click="showEqu=false">
      </div>
      <div class="EquBody">
        <div class="divs flex-xy-center" >
          <span class="flex-y-center" style="width: 100px"><span style="color: red;font-size: 24px">*</span>设备类型:</span>
          <el-select v-model="EquObj.type" placeholder="请选择类型" style="width: 332px" :popper-append-to-body="false">
            <el-option value='1' label="哨兵">哨兵</el-option>
            <el-option value='2' label="摄像机">摄像机</el-option>
            <el-option value='3' label="传感器">传感器</el-option>
            <el-option value='4' label="道闸">道闸</el-option>
            <el-option value='5' label="要素">要素</el-option>
          </el-select>
        </div>

        <div class="flex-y-center">
          <span class="flex-y-center" style="width: 126px"><span style="color: red;font-size: 24px">*</span>设备名称:</span>
          <el-input v-model="EquObj.name" placeholder="请输入名称"/>
        </div>

        <div class="flex-xy-center">
          <span class="flex-y-center" style="width: 100px"><span style="color: red;font-size: 24px">*</span>关联设备:</span>
          <el-select v-model="EquObj.con" placeholder="请选择关联设备" style="width: 332px" :popper-append-to-body="false">
            <el-option value='1' label="摄像机1">摄像机1</el-option>
            <el-option value='2' label="摄像机2">摄像机2</el-option>
            <el-option value='3' label="摄像机3">摄像机3</el-option>
            <el-option value='4' label="摄像机4">摄像机4</el-option>
          </el-select>
        </div>
        <div class="btn">
          <div class="flex-xy-center" @click="showEqu=false">取消</div>
          <div class="flex-xy-center" @click="showEqu=false">确定</div>
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
  </div>
</template>

<script>
export default {
  name: 'mapa',
  props: ['list', 'lng', 'lat', 'zoom'],
  data () {
    return {
      map: null,
      curTk: {},
      curTKMarker: null,
      clickNum: 0,
      viewMode: '3D',
      searchInput: '',
      upClose: false,
      bottomClose: false,
      showMovie: true,
      showEqu: false,
      layers: [
        // 卫星
        new AMap.TileLayer.Satellite(),
        // 路网
        new AMap.TileLayer.RoadNet()
      ],
      placeSearch: null,
      EquObj: {
        type: '',
        name: '',
        con: ''
      }
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    // 初始化
    initMap () {
      const that = this
      this.map = new AMap.Map('mapa', {
        resizeEnable: true,
        center: [this.lng, this.lat],
        viewMode: this.viewMode,
        layers: this.layers,
        zoom: this.zoom
      })
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
        var autoOptions = {
          input: 'searchInput'// 前端搜索框
        }
        var auto = new AMap.Autocomplete(autoOptions)
        that.placeSearch = new AMap.PlaceSearch(
          {
            map: that.map
          }
        )
        AMap.event.addListener(auto, 'select', that.select)// 注册监听，当选中某条记录时会触发
      })
      this.addMapItem()
      // 限制地图滚动
      // var bounds = this.map.getBounds();
      // this.map.setLimitBounds(bounds);
      // this.map.setFitView()
    },
    select (e) {
      this.$parent.lng = e.poi.location.lng
      this.$parent.lat = e.poi.location.lat
      this.placeSearch.search(e.poi.name) // 关键字查询查询
    },
    addMapItem () {
      // 移除覆盖物群组
      this.map.clearMap()

      this.list.forEach((item) => {
        if (item.isShow) {
          var marker = new AMap.Marker({
            map: this.map,
            position: new AMap.LngLat(item.lng, item.lat),
            icon: item.imgUrl
          })
          marker.on('click', () => {
            this.clickNum = 0
            if (this.curTKMarker) {
              this.map.remove(this.curTKMarker)
              if (item.type === this.curTk.type) {
                this.curTKMarker = null
              } else {
                this.curTKMarker = new AMap.Marker({
                  map: this.map,
                  position: new AMap.LngLat(item.lng + (98.304 / (Math.pow(2, this.map.getZoom()))), item.lat),
                  icon: item.tkImg
                })
                this.curTk = item
              }
              this.showMovie = false
            } else {
              this.curTKMarker = new AMap.Marker({
                map: this.map,
                position: new AMap.LngLat(item.lng + (98.304 / (Math.pow(2, this.map.getZoom()))), item.lat),
                icon: item.tkImg
              })
              this.curTk = item
              this.showMovie = true
            }

            if (this.curTKMarker && item.type != 0) {
              this.curTKMarker.on('click', () => {
                this.clickNum++
                this.curTKMarker.setIcon(this.clickNum % 2 ? item.tkImgDetail : item.tkImg)
              })
            }
            // if (item.type === 2 && this.showMovie) {
            //   console.log(this.showMovie)
            //   this.$parent.videoShow = true
            // }
          })
        }
      })
    },
    mapChange (viewMode) {
      if (this.viewMode === viewMode) {
        return
      }
      this.viewMode = viewMode
      if (viewMode === '2D') {
        this.layers = []
      } else {
        this.layers = [
          // 卫星
          new AMap.TileLayer.Satellite(),
          // 路网
          new AMap.TileLayer.RoadNet()
        ]
      }
      this.initMap()
    }

  },
  watch: {
    list: {
      handler (newVal, oldVal) {
        if (newVal && oldVal) {
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
    left: 1040px;
    top: 8px;
    z-index: 250;
    width: 500px;
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
      right: 16px;
      cursor: pointer;
    }
    .goup {
      position: absolute;
      top: 0px;
      right: -38px;
      cursor: pointer;
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
    background: #003ACB;
    border-radius: 8px;
    color: #FFFFFF;
    position: absolute;
    top: 8px;
    left: 83.39%;
    width: 129px;
    height: 54px;
    font-size: 24px;
    cursor: pointer;
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
.SeachMap::after {
  content: '';
  display: block;
  width: 1px;
  height: 40px;
  position: absolute;
  top: 8px;
  right: 58px;
  background: rgba(114,114,114,0.7);
  z-index:300
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
</style>
