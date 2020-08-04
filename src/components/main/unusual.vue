<template>
  <!-- 取消的订单 -->
  <div class="table">
    <el-table :data="data">
      <el-table-column prop="ApprizeId" label="订单编号" :span="2"></el-table-column>
      <el-table-column prop="pin" label="商品" :span="2"></el-table-column>
      <el-table-column prop="SellerRealName" label="卖家姓名" :span="2"></el-table-column>
      <el-table-column prop="SellerPhone" label="用户手机" :span="2"></el-table-column>
      <el-table-column prop="SellerAddress" label="地址" :span="2"></el-table-column>
      <el-table-column prop="GmtCreate" label="创建时间" :span="2"></el-table-column>
      <el-table-column prop="ApprizeAmount" label="预估价" :span="2"></el-table-column>
      <el-table-column prop="ConfirmFee" label="质检价" :span="2"></el-table-column>

      <!-- <el-table-column label="调拨日期" :span="2">
        <template slot-scope="scope">{{scope.row.time|timeFilter}}</template>
      </el-table-column>-->
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
      requestData: {
        orderStatus: 103,
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