<template>
  <div>
    <NavHead @show="isShow"></NavHead>
    <div class="main">
      <div :is="ComponentShow" class="main-show"></div>
    </div>
  </div>
</template>
<script>
const NavHead = () => import("../components/head");
//估价
const evaluate = () => import("../components/main/evaluate");
// 待确认
const waitSure = () => import("../components/main/waitSure");
//已下单
const OrderPlaced = () => import("../components/main/OrderPlaced");
//待取件
const WillPickUp = () => import("../components/main/WillPickUp");
// 已取件(作废)
const delivered = () => import("../components/main/delivered");
//未质检
const WillTest = () => import("../components/main/WillTest");
//交易完成
const success = () => import("../components/main/success");
//待退货
const WillBack = () => import("../components/main/WillBack");
//取消的订单
const CancelOrder = () => import("../components/main/CancelOrder");
//已退货
const Returned = () => import("../components/main/Returned");
//回收商确认
const OurSure = () => import("../components/main/OurSure");
//已质检
const testSuccess = () => import("../components/main/testSuccess");
export default {
  props: [],
  components: {
    NavHead,
    evaluate,
    waitSure,
    OrderPlaced,
    WillTest,
    WillBack,
    success,
    Returned,
    delivered,
    WillPickUp,
    CancelOrder,
    OurSure,
    testSuccess
  },
  data() {
    return {
      ComponentShow: "evaluate"
    };
  },
  methods: {
    isShow(id) {
      this.ComponentShow = id;
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
.main {
  width: 100%;
  height: 100%;
  min-height: 65vh;
  padding: 15px 0px;
  margin-top: 10px;
  background-color: white;
}

.main-show {
  padding-left: 10px;
}
</style>