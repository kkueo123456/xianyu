<template>
<!-- 添加模板 -->
  <div class="spuWrap">
    <el-button @click="innerAdd">添加新的模板</el-button>
    <el-dialog width="45%" title="新模板" :visible.sync="innerVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="模板名">
          <el-input v-model="form.prodName"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-select v-model="form.quoteType" placeholder="是否延迟报价">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 添加图片 -->
      <addPicture @addQuestion="addDataList"></addPicture>
      <!-- 列表 -->
      <el-table :data="data">
        <el-table-column prop="name" label="示例图标题" :span="2"></el-table-column>
        <el-table-column label="显示提示" :span="2">
          <template slot-scope="scope">{{scope.row.Tips[0].tipText}}</template>
        </el-table-column>
        <el-table-column label="图片" :span="2">
          <template slot-scope="scope">
            <img :src="scope.row.Tips[0].picUrl" alt style="width:50px;height:50px" />
          </template>
        </el-table-column>
        <el-table-column prop="required" label="是否必填" :span="2">
          <template slot-scope="scope">{{scope.row.required?"是":'否'}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" :span="2">
          <template slot-scope="scope">
            <el-button type="text" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import API from "../../util/api";
import addPicture from "./addPicture";
export default {
  props: ["MuBanData"],
  components: {
    addPicture,
  },
  data() {
    return {
      //内层dialog
      innerVisible: false,
      data: this.MuBanData,
      options: [
        {
          value: "DELAY",
          label: "DELAY",
        },
      ],
      form: {
        //延迟报价
        quoteType: "",
        //模板名
        prodName: "",
      },
      //列表
      data: [],
    };
  },
  methods: {
    innerAdd() {
      this.innerVisible = true;
    },

    //添加列表
    addDataList(dat) {
      this.data.push(dat);
      console.log(this.data);
    },
    //shanchu
    del(i) {
      let arr = this.data.filter((item, index) => {
        return !(item == i);
      });
      this.data = arr;
    },
    // 内层确定
    innerSure() {
      let Muban = {
        prodName: this.form.prodName,
        quoteType: this.form.quoteType,
        Questions: this.data,
      };
      if (
        this.form.prodName == "" ||
        this.form.quoteType == "" ||
        this.data == ""
      ) {
        this.$message({
          type: "error",
          message: "缺少参数",
        });
      } else {
        this.$axios({
          url: API.question,
          method: "post",
          params: {
            questions: Muban,
          },
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        this.innerVisible = false;
        this.$emit("getList");
      }
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style lang="stylus" scoped></style>