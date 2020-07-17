<template>
  <div class="head-wrap">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="changeView('evaluate')">
        <el-badge :is-dot="false" class="item">待估价</el-badge>
      </el-menu-item>
      <el-menu-item index="2" @click="changeView('made')">
        <el-badge :is-dot="false" class="item">订单生成</el-badge>
      </el-menu-item>
      <el-menu-item index="3" @click="changeView('test')">
        <el-badge :is-dot="false" class="item">待质检</el-badge>
      </el-menu-item>
      <el-menu-item index="4" @click="changeView('back')">
        <el-badge :is-dot="false" class="item">待退货</el-badge>
      </el-menu-item>
      <el-menu-item index="5" @click="changeView('say')">
        <el-badge :is-dot="false" class="item">待评价</el-badge>
      </el-menu-item>
      <el-menu-item index="6" @click="changeView('success')">
        <el-badge :is-dot="false" class="item">交易完成</el-badge>
      </el-menu-item>
      <el-menu-item index="7" @click="changeView('close')">
        <el-badge :is-dot="false" class="item">交易关闭</el-badge>
      </el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  methods: {
    changeView(id) {
      this.$emit("show", id);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
.head-wrap /deep/ .el-menu-demo {
  display: flex;
  justify-content: space-between;
}

.head-wrap /deep/ .el-badge__content {
  transform: translateY(100%) translateX(150%);
}
</style>