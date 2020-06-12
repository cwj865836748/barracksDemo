<template>
  <div style="width: 400px;height:260px;" id="roundEcharts"></div>
</template>

<script>
export default {
  name: 'pie',
  data () {
    return {
      roundOption: {
        // // 提示框设置
        // tooltip: {
        //   trigger: 'axis',
        //   formatter: '{a} <br/>{b}: {c} ({d}%)'
        // },
        graphic: {
          type: 'text',
          left: '30%',
          top: 'center',
          style: {
            text: '共出入70人',
            textAlign: 'center',
            fill: '#fff',
            fontSize: 16
          }
        },
        // 图例设置
        legend: {
          orient: 'vertical',
          right: 10,
          bottom: 40,
          itemWidth: 10, // 设置图例图形的宽
          itemHeight: 24, // 设置图例图形的高
          height: 'auto',
          textStyle: {
            color: '#FFF' // 图例文字颜色
          },
          // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
          itemGap: 20,
          data: ['外来人员出入', '单位人员出入']
          // formatter: function (name) {
          //   var index = 0
          //   var labels = ['货车', '小轿车', '设备车', '出行车']
          //   var counts = [12, 7, 18, 13]
          //   labels.forEach((value, i) => {
          //     if (value === name) {
          //       index = i
          //     }
          //   })
          //   return `${name}:${counts[index]}辆`
          // }
        },
        color: ['#F94137', '#33B1FF'],

        series: [
          {
            name: '',
            type: 'pie',
            radius: ['48%', '70%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ['38%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置

            labelLine: {
              show: false
            },
            // label: {
            //   normal: {
            //     position: 'outer', // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
            //     // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
            //     // {a}指series.name  {b}指series.data的name
            //     // {c}指series.data的value  {d}%指这一部分占总数的百分比
            //     formatter: '{b}{d}%'
            //   }
            // },

            // itemStyle: {
            //   borderWidth: 10,
            //   borderColor: '#05032B'
            //   // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
            //   // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
            //   // emphasis: {
            //   //   shadowBlur: 1,
            //   //   shadowOffsetX: 0,
            //   //   shadowColor: 'rgba(30, 144, 255，0.5)'
            //   // }
            // },
            data: [
              { value: 7, name: '外来人员出入' },
              { value: 18, name: '单位人员出入' }
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
