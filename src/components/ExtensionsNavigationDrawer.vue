<script setup>
import { computed, ref } from 'vue';
const activeItem = ref(0);
const items = computed(() => [
  {
    title: 'Home',
    icon: 'mdi-home',
    path: '/',
    component: () => import('../pages/Home.vue')
  },
  {
    title: 'Music Widget',
    icon: 'mdi-spotify',
    path: '/Music-Widget',
    component: () => import('../pages/Music-Widget.vue')
  }
]);
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list v-model="activeItem" nav density="compact">
      <v-list-item
        v-for="(item, idx) in items"
        :key="idx"
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
    </v-list>
  </v-navigation-drawer>
</template>