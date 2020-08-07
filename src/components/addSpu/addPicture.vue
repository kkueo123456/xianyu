<template>
<!-- 添加图片及描述 -->
  <div class="spuWrap">
    <el-button @click="innerAdd">添加描述</el-button>
    <el-dialog width="45%" title="添加" :visible.sync="addVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="示例图标题">
          <el-input v-model="form.tipName"></el-input>
        </el-form-item>
        <el-form-item label="示例图文字">
          <el-input v-model="form.tipText"></el-input>
        </el-form-item>
        <el-form-item label="是否必填">
          <el-radio-group v-model="form.required">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="question">
        <el-upload :action="imgApi" list-type="picture-card" :on-success="handleSuccess" :limit="1">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import API from "../../util/api";
export default {
  props: [],
  components: {},
  data() {
    return {
      //内层dialog
      addVisible: false,
      form: {
        //模板名
        tipName: "",

        tipText: "",
        //是否必填
        required: false,
      },
      // 图片请求接口
      imgApi: API.orderPic,
      //图片路径拼接
      imgUrl: "",
    };
  },
  methods: {
    innerAdd() {
      this.addVisible = true;
    },
    clear() {
      this.form.tipName = "";
      this.form.tipText = "";
    },
    // 内层确定
    innerSure() {
      //根据数据格式要求
      let Tips = [];
      let arr = {
        picUrl: this.imgUrl,
        tipText: this.form.tipText,
      };
      Tips.push(arr);
      let TipObj = {
        Tips,
        name: this.form.tipName,
        questionType: "PHOTO",
        required: this.form.required,
      };
      this.$emit("addQuestion", TipObj);
      this.addVisible = false;
      //清空
      this.clear()
    },
    //上传图片
    handleSuccess(response, file, fileList) {
      response
        ? response.Data.forEach((item) => {
            this.imgUrl = item;
          })
        : "";
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="stylus" scoped></style>