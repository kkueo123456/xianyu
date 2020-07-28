<template>
  <!-- 已下单 -->
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
          <el-button type="text" @click="cancel(scope.row.BizOrderId)" style="color:red">取消订单</el-button>
          <el-dialog title="填写原因" :visible.sync="cancelDialog" width="30%" :append-to-body="true">
            <el-input placeholder="请输入原因" v-model="cancelInput" clearable></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancelDialog = false">取 消</el-button>
              <el-button type="primary" @click="cancelSure">确 定</el-button>
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
        orderStatus: 1,
        page: 1,
      },
      // 取消的dialog
      cancelDialog: false,
      //取消的id
      cancelId: 0,
      //取消的填写原因,
      cancelInput: "",
    };
  },
  methods: {
    //跳页
    jumpPage(val) {
      this.requestData.page = val;
      this.init()
    },

    //取消订单
    cancel(id) {
      this.cancelDialog = true;
      this.cancelId = id;
    },
    //取消订单确认
    cancelSure() {
      if (!this.cancelInput) {
        this.$message({
          type: "error",
          message: "缺少必填项",
        });
      } else {
        this.cancelDialog = false;
        let orderPerformData = {
          orderStatus: "103",
          reason: this.cancelInput,
          orderId: this.cancelId,
        };
        this.$store.dispatch("getOrderPerform", orderPerformData);
        this.init();
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