<script setup>
import { ref } from 'vue'
import ColorPicker from './ColorPicker.vue'
import ImportFromUrl from './ImportFromUrl.vue'

const props = defineProps(['data-params'])

const extensionName = JSON.parse(JSON.stringify(props)).dataParams.name
const extensionBaseUrl = JSON.parse(JSON.stringify(props)).dataParams.baseUrl
const params = JSON.parse(JSON.stringify(props)).dataParams.URLSearchParams
const paramsCount = params.length

const paramsData = ref({})
const paramsOutput = ref(``)
const paramsOutputText = ref(``)

const combobox_search = ref({})

updateParamsUi()

function updateParamsUi() {
  const updateParamsUiCodeColors = {
    default: `#ffffff`,
    property: `#ff79c6`,
    value: `#50fa7b`,
    seperator: `#bd93f9`,
    baseUrl: `#aaa`,
  }

  Object.entries(paramsData.value).forEach(([item, value]) => {
    if (value === `` || value === null || value === undefined) {
      delete paramsData.value[item]
    }
  })

  let URLSearchParamsArray = Object.entries(paramsData.value)
  let URLSearchParamsOutputStyled = `<span style="color: ${updateParamsUiCodeColors.baseUrl}">${extensionBaseUrl}</span>`
  let URLSearchParamsOutputText = extensionBaseUrl

  URLSearchParamsArray.forEach((URLSearchParamsArrayItem, URLSearchParamsArrayIndex) => {
    let URLParamKey = URLSearchParamsArrayItem[0]
    let URLParamValue = URLSearchParamsArrayItem[1]

    if (URLParamValue != true && URLParamValue != false) {
      if (URLParamValue === `` || URLParamValue === null) delete paramsData.value[URLParamKey]
      if (URLParamValue === `` || URLParamValue === null) return
      if (Array.isArray(URLParamValue)) URLParamValue = JSON.stringify(URLParamValue)
      URLParamValue = URLParamValue.replaceAll(`#`, `%23`)

      if (URLSearchParamsArrayIndex === 0) {
        URLSearchParamsOutputStyled += `<span style="color: ${updateParamsUiCodeColors.seperator}">?</span><span style="color: ${updateParamsUiCodeColors.property}">${URLSearchParamsArrayItem[0]}</span><span style="color: ${updateParamsUiCodeColors.default}">=</span><span style="color: ${updateParamsUiCodeColors.value}">${URLParamValue}</span>`
        URLSearchParamsOutputText += `?${URLParamKey}=${URLParamValue}`
      } else {
        URLSearchParamsOutputStyled += `<span style="color: ${updateParamsUiCodeColors.seperator}">&</span><span style="color: ${updateParamsUiCodeColors.property}">${URLParamKey}</span><span style="color: ${updateParamsUiCodeColors.default}">=</span><span style="color: ${updateParamsUiCodeColors.value}">${URLParamValue}</span>`
        URLSearchParamsOutputText += `&${URLParamKey}=${URLParamValue}`
      }
    } else {
      if (!URLParamValue) return

      if (URLSearchParamsArrayIndex === 0) {
        URLSearchParamsOutputStyled += `<span style="color: ${updateParamsUiCodeColors.seperator}">?</span><span style="color: ${updateParamsUiCodeColors.property}">${URLParamKey}</span>`
        URLSearchParamsOutputText += `?${URLParamKey}`
      } else {
        URLSearchParamsOutputStyled += `<span style="color: ${updateParamsUiCodeColors.seperator}">&</span><span style="color: ${updateParamsUiCodeColors.property}">${URLParamKey}</span>`
        URLSearchParamsOutputText += `&${URLParamKey}`
      }
    }
  });

  paramsOutput.value = URLSearchParamsOutputStyled
  paramsOutputText.value = URLSearchParamsOutputText

  return paramsOutput
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
}

function importParamsFromUrl(e) {
  if (typeof e != `object`) return

  Object.entries(e.data).forEach(item => {
    e[item[0]] = item[1]
      .replaceAll(`%23`, `#`)
  })

  if (e.overwrite === true) {
    paramsData.value = {
      ...e.data
    }
  } else {
    paramsData.value = {
      ...paramsData.value,
      ...e.data
    }
  }

  updateParamsUi()
}

