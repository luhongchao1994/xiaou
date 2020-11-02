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
          <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 有目录 -->
            <el-submenu :index="item.id + ''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="'/index'+i.url"
                  >{{ i.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <!-- 没有目录 -->
            <el-menu-item :index="'/index'+item.url" v-else>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="box3">
            <span>{{ userInfo.username }}</span>
            <el-button type="primary" @click="logOut">退出</el-button>
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
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions(["changeUserInfoAction"]),
    //退出登录
    logOut() {
      this.changeUserInfoAction({});
      this.$router.push("/");
    },
  },
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