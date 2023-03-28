<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps(['data-params'])

console.log(JSON.parse(JSON.stringify(props)))

const extensionName = JSON.parse(JSON.stringify(props)).dataParams.name
const extensionBaseUrl = JSON.parse(JSON.stringify(props)).dataParams.baseUrl
const params = JSON.parse(JSON.stringify(props)).dataParams.URLSearchParams

onMounted(() => {
  updateParamsUi()

  document.getElementById(`urlParametersCopyOutputUrl`).addEventListener(`click`, () => {
    navigator.clipboard.writeText(updateParamsUi())
  })
})

function updateParamsUi() {
  console.log(`UPDATE`)
  const updateParamsUiCodeColors = {
    default: `#ffffff`,
    property: `#ff79c6`,
    value: `#50fa7b`,
    seperator: `#bd93f9`,
    baseUrl: `#aaa`,
  }
  let URLSearchParamsArray = [] // Object.entries() format
  let URLSearchParamsOutput = `<span style="color: ${updateParamsUiCodeColors.baseUrl}">${extensionBaseUrl}</span>`

  document.getElementById('urlParametersList').querySelectorAll(`.v-sheet#data-url-parameter-element`).forEach(sheetElement => {
    if (sheetElement.querySelector(`.v-select`) != null) {
      if (sheetElement.querySelector(`.v-select .v-select__selection-text`)?.innerText != undefined && sheetElement.querySelector(`.v-select .v-select__selection-text`)?.innerText != `None`) {
        URLSearchParamsArray.push([sheetElement.querySelector(`[data-url-parameter--title]`).innerText, sheetElement.querySelector(`.v-select .v-select__selection-text`)?.innerText])
      }
    }
    
    else if (sheetElement.querySelector(`.v-text-field`) != null) {
      if (sheetElement.querySelector(`.v-text-field input`).value != ``) {
        URLSearchParamsArray.push([sheetElement.querySelector(`[data-url-parameter--title]`).innerText, sheetElement.querySelector(`.v-text-field input`).value])
      }
    }
    
    else if (sheetElement.querySelector(`.v-checkbox`) != null) {
      if (sheetElement.querySelector(`.v-checkbox input[type="checkbox"]`).checked) {
        URLSearchParamsArray.push([sheetElement.querySelector(`[data-url-parameter--title]`).innerText])
      }
    }
    
    else if (sheetElement.querySelector(`.v-color-picker`) != null) {
      if (sheetElement.querySelector(`.v-color-picker .v-color-picker-edit .v-color-picker-edit__input input`).value != ``) {
        URLSearchParamsArray.push([sheetElement.querySelector(`[data-url-parameter--title]`).innerText, sheetElement.querySelector(`.v-color-picker .v-color-picker-preview__dot div`).style.background])
      }
    }
  });

  URLSearchParamsArray.forEach((URLSearchParamsArrayItem, URLSearchParamsArrayIndex) => {
    if (URLSearchParamsArrayItem.length === 2) {
      if (URLSearchParamsArrayIndex === 0) {
        URLSearchParamsOutput += `<span style="color: ${updateParamsUiCodeColors.seperator}">?</span><span style="color: ${updateParamsUiCodeColors.property}">${URLSearchParamsArrayItem[0]}</span><span style="color: ${updateParamsUiCodeColors.default}">=</span><span style="color: ${updateParamsUiCodeColors.value}">${URLSearchParamsArrayItem[1]}</span>`
      } else {
        URLSearchParamsOutput += `<span style="color: ${updateParamsUiCodeColors.seperator}">&</span><span style="color: ${updateParamsUiCodeColors.property}">${URLSearchParamsArrayItem[0]}</span><span style="color: ${updateParamsUiCodeColors.default}">=</span><span style="color: ${updateParamsUiCodeColors.value}">${URLSearchParamsArrayItem[1]}</span>`
      }
    } else {
      if (URLSearchParamsArrayIndex === 0) {
        URLSearchParamsOutput += `<span style="color: ${updateParamsUiCodeColors.seperator}">?</span><span style="color: ${updateParamsUiCodeColors.property}">${URLSearchParamsArrayItem[0]}</span>`
      } else {
        URLSearchParamsOutput += `<span style="color: ${updateParamsUiCodeColors.seperator}">&</span><span style="color: ${updateParamsUiCodeColors.property}">${URLSearchParamsArrayItem[0]}</span>`
      }
    }
  });
  document.getElementById(`urlParametersOutputUrl`).innerHTML = URLSearchParamsOutput
  return document.getElementById(`urlParametersOutputUrl`).innerText
}
</script>

<template>
  <h1
    class="text-2xl font-bold mb-4"
  >{{ extensionName }}</h1>
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
            variant="tonal"
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
      <div
        id="urlParametersList"
      >
        <template 
          v-for="param in params"
          :key="param.name"
        >
          <v-sheet
            v-if="param.type != 'heading' && param.type != 'text' && param.type != 'link'"
            :data-url-parameter="param.name"
            class="rounded-lg"
            id="data-url-parameter-element"
          >

            <!-- Sheet Header -->

            <div>
              <p data-url-parameter--title class="text-gray-200 font-semibold">{{ param.name }}</p>
              <p data-url-parameter--description class="text-gray-400">{{ param.description }}</p>
              <div v-if="param.type === 'options'">
                <br>
                <p>The default value is: "{{ param.default }}", don't alter this property if you want to keep it the same as "{{ param.default }}".</p>
              </div>
            </div>
            <br>

            <!-- Sheet Items -->

            <v-select
              v-if="param.type === 'options'"
              label="Select"
              :items="param.options"
              @update:modelValue="updateParamsUi()"
              clearable
            ></v-select>

            <v-text-field
              v-if="param.type === 'string' || param.type === 'comma-list'"
              :label="`${param.name}${param.type === 'comma-list' ? ` (Comma seperated list)` : ``}`"
              :placeholder="param.default"
              clearable
              @update:modelValue="updateParamsUi()"
            ></v-text-field>

            <v-text-field
              v-if="param.type === 'number'"
              type="number"
              :label="param.name"
              :placeholder="param.default"
              clearable
              @update:modelValue="updateParamsUi()"
            ></v-text-field>
              
            <v-checkbox
              v-if="param.type === 'checkbox'"
              :label="param.name"
              :model-value="param.default"
              @click="updateParamsUi()"
            ></v-checkbox>

            <v-color-picker
              v-if="param.type === 'color'"
              :modes="['hsl', 'hsla', 'rgb', 'rgba']"
              @update:modelValue="updateParamsUi()"
            ></v-color-picker>

          </v-sheet>

          <template v-else-if="param.type === 'heading'">
            <h2 class="text-lg font-bold">{{ param.name }}
              <p v-if="param.description">{{ param.description }}</p>
            </h2>
          </template>

          <template v-else-if="param.type === 'text'">
            <p>{{ param.name }}</p>
            <br>
          </template>

          <template v-else-if="param.type === 'link'">
            <a
              :href="param.href"
              target="_blank"
            >
              {{ param.name }}
            </a>
            <br>
            <br>
          </template>

        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.v-sheet {
  background: #181818;
  padding-block: 1em;
  padding-inline: 1em;
  border-radius: 4px;
  position: relative;

  &:not(:last-child) {
    margin-bottom: .5rem;
  }
}

h2 {
  margin-block: 1rem;
  color: #ddd;

  p {
    font-size: initial;
    font-weight: initial;
    color: #aaa;
    margin-top: .25rem;
  }
}

pre {
  background: #181818;
  overflow-x: auto;
  padding-block: 1rem;
  padding-inline: .5rem;
}
</style>