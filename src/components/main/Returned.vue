<template>
  <!-- 已退货 -->
  <div class="table">
    <el-table :data="data">
      <el-table-column prop="OrderId" label="订单编号"></el-table-column>
      <el-table-column prop="AdminName" label="管理员"></el-table-column>
      <el-table-column label="图片(1张)">
        <template slot-scope="scope">
          <img :src="scope.row.Questionnaire|transPic" style="width:50px;height:50px" alt />
        </template>
      </el-table-column>
      <el-table-column prop="SellerRealName" label="卖家姓名"></el-table-column>
      <el-table-column prop="SellerPhone" label="用户手机"></el-table-column>
      <el-table-column prop="SellerAddress" label="地址"></el-table-column>
      <el-table-column prop="GmtCreate" label="创建时间" sortable></el-table-column>
      <el-table-column prop="ApprizeAmount" label="预估价"></el-table-column>
      <el-table-column prop="ConfirmFee" label="质检价"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <checkPage :pageNum="Pagelist" @jumpPage="jumpPage"></checkPage>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import checkPage from "../checkPage";
export default {
  props: [],
  components: {
    checkPage,
  },
  data() {
    return {
      requestData: {
        orderStatus: 101,
        page: 1,
        supCategoryName: "",
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
      let routeName = this.$route.name;
      this.requestData.supCategoryName =
        (routeName == "jewelry" && "首饰") ||
        (routeName == "bags" && "箱包") ||
        (routeName == "watch" && "腕表") ||
        (routeName == "another" && "其他");
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