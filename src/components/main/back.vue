<template>
  <!-- 待估价 -->
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
          <el-button type="text" @click="back(scope.row.id)" style="color:red">退货</el-button>
          <el-dialog title="收货地址" :visible.sync="backDialog" :append-to-body="true">
            <el-form :model="form">
              <el-form-item label="订单号">
                <el-input v-model="form.orderNum"></el-input>
              </el-form-item>
              <el-form-item label="快递公司">
                <el-input v-model="form.company"></el-input>
              </el-form-item>
              <el-form-item label="运单号">
                <el-input v-model="form.WaybillNum"></el-input>
              </el-form-item>
              <el-form-item label="客户电话">
                <el-input v-model="form.customerPhone" type="phone"></el-input>
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
    <checkPage :pageNum="pageN" @jumpPage="jumpPage"></checkPage>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import checkPage from "../checkPage";
export default {
  props: [],
  components: {
    checkPage
  },
  data() {
    return {
      pageN: 0,
      requestData: {
        type: "",
        state: "gujia"
      },
      //存退回的id
      backId: 0,
      //退回传的值
      form: {
        //快递公司
        company: "",
        //运单号
        WaybillNum: "",
        //订单号
        orderNum: 0,
        //客户电话
        customerPhone: ""
      },
      backDialog: false,
      //dialog里输入框长度
      backLabelWidth: 120
    };
  },
  methods: {
    //跳页
    jumpPage(val) {
      console.log(val);
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
        this.form.company == "" ||
        this.form.WaybillNum == "" ||
        this.form.customerPhone == "" ||
        this.form.orderNum == ""
      ) {
        this.$message({
          message: "缺少必填信息",
          type: "error"
        });
      } else {
        this.backDialog = false;
        this.$message({
          message: "提交成功",
          type: "success"
        });
        this.clearDialog();
      }
    },
    //清空输入框
    clearDialog() {
      this.form = {
        //快递公司
        company: "",
        //运单号
        WaybillNum: "",
        //订单号
        orderNum: null,
        //客户电话
        customerPhone: ""
      };
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