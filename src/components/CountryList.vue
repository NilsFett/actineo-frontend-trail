<script lang="ts">
import { Vue } from 'vue-class-component'
import { AllCountriesByCode } from '../interfaces/AllCountriesByCode'

export default class CountryList extends Vue {
  protected allCountriesByCode: AllCountriesByCode = {}

  get getAllCountriesByCode () : AllCountriesByCode {
    return this.allCountriesByCode
  }

  /*
  * Check if data ist allready in the store.
  + If not make the api call and store only needed country data as object indexed by the counrtycode
  */
  created () : void {
    const allCountriesByCode = this.$store.state.allCountriesByCode
    if (allCountriesByCode) {
      this.allCountriesByCode = allCountriesByCode
    } else {
      this.axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].region.length > 0) {
            this.allCountriesByCode[response.data[i].alpha2Code] = {
              name: response.data[i].name,
              code: response.data[i].alpha2Code,
              region: response.data[i].region,
              flag: response.data[i].flag,
              languages: response.data[i].languages
            }
          }
        }
        this.$store.commit('saveAllCountriesByCode', this.allCountriesByCode)
      })
    }
  }
}
</script>
