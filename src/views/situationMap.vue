<template>
  <div class="content" >
    <!--头部-->
    <div class="content_head">
      <img src="@/assets/images/head.png"/>
      <div class="head_camp">{{camp}}<img src="@/assets/images/select.png"/></div>
      <div class="head_date">{{nowDate}}</div>
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
  </div>
</template>

<script>
import { TimeFormat } from '@/utils/utils'
import Plain from '@/components/echarts/plain'
import Pie from '@/components/echarts/pie'
import brokenLine from '@/components/echarts/brokenLine'

export default {
  name: 'situationMap',
  data () {
    return {
      nowDate: '',
      timer: null,
      intnum: null,
      camp: 'A营区'
    }
  },
  components: {
    Plain, Pie, brokenLine
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
  }
</style>
