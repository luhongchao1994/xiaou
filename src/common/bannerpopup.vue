<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
// 引入 添加的axios    获取一条数据   和   修改数据   的请求
import { reqBanneradd, reqBannerinfo, reqBanneredit } from "../util/request";

export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  data() {
    return {
      // dialogTableVisible: true,
      formLabelWidth: "120px",
      form: {
        title: "",
        img: null,
        status: "",
      },
      imageUrl: "",
    };
  },
  methods: {
    // 传图片的时候  调用这个方法
    change(file) {
      //  把  图片转换成 路径
      this.imageUrl = URL.createObjectURL(file.raw);
      // 把form 表单的img  变成 文件类型
      this.form.img = file.raw;
    },
    // 清空表单数据
    empty() {
      this.form = {
        title: "",
        img: null,
        status: "",
      };
      this.imageUrl = "";
    },
    // 添加数据
    add() {
      console.log(this.form);
      // 因为有文件 所以  需要 用formdata  传参
      let data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      // 发请求
      reqBanneradd(data).then((res) => {
        if (res.data.code == 200) {
          // console.log(res.data)
          alertSuccess(res.data.msg);
          this.reqlist();
          this.empty();
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },

    // 查看一条数据  先把一条的数据获取到  然后 赋值给  form
    look(id) {
      reqBannerinfo({ id: id }).then((res) => {
        this.form = res.data.list;
        // 补 id
        this.form.id = id;
        // 处理  显示 问题
        this.imageUrl = this.$imgURL + res.data.list.img;
      });
    },

    //修改数据
    update() {
      // 因为有文件 所以  需要 用formdata  传参
      let data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      reqBanneredit(data).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.reqlist();
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },

    ...mapActions({
      reqlist: "banner/reqlist",
    }),
  },
  mounted() {},
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