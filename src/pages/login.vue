<template>
  <div class="wrap">
    <div class="con">
      <div class="log">
        <h3>亮橙闲鱼管理</h3>
        <el-form ref="form" :model="form">
          <div class="form-main">
            <span>账号:</span>
            <el-input v-model="form.name" placeholder="请输入账号"></el-input>
          </div>
          <div class="form-main">
            <span>密码:</span>
            <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
          </div>
          <div class="form-button">
            <el-button type="primary" @click="login">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      form: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.form.name == "" || this.form.password == ""
        ? this.$message({ message: "请输入账号或密码", type: "error" })
        : this.push();
      // if (this.form.name == "" || this.form.password == "") {
      //   this.$message({
      //     message: "请输入账号或密码",
      //     type: "error"
      //   });
      // } else {
      //   this.$router.push("/index");
      // }
    },
    push() {
      this.$router.push("/index");
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';

.wrap {
  width: 100vw;
  height: 100vh;
  background: url('../assets/img/login.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
}

// 背景
.con {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

// 登录框
.log {
  width: 450px;
  height: 250px;
  background-color: #f5f5f5;
  border-radius: 25px;
  padding: 25px;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.log h3 {
  text-align: center;
  font-size: 25px;
  margin-bottom: 25px;
}

.form-main {
  display: flex;
  justify-content: space-around;
  margin-bottom: 25px;
}

.form-main span {
  font-size: 18px;
  line-height: 40px;
}

.form-main /deep/ .el-input {
  width: 80%;
}

// 按钮
.form-button {
  width: 100%;
  text-align: center;
}

.form-button >>> .el-button--primary {
  background-color: #333;
  border-color: #333;
}
</style>