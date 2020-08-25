<template>
  <!-- 导出excel -->
  <div>
    <el-button @click="WillOutPut(outPutData)" type="primary" class="outExcel">导出表格</el-button>
  </div>
</template>
<script>
export default {
  props: ["outPutData"],
  components: {},
  data() {
    return {
      Datalist: null,
    };
  },
  methods: {
    WillOutPut(val) {
      this.$confirm("确认导出表格?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Datalist = val;
          this.outPutSure();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    outPutSure() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel"); //注意这个Export2Excel路径
        const tHeader = [
          "订单编号",
          "估价",
          "质检价",
          "操作人",
          "卖家姓名",
          "卖家地址",
          "卖家手机",
          "创建时间",
          "商品类型",
          "商品名称",
          "物流单号",
        ]; // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "OrderId",
          "ApprizeAmount",
          "ConfirmFee",
          "AdminName",
          "SellerRealName",
          "SellerAddress",
          "SellerPhone",
          "GmtCreate",
          "SupCategoryName",
          "SpuName",
          "MailNo",
        ]; // 上面的index、nickName、name是tableData里对象的属性key值
        const list = this.Datalist; //把要导出的数据tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "导出的excel"); //最后一个是表名字
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="stylus" scoped>
.outExcel {
  margin-right: 10px;
}
</style>