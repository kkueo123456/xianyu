<template>
  <div class="wrap">
    <el-button type="text" @click="willAdd(lookId)">修改</el-button>
    <el-dialog
      title="修改"
      :visible.sync="dialogFormVisible"
      width="35%"
      :modal-append-to-body="false"
    >
      <el-form :model="data">
        <el-form-item label="用户名">
          <el-input v-model="data.LoginName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="data.RealName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="data.Mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-switch v-model="changePassword" active-text="修改密码"></el-switch>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="data.password"
            autocomplete="off"
            show-password
            :disabled="!changePassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="data.AdminRoleId" placeholder="请选择身份">
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
        <el-button type="primary" @click="sure">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Loading } from "element-ui";
import API from "../../util/api";
export default {
  props: ["lookId"],
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      changePassword: false,
      data: {},
      roleList: [],
      upId: this.lookId,
    };
  },
  methods: {
    clear() {
      this.data.LoginName = "";
      this.data.RealName = "";
      this.data.AdminRoleId = "";
      this.data.password = "";
      this.data.Mobile = "";
      this.changePassword = false;
    },
    willAdd(id) {
      this.init();
      this.dialogFormVisible = true;
      let lod = Loading.service({
        text: "数据提交中",
        spinner: "el-icon-loading",
      });
      this.$axios({
        url: API.lookAdmin,
        method: "post",
        params: {
          adminid: id,
        },
      })
        .then((res) => {
          lod.close();
          this.data = res.Data[0];
        })
        .catch((err) => {
          lod.close();
        });
    },
    sure() {
      let { LoginName, RealName, AdminRoleId, password, Mobile } = this.data;

      let reg = /^[1][3,4,5,6,7,8,9][\d]{9}$/;
      if (reg.test(Mobile)) {
        let lod = Loading.service({
          text: "数据提交中",
          spinner: "el-icon-loading",
        });
        this.$axios({
          url: API.upDate,
          method: "post",
          params: {
            adminId: this.upId,
            loginName: LoginName,
            realName: RealName,
            adminRoleId: AdminRoleId,
            password,
            mobile: Mobile,
          },
        })
          .then((res) => {
            lod.close();
            res.Status == "y"
              ? this.$message({
                  type: "success",
                  message: res.Msg,
                })
              : this.$message({
                  type: "error",
                  message: res.Msg,
                });
            this.clear();
            this.dialogFormVisible = false;
            this.$emit("changeList");
          })
          .catch((err) => {
            lod.close();
          });
      } else {
        this.$message({
          type: "error",
          message: "手机号格式不正确",
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
<style lang="stylus" scoped>
.wrap {
  display: inline-block;
}

.wrap /deep/ .el-switch {
  width: 100%;
}
</style>