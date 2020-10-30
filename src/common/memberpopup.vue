<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
         <el-input v-model="form.phone" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 引入    获取一条数据  和  修改数据    axios
import { reqMemberinfo,reqMemberedit } from "../util/request";
// 引入 消息弹窗
import { alertSuccess, alertWarning } from "../util/alert";
// 引入仓库数据
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  components: {},
  computed: {},
  data() {
    return {
      // dialogTableVisible: true,
      formLabelWidth: "120px",
      form: {
        nickname:"",
        phone: "",
        password:"",
        status: 1,
      },
    };
  },
  methods: {
    // 点取消了的时候
    cancel(){
      this.info.isShow =false;
      alertWarning("已取消")
    },
    // 清空表单数据
    empty() {
      this.form = {
        nickname: "",
        phone: "",
        password:"",
        status: 1,
      };
    },
    // 查看一条数据  先把一条的数据获取到  然后 赋值给  form
    look(id) {
      reqMemberinfo({ uid: id }).then((res) => {
        // console.log(res)
        this.form = res.data.list;
        // this.form.id = id;
         this.form.password=""
      });
    },

    //修改数据
    update() {
      if(this.form.password==""){
        alertWarning("密码不能为空")
        return
      }
      reqMemberedit(this.form).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          // 告诉 父组件 刷新 列表
          this.$parent.getInit()
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>