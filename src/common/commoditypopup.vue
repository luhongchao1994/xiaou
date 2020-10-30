<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirst">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in classifilist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            style="border: 1px dashed red; width: 178px; height: 178px"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
              style="width: 178px; height: 178px"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" placeholder="请选择">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <!-- <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option> -->
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>

        <!-- 富文本框 -->
        <el-form-item label="商品描述" :label-width="formLabelWidth">
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 引入 消息弹窗
import { alertSuccess, alertWarning } from "../util/alert";
// 引入仓库数据
import { mapGetters, mapActions } from "vuex";
// 引入
import { reqCatelist } from "../util/request";

export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      // 一级 分类的数据
      classifilist: "classifi/list",
      //
    }),
  },
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要得是  字符串数组  需要  转一下 JSON.stringify
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 图片
      imageUrl: "",
      //二级分类的list
      secondCateList: [],
    };
  },
  methods: {
    ...mapActions({
      //  一级分类的请求
      getclassifilist: "classifi/reqlist",
      // 商品 总数
      reqcount: "commodity/reqcount",
    }),

     //一级分类发生了修改
    changeFirst(){
      //二级分类的id应该置空
      this.form.second_cateid=""
      //获取二级分类list
      this.getsecondlist()
    },
    // 根据一级分类id   获取二级分类的列表
    getsecondlist() {
      reqCatelist({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },

    

    // 清空表单数据
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.newArr = [{ val: "" }];
    },
    // 添加数据
    add() {
      console.log(this.form);
      // map 过滤数组 然后返回一个 新数组
      // this.form.attrs = JSON.stringify(this.newArr.map((item) => item.val));
      // // 发请求
      // reqSpecsAdd(this.form).then((res) => {
      //   if (res.data.code == 200) {
      //     alertSuccess(res.data.msg);
      //     this.reqlist();
      //     // 从新  请求  总条数
      //     this.reqcount();
      //   } else {
      //     alertWarning(res.data.msg);
      //   }
      // });
      this.info.isShow = false;
    },

    // 查看一条数据  先把一条的数据获取到  然后 赋值给  form
    look(id) {
      reqSpecsinfo({ id: id }).then((res) => {
        this.form = res.data.list[0];
        console.log(this.form);
        // 补 id
        // this.form.id = id;
        this.newArr = JSON.parse(res.data.list[0].attrs).map((item) => ({
          val: item,
        }));
      });
    },

    //修改数据
    update() {
      this.form.attrs = JSON.stringify(this.newArr.map((item) => item.val));
      reqSpecsdit(this.form).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.reqlist();
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },
  },
  mounted() {
    this.getclassifilist();
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>