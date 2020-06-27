<template>
  <div class="content">
    <!--头部-->
    <div class="content_head">
      <img src="@/assets/images/head.png"/>
      <div class="head_text">XX营区安全管控综合态势图</div>
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
      </div>
      <div class="head_date">{{nowDate}}</div>
    </div>


    <div class="back-btn" @click="$router.go(-1)">返回</div>
  </div>
</template>

<script>
  import { TimeFormat } from '@/utils/utils'
  export default {
    name: 'videoRecords',
    data () {
      return {
        nowDate: '',
        timer: null,
        camp: this.$store.state.camp,
        campList: [
          { name: 'A', zoom: 16, lng: 115.750556, lat: 39.603056 },
          { name: 'B', zoom: 17, lng: 115.764722, lat: 39.603611 },
          { name: 'C', zoom: 17, lng: 115.766111, lat: 39.605833 }
        ],
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

        /deep/ .el-input__inner {
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

        /deep/ .el-select .el-input .el-select__caret {
          color: #34E3FE;
          font-size: 25px;
          transition: transform .3s;
          transform: rotateZ(180deg);
          cursor: pointer;
        }

        //修改单个的选项的样式
        /deep/ .el-select-dropdown {
          background-color: #030038;
          border: 1px solid #0060FF;
        }

        /deep/ .el-select-dropdown__list {
          padding: 0;
        }

        /deep/ .el-select-dropdown__item {
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
        /deep/ .el-select-dropdown__item:hover {
          color: #FFFFFF;
        }

        img {
          margin-left: 10px;
        }
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
  }
</style>
