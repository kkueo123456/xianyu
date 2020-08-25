<template>
<!-- 日期选择器 -->
  <div class="TimeSelect">
    <el-date-picker
      v-model="TimeValue"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="timePicker"
      value-format="yyyy-MM-dd"
    ></el-date-picker>
  </div>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      TimeValue: "",
    };
  },
  methods: {
    timePicker() {
      this.$emit('timePicker',this.TimeValue)
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="stylus" scoped>
.TimeSelect {
  display: inline-block;
}
</style>