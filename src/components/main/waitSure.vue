<template>
  <!-- 待客户确认 -->
  <div class="table">
    <el-table :data="data" >
      <el-table-column prop="QuoteId" label="估价编号" :span="2" ></el-table-column>
      <el-table-column prop="pin" label="品牌" :span="2"></el-table-column>
      <el-table-column prop="class" label="类别" :span="2"></el-table-column>
      <!-- <el-table-column prop="user" label="用户" :span="2"></el-table-column> -->
      <el-table-column label="创建时间" prop="CreateTime" :span="2" sortable>
      </el-table-column>
      <el-table-column prop="Price" label="预估价" :span="2"></el-table-column>
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
        IsPrice: 1,
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