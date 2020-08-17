<template>
  <!-- 待客户确认 -->
  <div class="table">
    <el-table :data="finData">
      <el-table-column prop="QuoteId" label="估价编号"></el-table-column>
      <!-- <el-table-column prop="user" label="用户"  ></el-table-column> -->
      <el-table-column label="创建时间" prop="CreateTime" sortable></el-table-column>
      <el-table-column prop="Price" label="预估价"></el-table-column>
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
    finData() {
      let fin = this.data.filter((item) => {
        return item.isOrder == 0;
      });
      return fin;
    },
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