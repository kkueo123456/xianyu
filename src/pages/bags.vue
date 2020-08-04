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
//待付款
const made = () => import("../components/main/made");
//待取件
const paid = () => import("../components/main/paid");
// 已取件
const delivered = () => import("../components/main/delivered");
//未质检
const test = () => import("../components/main/test");
//交易完成
const success = () => import("../components/main/success");
//待退货
const back = () => import("../components/main/back");
// 异常
const unusual=()=>import('../components/main/unusual')
//交易关闭
const close = () => import("../components/main/close");
//待客户确认关闭订单
const hastest = () => import("../components/main/hastest");
//添加管理员
const addAdmin = () => import("../components/main/addAdmin");
export default {
  props: [],
  components: {
    NavHead,
    evaluate,
    waitSure,
    made,
    test,
    back,
    success,
    close,
    delivered,
    paid,
    unusual,
    hastest,
    addAdmin
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
  min-height 65vh
  padding: 15px 0px;
  margin-top: 10px;
  background-color: white;
}

.main-show {
  padding-left: 10px;
}
</style>