<template>
  <div>
    <div v-if="isFailed">
      <Error/>
    </div>
    <div v-else class="table">
      <md-table v-model="employers" md-card>
        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
          <md-table-cell md-label="№" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Logo">
            <img :src="item.logo" :alt="item.alt" class="company-logo"/>
          </md-table-cell>
          <md-table-cell md-label="Company name" class="company-name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Actions">
            <md-button class="md-raised" v-on:click="() => addVacancy(item)">
              <nuxt-link to="/addVacancy">
                Add Vacancy
              </nuxt-link>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
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
      employers: state => state.employers,
      isFailed: state => state.isEmployersFailed
    }),
    methods: {
      addVacancy (item) {
        this.$store.dispatch('createVacancyFor', {item})
      }
    }
  }
</script>

<style>
  .table {
    padding-top: 10px;
  }

  .company-logo {
    width: 200px;
    height: 40px;
    max-height: 40px;
  }

  .company-name {
    height: 80px;
  }
</style>
