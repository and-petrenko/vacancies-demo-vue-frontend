<template>
  <div>
    <div v-if="isFailed">
      <Error/>
    </div>
    <div v-else class="table">
      <md-list :md-expand-single="true">
        <md-list-item class="job-item" v-for="vacancy in vacancies" :key="vacancy.id" md-expand>
          <div class="job-header">
            <b>{{ vacancy.title }}</b>
          </div>
          <div slot="md-expand">
            <div class="job-section" v-if="vacancy.employerName">
              <b>{{ vacancy.employerName }}</b>
              <p>{{ vacancy.description }}</p>
            </div>
            <div class="job-section" v-if="vacancy.requirements">
              <b>Job Requirements:</b>
              <p>{{ vacancy.requirements }}</p>
            </div>
            <div class="job-section" v-if="vacancy.experience">
              <b>Required Experience:</b>&nbsp;{{ vacancy.experience }}&nbsp;years
            </div>
            <div class="job-section" v-if="vacancy.place">
              <b>Location:</b>&nbsp;{{ vacancy.place }}
            </div>
            <div class="job-section" v-if="vacancy.tags">
              <b>Sub Categories:</b>&nbsp;{{ vacancy.tags.join(', ') }}
            </div>
          </div>
        </md-list-item>
      </md-list>
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

  .job-item {
    background-color: #FFFDE6;
    padding: 6px 12px;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-box-shadow: 1px 1px 0.5px 0 rgba(0,0,0,0.31);
    -moz-box-shadow: 1px 1px .5px 0 rgba(0,0,0,0.31);
    box-shadow: 1px 1px 1px 0.5px rgba(0,0,0,0.31);
  }

  .job-header {
    width: 100%;
    text-align: right;
  }

  .job-section {
    padding: 10px;
  }
</style>
