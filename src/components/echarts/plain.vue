<template>
  <div id="plainEcharts" style="width: 450px;height:260px;"></div>

</template>

<script>
  export default {
    name: 'plain',
    data() {
      return {
        option: {
          //  ------  X轴 ------
          xAxis: {
            show: true, // 是否显示
            position: 'bottom', // x轴的位置
            offset: 0, // x轴相对于默认位置的偏移
            type: 'category', // 轴类型， 默认为 'category'
            nameLocation: 'end', // 轴名称相对位置
            nameTextStyle: { // 坐标轴名称样式
              color: '#0A2A83;',
              padding: [5, 0, 0, -5]
            },
            nameGap: 15, // 坐标轴名称与轴线之间的距离
            nameRotate: 0, // 坐标轴名字旋转

            axisLabel: { // 坐标轴标签
              show: true, // 是否显示
              inside: false, // 是否朝内
              rotate: 0, // 旋转角度
              margin: 5, // 刻度标签与轴线之间的距离
              color: '#fff' // 默认取轴线的颜色
            },
            data: ['人员管理', '车辆管理', '枪支管理', '设备管理']
          },
          //   ------   y轴  ----------
          yAxis: {
            show: true, // 是否显示
            position: 'left', // y轴位置
            offset: 0, // y轴相对于默认位置的偏移
            type: 'value', // 轴类型，默认为 ‘category’
            nameLocation: 'end', // 轴名称相对位置value
            nameTextStyle: { // 坐标轴名称样式
              color: '#fff',
              fontFamily: 'Roboto',
              fontSize: '12px',
              lineHeight: '14px',
              padding: [5, 0, 0, 5] // 坐标轴名称相对位置
            },
            nameGap: 15, // 坐标轴名称与轴线之间的距离
            nameRotate: 270, // 坐标轴名字旋转

            axisLabel: { // 坐标轴的标签
              show: true, // 是否显示
              inside: false, // 是否朝内
              rotate: 0, // 旋转角度
              margin: 8, // 刻度标签与轴线之间的距离
              color: '#0060FF' // 默认轴线的颜色
            },
            splitLine: { // gird 区域中的分割线
              show: true, // 是否显示
              lineStyle: {
                color: '#0A2A83',
                width: 1,
                type: 'solid'
              }
            },
            splitArea: { // 网格区域
              show: false // 是否显示，默认为false
            }
          },
          //  -------   内容数据 -------
          series: [
            {
              type: 'bar', // 类型
              legendHoverLink: true, // 是否启用图列 hover 时的联动高亮
              label: { // 图形上的文本标签
                show: false,
                position: 'insideTop', // 相对位置
                rotate: 0, // 旋转角度
                color: '#eee'
              },
              itemStyle: { // 图形的形状
                background: 'linear-gradient(180deg, #72F8FD 0%, #4DA9D2 100%)'
              },
              barWidth: 20, // 柱形的宽度
              barCategoryGap: '20%', // 柱形的间距
              data: [15, 50, 17, 85]
            }
          ]
        }
      }
    },
    mounted() {
      const myChart = this.$echarts.init(document.getElementById('plainEcharts')) // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option)
    }
  }
</script>

<style scoped>

</style>
