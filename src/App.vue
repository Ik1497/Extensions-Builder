<script setup>
import ExtensionsNavigationDrawer from './components/ExtensionsNavigationDrawer.vue'
</script>

<template>
  <v-app>
    <v-app-bar>
      <img src="https://ik1497.github.io/assets/images/favicon.png" alt="Favicon">
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

.v-app-bar img {
  width: 2.75rem;
  margin-left: 1rem;
}
</style>
