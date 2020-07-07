<template>
  <div class="content">
    <!--头部-->
    <div class="content_head">
      <img src="@/assets/i/loginHead.png"/>
      <div class="head_text">XX营区安全管控平台</div>
<!--      <div class="head_camp">-->
<!--        <el-select v-model="campName" filterable placeholder="请选择" @change="chooseCamp" :popper-append-to-body="false">-->
<!--          <el-option-->
<!--            v-for="item in campList"-->
<!--            :key="item.name"-->
<!--            :label="`${item.name}营区`"-->
<!--            :value="item.name"-->
<!--          >-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </div>-->
      <div class="head_date">{{nowDate}}</div>
    </div>
     <div class="loginWindow">
        <div class="title">用户登录</div>
        <div class="kuang ps1 flex-y-center">
          <img src="@/assets/i/username.png"/>
          <el-input v-model="username" placeholder="请输入用户名"/>
        </div>
       <div class="kuang ps2 flex-y-center">
         <img src="@/assets/i/password.png"/>
         <el-input v-model="password" placeholder="请输入密码" type="password"/>
       </div>
       <div class="forgetmm">忘记密码</div>
       <div class="submit flex-xy-center" @click="submit">登录 </div>
     </div>

<!--    <div class="back-btn" @click="$router.go(-1)">返回</div>-->
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
      username: '',
      password: ''
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
    },
    submit () {
      if (this.userName !== mapId.loginObj.userName && this.password !== mapId.loginObj.password) {
        return this.$message({
          type: 'error',
          message: '用户名或密码错误'
        })
      }
      this.$router.push('/campScreen')
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
  .content {
    position: relative;
    background: url("../assets/images/bg.png") no-repeat;
    background-size: 100% 100%;
    font-family: Source Han Sans CN;

    .content_head {
      width: 100%;
      height: 120px;

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
    .loginWindow {
      position: absolute;
      width: 502px;
      height: 456px;
      left: 709px;
      top: 312px;

      /* white */

      background: #FFFFFF;
      /* 弹窗 */

      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
      border-radius: 16px;
      .title {

        color: #333333;
        font-weight: 500;
        font-size: 24px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top:59px
      }
      .kuang {
        width: 406px;
        height: 48px;
        border: 1px solid #C8C8C8;
        border-radius: 4px;
        position: absolute;
        left: 48px;
        img {
          margin: 0 0px 0 10px;
        }
        &.ps1 {

          top:133px ;
        }
        &.ps2 {

          top:217px ;
        }

      }
      .forgetmm {
        position: absolute;
        right: 48px;
        top: 281px;
        font-size: 18px;
        line-height: 18px;
        /* identical to box height, or 100% */
        font-family: Source Han Sans CN;

        /* primary */

        color: #0049FF;
      }
      .submit {
        background: #0049FF;
        border-radius: 4px;
        width: 406px;
        height: 48px;
        position: absolute;
        left: 48px;
        bottom: 73px;
        font-size: 18px;
        color: #FFFFFF;
        cursor: pointer;
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
    /deep/.el-input__inner {
      height: 48px;
      font-size: 18px;
      line-height: 34px;
      background: transparent;
      color: #333333;
      border:none;

    }
  }
</style>
