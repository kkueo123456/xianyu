<template>
  <!-- 全部估价 -->
  <div class="wrap">
    <!-- 下拉框 -->
    <div class="selectWrap">
      <!-- 类型筛选 -->
      <all-type @changeType="chooseType"></all-type>
      <!-- 是否估价 -->
      <el-select v-model="conditionValue" placeholder="状态筛选" @change="chooseCondition">
        <el-option
          v-for="item in condition"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <!-- 主页面列表 -->
    <div class="table">
      <el-table :data="data">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品类型">
                <span>{{scope.row.SupCategoryName}}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{scope.row.SpuName}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="QuoteId" label="估价编号"></el-table-column>
        <el-table-column prop="Price" label="估价"></el-table-column>
        <el-table-column prop="UserId" label="用户id"></el-table-column>
        <el-table-column prop="SupCategoryName" label="商品类型"></el-table-column>
        <el-table-column prop="SpuName" label="商品名称"></el-table-column>

        <el-table-column label="图片(1张)">
          <template slot-scope="scope">
            <img :src="scope.row.Questionnaire|transPic" style="width:50px;height:50px" alt />
          </template>
        </el-table-column>
        <el-table-column prop="CreateTime" label="创建时间"></el-table-column>
        <el-table-column prop="QuoteTime" label="估价时间"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.IsPrice?'已估价':'未估价'}}</template>
        </el-table-column>
        <el-table-column label="订单信息">
          <template slot-scope="scope">{{scope.row.isOrder?'卖家已确认/已生成订单':'未确认/未生成订单'}}</template>
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
import allType from "../components/allType";
import checkPage from "../components/checkPage";
import API from "../util/api";
export default {
  props: [],
  components: {
    checkPage,
    allType,
  },
  data() {
    return {
      pageN: 0,
      requestData: {
        page: 1,
        supCategoryName: "",
      },

      // 条件下拉
      condition: [
        {
          value: "",
          label: "全部估价状态",
        },
        {
          value: 0,
          label: "未估价",
        },
        {
          value: 1,
          label: "已估价",
        },
      ],
      conditionValue: "",
    };
  },
  methods: {
    //选择类型
    chooseType(val) {
      this.requestData.supCategoryName = val;
      this.init();
    },
    //选择订单状态
    chooseCondition(val) {
      this.requestData.IsPrice = val;
      this.init();
    },

    //跳页
    jumpPage(val) {
      this.requestData.page = val;
      this.init();
    },
    //初始化
    init() {
      this.$store.dispatch("getEvalData", this.requestData);
    },
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

// 隐藏栏
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand /deep/ label {
  width: 100px;
  color: #99a9bf;
  font-weight: bold;
  text-align: left;
  margin-left: 30px;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  text-align: left;
  width: 100%;
}

// 主体
.wrap /deep/ .el-select {
  margin-left: 5px;
}

.wrap /deep/ .el-input__inner {
  border-color: $primary;
}

.selectWrap {
  width: 100%;
  height: 100%;
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.table {
  width: 100%;
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