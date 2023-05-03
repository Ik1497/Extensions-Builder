<script setup>
import { ref } from 'vue'

const props = defineProps([
  `base-url`
])

const emits = defineEmits([
  `update`
])

const url = ref(``)
const overwrite = ref(false)

function update() {
  if (validateURL(url.value) != true) return

  let params = [...(new URLSearchParams(url.value.replace(props.baseUrl, ``)))]

  emits(`update`, {
    overwrite: overwrite.value,
    data: Object.fromEntries(params)
  })

  return {
    success: validateURL(url.value, true) === true ? true : false
  }
}

function validateURL(text, resetUrl = false) {
  if (resetUrl) url.value = ``

  if (!text.startsWith(props.baseUrl)) {
    return `URL must start with ${props.baseUrl}`
  } else if ([...(new URLSearchParams(text.replace(props.baseUrl)))] === []) {
    return `No params found`
  } else {
    return true
  }
}
</script>

<template>
  <v-dialog
    transition="dialog-bottom-transition"
    width="auto"
  >
    <template #activator="{ props }">
      <v-btn
        color="primary"
        variant="tonal"
        prepend-icon="mdi-link"
        v-bind="props"
      >Import from URL</v-btn>
    </template>
    <template #default="{ isActive }">
      <v-card width="50rem">
        <v-toolbar color="primary">
          <v-toolbar-title>Import from URL</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            label="URL"
            color="primary"
            :rules="[validateURL]"
            clearable
            v-model.trim="url"
          ></v-text-field>

          <v-checkbox
            label="Overwrite params (instead of add to params)"
            v-model="overwrite"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            color="success"
            :disabled="url === ``"
            @click="if (update().success === true) {isActive.value = false};"
          >Update</v-btn>
          <v-btn
            variant="text"
            @click="isActive.value = false"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>
