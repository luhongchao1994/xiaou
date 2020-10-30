<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          v-for="(item, index) in newArr"
          :key="index"
        >
          <div class="cont">
            <div class="inp">
              <el-input v-model="item.val" autocomplete="off"></el-input>
            </div>
            <el-button type="primary" v-if="index == 0" @click="addArr"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="delArr(index)"
              >删除</el-button
            >
          </div>
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
import { reqSpecsAdd, reqSpecsinfo, reqSpecsdit } from "../util/request";

export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "commercial/list",
    }),
  },
  data() {
    return {
      // dialogTableVisible: true,
      formLabelWidth: "120px",
      form: {
        specsname: "",
        attrs: "",
        status: "",
      },
      newArr: [{ val: "" }],
    };
  },
  methods: {
    // 点添加按钮   加input 框
    addArr() {
      this.newArr.push({ val: "" });
    },
    // 点删除  去 input 框
    delArr(index) {
      this.newArr.splice(index, 1);
    },
    // 清空表单数据
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.newArr = [{ val: "" }];
    },
    // 添加数据
    add() {
      // map 过滤数组 然后返回一个 新数组
      this.form.attrs = JSON.stringify(this.newArr.map((item) => item.val));
      // 发请求
      reqSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.reqlist();
          // 从新  请求  总条数
          this.reqcount();
        } else {
          alertWarning(res.data.msg);
        }
      });
      this.info.isShow = false;
    },

    // 查看一条数据  先把一条的数据获取到  然后 赋值给  form
    look(id) {
      reqSpecsinfo({ id: id }).then((res) => {
        this.form = res.data.list[0];
        console.log(this.form);
        // 补 id
        // this.form.id = id;
        this.newArr = JSON.parse(res.data.list[0].attrs).map((item) => ({
          val: item,
        }));
      });
    },

    //修改数据
    update() {
      this.form.attrs = JSON.stringify(this.newArr.map((item) => item.val));
      reqSpecsdit(this.form).then((res) => {
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
      reqlist: "commercial/reqlist",
      reqcount: "commercial/reqcount",
    }),
  },
  mounted() {},
};
</script>
<style scoped>
.cont {
  display: flex;
}
.inp {
  flex: 1;
}
</style>