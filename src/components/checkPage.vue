<template>
  <!-- 分页组件 -->
  <div class="fenye">
    <el-pagination
      background
      layout="prev, pager, next,jumper"
      :total="page"
      :page-size="1"
      class="pageButton"
      :current-page.sync="currentPage3"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: ["pageNum"],
  components: {},
  data() {
    return {
      currentPage3: 1,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("jumpPage", val);
    },
  },
  mounted() {},
  watch: {},
  computed: {
    page() {
      return Math.ceil(this.pageNum / 10);
    },
  },
};
</script>
<style scoped>
.fenye {
  text-align: center;
  padding-top: 10%;
}
</style>
