import Vue from 'vue'
import Router from 'vue-router'
import nairelist from '@/components/nairelist'
import newnaire from '@/components/newnaire'
//import list from '@/components/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'nairelist',
      component: nairelist,

    },{
      path: '/newnaire',
      name: 'newnaire',
      component: newnaire,
    }
  ]
})
