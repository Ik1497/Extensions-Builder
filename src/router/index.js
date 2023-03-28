import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [
  {
    title: 'Home',
    icon: 'mdi-home',
    path: '/',
    enabled: true,
    component: () => import('../pages/Home.vue')
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

addRoutes()

async function addRoutes() {
  let urlParams = await fetch(`https://raw.githubusercontent.com/Ik1497/Docs/main/api/url-parameters.json`)
  urlParams = await urlParams.json()
  urlParams = urlParams.pages

  urlParams.forEach(async function (urlParam) {
    let pageData = await fetch(`https://raw.githubusercontent.com/Ik1497/Docs/main/url-parameters-src/${urlParam.apiPath}.json`)
    pageData = await pageData.json()

    pageData.URLSearchParams = JSON.parse(pageData.URLSearchParams)

    router.addRoute({
      path: `/${urlParam.path}`,
      component: () => import('../components/ExtensionsURLSearchParams.vue'),
      props: {
        dataParams: pageData
      }
    })
  });
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
