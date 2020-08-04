<template>
  <!-- 待质检 -->
  <div class="table">
    <el-table :data="data">
       <el-table-column prop="ApprizeId" label="订单编号" :span="2"></el-table-column>
      <el-table-column prop="pin" label="商品" :span="2"></el-table-column>
      <el-table-column prop="SellerRealName" label="卖家姓名" :span="2"></el-table-column>

      <el-table-column prop="SellerPhone" label="用户手机" :span="2"></el-table-column>
      <el-table-column prop="SellerAddress" label="地址" :span="2"></el-table-column>
      <el-table-column prop="GmtCreate" label="创建时间" :span="2"></el-table-column>
      <el-table-column prop="ApprizeAmount" label="预估价" :span="2"></el-table-column>
      <el-table-column prop="ShipTime" label="取件时间" :span="2"></el-table-column>
      <!-- <el-table-column label="调拨日期" :span="2">
        <template slot-scope="scope">{{scope.row.time|timeFilter}}</template>
      </el-table-column>-->
      <el-table-column fixed="right" label="操作" :span="2">
        <template slot-scope="scope">
          <evalDialiog :chuanId="scope.row.OrderId" :state="true" @changeState="init"></evalDialiog>
          <payback :payBackId="scope.row.OrderId" @changeState="init"></payback>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <checkPage :pageNum="Pagelist" @jumpPage="jumpPage"></checkPage>
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
    payback,
  },
  data() {
    return {
      pageN: 0,
      requestData: {
        orderStatus: 2,
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