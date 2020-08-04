<template>
  <!-- 待估价 -->
  <div class="table">
    <el-table :data="data">
      <el-table-column prop="QuoteId" label="估价编号" :span="2"></el-table-column>
      <el-table-column prop="pin" label="商品" :span="2"></el-table-column>
      <el-table-column prop="class" label="类别" :span="2"></el-table-column>
      <!-- <el-table-column prop="user" label="用户" :span="2"></el-table-column> -->
      <el-table-column prop="CreateTime" label="创建时间" sortable :span="2"></el-table-column>
      <el-table-column label="报价截止" :span="2">
        <template slot-scope="scope">{{scope.row.TimeLimit|transTime}}</template>
      </el-table-column>
      <el-table-column prop="Price" label="预估价" :span="2"></el-table-column>
      <el-table-column fixed="right" label="操作" :span="2">
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