<template>
  <div id="brokenLine" style="width: 450px;height:260px;"></div>

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
        grid: {

          y: 30,
          x2: 5,
          y2: 70,
          borderWidth: 1
        },
        xAxis: [{
          type: 'category',
          nameGap: 15,
          boundaryGap: true,
          data: ['军人车辆', '内部车辆', '访客车辆', '其他车辆', '黑名单车辆'],
          axisLabel: {
            interval: 0,
            textStyle: {
              // 文字样式
              color: '#FFFFFF',
              fontSize: '14',
              padding: [4, 4]
            },
            formatter: function (params) {
              var newParamsName = ''
              var paramsNameNumber = params.length
              var provideNumber = paramsNameNumber === 4 ? 2 : 3 // 一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ''
                  var start = p * provideNumber
                  var end = start + provideNumber
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
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
                color: '#0060FF',
                fontSize: 12
              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            data: [30, 40, 81, 50, 2],
            barWidth: 16,
            barGap: '100%',

            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#33B1FF', '#0FEA8A', '#9B6BFF', '#FF8C00', '#FF2756']
                  return colorList[params.dataIndex]
                },

                label: {
                  show: true, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: { // 数值样式
                    color: '#fff',
                    fontSize: 9
                  },
                  formatter: '{c}辆'
                }
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    const myChart = this.$echarts.init(document.getElementById('brokenLine')) // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option)
  }
}
</script>

<style scoped>

</style>
