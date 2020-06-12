<template>
  <div id="plainEcharts" style="width: 450px;height:260px;"></div>

</template>

<script>
export default {
  name: 'plain',
  data () {
    return {
      option: {
        tooltip: {
          trigger: 'axis'
        },

        // 图例
        legend: {
          data: ['安全率', '隐患率'],
          textStyle: {
            color: ['#33B1FF', '#FF2756'],
            fontSize: 12
          },
          padding: [
            15, 20
          ],
          itemGap: 24,
          itemWidth: 11,
          itemHeight: 11,
          right: 20,
          formatter: (name) => {
            return name + '%'
          }
        },

        xAxis: [{
          type: 'category',
          nameGap: 15,
          boundaryGap: true,
          data: ['人员', '车辆', '枪支', '设备', '周界'],
          axisLabel: {
            textStyle: {
              // 文字样式
              color: '#FFFFFF',
              fontSize: '14'
            }
          },

          axisLine: {
            lineStyle: {
              color: '#0A2A83' // 左边线的颜色
            }
          },
          axisTick: {
            show: false
          }

        }],

        yAxis: [
          {
            type: 'value',
            nameGap: 15,
            boundaryGap: true,
            axisLine: {
              show: false
            },
            splitLine: { // gird区域中的分割线
              show: true, // 是否显示
              lineStyle: {
                color: '#0A2A83'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#0A2A83',
                fontSize: 12,
                fontWeight: 600
              }
            }
          }
        ],
        series: [
          {
            name: '安全率',
            type: 'bar',
            data: [80, 35, 90, 50, 25],
            barWidth: 12,
            barGap: '100%',
            color: '#33B1FF',
            itemStyle: {
              normal: {
                label: {
                  show: true, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: { // 数值样式
                    color: '#fff',
                    fontSize: 9
                  },
                  formatter: '{c}%'
                }
              }
            }
          },
          {
            name: '隐患率',
            type: 'bar',
            data: [20, 65, 10, 50, 75],
            barWidth: 12,
            barGap: '100%',
            color: '#FF2756',
            itemStyle: {
              normal: {
                label: {
                  show: true, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: { // 数值样式
                    color: '#fff',
                    fontSize: 9
                  },
                  formatter: '{c}%'
                }
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    const myChart = this.$echarts.init(document.getElementById('plainEcharts')) // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option)
  }
}
</script>

<style scoped>

</style>
