<template>
  <div class="wrap">
    <add-admi class="addAdmin" @changeList="init"></add-admi>
    <div class="table">
      <el-table :data="data">
        <el-table-column prop="LoginName" label="用户名" :span="2"></el-table-column>
        <el-table-column prop="RealName" label="真实姓名" :span="2"></el-table-column>
        <el-table-column prop="Mobile" label="手机号" :span="2"></el-table-column>
        <el-table-column prop="RoleName" label="身份" :span="2"></el-table-column>
        <el-table-column fixed="right" label="操作" :span="2">
          <template slot-scope="scope">
            <update-admin :lookId="scope.row.Id" @changeList="init"></update-admin>
            <del-admin :delId="scope.row.Id" @changeList="init"></del-admin>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <checkPage :pageNum="Pagelist" @jumpPage="jumpPage"></checkPage>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import checkPage from "../components/checkPage";
import addAdmi from "../components/Admin/addAdm";
import delAdmin from "../components/Admin/delAdmin";
import updateAdmin from "../components/Admin/updateAdmin";
export default {
  props: [],
  components: {
    checkPage,
    addAdmi,
    delAdmin,
    updateAdmin,
  },
  data() {
    return {};
  },
  methods: {
    jumpPage(val) {},
    init() {
      console.log(123);
      this.$store.dispatch("getAdminData");
    },
  },
  beforeRouteEnter(to, from, next) {
    let isAdmin = sessionStorage.getItem("isAdmin");
    if (isAdmin != 1) {
      alert("¿¿你想干嘛??");
      next("/index/jewelry");
      return;
    }
    next();
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
@import '../stylus/index.styl';

.wrap .addAdmin {
  margin-bottom: 10px;
}

.table {
  background-color: white;
  padding-bottom: 20px;
  padding-top: 20px;
  min-height: 65vh;
}

.table /deep/ .cell {
  text-align: center;
}

.table .el-table /deep/ thead {
  color: $primary;
}
</style>