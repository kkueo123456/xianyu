<template>
  <!-- 估价的dialog -->
  <div class="dialogWrap">
    <el-button type="text" @click="eval(chuanId,chuanImg)" v-if="state==false">估价</el-button>
    <el-button type="text" @click="eval(chuanId,chuanImg)" v-if="state==true">质检</el-button>
    <!-- <el-button type="text" @click="eval(chuanId)" v-if="hasTest==true">重新质检</el-button> -->
    <el-dialog
      :title="state?'质检报告(*为必填项)':'估价报告'"
      :visible.sync="isShow"
      :modal-append-to-body="false"
    >
      <div class="small-img">
        <el-image
          v-for="(item,index) in srcList"
          :key="index"
          :src="item"
          :preview-src-list="srcList"
        ></el-image>
      </div>
      <!-- 成色 -->
      <div class="color-price-wrap">
        <div class="color-radio-wrap">
          <div class="allInput radios-wrap">
            <div>成色：</div>
            <div class="radioGroup">
              <el-radio-group v-model="form.colorRadio" size="mini">
                <el-radio label="99新" border>99新</el-radio>
                <el-radio label="98新" border>98新</el-radio>
                <el-radio label="95新" border>95新</el-radio>
                <el-radio label="90新" border>90新</el-radio>
                <el-radio label="85新" border>85新</el-radio>
                <el-radio label="80新" border>80新</el-radio>
                <el-radio label="无" border>无</el-radio>
              </el-radio-group>
            </div>
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
          <el-input placeholder="请输入" v-model="form.ranSe" clearable></el-input>
        </div>
      </div>
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>划痕</span>
          <el-input placeholder="请输入" v-model="form.huaHen" clearable></el-input>
        </div>
      </div>
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>破损</span>
          <el-input placeholder="请输入" v-model="form.poSun" clearable></el-input>
        </div>
      </div>
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>磨损</span>
          <el-input placeholder="请输入" v-model="form.moSun" clearable></el-input>
        </div>
      </div>
      <!-- 附件 -->
      <div class="title-wrap">
        <h4>附件情况</h4>
      </div>
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>有</span>
          <el-input placeholder="请输入" v-model="form.has" clearable></el-input>
        </div>
      </div>
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>无</span>
          <el-input placeholder="请输入" v-model="form.no" clearable></el-input>
        </div>
      </div>
      <!-- 价格 -->
      <div class="price-wrap">
        <div class="allInput price-input">
          <span>
            <b style="color:red">*</b>输入价格
          </span>
          <el-input
            :placeholder="gujia?'估价金额'+gujia:'请输入'"
            v-model="form.evalInput"
            clearable
            :disabled="disable"
          ></el-input>
        </div>
        <div class="no-price">
          <el-radio v-model="form.PriceRadio" :label="0" @change="isDisabled" v-if="!state">暂无报价</el-radio>
          <el-radio v-model="form.PriceRadio" :label="1" @change="isDisabled">有报价</el-radio>
        </div>
      </div>
      <div class="TestTip" v-if="state==true">
        <span>
          <b style="color:red;text-align:left">如果鉴定为假货或无价值，请填写0.01</b>
        </span>
      </div>
      <div class="price-wrap">
        <span style="line-height:50px">
          <b style="color:red">*</b>评估结果
        </span>
        <el-input
          type="textarea"
          placeholder="请输入质检结果"
          v-model="form.sayMain"
          maxlength="50"
          show-word-limit
        ></el-input>
      </div>
      <div class="price-wrap" v-if="state==true||hasTest==true">
        <span style="line-height:50px">
          <b style="color:red">*</b>评估描述
        </span>
        <el-input
          type="textarea"
          placeholder="请输入描述"
          v-model="form.desc"
          maxlength="50"
          show-word-limit
        ></el-input>
      </div>
      <!-- 我方上传图片 -->
      <el-upload
        :action="imgApi"
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :limit="3"
        v-if="state==true"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button @click="evalSure" v-if="state==false">估价确定</el-button>
        <el-button @click="testSure" v-if="state==true||hasTest==true">质检确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from "../util/api";
