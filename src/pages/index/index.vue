<template>
  <div>
    <el-container class="box1">
      <el-aside width="200px" class="box4">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          router
        >
          <el-menu-item index="/index/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group class="box2">
              <el-menu-item index="/index/menu">菜单管理</el-menu-item>
              <el-menu-item index="/index/role">角色管理</el-menu-item>
              <el-menu-item index="/index/admin">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group class="box2">
              <el-menu-item index="/index/classifi">商品分类</el-menu-item>
              <el-menu-item index="/index/commercial">商品规格</el-menu-item>
              <el-menu-item index="/index/commodity">商品管理</el-menu-item>
              <el-menu-item index="/index/member">会员管理</el-menu-item>
              <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="box3">
            <span>admin</span>
            <i class="el-icon-setting"></i>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            v-if="$route.name"
          >
            <el-breadcrumb-item :to="{ path: '/index/home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #20222a;
  color: #fff;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffff;
}
.box1 {
  width: 100vw;
  height: 100vh;
}
.el-menu-vertical-demo {
  width: 200px;
  text-align: left;
}
.box2 {
  text-align: center;
}
.box3 {
  float: right;
}
.box4 {
  overflow: hidden;
}
</style>