<script setup>
import ExtensionsNavigationDrawer from './components/ExtensionsNavigationDrawer.vue'
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-toolbar-title>Extensions Builder <span style="font-weight: 100;">by Ik1497</span></v-toolbar-title>
    </v-app-bar>

    <ExtensionsNavigationDrawer />

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<style lang="scss" scoped>
.v-main {
  margin: 1rem;
}
</style>
