<script setup>
import { computed, ref } from 'vue';
const activeItem = ref(0);
const items = computed(() => [
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
]);
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list v-model="activeItem" nav density="compact">
      <template
        v-for="(item, idx) in items"
        :key="idx"
      >
        <v-list-item
          v-if="item.enabled"
          :active="$route.path === item.path"
          active-color="primary"
          :to="item.path"
          @click="activeItem = idx"
        >
          <template #prepend>
            <v-icon class="mr-3">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>

          <!-- <template v-if="item.badge" #append>
            <v-chip label color="primary" size="x-small">{{ item.badge }}</v-chip>
          </template> -->
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>