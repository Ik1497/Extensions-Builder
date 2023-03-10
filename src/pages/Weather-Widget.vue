<script setup>
import ExtensionsURLSearchParams from '../components/ExtensionsURLSearchParams.vue'

const extensionData = {
  name: 'Weather Widget',
  baseUrl: 'https://ik1497.github.io/Extensions/Weather/',
  URLSearchParams: [
    {
      name: 'General',
      type: 'heading'
    },
    {
      name: 'lang',
      description: 'Choose your locale to translate the weather events.',
      type: 'options',
      default: 'en',
      options: ['ar', 'cs', 'da', 'de', 'el', 'en', 'es', 'fi', 'fr', 'it', 'ja', 'nl', 'no', 'pl', 'pt_BR', 'pt', 'ro', 'ru', 'sv', 'uk', 'zh-Hans', 'zh']
    },
    {
      name: 'unit',
      description: 'Choose between celsius and fahrenheit.',
      type: 'options',
      default: 'c',
      options: ['c', 'f']
    },
    {
      name: 'force-time',
      description: 'Force the time of the widget.',
      type: 'options',
      default: 'None',
      options: ['None', 'day', 'night']
    },
    {
      name: 'force-icon-time',
      description: 'Force the time of the icons.',
      type: 'options',
      default: 'None',
      options: ['None', 'day', 'night']
    },
    {
      name: 'animation-off',
      description: 'Turns the animated icons off.',
      type: 'checkbox',
      default: false
    },
    {
      name: 'Location',
      type: 'heading'
    },
    {
      name: 'lat',
      description: 'The latitude.',
      default: '52.52',
      type: 'string'
    },
    {
      name: 'lon',
      description: 'The longitude.',
      default: '13.419998',
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
      default: '1rem',
      type: 'string'
    },
    {
      name: 'font-color',
      description: 'The Font and the mute icon color (HEX values unsupported).',
      default: {h: 0, s: 0, l: 1, a: 1},
      type: 'color'
    },
    {
      name: 'General Widget Styling',
      type: 'heading'
    },
    {
      name: 'border-radius',
      description: 'The border radius of the widget.',
      default: '2rem',
      type: 'string'
    },
    {
      name: 'background',
      description: 'Changes the background color, allows CSS gradients. This will remove the day/night background colors (HEX values unsupported).',
      default: 'None',
      type: 'color'
    },
    {
      name: 'Weather Name',
      type: 'heading'
    },
    {
      name: 'weather-name',
      description: 'Sets the automated weather name to a customized name for things like your location (?lang will have no effect).',
      default: 'None',
      type: 'string'
    },
    {
      name: 'weather-name-prefix',
      description: 'A text you can add before the weather name.',
      default: 'None',
      type: 'string'
    },
    {
      name: 'weather-name-suffix',
      description: 'A text you can add after the weather name.',
      default: 'None',
      type: 'string'
    },
    {
      name: 'weather-name-subtitle',
      description: 'A text you can add under the weather name.',
      default: 'None',
      type: 'string'
    },
    {
      name: 'Open Weather Map',
      type: 'heading'
    },
    {
      name: 'You can use the Open Weather Map API for this widget, it requires the open-weather-map-api-key url parameter. When you have given this API key the weather widget will use this data for the icons and temprature. All URL parameters will work the same.',
      type: 'text'
    },
    {
      name: 'Website to Generate API Key',
      href: 'https://home.openweathermap.org/api_keys',
      type: 'link',
    },
    {
      name: 'open-weather-map-api-key',
      description: 'Your open weather map API key.',
      default: 'None',
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