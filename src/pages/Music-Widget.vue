<script setup>
import ExtensionsURLSearchParams from '../components/ExtensionsURLSearchParams.vue'

const extensionData = {
  baseUrl: 'https://ik1497.github.io/Extensions/Music/',
  URLSearchParams: [
    {
      name: 'General',
      type: 'heading'
    },
    {
      name: 'theme',
      description: 'Different visual options for this widget.',
      type: 'options',
      default: 'default',
      options: ['default', 'minimal']
    },
    {
      name: 'ws',
      description: 'The Streamer.bot websocket server.',
      default: 'ws://localhost:8080/',
      type: 'string'
    },
    {
      name: 'Font',
      type: 'heading'
    },
    {
      name: 'font-family',
      description: 'The Font Family (Case Sensitive).',
      default: 'Uni Sans CAPS',
      type: 'string'
    },
    {
      name: 'font-style',
      description: 'The Font Style.',
      default: 'normal',
      type: 'string'
    },
    {
      name: 'font-size',
      description: 'The Font Size.',
      default: '1em',
      type: 'string'
    },
    {
      name: 'Background',
      type: 'heading'
    },
    {
      name: 'background',
      description: 'The background behind the music info.',
      default: 'hsl(0, 0%, 0%, 0.7)',
      type: 'string'
    },
    {
      name: 'alt-background',
      description: 'The background behind the album cover.',
      default: 'hsl(240, 5%, 11%)',
      type: 'string'
    },
    {
      name: 'Colors',
      type: 'heading'
    },
    {
      name: 'color-primary',
      description: 'The primary text color, used for the song title.',
      default: 'hsl(0, 0%, 100%)',
      type: 'string'
    },
    {
      name: 'color-accent',
      description: 'The accent text color, used for the song artist.',
      default: 'hsla(0, 0%, 100%, 0.7)',
      type: 'string'
    },
    {
      name: 'Border Radius',
      type: 'heading'
    },
    {
      name: 'border-radius-album-cover',
      description: 'The border radius on the album cover.',
      default: '1em',
      type: 'string'
    },
    {
      name: 'border-radius-texts-background',
      description: 'The border radius of the text\'s background.',
      default: '1.5em',
      type: 'string'
    },
  ]
};

</script>

<template>
  <ExtensionsURLSearchParams :data-params="extensionData" />
</template>

<style lang="scss" scoped>

</style>