function clearParams() {
  paramsData.value = {}
  updateParamsUi()
}
</script>

<template>
  <div class="mb-4" style="display: flex; justify-content: space-between; align-items: center;">
    <div>
      <h1 class="text-2xl font-bold">{{ extensionName }}</h1>
      <p class="text-gray-400">{{ paramsCount }} Params</p>
    </div>
    <div style="display: flex; gap: .5rem;">
      <ImportFromUrl :base-url="extensionBaseUrl" @update="importParamsFromUrl" />

      <v-btn
        color="error"
        variant="tonal"
        prepend-icon="mdi-close"
        @click="clearParams"
      >Clear</v-btn>
    </div>
  </div>
  <v-card>
    <v-card-title primary-title>Output</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <pre><code v-html="paramsOutput"></code></pre>
      <br>
      <v-snackbar
        :timeout="2000"
      >
        <template #activator="{ props }">
          <v-btn
            @click="copyToClipboard(paramsOutputText)"
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
              <!-- <div v-if="param.type === 'array'">
                <br>
                <p>The add an option press <v-kbd style="display: inline;">enter</v-kbd></p>
              </div> -->
            </div>
            <br>

            <!-- Sheet Items -->

            <v-select
              v-if="param.type === 'options'"
              label="Select"
              :items="param.options"
              clearable
              v-model="paramsData[param.name]"
              @update:modelValue="updateParamsUi()"
            ></v-select>

            <v-text-field
              v-if="param.type === 'string' || param.type === 'comma-list'"
              :label="`${param.name}${param.type === 'comma-list' ? ` (Comma seperated list)` : ``}`"
              :placeholder="param.default"
              clearable
              v-model="paramsData[param.name]"
              @update:modelValue="updateParamsUi()"
            ></v-text-field>

            <v-text-field
              v-if="param.type === 'number'"
              type="number"
              :label="param.name"
              :placeholder="param.default"
              clearable
              v-model="paramsData[param.name]"
              @update:modelValue="updateParamsUi()"
            ></v-text-field>
              
            <v-checkbox
              v-if="param.type === 'checkbox'"
              :label="param.name"
              :model-value="paramsData[param.name]"
              @update:modelValue="paramsData[param.name] === undefined ? paramsData[param.name] = true : paramsData[param.name] = !paramsData[param.name]; updateParamsUi()"
            ></v-checkbox>

            <color-picker
              v-if="param.type === 'color'"
              :modes="['hsl', 'hsla', 'rgb', 'rgba']"
              v-model="paramsData[param.name]"
              @update:modelValue="updateParamsUi()"
            ></color-picker>

            <v-combobox
              v-if="param.type === 'array'"
              label="Array"
              clearable
              multiple
              chips
              :hide-no-data="false"
              hide-selected
              v-model="paramsData[param.name]"
              v-model:search="combobox_search[param.name]"
              @update:modelValue="updateParamsUi()"
            >

              <template v-slot:no-data>
                <v-list-item v-if="combobox_search[param.name] === undefined || combobox_search[param.name] === null || combobox_search[param.name] === `` || paramsData[param.name] === undefined || paramsData[param.name] === null">
                  <v-list-item-title>
                    Type out your option and then press <v-kbd style="display: inline;">enter</v-kbd>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item v-else-if="paramsData[param.name] && !Object.values(paramsData[param.name]).includes(combobox_search[param.name])">
                  <v-list-item-title>
                    No results matching "<strong>{{ combobox_search[param.name] }}</strong>". Press <v-kbd style="display: inline;">enter</v-kbd> to create a new one
                  </v-list-item-title>
                </v-list-item>
                <v-list-item v-else>
                  <v-list-item-title>
                    "<strong>{{ combobox_search[param.name] }}</strong>" already exists. Press enter to remove "<strong>{{ combobox_search[param.name] }}</strong>".
                  </v-list-item-title>
                </v-list-item>
              </template>
          
            </v-combobox>

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
