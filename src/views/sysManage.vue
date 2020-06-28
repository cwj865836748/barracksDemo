<template>
  <div class="content">
    <img src="@/assets/bgImg/sys.png" v-show="type===0">
    <img src="@/assets/bgImg/sys1.png" v-show="type===1">
    <img src="@/assets/bgImg/sys2.png" v-show="type===2">
    <img src="@/assets/bgImg/sys3.png" v-show="type===3">
    <img src="@/assets/bgImg/sys4.png" v-show="type===4">
    <img src="@/assets/bgImg/sys5.png" v-show="type===9">
    <img src="@/assets/bgImg/sys6.png" v-show="type===6">
    <img src="@/assets/bgImg/sys7.png" v-show="type===7">
    <img src="@/assets/bgImg/sys8.png" v-show="type===8">
    <div class="btn_change" @click="type=4"></div>
    <div class="btn_change2" @click="type=3"></div>
    <div class="btn_change3" @click="type=2"></div>
    <div class="btn_change4" @click="type=1"></div>
    <div class="btn_change5" @click="type=0"></div>

    <div class="btn_change6" @click="type=6"></div>
    <div class="btn_change7" @click="type=7"></div>
    <div class="btn_change8" @click="type=8"></div>
    <div class="btn_change9" @click="type=4"></div>
    //新增角色
    <div class="btn_change10" @click="type=9" v-show="type===6"></div>
    //配置
    <div class="btn_change11" @click="setShow=true" v-show="type===4"></div>
    //查看
    <div class="btn_change12" @click="viewShow=true" v-show="type===8"></div>
    <div class="view" v-show="viewShow">
    <img src="@/assets/images/Group 346.png">
      <div class="close" @click="viewShow=false"/>
    </div>

    <div class="select" v-show="setShow">
      <img src="@/assets/bgImg/Group 343.png" v-show="picChange">
      <img src="@/assets/bgImg/Group 344.png" v-show="!picChange">
      <div class="close1" @click="picChange=!picChange"/>
      <div class="close2" @click="setShow=false"/>
      <div class="close3" @click="setShow=false"/>
    </div>
<!--    <div class="select" v-show="setShow">-->
<!--      <div class="head">-->
<!--        <span>科拓系统配置</span>-->
<!--        <img src="@/assets/images/Union.png" @click="setShow=false">-->
<!--      </div>-->
<!--      <div class="EquBody">-->
<!--        <div class="divs flex-xy-center" >-->
<!--          <span class="flex-y-center" style="width: 100px"><span style="color: red;font-size: 24px">*</span>适用营区:</span>-->
<!--          <el-select v-model="campGoods" placeholder="请选择类型" style="width: 332px" :popper-append-to-body="false">-->
<!--            <el-option-->
<!--              v-for="item in cities"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--              <span><el-checkbox/>{{ item.label }}</span>-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </div>-->
<!--        <div class="btn">-->
<!--          <div class="flex-xy-center" @click="setShow=false">取消</div>-->
<!--          <div class="flex-xy-center" @click="setShow=false">确定</div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="back-btn" @click="$router.go(-1)">返回</div>
  </div>
</template>

<script>
import { TimeFormat } from '@/utils/utils'
export default {
  name: 'personManage',
  data () {
    return {
      nowDate: '',
      type: 4,
      timer: null,
      viewShow: false,
      picChange: true,
      camp: this.$store.state.camp,
      setShow: false,
      campGoods: ['A', 'B'],
      campList: [
        { name: 'A', zoom: 16, lng: 115.750556, lat: 39.603056 },
        { name: 'B', zoom: 17, lng: 115.764722, lat: 39.603611 },
        { name: 'C', zoom: 17, lng: 115.766111, lat: 39.605833 }
      ],
      cities: [{
        value: 'all',
        label: '全部'
      }, {
        value: 'A',
        label: 'A营区'
      }, {
        value: 'B',
        label: 'B营区'
      }, {
        value: 'C',
        label: 'C营区'
      }]
    }
  },
  computed: {
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
      this.$store.commit('updateCamp', val)
      this.camp = val
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
  .content {
    position: relative;
    .select {
      height: 343px;
      width: 495px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .close1 {
        height: 32px;
        width: 300px;
        position: absolute;
        left: 154px;
        top: 100px;
        background: transparent;

      }
     .close2 {
       height: 32px;
       width: 32px;
       position: absolute;
       right: 24px;
       top: 12px;
       background: transparent;
      }
      .close3 {
        height: 32px;
        width: 150px;
        position: absolute;
        bottom: 12px;
        background: transparent;
        right: 30px;
      }
      /**
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
      }**/
    }
    .view {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .close {
        position: absolute;
        right: 32px;
        top: 20px;
        height: 20px;
        width: 20px;
        background: transparent;
      }
    }
    .btn_change {
      position: absolute;
      top: 279px;
      left: 316px;
      width: 137px;
      height: 35px;
      cursor: pointer;
      background: transparent;

    }
    .btn_change2 {
      position: absolute;
      top: 323px;
      left: 300px;
      width: 147px;
      height: 35px;
      cursor: pointer;
      background:transparent;
    }
    .btn_change3 {
      position: absolute;
      top: 369px;
      left: 312px;
      width: 135px;
      height: 35px;
      cursor: pointer;
      background: transparent;

    }
    .btn_change4 {
      position: absolute;
      top: 409px;
      left: 312px;
      width: 135px;
      height: 35px;
      cursor: pointer;
      background:transparent;

    }
    .btn_change5 {
      position: absolute;
      top: 449px;
      left: 312px;
      width: 135px;
      height: 35px;
      cursor: pointer;
      background: transparent;

    }
    .btn_change6 {
      position: absolute;
      top: 277px;
      left: 108px;
      width: 72px;
      height: 35px;
      cursor: pointer;
      background: transparent;

    }
    .btn_change7 {

      position: absolute;
      top: 228px;
      left: 108px;
      width: 72px;
      height: 35px;
      cursor: pointer;
      background: transparent;

    }
    .btn_change8 {
      position: absolute;
      top: 176px;
      left: 108px;
      width: 72px;
      height: 35px;
      cursor: pointer;
      background: transparent;

    }
    .btn_change9 {
      position: absolute;
      top: 128px;
      left: 108px;
      width: 72px;
      height: 35px;
      cursor: pointer;
      background: transparent;

    }
    .btn_change10 {
      position: absolute;
      top: 188px;
      right: 64px;
      width: 135px;
      height: 35px;
      cursor: pointer;
      background: transparent;

    }
    .btn_change11 {
      position: absolute;
      top: 598px;
      right: 156px;
      width: 44px;
      height: 152px;
      cursor: pointer;
      background: transparent;
    }
    .btn_change12 {
      position: absolute;
      top: 350px;
      right: 156px;
      width: 44px;
      height: 137px;
      cursor: pointer;
      background: transparent;
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
  }
</style>
