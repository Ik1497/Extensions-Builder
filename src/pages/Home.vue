<script setup>
import { ref } from 'vue'
import { GetRoutes } from '../composables/GetRoutes.js'

const routes = ref([])

app()

async function app() {
  let routesData = await GetRoutes()
  routes.value = routesData
}
</script>

<template>
  <v-card>
    <v-card-title>Welcome to ik1497's Extensions Builder!</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <p>This tool is made so you can easily modify all things from an extension in a simple UI. So you don't need to adjust the settings in a hard way yourself anymore</p>
    </v-card-text>
  </v-card>

  <br>

  <template v-for="route in routes">
    <v-card :to="'./' + route.path">
      <v-card-title><v-icon size="xs" style="padding-right: .5rem; padding-bottom: .1rem;">{{ route.icon }}</v-icon> {{ route.name }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>{{ route.URLSearchParams.length }} Params</p>
      </v-card-text>
    </v-card>

    <br>
  </template>
</template>

<style lang="scss" scoped>

</style>