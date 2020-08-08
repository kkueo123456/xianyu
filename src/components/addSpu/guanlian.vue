<template>
<!-- 关联 -->
  <div>
    <el-popover placement="top" width="160" v-model="guanlianDialog">
      <p>确认关联？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="guanlianDialog=false">取消</el-button>
        <el-button type="primary" size="mini" @click="guanlianSure(mubanid,spuId)">确定</el-button>
      </div>
      <el-button slot="reference" type="text">关联</el-button>
    </el-popover>
  </div>
</template>
<script>
import API from "../../util/api";
export default {
  props: ["mubanid", "spuId"],
  components: {},
  data() {
    return {
      // 关联
      guanlianDialog: false,
    };
  },
  methods: {
    //关联
    guanlian() {
      this.guanlianDialog = true;
    },
    //关联确定
    guanlianSure(mubanid, spuid) {
      this.$axios({
        url: API.guanlian,
        method: "post",
        params: {
          spuId: spuid,
          questionnaireId: mubanid,
        },
      }).then((res) => {
        this.guanlianDialog = false;
        res.Status == "y"
          ? this.$message({
              type: "success",
              message: res.Msg,
            })
          : this.$message({
              type: "error",
              message: res.Msg,
            });
      });
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="stylus" scoped></style>