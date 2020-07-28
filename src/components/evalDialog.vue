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
      <!-- 成色 -->
      <div class="price-wrap">
        <div>成色：</div>
        <div class="allInput radios-wrap">
          <div class="radioGroup">
            <el-radio-group v-model="from.colorRadio" size="mini">
              <el-radio :label="0" border>99新</el-radio>
              <el-radio :label="1" border>98新</el-radio>
              <el-radio :label="2" border>95新</el-radio>
              <el-radio :label="3" border>90新</el-radio>
              <el-radio :label="4" border>85新</el-radio>
              <el-radio :label="5" border>80新</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <!-- 瑕疵 -->
      <div class="title-wrap">
        <h4>瑕疵情况</h4>
      </div>
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>染色</span>
          <el-input placeholder="请输入" v-model="from.ranSe" clearable></el-input>
        </div>
      </div>
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>划痕</span>
          <el-input placeholder="请输入" v-model="from.huaHen" clearable></el-input>
        </div>
      </div>
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>破损</span>
          <el-input placeholder="请输入" v-model="from.poSun" clearable></el-input>
        </div>
      </div>
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>磨损</span>
          <el-input placeholder="请输入" v-model="from.moSun" clearable></el-input>
        </div>
      </div>
      <!-- 附件 -->
      <div class="title-wrap">
        <h4>附件情况</h4>
      </div>
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>有</span>
          <el-input placeholder="请输入" v-model="from.has" clearable></el-input>
        </div>
      </div>
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>无</span>
          <el-input placeholder="请输入" v-model="from.no" clearable></el-input>
        </div>
      </div>
      <!-- 价格 -->
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>输入价格</span>
          <el-input placeholder="请输入" v-model="from.evalInput" clearable :disabled="disable"></el-input>
        </div>
        <div class="no-price">
          <el-radio v-model="from.PriceRadio" :label="0" @change="isDisabled">暂无报价</el-radio>
          <el-radio v-model="from.PriceRadio" :label="1" @change="isDisabled">有报价</el-radio>
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
import API from "../util/api";
export default {
  props: ["chuanId", "state"],
  components: {},
  data() {
    return {
      from: {
        //成色的radio
        colorRadio: 0,
        //染色
        ranSe: "",
        //划痕
        huaHen: "",
        //破损
        poSun: "",
        //磨损
        moSun: "",
        // 有
        has: "",
        // 无
        no: "",
        //估价
        evalInput: "",
        // 暂无报价
        PriceRadio: 1,
      },
      isShow: false,
      skuId: "",
      url: [
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
      ],
      srcList: [
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
      ],

      // 估价input的状态
      disable: false,
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
      !this.from.PriceRadio
        ? ((this.disable = true), (this.from.evalInput = ""))
        : (this.disable = false);
    },
    //估价确定
    evalSure() {
      if (this.from.evalInput == "" && this.from.PriceRadio) {
        this.$message({
          type: "error",
          message: "缺少必填参数",
        });
      } else {
        this.isShow = false;
        this.$message({
          type: "success",
          message: "提交成功",
        });
        this.$emit("changeState");
      }
    },
    //质检确定
    testSure() {
      if (this.from.evalInput == "" && this.from.PriceRadio) {
        this.$message({
          type: "error",
          message: "缺少必填参数",
        });
      } else {
        this.isShow = false;
        this.$axios({
          url: API.orderPerform,
          method: "post",
          params: {
            orderStatus: "3",
            orderId: this.skuId,
            confirmFee: this.from.evalInput,
          },
        }).then((res) => {
          this.$message({
            type: "success",
            message: res.Msg,
          });
          this.isShow = false;
          this.$emit("changeState");
        });
      }
    },
  },
  mounted() {},
  watch: {},
  computed: {},
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

// 单选
.radios-wrap {
  display: flex;
  margin: 0 auto;
}

.radioGroup /deep/ .el-radio-group {
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 10px;
}

.radioGroup .el-radio-group /deep/ .el-radio {
  margin-right: 0;
}

// 附件
.title-wrap {
  width: 80%;
  margin: 0 auto;
}

.title-wrap h4 {
  text-align: left;
}

.price-wrap {
  display: flex;
  width: 80%;
  margin: 15px auto;
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