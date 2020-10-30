<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择菜单" @change="changePid">
             <el-option label="--请选择--"  value disabled></el-option>
            <el-option label="顶级菜单" :value="0" v-if="form.url==''"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select> 
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option value="el-icon-camera-solid">
              <i class="el-icon-camera-solid"></i>
            </el-option>
            <el-option value="el-icon-video-camera-solid">
              <i class="el-icon-video-camera-solid"></i>
            </el-option>
            <el-option value="el-icon-s-flag">
              <i class="el-icon-s-flag"></i>
            </el-option>
            <el-option value="el-icon-share">
              <i class="el-icon-share"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择地址">
            <el-option label="--请选择--"  value disabled></el-option>
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :value="'/'+item.path"
              :label="item.name"
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
// 引入 添加的axios
import { reqMenuAdd } from "../util/request";
// 引入 消息弹窗
import { alertSuccess, alertWarning } from "../util/alert";
// 引入仓库数据
import { mapGetters, mapActions } from "vuex";
// 引入 二级路由
import indexRouters from "../pages/index/twoRouter/ind";
// 引入 获取一条数据   和   修改数据   的请求
import { reqMenuListOne, reqMenuUpate } from "../util/request";

export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {
      indexRouters: indexRouters,
      // dialogTableVisible: true,
      formLabelWidth: "120px",
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: "",
      },
    };
  },
  methods: {
     //上级菜单发生修改
    changePid() {
      //如果是顶级菜单，那么类型应该是目录；否则，应该是菜单。
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 清空表单数据
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: "",
      };
    },
    // 添加数据
    add() {
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.requestMenuList();
          this.empty();
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },

    // 查看一条数据  先把一条的数据获取到  然后 赋值给  form
    look(id) {
      reqMenuListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },

    //修改数据
    update() {
      reqMenuUpate(this.form).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.requestMenuList();
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },

    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
  },
  mounted() {},
};
</script>
<style scoped>
</style>