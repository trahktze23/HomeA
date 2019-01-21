import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import LoginPage from '@/components/Login';
import loginService from '@/services/login.service';

Vue.use(Router);

// export default new Router({
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/rooms',
      name: 'HelloWorld',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
    // otherwise redirect to home
    { path: '*', redirect: '/rooms' },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // add pages for public access
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem('user');
  if (authRequired && !loginService.isLoggedIn()) {
    return next('/login');
  }
  return next();
});

export default router;
