import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/views/index'),
    
    children:[
      // 技术问题管理
      {
        path: '/basicBataMaintenance',
        name: 'basicBataMaintenance',
        component: () => import('@/views/basicBataMaintenance/index'),
        meta: { title: '国际保单管理' },
        children: [
          // 报告查询
          {
            path: 'materialInformation',
            name: 'materialInformation',
            component: () => import('@/views/basicBataMaintenance/materialInformation'),
            meta: { title:'物料信息'}
          },
          // 报告添加
          {
            path: 'materialPriceManagement',
            name: 'materialPriceManagement',
            component: () => import('@/views/basicBataMaintenance/materialPriceManagement'),
            meta: { title:'物料价格管理'}
          },
          {
            path: 'technicalProblemsDetails',
            name: 'technicalProblemsDetails',
            component: () => import('@/views/basicBataMaintenance/technicalProblemsDetails'),
            meta: { title:'损伤件管理'}
          }
        ]

      },
      // 路由重定向
      {
        path: '*',
        redirect: '/basicBataMaintenance/materialInformation'
      },
    ]
    }]
})
