<template>
  <!-- 待取件(暂时可以和已下单合成一个) -->
  <div class="table">
    <el-table :data="data">
      <el-table-column prop="OrderId" label="订单编号"></el-table-column>
      <el-table-column prop="AdminName" label="管理员"></el-table-column>
      <el-table-column prop="SellerRealName" label="卖家姓名"></el-table-column>
      <el-table-column prop="SellerPhone" label="用户手机"></el-table-column>
      <el-table-column prop="SellerAddress" label="地址"></el-table-column>
      <el-table-column prop="GmtCreate" label="创建时间" sortable></el-table-column>
      <el-table-column prop="ApprizeAmount" label="预估价"></el-table-column>
      <el-table-column prop="ShipTime" label="取件时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="pickUp(scope.row.OrderId)">取件</el-button>
          <el-dialog
            title="输入快递公司单号"
            :visible.sync="pickUpDialog"
            width="30%"
            :append-to-body="true"
          >
            <el-input placeholder="请输入单号" v-model="pickUpInput" clearable></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="pickUpDialog = false">取 消</el-button>
              <el-button type="primary" @click="pickUpDialogSure">确 定</el-button>
            </span>
          </el-dialog>
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
        orderStatus: 1,
        page: 1,
        supCategoryName: "",
      },
      //取件的dialog
      pickUpDialog: false,
      // 取件id
      pickUpId: 0,
      //快递单号输入
      pickUpInput: "",
    };
  },
  methods: {
    //跳页
    jumpPage(val) {
      this.requestData.page = val;
      this.init();
    },
    //取件
    pickUp(id) {
      this.pickUpDialog = true;
      this.pickUpId = id;
    },
    //取件确定
    pickUpDialogSure() {
      if (!this.pickUpInput) {
        this.$message({
          type: "error",
          message: "缺少必填项",
        });
      } else {
        let orderPerformData = {
          orderStatus: "2",
          orderId: this.pickUpId,
          mailNo: this.pickUpInput,
        };
        this.$store.dispatch("getOrderPerform", orderPerformData).then(() => {
          this.pickUpDialog = false;
          this.pickUpInput = "";
          this.init();
        });
      }
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