<script setup>
import ExtensionsURLSearchParams from '../components/ExtensionsURLSearchParams.vue'

const extensionData = {
  name: 'Progress Bar',
  baseUrl: 'https://ik1497.github.io/Extensions/Progress-Bar/',
  URLSearchParams: [
    {
      name: 'General',
      type: 'heading'
    },
    {
      name: 'ws',
      description: 'The Streamer.bot websocket server.',
      default: 'ws://localhost:8080/',
      type: 'string'
    },
    {
      name: 'Background',
      type: 'heading'
    },
    {
      name: 'background',
      description: 'The background behind the progress bar (HEX values unsupported).',
      default: {h: 0, s: 0, l: 1, a: .8},
      type: 'color'
    },
    {
      name: 'background-progress-bar',
      description: 'The background of the progress bar (HEX values unsupported).',
      default: {h: 279, s: 1, l: .77, a: 1},
      type: 'color'
    },
    {
      name: 'background-border-radius',
      description: 'The border radius of the progress bar.',
      default: '.3em',
      type: 'string'
    },
    {
      name: 'Animations',
      type: 'heading'
    },
    {
      name: 'animation-duration',
      description: 'The duration of the animations.',
      default: '1500ms',
      type: 'string'
    },
    {
      name: 'transition-duration',
      description: 'The duration of the transitions for the progress bar.',
      default: '750ms',
      type: 'string'
    },
    {
      name: 'Position',
      type: 'heading'
    },
    {
      name: 'position',
      description: 'Where all the progress bars should be located.',
      type: 'options',
      default: 'top-left',
      options: ['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right']
    },
    {
      name: 'Cycle (WIP)',
      type: 'heading'
    },
    {
      name: 'The cycle feature lets all of the progress bar cycle. Enabling this feature will only show one progress bar at a time, and cycle through the progress bar list with transitions.',
      type: 'text'
    },
    {
      name: 'cycle',
      description: 'Enable the cycle feature.',
      type: 'checkbox',
      default: false
    },
    {
      name: 'cycle-duration',
      description: 'How long each progress bar should be visible before continuing with the cycle (in MS only).',
      default: '15000',
      type: 'number'
    },
    {
      name: 'cycle-transition-duration',
      description: 'How long the cycle transition should take (in MS only).',
      default: '500',
      type: 'number'
    },
    {
      name: 'cycle-transition',
      description: 'Which transition should be used.',
      type: 'options',
      default: 'fade',
      options: ['cut', 'fade', 'slide-up', 'slide-right', 'slide-down', 'slide-left']
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
      default: '3em',
      type: 'string'
    },
    {
      name: 'font-color',
      description: 'The Font Color (HEX values unsupported).',
      default: {h: 0, s: 0, l: 1, a: 1},
      type: 'color'
    },
  ]
};

</script>

<template>
  <ExtensionsURLSearchParams :data-params="extensionData" />
</template>

<style lang="scss" scoped>

</style>