import { Loading } from "element-ui";
export default {
  props: ["chuanId", "state", "chuanImg", "hasTest", "gujia"],
  components: {},
  data() {
    return {
      //判断市质检
      isTest: this.state,
      form: {
        //成色的radio
        colorRadio: "无",
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
        //文本
        sayMain: "以上为参考价格，具体以实物鉴定为准。若下单邮寄，邮费到付",
        //描述
        desc: "",
      },
      isShow: false,
      skuId: "",
      srcList: null,
      // 估价input的状态
      disable: false,
      //图片
      dialogVisible: false,
      disabled: false,
      //图片上传请求的接口
      imgApi: API.orderPic,
      imgList: null,
    };
  },
  methods: {
    eval(id, chuanImg) {
      this.isShow = true;
      this.skuId = id;
      console.log(chuanImg);
      //解析图片
      if (chuanImg) {
        let img = JSON.parse(chuanImg).questions;
        let imgArr = img.map((item) => {
          return item.answers[0].name;
        });
        this.srcList = imgArr;
      }
    },
    quxiao() {
      //取消的清空操作
      this.form.evalInput = "";
      this.form.PriceRadio = "";
      this.isShow = false;
    },
    //暂无报价控制Input
    isDisabled() {
      !this.form.PriceRadio
        ? ((this.disable = true), (this.form.evalInput = "0"))
        : (this.disable = false);
    },
    //估价确定
    evalSure() {
      let evalData = {
        quoteId: this.skuId,
        price: this.form.evalInput,
        summary: this.form.sayMain,
        degree: this.form.colorRadio,
        report: {},
      };
      this.surePublic(evalData);
    },

    //质检确定
    testSure() {
      let testExplanation = {
        desc: this.form.desc,
        images: this.imgList,
      };
      let testData = {
        orderId: this.skuId,
        price: this.form.evalInput,
        summary: this.form.sayMain,
        explanation: JSON.stringify(testExplanation),
        degree: this.form.colorRadio,
        report: {
          questions: [
            {
              answers: [
                {
                  banned: false,
                  id: 0,
                  name: this.form.has,
                },
              ],
              groupName: "附件情况",
              id: 0,
              name: "有",
              questionType: "",
              required: false,
            },
            {
              answers: [
                {
                  banned: false,
                  id: 0,
                  name: this.form.no,
                },
              ],
              groupName: "附件情况",
              id: 0,
              name: "无",
              questionType: "",
              required: false,
            },
            {
              answers: [
                {
                  banned: false,
                  id: 0,
                  name: this.form.ranSe,
                },
              ],
              groupName: "瑕疵情况",
              id: 0,
              name: "染色",
              questionType: "",
              required: false,
            },
            {
              answers: [
                {
                  banned: false,
                  id: 0,
                  name: this.form.huaHen,
                },
              ],
              groupName: "瑕疵情况",
              id: 0,
              name: "划痕",
              questionType: "",
              required: false,
            },
            {
              answers: [
                {
                  banned: false,
                  id: 0,
                  name: this.form.poSun,
                },
              ],
              groupName: "瑕疵情况",
              id: 0,
              name: "破损",
              questionType: "",
              required: false,
            },
            {
              answers: [
                {
                  banned: false,
                  id: 0,
                  name: this.form.moSun,
                },
              ],
              groupName: "瑕疵情况",
              id: 0,
              name: "磨损",
              questionType: "",
              required: false,
            },
          ],
        },
      };
      this.surePublic(testData);
    },
    surePublic(data) {
      console.log(this.form.evalInput);
      //最大7位 最多保留两位小数点
      let re = /^(([1-9]{1}\d{0,6})|(0{1}))(\.\d{0,2})?$/;
      if (
        (this.form.evalInput === "" && this.form.PriceRadio != 0) ||
        (this.form.PriceRadio != 0 && !re.test(this.form.evalInput))
      ) {
        this.$message({
          type: "error",
          message: "请输入正确的价格",
        });
      } else {
        let lod = Loading.service({
          text: "请稍等数据加载",
        });
        this.$axios({
          url: API.evalDoing,
          method: "post",
          params: data,
        })
          .then((res) => {
            //close
            lod.close();
            this.isShow = false;
            res.Status == "y"
              ? this.$message({
                  type: "success",
                  message: res.Msg,
                })
              : this.$message({
                  type: "error",
                  message: res.Msg,
                });
            this.form.evalInput = "";
            this.form.PriceRadio = "";
            this.$emit("changeState");
          })
          .catch((err) => {
            //close
            lod.close();
            console.log(err);
          });
      }
    },
    //我方上传图片相关
    //删除
    handleRemove(file) {
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      // 将图片url转成数组
      this.imgList = fileList.map((item) => {
        return item.response.Data[0];
      });
    },
  },
  mounted() {
    this.form.sayMain = this.isTest
      ? "请输入质检评价"
      : "以上为参考价格，具体以实物鉴定为准。若下单邮寄，邮费到付";

  },
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
.color-price-wrap {
  width: 100%;
  margin-top: 15px;
}

.color-radio-wrap {
  margin: 0 auto;
  display: flex;
  text-align: center;
}

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

// 提示
.TestTip {
  width: 80%;
  margin: 0 auto;
  display: flex;
}

.TestTip span b {
  margin-left: 10px;
  font-weight: normal;
  font-size: 12px;
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

.price-wrap /deep/ .el-textarea {
  width: 50%;
  margin-left: 13px;
}
</style>