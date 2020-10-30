<template>
  <div>
    <rolepopup :info="info"  ref="popup"></rolepopup>
    <el-button type="primary" class="btn" @click="add">添加</el-button>
    <el-table
      :data="roleList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="角色编号" sortable width="150">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="150">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// 弹框的
import rolepopup from "../../../common/rolepopup";
// 引入仓库数据
import { mapGetters, mapActions } from "vuex";
// 引入 删除的请求
import { reqRoleDel} from "../../../util/request";

export default {
  components: {
    rolepopup,
  },
  computed: {
    //获取了  所有的数据
    ...mapGetters({
     roleList: "role/roleList",
    }),
  },
  data() {
    return {
      info: {
        //  让弹框显示
        isShow: false,
        title: "",
        btn: "",
      },
    };
  },
  methods: {
    
    //添加
    add() {
      this.$refs.popup.empty();
      this.info={
          isShow: true,
          title: "添加角色",
          btn: "添加",
          isAdd:true
      };
    },
    ...mapActions({
     requestRoleList: "role/requestRoleList",
     requestMenuList: "menu/requestMenuList",
    }),
    // 删除
    del(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认删除
          reqRoleDel({ id: id }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.requestRoleList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 编辑
    edit(id){
      this.info={
          isShow: true,
          title: "编辑角色",
          btn: "修改",
          id:id,
      };
      // ref 加在子组件的时候 用  this.$ref.名字  获取的是  子组件的实例  可以使用子组件的任何方法
      this.$refs.popup.look(id);
    },
  },
  mounted() {
    this.requestRoleList();
    //需要 加载  一下 仓库里得数据 
    this.requestMenuList();
  },
};
</script>
<style scoped>
.btn {
  margin: 20px 0;
}
</style>