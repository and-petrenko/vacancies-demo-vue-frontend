<template>
  <main-layout>
    <div v-if="isFailed">
      <Error/>
    </div>
    <div v-else>
      Vacancies
    </div>
    <md-snackbar :md-active.sync="isNewVacancySaved">
      The vacancy was saved successfully!
    </md-snackbar>
  </main-layout>
</template>

<script>
  import MainLayout from './Main'
  import Error from './Error'
  import {mapState} from 'vuex'

  export default {
    components: {
      MainLayout,
      Error
    },
    computed: mapState({
      vacancies: state => state.vacancies,
      isFailed: state => state.isVacanciesFailed,
      isNewVacancySaved: state => state.isVacancySavingSuccess
    })
  }
</script>
