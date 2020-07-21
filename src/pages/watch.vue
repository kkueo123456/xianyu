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
const evaluate = () => import("../components/main/evaluate");
const waitSure = () => import("../components/main/waitSure");
//待取件
const made = () => import("../components/main/made");
//确认订单
const pickUp = () => import("../components/main/pickUp");
//已下单/付款
const paid = () => import("../components/main/paid");
// 已发货
const delivered = () => import("../components/main/delivered");
//待质检
const test = () => import("../components/main/test");
//待退货
const back = () => import("../components/main/back");
//待评价
const say = () => import("../components/main/say");
//交易完成
const success = () => import("../components/main/success");
//交易关闭
const close = () => import("../components/main/close");

export default {
  props: [],
  components: {
    NavHead,
    evaluate,
    waitSure,
    made,
    test,
    back,
    say,
    success,
    close,
    delivered,
    paid,
    pickUp
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