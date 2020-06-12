<template>
  <div class="content" style="justify-content: space-between;flex-direction: column;display: flex">

    <Pie ref="Pie" class="myPie"/>

    <Map/>
    <div class="outDiv">
      <i class="el-icon-edit"></i>
      <div class="blingbling"></div>
    </div>
    <!--    {{nowDate}}-->
    <div class="scroll-wrap">
      <div class="scroll-content" :style="{ top }" @mouseenter="Stop()" @mouseleave="Up()">
      <p v-for="item in prizeList">
        <a :href="item.src">{{item.name}}</a>
      </p>
    </div>
    </div>
  <el-button @click="exportExcel">a</el-button>
  </div>
</template>

<script>
import Pie from '@/components/echarts/pie'
import Map from '@/components/map/index'
import { TimeFormat } from '@/utils/utils'
import table2excel from 'js-table2excel'

export default {
  name: 'Home',
  components: {
    Pie, Map
  },
  data () {
    return {
      nowDate: '',
      timer: null,
      camp: [
        { campName: 'A营区' },
        { campName: 'B营区' },
        { campName: 'C营区' }
      ],
      prizeList: [
        { name: '城轨采购网', src: 'http://www.railunique.com' },
        { name: '天津地铁电子采购平台', src: 'http://www.railunique.com' },
        { name: '南昌地铁', src: 'http://www.railunique.com' },
        { name: '南昌地铁', src: 'http://www.railunique.com' },
        { name: '兰州地铁招标信息', src: 'http://www.railunique.com' },
        { name: '西安公共资源交易中心', src: 'http://www.railunique.com' }
      ],
      activeIndex: 0,
      intnum: undefined
    }
  },
  computed: {
    top () {
      return -this.activeIndex * 50 + 'px'
    }
  },
  created () {
    this.getDate()
    this.ScrollUp()
  },
  mounted () {
    this.$refs.Pie.getEcharts()
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
    ScrollUp () {
      this.intnum = setInterval(_ => {
        if (this.activeIndex < this.prizeList.length) {
          this.activeIndex += 1
        } else {
          this.activeIndex = 0
        }
      }, 1000)
    },
    Stop () {
      clearInterval(this.intnum)
    },
    Up () {
      this.ScrollUp()
    },
    exportExcel () {
      const column = [
        {
          title: '姓名',
          key: 'name',
          type: 'text'
        },
        {
          title: '手机号',
          key: 'phone',
          type: 'text'
        },
        {
          title: '身份证号',
          key: 'idCard',
          type: 'text'
        },
        {
          title: '图片',
          key: 'image',
          type: 'image',
          width: 80,
          height: 50
        }
      ]
      const data = [
        {
          name: '张三',
          phone: '13512345678',
          idCard: '412356198601251234',
          image: 'https://profile.csdnimg.cn/9/8/3/2_xiaoxiaojie12321'
        },
        {
          name: '李四',
          phone: '13612345678',
          idCard: '412356198601251234',
          image: 'https://profile.csdnimg.cn/9/8/3/2_xiaoxiaojie12321'
        },
        {
          name: '王五',
          phone: '13712345678',
          idCard: '412356198601251234',
          image: 'https://profile.csdnimg.cn/9/8/3/2_xiaoxiaojie12321'
        },
        {
          name: '王五',
          phone: '13712345678',
          idCard: '412356198601251234',
          image: ''
        }
      ]

      /** column数据的说明 */
      // 1.title为列名
      // 2.key为data数据每个对象对应的key
      // 3.若为图片格式, 需要加type为image的说明,并且可以设置图片的宽高

      const excelName = '人员信息统计表'
      table2excel(column, data, excelName)
    }

  }

}
</script>

<style lang="scss" scoped>
  .content {
    position: relative;
    .myPie {
      position: absolute;
      z-index: 10;
      border: 1px solid #333;
      width: 500px !important;
      height: 250px !important;
      background-color:#05032B ;

    }
    .outDiv{
      width:30px;
      height:30px;
      display: flex;
      justify-content: center;
      align-items: center;
      .blingbling{
        border: 6px solid red;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        position: absolute;
        -webkit-animation: scaleout 2.5s infinite ease-in-out;
        animation: scaleout 2.5s infinite ease-in-out;
      }
      @-webkit-keyframes scaleout {
        0% { -webkit-transform: scale(1.0) }
        100% {
          -webkit-transform: scale(1.1);
          opacity: 0;
        }
      }
      @keyframes scaleout {
        0% {
          transform: scale(1.0);
          -webkit-transform: scale(1.0);
        } 100% {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            opacity: 0;
          }
      }
    }
    .scroll-wrap {
      height: 150px;
      overflow: hidden;
    }
    .scroll-content {
      position: relative;
      transition: top 0.5s;
    }
    .scroll-content p {
      height: 50px;
      text-align: center;
    }
  }
</style>
