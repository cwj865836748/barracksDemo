<template>
  <div id="bullet" style="width: 450px;height:260px;"></div>

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
        // legend: {
        //   data: ['安全率', '隐患率'],
        //   textStyle: {
        //     color: ['#33B1FF', '#FF2756'],
        //     fontSize: 12
        //   },
        //   padding: [
        //     15, 20
        //   ],
        //   itemGap: 24,
        //   itemWidth: 11,
        //   itemHeight: 11,
        //   right: 20,
        //   formatter: (name) => {
        //     return name + '%'
        //   }
        // },
        legend: {
          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          orient: 'horizontal',
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          right: 40,
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          top: 20,
          icon: 'circle', //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none

          itemWidth: 10, // 设置宽度

          itemHeight: 10, // 设置高度

          itemGap: 30, // 设置间距,
          data: ['武器库开门', '入库枪支', '出库枪支'],
          textStyle: {
            color: ['#0FEA8A', '#33B1FF', '#FF2756'],
            fontSize: 12
          }
        },

        xAxis: [{
          type: 'category',
          nameGap: 15,
          boundaryGap: true,
          data: ['A库房', 'B库房'],
          axisLabel: {
            textStyle: {
              // 文字样式
              color: '#FFFFFF',
              fontSize: 14,
              padding: [4, 0]
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

              },
              formatter: function (value) {
                var texts = []
                if (value === 10) {
                  texts.push(10)
                } else if (value === 20) {
                  texts.push(20)
                } else if (value === 30) {
                  texts.push(30)
                } else if (value === 40) {
                  texts.push(40)
                } else if (value === 50) {
                  texts.push(50)
                } else if (value === 0) {
                  texts.push(0)
                }
                return texts
              }
            }
          }
        ],
        series: [
          {
            name: '武器库开门',
            type: 'bar',
            data: [4, 2],
            barWidth: 12,
            barGap: '100%',
            color: '#0FEA8A',
            itemStyle: {
              normal: {
                label: {
                  show: true, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: { // 数值样式
                    color: '#fff',
                    fontSize: 9
                  },
                  formatter: '{c}'
                }
              }
            }
          },
          {
            name: '入库枪支',
            type: 'bar',
            data: [10, 41],
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
                  formatter: '{c}'
                }
              }
            }
          },
          {
            name: '出库枪支',
            type: 'bar',
            data: [18, 41],
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
                  formatter: '{c}'
                }
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    const myChart = this.$echarts.init(document.getElementById('bullet')) // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option)
  }
}
</script>

<style scoped>

</style>
