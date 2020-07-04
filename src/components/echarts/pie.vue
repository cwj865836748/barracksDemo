<template>
  <div style="width: 400px;height:260px;" id="roundEcharts"></div>
</template>

<script>
export default {
  name: 'pie',
  data () {
    return {
      roundOption: {
        title: [
          {
            text: '共出入',
            left: '48.5%',
            top: '35%',
            padding: [14, 0],
            textStyle: {
              color: '#fff',
              fontSize: 18,
              align: 'center',
              fontWeight: 'normal'
            }
          }, {
            text: '143人',
            left: '46.5%',
            top: '44%',
            padding: [15, 0],
            textStyle: {
              color: '#fff',
              fontSize: 26,
              align: 'center',
              fontWeight: 'normal'
            }
          }],
        tooltip: {
          trigger: 'item',
          formatter: ' {b}：{c} '

          // ({d}%)   代表该模块所占圆环比例
          // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // 环形颜色
        color: ['#9B6BFF', '#FF2756', '#FF8C00', '#33B1FF', '#0FEA8A'],
        legend: {
          orient: 'vertical',
          show: false,
          x: 'left',
          data: ['视频广告', '其他']
        },
        // graphic: { // 图形中间文字
        //   type: 'text',
        //   left: '46%',
        //   top: 'center',
        //   style: {
        //     text: '共出入\n70人',
        //     textAlign: 'center',
        //     fill: '#fff',
        //     fontSize: 26
        //   }
        // },
        series: [

          {
            name: '访问来源',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['55%', '50%'],
            labelLine: {
              normal: {
                length: 0,
                length2: 30
              }

            },
            itemStyle: {
              borderWidth: 7,
              borderColor: '#050e28'
            },
            label: {
              normal: {
                // \n\n可让文字居于牵引线上方，很关键
                //  {b}  代表显示的内容标题
                // {c}代表数据
                formatter: '{b|{b}}{c|{c}人}',
                borderWidth: 5,
                borderRadius: 4,

                rich: {
                  c: {
                    fontSize: 14,
                    lineHeight: 18,
                    color: '#fff',
                    padding: [0, 5]
                  },
                  b: {
                    fontSize: 14
                  }
                }
              }
            },
            data: [
              { value: 25, name: '访客' },
              { value: 3, name: '黑名单' },
              { value: 15, name: '其他' },
              { value: 40, name: '军人' },

              { value: 60, name: '内部人员' }
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
