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
          <evalDialiog :chuanId="scope.row.id" :state="true" @changeState='init'></evalDialiog>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <checkPage :pageNum="pageN" @jumpPage="jumpPage"></checkPage>
  </div>
</template>
<script>
import API from "../../util/api";

import { mapGetters } from "vuex";
import evalDialiog from "../../components/evalDialog";
import checkPage from "../checkPage";
export default {
  props: [],
  components: {
    evalDialiog,
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
    //初始化
    init() {
      //根据路由名做判断请求什么样的数据
      // 使用短路表达式
      // this.requestData.type =
      //   (this.$route.name == "jewelry" && "jewelry") ||
      //   (this.$route.name == "bags" && "bags") ||
      //   (this.$route.name == "watch" && "watch") ||
      //   (this.$route.name == "another" && "another");
      switch (this.$route.name) {
        case "jewelry":
          this.$store.dispatch("getEvlJewData");
          this.pageN = this.data[0].pageNum;
          this.requestData.type = "jewelry";
          break;
        case "bags":
          this.$store.dispatch("getEvlBagData");
          this.pageN = this.data[0].pageNum;
          this.requestData.type = "bags";
          break;
        case "watch":
          this.$store.dispatch("getEvlWatchData");
          this.pageN = this.data[0].pageNum;
          this.requestData.type = "watch";
          break;
        case "another":
          this.$store.dispatch("getEvlAnotherData");
          this.pageN = this.data[0].pageNum;
          this.requestData.type = "another";
          break;
      }
    }
  },
  mounted() {
    this.init();
    console.log(this.requestData);

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