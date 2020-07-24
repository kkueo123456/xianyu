<template>
  <!-- 已付款/待取件 -->
  <div class="table">
    <el-table :data="data">
      <el-table-column prop="num" label="订单编号" :span="2"></el-table-column>
      <el-table-column prop="pin" label="品牌" :span="2"></el-table-column>
      <el-table-column prop="class" label="类别" :span="2"></el-table-column>
      <el-table-column prop="user" label="用户" :span="2"></el-table-column>
      <el-table-column prop="time" label="创建时间" :span="2"></el-table-column>
      <el-table-column prop="price" label="预估价" :span="2"></el-table-column>
      <el-table-column prop="state" label="订单状态" :span="2"></el-table-column>
      <!-- <el-table-column label="调拨日期" :span="2">
        <template slot-scope="scope">{{scope.row.time|timeFilter}}</template>
      </el-table-column>-->
      <el-table-column fixed="right" label="操作" :span="2">
        <template slot-scope="scope">
          <el-button type="text" @click="pickUp(scope.row.id)">取件</el-button>
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
    payback
  },
  data() {
    return {
      pageN: 0,
      requestData: {
        type: "",
        state: "paid"
      }
    };
  },
  methods: {
    //跳页
    jumpPage(val) {
      console.log(val);
    },
    //取件
    pickUp(id) {
      this.$confirm("确认取件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "取件成功!" + id
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
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
        // let routeName = this.$route.name;
        // this.requestData.type =
        //   (routeName == "jewelry" && "jewelry") ||
        //   (routeName == "bags" && "bags") ||
        //   (routeName == "watch" && "watch") ||
        //   (routeName == "another" && "another");
    }
  },
  mounted() {
    this.init();
  },
  watch: {},
  computed: {
    ...mapGetters(["data"])
  }
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