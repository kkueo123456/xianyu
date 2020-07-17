<template>
  <div class="wrap">
    <left class="left"></left>
    <right class="right"></right>
  </div>
</template>
<script>
import left from "../components/left";
import right from "../components/right";
export default {
  props: [],
  components: {
    left,
    right
  },
  data() {
    return {
      isdot: false
    };
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';
.wrap{
  width 100vw
  height 100vh
  display flex
}
.left{
  width 250px
}
.right {
  flex 1
}
</style>