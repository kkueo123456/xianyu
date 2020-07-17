<template>
  <div class="headWrap">
    <div class="headSpace">
      <h3>亮橙珍品科技有限公司</h3>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item) in $route.meta" :key="item.name">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
  },
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
.headWrap .headSpace {
  padding: 10px 10px;
  background-color: white;
  margin-bottom: 10px;
}

.headWrap .headSpace h3 {
  font-size: 20px;
  margin-bottom 5px
}
</style>