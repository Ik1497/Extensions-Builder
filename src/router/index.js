import { createRouter, createWebHashHistory } from 'vue-router'
import { GetRoutes } from '@/composables/GetRoutes'

const routes = [
  {
    title: 'Home',
    icon: 'mdi-home',
    path: '/',
    component: () => import('../pages/Home.vue')
  },
  {
    title: '404 Not Found',
    icon: 'mdi-file-remove',
    path: '/:pathMatch(.*)',
    component: () => import('../pages/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

addRoutes()

async function addRoutes() {
  let urlParams = await GetRoutes()
  urlParams = urlParams.array

  urlParams.forEach(urlParam => {
    router.addRoute({
      path: `/${urlParam.path}`,
      component: () => import('../components/ExtensionsURLSearchParams.vue'),
      props: {
        dataParams: urlParam
      }
    })
  })
}

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  if(!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router
