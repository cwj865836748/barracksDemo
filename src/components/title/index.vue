<template>
  <div class="zy-common-header" :class="[type==2?'big':'']">
    <div class="title">
      {{text}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      text: String,
      type: {
        type: Number,
        default: 1
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
    }
  }
</style>
