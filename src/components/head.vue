<template>
  <!-- 头部导航 -->
  <div class="head-wrap">
    <el-scrollbar style="width:100%">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
        <el-menu-item
          v-for="(item) in buttonList"
          :key="item.buttonName"
          :index="item.buttonIndex"
          @click="changeView(item.buttonName)"
        >
          <el-badge :is-dot="false" class="item">{{item.buttonText}}</el-badge>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      buttonList: [
        {
          buttonName: "evaluate",
          isDot: false,
          buttonText: "估价",
          buttonIndex: "1",
        },
        {
          buttonName: "waitSure",
          isDot: false,
          buttonText: "待客户确认",
          buttonIndex: "2",
        },
        {
          buttonName: "OrderPlaced",
          isDot: false,
          buttonText: "已下单",
          buttonIndex: "3",
        },
        {
          buttonName: "WillPickUp",
          isDot: false,
          buttonText: "待取件",
          buttonIndex: "4",
        },

        {
          buttonName: "WillTest",
          isDot: false,
          buttonText: "未质检",
          buttonIndex: "6",
        },
        {
          buttonName: "testSuccess",
          isDot: false,
          buttonText: "已质检",
          buttonIndex: "7",
        },
        {
          buttonName: "OurSure",
          isDot: false,
          buttonText: "回收商确认",
          buttonIndex: "8",
        },
        {
          buttonName: "success",
          isDot: false,
          buttonText: "交易成功",
          buttonIndex: "9",
        },
        {
          buttonName: "WillBack",
          isDot: false,
          buttonText: "待退货",
          buttonIndex: "10",
        },
        {
          buttonName: "CancelOrder",
          isDot: false,
          buttonText: "取消的订单",
          buttonIndex: "11",
        },
        {
          buttonName: "Returned",
          isDot: false,
          buttonText: "已退货",
          buttonIndex: "12",
        },
        // {
        //   buttonName: "waitClose",
        //   isDot: false,
        //   buttonText: "待关闭订单",
        //   buttonIndex: "11"
        // }
      ],
    };
  },
  methods: {
    changeView(id) {
      this.$emit("show", id);
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="stylus" scoped>
.head-wrap /deep/ .el-menu-demo {
  display: flex;
  justify-content: space-between;
}

.head-wrap /deep/ .el-badge__content {
  transform: translateY(100%) translateX(150%);
}
</style>