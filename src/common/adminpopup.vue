<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择菜单">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 引入 添加的 获取一条数据   和   修改数据   axios
import { reqUserAdd, reqUserinfo, reqUserdit } from "../util/request";
// 引入 消息弹窗
import { alertSuccess, alertWarning } from "../util/alert";
// 引入角色 仓库数据
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
    }),
  },
  data() {
    return {
      // dialogTableVisible: true,
      formLabelWidth: "100px",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    // 点取消了的时候
    cancel() {
      this.info.isShow = false;
      alertWarning("已取消");
    },
    // 清空表单数据
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    // 添加数据
    add() {
      reqUserAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.$parent.getInit();
          this.empty();
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },

    // 查看一条数据  先把一条的数据获取到  然后 赋值给  form
    look(id) {
      reqUserinfo({ uid: id }).then((res) => {
        this.form = res.data.list;
      });
    },
    //修改数据
    update() {
      reqUserdit(this.form).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.$parent.getInit();
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },
    ...mapActions({
      // 请求仓库的数据
      requestRoleList: "role/requestRoleList",
    }),
  },
  mounted() {
    this.requestRoleList();
  },
};
</script>
<style scoped>
</style>