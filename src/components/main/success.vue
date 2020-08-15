<template>
  <!-- 交易成功 -->
  <div class="table">
    <el-table :data="data">
      <el-table-column prop="OrderId" label="订单编号" :span="2"></el-table-column>
      <el-table-column prop="AdminName" label="管理员" :span="2"></el-table-column>
      <el-table-column prop="SellerRealName" label="卖家姓名" :span="2"></el-table-column>
      
      <el-table-column prop="SellerPhone" label="用户手机" :span="2"></el-table-column>
      <el-table-column prop="SellerAddress" label="地址" :span="2"></el-table-column>
      <el-table-column prop="GmtCreate" label="创建时间" :span="2" sortable></el-table-column>
      <el-table-column prop="ConfirmFee" label="质检价" :span="2"></el-table-column>
      <el-table-column label="评价状态" :span="2">
        <template
          slot-scope="scope"
        >{{scope.row.OrderStatus==5&&'待卖家评价'||scope.row.OrderStatus==6&&'待评价'||scope.row.OrderStatus==7&&'评价完成'}}</template>
      </el-table-column>
      <el-table-column prop="RateContent" label="评价内容" :span="2"></el-table-column>
      <el-table-column fixed="right" label="操作" :span="2">
        <template slot-scope="scope">
          <el-button type="text" @click="say(scope.row.OrderId)" v-if="scope.row.OrderStatus==6">评价</el-button>
          <el-dialog title="输入评价" :visible.sync="sayDialog" width="30%" :append-to-body="true">
            <el-radio-group v-model="sayRadio" style="margin-bottom:15px">
              <el-radio :label="1">好评</el-radio>
              <el-radio :label="2">中评</el-radio>
            </el-radio-group>
            <el-input
              type="textarea"
              placeholder="请输入评价"
              v-model="sayMain"
              maxlength="50"
              show-word-limit
            ></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="sayDialog = false">取 消</el-button>
              <el-button type="primary" @click="sayDialogSure">确 定</el-button>
            </span>
          </el-dialog>
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
export default {
  props: [],
  components: {
    checkPage,
  },
  data() {
    return {
      pageN: 0,
      requestData: {
        orderStatus: "5",
        page: 1,
        supCategoryName: "",
      },
      //评价的dialog
      sayDialog: false,
      // 评价内容
      sayMain: "",
      sayId: 0,
      //评价选框
      sayRadio: 1,
    };
  },
  methods: {
    //跳页
    jumpPage(val) {
      this.requestData.page = val;
      this.init();
    },
    //评价的dialog
    say(id) {
      this.sayDialog = true;
      this.sayId = id;
    },
    sayDialogSure() {
      if (!this.sayMain) {
        this.$message({
          type: "error",
          message: "缺少必填参数",
        });
      } else {
        let orderPerformData = {
          orderStatus: "7",
          orderId: this.sayId,
          rateContent: this.sayMain,
          rateGrade: this.sayRadio,
        };
        this.$store
          .dispatch("getOrderPerform", orderPerformData)
          .then((res) => {
            this.sayDialog = false;
            this.sayMain = "";
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