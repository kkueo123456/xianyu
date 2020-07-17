<template>
  <div>
    <NavHead @show="isShow"></NavHead>
    <div class="main">
      <div :is="ComponentShow" class="main-show"></div>
    </div>
  </div>
</template>
<script>
import NavHead from "../components/head";
import evaluate from "../components/main/evaluate";
import made from "../components/main/made";
import test from "../components/main/test";
import back from "../components/main/back";
import say from "../components/main/say";
import success from "../components/main/success";
import close from "../components/main/close";
export default {
  props: [],
  components: {
    NavHead,
    evaluate,
    made,
    test,
    back,
    say,
    success,
    close
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