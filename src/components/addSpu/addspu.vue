<template>
  <!-- 关联模板页 -->
  <div class="spuWrap">
    <el-button type="text" @click="update(addId)" :disabled="false">关联模板</el-button>
    <el-dialog title="模板列表" :visible.sync="outerVisible" :modal-append-to-body="false">
      <div class="addMoban">
        <innerDialog :MuBanData="data" @getList="update"></innerDialog>
      </div>
      <el-table :data="data">
        <el-table-column prop="prodName" label="名称" :span="2"></el-table-column>
        <el-table-column prop="quoteType" label="延迟报价" :span="2"></el-table-column>
        <el-table-column fixed="right" label="操作" :span="2">
          <template slot-scope="scope">
            <guanlian :mubanid="scope.row.Id" :spuId="spuId"></guanlian>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="outSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import innerDialog from "./innerDialog";
import addDialog from "./addPicture";
import API from "../../util/api";
import guanlian from "./guanlian";
export default {
  props: ["addId"],
  components: {
    innerDialog,
    addDialog,
    guanlian,
  },
  data() {
    return {
      //外层dialog
      outerVisible: false,
      //spuid
      spuId: this.addId,
      data: [],
    };
  },
  methods: {
    update() {
      this.outerVisible = true;
      this.$axios({
        url: API.MuBan,
        method: "post",
      })
        .then((res) => {
          this.data = res.Data;
          console.log("1");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    add() {
      this.innerVisible = true;
    },

    // 外层确定
    outSure() {
      this.innerVisible = false;
    },
    init() {},
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="stylus" scoped>
.spuWrap .el-dialog__wrapper /deep/ .v-modal {
  display: none;
}

.v-modal /deep/ {
  display: none !important;
}

.addMoban {
  width: 100%;
  text-align: left;
}
</style>