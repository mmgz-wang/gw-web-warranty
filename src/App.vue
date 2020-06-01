<template>
    <div id="app" style="height:100%">
      <a-config-provider :locale="locale">
        <router-view />
      </a-config-provider>
    </div>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
// import en_GB from 'ant-design-vue/lib/locale-provider/en_GB';
export default {
  name: "App",
  data(){
    return {
      locale: zhCN,
    }
  }
};
</script>