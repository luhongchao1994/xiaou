<template>
  <div class="box1">
    <div class="box2">
      <h2>登录页</h2>
      <el-input
        v-model="form.username"
        placeholder="请输入姓名"
        class="inp"
      ></el-input>
      <el-input
        v-model="form.password"
        placeholder="请输入密码"
        show-password
        class="inp"
      ></el-input>
      <button class="btn" @click="login">登录</button>
    </div>
  </div>
</template>
<script>
import { reqLogin } from "../../util/request";
import { alertSuccess, alertWarning } from "../../util/alert";
import { mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["changeUserInfoAction"]),
    login() {
      reqLogin(this.form).then((res) => {
        if (res.data.code == 200) {
          //1.存用户信息 res.data.list
          //本地存储存进去的内容都会变成string,所以在存之前需要JSON.stringify() ,取出来JSON.parse()
          //本地存储 优点：刷新以后数据还在 缺点：取值不好用
          //vuex   优点：取值好取 缺点：刷新，数据就没了
          alertSuccess(res.data.msg);
          this.changeUserInfoAction(res.data.list);
          // 2.跳转页面
          this.$router.push("/index/home");
        } else {
          {
            alertWarning(res.data.msg);
          }
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.box1 {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/img/timg.jpg") no-repeat;
  background-size: 100% 100%;
}
.box2 {
  width: 500px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -150px;
  border-radius: 15px;
  text-align: center;
  padding: 30px 0 0 0;
  box-sizing: border-box;
}
h2 {
  margin-bottom: 20px;
  color: #409eff;
}
.inp {
  width: 300px;
  margin: 10px 0;
}
.btn {
  width: 300px;
  height: 40px;
  margin: 10px 0;
  background-color: #409eff;
  outline: none;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
}
</style>