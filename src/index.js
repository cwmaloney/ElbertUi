
// Vue.config.productionTip = false;

// const CreateMessage = { template: '<div>CreateMessage</div>' }
// const CreateCheer = { template: '<div>CreateCheer</div>' }
const Utilities = { template: '<div>Utilities</div>' }
const Status = { template: '<div>Status</div>' }

const routes = [
  { path: '', component: Home, name: 'home' },

  { path: '/message', component: Message, name: 'message' },
  { path: '/cheer', component: CreateCheer, name: 'cheer' },

  { path: '/utilities', component: Utilities, name: 'utilities' },
  { path: '/status', component: Status, name: 'status' },

  { path: '*', redirect: '/' }
];

const router = new VueRouter( { routes } );

/* eslint-disable no-new */
const app = new Vue({
  router
}).$mount('#app');

