<script setup>
import { onMounted } from 'vue'

const props = defineProps(['data-params'])
const extensionBaseUrl = JSON.parse(JSON.stringify(props)).dataParams.baseUrl
const params = JSON.parse(JSON.stringify(props)).dataParams.URLSearchParams

onMounted(() => {
  document.getElementById('urlParametersList').querySelectorAll(`.v-list-item`).forEach(vListItem => {
    if (vListItem.querySelector(`.v-select`) != null) {
      vListItem.querySelector(`.v-select`).addEventListener(`change`, () => {
        setTimeout(updateParamsUi);
      })
    }
    
    else if (vListItem.querySelector(`.v-text-field`) != null) {
      vListItem.querySelector(`.v-text-field input[type="text"]`).addEventListener(`keydown`, () => {
        setTimeout(updateParamsUi);
      })
    }
  });

  updateParamsUi()

  function updateParamsUi() {
    const updateParamsUiCodeColors = {
      default: `#ffffff`,
      property: `#ff79c6`,
      value: `#50fa7b`,
      seperator: `#bd93f9`,
      baseUrl: `#aaa`,
    }
    let URLSearchParamsArray = [] // Object.entries() format
    let URLSearchParamsOutput = `<span style="color: ${updateParamsUiCodeColors.baseUrl}">${extensionBaseUrl}</span>`

    document.getElementById('urlParametersList').querySelectorAll(`.v-list-item`).forEach(vListItem => {
      if (vListItem.querySelector(`.v-select`) != null) {
        if (vListItem.querySelector(`.v-select .v-select__selection-text`)?.innerText != undefined) {
          URLSearchParamsArray.push([vListItem.querySelector(`.v-list-item-title`).innerText, vListItem.querySelector(`.v-select .v-select__selection-text`)?.innerText])
        }
      } 
      
      else if (vListItem.querySelector(`.v-text-field`) != null) {
        if (vListItem.querySelector(`.v-text-field input[type="text"]`).value != ``) {
          URLSearchParamsArray.push([vListItem.querySelector(`.v-list-item-title`).innerText, vListItem.querySelector(`.v-text-field input[type="text"]`).value])
        }
      }
    });
    
    console.log(URLSearchParamsArray)
    URLSearchParamsArray.forEach((URLSearchParamsArrayItem, URLSearchParamsArrayIndex) => {
      if (URLSearchParamsArrayIndex === 0) {
        URLSearchParamsOutput += `<span style="color: ${updateParamsUiCodeColors.seperator}">?</span><span style="color: ${updateParamsUiCodeColors.property}">${URLSearchParamsArrayItem[0]}</span><span style="color: ${updateParamsUiCodeColors.default}">=</span><span style="color: ${updateParamsUiCodeColors.value}">${URLSearchParamsArrayItem[1]}</span>`
      } else {
        URLSearchParamsOutput += `<span style="color: ${updateParamsUiCodeColors.seperator}">&</span><span style="color: ${updateParamsUiCodeColors.property}">${URLSearchParamsArrayItem[0]}</span><span style="color: ${updateParamsUiCodeColors.default}">=</span><span style="color: ${updateParamsUiCodeColors.value}">${URLSearchParamsArrayItem[1]}</span>`
      }
    });
    document.getElementById(`urlParametersOutputUrl`).innerHTML = URLSearchParamsOutput
    return document.getElementById(`urlParametersOutputUrl`).innerText
  }

  document.getElementById(`urlParametersCopyOutputUrl`).addEventListener(`click`, () => {
    navigator.clipboard.writeText(updateParamsUi())
  })
})
</script>

<template>
  <v-card>
    <v-card-title primary-title>Output</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <pre><code
        id="urlParametersOutputUrl"
      ></code></pre>
      <br>
      <v-snackbar
        :timeout="2000"
      >
        <template #activator="{ props }">
          <v-btn 
            id="urlParametersCopyOutputUrl"
            class="ma-2"
            v-bind="props"
          >Copy To Clipboard</v-btn>
        </template>
        Copied to Clipboard!
      </v-snackbar>
    </v-card-text>
  </v-card>
  <br>
  <v-card>
    <v-card-title primary-title>URL Parameters</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-list
        id="urlParametersList"
      >
        <template 
          v-for="param in params"
          :key="param.name"
        >
          <v-list-item
            v-if="param.type != 'heading'"
            :title="param.name"
            :subtitle="param.description"
          >
          <br>
          <v-select
              v-if="param.type === 'options'"
              label="Select"
              :items="param.options"
              clearable
            ></v-select>
            <v-text-field
              v-if="param.type === 'string'"
              :label="param.name"
              clearable
            ></v-text-field>
          </v-list-item>
          <h2 v-else>{{ param.name }}</h2>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.v-list-item {
  background: #181818;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}

h2 {
  margin-bottom: 1rem;
}

pre {
  background: #181818;
  overflow-x: auto;
  padding-block: 1rem;
  padding-inline: .5rem;
}
</style>