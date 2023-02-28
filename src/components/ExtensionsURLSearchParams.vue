<script setup>
import { onMounted } from 'vue'

const props = defineProps(['data-params'])
const extensionName = JSON.parse(JSON.stringify(props)).dataParams.name
const extensionBaseUrl = JSON.parse(JSON.stringify(props)).dataParams.baseUrl
const params = JSON.parse(JSON.stringify(props)).dataParams.URLSearchParams

let searchParamsIndex = 0
let searchParams = []

for (let searchParam of new URLSearchParams(window.location.href)) {
  if (searchParamsIndex != 0) {
    searchParams.push(searchParam)
  }
  searchParamsIndex++
}

onMounted(() => {
  document.getElementById('urlParametersList').querySelectorAll(`.v-list-item`).forEach(vListItem => {
    vListItem.querySelector(`.close-list-item-button`).addEventListener(`click`, () => {
      setTimeout(updateParamsUi);
    })


    if (vListItem.querySelector(`.v-select`) != null) {
      vListItem.querySelector(`.v-select`).addEventListener(`mouseover`, () => {
        setTimeout(updateParamsUi);
      })
      vListItem.querySelector(`.v-select`).addEventListener(`click`, () => {
        setTimeout(updateParamsUi);
      })
    }
    
    else if (vListItem.querySelector(`.v-text-field`) != null) {
      vListItem.querySelector(`.v-text-field input[type="text"]`).addEventListener(`keydown`, () => {
        setTimeout(updateParamsUi);
      })
      vListItem.querySelector(`.v-text-field`).addEventListener(`click`, () => {
        setTimeout(updateParamsUi);
      })
    }
    
    else if (vListItem.querySelector(`.v-checkbox`) != null) {
      vListItem.querySelector(`.v-checkbox`).addEventListener(`click`, () => {
        setTimeout(updateParamsUi);
      })
    }
    
    else if (vListItem.querySelector(`.v-color-picker`) != null) {
      vListItem.querySelector(`.v-color-picker`).addEventListener(`click`, () => {
        setTimeout(updateParamsUi);
        vListItem.querySelector(`.v-color-picker`).removeAttribute(`data-default-value-used`)
      })
      
      vListItem.querySelector(`.v-color-picker`).addEventListener(`keydown`, () => {
        setTimeout(updateParamsUi);
        vListItem.querySelector(`.v-color-picker`).removeAttribute(`data-default-value-used`)
      })
      
      vListItem.querySelector(`.v-color-picker .v-color-picker-canvas__dot`).addEventListener(`mousemove`, (e) => {
        if (e.buttons > 0) {
          setTimeout(updateParamsUi);
          vListItem.querySelector(`.v-color-picker`).removeAttribute(`data-default-value-used`)
        }
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
        if (vListItem.querySelector(`.v-select .v-select__selection-text`)?.innerText != undefined && vListItem.querySelector(`.v-select .v-select__selection-text`)?.innerText != `None`) {
          URLSearchParamsArray.push([vListItem.querySelector(`.v-list-item-title`).innerText, vListItem.querySelector(`.v-select .v-select__selection-text`)?.innerText])
        }
      }
      
      else if (vListItem.querySelector(`.v-text-field`) != null) {
        if (vListItem.querySelector(`.v-text-field input[type="text"]`).value != ``) {
          URLSearchParamsArray.push([vListItem.querySelector(`.v-list-item-title`).innerText, vListItem.querySelector(`.v-text-field input[type="text"]`).value])
        }
      }
      
      else if (vListItem.querySelector(`.v-checkbox`) != null) {
        if (vListItem.querySelector(`.v-checkbox input[type="checkbox"]`).checked) {
          URLSearchParamsArray.push([vListItem.querySelector(`.v-list-item-title`).innerText])
        }
      }
      
      else if (vListItem.querySelector(`.v-color-picker`) != null && vListItem.querySelector(`.v-color-picker`).getAttribute(`data-default-value-used`) != ``) {
        URLSearchParamsArray.push([vListItem.querySelector(`.v-list-item-title`).innerText, vListItem.querySelector(`.v-color-picker .v-color-picker-preview__dot div`).style.background])
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

  document.getElementById(`urlParametersCopyOutputUrl`).addEventListener(`click`, () => {
    navigator.clipboard.writeText(updateParamsUi())
  })

})
</script>

<template>
  <h1>{{ extensionName }}</h1>
  <v-divider></v-divider>
  <br>
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
      <v-list
        id="urlParametersList"
      >
        <template 
          v-for="param in params"
          :key="param.name"
        >
          <v-list-item
            v-if="param.type != 'heading' && param.type != 'text' && param.type != 'link'"
            :title="param.name"
            :subtitle="param.description"
            :data-url-parameter="param.name"
          >
          <v-btn
            icon="mdi-close"
            color="error"
            variant="tonal"
            class="close-list-item-button"
            onclick="this.parentNode.parentNode.remove()"
          >
          </v-btn>
          <br>
          <v-select
              v-if="param.type === 'options'"
              label="Select"
              :items="param.options"
              :model-value="param.default"
              clearable
            ></v-select>
            <v-text-field
              v-if="param.type === 'string' || param.type === 'comma-list'"
              :label="`${param.name}${param.type === 'comma-list' ? ` (Comma seperated list)` : ``}`"
              :placeholder="param.default"
              clearable
            ></v-text-field>
            <v-checkbox
              v-if="param.type === 'checkbox'"
              :label="param.name"
              :model-value="param.default"
              ></v-checkbox>
              <v-color-picker
              v-if="param.type === 'color'"
              :model-value="param.default != `None` ? param.default : null"
              :modes="['hsl', 'hsla', 'rgb', 'rgba']"
              data-default-value-used
            ></v-color-picker>
          </v-list-item>
          <template v-else-if="param.type === 'heading'">
            <h2>{{ param.name }}
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
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.v-list-item {
  background: #181818;
  padding-block: 1rem;
  border-radius: 4px;
  position: relative;

  &:not(:last-child) {
    margin-bottom: .5rem;
  }
  .close-list-item-button {
    --v-btn-height: .5rem;
    font-size: var(--v-btn-height);

    position: absolute;
    right: 1rem;
    top: 1rem;
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