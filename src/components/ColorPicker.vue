<script setup>
import { ref } from 'vue'
import VOverline from './VOverline.vue'

const props = defineProps([
  `modelValue`
])

const emits = defineEmits([
  `update:modelValue`
])

const color = ref(``)
const colorType = ref(`Color Picker`)
const swatches = ref(false)

function update() {
  emits(`update:modelValue`, color.value)
}

function clearColor() {
  color.value = ``
  update()
}
</script>

<template>
  <div class="color-picker-container">
    <div class="color-picker-col">
      <v-overline>Options</v-overline>
      <v-select
        :items="[
          `Color Picker`,
          `Text (used for gradients)`
        ]"
        item-title="name"
        item-value="value"
        label="Color Type"
        v-model="colorType"
      ></v-select>

      <v-checkbox
        label="Swatches"
        v-model="swatches"
        v-if="colorType === `Color Picker`"
      ></v-checkbox>

      <v-btn
        color="error"
        variant="tonal"
        @click="clearColor"
      >Clear color</v-btn>
    </div>
    <div class="color-picker-col">
      <v-overline>Item</v-overline>
      <div v-if="colorType === `Color Picker`" style="display: flex;">
        <v-color-picker
          swatches-max-height="150px"
          :show-swatches="swatches"
          v-model="color"
          @update:modelValue="update"
        ></v-color-picker>
      </div>
      <v-text-field
        v-else-if="colorType = `Text (used for gradients)`"
        label="Color"
        clearable
        v-model="color"
        @update:modelValue="update"
      ></v-text-field>
    </div>
  </div>
</template>

<style scoped>
  .color-picker-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
    gap: 1rem;
  }
</style>
