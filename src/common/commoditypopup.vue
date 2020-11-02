<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="opened">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changeFirst"
          >
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
            <el-option label="--请选择--" value="" disabled></el-option>
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
            :on-change="change"
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
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="chengeSpece"
          >
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in commerciallist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in attrList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
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

        <el-form-item label="商品描述" label-width="120px">
          <!-- 富文本编辑器 -->
          <div v-if="info.isShow" id="editor"></div>
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
import E from "wangeditor";
// 引入 消息弹窗
import { alertSuccess, alertWarning } from "../util/alert";
// 引入仓库数据
import { mapGetters, mapActions } from "vuex";
// 引入
import {
  reqCatelist,
  reqGoodsAdd,
  reqGoodsinfo,
  reqGoodsdit,
} from "../util/request";

export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      // 一级 分类的数据
      classifilist: "classifi/list",
      //商品规格 列表
      commerciallist: "commercial/list",
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

      //规格属性的list
      attrList: [],
    };
  },
  methods: {
    //弹框打开完成，开始创建富文本编辑器
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    ...mapActions({
      //  一级分类的请求
      getclassifilist: "classifi/reqlist",
      // 商品 总数
      reqcount: "commodity/reqcount",
      //获取规格list
      getcommoditylist: "commercial/reqlist",
      // 商品  总数
      reqlist: "commodity/reqlist",
    }),

    //一级分类发生了修改
    changeFirst() {
      //二级分类的id  置空
      this.form.second_cateid = "";
      //获取二级分类list
      this.getsecondlist();
    },
    // 根据一级分类id   获取二级分类的列表
    getsecondlist() {
      reqCatelist({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },

    // 处理 图片
    // 传图片的时候  调用这个方法
    change(file) {
      //  把  图片转换成 路径
      this.imageUrl = URL.createObjectURL(file.raw);
      // 把form 表单的img  变成 文件类型
      this.form.img = file.raw;
    },

    //处理商品 规格   商品 属性

    chengeSpece() {
      this.form.specsattr = [];
      this.getAttrsList();
    },

    //根据选中的商品规格，计算一下展示属性列表
    getAttrsList() {
      //取出this.commerciallist 里面 的id是 form.specsid 的那条数据
      let obj = this.commerciallist.find(
        (item) => item.id === this.form.specsid
      );
      //要那条数据上的attrs
      this.attrList = obj.attrs;
    },

    // 清空表单数据
    empty() {
      this.form = {
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
      };
      // 图片
      this.imageUrl = "";

      //二级分类的list
      this.secondCateList = [];

      //规格属性的list
      this.attrList = [];
    },
    // 添加数据
    add() {
      // 获取  富文本编辑器得  内容
      this.form.description = this.editor.txt.html();
      // console.log(this.form);
      let obj = {
        ...this.form,
      };
      //需要处理一下   数组   变成  字符串数组
      obj.specsattr = JSON.stringify(obj.specsattr);
      let data = new FormData();
      for (let i in obj) {
        data.append(i, obj[i]);
      }
      // 发请求
      reqGoodsAdd(data).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.reqlist();
          // 从新  请求  总条数
          this.reqcount();
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },

    // 查看一条数据  先把一条的数据获取到  然后 赋值给  form
    look(id) {
      reqGoodsinfo({ id: id }).then((res) => {
        // console.log(res);
        // 1 form 表单 赋值
        this.form = res.data.list;
        // 2.补id
        this.form.id = id;
        // 3.处理图片
        this.imageUrl = this.$imgURL + this.form.img;
        //4.根据id   展示 二级分类的 列表
        this.getAttrsList();
        //4.根据id   展示 一级分类的 列表
        this.getsecondlist();
        // 5 处理规格属性 得显示问题
        this.form.specsattr = JSON.parse(this.form.specsattr);
        //6.将form.description 赋值给富文本编辑器
        if (this.editor) {
          this.editor.txt.html(this.form.description);
        }
      });
    },

    //修改数据
    update() {
      //获取一下富文本编辑器的内容给form.description
      this.form.description = this.editor.txt.html();
      let obj = {
        ...this.form,
      };
      obj.specsattr = JSON.stringify(obj.specsattr);

      let data = new FormData();
      for (let i in obj) {
        data.append(i, obj[i]);
      }
      reqGoodsdit(data).then((res) => {
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
    this.getcommoditylist();
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