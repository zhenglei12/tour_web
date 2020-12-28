<template>
  <a-layout class="layout">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img v-if="collapsed" src="../assets/logo.png" alt="logo" />
        <span v-else>报单系统</span>
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[$route.name]">
        <a-sub-menu key="user">
          <span slot="title"><a-icon type="user" /><span>用户管理</span></span>
          <a-menu-item key="person" @click="goto('/person')"
            >用户列表</a-menu-item
          >
          <a-menu-item key="role" @click="goto('/role')">角色列表</a-menu-item>
          <a-menu-item key="permission" @click="goto('/permission')"
            >权限列表</a-menu-item
          >
        </a-sub-menu>
        <a-menu-item key="trip" @click="goto('/trip')">
          <a-icon type="user" />
          <span>行程管理</span>
        </a-menu-item>
        <a-sub-menu key="order">
          <span slot="title"><a-icon type="user" /><span>订单管理</span></span>
          <a-menu-item key="order" @click="goto('/order')"
            >订单列表</a-menu-item
          >
          <a-menu-item key="order/edit" @click="goto('/order/edit')"
            >订单录入</a-menu-item
          >
        </a-sub-menu>
        <a-menu-item key="agent" @click="goto('/agent')">
          <a-icon type="user" />
          <span>代理人管理</span>
        </a-menu-item>
        <a-sub-menu key="resource">
          <span slot="title"><a-icon type="user" /><span>资源管理</span></span>
          <a-menu-item key="resource" @click="goto('/resource')"
            >资源分配</a-menu-item
          >
          <a-menu-item key="resource/history" @click="goto('/resource/history')"
            >历史分配</a-menu-item
          >
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-button type="link" @click="$auth.logout()">退出登录</a-button>
      </a-layout-header>
      <a-layout-content class="content">
        <div class="wraper">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  overflow: hidden;

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: white;
    font-family: cursive;
    white-space: nowrap;
    overflow: hidden;

    img {
      width: 20px;
    }
  }

  .header {
    background: #fff;
    padding: 0;
    box-shadow: 0 0 10px 0px #cccccc;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content {
    padding: "24px 16px";
    overflow: "auto";

    .wraper {
      background: white;
      padding: 16px;
    }
  }
}
</style>