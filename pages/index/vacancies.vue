<template>
  <div>
    <div v-if="isFailed">
      <Error/>
    </div>
    <div v-else class="table">
      <md-table v-model="vacancies" md-card>
        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
          <md-table-cell md-label="№" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Company name" class="company-name">{{ item.employerName }}</md-table-cell>
          <md-table-cell md-label="Place">{{ item.place }}</md-table-cell>
          <md-table-cell md-label="Title">{{ item.title }}</md-table-cell>
          <md-table-cell md-label="Description">{{ item.description }}</md-table-cell>
          <md-table-cell md-label="Requirements">{{ item.requirements }}</md-table-cell>
          <md-table-cell md-label="Experience">{{ item.experience }}</md-table-cell>
          <md-table-cell md-label="Subcategories">
            <md-chip v-for="(tag, idx) in item.tags" :key="{idx}">{{ tag }}</md-chip>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <md-snackbar :md-active.sync="isNewVacancySaved">
      The vacancy was saved successfully!
    </md-snackbar>
  </div>
</template>

<script>
  import Error from '../Error'
  import {mapState} from 'vuex'

  export default {
    components: {
      Error
    },
    computed: mapState({
      vacancies: state => state.vacancies,
      isFailed: state => state.isVacanciesFailed,
      isNewVacancySaved: state => state.isVacancySavingSuccess
    })
  }
</script>

<style>
  .table {
    padding-top: 10px;
  }

  .company-logo {
    /*width: 200px;*/
    height: 40px;
    max-height: 40px;
  }

  .company-name {
    height: 80px;
  }
</style>
