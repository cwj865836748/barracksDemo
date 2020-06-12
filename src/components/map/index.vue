<template>
  <div class="drag">
    <div class="drag-box">
      <img src="@/assets/images/jq22.png" alt="拖拽图" class="drag-img">
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'index',
  mounted () {
    var drag = $('.drag-img')
    var dragImg = new DragScale(drag, drag)
    // 拖动
    dragImg.drag()
    // 滚轮
    $('.drag-box').on('mousewheel', function () {
      dragImg.scale(0)
    })
  }
}
</script>

<style lang="scss" scoped>
  .drag {
    position: relative;
    width: 100%;
    height: 100%;
    /*margin: auto;*/
    border: 1px solid #4a4a4a;
    overflow: hidden;
    /*background-color: #2d2d2d;*/
  }

  .drag-box {
    position: relative;
  }
  .drag-img {
    position: absolute;
    width: 120%;
  }
</style>
