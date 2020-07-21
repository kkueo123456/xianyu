<template>
  <!-- 估价的dialog -->
  <div class="dialogWrap">
    <el-button type="text" @click="eval(chuanId)" v-if="state==true">估价</el-button>
    <el-button type="text" @click="eval(chuanId)" v-if="state==false">质检</el-button>
    <el-dialog title="质检报告" :visible.sync="isShow" :modal-append-to-body="false">
      <div class="small-img">
        <el-image
          v-for="(item,index) in srcList"
          :key="index"
          :src="item"
          :preview-src-list="srcList"
        ></el-image>
      </div>
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>输入价格</span>
          <el-input placeholder="请输入估价" v-model="evalInput" clearable :disabled="disable"></el-input>
        </div>
        <div class="no-price">
          <el-radio v-model="PriceRadio" label="1" @change="isDisabled">暂无报价</el-radio>
          <el-radio v-model="PriceRadio" label @change="isDisabled">有报价</el-radio>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button @click="evalSure" v-if="state==true">确 定</el-button>
        <el-button @click="testSure" v-if="state==false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["chuanId", "state"],
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
      ],
      //估价
      evalInput: "",
      // 估价input的状态
      disable: false,
      // 暂无报价
      PriceRadio: ""
    };
  },
  methods: {
    eval(id) {
      this.isShow = true;
      this.skuId = id;
    },
    quxiao() {
      //取消清空操作
      this.evalInput = "";
      this.PriceRadio = "";
      this.isShow = false;
    },
    //暂无报价控制Input
    isDisabled() {
      this.PriceRadio
        ? ((this.disable = true), (this.evalInput = ""))
        : (this.disable = false);
    },
    //估价确定
    evalSure() {
      if (this.evalInput == "" && this.PriceRadio == "") {
        this.$message({
          type: "error",
          message: "缺少必填参数"
        });
      } else {
        this.isShow = false;
        this.$emit("changeState");
      }
    },
    //质检确定
    testSure() {
      if (this.evalInput == "" && this.PriceRadio == "") {
        this.$message({
          type: "error",
          message: "缺少必填参数"
        });
      } else {
        this.isShow = false;
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
.dialogWrap {
  display: inline-block;
}

.small-img .el-image {
  border: 2px solid #888888;
  width: 100px;
  height: 100px;
  margin-left: 10px;
}

.price-wrap {
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-top: 15px;
}

.allInput {
}

.no-price {
  display: flex;
  margin-left: 20px;
  line-height: 40px;
}

.no-price /deep/ .el-radio {
  line-height: 40px;
}

.price-input {
  display: flex;
  justify-content: space-between;
}

.price-input span {
  width: 100px;
  line-height: 40px;
}
</style>