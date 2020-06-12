<template>
  <div id="monthEcharts" style="width: 420px;height:230px;
  margin-top: 10px;margin-right: 20px;"></div>
</template>

<script>
  export default {
    name: 'month',
    data() {
      return {
        option: {
          legend: {
            // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
            orient: 'horizontal',
            // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: 'right',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: 'top',
            data: ['人员', '车辆', '枪支', '设备', '周界']
          },
          // //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
          grid: {
            top: '14%', // 等价于 y: '16%'
            // left: '3%',
            right: '4%',
            // bottom: '3%',
            // containLabel: true
          },
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: '#0060FF'
              }
            },
            splitLine: { // gird区域中的分割线
              show: true, // 是否显示
              lineStyle: {
                color: '#0A2A83'
              }
            },
            // 设置X轴数据旋转倾斜
            axisLabel: {
              rotate: 30, // 旋转角度
              interval: 0 // 设置X轴数据间隔几个显示一个，为0表示都显示
            },
            // boundaryGap值为false的时候，折线第一个点在y轴上
            boundaryGap: false,
            data: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30']
          },
          yAxis: {
            type: 'value',
            min: 0, // 设置y轴刻度的最小值
            max: 250, // 设置y轴刻度的最大值
            splitNumber: 5, // 设置y轴刻度间隔个数
            axisLine: {
              lineStyle: {
                // 设置y轴颜色
                color: '#0060FF'
              }
            },
            splitLine: { // gird区域中的分割线
              show: true, // 是否显示
              lineStyle: {
                color: '#0A2A83'
              }
            },
          },
          series: [
            {
              name: '人员',
              data: [0, 20, 40, 70, 90, 80, 110, 105, 70, 60, 70, 60, 35, 35, 60],
              type: 'line',
              // 设置折线上圆点大小
              symbolSize: 4,
              color: ['#0FEA8A'],
              symbol: 'circle',
              itemStyle: {
                normal: {
                  // 拐点上显示数值
                  label: {
                    show: false
                  },
                  lineStyle: {
                    width: 1,
                    type: 'solid'  //'dotted'虚线 'solid'实线
                  },
                }
              }
            },
            {
              name: '车辆',
              data: [80, 100, 120, 150, 170, 160, 190, 185, 150, 140, 150, 140, 115, 115, 140],
              type: 'line',
              // 设置折线上圆点大小
              symbolSize: 4,
              color: ['#33B1FF'],
              symbol: 'circle',
              itemStyle: {
                normal: {
                  // 拐点上显示数值
                  label: {
                    show: false
                  },
                  lineStyle: {
                    width: 1,
                    type: 'solid'  //'dotted'虚线 'solid'实线
                  },
                }
              }
            },
            {
              name: '枪支',
              data: [60, 80, 100, 130, 150, 140, 170, 165, 130, 120, 130, 120, 95, 95, 120],
              type: 'line',
              // 设置折线上圆点大小
              symbolSize: 4,
              color: ['#FF2756'],
              symbol: 'circle',
              itemStyle: {
                normal: {
                  // 拐点上显示数值
                  label: {
                    show: false
                  },
                  lineStyle: {
                    width: 1,
                    type: 'solid'  //'dotted'虚线 'solid'实线
                  },
                }
              }
            },
            {
              name: '设备',
              data: [40, 60, 80, 110, 130, 120, 150, 145, 110, 100, 110, 100, 75, 75, 100],
              type: 'line',
              // 设置折线上圆点大小
              symbolSize: 4,
              color: ['#FF8C00'],
              symbol: 'circle',
              itemStyle: {
                normal: {
                  // 拐点上显示数值
                  label: {
                    show: false
                  },
                  lineStyle: {
                    width: 1,
                    type: 'solid'  //'dotted'虚线 'solid'实线
                  },
                }
              }
            },
            {
              name: '周界',
              data: [20, 40, 60, 90, 110, 100, 130, 125, 90, 80, 90, 80, 55, 55, 80],
              type: 'line',
              // 设置折线上圆点大小
              symbolSize: 4,
              color: ['#9B6BFF'],
              symbol: 'circle',
              itemStyle: {
                normal: {
                  // 拐点上显示数值
                  label: {
                    show: false
                  },
                  lineStyle: {
                    width: 1,
                    type: 'solid'  //'dotted'虚线 'solid'实线
                  },
                }
              }
            },

          ],
          color: ['#0FEA8A', '#33B1FF', '#FF2756', '#FF8C00', '#9B6BFF']
        }
      }
    },
    mounted() {
      const myChart = this.$echarts.init(document.getElementById('monthEcharts')) // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option)
    }
  }
</script>

<style scoped>

</style>
