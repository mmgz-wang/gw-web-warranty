<template>
  <div id='crumbs'>
    <a-breadcrumb separator="/">
      <a-breadcrumb-item v-for="item in levelList" :key="item.name">
        <router-link :to="item.path">{{item.meta.title}}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: []
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  components: {},

  computed: {},
  created(){
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      matched.forEach(item=> first.path === item.path ? (item.path = matched[1].path) : item.path);
     this.levelList = matched;
    }
  },

  mounted() {
    this.getBreadcrumb();
  }
};
</script>

<style lang='less' scoped>
#crumbs{
  .ant-breadcrumb{
    height:50px;
    line-height: 50px;
    margin:0 20px;
  }
  
}
</style>