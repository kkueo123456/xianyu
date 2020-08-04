<template>
  <!-- 待关闭的订单 -->
  <div class="table">
    <el-table :data="data">
      <el-table-column prop="ApprizeId" label="订单编号" :span="2"></el-table-column>
      <el-table-column prop="pin" label="品牌" :span="2"></el-table-column>
      <el-table-column prop="SellerPhone" label="用户手机" :span="2"></el-table-column>
      <el-table-column prop="SellerAddress" label="地址" :span="2"></el-table-column>
      <el-table-column prop="GmtCreate" label="创建时间" :span="2"></el-table-column>
      <el-table-column prop="ApprizeAmount" label="预估价" :span="2"></el-table-column>

      <el-table-column label="操作" :span="2">
        <template slot-scope="scope">
          <!-- <evalDialiog
            :chuanId="scope.row.OrderId"
            @changeState="init"
            :hasTest="true"
          ></evalDialiog>-->
          <el-button type="text" @click="sure(scope.row.OrderId)" style="color:red">确认订单</el-button>
        </template>
      </el-table-column>
      <!-- 分页 -->
      <checkPage :pageNum="Pagelist" @jumpPage="jumpPage"></checkPage>
    </el-table>
  </div>
</template>
<script>
import API from "../../util/api";
import { mapGetters } from "vuex";
import evalDialiog from "../../components/evalDialog";
import checkPage from "../checkPage";
export default {
  props: [],
  components: {
    evalDialiog,
    checkPage,
  },
  data() {
    return {
      pageN: 1,
      requestData: {
        orderStatus: 4,
        page: 1,
      },
    };
  },
  methods: {
    //跳页
    jumpPage(val) {
      this.requestData.page = val;
      this.init();
    },
    //初始化
    init() {
      this.$store.dispatch("getOrderData", this.requestData);
    },
    //确认
    sure(id) {
      let orderPerformData = {
        orderStatus: "5",
        orderId: id,
      };
      this.$confirm("此操作将确认订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("getOrderPerform", orderPerformData).then(() => {
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
  mounted() {
    this.init();
  },
  watch: {},
  computed: {
    ...mapGetters(["data", "Pagelist"]),
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