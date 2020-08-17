<template>
  <!-- 待收货 -->
  <div class="table">
    <el-table :data="data">
      <el-table-column prop="num" label="订单编号"></el-table-column>
      <el-table-column prop="class" label="类别"></el-table-column>
      <el-table-column prop="user" label="用户"></el-table-column>
      <el-table-column prop="time" label="创建时间" sortable></el-table-column>
      <el-table-column prop="price" label="预估价"></el-table-column>
      <el-table-column prop="state" label="订单状态"></el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="refund(scope.row.id)" :disabled="false">到货</el-button>
          <payback :payBackId="scope.row.id" @changeState="init"></payback>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <checkPage :pageNum="pageN" @jumpPage="jumpPage"></checkPage>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import checkPage from "../checkPage";
import payback from "../payback";

export default {
  props: [],
  components: {
    checkPage,
    payback,
  },
  data() {
    return {
      pageN: 0,
      requestData: {
        type: "",
        state: "delivered",
      },
    };
  },
  methods: {
    //跳页
    jumpPage(val) {
      console.log(val);
    },

    //撤销
    refund(id) {
      this.$confirm("是否撤销退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "确认撤销!" + id,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //初始化
    init() {
      switch (this.$route.name) {
        case "jewelry":
          this.requestData.type = "jewelry";
          break;
        case "bags":
          this.requestData.type = "bags";
          break;
        case "watch":
          this.requestData.type = "watch";
          break;
        case "another":
          this.requestData.type = "another";
          break;
      }
    },
  },
  mounted() {
    this.init();
    console.log(this.requestData);
  },
  watch: {},
  computed: {
    ...mapGetters(["data"]),
  },
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.table /deep/ .cell {
  text-align: center;
}

.table .el-table /deep/ thead {
  color: $primary;
}
</style>