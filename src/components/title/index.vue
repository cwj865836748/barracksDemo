<template>
  <div class="zy-common-header" :class="[type==2?'big':'']">
    <div class="title flex-x-between">
      <span>{{text}}</span>
      <span>{{leftTitle}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    text: String,
    type: {
      type: Number,
      default: 1
    },
    leftTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
  .zy-common-header {
    height: 50px;
    background: url("../../assets/images/chr.png") no-repeat;
    background-position: center bottom;

    &.big {
      background: url("../../assets/images/chr2.png") no-repeat;
      background-position: center bottom;
    }
    .title {
      font-size: 24px;
      line-height: 50px;
      padding: 0 25px;
      color: #ffffff;
      opacity: 1;
      span:last-child {
        font-size: 18px;
        letter-spacing: 0.15em;
      }

    }
  }
</style>
