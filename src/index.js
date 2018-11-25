
// Vue.config.productionTip = false;


const routes = [
  { path: '', component: Home, name: 'home' },

  { path: '/message', component: CreateMessage, name: 'message' },
  { path: '/cheer', component: CreateCheer, name: 'cheer' },
  { path: '/suggestion', component: CreateSuggestion, name: 'suggestion' },

  { path: '/utilities', component: Utilities, name: 'utilities' },
  { path: '/status', component: Status, name: 'status' },

  { path: '*', redirect: '/' }
];

const router = new VueRouter( { routes } );

/* eslint-disable no-new */
const app = new Vue({
  router
}).$mount('#app');

