<template>
  <div>
    <DataTable :value="extendedVisits" :paginator="true" :rows="10" :rowsPerPageOptions="[10,25,50]">
        <Column field="id" header="Id"></Column>
        <Column field="country" header="Country"></Column>
        <Column field="continent" header="Continent"></Column>
        <Column field="dateFrom" header="From"></Column>
        <Column field="dateUntil" header="Until"></Column>
        <Column field="Edit" header="Edit">
          <template #body="slotProps">
            <i @click="editClicked(slotProps.data)" class="pi pi-pencil">&nbsp;</i>
            <i @click="deleteClicked(slotProps.data)" class="pi pi-trash"></i>
          </template>
        </Column>
    </DataTable>
    <Button label="Add visit" @click="newClicked()" />
    <div v-if="mode === 'Edit' || mode === 'New'" class="overlay-bg"></div>
    <div v-if="mode === 'Edit' || mode === 'New'" class="overlay-frame">
      <div>
        <h3 v-if="mode === 'Edit'">Edit Visit</h3>
        <h3 v-if="mode === 'New'">Add Visit</h3>
        <Calendar v-bind:class="{ error: visitErrors.dateFrom }" v-model="editOrNewVisit.dateFrom" dateFormat="yy-mm-dd" :manualInput="false" placeholder="Date Until" />
        <Calendar v-bind:class="{ error: visitErrors.dateUntil }" v-model="editOrNewVisit.dateUntil" dateFormat="yy-mm-dd" :manualInput="false" placeholder="Date From" />
        <Dropdown
          v-bind:class="{ error: visitErrors.code }"
          v-if="Object.keys(this.getAllCountriesByCode).length > 0"
          v-model="editOrNewVisit.code"
          :options="getAllCountriesArray"
          optionValue="code"
          optionLabel="name"
          placeholder="Select a Country"
          :filter="true"
        />
        <p>
          <span @click="mode = 'None'">CANCEL</span><span @click="save()">SAVE</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import CountryList from '@/components/CountryList.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import { Country } from '../interfaces/Country'

interface Visit {
  id: number | null;
  code: string;
  country: string;
  continent: string | null;
  dateFrom: string;
  dateUntil: string;
}

interface VisitErrors {
  code: boolean;
  dateFrom: boolean;
  dateUntil: boolean;
}

enum Mode {
  None = 'None',
  New = 'New',
  Edit = 'Edit'
}

@Options({
  name: 'Statistics',
  components: {
    DataTable,
    Column,
    Button,
    Calendar,
    Dropdown
  }
})
export default class Home extends CountryList {
  private mode = Mode.None
  private visits: Visit[] = []
  private editOrNewVisit : Visit = {
    id: null,
    code: '',
    country: '',
    continent: null,
    dateFrom: '',
    dateUntil: ''
  }

  private visitErrors : VisitErrors = {
    code: false,
    dateFrom: false,
    dateUntil: false
  }

  get getAllCountriesArray () : Country[] {
    return Object.values(this.getAllCountriesByCode)
  }

  get extendedVisits () : Visit[] {
    if (Object.keys(this.getAllCountriesByCode).length === 0 && this.visits.length) {
      return []
    } else {
      const extendedVisits : Visit[] = []
      const allCountriesByCode = this.getAllCountriesByCode
      let countryName, countryRegion
      for (let i = 0; i < this.visits.length; i++) {
        if (allCountriesByCode[this.visits[i].country]) {
          countryName = allCountriesByCode[this.visits[i].country].name
          countryRegion = allCountriesByCode[this.visits[i].country].region
        } else {
          countryName = ''
          countryRegion = ''
        }

        extendedVisits.push({
          id: this.visits[i].id,
          code: this.visits[i].country,
          country: countryName,
          continent: countryRegion,
          dateFrom: this.visits[i].dateFrom,
          dateUntil: this.visits[i].dateUntil
        })
      }
      return extendedVisits
    }
  }

