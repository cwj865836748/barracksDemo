<template>
  <div id="lineEcharts" style="width: 400px;height:260px;"></div>

</template>

<script>
export default {
  name: 'brokenLine',
  data () {
    return {
      option: {


        legend: {
          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          orient: 'horizontal',
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: 'right',
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: 'top',
          data: ['外来车辆', '单位车辆', '单位车辆故障']
        },

        // //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
        // grid: {
        //   top: '16%', // 等价于 y: '16%'
        //   left: '3%',
        //   right: '8%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              // 设置x轴颜色
              color: '#0060FF'
            }
          },
          // 设置X轴数据旋转倾斜
          axisLabel: {
            rotate: 90, // 旋转角度
            interval: 0 // 设置X轴数据间隔几个显示一个，为0表示都显示
          },
          // boundaryGap值为false的时候，折线第一个点在y轴上
          boundaryGap: false,
          data: ['01：00', '02：00', '03：00', '06：00', '10：00', '11：00', '24：00']
        },

        yAxis: {
          type: 'value',
          min: 0, // 设置y轴刻度的最小值
          max: 100, // 设置y轴刻度的最大值
          splitNumber: 0, // 设置y轴刻度间隔个数
          axisLine: {
            lineStyle: {
              // 设置y轴颜色
              color: '#0060FF'
            }
          }
        },

        series: [
          {
            name: '外来车辆',
            data: [20, 30, 40, 50, 60, 0, 0],
            type: 'line',
            // 设置小圆点消失
            // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
            symbol: 'none',
            // 设置折线弧度，取值：0-1之间
            smooth: 0.5
          },

          {
            name: '单位车辆',
            data: [30, 40, 50, 60, 70, 80, 0],
            type: 'line',
            // 设置折线上圆点大小
            // symbolSize: 8,
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: false
                }

                // lineStyle: {
                //   width: 5, // 设置线宽
                //
                // }
              }
            }
          },

          {
            name: '单位车辆故障',
            data: [100, 80, 50, 40, 50, 100, 100],
            type: 'line'

          }
        ],

        color: ['#00EE00', '#FF9F7F', '#FFD700']
      }

    }
  },
  mounted () {
    const myChart = this.$echarts.init(document.getElementById('lineEcharts')) // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option)
  }
}
</script>

<style scoped>

</style>
