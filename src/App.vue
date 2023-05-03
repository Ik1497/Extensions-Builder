<script setup>
import ExtensionsNavigationDrawer from './components/ExtensionsNavigationDrawer.vue'

import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const display = ref(useDisplay())

const expanded = ref(true)
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon v-if="display.mobile" @click="expanded = !expanded"></v-app-bar-nav-icon>

      <img src="https://ik1497.github.io/assets/images/favicon.png" alt="Favicon">

      <v-app-bar-title>Extensions Builder <span style="font-weight: 100;">by Ik1497</span></v-app-bar-title>
    </v-app-bar>

    <ExtensionsNavigationDrawer :mobile="display.mobile" :expanded="display.mobile === true ? expanded : display.mobile === false ? `` : undefined" />

    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>

  </v-app>
</template>

<style lang="scss" scoped>
.v-main {
  margin: 1rem;
}

.v-app-bar img {
  width: 2.75rem;
  margin-left: 1rem;
}
</style>
