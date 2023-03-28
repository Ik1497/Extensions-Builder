<script setup>
import { ref } from 'vue';
const activeItem = ref(0);
const items = [
  {
    name: 'Home',
    icon: 'mdi-home',
    href: '/',
    public: true
  }
]

addRoutes()

async function addRoutes() {
  let urlParams = await fetch(`https://raw.githubusercontent.com/Ik1497/Docs/main/api/url-parameters.json`)
  urlParams = await urlParams.json()
  urlParams = urlParams.pages

  urlParams.forEach(async function (urlParam) {
    let pageData = await fetch(`https://raw.githubusercontent.com/Ik1497/Docs/main/url-parameters-src/${urlParam.apiPath}.json`)
    pageData = await pageData.json()

    pageData.URLSearchParams = JSON.parse(pageData.URLSearchParams)
    pageData.href = `/${urlParam.path}`

    items.push(pageData)
  });
}
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list v-model="activeItem" nav density="compact">
      <template
        v-for="(item, idx) in items"
        :key="idx"
      >
        <v-list-item
          v-if="item.public"
          :active="$route.path === item.href"
          active-color="primary"
          :to="'.' + item.href"
          @click="activeItem = idx"
        >
          <template #prepend>
            <v-icon class="mr-3">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>