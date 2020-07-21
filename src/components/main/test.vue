<template>
  <!-- 待质检 -->
  <div class="table">
    <el-table :data="data">
      <el-table-column prop="num" label="订单编号" :span="2"></el-table-column>
      <el-table-column prop="pin" label="品牌" :span="2"></el-table-column>
      <el-table-column prop="class" label="类别" :span="2"></el-table-column>
      <el-table-column prop="user" label="用户" :span="2"></el-table-column>
      <el-table-column prop="time" label="创建时间" :span="2"></el-table-column>
      <el-table-column prop="price" label="预估价" :span="2"></el-table-column>
      <el-table-column prop="state" label="订单状态" :span="2" :sortable="false"></el-table-column>
      <!-- <el-table-column label="调拨日期" :span="2">
        <template slot-scope="scope">{{scope.row.time|timeFilter}}</template>
      </el-table-column>-->
      <el-table-column fixed="right" label="操作" :span="2">
        <template slot-scope="scope">
          <evalDialiog :chuanId="scope.row.id" :state="false" @changeState='init'></evalDialiog>
          <payback :payBackId="scope.row.id" @changeState="init"></payback>
          <el-button type="text" style="color:red" @click="moneyBack(scope.row.id)">退货退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <checkPage :pageNum="pageN" @jumpPage="jumpPage"></checkPage>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import evalDialiog from "../../components/evalDialog";
import checkPage from "../checkPage";
import payback from "../payback";
export default {
  props: [],
  components: {
    evalDialiog,
    checkPage,
    payback
  },
  data() {
    return {
      pageN: 0,
      requestData: {
        type: "",
        state: "zhijian"
      }
    };
  },
  methods: {
    //跳页
    jumpPage(val) {
      console.log(val);
    },
    //退货退款
    moneyBack(id) {
      this.$confirm("是否退货退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "确认退货退款!" + id
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
      // this.$store.dispatch("",this.requestData);
    }
  },
  mounted() {
    this.init();
    console.log(this.requestData);
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