<template>
  <el-container class="home_cntainer">
    <!-- 页面顶部 -->
    <el-header>
      <div>
        <img width="55px" height="55px" src="../assets/logo.png" alt="logo" />
        <span>社区疫情防控后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-btn" @click="toggleCollapse">
          |||
        </div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse"
          :collapse-transition="false" :router="true" :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menu_list" :key="item.id">
            <!-- 以及菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 菜单名称 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + itemSon.path" v-for="itemSon in item.children" :key="itemSon.id" @click="saveNavState('/' + itemSon.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 菜单名称 -->
                <span>{{itemSon.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 页面底部 -->
        <el-footer>
          基于社区的疫情防控平台的后台数据管理系统 @zhaoyulong   2020.03.21-
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        menu_list: [],
        iconObj: {
          '101': 'iconfont icon-users',
          '102': 'iconfont icon-danju',
          '103': 'iconfont icon-baobiao'
        },
        isCollapse: false,
        // 被激活的链接地址
        activePath: ''
      }
    },
    created() {
      this.getMenuList();
      this.activePath = window.sessionStorage.getItem('activePath');
    },
    methods: {
      logout: function() {
        window.sessionStorage.clear();
        this.$router.push('/login');
      },
      async getMenuList() {
        const {
          data: result
        } = await this.$http.get('menu-list');
        if (result.meta.status !== 200) return this.$message.error(result.meta.msg);
        this.$message.success(result.meta.msg);
        // console.log(result);
        this.menu_list = result.data;
      },
      // 折叠菜单
      toggleCollapse() {
        if (this.isCollapse) {
          this.isCollapse = false;
        } else {
          this.isCollapse = true;
        }
      },
      saveNavState(activePath) {
        window.sessionStorage.setItem('activePath', activePath);
        this.activePath = activePath;
      }
    }
  }
</script>

<style lang="less" scoped>
  .home_cntainer {
    height: 100%;
  }

  .el-menu {
    border-right: none;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    >div {
      display: flex;
      align-items: center;

      span {
        margin-left: 20px;
      }
    }
  }

  .el-aside {
    background-color: #333744;
  }

  .el-main {
    background-color: #EAEDF1;
  }

  .iconfont {
    margin-right: 10px;
  }

  .toggle-btn {
    background-color: #4A5064;
    line-height: 24px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;
  }

  .el-footer {
    background-color: #DCDCDC;
    text-align: center;
    font-size: 16px;
    line-height: 60px;
  }
</style>
