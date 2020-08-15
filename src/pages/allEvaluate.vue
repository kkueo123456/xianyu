<template>
  <!-- 全部估价 -->
  <div class="wrap">
    <!-- 下拉框 -->
    <div class="selectWrap">
      <!-- 类型筛选 -->
      <el-select v-model="value" placeholder="类型筛选" @change="chooseType">
        <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
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
        <el-table-column prop="QuoteId" label="估价编号" :span="2"></el-table-column>
        <el-table-column prop="Price" label="估价" :span="2"></el-table-column>
        <el-table-column prop="SupCategoryName" label="商品类型" :span="2"></el-table-column>
        <el-table-column label="图片(1张)" :span="2">
          <template slot-scope="scope">
            <img :src="scope.row.Questionnaire|transPic" style="width:50px;height:50px" alt />
          </template>
        </el-table-column>
        <el-table-column prop="CreateTime" label="创建时间" :span="2"></el-table-column>
        <el-table-column prop="QuoteTime" label="估价时间" :span="2"></el-table-column>
        <el-table-column label="状态" :span="2">
          <template slot-scope="scope">{{scope.row.IsPrice?'已估价':'未估价'}}</template>
        </el-table-column>
        <el-table-column label="订单信息" :span="2">
          <template slot-scope="scope">{{scope.row.isOrder?'卖家已确认/已生成订单':'未确认/未生成订单'}}</template>
        </el-table-column>

        <!-- <el-table-column fixed="right" label="操作" :span="2">
          <template slot-scope="scope">
           
          </template>
        </el-table-column>-->
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
import API from "../util/api";
export default {
  props: [],
  components: {
    checkPage,
  },
  data() {
    return {
      pageN: 0,
      requestData: {
        page: 1,
        supCategoryName: "",
      },
      //类型下拉
      type: [
        {
          value: "",
          label: "全部类型",
        },
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
      value: "",
      // 条件下拉
      condition: [
        {
          value: "",
          label: "全部状态",
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
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.table {
  background-color: white;
  padding-bottom: 20px;
  padding-top: 20px;
}

.table /deep/ .cell {
  text-align: center;
}

.table .el-table /deep/ thead {
  color: $primary;
}
</style>