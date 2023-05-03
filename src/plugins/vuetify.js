// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from 'vuetify/lib/util/colors'

// Vuetify
import { createVuetify } from 'vuetify'

// Labs
import { VDataTable } from 'vuetify/labs/VDataTable'

export default createVuetify({
  theme: {
    defaultTheme: `dark`,
    themes: {
      dark: {
        colors: {
          primary: colors.blue.lighten1,
          secondary: colors.blueGrey.lighten1
        }
      }
    }
  },
  components: {
    VDataTable,
  },
  display: {
    mobileBreakpoint: `md`
  }
})
