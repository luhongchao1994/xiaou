<template>
  <div >
    <memberpopup :info="info" ref="popup"></memberpopup>
    <!-- <el-button type="primary" class="btn" @click="add">添加</el-button> -->
    <el-table
      :data="roleList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="uid" label="用户编号" sortable width="150">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="150">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="150">
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// 弹框的
import memberpopup from "../../../common/memberpopup";
// 引入仓库数据
import { mapGetters, mapActions } from "vuex";
// 引入 全部数据的请求
import { reqMemberlist } from "../../../util/request";

export default {
  components: {
    memberpopup,
  },
  data() {
    return {
      roleList: [],
      info: {
        //  让弹框显示
        isShow: false,
        title: "",
        btn: "",
      },
    };
  },
  methods: {
    // 编辑
    edit(uid) {
      this.info = {
        isShow: true,
        title: "编辑会员",
        btn: "修改",
      };
      // ref 加在子组件的时候 用  this.$ref.名字  获取的是  子组件的实例  可以使用子组件的任何方法
      this.$refs.popup.look(uid);
    },
    //请求数据
    getInit() {
      reqMemberlist().then((res) => {
        //    console.log(res)
        this.roleList = res.data.list;
      });
    },
  },
  mounted() {
    this.getInit();
  },
};
</script>
<style scoped>
.el-table {
  margin: 40px 0;
}
</style>