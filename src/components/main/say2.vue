<template>
  <!-- 交易完成 -->
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
      <el-button type="text" @click="say(scope.row.id)">评价</el-button>
      <el-dialog title="输入评价" :visible.sync="sayDialog" width="30%" :append-to-body="true">
        <el-input type="textarea" :rows="2" placeholder="请输入评价" v-model="sayMain"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="sayDialog = false">取 消</el-button>
          <el-button type="primary" @click="sayDialogSure">确 定</el-button>
        </span>
      </el-dialog>
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
      }
    };
  },
  methods: {
    //跳页
    jumpPage(val) {
      console.log(val);
    },
    say(id){

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