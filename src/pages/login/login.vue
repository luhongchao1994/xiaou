<template>
  <div class="box1">
    <div class="box2">
      <h2>登录页</h2>
      <el-input
        v-model="user.name"
        placeholder="请输入姓名"
        class="inp"
      ></el-input>
      <el-input
        v-model="user.pwd"
        placeholder="请输入密码"
        show-password
        class="inp"
      ></el-input>
      <button class="btn">登录</button>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      user: {
        name: "",
        pwd: "",
      },
    };
  },
  methods: {},
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
  padding: 30px 0 0 0 ;
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