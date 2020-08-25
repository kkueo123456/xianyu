<template>
  <!-- 全部订单 -->
  <div class="wrap">
    <!-- 下拉框 -->
    <div class="selectWrap">
      <div>
        <!-- 选择类型 -->
        <all-type @changeType="chooseType"></all-type>
        <!-- 状态筛选 -->
        <el-select v-model="stateValue" placeholder="状态筛选" @change="chooseState">
          <el-option
            v-for="item in state"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 时间选择器 -->
        <time-picker @timePicker="chooseDate"></time-picker>
      </div>
      <!-- 导出表格 -->
      <excel :outPutData="data"></excel>
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
              <el-form-item label="物流单号">
                <span>{{scope.row.MailNo}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="OrderId" label="订单编号"></el-table-column>
        <el-table-column prop="ApprizeAmount" label="估价"></el-table-column>
        <el-table-column prop="ConfirmFee" label="质检价"></el-table-column>
        <el-table-column prop="AdminName" label="操作人"></el-table-column>
        <el-table-column prop="SellerRealName" label="卖家姓名"></el-table-column>
        <el-table-column prop="SellerAddress" label="卖家地址"></el-table-column>
        <el-table-column prop="SellerPhone" label="卖家手机"></el-table-column>
        <el-table-column prop="GmtCreate" label="创建时间"></el-table-column>
        <!-- <el-table-column prop="RateContent" label="评价">
          <template
            slot-scope="scope"
          >{{scope.row.OrderStatus==5&&'待卖家评价'||scope.row.OrderStatus==6&&'待评价'||scope.row.OrderStatus==7&&scope.row.RateContent||scope.row.OrderStatus==103&&scope.row.Reason||'无'}}</template>
        </el-table-column>-->
        <el-table-column label="订单状态">
          <template
            slot-scope="scope"
          >{{scope.row.OrderStatus==2&&"待质检"||scope.row.OrderStatus==3&&"已质检"||scope.row.OrderStatus==7&&"交易成功/评价完成"||scope.row.OrderStatus==6&&"交易成功/待评价"||scope.row.OrderStatus==5&&"交易成功/待卖家评价"||scope.row.OrderStatus==101&&"已退货"||(scope.row.OrderStatus==103||scope.row.OrderStatus==102)&&"取消的订单"||scope.row.OrderStatus==4&&'待回收商确认'||scope.row.OrderStatus==100&&'待退货'}}</template>
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
import excel from "../components/allorder/excel";
import allType from "../components/allType";
import timePicker from "../components/allorder/timePicker";
import checkPage from "../components/checkPage";
import API from "../util/api";
export default {
  props: [],
  components: {
    checkPage,
    allType,
    timePicker,
    excel,
  },
  data() {
    return {
      pageN: 0,
      requestData: {
        page: 1,
        supCategoryName: "",
        startDate: "",
        endDate: "",
      },

      state: [
        {
          value: "",
          label: "全部订单状态",
        },
        {
          value: "2",
          label: "待质检",
        },
        {
          value: "3",
          label: "已质检",
        },
        {
          value: "4",
          label: "待回收商确认",
        },
        {
          value: "5",
          label: "交易成功",
        },
        {
          value: "101",
          label: "已退货",
        },
        {
          value: "103",
          label: "取消的订单",
        },

        {
          value: "100",
          label: "待退货",
        },
      ],
      stateValue: "",
    };
  },
  methods: {
    // 类型筛选
    chooseType(val) {
      this.requestData.supCategoryName = val;
      this.init();
    },
    //状态筛选
    chooseState(val) {
      this.requestData.orderStatus = val;
      this.init();
    },
    //跳页
    jumpPage(val) {
      this.requestData.page = val;
      this.init();
    },
    //初始化
    init() {
      console.log(this.requestData);
      this.$store.dispatch("getOrderData", this.requestData);
    },
    //日期选择
    chooseDate(val) {
      if (val) {
        this.requestData.startDate = val[0];
        this.requestData.endDate = val[1];
        this.init();
      }
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

.selectWrap {
  display: flex;
  justify-content: space-between;
}

// 隐藏栏
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand /deep/ label {
  width: 90px;
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