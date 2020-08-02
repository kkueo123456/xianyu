<template>
  <div class="wrap">
    <div class="wrap-main">
      <headSpace></headSpace>

      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import headSpace from "./title";
export default {
  props: [],
  components: {
    headSpace
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {

  },
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
.wrap {
  background-color: #f5f5f5;
}

.wrap-main {
  width: 100%;
  padding: 5px 12px 5px 12px;
  flex: 1;
}
</style>