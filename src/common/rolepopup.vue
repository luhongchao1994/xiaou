<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="opened">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
import { reqRoleAdd,reqRoleListOne, reqRoleUpate } from "../util/request";
// 引入 消息弹窗
import { alertSuccess, alertWarning } from "../util/alert";
// 引入仓库数据
import { mapGetters, mapActions } from "vuex";

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
      // dialogTableVisible: true,
      formLabelWidth: "120px",
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
    };
  },
  methods: {
    //弹框动画执行完成
    opened(){
      //添加打开，要置空树，编辑打开，什么都不做
      if(this.info.title==="添加角色"){
        this.emptyTree()
      }
    },
    // 点取消了的时候
    cancel(){
      this.info.isShow =false;
      alertWarning("已取消")
    },
    // 清空表单数据
    empty() {
      this.form = {
       rolename: "",
        menus: "",
        status: 1,
      };
    },
    // 清空树 
    emptyTree(){
      this.$refs.tree.setCheckedKeys([])
    },
    // 添加数据
    add() {
      if(this.form.rolename==""){
        alertWarning("名字不能为空")
        return
      }
      if(this.$refs.tree.getCheckedKeys().length==0){
        alertWarning("权限不能为空")
        return
      }
      // 要  转换成  字符串  数组
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleAdd(this.form).then((res) => {
        console.log(this.form)
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.requestRoleList();
          this.empty();
          this.emptyTree();
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },

    // 查看一条数据  先把一条的数据获取到  然后 赋值给  form
    look(id) {
      reqRoleListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
         this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
      });
    },

    //修改数据
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleUpate(this.form).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.requestRoleList();
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },

    ...mapActions({
      // 请求 仓库中的 菜单数据
      requestMenuList: "menu/requestMenuList",
      // 请求自己的数据
      requestRoleList:"role/requestRoleList"
    }),
  },
  mounted() {},
};
</script>
<style scoped>
</style>