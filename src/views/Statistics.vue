<template>
  <div>
    <ul v-if="Object.keys(getAllCountriesByCode).length > 0  && getCountryCounts.length">
      <li v-for="countryCount in getCountryCounts" :key="countryCount">{{getAllCountriesByCode[countryCount.country].name}} ({{countryCount.count}})</li>
    </ul>
    <p v-else>Loading data ...</p>
  </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import CountryList from '@/components/CountryList.vue'

interface CountryCount {
  country: string;
  count: number;
}

@Options({
  name: 'Statistics'
})
export default class Home extends CountryList {
  private countryCounts: CountryCount[] = []

  get getCountryCounts () : CountryCount[] {
    return this.countryCounts
  }

  mounted () : void {
    this.axios.get('http://localhost:3000/visits').then((response) => {
      // Loop response data. Check if country log exists. If not make new entry, otherwise increment
      for (let i = 0; i < response.data.length; i++) {
        let index
        if ((index = this.countryCounts.findIndex((element) => {
          if (element.country === response.data[i].country) return true
          else return false
        })) > -1) {
          this.countryCounts[index].count++
        } else {
          this.countryCounts.push({
            country: response.data[i].country,
            count: 1
          })
        }
      }
      // sort by count and reduce to 5
      this.countryCounts = this.countryCounts.sort((a, b) => (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0)).slice(0, 5)
    })
  }
}
</script>
