<template>
  <!-- 左侧导航栏 -->
  <div class="wrap">
    <el-col :span="24">
      <h3>LiangCheng</h3>
      <el-menu default-active="1" class="el-menu-vertical-demo" :router="true">
        <el-menu-item
          v-for="(item,i) in navList"
          :index="item.name"
          :key="i"
          mode="horizontal"
          :disabled="item.disable"
        >
          <i :class="[item.ico]"></i>
          <el-badge class="item">{{item.navItem}}</el-badge>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      navList: [
        {
          name: "/index/jewelry",
          navItem: "首饰",
          ico: "el-icon-key",
          num: 0,
        },
        {
          name: "/index/bags",
          navItem: "箱包",
          ico: "el-icon-goods",
          num: 0,
        },
        {
          name: "/index/watch",
          navItem: "腕表",
          ico: "el-icon-watch-1",
          num: 0,
        },
        {
          name: "/index/another",
          navItem: "其他",
          ico: "el-icon-potato-strips",
          num: 0,
        },
        {
          name: "/index/allEvaluate",
          navItem: "全部估价页",
          ico: "el-icon-s-finance",
          num: 0,
        },
          {
          name: "/index/allOrder",
          navItem: "全部订单页",
          ico: "el-icon-s-order",
          num: 0,
        },
        {
          name: "/index/spu",
          navItem: "配置模板",
          ico: "el-icon-question",
          num: 0,
          disable: true,
        },
        {
          name: "/index/addAdmin",
          navItem: "添加管理员",
          ico: "el-icon-s-custom",
          disable: true,
        },
      ],
      admin: 1,
      numList: [],
    };
  },
  methods: {},
  mounted() {
    let isAdmin = sessionStorage.getItem("isAdmin");
    this.navList.forEach((item) => {
      if (isAdmin == 1) {
        item.disable = false;
      }
    });
  },
  watch: {},
  computed: {},
};
</script>
<style lang="stylus" scoped>
.wrap h3 {
  text-align: center;
  font-size: 25px;
  padding: 20px;
}

.wrap /deep/ .el-menu {
  border: none;
}

.el-menu-vertical-demo /deep/ .el-menu-item {
  height: 65px;
  line-height: 65px;
  font-size: 25px;
}

.el-menu-vertical-demo /deep/ .el-menu-item i {
  margin-right: 20px;
  margin-left: 20px;
}

.el-menu-vertical-demo .el-menu-item /deep/ .el-badge__content {
  transform: translateY(0%) translateX(150%);
}

.el-menu-vertical-demo .el-menu-item a {
  width: 100%;
  height: 100%;
  display: inline-block;
  text-decoration: none;
}

.wrap a:-webkit-any-link {
  color: red;
}

.wrap .el-menu-vertical-demo .el-menu-item a .item {
  color: #303133;
}
</style>