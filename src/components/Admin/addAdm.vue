<template>
  <div>
    <el-button type="primary" @click="willAdd">添加管理员</el-button>
    <el-dialog title="添加管理员" :visible.sync="dialogFormVisible" width="35%">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.realName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="form.surePassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input type="phone" v-model="form.phone" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="form.userIde" placeholder="请选择身份">
            <el-option
              v-for="item in roleList"
              :key="item.Id"
              :label="item.RoleName"
              :value="item.Id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Loading } from "element-ui";
import API from "../../util/api";
export default {
  props: [],
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        realName: "",
        password: "",
        surePassword: "",
        userIde: "",
        phone: "",
      },
      roleList: [],
    };
  },
  methods: {
    clear() {
      this.form.name = "";
      this.form.realName = "";
      this.form.password = "";
      this.form.surePassword = "";
      this.form.userIde = "";
    },
    willAdd() {
      this.dialogFormVisible = true;
      this.init();
    },
    sure() {
      let lod = Loading.service({
        text: "数据提交中",
        spinner: "el-icon-loading",
      });
      if (this.form.password !== this.form.surePassword) {
        lod.close();
        this.$message({
          type: "error",
          message: "两次密码不一致",
        });
      } else {
        this.$axios({
          url: API.AdminAdd,
          method: "post",
          params: {
            loginName: this.form.name,
            password: this.form.password,
            realName: this.form.realName,
            roleId: this.form.userIde,
            Mobile: this.form.phone,
          },
        })
          .then((res) => {
            lod.close();
            res.Status == "y";
            if (res.Status == "y") {
              this.dialogFormVisible = false;
              this.$emit("changeList");
              this.clear();
              this.$message({
                type: "success",
                message: res.Msg,
              });
            } else {
              this.$message({
                type: "warning",
                message: res.Msg,
              });
            }
          })
          .catch((err) => {
            lod.close();
            this.$message({
              type: "error",
              message: "错误",
            });
          });
      }
    },
    init() {
      this.$axios({
        url: API.roleList,
        method: "post",
      }).then((res) => {
        this.roleList = res.Data;
      });
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="stylus" scoped></style>