<template>
<!-- 全部订单与全部估价头部的类型筛选 -->
  <el-select v-model="value" placeholder="类型筛选" @change="choose">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      //分类form
      options: [
        {
          value: "",
          label: "全部类型",
        },
        {
          value: "首饰",
          label: "首饰",
        },
        {
          value: "箱包",
          label: "箱包",
        },
        {
          value: "腕表",
          label: "腕表",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      value: "",
    };
  },
  methods: {
    choose(val) {
      this.$emit('changeType',val);
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="stylus" scoped></style>