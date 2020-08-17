<template>
  <!-- spu -->
  <div class="wrap">
    <!-- 添加分类 -->
    <el-button type="primary" @click="addFenlei" class="addfenlei">添加分类</el-button>
    <el-dialog title="添加类目" :visible.sync="fenleiDialog" :append-to-body="true">
      <el-form :model="form">
        <el-form-item label="SpuId">
          <el-input v-model="form.spuId"></el-input>
        </el-form-item>
        <el-form-item label="BizCode">
          <el-select v-model="form.bizCode" placeholder="请选择BizCode">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SpuName">
          <el-input v-model="form.spuName"></el-input>
        </el-form-item>
        <el-form-item label="CatId">
          <el-input v-model="form.catId"></el-input>
        </el-form-item>
        <el-form-item label="CatName">
          <el-input v-model="form.catName"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.categoryName" placeholder="请选择分类">
            <el-option
              v-for="item in categoryNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleDialog">取 消</el-button>
        <el-button type="primary" @click="DialogSure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 主页面列表 -->
    <div class="table">
      <el-table :data="data">
        <el-table-column prop="SpuId" label="SpuId"></el-table-column>
        <el-table-column prop="CatId" label="CatId"></el-table-column>
        <el-table-column prop="SpuName" label="SpuName"></el-table-column>
        <el-table-column prop="CatName" label="CatName"></el-table-column>
        <el-table-column prop="CreateTime" label="创建时间"></el-table-column>
        <el-table-column label="是否关联过">
          <template slot-scope="scope">{{scope.row.isTemplate?'已关联':'未关联'}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <addSpu :addId="scope.row.SpuId" v-if="scope.row.isTemplate==false"></addSpu>
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
import { Loading } from "element-ui";
import checkPage from "../components/checkPage";
import addSpu from "../components/addSpu/addspu";
import API from "../util/api";
export default {
  props: [],
  components: {
    checkPage,
    addSpu,
  },
  data() {
    return {
      pageN: 0,
      requestData: {
        page: 1,
      },
      //添加分类的dialog
      fenleiDialog: false,
      //分类form
      form: {
        spuId: "",
        bizCode: "LUXURIES",
        spuName: "",
        catId: "",
        catName: "",
        categoryName: "",
      },
      options: [
        {
          value: "LUXURIES",
          label: "LUXURIES",
        },
      ],
      categoryNameOptions: [
        {
          value: "首饰",
          label: "首饰",
        },
        {
          value: "箱包",
          label: "箱包",
        },
        {
          value: "腕表",
          label: "腕表",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
    };
  },
  methods: {
    //-----分类方法-----
    //添加分类确定
    DialogSure() {
      let lod = Loading.service({
        text: "请稍等数据加载",
      });
      this.$axios({
        url: API.addMuBan,
        method: "post",
        params: this.form,
      })
        .then((res) => {
          lod.close();
          this.fenleiDialog = false;

          res.Status == "y"
            ? this.$message({
                type: "success",
                message: res.Msg,
              })
            : this.$message({
                type: "error",
                message: res.Msg,
              });
          this.init();
        })
        .catch((err) => {
          lod.close();
          console.log(err);
        });
    },
    // 添加分类取消
    cancleDialog() {
      this.fenleiDialog = false;
    },
    //添加
    addFenlei() {
      this.fenleiDialog = true;
    },
    //-----分类方法结束-----
    //跳页
    jumpPage(val) {
      this.requestData.page = val;
      this.init();
    },
    //初始化
    init() {
      this.$store.dispatch("getSpuData", this.requestData);
    },
  },
  mounted() {
    this.init();
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
  watch: {},
  computed: {
    ...mapGetters(["data", "Pagelist"]),
  },
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';

.wrap .addfenlei {
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