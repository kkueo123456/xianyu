<template>
  <!-- 估价的dialog -->
  <div>
    <el-button type="text" @click="eval(chuanId)">估价</el-button>
    <el-dialog title="质检报告" :visible.sync="isShow" :modal-append-to-body="false">
      <div class="small-img">
        <el-image
          v-for="(item,index) in srcList"
          :key="index"
          :src="item"
          :preview-src-list="srcList"
        ></el-image>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["chuanId"],
  components: {},
  data() {
    return {
      isShow: false,
      skuId: 0,
      url: [
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg"
      ],
      srcList: [
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg"
      ]
    };
  },
  methods: {
    eval(id) {
      this.isShow = true;
      this.skuId = id;
      console.log(id)
    },
    quxiao() {
      this.isShow = false;
    },
    sure() {
      this.isShow = false;
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
.small-img .el-image {
  border: 2px solid #888888;
  width: 100px;
  height: 100px;
  margin-left 10px
}
</style>