<script setup>
import { ref } from 'vue';
import { GetRoutes } from '@/composables/GetRoutes';

const props = defineProps([
  `expanded`,
  `mobile`
])

const activeItem = ref(0);
const items = ref([
  {
    name: 'Home',
    icon: 'mdi-home',
    href: '/',
    public: true
  }
])

app()

async function app() {
  let routesData = await GetRoutes()

  items.value = [
    ...items.value,
    ...routesData
  ]

  items.value.forEach((item, itemIndex) => {
    if (localStorage.getItem(`websiteSettings__visibilityChannel`) === `beta`) items.value[itemIndex].public = true
  })
}
</script>

<template>
  <v-navigation-drawer :permanent="!props.mobile" v-model="props.expanded">
    <v-list v-model="activeItem" nav density="compact">
      <template
        v-for="(route, routeIndex) in items"
        :key="routeIndex"
      >
        <v-list-item
          v-if="route.public"
          :active="$route.path === route.path"
          active-color="primary"
          :to="'./' + route.path"
          @click="activeItem = routeIndex"
        >
          <template #prepend>
            <v-icon class="mr-3">{{ route.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ route.name }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
