<template>
  <div>
    <a-menu
      theme="dark"
      :open-keys="openKeys"
      mode="inline"
      :defaultSelectedKeys="[$route.path]"
      @openChange="onOpenChange"
    > 
      <a-sub-menu v-for="item in menuList" :key="item.key">
        <span slot="title">
          <a-icon :type="item.icon" />
          <span>{{item.name}}</span>
        </span>
        <a-menu-item v-for="item in item.childern" :key="item.url">
          <router-link :to="item.url">{{item.name}}</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      menuList: [
        {
          key: "basicBataMaintenance",
          name: "基础数据维护",
          icon: "dashboard",
          childern: [
            {
              name: "物料信息",
              url: "/basicBataMaintenance/materialInformation"
            },
            {
              name: "物料价格管理",
              url: "/basicBataMaintenance/materialPriceManagement"
            },
            {
              name: "故障件管理",
              url: "/basicBataMaintenance/technicalProblemsDetails"
            }
          ]
        }
      ],
      rootSubmenuKeys: [
        "basicBataMaintenance",
      ],
      openKeys: []
    };
  },
//BasicBataMaintenance
  components: {},

  computed: {},

  created() {
    const defaultOpenKey = sessionStorage.getItem("openKey");
    this.openKeys[0] =  defaultOpenKey ? defaultOpenKey : 'technical' 
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      this.rootSubmenuKeys = this.menuList.map(item => item.key);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
      sessionStorage.setItem("openKey", this.openKeys);
    }
  },

  mounted() {}
};
</script>

<style lang='less' scoped>
</style>