  mounted () : void {
    this.reload()
  }

  private reload () : void {
    this.axios.get('http://localhost:3000/visits').then((response) => {
      this.visits = response.data
    })
  }

  private editClicked (visit:Visit) : void {
    // reset errors
    this.visitErrors.dateFrom = false
    this.visitErrors.dateUntil = false
    this.visitErrors.code = false
    this.mode = Mode.Edit
    this.editOrNewVisit = visit
  }

  private newClicked () : void {
    // reset errors
    this.visitErrors.dateFrom = false
    this.visitErrors.dateUntil = false
    this.visitErrors.code = false
    this.mode = Mode.New
    this.editOrNewVisit = {
      id: null,
      code: '',
      country: '',
      continent: null,
      dateFrom: '',
      dateUntil: ''
    }
  }

  private validateVisitData () :boolean {
    this.visitErrors.dateFrom = false
    this.visitErrors.dateUntil = false
    this.visitErrors.code = false
    let valid = true
    let dateFrom, dateUntil, day, month, year
    // test if datestring is valid. If is valid, set right format string YYYY-MM-DD
    if (isNaN(Date.parse(this.editOrNewVisit.dateFrom))) {
      this.visitErrors.dateFrom = true
      valid = false
    } else {
      dateFrom = new Date(this.editOrNewVisit.dateFrom)
      // make sure leading zero is present
      day = dateFrom.getDate().toString().length === 2 ? dateFrom.getDate().toString() : `0${dateFrom.getDate().toString()}`
      month = (dateFrom.getMonth() + 1).toString().length === 2 ? (dateFrom.getMonth() + 1).toString() : `0${(dateFrom.getMonth() + 1).toString()}`
      year = dateFrom.getFullYear()
      this.editOrNewVisit.dateFrom = `${year}-${month}-${day}`
    }
    if (isNaN(Date.parse(this.editOrNewVisit.dateUntil))) {
      this.visitErrors.dateUntil = true
      valid = false
    } else {
      dateUntil = new Date(this.editOrNewVisit.dateUntil)
      day = dateUntil.getDate().toString().length === 2 ? dateUntil.getDate().toString() : `0${dateUntil.getDate().toString()}`
      month = (dateUntil.getMonth() + 1).toString().length === 2 ? (dateUntil.getMonth() + 1).toString() : `0${(dateUntil.getMonth() + 1).toString()}`
      year = dateUntil.getFullYear()
      this.editOrNewVisit.dateUntil = `${year}-${month}-${day}`
    }
    const re = new RegExp('^[A-Z]{2}$')
    if (re.test(this.editOrNewVisit.code) === false) {
      this.visitErrors.code = true
      valid = false
    }
    return valid
  }

  private deleteClicked (visit:Visit) : void {
    this.axios.delete(`http://localhost:3000/visits/${visit.id}`).then(() => {
      this.mode = Mode.None
      this.reload()
    })
  }

  private save () : void {
    if (!this.validateVisitData()) {
      return
    }
    if (this.mode === Mode.New) {
      const newVisit = {
        country: this.editOrNewVisit.code,
        dateFrom: this.editOrNewVisit.dateFrom,
        dateUntil: this.editOrNewVisit.dateUntil
      }
      this.axios.post('http://localhost:3000/visits/', newVisit).then(() => {
        this.mode = Mode.None
        this.reload()
      })
    } else {
      const editVisit = {
        id: this.editOrNewVisit.id,
        country: this.editOrNewVisit.code,
        dateFrom: this.editOrNewVisit.dateFrom,
        dateUntil: this.editOrNewVisit.dateUntil
      }
      this.axios.patch(`http://localhost:3000/visits/${this.editOrNewVisit.id}`, editVisit).then(() => {
        this.mode = Mode.None
        this.reload()
      })
    }
  }
}
</script>
