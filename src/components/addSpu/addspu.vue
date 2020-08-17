<template>
  <!-- 关联模板页 -->
  <div class="spuWrap">
    <el-button type="text" @click="update(addId)" :disabled="false">关联模板</el-button>
    <el-dialog title="模板列表" :visible.sync="outerVisible" :modal-append-to-body="false">
      <div class="addMoban">
        <innerDialog :MuBanData="data" @getList="update"></innerDialog>
      </div>
      <el-table :data="data">
        <el-table-column prop="prodName" label="名称"></el-table-column>
        <el-table-column prop="quoteType" label="延迟报价"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <guanlian :mubanid="scope.row.Id" :spuId="spuId"></guanlian>
          </template>
        </el-table-column>
      </el-table>

      <checkPage :pageNum="Pagelist" @jumpPage="jumpPage"></checkPage>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="outSure">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import checkPage from "../checkPage";
import innerDialog from "./innerDialog";
import addDialog from "./addPicture";
import API from "../../util/api";
import guanlian from "./guanlian";
import { Loading } from "element-ui";

export default {
  props: ["addId"],
  components: {
    innerDialog,
    addDialog,
    guanlian,
    checkPage,
  },
  data() {
    return {
      requestData: {
        page: 1,
      },
      //外层dialog
      outerVisible: false,
      //spuid
      spuId: this.addId,
      data: [],
      Pagelist: 0,
    };
  },
  methods: {
    //跳页
    jumpPage(val) {
      this.requestData.page = val;
      console.log(val);
      this.update();
    },
    update() {
      this.outerVisible = true;
      let lod = Loading.service({
        text: "加载中",
        target: ".el-dialog__body",
      });
      this.$axios({
        url: API.MuBan,
        method: "post",
        params: this.requestData,
      })
        .then((res) => {
          lod.close();
          this.data = res.Data;
          this.Pagelist = res.ListCount;
        })
        .catch((err) => {
          lod.close();
          console.log(err);
        });
    },
    add() {
      this.innerVisible = true;
    },

    // 外层确定
    outSure() {
      this.outerVisible = false;
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