<template>
  <!-- 待退货 -->
  <div class="table">
    <el-table :data="data">
      <el-table-column prop="OrderId" label="订单编号"></el-table-column>
      <el-table-column prop="AdminName" label="管理员"></el-table-column>
      <el-table-column prop="SellerRealName" label="卖家姓名"></el-table-column>
      <el-table-column prop="SellerPhone" label="用户手机"></el-table-column>
      <el-table-column prop="SellerAddress" label="地址"></el-table-column>
      <el-table-column prop="GmtCreate" label="创建时间" sortable></el-table-column>
      <el-table-column prop="ApprizeAmount" label="预估价"></el-table-column>
      <el-table-column prop="ConfirmFee" label="质检价"></el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="back(scope.row.OrderId)" style="color:red">退货</el-button>
          <el-dialog title="输入退货单号" :visible.sync="backDialog" :append-to-body="true">
            <el-form :model="form">
              <!-- <el-form-item label="订单号">
                <el-input v-model="form.orderNum"></el-input>
              </el-form-item>
              <el-form-item label="快递公司">
                <el-input v-model="form.company"></el-input>
              </el-form-item>-->
              <el-form-item label="运单号">
                <el-input v-model="form.WaybillNum"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancleDialog">取 消</el-button>
              <el-button type="primary" @click="backDialogSure">确 定</el-button>
            </div>
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
        orderStatus: 100,
        page: 1,
        supCategoryName: "",
      },
      //存退回的id
      backId: 0,
      //退回传的值
      form: {
        // //快递公司
        // company: "",
        //运单号
        WaybillNum: "",
        // //订单号
        // orderNum: 0,
        // //客户电话
        // customerPhone: "",
      },
      backDialog: false,
      //dialog里输入框长度
      backLabelWidth: 120,
    };
  },
  methods: {
    //跳页
    jumpPage(val) {
      this.requestData.page = val;
      this.init();
    },
    //退回dialog
    back(id) {
      this.backDialog = true;
      this.backId = id;
    },
    //退回取消
    cancleDialog() {
      this.backDialog = false;
      this.clearDialog();
    },
    //退回确定
    backDialogSure() {
      if (
        // this.form.company == "" ||
        this.form.WaybillNum == ""
        // this.form.customerPhone == "" ||
        // this.form.orderNum == ""
      ) {
        this.$message({
          message: "缺少必填信息",
          type: "error",
        });
      } else {
        let orderPerformData = {
          orderStatus: "101",
          mailNo: this.form.WaybillNum,
          orderId: this.backId,
        };
        this.$store.dispatch("getOrderPerform", orderPerformData).then(() => {
          this.backDialog = false;
          this.init();
          this.clearDialog();
        });
      }
    },
    //清空输入框
    clearDialog() {
      this.form = {
        //快递公司
        // company: "",
        //运单号
        WaybillNum: "",
        // //订单号
        // orderNum: null,
        // //客户电话
        // customerPhone: "",
      };
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