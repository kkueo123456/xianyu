<template>
  <div class="wrap">
    <el-button type="text" @click="willdel(delId)" style="color:red">禁用</el-button>
  </div>
</template>
<script>
import API from "../../util/api";
export default {
  props: ["delId"],
  components: {},
  data() {
    return {};
  },
  methods: {
    willdel(id) {
      this.$confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: API.delAdmin,
            method: "post",
            params: {
              adminId: id,
            },
          }).then((res) => {
            res.Status == "y"
              ? this.$message({
                  type: "success",
                  message: res.Msg,
                })
              : this.$message({
                  type: "error",
                  message: res.Msg,
                });
            this.$emit("changeList");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="stylus" scoped>
.wrap {
  display: inline-block;
}
</style>