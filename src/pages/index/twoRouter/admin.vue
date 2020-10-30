<template>
  <div>
    <adminpopup :info="info" ref="popup"></adminpopup>
    <el-button type="primary" class="btn" @click="add">添加</el-button>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="150">
      </el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="150">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="150">
      </el-table-column>
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
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="size"
      @current-change="changePage"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
// 弹框的
import adminpopup from "../../../common/adminpopup";
// 引入 删除的请求  获取全部数据的请求
import {
  reqUserdelete,
  reqUserlist,
  reqUsercount,
} from "../../../util/request";

export default {
  components: {
    adminpopup,
  },
  data() {
    return {
      info: {
        //  让弹框显示
        isShow: false,
        title: "",
        btn: "",
      },
      //列表数据
      list: [],
      //总数
      total: 0,
      //一页的数量
      size: 3,
      //页码
      page: 1,
    };
  },
  methods: {
    //   发请求  获取 所有列表
    getInit() {
      //获取总数
      reqUsercount().then((res) => {
        if (res.data.code == 200) {
          this.total = res.data.list[0].total;
        }
      });
      this.getList();
    },
    // 获取 列表数据
    getList() {
      //获取列表
      reqUserlist({ page: this.page, size: this.size }).then((res) => {
        if (res.data.code == 200) {
          // this.list = res.data.list;

          //如果取到了的数据是null,那么应该赋值一个空数组
          let list = res.data.list ? res.data.list : [];

          //如果list是空数组，这个时候应该看一下，当前页是不是第一页。
          //如果是在第一页，就赋值
          //如果不是第一页，假设是第4页，这时候，应该访问第3页的2条数据

          if (list.length === 0 && this.page > 1) {
            this.page--;
            this.getList();
            return;
          }
          this.list = list;
        }
      });
    },
    //页码变了
    changePage(page) {
      this.page = page;
      //重新获取list
      this.getList();
    },
    //添加
    add() {
      this.$refs.popup.empty();
      this.info = {
        isShow: true,
        title: "添加角色",
        btn: "添加",
        isAdd: true,
      };
    },
    // 删除
    del(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认删除
          reqUserdelete({ uid: id }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getInit();
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
    edit(id) {
      this.info = {
        isShow: true,
        title: "编辑角色",
        btn: "修改",
        uid: id,
      };
      // ref 加在子组件的时候 用  this.$ref.名字  获取的是  子组件的实例  可以使用子组件的任何方法
      this.$refs.popup.look(id);
    },
  },
  mounted() {
    this.getInit();
  },
};
</script>
<style scoped>
.btn {
  margin: 20px 0;
}
</style>