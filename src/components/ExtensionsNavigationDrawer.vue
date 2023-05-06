<script setup>
import { ref } from 'vue'
import { GetRoutes } from '@/composables/GetRoutes'
import { useRoute } from 'vue-router'

const props = defineProps([
  `model-value`,
  `expanded`,
  `mobile`,
])

const emits = defineEmits([
  `update:modelValue`,
])

const currentRoute = useRoute()

const activeItem = ref(0);
const items = ref([
  {
    name: 'Home',
    icon: 'mdi-home',
    path: '/',
    public: true
  }
])

const settings = ref(props.modelValue || {
  loaded: false,
})

app()

async function app() {
  let routesData = await GetRoutes()
  routesData = routesData.array

  items.value = [
    ...items.value,
    ...routesData
  ]

  items.value.forEach((item, itemIndex) => {
    if (localStorage.getItem(`websiteSettings__visibilityChannel`) === `beta`) items.value[itemIndex].public = true
  })

  emits(`update:modelValue`, {
    ...settings.value,
    loaded: true,
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
          :active="currentRoute.path === `/${route.path}`"
          active-color="primary"
          :to="route.path"
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
