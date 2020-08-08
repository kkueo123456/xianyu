<template>
  <!-- 退款组件 -->
  <div class="PayBackWrap">
    <!-- <el-button type="text" @click="payBack(payBackId)" style="color:red">退款</el-button> -->
    <el-dialog title="退款原因" :visible.sync="payBackDialog" width="30%" :append-to-body="true">
      <el-input
        type="textarea"
        placeholder="请输入原因"
        v-model="resault"
        maxlength="50"
        show-word-limit
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="payBackDialog = false">取 消</el-button>
        <el-button type="primary" @click="payBackSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import API from "../util/api";
export default {
  props: ["payBackId"],
  components: {},
  data() {
    return {
      //退款dialog
      payBackDialog: false,
      // 退款id
      BackId: 0,
      //原因
      resault: "",
    };
  },
  methods: {
    //退款
    payBack(id) {
      this.payBackDialog = true;
      this.BackId = id;
    },
    payBackSure() {
      this.$axios({
        url: API.RefundApply,
        method: "post",
        params: {
          orderId: this.BackId,
          message: this.resault,
        },
      })
        .then((res) => {
          this.payBackDialog = false;
          res.Status == "y"
            ? this.$message({
                type: "success",
                message: res.Msg,
              })
            : this.$message({
                type: "error",
                message: res.Msg,
              });
          this.$emit("changeState");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="stylus" scoped>
.PayBackWrap {
  display: inline-block;
}
</style>