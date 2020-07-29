<template>
  <!-- 待取件 -->
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
          <el-button type="text" @click="pickUp(scope.row.BizOrderId)">取件</el-button>
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
          <payback :payBackId="scope.row.Id" @changeState="init"></payback>
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
        this.$store.dispatch("getOrderPerform", this.requestData).then(() => {
          this.pickUpDialog = false;
          this.init();
        });
      }
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