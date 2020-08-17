<template>
  <!-- 标题及头像 -->
  <div class="headWrap">
    <div class="headSpace">
      <div class="headSpace-left">
        <h3>亮橙珍品科技有限公司</h3>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item) in $route.meta" :key="item.name">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="headSpace-right">
        <span>welcome：{{name}}</span>
        <a href="http://192.168.31.99:8010/Auth/Refresh" class="shouquan" @click="auth">点击授权</a>
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
import API from "../util/api";
export default {
  props: [],
  components: {},
  data() {
    return {
      name: "",
    };
  },
  methods: {
    logOut() {
      this.$axios({
        url: API.logOut,
        method: "get",
      })
        .then((res) => {
          if (res.Status == "y") {
            this.$message({
              message: res.Msg,
              type: "success",
            });
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          this.$message({
            message: err.Msg,
            type: "success",
          });
        });
    },
    //授权
    auth() {},
  },
  mounted() {
    let getName = sessionStorage.getItem("name");
    this.name = getName;
  },
  watch: {},
  computed: {},
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

.headSpace-right span {
  margin-right: 20px;
  font-size: 13px;
  line-height: 45px;
}

.headSpace-right {
  display: flex;
}

.shouquan {
  display: flex;
  font-size: 12px;
  cursor: pointer;
  margin-right: 10px;
  color: #409EFF;
  align-items: center;
}
</style>