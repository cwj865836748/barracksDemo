<template>
  <div class="content">
    <img src="@/assets/images/personBg2.png" v-show="type">
    <img src="@/assets/images/personBg.png" v-show="!type">
    <div class="btn_change" @click="type=true"></div>
    <div class="btn_change2" @click="type=false"></div>
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
      type: true,
      timer: null,
      camp: this.$store.state.camp,
      campList: [
        { name: 'A', zoom: 16, lng: 115.750556, lat: 39.603056 },
        { name: 'B', zoom: 17, lng: 115.764722, lat: 39.603611 },
        { name: 'C', zoom: 17, lng: 115.766111, lat: 39.605833 }
      ]
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
    .btn_change {

      position: absolute;
      top: 155px;
      left: 38px;
      width: 135px;
      height: 35px;
      cursor: pointer;
      background: transparent;
    }
    .btn_change2 {
      position: absolute;
      top: 155px;
      left: 198px;
      width: 135px;
      height: 35px;
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
