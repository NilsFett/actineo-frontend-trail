<template>
  <div class="home" v-if="dataReady">
    <h2>Welcome Globetrotter!</h2>
    <p>
      <img v-bind:src="randomCountry.flag" />
      How about a visit to {{randomCountry.name}}?<br />
      You only need to learn {{formatLanguages(randomCountry.languages)}}!
    </p>
  </div>
  <p v-else>Loading...</p>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import CountryList from '@/components/CountryList.vue'
import { Country } from '../interfaces/Country'

@Options({
  name: 'Home'
})
export default class Home extends CountryList {
  private visitedCountries : string[] = []
  private visitedCountriesReady = false

  get dataReady () : boolean {
    return this.visitedCountriesReady && Object.keys(this.getAllCountriesByCode).length > 0
  }

  get randomCountry () : Country {
    // clone, so you can delete params without concerning the original data
    const allCountriesByCode = Object.assign({}, this.getAllCountriesByCode)
    // delete countries allready visited
    for (let i = 0; i < this.visitedCountries.length; i++) {
      delete allCountriesByCode[this.visitedCountries[i]]
    }
    // return random
    const keys = Object.keys(allCountriesByCode)
    return allCountriesByCode[keys[keys.length * Math.random() << 0]]
  }

  private formatLanguages (languages: any[]) : string {
    let returnString = ''
    if (languages.length === 1) {
      return languages[0].name
    } else {
      for (let i = 0; i < languages.length; i++) {
        if (i === 0) {
          returnString = `${languages[i].name} `
        } else if (i === (languages.length - 1)) {
          returnString = `${returnString} or ${languages[i].name}`
        } else {
          returnString = `${returnString}, ${languages[i].name}`
        }
      }
    }
    console.log('formatLanguages')
    console.log(languages)
    return returnString
  }

  mounted () : void {
    this.axios.get('http://localhost:3000/visits').then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (!this.visitedCountries.includes(response.data[i].country)) {
          this.visitedCountries.push(response.data[i].country)
        }
      }
      this.visitedCountriesReady = true
      console.log(this.visitedCountries)
    })
  }
}
</script>
<style lang="scss">
  .home img{
    height:70px;
    float: left;
    padding-right:20px;
  }
  .home h2{
    margin-bottom: 20px;
  }
</style>
