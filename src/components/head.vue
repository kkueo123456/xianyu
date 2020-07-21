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
        <!-- <el-menu-item index="1" @click="changeView('evaluate')">
        <el-badge :is-dot="false" class="item">待估价</el-badge>
      </el-menu-item>
      <el-menu-item index="2" @click="changeView('made')">
        <el-badge :is-dot="false" class="item">订单生成</el-badge>
      </el-menu-item>
      <el-menu-item index="3" @click="changeView('paid')">
        <el-badge :is-dot="false" class="item">已下单/付款</el-badge>
      </el-menu-item>
      <el-menu-item index="4" @click="changeView('delivered')">
        <el-badge :is-dot="false" class="item">已发货</el-badge>
      </el-menu-item>
      <el-menu-item index="5" @click="changeView('test')">
        <el-badge :is-dot="false" class="item">待质检</el-badge>
      </el-menu-item>
      <el-menu-item index="6" @click="changeView('back')">
        <el-badge :is-dot="false" class="item">待退货</el-badge>
      </el-menu-item>
      <el-menu-item index="7" @click="changeView('say')">
        <el-badge :is-dot="false" class="item">待评价</el-badge>
      </el-menu-item>
      <el-menu-item index="8" @click="changeView('success')">
        <el-badge :is-dot="false" class="item">交易完成</el-badge>
      </el-menu-item>
      <el-menu-item index="9" @click="changeView('close')">
        <el-badge :is-dot="false" class="item">交易关闭</el-badge>
        </el-menu-item>-->
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
          buttonIndex: "1"
        },
        {
          buttonName: "waitSure",
          isDot: false,
          buttonText: "待客户确认",
          buttonIndex: "2"
        },
        {
          buttonName: "made",
          isDot: false,
          buttonText: "待付款",
          buttonIndex: "3"
        },
        {
          buttonName: "paid",
          isDot: false,
          buttonText: "待取件",
          buttonIndex: "4"
        },
        {
          buttonName: "delivered",
          isDot: false,
          buttonText: "待收货",
          buttonIndex: "5"
        },
        {
          buttonName: "test",
          isDot: false,
          buttonText: "未质检",
          buttonIndex: "6"
        },

        {
          buttonName: "success",
          isDot: false,
          buttonText: "交易成功",
          buttonIndex: "7"
        },
        {
          buttonName: "back",
          isDot: false,
          buttonText: "待退货",
          buttonIndex: "8"
        },
         {
          buttonName: "unusual",
          isDot: false,
          buttonText: "异常订单",
          buttonIndex: "9"
        },
        {
          buttonName: "close",
          isDot: false,
          buttonText: "交易关闭",
          buttonIndex: "10"
        }
      ],
 
    };
  },
  methods: {
    changeView(id) {
      this.$emit("show", id);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
.head-wrap /deep/ .el-menu-demo {
  display flex
  justify-content space-between
}

.head-wrap /deep/ .el-badge__content {
  transform: translateY(100%) translateX(150%);
}
</style>