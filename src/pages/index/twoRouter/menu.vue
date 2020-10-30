<template>
  <div>
    <menupopup :info="info" ref="popup"></menupopup>
    <el-button type="primary" class="btn" @click="add">添加</el-button>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="150">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="150">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id,scope.row.url)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// 弹框的
import menupopup from "../../../common/menupopup";
// 引入仓库数据
import { mapGetters, mapActions } from "vuex";
// 引入 删除的请求
import { reqMenuDel, reqMenuListOne } from "../../../util/request";

export default {
  components: {
    menupopup,
  },
  computed: {
    //获取了  所有的数据
    ...mapGetters({
      list: "menu/list",
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
      this.info = {
        isShow: true,
        title: "菜单添加",
        btn: "添加",
        isAdd: true,
      };
    },
    ...mapActions({
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
          reqMenuDel({ id: id }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.requestMenuList();
            } else {
              this.$message({
                type: "info",
                message: res.data.msg,
              });
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
    edit(id,url) {
      this.info = {
        isShow: true,
        title: "菜单编辑",
        btn: "修改",
        id: id,
      };
      // ref 加在子组件的时候 用  this.$ref.名字  获取的是  子组件的实例  可以使用子组件的任何方法
      this.$refs.popup.look(id);
      // console.log(this.scope)
    },
  },
  mounted() {
    this.requestMenuList();
  },
};
</script>
<style scoped>
.btn {
  margin: 20px 0;
}
</style>