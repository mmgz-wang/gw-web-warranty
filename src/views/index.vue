<template>
  <div id="components-layout-custom-trigger">
    <a-layout>
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo">国际保修单数据处理</div>
        <!-- <h3 class="logo" v-if="!collapsed">国际保修单数据处理</h3> -->
        <gw-menu-item></gw-menu-item>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0;position:relative;">
          <div style="display:flex;justify-content:space-between;">
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
            />
            <div class="listContainer">
              <a-layout id="components-layout-demo-custom-trigger">
                <div class="user">
                  <a-icon type="weibo" :style="{ fontSize: '18px', margin:'0 5px' }" />
                  <span class="user_name">用户名</span>
                </div>
              </a-layout>
            </div>
          </div>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <gw-breadcrumb></gw-breadcrumb>
          <div :style="{ padding: '0 24px', background: '#fff', minHeight: '570px' }">
            <router-view></router-view>
          </div>
        </a-layout-content>
        <a-layout-footer>
          <!-- <GlobalFooter></GlobalFooter> -->
          Copyright ©2019 长城汽车
        </a-layout-footer>
        
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import menuItem from "@/components/menu-item";
import breadcrumb from '@/components/breadcrumb';
import GlobalFooter from '@//components/GlobalFooter/GlobalFooter'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    "gw-menu-item": menuItem,
    'gw-breadcrumb': breadcrumb,
    GlobalFooter
  },
  data() {
    return {
      collapsed: false
    };
  }
};
</script>
<style lang='less' scoped>

#components-layout-custom-trigger {
  height: 100%;
  .logo {
    height: 32px;
    line-height: 32px;
    text-align: center;
    letter-spacing: 2px;
    color:white;
    // background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
#components-layout-demo-custom-trigger{
  padding:0 50px 0 0;
    background-color:#fff;
  }
  .ant-layout-footer{
    text-align: center;
  }
}
</style>
