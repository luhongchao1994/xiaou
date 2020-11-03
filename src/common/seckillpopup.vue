<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
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
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择"
            @change="changeSecond"
          >
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select
            v-model="form.goodsid"
            placeholder="请选择"
            @change="chengeGoods"
          >
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in goodslist"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import {
  reqCatelist,
  reqGoodslist,
  reqSeckadd,
  reqSeckinfo,
  reqSeckedit,
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
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      secondCateList: [],
      value1: [],
      goodslist: [],
    };
  },
  methods: {
    ...mapActions({
      //  一级分类的请求
      getclassifilist: "classifi/reqlist",
      // 商品  列表
      reqlist: "seckill/reqlist",
    }),

    //一级分类发生了修改
    changeFirst() {
      //二级分类的id  置空
      this.form.second_cateid = "";
      this.form.goodsid = "";
      //获取二级分类list
      this.getsecondlist();
    },
    //二级分类发生了修改
    changeSecond() {
      //二级分类的id  置空
      this.form.goodsid = "";
      //获取三级级分类list
      this.getgoodslist();
    },
    // 根据一级分类id   获取二级分类的列表
    getsecondlist() {
      reqCatelist({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },

    // 根据一级 ,二级分类id 获取商品
    getgoodslist() {
      reqGoodslist({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.goodslist = res.data.list;
      });
    },

    //处理商品
    chengeGoods() {
      this.goodslist = [];
      this.getgoodslist();
    },

    // 清空表单数据
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
        status: 1,
      };
      this.secondCateList= [],
      this.value1=[],
      this.goodslist= []
    },
    // 添加数据
    add() {
      // let date = new Date();
      this.form.begintime = this.value1[0].getTime();
      this.form.endtime = this.value1[1].getTime();
      // // 发请求
      reqSeckadd(this.form).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.reqlist();
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },

    // 查看一条数据  先把一条的数据获取到  然后 赋值给  form
    look(id) {
      reqSeckinfo({ id: id }).then((res) => {
        console.log(res.data.list.begintime);
        // 1 form 表单 赋值
        this.form = res.data.list;
        // // 2.补id
        this.form.id = id;
        //3.根据id   展示 三级分类的 列表
        this.getgoodslist();
        //4.根据id   展示 二级分类的 列表
        this.getsecondlist();
        // 5 处理时间显示问题
        this.form.begintime = new Date(res.data.list.begintime*1);
        this.form.endtime = new Date(res.data.list.endtime*1);
        this.value1 = [this.form.begintime, this.form.endtime];
      });
    },

    //修改数据
    update() {
      let date = new Date();
      this.form.begintime = date.getTime(this.value1[0]);
      this.form.endtime = date.getTime(this.value1[1]);

      reqSeckedit(this.form).then((res) => {
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