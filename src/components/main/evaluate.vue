<template>
  <!-- 待估价 -->
  <div class="table">
    <el-table :data="data">
      <el-table-column prop="QuoteId" label="估价编号"></el-table-column>
      <el-table-column prop="UserId" label="用户id"  ></el-table-column>
      <el-table-column prop="SpuName" label="商品名"  ></el-table-column>
      <el-table-column prop="SupCategoryName" label="商品类型"  ></el-table-column>
      <el-table-column prop="SceneType" label="类别"></el-table-column>
      <el-table-column prop="CreateTime" label="创建时间" sortable></el-table-column>
      <el-table-column label="报价截止">
        <template slot-scope="scope">{{scope.row.TimeLimit|transTime}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <evalDialiog
            :chuanId="scope.row.QuoteId"
            :chuanImg="scope.row.Questionnaire"
            :state="false"
            @changeState="init"
          ></evalDialiog>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <checkPage :pageNum="Pagelist" @jumpPage="jumpPage"></checkPage>
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
    checkPage,
  },
  data() {
    return {
      pageN: 1,
      requestData: {
        IsPrice: 0,
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
      this.$store.dispatch("getEvalData", this.requestData);
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