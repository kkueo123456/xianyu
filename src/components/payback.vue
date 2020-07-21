<template>
  <!-- 退款组件 -->
  <div class="PayBackWrap">
    <el-button type="text" @click="payBack(payBackId)" style="color:red">退款</el-button>
    <el-dialog title="退款原因" :visible.sync="payBackDialog" width="30%" :append-to-body="true">
      <span slot="footer" class="dialog-footer">
        <el-button @click="payBackDialog = false">取 消</el-button>
        <el-button type="primary" @click="payBackSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["payBackId"],
  components: {},
  data() {
    return {
      //退款dialog
      payBackDialog: false,
      // 退款id
      BackId: 0
    };
  },
  methods: {
    //退款
    payBack(id) {
      this.payBackDialog = true;
      this.BackId = id;
      // this.$emit('changeState')
    },
    payBackSure() {
      console.log(this.BackId);
      this.payBackDialog = false;

      this.$emit("changeState");
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
.PayBackWrap {
  display: inline-block;
}
</style>