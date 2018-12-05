import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import LoginPage from '@/components/Login';
import loginService from '@/services/login.service';


Vue.use(Router);

// export default new Router({
const router = new Router({
  // modeS: 'history',
  routes: [
    {
      path: '/login',
      // redirect: '/rooms',
      // redirect: () => {
      //   if (loginService.isLoggedIn()) {
      //     return '/rooms';
      //   }
      //   return '/login';
      // },
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/rooms',
      name: 'HelloWorld',
      component: HomePage,
    },
    // otherwise redirect to home
    { path: '*', redirect: '/rooms' },
  ],
});

// router.beforeEach((to, from, next) => next());

router.beforeEach((to, from, next) => {
  // console.log('beforeEach', from, to);

  // redirect to login page if not logged in and trying to access a restricted page
  // add pages for public access
  const publicPages = ['/login'];
  // publicPages.push('/rooms');

  const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem('user');
  if (authRequired && !loginService.isLoggedIn()) {
    console.log('111111111111');
    return next('/login');
    // next('/login');
  }
  console.log('55555555555555');
  return next();
  // else if (from.path === '/login' || to.path === '/login') {
  //   return next('/rooms');
  // }
});


export default router;
