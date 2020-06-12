<template>
  <div id="bulletEcharts" style="width: 420px;height:230px;
  margin-top: 10px;margin-right: 20px;"></div>
</template>

<script>
  export default {
    name: 'bullet',
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
            data: ['应有数量', '在库数量', '实有数量']
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
            max: 5000, // 设置y轴刻度的最大值
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
              name: '应有数量',
              data: [2100, 2600, 3200, 3800, 4200, 4000, 4600, 4400, 3800, 3600, 4000, 3600, 2900, 2900, 3700],
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
                },
              },
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(15, 234, 138,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(15, 234, 138,0)'
                  }])
                }
              },
            },

            {
              name: '在库数量',
              data: [0, 600, 1200, 1800, 2200, 2000, 2600, 2400, 1900, 1600, 2000, 1600, 900, 900, 1700],
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
              },
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#33B1FF'
                  }, {
                    offset: 1,
                    color: 'rgba(51, 177, 255,0)'
                  }])
                }
              },
            },

            {
              name: '实有数量',
              data: [1500, 2100, 2700, 3300, 3700, 3500, 4100, 3900, 3300, 3100, 3500, 3100, 2400, 2400, 3200],
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
                },

              },
              areaStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FF2756'
                  }, {
                    offset: 1,
                    color: 'rgba(255, 39, 86,0)'
                  }])
                }
              },
            },

          ],

          color: ['#33B1FF', '#0FEA8A', '#FF2756']
        }

      }
    },
    mounted() {
      const myChart = this.$echarts.init(document.getElementById('bulletEcharts')) // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option)
    }
  }
</script>

<style scoped>

</style>
