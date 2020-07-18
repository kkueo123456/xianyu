<template>
  <div class="headWrap">
    <div class="headSpace">
      <div class="headSpace-left">
        <h3>亮橙珍品科技有限公司</h3>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item) in $route.meta" :key="item.name">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="headSpace-right">
        <div>
          <el-dropdown @command="logOut">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <el-dropdown-menu>
              <el-dropdown-item>登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
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
  methods: {
    logOut() {
      console.log("登出");
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
.headWrap .headSpace {
  padding: 10px 10px;
  background-color: white;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.headWrap .headSpace h3 {
  font-size: 20px;
  margin-bottom: 5px;
}

.headSpace-right {
  display: flex;
  padding-right: 30px;
}
</style>