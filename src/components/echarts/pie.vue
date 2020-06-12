<template>
  <div style="width: 400px;height:260px;" id="roundEcharts"></div>
</template>

<script>
export default {
  name: 'pie',
  data () {
    return {
      roundOption: {
        tooltip: {
          trigger: 'item',
          formatter: ' {b}：{c} '

          // ({d}%)   代表该模块所占圆环比例
          // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // 环形颜色
        color: ['#FF2756', '#33B1FF'],
        legend: {
          orient: 'vertical',
          show: false,
          x: 'left',
          data: ['视频广告', '其他']
        },
        graphic: { // 图形中间文字
          type: 'text',
          left: '46%',
          top: 'center',
          style: {
            text: '共出入\n70人',
            textAlign: 'center',
            fill: '#fff',
            fontSize: 26
          }
        },
        series: [

          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '65%'],
            center: ['55%', '50%'],
            labelLine: {
              normal: {
                length: 20,
                length2: 90
              }

            },

            label: {
              normal: {
                // \n\n可让文字居于牵引线上方，很关键
                //  {b}  代表显示的内容标题
                // {c}代表数据
                formatter: '{c|{c}人}\n{b|{b}}',
                borderWidth: 25,
                borderRadius: 4,
                padding: [0, -95, 50, -95],
                rich: {
                  c: {
                    fontSize: 18,
                    lineHeight: 23,
                    color: '#fff'
                  },
                  b: {
                    fontSize: 14
                  }
                }
              }
            },
            data: [
              { value: 30, name: '外来人员出入' },
              { value: 40, name: '单位人员出入' }
            ]
          }
        ]
      }
    }
  },

  mounted () {
    const myChart = this.$echarts.init(document.getElementById('roundEcharts'))
    // 绘制图表，this.echarts1_option是数据
    myChart.setOption(this.roundOption)
  },
  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>
