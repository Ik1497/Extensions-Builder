<script setup>
import ExtensionsURLSearchParams from '../components/ExtensionsURLSearchParams.vue'

const extensionData = {
  name: 'Mute Indicator',
  baseUrl: 'https://ik1497.github.io/Extensions/Mute-Indicator/',
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
      options: ['default', 'big']
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
      name: 'font-weight',
      description: 'The Font Weight.',
      default: '900',
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
      name: 'font-color',
      description: 'The Font and the mute icon color (HEX values unsupported).',
      default: 'hsl(0, 0%, 9%)',
      type: 'string'
    },
    {
      name: 'Chip Styling',
      type: 'heading'
    },
    {
      name: 'chip-background',
      description: 'The background of the chips (HEX values unsupported).',
      default: 'hsl(0, 100%, 65%)',
      type: 'string'
    },
    {
      name: 'chip-border-radius',
      description: 'The border radius of the chips.',
      default: '0',
      type: 'string'
    },
    {
      name: 'Only Include/Exclude certain audio sources',
      description: 'You can\'t use both at the same time',
      type: 'heading'
    },
    {
      name: 'exclude',
      description: 'The audio sources to only exlude',
      default: 'None',
      type: 'comma-list'
    },
    {
      name: 'include',
      description: 'The audio sources to only include',
      default: 'None',
      type: 'comma-list'
    }
  ]
};

</script>

<template>
  <ExtensionsURLSearchParams :data-params="extensionData" />
</template>

<style lang="scss" scoped>

</style>