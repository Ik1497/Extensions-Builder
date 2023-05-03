<script setup>

</script>

<template>
  <div class="v-overline">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.v-overline {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  margin-bottom: .5rem;
}
</style>
