<template>
  <!-- 异常订单 -->
  <div class="table">
    <el-table :data="data">
      <el-table-column prop="num" label="订单编号" :span="2"></el-table-column>
      <el-table-column prop="pin" label="品牌" :span="2"></el-table-column>
      <el-table-column prop="class" label="类别" :span="2"></el-table-column>
      <el-table-column prop="user" label="用户" :span="2"></el-table-column>
      <el-table-column prop="time" label="创建时间" :span="2"></el-table-column>
      <el-table-column prop="price" label="预估价" :span="2"></el-table-column>
      <el-table-column prop="state" label="订单状态" :span="2" :sortable="false"></el-table-column>
      <!-- <el-table-column label="调拨日期" :span="2">
        <template slot-scope="scope">{{scope.row.time|timeFilter}}</template>
      </el-table-column>-->
      <el-table-column fixed="right" label="操作" :span="2">
        <template slot-scope="scope">
          <el-button type="text" @click="change(scope.row.id)">修改原因</el-button>
          <el-dialog title="修改退款原因" :visible.sync="changeDialog" width="30%" :append-to-body="true">
            <span slot="footer" class="dialog-footer">
              <el-button @click="changeDialog = false">取 消</el-button>
              <el-button type="primary" @click="changeDialogSure">确 定</el-button>
            </span>
          </el-dialog>
          <el-button type="text" @click="cancel(scope.row.id)">撤销</el-button>
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
      //修改的dialog
      changeDialog: false,
      //修改的id
      changeDialogId: 0
    };
  },
  methods: {
    //跳页
    jumpPage(val) {
      console.log(val);
    },
    //撤销
    cancel(id) {
      this.$confirm("是否撤销?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "确认撤销!" + id
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //修改原因
    change(id) {
      this.changeDialogId = id;
      this.changeDialog = true;
    },
    //确定修改
    changeDialogSure() {
      this.changeDialog = false;
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