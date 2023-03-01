import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [
  {
    title: 'Home',
    icon: 'mdi-home',
    path: '/',
    enabled: true,
    component: () => import('../pages/Home.vue'),
    meta: {
      title: 'Home • Extensions Builder',
    },
  },
  {
    title: 'Progress Bar',
    icon: 'mdi-progress-upload',
    path: '/Progress-Bar',
    enabled: true,
    component: () => import('../pages/Progress-Bar.vue'),
    meta: {
      title: 'Progress Bar • Extensions Builder',
    },
  },
  {
    title: 'Mute Indicator',
    icon: 'mdi-volume-mute',
    path: '/Mute-Indicator',
    enabled: true,
    component: () => import('../pages/Mute-Indicator.vue'),
    meta: {
      title: 'Mute Indicator • Extensions Builder',
    },
  },
  {
    title: 'Music Widget',
    icon: 'mdi-spotify',
    path: '/Music-Widget',
    enabled: false,
    component: () => import('../pages/Music-Widget.vue'),
    meta: {
      title: 'Music Widget • Extensions Builder',
      metaTags: [
        {
          property: 'og:title',
          content: 'Music Widget'
        }
      ]
    },
  },
  {
    title: 'Weather Widget',
    icon: 'mdi-weather-lightning',
    path: '/Weather-Widget',
    enabled: true,
    component: () => import('../pages/Weather-Widget.vue'),
    meta: {
      title: 'Weather Widget • Extensions Builder',
      metaTags: [
        {
          property: 'og:title',
          content: 'Weather Widget'
        }
      ]
    },
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

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
