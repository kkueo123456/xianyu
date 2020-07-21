<template>
<!-- 退款组件 -->
  <div class="PayBackWrap">
    <el-button type="text" @click="payBack(payBackId)" style="color:red">退款</el-button>
  </div>
</template>
<script>
export default {
  props: ['payBackId'],
  components: {},
  data() {
    return {};
  },
  methods: {
    //退款
    payBack(id) {
      this.$confirm("是否退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退款成功!" + id
          });
          this.payBackState = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
        // this.$emit('changeState')
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
.PayBackWrap{
  display inline-block
}
</style>